import * as enums from "./enums";
import * as ord from"./ordering";

import "../style.scss";
import { Cloth } from './clothBase';
import { drawColors } from './menuLoader';


export const filter:ord.filter ={
gender:"Man",
color:["blue","white"]
}



const cardContainer = document.querySelector(".card-container")
const collectChoiceBtns = document.querySelectorAll(".gender_btn");
let baseData:Cloth[];
let hid:string;
const genderBtns:HTMLElement = document.querySelector(".genderBtn_container") as HTMLElement;
const filters_open_btn = document.querySelector(".filters_open") as HTMLElement;
const filters_menu = document.querySelector(".filters_menu_container") as HTMLElement;

async function start(){
    filters_open_btn.addEventListener("click", menuSlideOut)
    genderBtns.addEventListener("click", createGenderFilter )

    baseData = await ord.applyFilters(filter)
    drawCardContainer(baseData)
    drawColors()
}
start()

export async function drawCardContainer(baseData:Cloth[]){  
    if(cardContainer)cardContainer.innerHTML ="";
    console.log(baseData);
    
for(let item of baseData){
   const i = item.createCard();
    cardContainer?.append(i)
}
cardContainer?.addEventListener("click", (event)=>{  
    event.stopPropagation()  
    let t = event.target as HTMLElement;
    let cl = t.closest(".card") as HTMLElement;
    if(cardContainer.contains(cl)){
        const descr = cl.children[1] as HTMLElement;
        hid = descr.dataset["hid"]||""
        let item = baseData.filter(x=>x.hiddenID===hid);
   
       if(item) {const m =createModalWindow(item[0]);
        console.log(item[0]);        
    document.body.prepend(m)}
    }      
}) }


function createModalWindow(ourCard:Cloth):HTMLElement{

    const bg:HTMLElement = document.createElement("div");
    bg.classList.add("modal-bg");

    const cardModal:HTMLElement = ourCard.createModalCard();
     const closeBtn:HTMLButtonElement = document.createElement("button"); //close btn
     const closeImg:HTMLImageElement = document.createElement("img");
     closeImg.src = "/src/assets/close_black.png"
     closeImg.alt = "Close button"
     closeImg.title = "Close"
     closeBtn.classList.add("closeBtn")
     closeBtn.append(closeImg);
     closeBtn.addEventListener("click", ()=>bg.remove())
     cardModal.append(closeBtn);

     const cartSign:HTMLButtonElement = document.createElement("button");//card btn
     cartSign.classList.add("cart_btn");
     const cartSign_text:HTMLParagraphElement = document.createElement("p")
     cartSign_text.classList.add("cartSign__text", "cart_add");
     const cartSign_image:HTMLImageElement = document.createElement("img")
     cartSign_image.classList.add("cartSign__image");
     
     if(isInCart(ourCard)){
        cartSign_image.src = "/src/assets/carrello_love_black.png"    
        cartSign_text.textContent=`Add to Cart`
     }else{
        cartSign_image.src = "/src/assets/carrello_remove_black.png"   
        cartSign_text.textContent=`Remove from Cart`
     }
     cartSign.append(cartSign_image, cartSign_text)
     cardModal.append(cartSign);

bg.append(cardModal);
return bg;

}

async function createGenderFilter(event:Event){
    console.log(event);       
    let et = event.target as HTMLButtonElement;

if(et.classList.contains("gender_btn")&& !et.classList.contains("btn_pressed")){
console.log(et.textContent);

if(et.textContent?.includes("Woman")) filter.gender = "Woman"
else if(et.textContent?.includes("Man"))filter.gender = "Man"
else delete filter.gender;
collectChoiceBtns.forEach(x=> {if(x.classList.contains("btn_pressed"))x.classList.remove("btn_pressed")})
et.classList.add("btn_pressed")

baseData = await ord.applyFilters(filter)

await drawCardContainer(baseData);
}}

//------to the cart class
function isInCart(item:Cloth):boolean{
    return false;
}
function addToCart(item:Cloth){

}
function removeFromCart(item:Cloth){
    
}
//--------
function menuSlideOut(){
    filters_menu.classList.toggle("opened")
}





