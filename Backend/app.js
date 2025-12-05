import express from 'express';
import router from './Router/route.js';
import connectDb from './DbConnection/connection.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());



// app.use('/', (req, res, next) =>{
//   res.send("Hello prashant")
// })
connectDb();

app.use("/api", router);

const port = 2000;
app.listen(port, (req, res)=>{
  console.log(`server start at port localhost:${port}`);
})