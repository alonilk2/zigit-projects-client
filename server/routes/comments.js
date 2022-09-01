const express = require("express");
const router = express.Router();
const db = require("../models/index.js");
const { verifyToken } = require("../middlewares/users.js");

router.get("/:id", verifyToken, async (req, res) => {
  try {
    let id = req.params.id;
    let comments = await db.comments.findAll({ where: { projectId: id } });
    res.send(comments);
  } catch (e) {
    console.log(e)
    res.status(500).send(e);
  }
});

router.post("/", verifyToken, async (req, res) => {
  try {
    if (req.body) {
      console.log(req.body);
      let { comment, parent } = req.body;
      await db.comments.create({
        text: comment,
        projectId: parent.id,
      });
      let projects = await db.projects.findAll();
      res.send(projects);
    } else res.status(400).send(e);
  } catch (e) {
    console.log(e)
    res.status(500).send(e);
  }
});

module.exports = router;
