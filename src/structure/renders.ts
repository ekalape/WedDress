import { Cloth } from './cloth';
import { updateData } from './dataLoader';
import { Filter } from './Filter';

const menColors = ["white", "black", "gray", "blue"];
const womenColors = ["white", "red", "yellow", "blue"];
const allColors = ["white", "black", "gray", "blue", "red", "yellow"]
let database:Cloth[]
export function renderElements(filter:Filter){



    renderGenderBtns(filter);
    renderColorBtns(filter);
    renderAdditionals(filter);

}

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


function renderGenderBtns(filter: Filter) {
    const genderBtns = document.querySelectorAll(".gb")

    genderBtns.forEach(x => x.addEventListener("click", switchGender))

    async function switchGender(event: Event) {
        let t = event.target as HTMLButtonElement;
        if (t.classList.contains("btn_pressed")) return
        genderBtns.forEach(x => x.classList.remove("btn_pressed"))

        if (t.textContent?.includes("Man")) {
            filter.gender = ["Man"]
          /*   delete filter.len;
            delete filter.sleeves; */
        }
        if (t.textContent?.includes("Woman")) {
            filter.gender = ["Woman"]
        /*     delete filter.complexity;
            delete filter.tie; */
        }
        if (t.textContent?.includes("Mix")) {
            filter.gender = ["Man", "Woman"]
       /*      delete filter.len;
            delete filter.sleeves;
            delete filter.complexity;
            delete filter.tie; */
        }
        renderColorBtns(filter);
        renderAdditionals(filter)
        t.classList.add("btn_pressed")
        await updateData(filter)
    }
}

function renderColorBtns(filter: Filter) {
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

        async function changeColor(event: Event) {
            let t = event.target as HTMLInputElement;
            console.log(t.style.backgroundColor);


            if (t.classList.contains("color_checked")) {
                t.classList.remove("color_checked")
                filter.colors = filter.colors.filter(x => x !== t.style.backgroundColor)

            }
            else {
                t.classList.add("color_checked")
                filter.colors.push(t.style.backgroundColor)
            }
            console.log(filter.colors);

            await updateData(filter)
        }

        colorBtns?.append(colorChoice);
    })

}

export function renderAdditionals(filter: Filter) {

    const additContainer = document.querySelector(".filters_menu__additional");
    if (additContainer) additContainer.innerHTML = "";


    if (filter.gender.length === 1 && filter.gender.includes("Man")) {

        const tieSelect = document.createElement("select");
        const complSelect = document.createElement("select");
        [tieSelect, complSelect].forEach(s => {
            s.classList.add("additionals");
            s.addEventListener("change", switchAdditional)
        })

        let tieSelectOpt = ["Show all", "With a classic tie", "With a bow tie", "Without a tie"];
        let complSelectOpt = ["Show all", "Two pieces suit", "Three pieces suit"];

        tieSelectOpt.forEach(x => {
            const opt = document.createElement("option");
            opt.value = x + " tie";
            opt.text = x;
            opt.classList.add("additional__option")
            if (filter.tie && opt.value.includes(filter.tie)) {opt.selected = true};
            tieSelect.append(opt);
        })
        complSelectOpt.forEach(x => {
            const opt = document.createElement("option");
            opt.value = x + " compl";
            opt.text = x;
            opt.classList.add("additional__option")
            if (filter.complexity && opt.value.includes(filter.complexity)) {opt.selected = true};
            complSelect.append(opt);
        })
        additContainer?.append(tieSelect, complSelect)

    }
    if (filter.gender.length === 1 && filter.gender.includes("Woman")) {
        const lenSelect = document.createElement("select");
        const slSelect = document.createElement("select");
        [lenSelect, slSelect].forEach(s => {
            s.classList.add("additionals");
            s.addEventListener("change", switchAdditional)
        })
        let lenSelectOpt = ["Show all", "Long length", "Medium length", "Short length"];
        let slSelectOpt = ["Show all", "With sleeves", "Without sleeves"];

        lenSelectOpt.forEach(x => {
            console.log(filter.len)
            const opt = document.createElement("option");
            opt.value = x.toLowerCase() + " len";
            opt.text = x;
            opt.classList.add("additional__option")
            if (filter.len && opt.value.includes(filter.len)) { opt.selected = true }
            lenSelect.append(opt);
        })
        slSelectOpt.forEach(x => {

            const opt = document.createElement("option");
            opt.value = x.toLowerCase() + " sleev";
            opt.text = x;
            opt.classList.add("additional__option")
            if (filter.sleeves && opt.value.includes(filter.sleeves)) { opt.selected = true }

            slSelect.append(opt);
        })
        additContainer?.append(lenSelect, slSelect)
    }
    async function switchAdditional(event: Event) {
        const t = event.target as HTMLSelectElement;
        
        console.log(t);
        let value = t.value.toLowerCase()
        if (value.includes("len")) {

            console.log(t.value)
            if (value.includes("long")) {
                filter.len = "long";
            }
            else if (value.includes("medium")) {
                filter.len = "medium"
            }
            else if (value.includes("short")) {
                filter.len = "short"
            } else delete filter.len


        }
        if(value.includes("sleev")){
            if (value.includes("with")) {
                filter.sleeves = "with sleeves";
            }
            else if (value.includes("without")) {
                filter.sleeves = "without";
            }
            else delete filter.sleeves;
        }

        if(value.includes("tie")){
            if (value.includes("classic")) {
                filter.tie = "classic";
            }
            else if (value.includes("bow")) {
                filter.tie = "bow";
            }
            else if (value.includes("without")) {
                filter.tie = "none";
            }
            else delete filter.tie;
        }

        if(value.includes("compl")){
            console.log(value);
            
            if (value.includes("two")) {
                filter.complexity = "two";
            }
            else if (value.includes("three")) {
                filter.complexity = "three";
            }
            else delete filter.complexity;
        }








await updateData(filter);

    }

}

