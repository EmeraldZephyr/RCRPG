
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
};
//Character constructor
let Character= class{
    Name="Name";
    Job="Fighter";
    Points=1;
    Grace=1;
    Brawn=1;
    Memory=1;
    Sight=1;
    Spirit=1;
    Touchy=1;
    Hearing=1;
    Stamina=1;
        Wit=1;
    Speed=1;
Natural_AC=function(){return(this.Grace-this.Spirit)*10};
Melee_Damage=function(){return this.Brawn*10};
Initiative=function(){return(this.Speed*10)-(this.Brawn*10)};
Adaptibility=function(){return this.Memory};
Insight=function(){return (this.Spirit*10)-(this.Wit*10)};
Ranged_Accuracy=function(){return this.Sight*10};
Element_Focus=function(){return this.Sight};
Sensitivity=function(){return (this.Sight+this.Touch+this.Hearing+this.Memory)*10};
Magic_AC=function(){return (this.Spirit-this.Grace)*10};
Magic_Range=function(){return this.Touch};
Detect_Trap=function(){return (this.Touch-this.Speed)*10};
Magic_Spread=function(){return (this.Hearing)};
Detect_Invisible=function(){return (this.Hearing-this.Sight)*10};
HP=function(){return this.Stamina*10};
Sleep_Recovery=function(){return 100-(this.Stamina*10)};
Magic_Damage=function(){return this.Wit*10};
actions={
    Melee:(character,target)=>{shout(`${character} attacks ${target}`)},
    Spell:(character,target)=>{shout(`${character} reaches into the ether, finding ${target}`)},
    Run:(character,target)=>{shout(`${character} defends against ${target}`)},
    Hide:(character,target)=>{shout(`${character} tried to hide from ${target}`)},
    Taunt:(character,target)=>{shout(`${character} sneers at ${target}`)},
    Observe:(character,target)=>{shout(`${character} formed a strategy`)},
    Item:(character,target)=>{shout(`${character} Searched their sachel`)}
};
action=(char)=>{
    shout(`${char.Name}'s Turn...`)
    //First loop, using class to set possible outcomes
    let actionSet = ["Melee","Spell","Run","Hide","Taunt","Observe","Item"];
    //Keep removing possibilties until there is one left, reset if zero
    while(actionSet.length>1){
    for (let q=0; q<Object.keys(classes[char.Job]).length; q++){
    if((Math.random()*100)>classes[char.Job][Object.keys(classes[char.Job])[q]]){
        actionSet.splice(actionSet.indexOf(Object.keys(classes[char.Job])[q]),1);
    }
    //Once there's only one left, run the function of that name
     if(actionSet.length===1){return char.actions[actionSet[0]](char.Name,"other")}
     if(actionSet.length===0){action()}
    };
    
    };
    
    }
};
//Collects all characters made by constructor
let characterRoster = [];
//Each character has unique ID
let idCount=0;
//Make a new character
const newCharacter = (Name)=>{
idCount+=1;
let newChar = new Character;
newChar.Name=Name;
newChar.id=idCount;
characterRoster.push(newChar);
};
//Make some characters
newCharacter("Jared");
newCharacter("Lewis");
newCharacter("Barb");
//Find a character by ID
let found= (id) => {return characterRoster.find(element => element.id===id);}

//Roll Random Characters **broken**
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



//Update divs to reflect new information. **clunky**
const refresh = (char) =>{
let charString = readyText(JSON.stringify(char.Brawn));
document.getElementById(char.id).innerHTML=`${charString}`;
};

//Start with some randomized characters
//shuffle(found(1));
//refresh(found(1));

//Randomizer button **kinda silly, now. Needs to randomize characters in roster
document.getElementById("randomize").addEventListener("click",()=>{
shuffle(Player);
shuffle(Monster);
refresh();
});

refresh();


//Array of fighters in current battle. Needs initiative selector.

let fight = (fighters)=>{
    for(let i=0; i<fighters.length; i++){
        fighters[i].action(fighters[i])
    }
    };
//Function check
fight([found(1)]);
//Function check
document.getElementById("fight").addEventListener("click",()=>{fight([characterRoster[0]])});
//Check for stat changes
shout(found(1).Brawn);
//REMEMBER extended stats are functions!!!
shout(found(1).Melee_Damage());