

var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLBoolean = require('graphql').GraphQLBoolean;
// User Type
exports.todoType = new GraphQLObjectType({
  name: 'todo',
  fields: function () {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      },
      content: {
        type: GraphQLString
      },
      isChecked: {
        type: GraphQLBoolean
      }
    }
  }
});

