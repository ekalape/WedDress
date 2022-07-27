
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
export let openedCart = false;


const cartCounter = document.createElement("p") as HTMLParagraphElement;
const inputField = document.querySelector(".search_bar__input") as HTMLInputElement;

const filterOpenBtn = document.querySelector(".filters_open") as HTMLButtonElement;
const filterContainer = document.querySelector(".filters_menu_container") as HTMLElement;

const filterClearBtn = document.querySelector(".clear_filters") as HTMLButtonElement;
const filterResetBtn = document.querySelector(".reset_filters") as HTMLButtonElement;

const cartBtn = document.querySelector(".header__cart") as HTMLElement;

const cartTooltip = createTooltip("Click to close the cart");

async function start() {

    window.addEventListener("load", () => {
       // setCartClosed()
        loadFilterFromStorage();
        loadCartFromStorage()

    })


    counter = cartProducts.length ?? 0;
    data = await createDatabase();

    window.addEventListener("beforeunload", () => { saveFilterToStorage(), saveCartToStorage() });


  //  document.querySelector("header")?.addEventListener("click", () => { console.log(filter) })

    document.querySelector(".search_bar__btn")?.addEventListener("click", search);
    inputField.addEventListener("keydown", (evt: KeyboardEvent) => {
        if (evt.key !== "Enter") return;  
        search();
    })


    const currentData = await updateData(filter)

    render.renderElements(filter)

    cartCounter.classList.add("cart_counter")
    cartCounter.textContent = String(cartProducts.length);
    cartBtn.append(cartCounter);
    cartBtn.addEventListener("click", openCart);
    cartBtn.append(cartTooltip)

    render.renderCardContainer(currentData)
    const wrapperBG = document.querySelector(".filterContainer_wrapper") as HTMLElement;
    wrapperBG.addEventListener("click", (event: Event) => {
        let t = event.target as HTMLElement;

        if (!t.classList.contains("filterContainer_wrapper")) return;
        event.stopPropagation();
        closeFilters()

    })

    filterOpenBtn.addEventListener("click", closeFilters)

    function closeFilters() {
        if (filterContainer.classList.contains("opened")) {
            filterContainer.classList.remove("opened");
            wrapperBG.classList.remove("fc_opened");
            document.body.classList.remove("main_block")
        }
        else {
            filterContainer.classList.add("opened");
            wrapperBG.classList.add("fc_opened");
            document.body.classList.add("main_block")
        }
    }

    filterClearBtn.addEventListener("click", () => { localStorage.setItem("wdSavedFilter", "") })
    filterResetBtn.addEventListener("click", resetFilter);

}

start()

export function cartIsOpened() {
    return openedCart;
};
export function setCartClosed() {
    openedCart = false;
}

export async function openCart() {
 
    if (!openedCart) {
        openedCart = true;
        await updateData(filter);
        cartTooltip.style.opacity="1";
    
    }
    else {
        openedCart = false;
        await updateData(filter);
        cartTooltip.style.opacity="0";
    
    }
}

function createTooltip(text:string):HTMLElement{
    const tip = document.createElement("div");
    tip.classList.add("tooltip");
    tip.textContent=text;
    return tip;
}

function loadFilterFromStorage() {
    let f = localStorage.getItem("wdSavedFilter");
    if (!f || f.length === 0 || f === undefined) filter = new Filter()
    else filter = JSON.parse(f)
}

function loadCartFromStorage() {
    let cp = JSON.parse(localStorage.getItem("wdSavedCart") || "[]")
    cartProducts = cp.map((x: Cloth) => Object.setPrototypeOf(x, Cloth.prototype))

}

function saveFilterToStorage() {
    localStorage.setItem("wdSavedFilter", JSON.stringify(filter));
}

function saveCartToStorage() {
    localStorage.setItem("wdSavedCart", JSON.stringify(cartProducts));
}

function resetFilter() {
    filter = new Filter;
    render.renderGenderBtns(filter);
    render.renderSortingOpt(filter);
    render.renderColorBtns(filter);
    render.renderAdditionals(filter);
    render.updateSlider(filter);

}

export function addToCart(item: Cloth) {
    cartProducts.push(item);
  //  console.log("added >>> ", cartProducts);

    cartCounter.textContent = String(cartProducts.length)

    const allsigns = [...document.querySelectorAll(".inthecard_sign")] as HTMLElement[]
    const oursign = allsigns.filter(x => x.dataset.hid === item.hiddenID);
    if (oursign[0]) {
        oursign[0].classList.remove("inthecard_invisible");
        console.log(oursign[0])
    }


}



export function removeFromCart(item: Cloth) {
    cartProducts = cartProducts.filter(x => x.hiddenID != item.hiddenID)
  //  console.log("removed >>> ", cartProducts);

    cartCounter.textContent = String(cartProducts.length)


    const allsigns = [...document.querySelectorAll(".inthecard_sign")] as HTMLElement[]
    const oursign = allsigns.filter(x => x.dataset.hid === item.hiddenID);
    if (oursign[0]) {
        oursign[0].classList.add("inthecard_invisible");
    }


}

function search() {
    let text = inputField.value.toLowerCase().split(/[^(a-z)]+/).filter(x => x.length != 0);

    console.log(text);
    searchByWord(text)

}
