const dbConnection=require('../db/dbconfig')
const {StatusCodes}=require('http-status-codes')

async function question(req, res) {
  // Assignee: Edom;
  // Assignee: Hanna;
  //post question

  const {questionid,title,description}=req.body
if(!questionid || !title ||!description){
  console.log(questionid);
  return res.status(StatusCodes.BAD_REQUEST).json({msg:"please provide all requird information"})
}
if(title.length>200){
  return res.status(StatusCodes.BAD_REQUEST).json({msg:"Title must  lessthan 200 characters"})
}

try {
  const username=req.user.username;  // from auth middlewear
  const userid=req.user.userid       // from auth middlewear
  await dbConnection.query("insert into questions (questionid,userid,title,description) values(?,?,?,?)",[questionid,userid,title,description])
  return res.status(StatusCodes.CREATED).json({msg:"Your Question Posted sucessfully"})
} catch (error) {
  console.log(error.message)
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"someting went wrong,try again later"})
}

}

async function Allquestion(req, res) {
  //Assignee: Feysel
  //Assignee: Belayenesh;
  try {
   
    const [questions]= await dbConnection.query("select questions.id,questions.questionid,questions.userid,questions.title,questions.description,users.username from questions INNER JOIN users where questions.userid = users.userid ORDER BY questions.id DESC")
    return res.status(StatusCodes.OK).json({msg:"All question sent",questions})
  } catch (error) {
    console.log(error.message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"someting went wrong,try again later"})
  }
  
}

module.exports = { question, Allquestion };
