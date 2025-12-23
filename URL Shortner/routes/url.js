import express from "express";
import handleGenerateNewURL from "../controllers/url.js"
const router = express.Router();
router.post('/', handleGenerateNewURL)
export default router;