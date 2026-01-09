🔗 URL Shortener Project – Code Flow & Documentation

1. Project Overview

This project is a URL Shortener Web Application built using:

Node.js

Express.js

MongoDB

EJS (templating)

HTML + CSS

What it does:

Takes a long URL from the user

Generates a short unique ID

Stores the mapping in MongoDB

Redirects short URL → original URL

Tracks visit history

Displays all generated URLs on homepage

2. Folder Structure
URL-Shortner/
│
├── controllers/
│   └── url.js
│
├── models/
│   └── url.js
│
├── routes/
│   └── url.js
│
├── views/
│   └── home.ejs
│
├── public/
│   └── css/
│       └── style.css
│
├── connect.js
├── index.js
└── package.json

3. Code Flow (Step-by-Step)
🔁 Overall Request Flow
Browser → Express Server → Routes → Controllers → MongoDB → Response

4. Database Connection (connect.js)
Purpose:

Connects the application to MongoDB.

Flow:

Mongoose connects to MongoDB

Connection promise resolves

Server starts only after successful connection

Why this matters:

Prevents server from running without database

Avoids runtime crashes

5. Data Model (models/url.js)
URL Schema:
{
  shortId: String,
  redirectURL: String,
  visitHistory: [
    { timestamp: Number }
  ]
}

Purpose:

shortId → unique identifier for short URL

redirectURL → original long URL

visitHistory → tracks clicks

6. Main Server (index.js)
Responsibilities:

Initialize Express app

Enable middleware

Configure EJS

Mount routes

Start server

Important Middleware:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

Why middleware is required:

Parses form data (req.body)

Serves CSS files

Prevents req.body undefined error

7. Routes (routes/url.js)
POST /url

➡ Create short URL

GET /url/:shortId

➡ Redirect to original URL

Why routes are separated:

Clean code

Better scalability

Industry-standard practice

8. Controller Logic (controllers/url.js)
A. Generate Short URL
POST /url

Flow:

Read req.body.url

Validate input

Generate short ID using nanoid

Save data to MongoDB

Return short ID

Why nanoid:

Short

Collision-resistant

Fast

B. Redirect Logic
GET /url/:shortId

Flow:

Extract shortId from URL

Find matching document in DB

Log visit timestamp

Redirect to original URL

9. Frontend (EJS – home.ejs)
Purpose:

Collect user input

Display all shortened URLs

Form Submission:
<form method="POST" action="/url">


➡ Sends data to backend automatically
➡ No JavaScript required

Display URLs using forEach
<% allUrls.forEach((url) => { %>
  <li>
    <a href="/url/<%= url.shortId %>">
      /url/<%= url.shortId %>
    </a>
  </li>
<% }) %>

Why EJS:

Server-side rendering

Simple syntax

Good for beginners

10. Static Files (CSS)
Setup:
app.use(express.static("public"));

Usage:
<link rel="stylesheet" href="/css/style.css">

Purpose:

Improve UI

Separate styling from logic

11. Error Handling & Validation

Handled cases:

Empty URL submission

Invalid short ID

Missing database entry

Prevents:

App crashes

Bad user experience

12. Technologies Used
Technology	Purpose
Node.js	Runtime
Express.js	Backend framework
MongoDB	Database
Mongoose	ODM
EJS	Templating
nanoid	Short ID generation
HTML/CSS	Frontend
13. How to Run the Project
npm install
node index.js


Open in browser:

http://localhost:8000