import * as enums from "./enums"





export class Cloth {
    color: enums.dressColors;
    imageURL: string;
    _price: number;
    size: number[];
    popolarity: number;
    gender="";
    constructor(color: enums.dressColors, imageURL: string) {
        this.color = color;
        this.imageURL = imageURL;
        this._price = this.setRandom(2500, 1000);
        this.size = this.setSize([[46, 48], 2]);
        this.popolarity = this.setRandom(4, 2);
    }
    get price(): number {
        return this._price;
    }

    setSize(a: [number[], number]): number[] {
        const s = a[0];
        const q = a[1]
        const arr: number[] = [];
        for (let i = 0; i < q; i++) {
            let n = s[this.setRandom(s.length)];
            if (!arr.includes(n)) arr.push(n);
        }
        return arr.sort((a, b) => a - b);
    }
    private setRandom(range: number, corr: number = 0) {
        return Math.floor(Math.random() * range + corr);
    }

    toString() { return "default cloth" }


    createCard() {
        const card: HTMLElement = document.createElement("div");
        const cardImage: HTMLElement = document.createElement("div");
        const cardImageFoto: HTMLImageElement = document.createElement("img");
        const cardDescription: HTMLParagraphElement = document.createElement("div");
        const cardPopolarity: HTMLElement = this.starsCreator(this.popolarity);

        card.classList.add("card");
        cardImage.classList.add("card__image");
        cardDescription.classList.add("card__description");
        cardPopolarity.classList.add("popolarity");


        cardDescription.textContent = this.toString()
        cardImageFoto.src = this.imageURL;


        cardImage.append(cardImageFoto);
        card.append(cardImage, cardDescription, cardPopolarity);

        return card;
    }

    private starsCreator(stars: number): HTMLElement {
        const cont = document.createElement("div");  
        const validStar: string = '<img src="../src/assets/star_black.png" alt="star">';
        const notStar: string = '<img src="../src/assets/star_gray.png" alt="lack of star">';

      let st =""

        for (let i = 0; i < stars; i++) {
            st+=validStar;
        }
        for (let i = 0; i < 5 - stars; i++) {
            st+=notStar;
        }
        cont.innerHTML = st;
        return cont;
    }
}

export class WomanCloth extends Cloth {
    sleeves: boolean;
    length: enums.dressLength | string;
    gender:string = "Woman"


    constructor(
        color: enums.womanColors | string,
        sleeves: boolean,
        length: enums.dressLength | string,
        imageURL: string
    ) {
        super(color, imageURL);
        this.sleeves = sleeves;
        this.length = length;
        this.size = this.setSize([[38, 40, 42, 44, 46, 48, 50, 52, 54], 3]);
    }

    override toString() {
        let sl: string = this.sleeves ? 'with sleeves' : 'without sleeves';
        let color = this.color[0].toUpperCase() + this.color.slice(1);
        return `${color} ${this.length} woman wedding dress ${sl} \nAvailable sizes: ${this.size},\nprice: ${this.price}$`;
    }
}

export class ManCloth extends Cloth {
    tie: enums.ties | string;
    complexity: enums.dressComplex | number;
    gender:string = "Man"

    constructor(
        color: enums.manColors | string,
        complexity: enums.dressComplex | number,
        tie: enums.ties | string,
        imageURL: string
    ) {
        super(color, imageURL);
        this.size = this.setSize([[42, 44, 46, 48, 50, 52, 54, 56, 58], 3]);
        this.tie = tie;
        this.complexity = complexity;
    }

    override toString() {
        let t: string = this.tie === "tie" ? 'with a classic tie'
            : this.tie === "bow" ? 'with a bow tie'
                : 'without a tie';
        let compl = this.complexity === 2 ? "two pieces" : this.complexity === 3 ? "three pieces" : "one piece"
        let color = this.color[0].toUpperCase() + this.color.slice(1);
        return `${color} ${compl} man wedding dress ${t} \nAvailable sizes: ${this.size},\nprice: ${this.price}$`;
    }
}

