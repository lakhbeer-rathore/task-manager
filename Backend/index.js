require("dotenv").config();
const express = require("express");
const cookieParser= require("cookie-parser");
const {connectToMongoDB} = require("./connection");
const Task = require("./models/task");
const cors = require("cors");
const taskRoute = require("./routes/taskRouter");
const userRoute = require("./routes/userRouter");
const errorHandler = require("./middlewares/errorMiddleware");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
origin: "http://localhost:5173",
credentials: true
}));

const PORT = process.env.PORT;

connectToMongoDB(process.env.MONGO_URL) 
    .then(() =>  console.log("MongoDB Connected!!")
    )

    

app.get("/" , (req,res)=> {
    return res.send("Hello from home page");
});

app.use("/api/task", taskRoute);
app.use("/api/user", userRoute);
app.use(errorHandler);

app.listen(PORT, ()=> console.log("Server started"));