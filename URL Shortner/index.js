import express from "express";
import path from "path";
import cookieParser from "cookie-parser";

import connectTomongodb from "./connect.js";
import URL from "./models/url.js";

import urlRoute from "./routes/url.js";
import staticRoute from "./routes/staticRouter.js";
import userRoute from "./routes/user.js";

import {
  restricToLoggedinUserOnly,
  chackAuth,
} from "./middlewares/auth.js";

const app = express();
const PORT = 8000;


// DATABASE CONNECTION
connectTomongodb("mongodb://localhost:27017/short-url")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));


// VIEW ENGINE
app.set("view engine", "ejs");
app.set("views", path.join("./views"));


// MIDDLEWARES
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ROUTES
app.use("/", chackAuth, staticRoute);
app.use("/user", userRoute);
app.use("/url", restricToLoggedinUserOnly, urlRoute);


// TEST ROUTE (TEMP)
app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home", {
    urls: allUrls,
  });
});


// REDIRECT ROUTE
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


// SERVER START
app.listen(PORT, () =>
  console.log(`Server started at PORT ${PORT}`)
);
