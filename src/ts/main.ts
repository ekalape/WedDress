import * as enums from "./enums";
import * as ord from"./ordering";
import {db} from "./loader"
import "../style.scss";
import { Cloth } from './clothBase';


const filter:ord.filter ={
    orderedBy: enums.ordering.SHAFFLE,
   

}

const cardContainer = document.querySelector(".card-container")
let baseData:Cloth[];
let hid:string;

//console.log(result);


async function start(){
 
    baseData = await ord.applyFilters(filter)

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
        console.log(item[0]);
        console.log(Object.keys(item[0]));
        item[0].createModalCard()
       // Object.keys(item[0])
        
       if(item) {const m =createModalWindow(item[0]);
    document.body.prepend(m)}
    }
    
    
})      
    
}
start()

function createModalWindow(ourCard:Cloth):HTMLElement{

    const bg = document.createElement("div");
    bg.classList.add("modal-bg");

    const cardModal = ourCard.createModalCard();
     const closeBtn = document.createElement("button");
     const closeImg = document.createElement("img");
     closeImg.src = "assets/close_black.png"
     closeImg.alt = "Close button"
     closeImg.title = "Close"
     closeBtn.classList.add("closeBtn")
     closeBtn.append(closeImg);
     closeBtn.addEventListener("click", ()=>bg.remove())
     cardModal.append(closeBtn);
bg.append(cardModal);


return bg;

}








