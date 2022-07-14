import "../style.scss"
import { createDatabase,filterDatabase } from './dataLoader';
import { Cloth } from "./cloth"
import { Filter } from "./Filter"
import { renderCardContainer,renderGenderBtns,renderColorBtns } from './renders';




let filter: Filter;
export let data:Cloth[];

async function start() {
/*     loadFilterFromStorage();
    window.addEventListener("beforeunload", saveFilterToStorage); */
//filter.gender = ["Man"]
filter = new Filter()
/* data = await createDatabase(); */
 
document.querySelector("header")?.addEventListener("click", ()=>{console.log(filter)})


const currentData = await filterDatabase(filter,data)

console.log(currentData)
renderGenderBtns(filter, currentData);
renderColorBtns(filter, currentData)
renderCardContainer(currentData)

}

start()


function loadFilterFromStorage() {
    let f = localStorage.getItem("wdSavedFilter");
    f ? filter = JSON.parse(f) : filter = new Filter()
}
function saveFilterToStorage() {
    localStorage.setItem("wdSavedFilter", JSON.stringify(filter))
}