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

// setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // allow all
  },
});

// connect to MongoDB
connectDB();

// middleware
app.use(cors());
app.use(express.json());


app.get("/favicon.ico", (req, res) => res.status(204).end()); //on vercel err

app.get("/", (req, res) => {
  res.send("Backend is activated and running!");
});

// note routes
app.use("/notes", noteRoutes);

// socket setup
noteSocket(io);


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("Server is running at http://localhost:" + PORT);
});
