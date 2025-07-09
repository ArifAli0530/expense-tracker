const express = require("express");
const ExpanseRouter = require("./Routes/ExpanseRoute");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB } = require("./config/db");
const bodyParser = require("body-parser");
const AuthRouter = require("./Routes/auth");
const allowedOrigin = process.env.CLIENT_URL || "http://localhost:3000";
dotenv.config({ path: "./config/config.env" });

connectDB();
const app = express();
const PORT = 8000


app.use(cors({
  origin: allowedOrigin,
  credentials: true, // if you're using cookies or sessions
}));

app.use(bodyParser.json()); 
app.use("/auth", AuthRouter);
app.use("/epxense", ExpanseRouter);
app.use(express.json());
app.get("/",(req,res)=>{
  res.json({msg:"SERVER IS READY TO USE"})
})
app.listen(PORT, () => {
  console.log(`Server Started ${PORT}`);
});


