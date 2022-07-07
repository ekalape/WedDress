import * as enums from "./enums";
import * as ord from"./ordering";
import "../style.scss";

const filter:ord.filter ={
    orderedBy: enums.ordering.SHAFFLE,
    color:"white",
  
    minPop:3


}
const result = ord.applyFilters(filter)
//console.log(result);









