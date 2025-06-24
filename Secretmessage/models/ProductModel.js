import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: [true, 'Please provide a message'],
    trim: true,
  },
  
 // Automatically adds createdAt and updatedAt fields
});

// The Model is a wrapper on the Schema that provides an interface to the database.
// 'Product' will be turned into a collection named 'products' in MongoDB.
const Message = mongoose.model("Message", messageSchema);

//module.exports = Message;
export default Message