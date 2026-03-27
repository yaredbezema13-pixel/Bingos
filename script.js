let numbers = [];

function drawNumber() {

  if(numbers.length === 75){
    alert("Game Over!");
    return;
  }

  let num;
  do {
    num = Math.floor(Math.random() * 75) + 1;
  } while(numbers.includes(num));

  numbers.push(num);

  let letter = "";

  if(num <= 15) letter = "B";
  else if(num <= 30) letter = "I";
  else if(num <= 45) letter = "N";
  else if(num <= 60) letter = "G";
  else letter = "O";

  document.getElementById("letter").innerText = letter;
  document.getElementById("number").innerText = num;
}
