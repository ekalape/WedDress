import * as enums from "./enums";
import * as ord from"./ordering";

import "../style.scss";
import { Cloth } from './clothBase';


const filter:ord.filter ={
    orderedBy: enums.ordering.SHAFFLE,
   

}

const cardContainer = document.querySelector(".card-container")
let baseData:Cloth[];
let hid:string;


async function start(){
 
    baseData = await ord.applyFilters(filter)

console.log("appena started and returned applFilters");

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
        console.log(item[0]);

       // item[0].createModalCard()
       // Object.keys(item[0])
        
       if(item) {const m =createModalWindow(item[0]);
        console.log(item[0]);
        
    document.body.prepend(m)}
    }
    
    
})      
    
}
start()

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

function isInCart(item:Cloth):boolean{
    return false;
}
function addToCart(item:Cloth){

}
function removeFromCart(item:Cloth){
    
}





