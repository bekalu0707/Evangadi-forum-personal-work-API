const dbConnection=require('../db/dbconfig')
const {StatusCodes}=require('http-status-codes')

 async function postAnswer(req,res){
  //Assignee: Liyu
  const {questionid, answer}=req.body
if(!questionid || !answer){
  return res.status(StatusCodes.BAD_REQUEST).json({msg:"please provide all requird information"})
}
try {
  const username=req.user.username;  // from auth middlewear
  const userid=req.user.userid       // from auth middlewear
  await dbConnection.query("insert into answers (questionid,userid,answer) values(?,?,?)",[questionid,userid,answer])
  return res.status(StatusCodes.CREATED).json({msg:"Your Answer Posted sucessfully"})
} catch (error) {
  console.log(error.message)
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"someting went wrong,try again later"})
}
 
}


async function getAnswer(req,res){
  //Assignee: Selam

  // use get all question in front end and filter the specific questionid and display with description
  //then for answer
  const questionid=req.headers.questionid
  try {
   
    const [answer]= await dbConnection.query("SELECT filtered_table.*, users.username FROM (SELECT * FROM answers WHERE answers.questionid = ?) AS filtered_table JOIN users ON filtered_table.userid = users.userid",[questionid])
    return res.status(StatusCodes.OK).json({msg:"All answers sent for the question",answer})
  } catch (error) {
    console.log(error.message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"someting went wrong,try again later"})
  }
  

}


module.exports={postAnswer,getAnswer}