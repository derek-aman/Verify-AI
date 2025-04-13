const express = require("express");
const aiController  = require("../controllers/ai.controller");  // Adjusted for CommonJS

const router = express.Router();

router.post("/get-review", aiController.getReview);

module.exports = router;  
