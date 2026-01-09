import express from "express";
import {handleGenerateNewURL, handleGetAnalytics} from "../controllers/url.js"
const router = express.Router();

router.post('/', handleGenerateNewURL)


router.get('/analytics/:shortId', handleGetAnalytics);

export default router;