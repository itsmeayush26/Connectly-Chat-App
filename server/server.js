import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";

// create the express app and the http server
const app = express();
const server = http.createServer(app)  //http server bcs socket.io support http server 


//middleware setup
app.use(express.json({ limit: "4mb" }))
app.use(cors());

//routes setup done here 
app.use("/api/status", (req, res) => res.send("Server is live"));

app.use("/api/auth",userRouter)


//connect to mongodb 
await connectDB();

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log("server is running on PORT:" + PORT))