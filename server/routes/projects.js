const express = require("express");
const router = express.Router();
const db = require("../models/index.js");
const { verifyToken } = require("../middlewares/users.js");
const multer = require('multer');
const uploadpath = "uploads";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadpath);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + file.originalname.match(/\..*$/)[0]
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb("Type file is not access", false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

router.get("/", verifyToken, async (req, res) => {
  try {
    let projects = await db.projects.findAll();
    if (projects) res.send(projects);
  } catch (e) {
    console.log(e)
    res.status(500).send(e);
  }
});

router.post("/", verifyToken, upload.single("file"), async (req, res) => {
  try {
    if (req.body) {
      const file = req.file;
      let { name, status, url, duedate } = req.body;
      await db.projects.create({
        name: name,
        image: file.filename,
        status: status,
        url: url,
        duedate: duedate
      });
      let projects = await db.projects.findAll();
      res.send(projects)
    }
    else res.status(400).send(e);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
