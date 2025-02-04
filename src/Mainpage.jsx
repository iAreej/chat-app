import React from 'react';
import { useEffect } from 'react';
import "./Mainpage.css";
import {io} from "socket.io-client";
const socket=io('http://localhost:8000');
const Mainpage=()=>{

  
  
  const name=sessionStorage.getItem("username");
  const roomnumber=sessionStorage.getItem("roomnumber");
  console.log(name, roomnumber)
  const[msg,updatemsg]=React.useState("");
  const form=document.getElementById('input');
 
 
  useEffect(()=>{
    //joining a room
socket.emit("join_room", roomnumber);
  append(`welcome ${name} to room # ${roomnumber}`, "spacingDiv");

   //user join
   socket.on('user-joined', (user)=>{
    console.log("user-joined event");
    append(` ${user} joined the chat `, 'spacingDiv');
    
   });
 },[]);


  //apend function
  const append = async (Message,position) => {
    //putting message into div
    const messageContainer=document.querySelector(".chatDiv");
    const msgElement=document.createElement('div');
    msgElement.innerText=Message;
    msgElement.classList.add("Message");
    msgElement.classList.add(position);
    messageContainer.append(msgElement);
    }
  
  
    useEffect(() => {
     
      //receiving msg from other user
      console.log("socket");
      socket.on('receive', data=>{
        console.log("msg received event");
        console.log(data.name+":" +data.message)
        append(` ${data.name}: ${data.message}`, 'receivemsg')
      });
  }, [socket]); 

 function formvalue(e){
  updatemsg(e.target.value);
  console.log(e.target.value);
 }
  
 function click(e){
  append(`You:${msg}`,"sendmsg");
 socket.emit("send", {msg,name,roomnumber});
 form.value="";
}  
   return(
    <div className='mainpage'>
              
      <div className='chatDiv'>
      
        <div className='spacingDiv'></div>
        <div className='sendmsg'></div>
        <div className='receivemsg'></div>
        
      </div>
      
      <div className='inputDiv'>
      <input type='text'
       id="input" 
       onChange={formvalue}
       name="msg"
       onKeyPress={(event) => {
        event.key === "Enter" && click();
      }}
      />
      <button type="submit" id="button" onClick={click}>➤</button>
      </div>
    </div>
)};
  export default Mainpage;