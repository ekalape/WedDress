export enum dressLength {
LONG, MEDIUM, SHORT
}
export enum dressComplex{
    TWO_PIECES, THREE_PIECES
}
export enum ties{
    TIE, BOW, NOTHING
}

export enum womanColors{
    "WHITE","RED", "BLUE", "YELLOW"
}
export enum manColors{
    "WHITE","BLACK", "BLUE", "GRAY"
}

export interface ICartable{
    width:number;
    height:number;

    drawCard:() => void
    
}


export class Cloth{
color:womanColors|manColors;
imageURL:string
    constructor(
    color:womanColors|manColors, 
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
    length:dressLength;
  

    constructor(color:womanColors, sleeves:boolean, length:dressLength, imageURL:string){
        super(color,imageURL)

        this.sleeves= sleeves;
        this.length= length;

        this._price = this.setRandom(1500, 1000);
        this._size = this.setSize();


        this.popolarity = this.setRandom(3,2)

    }
get price(): number {
    return this._price;
}
setSize():number[]{
   const s =  [38,40, 42, 44, 46, 48, 50, 52,54];
   const arr:number[] = [];
   for(let i =0; i<6; i++){
      let n = s[this.setRandom(9)];
      if(!arr.includes(n))
          arr.push(n)
     }
     return arr;
    }
    get size():number[]{
         return this._size;
    }

    

    private setRandom(range:number, corr:number=0){
        return Math.floor(Math.random()*range +corr)
    }

     override toString(){
        let sl:string = this.sleeves?"with sleeves": "without sleeves"
        return `${this.color} women dress ${sl} {sizes: ${this.size}, length: ${this.length}, price: ${this.price}, popolarity: ${this.popolarity}}`
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