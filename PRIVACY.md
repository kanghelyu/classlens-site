# ClassLens AI privacy notes

ClassLens AI is local-first. Courses and imported files are processed on the device.
The app does not upload data to a ClassLens-owned server.

When AI import is explicitly started, the selected file representation is sent
directly to the provider configured by the user. The provider's own privacy,
retention, and regional-processing terms apply. API keys are supplied by the
user and stored encrypted with Android Keystore-backed AES/GCM. Keys are not
included in the source tree, backups, logs, APK metadata, or release website.

The school WebView is user-operated. ClassLens does not collect or persist
school usernames, passwords, cookies, or page content beyond the active WebView
session. Users should only enter credentials into their institution's official
page and should follow their school's terms.

Imported courses are never written until the user reviews the preview and
presses the confirmation action. Clear-all, delete, and other mutations require
an explicit confirmation.
