const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const todosSchema = new mongoose.Schema({
  task: String,
  description: String,

  timeCreated: String,

  dateCreated: { type: Date, Default: Date.now() },

  dateForTask: { type: Date },

  completed: Boolean
});

const validateTodo = todos => {
  let Joi = require("joi");
  var schema = {
    task: Joi.string()
      .min(6)
      .max(30)
      .required(),
    description: Joi.string()
      .min(8)
      .required(),

    timeCreated: Joi.string().required(),
    completed: Joi.boolean().required(),
    dateCreated: Joi.date().required(),
    dateForTask: Joi.date().required()
  };
  return Joi.validate(todos, schema);
};

const Todos = mongoose.model("todos", todosSchema);

exports.validate = validateTodo;
exports.Todos = Todos;
