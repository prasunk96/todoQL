var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var TodoType = require('../types/user');
var TodoModel = require('../../models/user');

exports.remove = {
  type: TodoType.todoType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve(root, params) {
    const removedtodo = TodoModel.findByIdAndRemove(params.id).exec();
    if (!removedtodo) {
      throw new Error('Error')
    }
    return removedtodo;
  }
}
