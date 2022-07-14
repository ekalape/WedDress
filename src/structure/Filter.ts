export enum ORDER{
    "SHAFFLE", "PRICE_UP","PRICE_DOWN", "POPULARITY_UP", "POPULARITY_DOWN"
}
export class Filter {
    orderedBy: ORDER;
    minSize: number;
    maxSize: number;
    colors: string[];
    len?: string;
    sleeves?: string;
    tie?: string;
    complexity?: number;
    minPrice: number;
    maxPrice: number;
    minPop: number;
    maxPop: number;
    gender: string[];
    constructor(orderedBy: ORDER = ORDER.SHAFFLE, gender:string[] = ["Man", "Woman"],
        minSize: number = 0, maxSize: number = 100, 
        colors: string[] = [],
        len?: string , sleeves?: string , tie?: string, complexity?: number ,
        minPrice: number = 0, maxPrice: number = 100000, minPop: number = 0, maxPop: number = 6
    ) {
        this.orderedBy = orderedBy;
  
        this.minSize = minSize;
        this.maxSize = maxSize;
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
        this.minPop = minPop;
        this.maxPop = maxPop;
        this.tie = tie;
        this.sleeves = sleeves;
        this.len = len;
        this.complexity = complexity;
        this.gender = gender;
        if(colors.length===0){
            if(this.gender.length===1 && this.gender.includes("Man"))
            {
                this.colors = ["white", "black", "gray", "blue"]
            }
            if(this.gender.length===1 && this.gender.includes("Woman")){
                this.colors = ["white", "red", "yellow", "blue"]
            }
            else this.colors = ["white", "black", "gray", "blue","red", "yellow"]            
        }else this.colors = colors;
    }}
