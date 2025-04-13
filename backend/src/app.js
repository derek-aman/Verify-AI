const express = require('express');
const aiRoutes = require('./routes/ai.routes');
const cors = require('cors')

const app = express()

app.use(cors({
    origin: process.env.FRONTEND_URL, 
    methods: ['GET', 'POST'],
    credentials: true,
  }))

app.use(express.json())

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/ai", aiRoutes);

module.exports = app;  