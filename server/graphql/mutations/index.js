var addTodo = require('./add').add;
var removeTodo = require('./remove').remove;
var updateTodo = require('./update').update;

module.exports = {
  addTodo,
  removeTodo,
  updateTodo
}