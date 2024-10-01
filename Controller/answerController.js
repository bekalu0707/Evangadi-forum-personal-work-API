function postAnswer(req,res){
    //
    res.send("post Answer to specific id question")
}
function getAnswer(req,res){
    //
    res.send("get All answer for specific id question")
}


module.exports={postAnswer,getAnswer}