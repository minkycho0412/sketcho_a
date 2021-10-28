"use strict";

const socket = require("socket.io");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5500;
const app = require("../app");

// Starts the server
const server = app.listen(PORT, () => {
    console.log("Server is running");
});

//Upgrades the server to accept websockets.
let io = socket(server);

//Triggered when a client is connected.
io.on("connection", (socket) => {
  console.log("User Connected :" + socket.id );
  
  socket.on("myid", (data) => {
    console.log(data);
    io.emit("myid", data);
  });

  //Triggered when a peer hits the join room button.
  socket.on("join", function (roomName) {
    let rooms = io.sockets.adapter.rooms;
    let room = rooms.get(roomName);

    //room == undefined when no such room exists.
    if (room == undefined) {
      socket.join(roomName);
      socket.emit("created");
    } else if (room.size == 1) {
      //room.size == 1 when one person is inside the room.
      socket.join(roomName);
      socket.emit("joined");
    } else {
      //when there are already two people inside the room.
      socket.emit("full");
    }
    console.log(rooms);
  });

  //Triggered when the person who joined the room is ready to communicate.
  socket.on("ready", function (roomName) {
    socket.broadcast.to(roomName).emit("ready"); //Informs the other peer in the room.
  });

  //Triggered when server gets an icecandidate from a peer in the room.
  socket.on("candidate", function (candidate, roomName) {
    console.log(candidate);
    socket.broadcast.to(roomName).emit("candidate", candidate); //Sends Candidate to the other peer in the room.
  });

  //Triggered when server gets an offer from a peer in the room.
  socket.on("offer", function (offer, roomName) {
    socket.broadcast.to(roomName).emit("offer", offer); //Sends Offer to the other peer in the room.
  });

  //Triggered when server gets an answer from a peer in the room.
  socket.on("answer", function (answer, roomName) {
    socket.broadcast.to(roomName).emit("answer", answer); //Sends Answer to the other peer in the room.
  });

  socket.on("leave", function(roomName){
    socket.leave(roomName);
    socket.broadcast.to(roomName).emit("leave");
  })
});