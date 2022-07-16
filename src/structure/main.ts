
import 'nouislider/dist/nouislider.css';
import "../style.scss"
import { createDatabase,updateData } from './dataLoader';
import { Cloth } from "./cloth"
import { ORDER,Filter } from "./Filter"
import *as render from './renders';





let filter: Filter;
export let data:Cloth[];

export let counter = 0;
export let cartProducts:Cloth[] =[];
const cartCounter = document.createElement("p") as HTMLParagraphElement;

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




cartCounter.classList.add("cart_counter")
cartCounter.textContent = String(cartProducts.length);
document.querySelector(".header__cart")?.append(cartCounter)

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

export function addToCart(item:Cloth){
cartProducts.push(item);
console.log("added >>> ", cartProducts);
cartCounter.textContent = String(++counter)

}

export function removeFromCart(item:Cloth){
cartProducts = cartProducts.filter(x=>x!=item)
console.log("removed >>> ", cartProducts);
cartCounter.textContent = String(--counter)
}

