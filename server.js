const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

let wallets = {};

io.on("connection", (socket)=>{
  wallets[socket.id] = 100;

  socket.emit("wallet", wallets[socket.id]);

  socket.on("bet", (amount)=>{
    if(wallets[socket.id] < amount) return;

    wallets[socket.id] -= amount;

    let win = Math.random() > 0.5;

    if(win){
      wallets[socket.id] += amount * 2;
    }

    io.to(socket.id).emit("result", {
      win,
      wallet: wallets[socket.id]
    });
  });

  socket.on("reset", ()=>{
    wallets[socket.id] = 100;
    socket.emit("wallet", 100);
  });

  socket.on("disconnect", ()=>{
    delete wallets[socket.id];
  });
});

http.listen(3000, ()=>console.log("Casino running"));

