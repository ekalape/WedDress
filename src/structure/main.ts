import "../style.scss"
import { createDatabase,updateData } from './dataLoader';
import { Cloth } from "./cloth"
import { ORDER,Filter } from "./Filter"
import *as render from './renders';




let filter: Filter;
export let data:Cloth[];

async function start() {
/*     loadFilterFromStorage();
    window.addEventListener("beforeunload", saveFilterToStorage); */
//filter.gender = ["Man"]


filter = new Filter()
filter.orderedBy = ORDER.POPULARITY_DOWN
data = await createDatabase();
 
document.querySelector("header")?.addEventListener("click", ()=>{console.log(filter)})



const currentData = await updateData(filter)


render.renderElements(filter)
render.renderCardContainer(currentData)

}

start()


function loadFilterFromStorage() {
    let f = localStorage.getItem("wdSavedFilter");
    f ? filter = JSON.parse(f) : filter = new Filter()
}
function saveFilterToStorage() {
    localStorage.setItem("wdSavedFilter", JSON.stringify(filter))
}