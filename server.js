// Import required modules
const express = require('express');
const path = require('path');
const uuid = require('./helpers/uuid');
const fs = require('fs');

// Create an instance of the Express application
const app = express();

// Set the port for the server to listen on
const port = process.env.PORT || 3001

// Load initial data from a JSON file
const dbData = require('./db/db.json');

// Set up middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route to serve the 'notes.html' file
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// Route to get all notes from the JSON database
app.get('/api/notes', (req, res) =>
    res.json(dbData)
);

// Route to add a new note to the JSON database
app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);
    
    // Extract data from the request body
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        note_id: uuid(),
    };
    
    // Append the new note to the JSON database file
    fs.appendFileSync('./db/db.json', ', ');
    fs.appendFileSync('./db/db.json', JSON.stringify(newNote));
    
    // Send a response indicating success
    res.json({ message: 'Note added successfully' });
});

// Route to serve the 'index.html' file
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

// Start the server and listen for incoming requests on the specified port
app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);