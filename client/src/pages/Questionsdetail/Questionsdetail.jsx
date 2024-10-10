import React, { useContext, useEffect, useRef, useState } from 'react'
import classes from './questionsdetail.module.css'
import { Link } from 'react-router-dom'
import axios from '../../Api/axiosConfig';
import { AppState } from '../../App';
import { useParams } from 'react-router-dom'
import { IoIosContact } from "react-icons/io";
import { IoMdContact } from "react-icons/io";

function Questionsdetail() {
  const answerDom= useRef(null);
  const messageDom=useRef(null);
  const {user}=useContext(AppState);
  const token = localStorage.getItem('token');
  const {questionid} = useParams()
  const [answers,setanswers]=useState([]);
  const [questions,setquestions]=useState([]);
  const [posted,setposted]=useState(false)

  async function Loadquestion() {
    try {
      const {data} = await axios.get("/question",{
        headers:{
          authorization:"Bearer " + token,
        }
      });
      // const {questions}=data
      // console.log(typeof questions )
      console.log(data.questions)
      const filter=data.questions.find(question=>question.questionid == questionid)
      console.log(filter)
      setquestions(()=>filter)
      // console.log(question)
      
    } catch (error) {
      console.log(error.response);
      // navigate("/")
    }
  }
  async function Loadanswers() {
    try {
      const {data} = await axios.get(`/answer/${questionid}`,{
        headers:{
          authorization:"Bearer " + token,
          questionid:questionid
        }
      });
      // const {questions}=data
      // console.log(typeof questions )
      console.log(data.answer)
      setanswers(()=>data?.answer)
      // console.log(question)
      
    } catch (error) {
      console.log(error.response);
      // navigate("/home")
    }
  }
  useEffect(()=>{
    Loadquestion();
    Loadanswers();
},[posted])
async function handlesubmit(e) {
  e.preventDefault();
 
  const answervalue = answerDom.current.value;
  
 
 const answerinfo= {
     answer:answervalue,
     questionid:questionid
    
 }

  try {
    const response=await axios.post("/answer",answerinfo,{
      headers:{
        authorization:"Bearer " + token,
      },
    },
  );
     messageDom.current.style.color="green"
    messageDom.current.innerText=`${response?.data?.msg}`;
    answerDom.current.value="";
    Loadanswers();
  } catch (error) {
    // alert("someting wrong")
    messageDom.current.style.color="red"
     messageDom.current.innerText=error?.response?.data?.msg
    console.log(error?.response?.data?.msg);
  }
}
  return (
    <section className={classes.questions__container}>
      <div className={classes.questions__topcontainer}>
      <div style={{fontSize:"16px",fontWeight:"bold",margin:"20px 0px"}}>
        Questions
      </div>
      
          <div className={classes.questions__detail_title}>{questions.title}</div>
          <div className={classes.questions__detail_description}>{questions.description}</div>
 
      <hr />
      <div style={{fontSize:"16px",fontWeight:"bold",padding:"5px"}}>
        Answers From The Community
      </div>
      
      <div>
      {
      answers?.map((answer,i)=>{
        return (
       <div className={classes.qd__answer__outercontainer} key={i}>
          <hr />
          <div  className={classes.qd__answer__answercontainer}>
            <div className={classes.qd__iconandusernamecontainer}>
                <div>
                      {/* <div  ><IoIosContact   size={80}></IoIosContact ></div> */}
                      <div><IoMdContact  size={80}></IoMdContact> </div>
                      <div  className={classes.home__questionusename}> <p>{answer.username}</p></div>
                     
                </div>
            <div  style={{marginTop:"20px",lineHeight:"1.5"}}    className={classes.home__questiontitle}><p>{answer.answer}</p></div>
            </div>
           
         </div>
         </div>
        )
      })
    }
       
       
    
      
      </div>
      




      <div className={classes.question__lowercontainer}>
      <div style={{fontSize:"16px",fontWeight:"bold",padding:"5px"}}>
        Answers The Top Question
      </div>
      <div><p><Link to="/home">Go to Question page</Link></p></div>
      </div>
      </div>
      <form action="#"  onSubmit={handlesubmit}   className={classes.questions__form}>
      <p ref={messageDom}></p>
        <textarea ref={answerDom} name="answer" id="answer"></textarea><br></br>
        <button type="submit">Post Your Answer</button>
      </form>
    </section>
  )
}

export default Questionsdetail