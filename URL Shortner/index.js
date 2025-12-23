import express from "express";
import urlRoute from "./routes/url.js"
import connectTomongodb from "./connect.js"
const app = express()

const PORT = 8000

connectTomongodb('mongodb://localhost:27017/short-url').then(
  console.log("MongoDB Connected")

)

app.use(express.json())

app.use("/url", urlRoute);

app.listen(PORT, () => console.log(`server started at PORT${PORT}`))