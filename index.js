document.body.onload = cv
let oui = document.getElementById("board")

let p1Name = localStorage.getItem("P1");
let p2Name = localStorage.getItem("P2");

let resetBtn = document.getElementById("resetBtn");
let xAudio = new Audio("../src/x.mp3")
let oAudio = new Audio("../src/o.mp3")

if (!localStorage.getItem(`${p1Name}Score`)) {
	localStorage.setItem(`${p1Name}Score`, 0)
}
if (!localStorage.getItem(`${p2Name}Score`)) {
	localStorage.setItem(`${p2Name}Score`, 0)
}

document.getElementById("p1Name").textContent = p1Name;
document.getElementById("p2Name").textContent = p2Name;

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
    playMusic()
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
					updateScore(cxo)
                    setTimeout(() => window.location.reload(), 1000);
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

function updateScore(winner) {
	let playerName = winner === "X" ? p1Name : p2Name;
	let playerScore = parseInt(localStorage.getItem(`${playerName}Score`)) || 0;
	
	playerScore++;
	localStorage.setItem(`${playerName}Score`, playerScore);
	updateScoreDisplay();
}
updateScoreDisplay()
function updateScoreDisplay() {
	let p1Score = localStorage.getItem(`${p1Name}Score`) || 0;
	let p2Score = localStorage.getItem(`${p2Name}Score`) || 0;
	
	document.getElementById("p1Score").textContent = p1Score;
	document.getElementById("p2Score").textContent = p2Score
}
resetBtn.addEventListener("click", function () {
	oui.innerHTML = "";
    x = 0;
    y = 0;
    cv();
});
