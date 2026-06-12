# Android Companion App

This directory is reserved for the Android companion app.

## Responsibilities

- Android Sharesheet target: `Send to G2`.
- Receive `ACTION_SEND` text/link/html shares.
- Store shared items locally in Room.
- Emit notification previews.
- Expose local API for the Even Hub app.

## Suggested package

```text
com.example.sendtog2
```

Replace before public distribution.

## First scaffold recommendation

Use Android Studio or Gradle to create a Kotlin app with:

- Kotlin
- Jetpack Compose
- Room
- DataStore
- Coroutines
- AndroidX Core
- AndroidX Lifecycle
- NotificationCompat

## First implementation target

Do not start with a polished UI. Start with:

1. `ShareReceiverActivity`.
2. `ShareParser`.
3. Room persistence.
4. Notification preview.
5. Tiny debug screen listing stored items.
