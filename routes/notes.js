const notes = require("express").Router();
const notesData = require("../db/db.json");
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");
const nanoid = require("nanoid").nanoid;

// GET route for loading notes
notes.get("/", (req, res) => {
  console.info(`Received ${req.method} request for notes`);
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST route for saving a note
notes.post("/", (req, res) => {
  console.info(`Received ${req.method} request to save note`);

  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title, 
      text, 
      id: nanoid(4).toString(),
    };

    readAndAppend("./db/db.json", newNote);

    const response = {
      status: "Success", 
      body: newNote,
    };

    res.json(response);
  } else {
    res.json("Error in saving note");
  }
});

// GET route for loading a specific note
notes.get("/:id", (req, res) => {
  const requestedNote = req.params.id;

  for (let i = 0; i < notesData.length; i++) {
    if (requestedNote === notesData[i].id) {
      return res.json(notesData[i]);
    }
  }

  return res.json("No note found");
});

module.exports = notes;