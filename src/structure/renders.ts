
import * as noUiSlider from 'nouislider';
import { Cloth } from './cloth';
import { updateData } from './dataLoader';
import { Filter, ORDER } from './Filter';
import { addToCart, removeFromCart, cartProducts } from "./main";


import { PipsMode, target, API } from "nouislider"


const menColors = ["white", "black", "gray", "blue"];
const womenColors = ["white", "red", "yellow", "blue"];
const allColors = ["white", "black", "gray", "blue", "red", "yellow"]

let database: Cloth[]

const sliderPrice = document.querySelector(".sl_price") as noUiSlider.target;
const sliderSize = document.querySelector(".sl_size") as noUiSlider.target;



export function renderElements(filter: Filter) {

    renderGenderBtns(filter);
    renderSortingOpt(filter);
    renderColorBtns(filter);
    renderAdditionals(filter);
    renderSliders(filter)

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
    document.body.classList.add("main_block");

    const cardModal: HTMLElement = ourCard.createModalWindow();
    const closeBtn: HTMLButtonElement = document.createElement("button"); //close btn
    const closeImg: HTMLImageElement = document.createElement("img");
    closeImg.src = "/src/assets/close_black.png"
    closeImg.alt = "Close button"
    closeImg.title = "Close"
    closeBtn.classList.add("closeBtn")
    closeBtn.append(closeImg);
    closeBtn.addEventListener("click", () => {bg.remove();
        document.body.classList.remove("main_block")})
    cardModal.append(closeBtn);

    const cartSign: HTMLButtonElement = document.createElement("button");//card btn
    cartSign.classList.add("cart_btn");
    const cartSign_text: HTMLParagraphElement = document.createElement("p")
    cartSign_text.classList.add("cartSign__text", "cart_add");
    const cartSign_image: HTMLImageElement = document.createElement("img")
    cartSign_image.classList.add("cartSign__image");

    if (ourCard.carted) {
        cartSign_image.src = "/src/assets/carrello_remove_black.png"
        cartSign_text.textContent = `Remove from Cart`
    } else {
        cartSign_image.src = "/src/assets/carrello_love_black.png"
        cartSign_text.textContent = `Add to Cart`;
    }


    cartSign.append(cartSign_image, cartSign_text);

    cartSign.addEventListener("click", cartManipulation);

    function cartManipulation(event: Event) {
        let t = event.target as HTMLButtonElement;

        let c = cartSign_text.textContent
        console.log(c);


        if (c?.includes("Add")) {


            cartSign_text.textContent = "Remove from cart";
            cartSign_image.src = "/src/assets/carrello_remove_black.png"
            addToCart(ourCard);
            ourCard.carted = true;

        }
        else if (c?.includes("Remove")) {
            cartSign_text.textContent = "Add to cart";
            cartSign_image.src = "/src/assets/carrello_love_black.png"
            removeFromCart(ourCard);
            ourCard.carted = false;

        }

    }

    cardModal.append(cartSign);

    bg.append(cardModal);
    bg.addEventListener("click", (event: Event) => {
        let t = event.target as HTMLElement;
        if (!t.classList.contains("modal-bg")) return;
        event.stopPropagation();
        bg.remove();
        document.body.classList.remove("main_block")
    })

    document.body.prepend(bg)
    //return bg;

}


export function renderGenderBtns(filter: Filter) {
    const genderBtns = document.querySelectorAll(".gb")
    genderBtns.forEach(x => x.classList.remove("btn_pressed"))

    genderBtns.forEach(x => {
        console.log(filter.gender)
        if (filter.gender.length === 1 && x.innerHTML.includes(filter.gender[0])) { x.classList.add("btn_pressed") }

        if (filter.gender.length === 2 && x.innerHTML.includes("Mix")) { x.classList.add("btn_pressed") }

        x.addEventListener("click", switchGender)
    })

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
        renderColorBtns(filter);
        renderAdditionals(filter)
        t.classList.add("btn_pressed")

        await updateData(filter)
    }
}



export function renderColorBtns(filter: Filter) {
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
            if (filter.tie && opt.value.includes(filter.tie)) { opt.selected = true };
            tieSelect.append(opt);
        })
        complSelectOpt.forEach(x => {
            const opt = document.createElement("option");
            opt.value = x + " compl";
            opt.text = x;
            opt.classList.add("additional__option")
            if (filter.complexity && opt.value.includes(filter.complexity)) { opt.selected = true };
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
        if (value.includes("sleev")) {
            if (value.includes("with sleeves")) {
                filter.sleeves = "with sleeves";
            }
            else if (value.includes("without")) {
                filter.sleeves = "without sleeves";
            }
            else delete filter.sleeves;
        }

        if (value.includes("tie")) {
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

        if (value.includes("compl")) {
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

export function renderSortingOpt(filter: Filter) {
    const sortOptions = [...document.querySelectorAll(".sortRadio")] as HTMLInputElement[]

    const checkedOpt = sortOptions.filter((x: HTMLInputElement) => x.id === ORDER[filter.orderedBy])
    checkedOpt[0].checked = true;
    sortOptions.forEach(s => s.addEventListener("click", switchSorting));

    async function switchSorting(event: Event) {
        const t = event.target as HTMLInputElement;

        console.log(t);
        switch (t.id) {
            case "PRICE_UP":
                filter.orderedBy = ORDER.PRICE_UP;
                break;
            case "PRICE_DOWN":
                filter.orderedBy = ORDER.PRICE_DOWN;
                break;
            case "POPULARITY_UP":
                filter.orderedBy = ORDER.POPULARITY_UP;
                break;
            case "POPULARITY_DOWN":
                filter.orderedBy = ORDER.POPULARITY_DOWN;
                break;
            case "SHAFFLE":
                filter.orderedBy = ORDER.SHAFFLE;
                break;

        }
        t.checked = true;
        await updateData(filter)
    }

}

function renderSliders(filter: Filter) {

    let minPrice = filter.minPrice;
    let maxPrice = filter.maxPrice;
    console.log(filter.minSize);


    let minSize = filter.minSize;
    let maxSize = filter.maxSize;


    noUiSlider.create(sliderPrice, {
        start: [minPrice, maxPrice],
        connect: true,
        range: {
            "min": 1000,
            "max": 5000
        },
        step: 100,
        tooltips: false,

        pips: {
            mode: PipsMode.Count,
            values: 6,
            stepped: true,
            density: 5,

        }
    });
    sliderPrice.noUiSlider?.on("change", (value) => {
        switchPrice(value as string[])
    })

    noUiSlider.create(sliderSize, {
        start: [minSize, maxSize],
        connect: true,
        range: {
            "min": 38,
            "max": 56
        },
        pips: {
            mode: PipsMode.Count,
            values: 10,
            stepped: true,
            density: 10,

        }
    });
    sliderSize.noUiSlider?.on("change", (value) => {
        switchSize(value as string[])
    })


    async function switchPrice(range: string[]) {

        let minPrice = Number(range[0]);
        let maxPrice = Number(range[1]);
        filter.minPrice = minPrice;
        filter.maxPrice = maxPrice;

        await updateData(filter)
    }
    async function switchSize(range: string[]) {

        let minSize = Number(range[0].slice(0, 2));
        let maxSize = Number(range[1].slice(0, 2));
        console.log(range);
        filter.minSize = minSize;
        filter.maxSize = maxSize;

        await updateData(filter);

    }

}
export async function updateSlider(filter: Filter) {
    sliderPrice.noUiSlider?.reset();
    sliderPrice.noUiSlider?.set([0, 5000]);
    sliderSize.noUiSlider?.reset();
    sliderSize.noUiSlider?.set([38, 56]);
    await updateData(filter);

}



