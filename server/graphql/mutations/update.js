var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var TodoType = require('../types/user');
var TodoModel = require('../../models/user');
var GraphQLBoolean = require('graphql').GraphQLBoolean;

exports.update = {
  type: TodoType.todoType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString)
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
    },
    isChecked: {
      type: new GraphQLNonNull(GraphQLBoolean),
    }
  },
  resolve(root, params) {
    return TodoModel.findByIdAndUpdate(
      params.id,
      { $set: { content: params.content, isChecked: params.isChecked } },
      { new: true }
    )
    .catch(err => new Error(err));
  }
}

