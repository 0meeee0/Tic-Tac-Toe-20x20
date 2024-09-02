document.body.onload = cv
let oui = document.getElementById("board")
let p1Name = document.getElementById("p1Name").textContent = localStorage.getItem("P1")
let p2Name = document.getElementById("p2Name").textContent = localStorage.getItem("P2")

let xAudio = new Audio("../src/x.mp3")
let oAudio = new Audio("../src/o.mp3")
function playMusic() {
    let audio = new Audio("../src/urf.mp3");
    audio.volume = 0.2;
    audio.play();
}
let x = 0;
let y = 0
function cv() {
    for (let i = 0; i < 400; i++) {
        let morba3 = document.createElement("div");
        morba3.classList.add("morba3");
        morba3.id = [x, y]
        oui.appendChild(morba3);
        y++;
        if (y >= 20) {
            y = 0;
            x++;
        }
    }
    // playMusic()
    Xmark();
}

function checkPlayers(){
    let p1 = document.getElementById("p1").value
    let p2 = document.getElementById("p2").value
    if(p1 == "" || p2 == ""){
        alert("Please enter both players names.")
        return false
    }
    localStorage.setItem("P1", p1)
    localStorage.setItem("P2", p2)
    window.location.href = "game.html";
    return true
}

let cxo = "X";
function Xmark(){
    let buttons = document.querySelectorAll(".morba3");
    buttons.forEach((btn) => {
        btn.addEventListener("click", function () {
            console.log(btn.id)
            let splitedXY = btn.id.split(",")
            let cellx = parseInt(splitedXY[0])
            let celly = parseInt(splitedXY[1])
            if (btn.textContent == "") {
                btn.textContent = cxo;
                btn.style.backgroundColor = "rgb(107, 107, 107)";
                if(checkWin(cellx, celly, cxo)) {
                    alert(`${cxo} wins!`);
                    // window.location.reload();
                }else{
                    cxo = (cxo == "X") ? "O" : "X";
                    xoAudio()
                }
            }
        });
    })
}
function checkWin(x, y, cxo) {
    return (
        Directions(x, y, cxo, 0, 1) ||
        Directions(x, y, cxo, 1, 0) ||
        Directions(x, y, cxo, 1, 1) ||
        Directions(x, y, cxo, 1, -1)
    );
}

function Directions(x, y, cxo, dX, dY) {
    let counter = 1;
    counter += countInDirection(x, y, cxo, dX, dY);
    counter += countInDirection(x, y, cxo, -dX, -dY)
    return counter >= 5
}

function countInDirection(x, y, cxo, dX, dY) {
    let count = 0;
    let nextX = x + dX;
    let nextY = y + dY;

    while (nextX >= 0 && nextX < 20 && nextY >= 0 && nextY < 20) {
        let nextCell = document.getElementById(`${nextX},${nextY}`);
        if (nextCell && nextCell.textContent == cxo) {
            count++;
            nextX += dX;
            nextY += dY;
        } else {
        break;
    }
  }
  return count;
}


function xoAudio(){
    if(cxo == "X"){
        xAudio.play()
    }else{
        oAudio.play()
    }
}
