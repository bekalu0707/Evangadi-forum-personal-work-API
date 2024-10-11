require("dotenv").config();
const mysql2 = require("mysql2");
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");



const app = express();
const port=5500


app.use(bodyparser.json());   //body json format
app.use(bodyparser.urlencoded({ extended: true }))
app.use(cors());
app.use(express.json());

//db connection credentials
const dbConnection=require('./db/dbconfig')
 
//middlewear authorization
const authMiddleware = require('./middlewear/authMiddleware')


//   //testing the backend
  app.get("/",(req,res)=>{
    res.send("welcome")
  })

  // creating tables middlewear install
  const installRoutes=require('./routes/installRoute')
  app.use('/',installRoutes)
//user route middlewear
const userRoutes=require('./routes/userRoute')
app.use('/api/users',userRoutes)

//question route middlewear
const questionRoutes=require('./routes/questionRoute')
app.use('/api',authMiddleware,questionRoutes)

//Answer route middlewear
const answerRoutes=require('./routes/answerRoute')
app.use('/api',authMiddleware,answerRoutes)

  // app.listen(port, () => console.log(`Listening to :${port}`));

  // try conncet to database and if so app listen
  async function start(){
    try {
      const result=await dbConnection.connect();
      console.log("database connection established");
     
    } catch (error) {
      start();
      console.log(error.message)
    }
  }
  start();
  app.listen(port, (error) => {
    if(error)
      console.log(error.message)
    console.log(`Listening to :${port}`)
  });
