import React, { useState } from 'react'
import classes from './Askquestion.module.css'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import axios from '../../../src/Api/axiosConfig'
import { nanoid } from 'nanoid'

function Askquestions() {
const tiltleDom= useRef(null);
const descriptionDom=useRef(null)
const messageDom=useRef(null);
const token = localStorage.getItem('token');
async function handlesubmit(e) {
    e.preventDefault();
   
    const titlevalue = tiltleDom.current.value;
    const descriptionvalue = descriptionDom.current.value;
   
   const questioninfo= {
       title:titlevalue,
       description:descriptionvalue,
       questionid:nanoid()
      
   }
   console.log(questioninfo)
    try {
      const response=await axios.post("/question",questioninfo,{
        headers:{
          authorization:"Bearer " + token,
        },
      },
    );
       messageDom.current.style.color="green"
       console.log(response.data.msg)
      messageDom.current.innerText=`${response?.data?.msg} `;
      tiltleDom.current.value="";
       descriptionDom.current.value="";
   
    } catch (error) {
      // alert("someting wrong")
      messageDom.current.style.color="red"
       messageDom.current.innerText=error?.response?.data?.msg
      console.log(error?.response?.data?.msg);
    }
}
  return (
    <section className={classes.askquestions__container}>
      <div className={classes.askquestions__topcontainer}>
          <p>Steps to Write a good question</p>
          <ul>
            <li>Summerize your problem in one line title</li>
            <li>Describe your problem in more detail</li>
            <li>Describe what you tried and what is expected to happen</li>
            <li>Review your question and post it to the site</li>
            
          </ul>
   
      </div>
      <div className={classes.askquestion__lowercontainer}>
    <div style={{fontSize:"20px",padding:"5px", marginTop:"30px"}}>
        Ask a public question
      </div>
      <div><p><Link to="/home">Go to Question page</Link></p></div>
      </div>
      <form action="#"  onSubmit={handlesubmit}  className={classes.askquestions__form}>
      <p ref={messageDom}></p>
        <input  ref={tiltleDom}   type="text" name="title" id="title" required placeholder='Title'/>
        <textarea ref={descriptionDom} name="answer" id="answer" required placeholder='Question Description'></textarea>
        <button type="submit">Post Your Questiom</button>
      </form>
    </section>
  )
}

export default Askquestions