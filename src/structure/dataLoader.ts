
import { Cloth } from './cloth';
import { Filter, ORDER } from './Filter';
import { renderCardContainer } from './renders';




type prod = {
    imageURL: string,
    color: string,
    hiddenID: string,
    tie: string,
    complexity: number,
    sleeves: string,
    len: string
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
        item.setCompl(x.complexity);
        database.push(item)
    })
    womenArr.forEach((x: prod) => {
        const item = new Cloth(x.hiddenID, x.imageURL, "Woman", x.color);
        item.setLen(x.len);
        item.setSleeves(x.sleeves);
        database.push(item)
    })

    return database;

}

export async function filterDatabase(filter: Filter, data?: Cloth[]) {
    let database = data ?? await createDatabase()

    if (filter.len) { database = database.filter(x => filter.len === x.len) }
    if (filter.tie) { database = database.filter(x => filter.tie === x.tie) }
    if (filter.sleeves) { database = database.filter(x => filter.sleeves === x.sleeves) }
    if (filter.complexity) { database = database.filter(x => filter.complexity === x.compl) }

    database = database.filter(x => filter.gender.includes(x.gender) && filter.colors.includes(x.color))

    /* result = result.filter(x => (x.price >= minPrice && x.price <= maxPrice))
      result = result.filter(x => (x.popularity >= minPop && x.popularity <= maxPop))
      result = result.filter(x => (x.size.some(s => s >= minSize && s <= maxSize))) */

    if (database.length === 0) alert("Sorry, no results found!")
    else {
        database = reorderData(database, filter.orderedBy)
    }

    renderCardContainer(database)

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
