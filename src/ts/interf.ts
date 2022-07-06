import * as enums from "./enums"


export interface ICartable {


    drawCard: () => void;
}

type dressColors = enums.manColors| enums.womanColors|string

export class Cloth {
    color: dressColors;
    imageURL: string;
    _price: number;
    size: number[];
    popolarity: number;
    constructor(color:dressColors, imageURL: string) {
        this.color = color;
        this.imageURL = imageURL;
        this._price = this.setRandom(1500, 1000);
        this.size = this.setSize([[46,48], 2]);
        this.popolarity = this.setRandom(4, 2);
    }
    get price(): number {
        return this._price;
    }
/*  static refColor(c:string, gender:string){
if(gender === "w")
return Object.entries(enums.womanColors).filter(x=>x[1]===c)[0][0]
else return Object.entries(enums.manColors).filter(x=>x[1]===c)[0][0]
}
 */
    setSize(a:[number[],number]): number[] {
        const s = a[0];
        const q = a[1]
        const arr: number[] = [];
        for (let i = 0; i < q; i++) {
            let n = s[this.setRandom(s.length)];
            if (!arr.includes(n)) arr.push(n);
        }
        return arr.sort((a,b)=>a-b);
    }
    private setRandom(range: number, corr: number = 0) {
        return Math.floor(Math.random() * range + corr);
    }

    toString() { }
}

export class WomanCloth extends Cloth {
    sleeves: boolean;
    length: enums.dressLength|string ;


    constructor(
        color: enums.womanColors | string,
        sleeves: boolean,
        length: enums.dressLength|string,
        imageURL: string
    ) {
        super(color, imageURL);
        this.sleeves = sleeves;
        this.length = length;
        this.size =this.setSize([[38,40,42,44,46,48,50,52,54], 5]);
    }

    override toString() {
        let sl: string = this.sleeves ? 'with sleeves' : 'without sleeves';
        let color = this.color[0].toUpperCase() + this.color.slice(1);
        return `${color} ${this.length} woman wedding dress ${sl} \nAvailable sizes: ${this.size},\nprice: ${this.price}$, popolarity: ${this.popolarity}`;
    }
}


export class ManCloth extends Cloth {
    tie: enums.ties|string;
    complexity: enums.dressComplex|number;

    constructor(
        color: enums.manColors | string, 
        complexity:enums.dressComplex|number,
        tie:enums.ties|string,
        imageURL: string
    ) {
        super(color, imageURL);
         this.size =this.setSize([[42,44,46,48,50,52,54, 56, 58], 5]);
         this.tie = tie;
         this.complexity =complexity;
    }

    override toString() {
        let t: string = this.tie === "tie" ? 'with a classic tie' 
        :this.tie ==="bow" ? 'with a bow tie'
        : 'without a tie';
        let compl = this.complexity===2? "two pieces" : this.complexity===3? "three pieces" : "one piece"
        let color = this.color[0].toUpperCase() + this.color.slice(1);
        return `${color} ${compl} man wedding dress ${t} \nAvailable sizes: ${this.size},\nprice: ${this.price}$, popolarity: ${this.popolarity}`;
    }
}

