exports.roster = {

};
exports.available = {
    Charles:{HP:10,DEF:10}
};

document.getElementById("roster").addEventListener("click",()=>{
console.log("Clicked")
let newDiv = document.createElement("div");
newDiv.className="popup";
newDiv.innerHTML=JSON.stringify(roster);
document.body.appendChild(newDiv);
});