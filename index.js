document.body.onload = cv
let oui = document.getElementById("board")
let p1Name = document.getElementById("p1Name").textContent = localStorage.getItem("P1")
let p2Name = document.getElementById("p2Name").textContent = localStorage.getItem("P2")
console.log(p1Name)

let xAudio = new Audio("../src/x.mp3")
let oAudio = new Audio("../src/o.mp3")
function playMusic() {
    let audio = new Audio("../src/urf.mp3");
    audio.volume = 0.2;
    audio.play();
}
function cv() {
    let y = 0
    let x = 0;
    for (let i = 0; i < 400; i++) {
        let morba3 = document.createElement("div");
        morba3.classList.add("morba3");
        morba3.id = [x, y]
        oui.appendChild(morba3);
        // console.log(morba3.id);
        x++;
        if (x >= 20) {
            x = 0;
            y++;
        }
    }
    // playMusic()
    Xmark();
}

function checkPlayers(){
    let p1 = document.getElementById("p1").value
    let p2 = document.getElementById("p2").value
    console.log(p1, p2);
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
            if (btn.textContent == "") {
                console.log(cxo)
                btn.textContent = cxo;
                cxo = (cxo == "X") ? "O" : "X";
                xoAudio()
                // console.log(cxo)
            }
        });
    })
}
function xoAudio(){
    if(cxo == "X"){
        xAudio.play()
    }else{
        oAudio.play()
    }
}