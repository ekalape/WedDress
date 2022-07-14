import * as cloth from "./clothBase";
import { createDatabase } from './loader';
import * as enums from "./enums"
import * as main from "./main"


export type filter = {
    orderedBy?: enums.ordering | string,
    minSize?: number,
    maxSize?: number,
    color?: enums.dressColors[]|string[],
    len?:string[],
    sleeves?: boolean,
    tie?: enums.ties | string,
    complexity?: enums.dressComplex | number,
    minPrice?: number,
    maxPrice?: number,
    minPop?: number,
    maxPop?: number,
    gender?: string
}


export async function applyFilters(filters: filter, array?: cloth.Cloth[]) {
    if(!filters.orderedBy) filters.orderedBy = enums.ordering.SHAFFLE;
    const database = array ?? await createDatabase();
    let minSize = filters.minSize ?? 0;
    let maxSize = filters.maxSize ?? 100;
    let minPrice = filters.minPrice ?? 0;
    let maxPrice = filters.maxPrice ?? 1000000;
    let minPop = filters.minPop ?? 0;
    let maxPop = filters.maxPop ?? 6;
/* let f = [...new Set([...Object.keys(enums.manColors), ...Object.keys(enums.womanColors)])]
console.log(f); */

    if(!filters.color) {filters.color = [...new Set([...Object.keys(enums.manColors), ...Object.keys(enums.womanColors)])].map(x=>x.toLowerCase())}


    let result = [...database]

    if ("gender" in filters) {
        result = result.filter(x => x.gender === filters.gender)
    }
    if ("color" in filters) {
        console.log(filters.color);
        result = result.filter(x =>  filters.color?.includes(x.color))
    }
    if ("sleeves" in filters) {
        result = result.filter((x) => isWomanCloth(x) && x.sleeves === filters.sleeves)
    }
    if ("len" in filters) {
        result = result.filter((x) => isWomanCloth(x) && filters.len?.includes(x.len))
    }


    if ("tie" in filters) {
        result = result.filter((x) => isManCloth(x) && x.tie === filters.tie)
    }

    if ("complexity" in filters) {
        result = result.filter((x) => isManCloth(x) && x.complexity === filters.complexity)
    }


    result = result.filter(x => (x.price >= minPrice && x.price <= maxPrice))
    result = result.filter(x => (x.popularity >= minPop && x.popularity <= maxPop))
    result = result.filter(x => (x.size.some(s => s >= minSize && s <= maxSize)))



    if (result.length === 0) {/* alert("Sorry, but nothing found!") */

}
    else {
        switch (filters.orderedBy) {
            case enums.ordering.PRICE_UP:
                result.sort((a, b) => a.price - b.price);
                break;
            case enums.ordering.PRICE_DOWN:
                result.sort((a, b) => b.price - a.price);
                break;
            case enums.ordering.POPULARITY_DOWN:
                result.sort((a, b) => b.popularity - a.popularity);
                break;
            case enums.ordering.POPULARITY_UP:
                result.sort((a, b) => a.popularity - b.popularity);
                break;


            default: shaffle(result);
        }


    }

return result;
}

function isWomanCloth(d: cloth.Cloth): d is cloth.WomanCloth {
    return d.gender === "Woman"
}
function isManCloth(d: cloth.Cloth): d is cloth.ManCloth {
    return d.gender === "Man"
}

function shaffle(arr: cloth.Cloth[]): cloth.Cloth[] {

    let currIndex: number = arr.length, randomIndex: number;
    while (currIndex != 0) {
        randomIndex = Math.floor(Math.random() * currIndex);
        currIndex--;
        [arr[currIndex], arr[randomIndex]] = [arr[randomIndex], arr[currIndex]]
    }
    return arr;
}

export async function updateFilter(){

}