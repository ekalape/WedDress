import * as enums from "./enums";
import * as ord from "./ordering";

import "../style.scss";
import { Cloth } from './clothBase';
import { drawColors, drawAdditionals } from './menuLoader';


export const filter: ord.filter = {

}



const cardContainer = document.querySelector(".card-container")
//const collectChoiceBtns = document.querySelectorAll(".gender_btn");
let baseData: Cloth[];
let hid: string;
const genderBtns: HTMLElement = document.querySelector(".genderBtn_container") as HTMLElement;
const filters_open_btn = document.querySelector(".filters_open") as HTMLElement;
const filters_menu = document.querySelector(".filters_menu_container") as HTMLElement;

async function start() {
    genderBtns.append(...createGenderBtns());
    filters_open_btn.addEventListener("click", menuSlideOut)
    genderBtns.addEventListener("click", createGenderFilter)

    baseData = await ord.applyFilters(filter)
    drawCardContainer(baseData)
    drawColors()
    drawAdditionals()
}
start()


export async function drawCardContainer(baseData: Cloth[]) {
    if (cardContainer) cardContainer.innerHTML = "";

    for (let item of baseData) {
        const i = item.createCard();
        cardContainer?.append(i)
    }
    cardContainer?.addEventListener("click", (event) => {
        event.stopPropagation()
        let t = event.target as HTMLElement;
        let cl = t.closest(".card") as HTMLElement;
        if (cardContainer.contains(cl)) {
            const descr = cl.children[1] as HTMLElement;
            hid = descr.dataset["hid"] || ""
            let item = baseData.filter(x => x.hiddenID === hid);

            if (item) {
                const m = createModalWindow(item[0]);
                console.log(item[0]);
                document.body.prepend(m)
            }
        }
    })
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
        cartSign_text.textContent = `Add to Cart`
    } else {
        cartSign_image.src = "/src/assets/carrello_remove_black.png"
        cartSign_text.textContent = `Remove from Cart`
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
    console.log(filter);

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
        drawAdditionals()
        let collectChoiceBtns = [...genderBtns.children]
        collectChoiceBtns.forEach(x => { if (x.classList.contains("btn_pressed")) x.classList.remove("btn_pressed") })
        et.classList.add("btn_pressed")

        baseData = await ord.applyFilters(filter)
        console.log(filter.gender);

        drawColors();
        await drawCardContainer(baseData);

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





