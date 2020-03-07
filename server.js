const express = require("express");
const app = express();
const db = require("./db");
const path = require("path");
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/users", async (req, res, next) => {
  try {
    res.send(await db.findAllUsers());
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/departments", async (req, res, next) => {
  try {
    res.send(await db.findAllDepartments());
  } catch (ex) {
    next(ex);
  }
});

db.sync().then(() => app.listen(port, () => console.log("listening")));
