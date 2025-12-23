import mongoose from "mongoose";
async function connectTomongoDB(url){
  return mongoose.connect(url)
}
export default connectTomongoDB;