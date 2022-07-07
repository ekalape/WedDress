

import * as cloth from "./clothBase";
import * as enums from "./enums";



type wDress = {
    color: enums.womanColors | string,
    imageURL: string,
    sleeves: boolean,
    length: string
}
type mDress = {
    color: enums.womanColors | string,
    imageURL: string,
    complexity: number,
    tie: string;
}

export async function createDatabase(): Promise<cloth.Cloth[]> {
    const responseW = await fetch("/src/database/woman.json");
    const womenArray: wDress[] = await responseW.json();
    console.log(womenArray);


    const responseM = await fetch("/src/database/man.json")
    const menArray: mDress[] = await responseM.json()

    const database: cloth.Cloth[] = [];

    for (let i of menArray) {
        //const manDressItem = new cloth.ManCloth(i.color, i.complexity, i.tie, i.imageURL);
        //document.body.append(manDressItem.createCard());   
        database.push(new cloth.ManCloth(i.color, i.complexity, i.tie, i.imageURL));
    }
    for (let i of womenArray) {
        database.push(new cloth.WomanCloth(i.color, i.sleeves, i.length, i.imageURL))
    }
    return database;
}

