import * as cloth from "./interf";
import "../style.scss";


const wd1 = new cloth.WomanCloth(cloth.womanColors.RED, false, cloth.dressLength.LONG, "assets/woman/w-red-3" );

//console.log(wd1.toString());

type wDress ={
    color:cloth.womanColors|string,
    imageURL:string,
    sleeves:boolean,
    length:string
}

async function createDatabase(){
const response = await fetch("/src/database/woman.json");
const database:string = await response.text();
const womenArray:wDress[] = JSON.parse(database)

console.log(womenArray[3])

//console.log(womenArray)

for (let i  of womenArray){

    createCard(i);
}

function createCard(data:wDress){
   const item = new cloth.WomanCloth(data.color, data.sleeves, data.length, data.imageURL)
     
    
console.log(item.toString());
    
}

}
createDatabase()




