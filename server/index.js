const express = require("express");
const ExpanseRouter = require("./Routes/ExpanseRoute");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB } = require("./config/db");
const bodyParser = require("body-parser");
const AuthRouter = require("./Routes/auth");
// const allowedOrigin = process.env.CLIENT_URL ;
dotenv.config({ path: "./config/config.env" });

connectDB();
const app = express();
const PORT = 8000;


app.use(cors({
  origin:"http://localhost:3000",
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
app.listen(PORT, () => {
  console.log(`Server Started ${PORT}`);
});


