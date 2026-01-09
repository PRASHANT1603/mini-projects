import express from "express";
import path from "path"
import urlRoute from "./routes/url.js"
import connectTomongodb from "./connect.js"
import staticRoute from "./routes/staticRouter.js"
import userRoute from "./routes/user.js"
import cookieParser from "cookie-parser";
import URL from "./models/url.js";
import restricToLoggedinUserOnly from "./middlewares/auth.js"

const app = express()

const PORT = 8000

connectTomongodb('mongodb://localhost:27017/short-url').then(
  console.log("MongoDB Connected")

)
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/", staticRoute);
app.use("/user", userRoute);

app.set("view engine", "ejs");
app.set("views", path.join("./views"));

app.get("/test", async(req, res)=> {
  const allUrls = await URL.find({});
  return res.render("home", {
    urls: allUrls,
  })
})

app.use("/url", restricToLoggedinUserOnly, urlRoute);


app.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;

  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    },
    { new: true }
  );

  if (!entry) {
    return res.status(404).send("Short URL not found");
  }

  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`server started at PORT${PORT}`))