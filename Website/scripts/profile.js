let infoList = document.getElementById("profileInfo");
let incrementList = 0;

for (const node of infoList){
    node.innerText = infoProfileLocal[incrementList]; 
    incrementList++;
}

let logoutbtn = document.getElementById("logout-btn");

function logout(){
    localStorage.clear();
    location.reload();
}