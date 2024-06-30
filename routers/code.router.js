const express = require("express");
const router = express.Router();
const { executeCode } = require("../services/code.service");

router.post("/execute", async (req, res) => {
  const { code, language } = req.body;
  try {
    const result = await executeCode(code, language);
    res.json(result);
  } catch (error) {
    console.error("Error executing code:", error);
    res.status(500).send("Error executing code");
  }
});

module.exports = router;
