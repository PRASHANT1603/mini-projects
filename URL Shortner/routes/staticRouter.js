import express from "express";
const router= express.Router();
import URL from "../models/url.js";

router.get("/", async(req, res)=> {
  const allUrls = await URL.find({});
  return res.render("home", { 
    urls: allUrls, 
  });
});

export default router;