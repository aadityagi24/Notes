//from .env file
require("dotenv").config();


const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const noteRoutes = require("./routes/noteRoutes");
const noteSocket = require("./sockets/noteSocket");


const app = express();


const server = http.createServer(app);

// setup Socket.IO on the server
const io = new Server(server, {
  cors: {
    origin: "*", // allow all
  },
});


connectDB();

// middleware to allow frontend access and parse json
app.use(cors());
app.use(express.json());

// route for handling notes
app.use("/notes", noteRoutes);

// handle real-time socket connections
noteSocket(io);


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("Server is running at http://localhost:" + PORT);
});
