const express = require("express");
const app = express();
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const helmet = require('helmet')


const authRoter = require("./routers/auth");
// const userRoter = require("./routers/user");
const studentRoter = require("./routers/students");
const classRoter = require("./routers/klasat");
const salahRoter = require("./routers/salah");

const cors = require("cors");


dotenv.config();
app.use(express.json());

app.use(helmet());

const port = process.env.PORT || 5000;



const allowedOrigin = 'https://mf-vaspitna2008c.onrender.com';

const corsOptions = {
  origin: allowedOrigin,
  optionsSuccessStatus: 200, 
};

app.use(cors(corsOptions));

const dbUrl = process.env.MONGO
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
 
}


app.use("/" , (req, res)=>{
    res.send("Hello from api")
})
app.use("/auth", authRoter);
// app.use("/api/users", userRoter);
app.use("/students", studentRoter);
app.use("/salah", salahRoter);
app.use("/klasat", classRoter);


app.listen(port, ()=>{
     console.log("Backend server is running at port: " + port);
});