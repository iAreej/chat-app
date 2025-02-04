const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

//  const io = require('socket.io')(8000,{
//     cors: {
//       origin: ["http://localhost:3000"],
//       methods:["GET","POST"],
//     },
//  });
 const user={}
 
 io.on('connection', (socket)=>{
  console.log("a user jioined with a id"+ socket.id);


    socket.on("new-user-joined", (data)=>{
      
        console.log("new user"+ data.username +" joined "+ data.room);
    socket.to(data.room).emit("user-joined", data.username)
    
    });

    socket.on("join_room", (data) => {
      console.log("bitch"+data);
      socket.join(data);
    });
  

    socket.on('send', async (data)=>{
      //sessionStorage.setItem("roomnumber", data.roomnumber);
      
      console.log(data.name+" is saying "+data.msg+ "in "+data.roomnumber);
        socket.to(data.roomnumber).emit('receive', {message:data.msg,name:data.name});
        
    });

    socket.on("disconnect", () => {
     // const room=sessionStorage.getItem("roomnumber")
      console.log("User Disconnected");
      //socket.to(room).emit('Disconnected', "is disconnecting");
    });
 })
 server.listen(8000, () => {
  console.log("SERVER RUNNING");
});
