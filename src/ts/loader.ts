

import * as cloth from "./interf";
import * as enums from "./enums";
import "../style.scss";


type wDress ={
    color:enums.womanColors|string,
    imageURL:string,
    sleeves:boolean,
    length:string
}
type mDress ={
    color:enums.womanColors|string,
    imageURL:string,
    complexity:number,
    tie:string;
}

export async function createDatabase(){
const responseW = await fetch("/src/database/woman.json");
const databaseW:string = await responseW.text();
const womenArray:wDress[] = JSON.parse(databaseW)
//console.log(womenArray);

const responseM = await fetch("/src/database/man.json")
const databaseM:string = await responseM.text();
const menArray:mDress[] = JSON.parse(databaseM)


for (let i  of menArray){    
const manDressItem = new cloth.ManCloth(i.color, i.complexity, i.tie, i.imageURL);
document.body.append(manDressItem.createCard());   
}

}

