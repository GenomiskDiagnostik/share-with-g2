package io.github.genomiskdiagnostik.sendtog2.ui

import android.Manifest
import android.app.Activity
import android.content.ClipData
import android.content.ClipboardManager
import android.content.pm.PackageManager
import android.media.projection.MediaProjectionManager
import android.os.Build
import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.result.contract.ActivityResultContracts
import androidx.activity.viewModels
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material3.Checkbox
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.pluralStringResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.core.content.ContextCompat
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import io.github.genomiskdiagnostik.sendtog2.R
import io.github.genomiskdiagnostik.sendtog2.SendToG2Application
import io.github.genomiskdiagnostik.sendtog2.api.LocalApiPhase
import io.github.genomiskdiagnostik.sendtog2.api.LocalApiDiagnosticsState
import io.github.genomiskdiagnostik.sendtog2.api.LocalApiForegroundService
import io.github.genomiskdiagnostik.sendtog2.api.LocalApiSelfTestState
import io.github.genomiskdiagnostik.sendtog2.api.LocalApiState
import io.github.genomiskdiagnostik.sendtog2.domain.DynamicSource
import io.github.genomiskdiagnostik.sendtog2.domain.SharedItem
import io.github.genomiskdiagnostik.sendtog2.domain.SharedItemType
import io.github.genomiskdiagnostik.sendtog2.screen.ScreenSnapshot
import io.github.genomiskdiagnostik.sendtog2.screen.ScreenShareIntervals
import io.github.genomiskdiagnostik.sendtog2.screen.ScreenShareStatus
import io.github.genomiskdiagnostik.sendtog2.screen.ScreenSnapshotService
import java.time.Instant
import java.time.ZoneId
import java.time.format.DateTimeFormatter

class MainActivity : ComponentActivity() {
    private val viewModel: MainViewModel by viewModels {
        val app = application as SendToG2Application
        MainViewModel.Factory(
            app.repository,
            app.repository,
            app.localApiServer,
            app.accessKeyStore,
            app.screenSnapshotStore,
            applicationContext,
        )
    }

    private var notificationPermissionGranted by mutableStateOf(true)
    private var pendingScreenShareIntervalMillis = ScreenShareIntervals.DEFAULT_MILLIS
    private val permissionLauncher = registerForActivityResult(
        ActivityResultContracts.RequestPermission(),
    ) { granted ->
        notificationPermissionGranted = granted
    }
    private val screenCaptureLauncher = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult(),
    ) { result ->
        val data = result.data
        if (result.resultCode == Activity.RESULT_OK && data != null) {
            ScreenSnapshotService.start(
                this,
                result.resultCode,
                data,
                pendingScreenShareIntervalMillis,
            )
            Toast.makeText(
                this,
                R.string.screen_snapshot_capture_started,
                Toast.LENGTH_SHORT,
            ).show()
        } else {
            Toast.makeText(
                this,
                R.string.screen_snapshot_capture_cancelled,
                Toast.LENGTH_SHORT,
            ).show()
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        LocalApiForegroundService.start(this)
        notificationPermissionGranted = hasNotificationPermission()

        setContent {
            MaterialTheme {
                val items by viewModel.items.collectAsStateWithLifecycle()
                val apiState by (application as SendToG2Application)
                    .localApiServer.state.collectAsStateWithLifecycle()
                val apiDiagnostics by (application as SendToG2Application)
                    .localApiServer.diagnostics.collectAsStateWithLifecycle()
                val selfTest by viewModel.selfTest.collectAsStateWithLifecycle()
                val accessKey by viewModel.accessKey.collectAsStateWithLifecycle()
                val screenSnapshot by viewModel.screenSnapshot.collectAsStateWithLifecycle()
                val screenShareStatus by
                    viewModel.screenShareStatus.collectAsStateWithLifecycle()
                val dynamicSources by viewModel.dynamicSources.collectAsStateWithLifecycle()
                Surface(modifier = Modifier.fillMaxSize()) {
                    InboxScreen(
                        items = items,
                        apiState = apiState,
                        apiDiagnostics = apiDiagnostics,
                        selfTest = selfTest,
                        accessKey = accessKey,
                        screenSnapshot = screenSnapshot,
                        screenShareStatus = screenShareStatus,
                        dynamicSources = dynamicSources,
                        notificationPermissionGranted = notificationPermissionGranted,
                        onRequestNotificationPermission = ::requestNotificationPermission,
                        onRunSelfTest = viewModel::runLocalApiSelfTest,
                        onRestartApi = viewModel::restartLocalApi,
                        onCopyAccessKey = ::copyAccessKey,
                        onRotateAccessKey = viewModel::rotateAccessKey,
                        onCaptureScreenSnapshot = ::requestScreenSnapshot,
                        onStopScreenShare = { ScreenSnapshotService.stop(this) },
                        onClearScreenSnapshot = viewModel::clearScreenSnapshot,
                        onAddDynamicSource = viewModel::addDynamicSource,
                        onUpdateDynamicSource = viewModel::updateDynamicSource,
                        onDeleteDynamicSource = viewModel::deleteDynamicSource,
                        onRefreshDynamicSource = viewModel::refreshDynamicSource,
                        onUpdateRead = viewModel::updateRead,
                        onDelete = viewModel::delete,
                        onClearAll = viewModel::clearAll,
                    )
                }
            }
        }
    }

    override fun onResume() {
        super.onResume()
        notificationPermissionGranted = hasNotificationPermission()
    }

    private fun hasNotificationPermission(): Boolean =
        Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU ||
            ContextCompat.checkSelfPermission(
                this,
                Manifest.permission.POST_NOTIFICATIONS,
            ) == PackageManager.PERMISSION_GRANTED

    private fun requestNotificationPermission() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            permissionLauncher.launch(Manifest.permission.POST_NOTIFICATIONS)
        }
    }

    private fun requestScreenSnapshot(intervalMillis: Long) {
        if (!hasNotificationPermission()) {
            requestNotificationPermission()
            return
        }
        pendingScreenShareIntervalMillis = ScreenShareIntervals.normalize(intervalMillis)
        val manager = getSystemService(MediaProjectionManager::class.java)
        screenCaptureLauncher.launch(manager.createScreenCaptureIntent())
    }

    private fun copyAccessKey(accessKey: String) {
        if (accessKey.isBlank()) return
        getSystemService(ClipboardManager::class.java).setPrimaryClip(
            ClipData.newPlainText(getString(R.string.pairing_access_key), accessKey),
        )
        Toast.makeText(this, R.string.pairing_key_copied, Toast.LENGTH_SHORT).show()
    }
}

@Composable
private fun InboxScreen(
    items: List<SharedItem>,
    apiState: LocalApiState,
    apiDiagnostics: LocalApiDiagnosticsState,
    selfTest: LocalApiSelfTestState,
    accessKey: String,
    screenSnapshot: ScreenSnapshot?,
    screenShareStatus: ScreenShareStatus,
    dynamicSources: List<DynamicSource>,
    notificationPermissionGranted: Boolean,
    onRequestNotificationPermission: () -> Unit,
    onRunSelfTest: () -> Unit,
    onRestartApi: () -> Unit,
    onCopyAccessKey: (String) -> Unit,
    onRotateAccessKey: () -> Unit,
    onCaptureScreenSnapshot: (Long) -> Unit,
    onStopScreenShare: () -> Unit,
    onClearScreenSnapshot: () -> Unit,
    onAddDynamicSource: (String, String, String, Long) -> Unit,
    onUpdateDynamicSource: (DynamicSource) -> Unit,
    onDeleteDynamicSource: (String) -> Unit,
    onRefreshDynamicSource: (String) -> Unit,
    onUpdateRead: (String, Boolean) -> Unit,
    onDelete: (String) -> Unit,
    onClearAll: () -> Unit,
) {
    var showClearConfirmation by remember { mutableStateOf(false) }
    var showSettings by remember { mutableStateOf(false) }

    if (showClearConfirmation) {
        AlertDialog(
            onDismissRequest = { showClearConfirmation = false },
            title = { Text(stringResource(R.string.clear_all_title)) },
            text = { Text(stringResource(R.string.clear_all_body)) },
            confirmButton = {
                Button(
                    onClick = {
                        showClearConfirmation = false
                        onClearAll()
                    },
                ) {
                    Text(stringResource(R.string.confirm_clear_all))
                }
            },
            dismissButton = {
                OutlinedButton(onClick = { showClearConfirmation = false }) {
                    Text(stringResource(R.string.cancel))
                }
            },
        )
    }

    if (showSettings) {
        SettingsScreen(
            apiState = apiState,
            apiDiagnostics = apiDiagnostics,
            selfTest = selfTest,
            accessKey = accessKey,
            dynamicSources = dynamicSources,
            notificationPermissionGranted = notificationPermissionGranted,
            onBack = { showSettings = false },
            onRequestNotificationPermission = onRequestNotificationPermission,
            onRunSelfTest = onRunSelfTest,
            onRestartApi = onRestartApi,
            onCopyAccessKey = onCopyAccessKey,
            onRotateAccessKey = onRotateAccessKey,
            onAddDynamicSource = onAddDynamicSource,
            onUpdateDynamicSource = onUpdateDynamicSource,
            onDeleteDynamicSource = onDeleteDynamicSource,
            onRefreshDynamicSource = onRefreshDynamicSource,
        )
        return
    }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(20.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
            ) {
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = stringResource(R.string.inbox_title),
                        style = MaterialTheme.typography.headlineMedium,
                        fontWeight = FontWeight.Bold,
                    )
                    Text(
                        text = pluralStringResource(
                            R.plurals.item_count,
                            items.size,
                            items.size,
                        ),
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                }
                IconButton(onClick = { showSettings = true }) {
                    Icon(
                        imageVector = Icons.Default.Settings,
                        contentDescription = stringResource(R.string.settings_open),
                    )
                }
            }
        }

        item {
            ScreenSnapshotCard(
                snapshot = screenSnapshot,
                sharing = screenShareStatus,
                notificationPermissionGranted = notificationPermissionGranted,
                onCapture = onCaptureScreenSnapshot,
                onStop = onStopScreenShare,
                onRequestNotificationPermission = onRequestNotificationPermission,
                onClear = onClearScreenSnapshot,
            )
        }

        if (items.isEmpty()) {
            item {
                Text(
                    text = stringResource(R.string.empty_inbox),
                    style = MaterialTheme.typography.bodyLarge,
                )
            }
        } else {
            item {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.End,
                ) {
                    OutlinedButton(onClick = { showClearConfirmation = true }) {
                        Text(stringResource(R.string.clear_all))
                    }
                }
            }
            items(items, key = SharedItem::id) { item ->
                SharedItemCard(
                    item = item,
                    onToggleRead = { onUpdateRead(item.id, !item.read) },
                    onDelete = { onDelete(item.id) },
                )
            }
        }
    }
}

@Composable
private fun SettingsScreen(
    apiState: LocalApiState,
    apiDiagnostics: LocalApiDiagnosticsState,
    selfTest: LocalApiSelfTestState,
    accessKey: String,
    dynamicSources: List<DynamicSource>,
    notificationPermissionGranted: Boolean,
    onBack: () -> Unit,
    onRequestNotificationPermission: () -> Unit,
    onRunSelfTest: () -> Unit,
    onRestartApi: () -> Unit,
    onCopyAccessKey: (String) -> Unit,
    onRotateAccessKey: () -> Unit,
    onAddDynamicSource: (String, String, String, Long) -> Unit,
    onUpdateDynamicSource: (DynamicSource) -> Unit,
    onDeleteDynamicSource: (String) -> Unit,
    onRefreshDynamicSource: (String) -> Unit,
) {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(20.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
            ) {
                Text(
                    text = stringResource(R.string.settings_title),
                    style = MaterialTheme.typography.headlineMedium,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.weight(1f),
                )
                OutlinedButton(onClick = onBack) {
                    Text(stringResource(R.string.settings_back))
                }
            }
        }
        item {
            LocalApiCard(
                state = apiState,
                diagnostics = apiDiagnostics,
                selfTest = selfTest,
                onRunSelfTest = onRunSelfTest,
                onRestartApi = onRestartApi,
            )
        }
        item {
            AccessKeyCard(
                accessKey = accessKey,
                onCopy = onCopyAccessKey,
                onRotate = onRotateAccessKey,
            )
        }
        item {
            DynamicSourcesCard(
                sources = dynamicSources,
                onAdd = onAddDynamicSource,
                onUpdate = onUpdateDynamicSource,
                onDelete = onDeleteDynamicSource,
                onRefresh = onRefreshDynamicSource,
            )
        }
        if (!notificationPermissionGranted) {
            item {
                NotificationPermissionCard(onRequestNotificationPermission)
            }
        }
    }
}

@Composable
private fun ScreenSnapshotCard(
    snapshot: ScreenSnapshot?,
    sharing: ScreenShareStatus,
    notificationPermissionGranted: Boolean,
    onCapture: (Long) -> Unit,
    onStop: () -> Unit,
    onRequestNotificationPermission: () -> Unit,
    onClear: () -> Unit,
) {
    Card {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(
                text = stringResource(R.string.screen_snapshot_title),
                fontWeight = FontWeight.SemiBold,
            )
            Spacer(modifier = Modifier.height(6.dp))
            Text(
                text = stringResource(R.string.screen_snapshot_body),
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
            Spacer(modifier = Modifier.height(10.dp))
            Text(
                text = if (sharing.active) {
                    stringResource(
                        R.string.screen_snapshot_active,
                        stringResource(
                            if (sharing.intervalMillis == ScreenShareIntervals.FAST_MILLIS) {
                                R.string.screen_snapshot_interval_fast
                            } else {
                                R.string.screen_snapshot_interval_default
                            },
                        ),
                    )
                } else {
                    stringResource(R.string.screen_snapshot_inactive)
                },
                style = MaterialTheme.typography.bodySmall,
            )
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = snapshot?.let {
                    stringResource(
                        R.string.screen_snapshot_latest,
                        it.width,
                        it.height,
                        formatTimestamp(it.createdAt),
                    )
                } ?: stringResource(R.string.screen_snapshot_none),
                style = MaterialTheme.typography.bodySmall,
            )
            Spacer(modifier = Modifier.height(10.dp))
            if (!notificationPermissionGranted) {
                Text(
                    text = stringResource(R.string.screen_snapshot_notification_required),
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.error,
                )
                Spacer(modifier = Modifier.height(8.dp))
                Button(onClick = onRequestNotificationPermission) {
                    Text(stringResource(R.string.grant_permission))
                }
            } else if (sharing.active) {
                Button(onClick = onStop) {
                    Text(stringResource(R.string.screen_snapshot_stop))
                }
            } else {
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    Button(
                        onClick = { onCapture(ScreenShareIntervals.DEFAULT_MILLIS) },
                    ) {
                        Text(stringResource(R.string.screen_snapshot_start_default))
                    }
                    OutlinedButton(
                        onClick = { onCapture(ScreenShareIntervals.FAST_MILLIS) },
                    ) {
                        Text(stringResource(R.string.screen_snapshot_start_fast))
                    }
                }
            }
            Spacer(modifier = Modifier.height(8.dp))
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                OutlinedButton(
                    onClick = onClear,
                    enabled = snapshot != null,
                ) {
                    Text(stringResource(R.string.screen_snapshot_clear))
                }
            }
        }
    }
}

@Composable
private fun AccessKeyCard(
    accessKey: String,
    onCopy: (String) -> Unit,
    onRotate: () -> Unit,
) {
    var showKey by remember { mutableStateOf(false) }
    var showRotationConfirmation by remember { mutableStateOf(false) }

    if (showRotationConfirmation) {
        AlertDialog(
            onDismissRequest = { showRotationConfirmation = false },
            title = { Text(stringResource(R.string.pairing_rotate_title)) },
            text = { Text(stringResource(R.string.pairing_rotate_body)) },
            confirmButton = {
                Button(
                    onClick = {
                        showRotationConfirmation = false
                        showKey = false
                        onRotate()
                    },
                ) {
                    Text(stringResource(R.string.pairing_rotate_confirm))
                }
            },
            dismissButton = {
                OutlinedButton(onClick = { showRotationConfirmation = false }) {
                    Text(stringResource(R.string.cancel))
                }
            },
        )
    }

    Card {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(
                text = stringResource(R.string.pairing_title),
                fontWeight = FontWeight.SemiBold,
            )
            Spacer(modifier = Modifier.height(6.dp))
            Text(
                text = stringResource(R.string.pairing_body),
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
            Spacer(modifier = Modifier.height(10.dp))
            Text(
                text = when {
                    accessKey.isBlank() -> stringResource(R.string.pairing_key_loading)
                    showKey -> accessKey.chunked(4).joinToString(" ")
                    else -> stringResource(R.string.pairing_key_hidden)
                },
                style = MaterialTheme.typography.bodyLarge,
                fontWeight = FontWeight.Medium,
            )
            Spacer(modifier = Modifier.height(10.dp))
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                OutlinedButton(
                    onClick = { showKey = !showKey },
                    enabled = accessKey.isNotBlank(),
                ) {
                    Text(
                        stringResource(
                            if (showKey) R.string.pairing_hide_key else R.string.pairing_show_key,
                        ),
                    )
                }
                Button(
                    onClick = { onCopy(accessKey) },
                    enabled = accessKey.isNotBlank(),
                ) {
                    Text(stringResource(R.string.pairing_copy_key))
                }
            }
            OutlinedButton(
                onClick = { showRotationConfirmation = true },
                enabled = accessKey.isNotBlank(),
            ) {
                Text(stringResource(R.string.pairing_rotate_key))
            }
        }
    }
}

@Composable
private fun DynamicSourcesCard(
    sources: List<DynamicSource>,
    onAdd: (String, String, String, Long) -> Unit,
    onUpdate: (DynamicSource) -> Unit,
    onDelete: (String) -> Unit,
    onRefresh: (String) -> Unit,
) {
    var name by remember { mutableStateOf("") }
    var url by remember { mutableStateOf("") }
    var selector by remember { mutableStateOf("") }
    var frequency by remember { mutableStateOf("15") }

    Card {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(
                text = stringResource(R.string.dynamic_sources_title),
                fontWeight = FontWeight.SemiBold,
            )
            Spacer(modifier = Modifier.height(6.dp))
            Text(
                text = stringResource(R.string.dynamic_sources_body),
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
            Spacer(modifier = Modifier.height(10.dp))
            OutlinedTextField(
                value = name,
                onValueChange = { name = it },
                label = { Text(stringResource(R.string.dynamic_source_name)) },
                modifier = Modifier.fillMaxWidth(),
                singleLine = true,
            )
            OutlinedTextField(
                value = url,
                onValueChange = { url = it },
                label = { Text(stringResource(R.string.dynamic_source_url)) },
                modifier = Modifier.fillMaxWidth(),
                singleLine = true,
            )
            OutlinedTextField(
                value = selector,
                onValueChange = { selector = it },
                label = { Text(stringResource(R.string.dynamic_source_selector)) },
                modifier = Modifier.fillMaxWidth(),
                singleLine = true,
            )
            OutlinedTextField(
                value = frequency,
                onValueChange = { frequency = it.filter(Char::isDigit).take(4) },
                label = { Text(stringResource(R.string.dynamic_source_frequency)) },
                modifier = Modifier.fillMaxWidth(),
                singleLine = true,
            )
            Spacer(modifier = Modifier.height(8.dp))
            Button(
                onClick = {
                    onAdd(
                        name,
                        url,
                        selector,
                        frequency.toLongOrNull() ?: DynamicSource.MIN_FREQUENCY_MINUTES,
                    )
                    name = ""
                    url = ""
                    selector = ""
                    frequency = "15"
                },
                enabled = name.isNotBlank() && url.isNotBlank() && selector.isNotBlank(),
            ) {
                Text(stringResource(R.string.dynamic_source_add))
            }
            Spacer(modifier = Modifier.height(12.dp))
            if (sources.isEmpty()) {
                Text(
                    text = stringResource(R.string.dynamic_source_empty),
                    style = MaterialTheme.typography.bodySmall,
                )
            } else {
                sources.forEach { source ->
                    DynamicSourceRow(
                        source = source,
                        onUpdate = onUpdate,
                        onDelete = onDelete,
                        onRefresh = onRefresh,
                    )
                    Spacer(modifier = Modifier.height(10.dp))
                }
            }
        }
    }
}

@Composable
private fun DynamicSourceRow(
    source: DynamicSource,
    onUpdate: (DynamicSource) -> Unit,
    onDelete: (String) -> Unit,
    onRefresh: (String) -> Unit,
) {
    var name by remember(source.id) { mutableStateOf(source.name) }
    var url by remember(source.id) { mutableStateOf(source.url) }
    var selector by remember(source.id) { mutableStateOf(source.cssSelector) }
    var frequency by remember(source.id) { mutableStateOf(source.frequencyMinutes.toString()) }
    var enabled by remember(source.id) { mutableStateOf(source.enabled) }

    Column {
        HorizontalDivider()
        Spacer(modifier = Modifier.height(8.dp))
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
        ) {
            Text(
                text = source.name,
                style = MaterialTheme.typography.titleSmall,
                fontWeight = FontWeight.SemiBold,
                modifier = Modifier.weight(1f),
            )
            Row {
                Checkbox(
                    checked = enabled,
                    onCheckedChange = { enabled = it },
                )
                Text(
                    text = stringResource(R.string.dynamic_source_enabled),
                    style = MaterialTheme.typography.bodySmall,
                )
            }
        }
        Text(
            text = when {
                source.lastError != null ->
                    stringResource(R.string.dynamic_source_last_error, source.lastError)
                source.lastSuccessAt != null ->
                    stringResource(
                        R.string.dynamic_source_last_success,
                        formatTimestamp(source.lastSuccessAt),
                    )
                else -> stringResource(R.string.dynamic_source_unknown_status)
            },
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
        )
        OutlinedTextField(
            value = name,
            onValueChange = { name = it },
            label = { Text(stringResource(R.string.dynamic_source_name)) },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
        )
        OutlinedTextField(
            value = url,
            onValueChange = { url = it },
            label = { Text(stringResource(R.string.dynamic_source_url)) },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
        )
        OutlinedTextField(
            value = selector,
            onValueChange = { selector = it },
            label = { Text(stringResource(R.string.dynamic_source_selector)) },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
        )
        OutlinedTextField(
            value = frequency,
            onValueChange = { frequency = it.filter(Char::isDigit).take(4) },
            label = { Text(stringResource(R.string.dynamic_source_frequency)) },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
        )
        Spacer(modifier = Modifier.height(8.dp))
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Button(
                onClick = {
                    onUpdate(
                        source.copy(
                            name = name,
                            url = url,
                            cssSelector = selector,
                            frequencyMinutes = frequency.toLongOrNull()
                                ?: DynamicSource.MIN_FREQUENCY_MINUTES,
                            enabled = enabled,
                        ),
                    )
                },
            ) {
                Text(stringResource(R.string.dynamic_source_save))
            }
            OutlinedButton(onClick = { onRefresh(source.id) }) {
                Text(stringResource(R.string.dynamic_source_refresh))
            }
        }
        OutlinedButton(onClick = { onDelete(source.id) }) {
            Text(stringResource(R.string.dynamic_source_delete))
        }
    }
}

@Composable
private fun LocalApiCard(
    state: LocalApiState,
    diagnostics: LocalApiDiagnosticsState,
    selfTest: LocalApiSelfTestState,
    onRunSelfTest: () -> Unit,
    onRestartApi: () -> Unit,
) {
    val lastRequest = diagnostics.lastRequest
    val lastEvenHub = diagnostics.lastEvenHubRequest
    var showDetails by remember { mutableStateOf(false) }
    Card(
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surfaceVariant,
        ),
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(
                text = stringResource(R.string.local_api_title),
                fontWeight = FontWeight.SemiBold,
            )
            Spacer(modifier = Modifier.height(6.dp))
            Text(
                text = when (state.phase) {
                    LocalApiPhase.RUNNING -> stringResource(R.string.local_api_running)
                    LocalApiPhase.STOPPED -> stringResource(R.string.local_api_stopped)
                    LocalApiPhase.FAILED -> stringResource(R.string.local_api_failed)
                },
            )
            Text(
                text = state.url,
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
            Spacer(modifier = Modifier.height(6.dp))
            Text(
                text = stringResource(R.string.local_api_probe_note),
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
            Spacer(modifier = Modifier.height(10.dp))
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                Button(
                    onClick = onRunSelfTest,
                    enabled = state.phase == LocalApiPhase.RUNNING &&
                        selfTest != LocalApiSelfTestState.Running,
                ) {
                    Text(stringResource(R.string.local_api_self_test_action))
                }
                OutlinedButton(onClick = onRestartApi) {
                    Text(stringResource(R.string.local_api_restart_action))
                }
            }
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = when (selfTest) {
                    LocalApiSelfTestState.Idle ->
                        stringResource(R.string.local_api_self_test_idle)
                    LocalApiSelfTestState.Running ->
                        stringResource(R.string.local_api_self_test_running)
                    is LocalApiSelfTestState.Success ->
                        stringResource(
                            R.string.local_api_self_test_success,
                            selfTest.version,
                        )
                    is LocalApiSelfTestState.Failure ->
                        stringResource(
                            R.string.local_api_self_test_failure,
                            selfTest.reason,
                        )
                },
                style = MaterialTheme.typography.bodySmall,
            )
            Spacer(modifier = Modifier.height(6.dp))
            Text(
                text = lastEvenHub?.let {
                    stringResource(
                        R.string.local_api_even_hub_seen,
                        formatTimestamp(it.receivedAt),
                    )
                } ?: stringResource(R.string.local_api_even_hub_not_seen),
                style = MaterialTheme.typography.bodySmall,
                fontWeight = FontWeight.SemiBold,
            )
            OutlinedButton(onClick = { showDetails = !showDetails }) {
                Text(
                    stringResource(
                        if (showDetails) {
                            R.string.local_api_hide_details
                        } else {
                            R.string.local_api_show_details
                        },
                    ),
                )
            }
            if (showDetails) {
                Spacer(modifier = Modifier.height(6.dp))
                HorizontalDivider()
                Spacer(modifier = Modifier.height(10.dp))
                Text(
                    text = stringResource(
                        R.string.local_api_request_count,
                        diagnostics.requestCount,
                    ),
                    style = MaterialTheme.typography.bodySmall,
                )
                Text(
                    text = lastRequest?.let {
                        stringResource(
                            R.string.local_api_last_request,
                            it.method,
                            it.path,
                            it.client ?: stringResource(R.string.local_api_unknown_client),
                        )
                    } ?: stringResource(R.string.local_api_no_requests),
                    style = MaterialTheme.typography.bodySmall,
                )
                Text(
                    text = stringResource(
                        R.string.local_api_origin,
                        lastEvenHub?.origin
                            ?: stringResource(R.string.local_api_header_missing),
                    ),
                    style = MaterialTheme.typography.bodySmall,
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis,
                )
                Text(
                    text = stringResource(
                        R.string.local_api_user_agent,
                        lastEvenHub?.userAgent
                            ?: stringResource(R.string.local_api_header_missing),
                    ),
                    style = MaterialTheme.typography.bodySmall,
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis,
                )
            }
        }
    }
}

@Composable
private fun NotificationPermissionCard(
    onRequestNotificationPermission: () -> Unit,
) {
    Card(
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.secondaryContainer,
        ),
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(
                text = stringResource(R.string.notification_permission_title),
                fontWeight = FontWeight.SemiBold,
            )
            Spacer(modifier = Modifier.height(6.dp))
            Text(stringResource(R.string.notification_permission_body))
            Spacer(modifier = Modifier.height(10.dp))
            Button(onClick = onRequestNotificationPermission) {
                Text(stringResource(R.string.grant_permission))
            }
        }
    }
}

@Composable
private fun SharedItemCard(
    item: SharedItem,
    onToggleRead: () -> Unit,
    onDelete: () -> Unit,
) {
    Card(modifier = Modifier.fillMaxWidth()) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
            ) {
                Text(
                    text = when (item.type) {
                        SharedItemType.TEXT -> stringResource(R.string.type_text)
                        SharedItemType.URL -> stringResource(R.string.type_url)
                    } + " - " + stringResource(
                        if (item.read) R.string.read_state_read else R.string.read_state_unread,
                    ),
                    style = MaterialTheme.typography.labelLarge,
                    color = MaterialTheme.colorScheme.primary,
                )
                Text(
                    text = formatTimestamp(item.createdAt),
                    style = MaterialTheme.typography.labelMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
            }
            if (!item.title.isNullOrBlank()) {
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = item.title,
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.SemiBold,
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis,
                )
            }
            Spacer(modifier = Modifier.height(8.dp))
            HorizontalDivider()
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = item.text,
                maxLines = 5,
                overflow = TextOverflow.Ellipsis,
            )
            Spacer(modifier = Modifier.height(10.dp))
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
            ) {
                OutlinedButton(onClick = onToggleRead) {
                    Text(
                        stringResource(
                            if (item.read) {
                                R.string.mark_unread
                            } else {
                                R.string.mark_read
                            },
                        ),
                    )
                }
                OutlinedButton(onClick = onDelete) {
                    Text(stringResource(R.string.delete_item))
                }
            }
        }
    }
}

private fun formatTimestamp(timestamp: Long): String =
    DateTimeFormatter.ofPattern("dd.MM HH:mm")
        .withZone(ZoneId.systemDefault())
        .format(Instant.ofEpochMilli(timestamp))
