
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var TodoType = require('../types/user');
var TodoModel = require('../../models/user');
var GraphQLBoolean = require('graphql').GraphQLBoolean;

exports.add = {
  type: TodoType.todoType,
  args: {
    content: {
      type: new GraphQLNonNull(GraphQLString),
    },
    isChecked: {
      type: new GraphQLNonNull(GraphQLBoolean),
    }
  },
  resolve(root, params) {
    const tModel = new TodoModel(params);
    const newTodo = tModel.save();
    if (!newTodo) {
      throw new Error('Error');
    }
    return newTodo
  }
}