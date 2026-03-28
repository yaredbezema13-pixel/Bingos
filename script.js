const socket = io();

let grid = document.getElementById("grid");
let walletEl = document.getElementById("wallet");
let statusEl = document.getElementById("status");

let wallet = 0;

// create grid 1–100 ONLY
for(let i=1;i<=100;i++){
  let cell = document.createElement("div");
  cell.className = "cell";
  cell.innerText = i;

  cell.onclick = () => {
    socket.emit("pick", i);
  };

  grid.appendChild(cell);
}

socket.on("wallet", (money)=>{
  wallet = money;
  walletEl.innerText = money.toFixed(2);
});

socket.on("result", (data)=>{
  wallet = data.wallet;
  walletEl.innerText = wallet.toFixed(2);

  statusEl.innerText = data.win ? "🎉 YOU WIN!" : "❌ YOU LOSE!";
});

function bet(){
  socket.emit("bet", 10);
}

function reset(){
  socket.emit("reset");
}

