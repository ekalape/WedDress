
import 'nouislider/dist/nouislider.css';
import "../style.scss"
import { createDatabase, updateData, searchByWord } from './dataLoader';
import { Cloth } from "./cloth"
import { ORDER, Filter } from "./Filter"
import *as render from './renders';






let filter: Filter;
export let data: Cloth[];

export let counter: number;
export let cartProducts: Cloth[] = [];
const cartCounter = document.createElement("p") as HTMLParagraphElement;
const inputField = document.querySelector(".search_bar__input") as HTMLInputElement;

const filterOpenBtn = document.querySelector(".filters_open") as HTMLButtonElement;
const filterContainer = document.querySelector(".filters_menu_container") as HTMLElement;

async function start() {

    loadFilterFromStorage();
    loadCartFromStorage()
    window.addEventListener("beforeunload", saveFilterToStorage);
    counter = cartProducts.length ?? 0;


    data = await createDatabase();

    document.querySelector("header")?.addEventListener("click", () => { console.log(filter) })

    document.querySelector(".search_bar__btn")?.addEventListener("click", search);
    inputField.addEventListener("keydown", (evt: KeyboardEvent) => {
        if (evt.key !== "Enter") return;

        console.log("white".includes("whiteee"));
        search();
    })


    const currentData = await updateData(filter)

    render.renderElements(filter)

    cartCounter.classList.add("cart_counter")
    cartCounter.textContent = String(cartProducts.length);
    document.querySelector(".header__cart")?.append(cartCounter)

    render.renderCardContainer(currentData)


    filterOpenBtn.addEventListener("click", ()=>{
        filterContainer.classList.toggle("opened")
    })


}

start()


function loadFilterFromStorage() {
    let f = localStorage.getItem("wdSavedFilter");
    if (!f || f.length === 0 || f === undefined) filter = new Filter()
    else filter = JSON.parse(f)
}

function loadCartFromStorage() {

    let f = localStorage.getItem("wdSavedCart");

    if (!f || f.length === 0 || f === undefined) cartProducts = []
    else cartProducts = JSON.parse(f)
}

function saveFilterToStorage() {
    localStorage.setItem("wdSavedFilter", JSON.stringify(filter));
    localStorage.setItem("wdSavedCart", JSON.stringify(cartProducts));
}

export function addToCart(item: Cloth) {
    cartProducts.push(item);
    console.log("added >>> ", cartProducts);
    cartCounter.textContent = String(++counter)

    const allsigns = [...document.querySelectorAll(".inthecard_sign")] as HTMLElement[]
    const oursign = allsigns.filter(x => x.dataset.hid === item.hiddenID);
    if (oursign[0]) {
        oursign[0].classList.remove("inthecard_invisible");
        //oursign[0].textContent="-Is in your cart-";
        console.log(oursign[0])
    }

}



export function removeFromCart(item: Cloth) {
    cartProducts = cartProducts.filter(x => x != item)
    console.log("removed >>> ", cartProducts);
    cartCounter.textContent = String(--counter)


    const allsigns = [...document.querySelectorAll(".inthecard_sign")] as HTMLElement[]
    const oursign = allsigns.filter(x => x.dataset.hid === item.hiddenID);
    if (oursign[0]) {
        oursign[0].classList.add("inthecard_invisible");
        //oursign[0].textContent="";
        console.log(oursign[0])
    }

}

function search() {

    let text = inputField.value.toLowerCase().split(/[^(a-z)]+/).filter(x => x.length != 0);

    console.log(text);
    searchByWord(text)

}
