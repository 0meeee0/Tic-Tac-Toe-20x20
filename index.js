document.body.onload = cv
let oui = document.getElementById("board")
function addTest() {
    let newDiv = document.createElement('div')
    newDiv.textContent = 'This is a test div'
    newDiv.style.backgroundColor = 'yellow'
    newDiv.style.padding = '100px'
    oui.appendChild(newDiv)
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


function cv() {
    for(let i=0; i<400; i++) {
        let morba3 = document.createElement("div")
        morba3.classList.add("morba3")
        oui.appendChild(morba3)
    }
}