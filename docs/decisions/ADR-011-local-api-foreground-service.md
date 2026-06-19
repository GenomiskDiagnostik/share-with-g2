# ADR-011: Local API Foreground Service

## Status

Accepted.

## Context

The Even Hub reader is opened after the user leaves the Android companion app.
Running the loopback server only for the Android application process lifetime
therefore makes the connection depend on whether Android happens to retain a
background process. A successful in-app self-test does not prove that the API
will still exist when Even Hub performs its request.

## Decision

- Run the existing loopback HTTP server inside a foreground service with the
  Android `dataSync` service type.
- Start the service only from a user-visible app or Sharesheet activity.
- Use a low-importance, ongoing notification that explains the local
  connection and provides an explicit stop action.
- Return `START_STICKY` so Android can recreate the service after process
  pressure while the user has not stopped it.
- Stop cleanly if Android applies its platform time limit to the `dataSync`
  foreground-service type.
- Stop the HTTP server when the service is explicitly stopped or destroyed.
- Keep the server bound to `127.0.0.1`; authentication, routes, CORS, and data
  ownership remain unchanged.

## Consequences

- Switching from Send to G2 to Even Hub no longer relies on cached-process
  lifetime.
- Android displays a persistent notification while the inbox bridge is
  available.
- Android may impose platform time limits on the `dataSync` foreground-service
  type. Physical testing must record behavior on the target Android version.
- The user can stop local API availability directly from the notification;
  opening Send to G2 or sharing new content starts it again.
