require('dotenv').config(); 

const express = require('express');
const aiRoutes = require('./routes/ai.routes');
const cors = require('cors');

const app = express();


app.use((req, res, next) => {
  console.log("Incoming origin:", req.headers.origin);
  next();
});

app.use(cors({
  origin: "http://localhost:5173", 
  methods: ['GET', 'POST'],
  credentials: true,
}));





app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world from backend");
});

app.use("/ai", aiRoutes);

module.exports = app;
