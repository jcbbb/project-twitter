const express = require("express");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const socketIO = require("socket.io");
const http = require("http");
const path = require("path");
const verifyToken = require("./utils/verifyToken");
const db = require("./db");
const socket = require("./routes/socket");

const env = process.env.NODE_ENV || "dev";
const config = require(`./config/${env}`);

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", (client) => socket(client, io));

// Connecting to database...
db.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());
app.use(cookieParser());
app.use(
  cors({
    origin: config.origin,
    credentials: true,
  })
);

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.get("/me", verifyToken, async (req, res) => {
  const { user } = req;
  res.json({ message: "Authorization cookie is verified", status: 200, user });
});

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/tweets", require("./routes/tweets"));
app.use("/api/direct", require("./routes/direct"));
app.use("/api/upload", require("./routes/upload"));

if (process.env.NODE_ENV === "prod") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.set("port", process.env.PORT || 4000);

module.exports = { server, app };
