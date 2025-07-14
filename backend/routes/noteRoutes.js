const express = require("express");
const router = express.Router();
const {
  createNote,
  getNote,
  updateNote,
} = require("../controllers/noteController");

router.post("/", createNote);
router.get("/:id", getNote);
router.put("/:id", updateNote);

module.exports = router;
