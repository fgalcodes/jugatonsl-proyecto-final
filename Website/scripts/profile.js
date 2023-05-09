let infoList = document.getElementById("profileInfo");
let incrementList = 0;

for (const node of infoList){
    node.innerText = infoProfileLocal[incrementList]; 
    incrementList++;
}