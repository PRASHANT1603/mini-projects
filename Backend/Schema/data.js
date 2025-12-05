
import mongoose from "mongoose";
const MyTask = new mongoose.Schema({
  task:{
    type: String,
    required: true
  },
  isComplete:{
    type:Boolean,
    default:false
  },
  Time:{
    type: Date,
    default: Date.now
  }

});

export default mongoose.model("Todo", MyTask);