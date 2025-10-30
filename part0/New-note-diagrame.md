sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: types a new note and clicks Save.
    Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/notes (JSON)
    activate Server
    Server-->>Browser: Redirect to Notes page
    deactivate Server

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate Server
    Server-->>Browser: HTML document
    deactivate Server

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate Server
    Server-->>Browser: the css file
    deactivate Server

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate Server
    Server-->>Browser: the JavaScript file
    deactivate Server

    Note right of Browser: Browser starts executing JavaScript to fetch the notes.
	
    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate Server
    Server-->>Browser: [ {"content": "0.4", "date": "2025-10-29"} ]
    deactivate Server
	
    Note right of Browser: The browser executes the callback function that renders the notes and updated notes on the page.
