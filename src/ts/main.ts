import * as cloth from "./interf";
import * as enums from "./enums";
import "../style.scss";


const wd1 = new cloth.WomanCloth(enums.womanColors.RED, false, enums.dressLength.LONG, "assets/woman/w-red-3" );

//console.log(wd1.toString());

type wDress ={
    color:enums.womanColors|string,
    imageURL:string,
    sleeves:boolean,
    length:string
}

async function createDatabase(){
const response = await fetch("/src/database/woman.json");
const database:string = await response.text();
const womenArray:wDress[] = JSON.parse(database)

womenArray.forEach(x=>{
    x.length==="long"? x.length=enums.dressLength.LONG
    : x.length==="medium"? x.length=enums.dressLength.MEDIUM
    : x.length=enums.dressLength.SHORT;
})
for (let i  of womenArray){
  
    createCard(i);
}

function createCard(data:wDress){


    
   const item = new cloth.WomanCloth(data.color, data.sleeves, data.length, data.imageURL)     
    


    
}

}
createDatabase()




