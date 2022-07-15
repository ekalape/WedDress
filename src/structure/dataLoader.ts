
import { Cloth } from './cloth';
import { Filter, ORDER } from './Filter';
import { renderCardContainer } from './renders';
import {data} from "./main"




type prod = {
    imageURL: string,
    color: string,
    hiddenID: string,
    tie: string,
    complexity: number,
    sleeves: string,
    length: string
}

export async function createDatabase() {
    const database: Cloth[] = []
    const resp1 = await fetch("/src/database/man.json")
    const resp2 = await fetch("/src/database/woman.json")

    const menArr = await resp1.json()
    const womenArr = await resp2.json()
    menArr.forEach((x: prod) => {
        const item = new Cloth(x.hiddenID, x.imageURL, "Man", x.color);
        item.setTie(x.tie); 
        if(x.complexity===2) {item.setCompl("two");}
        if(x.complexity===3){item.setCompl("three");}
 
        database.push(item)
    })
    womenArr.forEach((x: prod) => {
        const item = new Cloth(x.hiddenID, x.imageURL, "Woman", x.color);
        item.setLen(x.length);
        item.setSleeves(x.sleeves);
        database.push(item)
    })

    return database /* as Cloth[] */;

}

export async function updateData(filter: Filter) {
    let d = data 

let database =[...d]

database = database.filter(x => filter.gender.includes(x.gender) && filter.colors.includes(x.color))

if(filter.gender.length === 1 && filter.gender.includes("Man")){
    if (filter.tie) { database = database.filter(x => filter.tie === x.tie) };
    if (filter.complexity) { database = database.filter(x => filter.complexity === x.compl) }
}

if(filter.gender.length === 1 && filter.gender.includes("Woman")){
    if (filter.len) { database = database.filter(x => filter.len === x.len) } 
    if (filter.sleeves) { database = database.filter(x => filter.sleeves === x.sleeves) }

}
database = database.filter(x => (x.price >= filter.minPrice && x.price <= filter.maxPrice));
database = database.filter(x => (x.sizes.some(s => s >= filter.minSize && s <= filter.maxSize))) 

    /* 
      result = result.filter(x => (x.popularity >= minPop && x.popularity <= maxPop))
      */

    if (database.length === 0) alert("Sorry, no results found!")
    else {
        database = reorderData(database, filter.orderedBy)
    }

    renderCardContainer(database)

    console.log(database);
    

    return database;

}
function reorderData(database: Cloth[], sorting: ORDER) {
    switch (sorting) {
        case ORDER.POPULARITY_DOWN:
            database.sort((a, b) => b.popularity - a.popularity);
            break;
        case ORDER.POPULARITY_UP:
            database.sort((a, b) => a.popularity - b.popularity);
            break;
        case ORDER.PRICE_DOWN:
            database.sort((a, b) => b.price - a.price);
            break;
        case ORDER.PRICE_UP:
            database.sort((a, b) => a.price - b.price);
            break;
        case ORDER.SHAFFLE:
            database = shaffle(database);
            break;
            
    }

    return database;

}

function shaffle(arr: Cloth[]): Cloth[] {

    let currIndex: number = arr.length, randomIndex: number;
    while (currIndex != 0) {
        randomIndex = Math.floor(Math.random() * currIndex);
        currIndex--;
        [arr[currIndex], arr[randomIndex]] = [arr[randomIndex], arr[currIndex]]
    }
    return arr;
}
