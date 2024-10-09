const dbConnection=require('../db/dbconfig')
const bcrypt=require('bcrypt')
const {StatusCodes}=require('http-status-codes')
const jwt = require ('jsonwebtoken')
async function register(req, res) {
  //Assignee: Ephrame  // Assignee: Bereket; 
const {username,firstname,lastname,email,password}=req.body
if(!username || !firstname || !lastname || !email || !password){
  return res.status(StatusCodes.BAD_REQUEST).json({msg:"please provide all requird information"})
}
try {
  const [user]= await dbConnection.query("select username,userid from users where username=? or email=? ",[username,email])
  if(user.length>0){
    return res.status(StatusCodes.BAD_REQUEST).json({msg:"User already existed"})
  }
  if(password.length<8){
    return res.status(StatusCodes.BAD_REQUEST).json({msg:"password must be atleast 8 characters"})
  }
  const salt=await bcrypt.genSalt(10)
  const hashedPassword=await bcrypt.hash(password,salt)
  await dbConnection.query("insert into users (username,firstname,lastname,email,password) values(?,?,?,?,?)",[username,firstname,lastname,email,hashedPassword])
  return res.status(StatusCodes.CREATED).json({msg:"User registered successfully"})
} catch (error) {
  console.log(error.message)
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"someting went wrong,try again later"})
}
}
function checkuser(req, res) {
  //Assignee: Habte and bekalu
  const username=req.user.username;
  const userid=req.user.userid
  return res.status(StatusCodes.OK).json({msg:"valid user",username,userid})

}
async function login(req, res) {
  const {email,password}=req.body
  if(!email || !password){
    return res.status(StatusCodes.BAD_REQUEST).json({msg:"please provide all requird information"})
  }
  try {
    const [user]= await dbConnection.query("select username,userid,password from users where email=? ",[email])
    if(user.length === 0){
      return res.status(StatusCodes.BAD_REQUEST).json({msg:"Invaild credential"})
    }
    const isMatch=await bcrypt.compare(password,user[0].password)
   
   if (!isMatch)
   {
    return res.status(StatusCodes.BAD_REQUEST).json({msg:"Invaild credential"})
   }

   //if usename and password correct send token
   const username=user[0].username
   const userid=user[0].userid
   const token = jwt.sign({username,userid},process.env.JWTSECRET,{expiresIn :"1d"})
   return res.status(StatusCodes.OK).json({msg:"user login sucessful",token,username})
  } catch (error) {
    console.log(error.message)
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"someting went wrong,try again later"})
  }

}

module.exports = { register, checkuser, login };
