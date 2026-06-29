package io.github.genomiskdiagnostik.sendtog2.domain

data class SharedItem(
    val id: String,
    val type: SharedItemType,
    val title: String?,
    val text: String,
    val sourceApp: String?,
    val createdAt: Long,
    val read: Boolean,
    val origin: SharedItemOrigin = SharedItemOrigin.SHARE,
    val dynamicSourceId: String? = null,
    val dynamicFingerprint: String? = null,
)

enum class SharedItemType {
    TEXT,
    URL,
}

enum class SharedItemOrigin {
    SHARE,
    DYNAMIC,
}
