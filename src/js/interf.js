"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WomanCloth = exports.womanColors = exports.ties = exports.dressComplex = exports.dressLength = void 0;
var dressLength;
(function (dressLength) {
    dressLength[dressLength["LONG"] = 0] = "LONG";
    dressLength[dressLength["MEDIUM"] = 1] = "MEDIUM";
    dressLength[dressLength["SHORT"] = 2] = "SHORT";
})(dressLength = exports.dressLength || (exports.dressLength = {}));
var dressComplex;
(function (dressComplex) {
    dressComplex[dressComplex["TWO_PIECES"] = 0] = "TWO_PIECES";
    dressComplex[dressComplex["THREE_PIECES"] = 1] = "THREE_PIECES";
})(dressComplex = exports.dressComplex || (exports.dressComplex = {}));
var ties;
(function (ties) {
    ties[ties["TIE"] = 0] = "TIE";
    ties[ties["BOW"] = 1] = "BOW";
    ties[ties["NOTHING"] = 2] = "NOTHING";
})(ties = exports.ties || (exports.ties = {}));
var womanColors;
(function (womanColors) {
    womanColors[womanColors["WHITE"] = 0] = "WHITE";
    womanColors[womanColors["RED"] = 1] = "RED";
    womanColors[womanColors["BLUE"] = 2] = "BLUE";
    womanColors[womanColors["YELLOW"] = 3] = "YELLOW";
})(womanColors = exports.womanColors || (exports.womanColors = {}));
class WomanCloth {
    constructor(color, sleeves, length, imageURL) {
        this.color = color;
        this.imageURL = imageURL;
        this.sleeves = sleeves;
        this.length = length;
        this._price = this.setRandom(1500, 1000);
        this._size = this.setSize();
        this.popolarity = this.setRandom(3, 2);
    }
    get price() {
        return this._price;
    }
    setSize() {
        const s = [38, 40, 42, 44, 46, 48, 50, 52, 54];
        const arr = [];
        for (let i = 0; i < 6; i++) {
            let n = s[this.setRandom(9)];
            if (!arr.includes(n))
                arr.push(n);
        }
        return arr;
    }
    get size() {
        return this._size;
    }
    setRandom(range, corr = 0) {
        return Math.floor(Math.random() * range + corr);
    }
    toString() {
        let sl = this.sleeves ? "with sleeves" : "without sleeves";
        return `${this.color} women dress ${sl} {sizes: ${this.size}, length: ${this.length}, price: ${this.price}, popolarity: ${this.popolarity}}`;
    }
}
exports.WomanCloth = WomanCloth;
/* abstract class Cloth{
   color:string ;
   size:number|string = 44;
   price:number;
   imageURL:string =""
   popolarity:number;

   constructor(color:string){
       this.price = Math.floor(Math.random()*1000 +1000)
       this.popolarity = Math.floor(Math.random()*3 +2)
   }

}

class womenCloth extends Cloth{
   color:string;
   size:number|string;
   price:number;
   length:dressLength;
   sleeves:boolean;
   imageURL:string;
   constructor(color:string, length:dressLength, sleeves:boolean, image:string){
       super()
       this.color = color;
       this.length = length;
       this.sleeves = sleeves;
       this.imageURL = image;
// [40, 42, 44, 46, 48, 50, 52]
       this.size = [40, 42, 44, 46, 48, 50, 52][Math.floor(Math.random()*7)]

   }

   override toString(){
       let sl:string = this.sleeves?"with sleeves": "without sleeves"
       return `${this.color} women dress ${sl} {size: ${this.size}, length: ${this.length}, collection of ${this.year}}`
   }
}
*/ 
