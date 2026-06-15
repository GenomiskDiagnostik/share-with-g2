package io.github.genomiskdiagnostik.sendtog2.screen

data class ScreenSnapshot(
    val id: String,
    val createdAt: Long,
    val width: Int,
    val height: Int,
    val mimeType: String,
    val imageBase64: String,
)
