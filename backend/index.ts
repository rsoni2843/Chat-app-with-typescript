import express, { Request } from "express";
import cors from "cors";
import http from "http";
import "dotenv/config";
import { Server } from "socket.io";
import userRoutes from "./src/routes/user.routes";
import chatRoutes from "./src/routes/chat.routes";
import connectDb from "./src/config/connect";

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL || "";
// const server = http.createServer(app);
const corsOptions = {
  transports: ["polling"],
  origin: "https://chat-app-rsoni2843.web.app",
  path: "/socket.io/",
  withCredentials: true, //access-control-allow-credentials:true
  credentials: true,
};
app.use(express.json());
app.use(cors());

// app.get("/", (req, res) => res.send("Home route working."));

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);

// const io = new Server(server, {
//   path: "/socket.io",
//   transports: ["websocket", "polling"],
//   cors: corsOptions,
// });
// io.on("connection", (socket) => {
//   // console.log("User connected: " + socket.id);
//   socket.on("add-user", (userId) => {
//     // console.log("USERERERRER", userId);
//     socket.join(userId);
//   });
//   socket.on("send-msg", (data) => {
//     // console.log("Message", data.msg);
//     socket
//       .to(data === null || data === void 0 ? void 0 : data.to)
//       .emit("msg-receive", data.msg);
//   });
// });

connectDb(MONGO_URL);

const server = app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});

// const io = socket(server)

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
    methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"]
  },
});
// global.onlineUsers = new Map();
io.on("connection", (socket) => {
  // console.log("User connected: " + socket.id);
  socket.on("add-user", (userId) => {
    // console.log("USERERERRER", userId);
    // onlineUsers.set(userId);
    socket.join(userId);
  });
  socket.on("send-msg", (data) => {
    // console.log("Message", data.msg);
    // const sendUserSocket = onlineUsers?.get(data?.to);
    socket.to(data.to).emit("msg-receive", data.msg);
  });
});
