# Linked Content Validation

## Automated

Run from `apps/android` with JDK 17 and Android SDK 36:

```powershell
.\gradlew.bat testDebugUnitTest lintDebug assembleDebug assembleDebugAndroidTest
```

Expected:

- ChatGPT-like HTML selects the latest rendered assistant response.
- Article extraction removes scripts and navigation.
- Missing or unreadable page content leaves the original URL unchanged.
- The source URL is appended to successfully extracted text.
- Loopback, private, link-local, credential-bearing, and non-HTTP(S) URLs are
  blocked.
- A deleted or already-updated item is not recreated by background work.
- Room updates link content only while the expected original URL is stored.

## Physical Phone

1. Install the latest debug APK.
2. Create a public ChatGPT share link for a conversation containing a distinct
   final assistant response.
3. Share that link to `Send to G2`.
4. Confirm the Sharesheet closes quickly and reports that readable content is
   loading.
5. Wait for the background job, then open the Android inbox.
6. Confirm the item title and body contain the answer rather than only the URL.
7. Confirm the original URL remains at the bottom.
8. Open the Even Hub Shared Inbox and confirm the same content paginates.
9. Repeat with a normal public article.
10. Repeat with a login-protected or JavaScript-only page and confirm the item
    safely remains URL-only.

The ChatGPT result depends on the public share page including rendered answer
markup in its HTTP response. Private conversation URLs do not carry the user's
ChatGPT login session into Send to G2.
