import mongoose, { connect } from "mongoose";
const url = "mongodb+srv://myTodo:Prajapati%40123@mytodo.gwpciws.mongodb.net/?appName=myTodo"
const connectDb = async()=>{

try{
  
    await mongoose.connect(url);
    console.log("database connected");

  }catch(error){

    console.log("Not connected", error);

    
  }
};

export default connectDb;