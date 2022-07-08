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
        
        
        if(item) createModalWindow(item[0])
    }
    
    
})      
    
}
start()

function createModalWindow(ourCard:Cloth){

    const bg = document.createElement("div");
    bg.classList.add("modal-bg");

    const cardModal = document.createElement("div");
    cardModal.classList.add("card_modal");

    const cardImage: HTMLElement = document.createElement("div"); 
    cardImage.classList.add("card__image_modal")




}








