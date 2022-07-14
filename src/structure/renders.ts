import { Cloth } from './cloth';
import { filterDatabase } from './dataLoader';
import { Filter } from './Filter';

const menColors = ["white", "black", "gray", "blue"];
const womenColors = ["white", "red", "yellow", "blue"];
const allColors = ["white", "black", "gray", "blue", "red", "yellow"]



export function renderCardContainer(database: Cloth[]) {
    const cardCont = document.querySelector(".card-container");
    if (cardCont) cardCont.innerHTML = ""

    database.forEach(x => {
        const card = x.createCard();
        card.addEventListener("click", () => createModalWindow(x))
        cardCont?.append(card)
    })


}
function createModalWindow(ourCard: Cloth) {

    const bg: HTMLElement = document.createElement("div");
    bg.classList.add("modal-bg");

    const cardModal: HTMLElement = ourCard.createModalWindow();
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

    if (ourCard.carted) {
        cartSign_image.src = "/src/assets/carrello_love_black.png"
        cartSign_text.textContent = `Remove from Cart`
    } else {
        cartSign_image.src = "/src/assets/carrello_remove_black.png"
        cartSign_text.textContent = `Add to Cart`
    }
    cartSign.append(cartSign_image, cartSign_text)
    cardModal.append(cartSign);

    bg.append(cardModal);

    document.body.prepend(bg)
    //return bg;

}


export function renderGenderBtns(filter: Filter, database: Cloth[]) {
    const genderBtns = document.querySelectorAll(".gb")

    genderBtns.forEach(x => x.addEventListener("click", switchGender))

    async function switchGender(event: Event) {

        let t = event.target as HTMLButtonElement;
        if (t.classList.contains("btn_pressed")) return
        genderBtns.forEach(x => x.classList.remove("btn_pressed"))

        if (t.textContent?.includes("Man")) {
            filter.gender = ["Man"]
            

        }
        if (t.textContent?.includes("Woman")) {
            filter.gender = ["Woman"]
        }
        if (t.textContent?.includes("Mix")) {
            filter.gender = ["Man", "Woman"]
        }
        renderColorBtns(filter, database)
        t.classList.add("btn_pressed")
        await filterDatabase(filter, database)
    }
}

export function renderColorBtns(filter: Filter, database: Cloth[]) {
    const colorBtns = document.querySelector(".checks");
    if (colorBtns) colorBtns.innerHTML = "";
    let colors;
    if (filter.gender.length === 1 && filter.gender.includes("Man")) {
        colors = menColors;
    }
    else if (filter.gender.length === 1 && filter.gender.includes("Woman")) {
        colors = womenColors;
    } else colors = allColors;
    
    colors.forEach(x => {
        const colorChoice = document.createElement("input");
        colorChoice.type = "radio"
        colorChoice.classList.add("colors__checkbox");
        colorChoice.style.backgroundColor = x;
        if (filter.colors.includes(x)) {
            colorChoice.classList.add("color_checked")
        } else colorChoice.classList.remove("color_checked")

        colorChoice.addEventListener("click", changeColor)

async function changeColor(event:Event){
    let t = event.target as HTMLInputElement;
    console.log(t.style.backgroundColor);
    

    if(t.classList.contains("color_checked")){
        t.classList.remove("color_checked")
        filter.colors = filter.colors.filter(x=>x!==t.style.backgroundColor)

    }
    else{
        t.classList.add("color_checked")
        filter.colors.push(t.style.backgroundColor)
    }
    console.log(filter.colors);
    
    await filterDatabase(filter, database)
}

        colorBtns?.append(colorChoice);
    })


}

