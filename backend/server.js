const express = require('express');
// const dotenv = require('dotenv');
// dotenv.config();
const app = express();
const port=8000

const mongoose = require('mongoose');
const cors = require('cors');
const todorouter = require("./router/Expensiverouter");
const MONGODB_URL="mongodb+srv://sanju:Sanju123@cluster0.xki84hy.mongodb.net/crud?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(MONGODB_URL)
  .then(() => console.log('MongoDB is connected'))
  .catch((err) => console.log("MongoDB is not connected", err));



// middleware
app.use(express.json());
app.use(cors());

app.use(todorouter);

app.listen(port, () => 
  console.log(`The server is running on port ${port}`)
);
