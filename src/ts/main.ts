import * as enums from "./enums";
import * as ord from "./ordering";

import "../style.scss";
import { Cloth } from './clothBase';
import { drawColors, drawAdditionals,drawSortingSwitch } from './menuLoader';


export let filter: ord.filter = {}



const cardContainer = document.querySelector(".card-container")
export let baseData: Cloth[];

const genderBtns: HTMLElement = document.querySelector(".genderBtn_container") as HTMLElement;
const filters_open_btn = document.querySelector(".filters_open") as HTMLElement;
const filters_menu = document.querySelector(".filters_menu_container") as HTMLElement;

async function start() {
console.log("function START works");

loadFilter()
window.addEventListener("beforeunload", saveFilter)

/* ---debug filter---- */
document.querySelector("header")?.addEventListener("click", ()=>console.log(filter))

    genderBtns.append(...createGenderBtns());
    filters_open_btn.addEventListener("click", menuSlideOut)
    genderBtns.addEventListener("click", createGenderFilter)

    baseData = await ord.applyFilters(filter,baseData)

    drawCardContainer(baseData)
    drawColors(baseData)
    drawAdditionals(baseData)
    drawSortingSwitch(baseData)
}
start()
function loadFilter(){
    let f = localStorage.getItem("wdStorFilter");
    if(!f) filter = {};
    else filter = JSON.parse(f);
}
function saveFilter(event:Event){
    event?.preventDefault();
    localStorage.setItem("wdStorFilter", JSON.stringify(filter))
}

export async function drawCardContainer(baseData: Cloth[]) {
    if (cardContainer) cardContainer.innerHTML = "";

    for (let item of baseData) {
        const i = item.createCard();
        i.addEventListener("click", (event) => {
            console.log(item);
            const modal = createModalWindow(item);
            document.body.prepend(modal)
        })
        cardContainer?.append(i)
    }

}


function createModalWindow(ourCard: Cloth): HTMLElement {

    const bg: HTMLElement = document.createElement("div");
    bg.classList.add("modal-bg");

    const cardModal: HTMLElement = ourCard.createModalCard();
    const closeBtn: HTMLButtonElement = document.createElement("button"); //close btn
    const closeImg: HTMLImageElement = document.createElement("img");
    closeImg.src = "/src/assets/close_black.png"
    closeImg.alt = "Close button"
    closeImg.title = "Close"
    closeBtn.classList.add("closeBtn")
    closeBtn.append(closeImg);
    closeBtn.addEventListener("click", () => bg.remove())
    cardModal.append(closeBtn);

    const cartSign: HTMLButtonElement = document.createElement("button");//card btn
    cartSign.classList.add("cart_btn");
    const cartSign_text: HTMLParagraphElement = document.createElement("p")
    cartSign_text.classList.add("cartSign__text", "cart_add");
    const cartSign_image: HTMLImageElement = document.createElement("img")
    cartSign_image.classList.add("cartSign__image");

    if (isInCart(ourCard)) {
        cartSign_image.src = "/src/assets/carrello_love_black.png"
        cartSign_text.textContent = `Remove from Cart`
    } else {
        cartSign_image.src = "/src/assets/carrello_remove_black.png"
        cartSign_text.textContent = `Add to Cart`
    }
    cartSign.append(cartSign_image, cartSign_text)
    cardModal.append(cartSign);

    bg.append(cardModal);
    return bg;

}
function createGenderBtns(): HTMLButtonElement[] {
    const wBtn = document.createElement("button") as HTMLButtonElement;
    const mBtn = document.createElement("button") as HTMLButtonElement;
    const allBtn = document.createElement("button") as HTMLButtonElement;

    wBtn.classList.add("gender_btn");
    mBtn.classList.add("gender_btn");
    allBtn.classList.add("gender_btn");
    wBtn.textContent = "Woman Collection";
    mBtn.textContent = "Man Collection";
    allBtn.textContent = "Mix";

    if (!filter.gender) allBtn.classList.add("btn_pressed")
    else if (filter.gender === "Man") mBtn.classList.add("btn_pressed");
    else wBtn.classList.add("btn_pressed");

    return [wBtn, mBtn, allBtn]
}

async function createGenderFilter(event: Event) {

    let et = event.target as HTMLButtonElement;
    delete filter.gender;
    delete filter.len;
    delete filter.sleeves;
    delete filter.tie;
    delete filter.complexity;
    if (et.classList.contains("gender_btn") && !et.classList.contains("btn_pressed")) {
        if (et.textContent?.includes("Woman")) {
            filter.gender = "Woman";

        }
        if (et.textContent?.includes("Man")) {
            filter.gender = "Man";

        }
        drawAdditionals(baseData)
        let collectChoiceBtns = [...genderBtns.children]
        collectChoiceBtns.forEach(x => { if (x.classList.contains("btn_pressed")) x.classList.remove("btn_pressed") })
        et.classList.add("btn_pressed")

    /*     baseData = await ord.applyFilters(filter, baseData) */
        console.log(filter.gender);

        drawColors(baseData);
        drawCardContainer(await ord.applyFilters(filter, baseData));
    }
}

//------to the cart class
function isInCart(item: Cloth): boolean {
    return false;
}
function addToCart(item: Cloth) {

}
function removeFromCart(item: Cloth) {

}
//--------
function menuSlideOut() {
    filters_menu.classList.toggle("opened")
}





