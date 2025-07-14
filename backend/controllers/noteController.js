const Note = require("../models/Note");


exports.createNote = async (req, res) => {
  try {
    
    const newNote = await Note.create(req.body);
    res.status(201).json(newNote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not create the note" });
  }
};


exports.getNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const foundNote = await Note.findById(noteId);
    res.json(foundNote);

  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Note not found" });
  }
};


exports.updateNote = async (req, res) => {
  try {
    
    const noteId = req.params.id;

    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      {
        content: req.body.content,
        updatedAt: Date.now()
      },
      { new: true } 
    );

    res.json(updatedNote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not update the note" });
  }
};
