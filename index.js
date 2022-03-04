const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./database/config");

// Create server
const app = express();

// Database
dbConnection();

// cors
app.use(cors());

// Public directory
app.use(express.static("public"));

// Read and parse the body
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
// TODO: CRUD: Events

// lisent requests
app.listen(process.env.PORT, () => {
  console.log(`server runnning in port ${process.env.PORT}`);
});
