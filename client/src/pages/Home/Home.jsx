import React, { useContext, useEffect, useState } from 'react'
import classes from './home.module.css'
import { Link } from 'react-router-dom'
import { IoIosArrowForward } from "react-icons/io";
import { AppState } from '../../App';
import { IoIosContact } from "react-icons/io";
import { IoMdContact } from "react-icons/io";
import axios from '../../Api/axiosConfig';
function Home() {
  const {user}=useContext(AppState);
  const token = localStorage.getItem('token');
  const [questions,setquestions]=useState([]);

  async function Loadquestions() {
    try {
      const {data} = await axios.get("/question",{
        headers:{
          authorization:"Bearer " + token,
        }
      });
      // const {questions}=data
      // console.log(typeof questions )
      console.log(data.questions)
      setquestions(()=>data.questions)
      // console.log(question)
      
    } catch (error) {
      console.log(error.response.data.msg);
      // navigate("/")
    }
  
  }
  useEffect(()=>{
    Loadquestions();
},[])
  return (
    <section className={classes.home__container}>
      <div className={classes.home__topcontainer}>
        <div ><Link to="/askquestions">Ask Question</Link></div>
        <div style={{fontSize:"20px",fontWeight:"300"}}><p >WelCome:<span style={{color:" #DA7229"}}> {user}</span></p></div>
      </div>
      <div style={{fontSize:"20px",fontWeight:"300",marginBottom:"20px"}}>
        Questions
      </div>
      <div>
      {
      questions?.map((question,i)=>{
        return (
       <div className={classes.question__outercontainer} key={i}>
          <hr />
          <div  className={classes.home__questioncontainer}>
            <div className={classes.home__iconandusernamecontainer}>
                <div>
                      {/* <div  ><IoIosContact   size={80}></IoIosContact ></div> */}
                      <div><IoMdContact  size={80}></IoMdContact> </div>
                      <div  className={classes.home__questionusename}> <p>{question.username}</p></div>
                     
                </div>
            <div  className={classes.home__questiontitle}><p>{question.title}</p></div>
            </div>
            <div style={{marginTop:"30px"}} > <Link to={`/home/questionsdetail/${question.questionid}`}> <IoIosArrowForward  size={30} color='black'> </IoIosArrowForward ></Link></div>
         </div>
         </div>
        )
      })
    }
       
       
    
      
      </div>
    </section>
  )
}

export default Home
