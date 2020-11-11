let Player = {
    Name:"Player",
    Job:"",
    Points:15,
    Grace:1,
    Brawn:1,
    Memory:1,
    Sight:1,
    Spirit:1,
    Touch:1,
    Hearing:1,
    Stamina:1,
    Wit:1,
    Speed:1
};
let Extended = {
Natural_AC:(Player.Grace-Player.Spirit)*10,
Melee_Damage:Player.Brawn*10,
Initiative:(Player.Speed*10)-(Player.Brawn*10),
Adaptibility:Player.Memory,
Insight:(Player.Spirit*10)-(Player.Wit*10),
Ranged_Accuracy:Player.Sight*10,
Element_Focus:Player.Sight,
Sensitivity:(Player.Sight+Player.Touch+Player.Hearing+Player.Memory)*10,
Magic_AC:(Player.Spirit-Player.Grace)*10,
Magic_Range:Player.Touch,
Detect_Trap:(Player.Touch-Player.Speed)*10,
Magic_Spread:(Player.Hearing),
Detect_Invisible:(Player.Hearing-Player.Sight)*10,
HP:Player.Stamina*10,
Sleep_Recovery:100-(Player.Stamina*10),
Magic_Damage:Player.Wit*10,
};
let Monster = {
    Name:"Monster",
    Job:"",
    Points:15,
    Grace:1,
    Brawn:1,
    Memory:1,
    Sight:1,
    Spirit:1,
    Touch:1,
    Hearing:1,
    Stamina:1,
    Wit:1,
    Speed:1
};
let monsterExtended = {
    Natural_AC:(Monster.Grace-Monster.Spirit)*10,
Melee_Damage:Monster.Brawn*10,
Initiative:(Monster.Speed*10)-(Monster.Brawn*10),
Adaptibility:Monster.Memory,
Insight:(Monster.Spirit*10)-(Monster.Wit*10),
Ranged_Accuracy:Monster.Sight*10,
Element_Focus:Monster.Sight,
Sensitivity:(Monster.Sight+Monster.Touch+Monster.Hearing+Monster.Memory)*10,
Magic_AC:(Monster.Spirit-Monster.Grace)*10,
Magic_Range:Monster.Touch,
Detect_Trap:(Monster.Touch-Monster.Speed)*10,
Magic_Spread:(Monster.Hearing),
Detect_Invisible:(Monster.Hearing-Monster.Sight)*10,
HP:Monster.Stamina*10,
Sleep_Recovery:100-(Monster.Stamina*10),
Magic_Damage:Monster.Wit*10,
};

const classes = {
Fighter:{
    Melee:80,
    Spell:5,
    Run:5,
    Hide:1,
    Taunt:50,
    Observe:10,
    Item:10
},
Wizard:{
    Melee:5,
    Spell:80,
    Run:50,
    Hide:1,
    Taunt:1,
    Observe:30,
    Item:30
}
}
//Add log to action log
const shout = (str)=>{
let newDiv = document.createElement("div");
newDiv.id="newLog";
newDiv.innerHTML=str;
document.getElementById("Log").appendChild(newDiv);
//Make action log automatically scroll to the bottom
let autoScroll = document.getElementById("Log");
autoScroll.scrollTop=autoScroll.scrollHeight;

};
//Randomize stats
const shuffle = (set)=>{
    set.Points=15;

    for(let p=3; p<Object.keys(set).length; p++){
    set[Object.keys(set)[p]]=1;
    };

    for(let i=0; i<set.Points; i++){
      set[Object.keys(set)[Math.floor(Math.random()*10)+3]]+=1;
    };
    
        if (Math.random()<.5){set.Job = Object.keys(classes)[0]}
        else{set.Job = Object.keys(classes)[1]};
        
    };
    


//convert JSON to string without brackets, quotes and commas
const readyText = (string) =>{
let vA = string.replace(/"/g,"");
let vB = vA.replace(/{/g,"");
let vC = vB.replace(/}/g,"");
let vD = vC.replace(/,/g,"</br>");
return vD;
};

//Update divs to reflect new information
const refresh = () =>{
    let Extended = {
        Natural_AC:Player.Grace*10,
        Melee_Damage:Player.Brawn*10,
        Initiative:(Player.Speed*10)-(Player.Brawn*10),
        Adaptibility:Player.Memory,
        Empathy:(Player.Spirit*10)-(Player.Wit*10),
        Ranged_Accuracy:Player.Sight*10,
        Element_Focus:Player.Sight,
        Sensitivity:(Player.Sight+Player.Touch+Player.Hearing+Player.Memory)*10,
        Magic_AC:Player.Spirit*10,
        Magic_Range:Player.Touch,
        Detect_Trap:(Player.Touch-Player.Speed)*10,
        Magic_Spread:(Player.Hearing),
        Detect_Invisible:(Player.Hearing-Player.Sight)*10,
        HP:Player.Stamina*10,
        Sleep_Recovery:100-(Player.Stamina*10),
        Magic_Damage:Player.Wit*10,
        };
    let monsterExtended = {
        Natural_AC:Monster.Grace*10,
        Melee_Damage:Monster.Brawn*10,
        Initiative:(Monster.Speed*10)-(Monster.Brawn*10),
        Adaptibility:Monster.Memory,
        Empathy:(Monster.Spirit*10)-(Monster.Wit*10),
        Ranged_Accuracy:Monster.Sight*10,
        Element_Focus:Monster.Sight,
        Sensitivity:(Monster.Sight+Monster.Touch+Monster.Hearing+Monster.Memory)*10,
        Magic_AC:Monster.Spirit*10,
        Magic_Range:Monster.Touch,
        Detect_Trap:(Monster.Touch-Monster.Speed)*10,
        Magic_Spread:(Monster.Hearing),
        Detect_Invisible:(Monster.Hearing-Monster.Sight)*10,
        HP:Monster.Stamina*10,
        Sleep_Recovery:100-(Monster.Stamina*10),
        Magic_Damage:Monster.Wit*10,
            };
let playerString = readyText(JSON.stringify(Player));
let extendedString = readyText(JSON.stringify(Extended));
let monsterString = readyText(JSON.stringify(Monster));
let monsterExtendedString = readyText(JSON.stringify(monsterExtended));
document.getElementById("player").innerHTML=`Player</br>${playerString}`;
document.getElementById("extended").innerHTML=`Extended</br>${extendedString}`;
document.getElementById("monster").innerHTML=`Monster</br>${monsterString}`;
document.getElementById("monsterExtended").innerHTML=`Monster</br>${monsterExtendedString}`;
};
shuffle(Player);
shuffle(Monster);
refresh();

//Randomizer button
document.getElementById("randomize").addEventListener("click",()=>{
shuffle(Player);
shuffle(Monster);
refresh();
shout("click");
});

refresh();

//Give actions something to do, for now.
let Melee=(character,target)=>{shout(`${character} attempted to hit ${target}`)};
let Spell=(character,target)=>{shout(`${character} attempted to cast a spell on ${target} `)}
let Run=(character,target)=>{shout(`${character} tried to run from ${target}`)}
let Hide=(character,target)=>{shout(`${character} tried to hide from ${target}`)}
let Taunt=(character,target)=>{shout(`${character} tried to enrage ${target}`)}
let Observe=(character,target)=>{shout(`${character} tried to analyze from ${target}`)}
let Item=(character,target)=>{shout(`${character} tried to use an item on ${target}`)}

//Fight calculations
let fight = (fighters)=>{
//**Needs to be determined by initiative, later**
let order = [Player,Monster];
//Loop through battle order
for (i=0; i<order.length; i++){
shout(`${order[i].Name}'s turn... `);
shout(`This ${order[i].Job} will...`);
//Choose action
let action = ()=>{
//First loop, using class to set possible outcomes
let actionSet = [Melee(order[i].Name,"Other"),Spell(order[i].Name,"Other"),Run(order[i].Name,"Other"),Hide(order[i].Name,"Other"),Taunt(order[i].Name,"Other"),Observe(order[i].Name,"Other"),Item(order[i].Name,"Other")]
//How many possibilities, so far
shout(Object.keys(classes[order[i].Job]).length);
for (let o=0; o<Object.keys(classes[order[i].Job]).length; o++){
if(Math.random()*100>classes[order[i].Job][Object.keys(classes[order[i].Job])[o]]){
shout(Object.keys(classes[order[i].Job])[o]);
}
else
if(actionSet.length===1){return shout(`${order[i]} successfully ${actionSet[0]}`)}
else
if(actionSet.length===0){actionSet=[Melee(order[i].Name,"Other"),Spell(order[i].Name,"Other"),Run(order[i].Name,"Other"),Hide(order[i].Name,"Other"),Taunt(order[i].Name,"Other"),Observe(order[i].Name,"Other"),Item(order[i].Name,"Other")]}
};
    
};
action();
};
    };

fight([Player,Monster]);
document.getElementById("fight").addEventListener("click",()=>{fight([Player,Monster])})