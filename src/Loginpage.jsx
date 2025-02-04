import React  from 'react';
import { Link } from 'react-router-dom';
import {io} from "socket.io-client";
export const socket=io('http://localhost:8000');
function Loginfunction(){
    const[username,changename]=React.useState("");
    const[room,changeroom]=React.useState("");
    let c=false;
     function change(event){
      console.log(username);
     changename(event.target.value);
     
     }
     function changer(event){
      console.log(room);
      changeroom(event.target.value);
      }
      const joinRoom = (room) => {
       
        if (room !== "") {
          socket.emit("join_room", room);
        }
        else{
          window.alert("Plz enter room number");
        }
      };
    
       function click(){
          {if(room!="" & username!=""){
            
            if(localStorage.getItem("rooms")!=null){
            const data=localStorage.getItem("rooms");
            console.log(data);
            var data1 = data.split(",");
            console.log(data1);
            for(var i=0;i<data1.length;i++){
              console.log("The length is "+ data1.length + "the element is"+ data1[i]);
                     if(data1[i]==room){
                      c=true;
                      socket.emit('new-user-joined', {username,room});
                      sessionStorage.setItem("username", username);
                      sessionStorage.setItem("roomnumber", room);
                      joinRoom(room);
                    window.location.href='http://localhost:3000/Mainpage';

                     }}
                     if(c==false){
                      console.log(c);
                      window.alert("No room found");
                    }
                  }else{
                    window.alert("no room exist")
                  }}
            else{
              window.alert("please fill the form completely!");}
            
            
            }
          
        }

    
      return (
        <div className="App">
            <h1>ChatAPP</h1>
            <div className='usernamediv'>
              <h1>USERNAME:</h1>
              <input type="text"
                onChange={change}
                className='inp'
                id='1' />
            </div>
            <div className='passworddiv'>
              <h1>Room-Number:</h1>
              <input type="text"
                onChange={changer}
                className='inp' 
                id='2'
                onKeyPress={(event) => {
                  event.key === "Enter" && click();
                } }/>
            </div>
    <button id="b1" onClick={click}>login</button>
    
        <div className='lastheading'>
        <Link to='/Signup' className='Link'> <h2>Don't have a room?SignUp?</h2></Link> 
          </div>   
          </div>
        
      );
    }
    export default Loginfunction;
  
    