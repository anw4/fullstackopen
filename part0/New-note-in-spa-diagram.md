sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: types a new note and clicks Save
    Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/notes (JSON)
    activate Server
    Server-->>Browser: { "content": "0.6", "date": "2025-10-29" }
    deactivate Server

    Note right of Browser: The new note was added to the page without reloading.
