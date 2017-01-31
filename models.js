const mongoose = require('mongoose');

// this is our schema to represent a post
const postSchema = mongoose.Schema({
  author: {type: String, required: true},
  title: {type: String},
  content: {type: String, required: true},
  publishDate: {type: Date, default: Date.now}
});

// *virtuals* (http://mongoosejs.com/docs/guide.html#virtuals)
// allow us to define properties on our object that manipulate
// properties that are stored in the database. Here we use it
// to generate a human readable string based on the address object
// we're storing in Mongo.
// postSchema.virtual('post').get(function() {
//   return `${this.id} ${this.title} ${this.content} ${this.author} ${this.publishDate}`.trim()});


// this is an *instance method* which will be available on all instances
// of the model. This method will be used to return an object that only
// exposes *some* of the fields we want from the underlying data
postSchema.methods.apiRepr = function() {

  return {
    title: this.title,
    content: this.content,
    author: this.author,
    publishDate: this.publishDate
  };
}

// note that all instance methods and virtual properties on our
// schema must be defined *before* we make the call to `.model`.
const BlogPost = mongoose.model('BlogPost', postSchema);

module.exports = {BlogPost};
