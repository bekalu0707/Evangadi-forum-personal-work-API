function postAnswer(req,res){
  //Assignee: Liyu
  res.send("post Answer to specific id question");
}

function getAnswer(req,res){
  //Assignee: Selam

  res.send("get All answer for specific id question");
}


module.exports={postAnswer,getAnswer}