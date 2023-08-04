const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express(); 

// Serve static files (index.html, CSS, JS) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000; // Use the environment variable for Heroku or port 3000 for local development

app.listen(PORT, () => {
    console.log('Server listening on port ${PORT}');
});

// Define a route for serving index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  // Define a route for serving notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'notes.html'));
  });

  const dbPath = path.join(__dirname, 'db.json');

  app.get('/api/notes', (req, res) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error reading notes from the database' });
      } else {
        const notes = JSON.parse(data);
        res.json(notes);
      }
    });
  });

  app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error reading notes from the database' });
      } else {
        const notes = JSON.parse(data);
        newNote.id = generateUniqueId(); // You need to implement a function to generate a unique ID
        notes.push(newNote);
  
        fs.writeFile(dbPath, JSON.stringify(notes), (err) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error saving the note to the database' });
          } else {
            res.json(newNote);
          }
        });
      }
    });
  });

  app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error reading notes from the database' });
      } else {
        const notes = JSON.parse(data);
        const filteredNotes = notes.filter((note) => note.id !== noteId);
  
        fs.writeFile(dbPath, JSON.stringify(filteredNotes), (err) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error deleting the note from the database' });
          } else {
            res.json({ message: 'Note deleted successfully' });
          }
        });
      }
    });
  });