const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

//Subdocument
const commentSchema = new Schema({
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    }
},{
  timestamps: true
});

const dishSchema = new Schema({
  //Field1
  name: {
    type: String,
    required: true,
    unique: true
  },
  //Field2
  description: {
    type: String,
    required: true
  },
  //Subdocument
  comments: [ commentSchema ]
},{
  timestamps: true
});

var Dishes = mongoose.model('Dish',dishSchema);

module.exports = Dishes;
