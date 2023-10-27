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
    !notes &&
      res.status(400).json({ message: "note not found ", status: false });
    const note = await Note.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "note deleted successfull", status: true });
  } catch (e) {
    res.status(500).json(e);
  }
});

//update notes
router.put("/updateNotes/:id", async (req, res) => {
  try {
    const notes = await Note.findOne({ _id: req.params.id });
    !notes &&
      res.status(400).json({ message: "note not found ", status: false });
    const note = await Note.updateOne({
      title: req.body.title,
      description: req.body.description,
      postedBy: req.body.postedBy,
    });
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

    !currentUser && res.status(400).json("user not found");
    const notes = await Note.find({ postedBy: req.params.userId });

    res.status(200).json(notes);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
