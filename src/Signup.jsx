import React from 'react';
import "./Signup.css";
import {io} from "socket.io-client";
const socket=io('http://localhost:8000');


const Signupfunction=()=>{
  
    const[username,changename]=React.useState("");
    const[room,changeroom]=React.useState("");
    
     function change(event){
      console.log(username);
     changename(event.target.value);
     }
     function changer(event){
      console.log(room);
      changeroom(event.target.value);
      }
        function click(){
          let boolean=true;
          if(username!=="" && room!==""){
            
         var array=[]
                
         // var rooms=localStorage.getItem("rooms");
          if(localStorage.getItem("rooms")!=null){
            
            
          var old_data=(localStorage.getItem('rooms'));
          var data1 = old_data.split(",");
          for(var i=0;i<data1.length;i++){
            if(data1[i]==room){
              window.alert("This room number already exists ")
              boolean=false;
            }}
            
           if(boolean==true){
           console.log("Old array"+old_data);
           var array1=[];
           array1.push(old_data);
           console.log("new array"+array);
          array1.push((room));
           console.log(array);
           localStorage.setItem("rooms",array1);}
          }
           if(localStorage.getItem("rooms")==null){
            array.push((room));
            localStorage.setItem("rooms",array);
           }
           ////////////////////////
           socket.emit('new-user-joined', {username,room});
           sessionStorage.setItem("username", username);
           sessionStorage.setItem("roomnumber", room);
           socket.emit("join_room", room);
           /////////////////////////////////////
          window.location.href='http://localhost:3000/Mainpage'}
            else{
              window.alert("Fill the form completely!");
            }
        }
    
    return(
        <div className='signup'>
            <div className='Emptydiv'>
                <h1>Chat App</h1>
            </div>
        <div className="sick">
        <h1>Sign up Page</h1>
        <div className='username'>
          <h1>Name:</h1>
          <input type="text"
            onChange={change}
            className='inp' 
            id='inputname'
            />
        </div>
        <div className='password'>
          <h1>Room-number:</h1>
          <input type="text"
            onChange={changer}
            className='inp'
            onKeyPress={(event) => {
              event.key === "Enter" && click();
            }}
            />
        </div>
        
<button id="b2" onClick={click}>SignUp</button>
  
      </div>
      </div>
    )
};
  export default Signupfunction;