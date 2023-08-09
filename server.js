const express = require('express');
const path = require('path');
const uuid = require('./helpers/uuid');
const app = express();
const PORT = 3000;
const dbData = require('./db/db.json');
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


// app.get('/', (req, res) => res.send('Navigate to /send or /routes'));

// app.get('/send', (req, res) =>
//   res.sendFile(path.join(__dirname, 'public/send.html'))
// );

// app.get('/paths', (req, res) =>
//   res.sendFile(path.join(__dirname, 'public/paths.html'))
// );
app.get('/notes', (req, res) => 

    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) =>
    res.json(dbData)
);
app.post('/api/notes', (req, res) => {
// Log that a POST request was received
console.info(`${req.method} request received to add a note`)
    console.log(req.body.title)
    console.log(req.body.text)
    const newNote = {
       title: req.body.title,
       text: req.body.text,
       note_id: uuid(),
      };
      fs.appendFileSync('./db/db.json', ', ')
    fs.appendFileSync('./db/db.json', JSON.stringify(newNote))  
});
    

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);


app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
