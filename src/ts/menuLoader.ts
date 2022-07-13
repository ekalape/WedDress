import { filter } from "./main"
import * as enums from "./enums"
import { applyFilters } from "./ordering"
import { drawCardContainer } from "./main"

export function drawColors() {
    const c_container = document.querySelector(".checks") as HTMLElement;
    c_container.innerHTML = "";
    let colors ;

    if (filter.gender) {
        if (filter.gender === "Man") {

            colors = Object.keys(enums.manColors);

        }
        else {
            colors = Object.keys(enums.womanColors);
        }
    }else colors= [...new Set([...Object.keys(enums.manColors), ...Object.keys(enums.womanColors)])]

    console.log(colors);
    colors.forEach(x => {
        const ch = document.createElement("input") as HTMLInputElement;
        ch.type = "checkbox";
        ch.classList.add("colors__checkbox");
        ch.style.backgroundColor = x.toLowerCase();
        if (filter.color) {
            filter.color.forEach(a => {
                if (a === x.toLowerCase()) ch.checked = true;
            })
        } else {
            ch.checked = true;
        }

        ch.addEventListener("click", changeColorFilter)
        c_container.append(ch)

    })


}

async function changeColorFilter(event: Event) {
    let ch = event.target as HTMLInputElement;
    console.log(ch);
    

    let ch_color = ch.style.backgroundColor;
    console.log(ch_color);
    console.log(ch.checked);
    
    if (!ch.checked)
 
   {console.log(ch_color, ch.checked);
   
        filter.color = filter.color?.filter(x => x !== ch_color)}
  
    else {
        if(!filter.color)filter.color =[ch_color]
        else filter.color.push(ch_color)}

    let f = await applyFilters(filter)
    console.log(filter.color);
    
    drawCardContainer(f)
}

export function drawAdditionals() {
    const a_container = document.querySelector(".filters_menu__additional") as HTMLElement;
    if (a_container) a_container.innerHTML = "";
    if (filter.gender === "Woman") {
        const sleeves = document.createElement("select") as HTMLSelectElement;
        const len = document.createElement("select") as HTMLSelectElement;
        [sleeves, len].forEach(x => {
            x.classList.add("additionals")

            if (x === sleeves) {
                x.value = "sleeves"
                let options = ["Show all", "With sleeves", "Without sleeves"]
                for (let i of options) {
                    const opt = document.createElement("option");
                    opt.classList.add("additional__option")
                    opt.value = i + " sl";
                    opt.text = i;
                    x.append(opt)
                }
            }
            else {
                x.value = "len"
                let options = ["Show all", "Long length", "Medium length", "Short length"]
                for (let i of options) {
                    const opt = document.createElement("option");
                    opt.classList.add("additional__option")
                    opt.value = i + " len";
                    opt.text = i;
                    x.append(opt)
                }
            }
            x.addEventListener("change", createAdditionalFilter)
            a_container.append(x)
        })

    }
    if (filter.gender === "Man") {
        const tie = document.createElement("select") as HTMLSelectElement;
        const pieces = document.createElement("select") as HTMLSelectElement;

        [tie, pieces].forEach(x => {
            x.classList.add("additionals")
            if (x === tie) {
                x.value = "tie"
                let options = ["Show all", "With a classic tie", "With a bow tie", "Without a tie"]
                for (let i of options) {
                    const opt = document.createElement("option");
                    opt.classList.add("additional__option")
                    opt.value = i + " tie";
                    opt.text = i;
                    x.append(opt)
                }
            }
            else {
                x.value = "pieces"
                let options = ["Show all", "Two pieces suit", "Three pieces suit"]
                for (let i of options) {
                    const opt = document.createElement("option");
                    opt.classList.add("additional__option")
                    opt.value = i + " pieces";
                    opt.text = i;
                    x.append(opt)
                }
            }
            x.addEventListener("change", createAdditionalFilter)
            a_container.append(x)
        })
    }

}



async function createAdditionalFilter(event: Event) {
    let t = event.target as HTMLSelectElement
    console.log(t.value)

    let val = t.value.toLowerCase();

    if(filter.gender === "Man"){

        delete filter.len;
        delete filter.sleeves;

       if(val.includes("tie")) {delete filter.tie}
       if(val.includes("pieces")){delete filter.complexity}

       if (val.includes("two")) filter.complexity = 2;
       if (val.includes("three")) filter.complexity = 3;
       if (val.includes("classic")) filter.tie = "tie";
       if (val.includes("bow")) filter.tie = "bow";
       if (val.includes("without a tie")) filter.tie = "none";


    }
if(filter.gender=== "Woman"){
delete filter.tie;
delete filter.complexity;

    if (val.includes("sl")) {
        delete filter.sleeves;
    } 
    if(val.includes("len")) {
        delete filter.len;
    } 

    if (val.includes("with")) filter.sleeves = true;
    if (val.includes("without sleeves")) filter.sleeves = false;
    if (val.includes("long")) filter.len = ["long"];
    if (val.includes("medium")) filter.len = ["medium"];
    if (val.includes("short")) filter.len = ["short"];
}

    console.log(filter);

    drawCardContainer(await applyFilters(filter));
}