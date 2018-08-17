
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var TodoModel = require('../../models/user');
var todoType = require('../types/user').todoType;

// Query
exports.queryType = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      todos: {
        type: new GraphQLList(todoType),
        resolve: function () {
          const todos = TodoModel.find().exec()
          if (!todos) {
            throw new Error('Error')
          }
          return todos
        }
      }
    }
  }
});

