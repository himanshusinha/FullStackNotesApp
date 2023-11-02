const router = require("express").Router();
const Note = require("../models/Notes");
const User = require("../models/User");

//create notes
router.post("/addNotes", async (req, res) => {
  try {
    const note = new Note({
      title: req.body.title,
      description: req.body.description,
      postedBy: req.body.postedBy,
    });

    const data = await note.save();

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json(e);
  }
});

//delete notes
router.delete("/deleteNotes/:id", async (req, res) => {
  try {
    const notes = await Note.findOne({ _id: req.params.id });
    if (!notes) {
      return res.status(400).json({ message: "Note not found", status: false });
    }

    const result = await Note.deleteOne({ _id: req.params.id });

    if (result.deletedCount > 0) {
      res
        .status(200)
        .json({ message: "Note deleted successfully", status: true });
    } else {
      res
        .status(500)
        .json({ message: "Error deleting the note", status: false });
    }
  } catch (e) {
    res.status(500).json(e);
  }
});
//update notes
router.put("/updateNotes/:id", async (req, res) => {
  try {
    const notes = await Note.findOne({ _id: req.params.id });
    if (!notes) {
      return res.status(400).json({ message: "note not found", status: false });
    }

    const result = await Note.updateOne(
      {
        _id: req.params.id,
      },
      {
        title: req.body.title,
        description: req.body.description,
        postedBy: req.body.postedBy,
      }
    );

    res
      .status(200)
      .json({ message: "note updated successfully", status: true });
  } catch (e) {
    res.status(500).json(e);
  }
});

//get all notes
router.get("/getNotes/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);

    !currentUser && res.status(400).json({ message: "user not found" });
    const notes = await Note.find({ postedBy: req.params.userId });

    res.status(200).json(notes);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
