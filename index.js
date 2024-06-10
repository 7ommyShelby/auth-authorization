const express = require("express");
const mongoose = require("mongoose");

const authrouter = require('./routes/auth')
const postrouter = require('./routes/post')

const validateuser = require('./middleware/auth')


const app = express();
const port = 8000;
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/authapp")
  .then(() => console.log("DB Connected successfully"))
  .catch((err) => console.log(err));


app.use('/api/user/', authrouter)
app.use('/api/user/', validateuser,postrouter)

app.listen(port, ()=>{
    console.log("server up and running at port", port);
})