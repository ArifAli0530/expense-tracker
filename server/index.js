const express = require("express");
const ExpanseRouter = require("./Routes/ExpanseRoute");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB } = require("./config/db");
const bodyParser = require("body-parser");
const AuthRouter = require("./Routes/auth");
const app = express();
dotenv.config({ path: "./config/config.env" });

connectDB();

app.use(cors({
  origin: process.env.CORS_PORT,
  methods:["GET","POST","PUT"],
  credentials: true,
}));

app.use(bodyParser.json({limit:'30mb'})); 
app.use("/auth", AuthRouter);
app.use("/epxense", ExpanseRouter);
app.use(express.json());
app.get("/",(req,res)=>{
  res.json({msg:"SERVER IS READY TO USE"})
})
app.listen(process.env.PORT, () => {
  console.log(`Server Started ${process.env.PORT}`);
});


