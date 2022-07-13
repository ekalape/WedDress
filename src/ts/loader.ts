

import * as cloth from "./clothBase";
import * as enums from "./enums";



type wDress = {
    color: enums.womanColors | string,
    imageURL: string,
    sleeves: boolean,
    length: string,
    hiddenID:string
}
type mDress = {
    color: enums.womanColors | string,
    imageURL: string,
    complexity: number,
    tie: string,
    hiddenID:string
}

export async function createDatabase(): Promise<cloth.Cloth[]> {
    const responseW = await fetch("/src/database/woman.json");
    const womenArray: wDress[] = await responseW.json();

    const responseM = await fetch("/src/database/man.json")
    const menArray: mDress[] = await responseM.json()

    const database: cloth.Cloth[] = [];

    for (let i of menArray) {     
        database.push(new cloth.ManCloth(i.color, i.complexity, i.tie, i.imageURL,i.hiddenID));
    }
    for (let i of womenArray) {
        database.push(new cloth.WomanCloth(i.color, i.sleeves, i.length, i.imageURL, i.hiddenID))
    }
   
    
    return database;
}

