const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const path = require("path");
dotenv.config();

const app = express();

app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());


const PORT = process.env.PORT || 3004;


app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});