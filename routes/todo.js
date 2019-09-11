const _ = require("lodash");
const objectID = require("mongoose").Types.ObjectId;
const router = require("express").Router();
const { Todos, validate } = require("../models/todos");

router.get("/", async (req, res) => {
  const todoFromDB = await Todos.find();
  res.json(todoFromDB);
});

router.get("/:id", async (req, res) => {
  todoID = req.params["id"];
  if (!objectID.isValid(todoID)) {
    return res.status(404).send();
  }

  todoFromDB = await Todos.findById(todoID);
  if (_.isNull(todoFromDB)) {
    return res.status(404).send();
  }

  res.json(todoFromDB);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send({ error: error.details[0].message });
  }
  const {
    description,
    task,
    dateCreated,
    dateForTask,
    completed,
    timeCreated
  } = _.pick(req.body, [
    "description",
    "task",
    "dateCreated",
    "dateForTask",
    "completed",
    "timeCreated"
  ]);

  await Todos.create({
    description,
    task,
    dateCreated,
    dateForTask,
    completed,
    timeCreated
  });

  res.status(201).json(Todos);
});

router.put("/:id", async (req, res) => {
  todoID = req.params["id"];
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send({ error: error.details[0].message });
  }
  if (!objectID.isValid(todoID)) {
    return res.status(400).send({ error: "invalid ID" });
  }

  const {
    description,
    task,
    dateCreated,
    dateForTask,
    completed,
    timeCreated
  } = _.pick(req.body, [
    "description",
    "task",
    "dateCreated",
    "dateForTask",
    "completed",
    "timeCreated"
  ]);

  const todoFromDB = await Todos.findByIdAndUpdate(todoID, {
    description,
    completed,
    task,
    dateCreated,
    timeCreated,
    dateForTask
  });

  if (!todoFromDB) {
    return res.status(404).send();
  }

  res.status(204).send();
});

router.delete("/:id", async (req, res) => {
  todoID = req.params["id"];
  if (!objectID.isValid(todoID)) {
    return res.status(400).send({ error: "invalid ID" });
  }

  const todoFromDB = await Todos.findByIdAndRemove(todoID);
  if (!todoFromDB) {
    return res.status(404).send();
  }

  res.status(204).send();
});

module.exports = router;
