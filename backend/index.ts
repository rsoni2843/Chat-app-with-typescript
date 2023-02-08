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
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});
io.on("connection", (socket) => {
  // console.log("User connected: " + socket.id);
  socket.on("add-user", (userId) => {
    // console.log("USERERERRER", userId);
    socket.join(userId);
  });
  socket.on("send-msg", (data) => {
    // console.log("Message", data.msg);
    socket.to(data?.to).emit("msg-receive", data.msg);
  });
});

app.get("/", (req, res) => res.send("Home route working."));

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);

connectDb(MONGO_URL);

server.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
