export enum dressLength {
LONG= "long",
MEDIUM = "medium", SHORT = "short"
}
export enum dressComplex{
    TWO_PIECES= "two pieces", THREE_PIECES = "three pieces"
}
export enum ties{
    TIE = "with a classic tie", BOW = "with a bow tie", NOTHING = "without a tie"
}

export enum womanColors{
    WHITE = "white",RED= "red", BLUE="blue", YELLOW="yellow"
}
export enum manColors{
    WHITE = "white",BLACK="black", BLUE="blue", GRAY="gray"
}

export interface ICartable{
    width:number;
    height:number;

    drawCard:() => void
    
}


export class Cloth{
color:womanColors|manColors|string;
imageURL:string
    constructor(
    color:womanColors|manColors|string, 
    imageURL:string,
    ){
        this.color= color;
        this.imageURL = imageURL;
    }

    toString(){
        
    }

}


export class WomanCloth extends Cloth{  
   _price: number;
   _size: number[];
   popolarity: number;  
    sleeves:boolean;
    length:dressLength|string;
  

    constructor(color:womanColors|string, sleeves:boolean, length:dressLength|string, imageURL:string){
        super(color,imageURL)

        this.sleeves= sleeves;
        this.length= length;

        this._price = this.setRandom(1500, 1000);
        this._size = this.setSize();


        this.popolarity = this.setRandom(4,2)

    }
get price(): number {
    return this._price;
}
setSize():number[]{
   const s =  [40, 42, 44, 46, 48, 50, 52];
   const arr:number[] = [];
   for(let i =0; i<5; i++){
      let n = s[this.setRandom(7)];
      if(!arr.includes(n))
          arr.push(n)
     }
     return arr;
    }
    get size():number[]{
         return this._size;
    }

    

    private setRandom(range:number, corr:number=0){
        return Math.floor((Math.random()*range) +corr)
    }

     override toString(){
        let sl:string = this.sleeves?"with sleeves": "without sleeves"
        let color = this.color[0].toUpperCase()+this.color.slice(1)
        return `${color} woman wedding dress ${sl} {available sizes: ${this.size}, ${this.length} length: , price: ${this.price}, popolarity: ${this.popolarity}}`
    }

}



export class shCart{
   private items:Cloth[]= [];

    constructor(){
    }

    setItem(item:Cloth){
        if(this.items.length<20)
        this.items.push(item)

        else console.log("Your shopping cart is full!")
    }
    getItems(){
        if(this.items.length===0) console.log( "There is nothing yet")
        else {
            this.items.forEach((i:Cloth)=>console.log(i.toString()))
        }       
    }
}