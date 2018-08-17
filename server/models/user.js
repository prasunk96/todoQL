var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  isChecked: {
    type: Boolean,
    required: true
  }
});
var Model = mongoose.model('Todo', todoSchema);
module.exports = Model;
