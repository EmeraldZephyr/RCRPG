let goodsArray=["stone","food","diamond"];
let territories=[];

//convert JSON to string without brackets, quotes and commas
const readyText = (string) =>{
let vA = string.replace(/"/g,"");
let vB = vA.replace(/{/g,"");
let vC = vB.replace(/}/g,"");
let vD = vC.replace(/,/g,"</br>");
return vD;
};
let creator = {
    Level:0,
    Grace:0,
    Brawn:0,
    Memory:0,
    Sight:0,
    Spirit:0,
    Touchy:0,
    Hearing:0,
    Stamina:0,
    Wit:0,
    Speed:0
};
/* Make all of the click events for adding points
let creatorArray = ["level","grace","brawn","memory","sight","spirit","touchy","hearing","stamina","wit","speed"]
for (let i=0; i<creatorArray.length; i++){
document.getElementById(`${creatorArray[i]}+Button`).addEventListener("click",()=>{

});
};*/
//Add log to action log
const shout = (str,time)=>{
    if(typeof time==undefined){time=0;}
    let makeNew=()=>{
    let newDiv = document.createElement("div");
    newDiv.id="newLog";
    newDiv.innerHTML=str;
    document.getElementById("Log").appendChild(newDiv);
    //Make action log automatically scroll to the bottom
    let autoScroll = document.getElementById("Log");
    autoScroll.scrollTop=autoScroll.scrollHeight;
    };
    setTimeout(makeNew,time);
};
const economy={
market:{
    norn:{
        gold:2,
goods:{
    stone:{
        supply:1,
        demand:0,
        value:0
    },
    food:{
        supply:1,
        demand:0,
        value:0
    },
    diamond:{
        supply:1,
        demand:0,
        value:0
    }
}
},
talos:{
    gold:0,
    goods:{
        stone:{
            supply:1,
            demand:0,
            value:0
        },
        food:{
            supply:1,
            demand:0,
            value:0
        },
        diamond:{
            supply:1,
            demand:0,
            value:0
        }
    }
    }
},
reqGood:function(good,territoryReq,territorySupply){
economy.market[territorySupply].goods[good].demand+=1;
for(let i=0; i<Object.keys(economy.market[territorySupply].goods).length; i++){
economy.market[territorySupply].goods[good].value=economy.market[territorySupply].goods[good].demand/economy.market[territorySupply].goods[good].supply;
};

shout(`***${good} reqested.*** </br>By: ${territoryReq}</br>From: ${territorySupply}`,0)
shout(`${territorySupply} - Demand:${good}-${economy.market[territorySupply].goods[good].demand}`,0)
},
buyGood:function(good,territoryReq,territorySupply){
    shout(`${territoryReq}-</br>
Gold:${economy.market[territoryReq].gold}</br>
${good} Supply: ${economy.market[territoryReq].goods[good].supply}</br>
${territorySupply}-</br>
Gold:${economy.market[territorySupply].gold}</br>
${good} Supply:${economy.market[territorySupply].goods[good].supply}
`);
shout(`${territoryReq} tries to purchase a ${good} from ${territorySupply}`)
    if(economy.market[territorySupply].goods[good].supply>0&&economy.market[territoryReq].gold>=economy.market[territorySupply].goods[good].value&&economy.market[territorySupply].goods[good].demand>0){
economy.market[territorySupply].gold+=economy.market[territorySupply].goods[good].value;
economy.market[territoryReq].gold-=economy.market[territorySupply].goods[good].value;
economy.market[territorySupply].goods[good].supply-=1;
economy.market[territorySupply].goods[good].demand-=1;
economy.market[territoryReq].goods[good].supply+=1;
    }
    else if(economy.market[territorySupply].goods[good].supply===0){
        shout(`${territorySupply} is fresh out of ${good}. Womp Womp`)
    }
    else if(economy.market[territoryReq].gold<economy.market[territorySupply].goods[good].value){
        shout(`${territoryReq} doesn't have enough gold for ${good}. Womp Womp.`)
    }
    else if(economy.market[territorySupply].goods[good].demand===0){
        shout(`${territorySupply} hasn't approved any ${good} for sale. Womp Womp.`)
    }
economy.market[territorySupply].goods[good].value=economy.market[territorySupply].goods[good].demand/economy.market[territorySupply].goods[good].supply;

shout(`${territoryReq}-</br>
Gold:${economy.market[territoryReq].gold}</br>
${good} Supply: ${economy.market[territoryReq].goods[good].supply}</br>
${territorySupply}-</br>
Gold:${economy.market[territorySupply].gold}</br>
${good} Supply:${economy.market[territorySupply].goods[good].supply}
`);

},

};
economy.buyGood("stone","norn","talos");

//Character constructor
let Character= class{
    Name="Name";
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
//Customizable action percentages. Change displayed job based on ranges, eventually
Job={
    Melee:80,
    Spell:5,
    Run:5,
    Hide:1,
    Taunt:50,
    Observe:10,
    Item:10
};
action=(char)=>{
    shout(`${char.Name}'s Turn...`)
    //First loop, using class to set possible outcomes
    let actionSet = ["Melee","Spell","Run","Hide","Taunt","Observe","Item"];
    //Keep removing possibilties until there is one left, reset if zero
    while(actionSet.length>1){
    for (let q=0; q<Object.keys(char.Job).length; q++){
    if((Math.random()*100)>char.Job[Object.keys(char.Job)[q]]){
        actionSet.splice(actionSet.indexOf(Object.keys(char.Job)[q]),1);
    }
    //Once there's only one left, run the function of that name
     if(actionSet.length===1){return char.actions[actionSet[0]](char.Name,"other")}
     if(actionSet.length===0){action()}
    };
    
    };
    
    }
};
//Territory constructor
let Territory = class{
name="norn";
gold=10;
stone=10;
diamond=10;
food=10;
population=1;
size=1;
};
//Territory creator
let terID=0;

const newTerritory=(Name)=>{
    let newTer=new Territory;
    newTer.name=Name;
    terID+=1;
    newTer.id=terID;
    territories.push(`${Name}`);
}
newTerritory("norn");
newTerritory("talos");
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
//New Character Button
document.getElementById("newCharacter").addEventListener("click",()=>{
document.getElementById("newCharacterGUI").style.display="block";
});
//Economy button
document.getElementById("economy").addEventListener("click",()=>{
    document.getElementById("economyGUI").style.display="block";
    });
document.getElementById("economyGUIExit").addEventListener("click",(e)=>{
    e.stopPropagation();
    document.getElementById("economyGUI").style.display="none";
        });       
//Buy/Request Supplies
document.getElementById("buy").addEventListener("click",(e)=>{
e.stopPropagation();
//stop multiples
if(document.getElementById("buy").childNodes.length<2){

for(let i=0; i<goodsArray.length; i++){
    let newDiv = document.createElement("div");
    newDiv.id=goodsArray[i];
    newDiv.innerHTML=goodsArray[i];
    newDiv.addEventListener("click",(e)=>{
        e.stopPropagation();
        //stop multiples
        if(newDiv.childNodes.length<2){
        for(let p=1; p<territories.length; p++){
        let newerDiv = document.createElement("div");
        newerDiv.id=territories[p];
        newerDiv.innerHTML=territories[p];
        newerDiv.addEventListener("click",(e)=>{
            e.stopPropagation();
            //should call a buyGood but need to make economy an object
            economy.buyGood(goodsArray[i],territories[0],territories[p])
        });
        newDiv.appendChild(newerDiv);
        };}
    });
    document.getElementById("buy").appendChild(newDiv);
}}
}
);
document.getElementById("request").addEventListener("click",(e)=>{
    e.stopPropagation();
    //stop multiples
    if(document.getElementById("request").childNodes.length<2){
    
    for(let i=0; i<goodsArray.length; i++){
        let newDiv = document.createElement("div");
        newDiv.id=goodsArray[i];
        newDiv.innerHTML=goodsArray[i];
        newDiv.addEventListener("click",(e)=>{
            e.stopPropagation();
            //stop multiples
            if(newDiv.childNodes.length<2){
            for(let p=1; p<territories.length; p++){
            let newerDiv = document.createElement("div");
            newerDiv.id=territories[p];
            newerDiv.innerHTML=territories[p];
            newerDiv.addEventListener("click",(e)=>{
                e.stopPropagation();
                //should call a requestGood but need to make economy an object
                economy.reqGood(goodsArray[i],territories[0],territories[p])
            });
            newDiv.appendChild(newerDiv);
            };}
        });
        document.getElementById("request").appendChild(newDiv);
    }}
    }
    );
    
//New Character GUI
document.getElementById("exit").addEventListener("click",(e)=>{
e.stopPropagation();
document.getElementById("newCharacterGUI").style.display="none";
});
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




//Update divs to reflect new information. **clunky**
const refresh = (char) =>{
let charString = readyText(JSON.stringify(char.Brawn));
document.getElementById(char.id).innerHTML=`${charString}`;
};

//Start with some randomized characters
//shuffle(found(1));
//refresh(found(1));

//Randomizer button **kinda silly, now. Needs to randomize characters in roster
document.getElementById("roster").addEventListener("click",()=>{
shout("click");
});
document.getElementById("randomize").addEventListener("click",()=>{
    for(let i=0; i<characterRoster.length; i++){
        shuffle(found(characterRoster[i].id));
        refresh(found(characterRoster[i].id))
    }
shuffle(found(1));
refresh(found(1));
});




//Array of fighters in current battle. Needs initiative selector.

let fight = (fighters)=>{
    if(characterRoster.length>0){
    for(let i=0; i<fighters.length; i++){
        fighters[i].action(fighters[i])
    }
    };
};
//Fight Button
    document.getElementById("fight").addEventListener("click",()=>{fight([characterRoster[0]])});
