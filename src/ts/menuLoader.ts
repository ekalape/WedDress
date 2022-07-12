import {filter} from "./main"
import * as enums from "./enums"
import {applyFilters} from "./ordering"
import {drawCardContainer} from "./main"

export function drawColors(){
    const c_container = document.querySelector(".checks") as HTMLElement;
    c_container.innerHTML="";
if(filter.gender){
    if(filter.gender==="Man"){
        let colors=enums.manColors;
       console.log(colors);
       Object.keys(colors).forEach(x=>{
        const ch = document.createElement("input") as HTMLInputElement;
ch.type = "checkbox";
ch.classList.add("colors__checkbox");
ch.style.backgroundColor = x.toLowerCase();
if(filter.color){
    filter.color.forEach(a=>{
        if(a === x.toLowerCase()) ch.checked = true;
    })
}else{
    ch.checked = true;
}


ch.addEventListener("click", changeColorFilter)
c_container.append(ch)

       })      
       
    }
}
}

async function changeColorFilter(event:Event){
let ch = event.target as HTMLInputElement;
console.log(ch.checked);

let ch_color = ch.style.backgroundColor;
if(!ch.checked)
filter.color = filter.color?.filter(x=>x!==ch_color)
else filter.color?.push(ch_color)

console.log(filter);


let f = await applyFilters(filter)
 drawCardContainer(f)
}