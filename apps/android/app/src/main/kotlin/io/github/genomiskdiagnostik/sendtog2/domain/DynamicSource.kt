package io.github.genomiskdiagnostik.sendtog2.domain

data class DynamicSource(
    val id: String,
    val name: String,
    val url: String,
    val cssSelector: String,
    val frequencyMinutes: Long,
    val enabled: Boolean,
    val lastFetchedAt: Long?,
    val lastSuccessAt: Long?,
    val lastError: String?,
) {
    companion object {
        const val MIN_FREQUENCY_MINUTES = 15L
        const val MAX_NAME_LENGTH = 80
        const val MAX_URL_LENGTH = 2_048
        const val MAX_SELECTOR_LENGTH = 512
        const val MAX_ERROR_LENGTH = 160
    }
}
