import * as enums from "./enums"





export class Cloth {
    color: enums.dressColors;
    imageURL: string;
    _price: number;
    size: number[];
    popularity: number;
    gender = "";
    hiddenID: string;
    constructor(color: enums.dressColors, imageURL: string, hiddenID: string) {
        this.color = color;
        this.imageURL = imageURL;
        this._price = this.setRandom(2500, 1000);
        this.size = this.setSize([[46, 48], 2]);
        this.popularity = this.setRandom(4, 2);
        this.hiddenID = hiddenID
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

    toString(): string[] {


        return ["default cloth"]
    }


    createCard() {
        const card: HTMLElement = document.createElement("div");
        const cardImage: HTMLElement = document.createElement("div");
        const cardDescription: HTMLParagraphElement = document.createElement("div");
        const cardPopularity: HTMLElement = this.starsCreator(this.popularity);

        cardDescription.dataset["hid"] = this.hiddenID.toString();


        card.classList.add("card");
        cardImage.classList.add("card__image");
        cardDescription.classList.add("card__description");
        cardPopularity.classList.add("popolarity");


        cardImage.style.backgroundImage = `url(${this.imageURL})`;

        this.toString().forEach((x, i) => {
            if(i<3){
                const litem: HTMLElement = document.createElement("p"); // add CSS formatting

                litem.textContent = x;
                cardDescription.append(litem)
            }
          
        })

        card.append(cardImage, cardDescription, cardPopularity);

        return card;
    }

    private starsCreator(stars: number): HTMLElement {
        const cont = document.createElement("div");
        cont.title = `Popularity rating: ${stars} stars`
        const validStar: string = '<img src="../src/assets/star_black.png" alt="star" class="valStar">';
        const notStar: string = '<img src="../src/assets/star_gray.png" alt="lack of star">';

        let st = ""

        for (let i = 0; i < stars; i++) {
            st += validStar;
        }
        for (let i = 0; i < 5 - stars; i++) {
            st += notStar;
        }
        cont.innerHTML = st;
        return cont;
    }

    createModalCard():HTMLElement {
        const cardModal: HTMLElement = document.createElement("div");
        cardModal.classList.add("card_modal"); //card

        const cardImage: HTMLElement = document.createElement("div"); //image
        cardImage.classList.add("card__image_modal")
        cardImage.style.backgroundImage = `url(${this.imageURL})`;

        const cardDescription:HTMLElement = document.createElement("div"); //description
        cardDescription.classList.add("card__descr_modal")

        cardModal.append(cardImage, cardDescription); // appended img and text
/* --- inside descriprion--- */
        const title: HTMLHeadingElement = document.createElement("h4"); //title
        title.classList.add("descr_modal__title")
        title.textContent = `${this.gender} wedding dress`

        const list: HTMLElement = document.createElement("ul"); //properties container
        list.classList.add("descr_modal__list")
//created props
        const descrPr = Object.keys(this).filter(x => !["_price", "gender", "hiddenID", "imageURL", "popolarity"].includes(x)).sort((a, b) => this.comparator(a, b));
        console.log(descrPr);

        this.toString().forEach(x => {
            const litem: HTMLElement = document.createElement("li"); //every prop : to string, color, price
            litem.classList.add("modal_list__item");
            litem.textContent = x;
            list.append(litem)
        })

        cardDescription.append(title, list) //appended inside description
/* --- create popularity sign --- */
const modalPopularity = this.starsCreator(this.popularity);
modalPopularity.classList.add("popolarity", "modal_popularity");
cardDescription.append(modalPopularity);

     //console.log(`created modal ${this.toString().join(", ")}`);
        
        return cardModal;
    }



    private comparator(a: string, b: string) {
        if (b === "color") return 1
        if (b === "size") return -1
        if (a === "complexity" && b === "tie") return -1
        if (a === "length" && b === "sleeves") return -1

        else return 0
    }
}

export class WomanCloth extends Cloth {
    sleeves: boolean;
    length: enums.dressLength | string;
    gender: string = "Woman"


    constructor(
        color: enums.womanColors | string,
        sleeves: boolean,
        length: enums.dressLength | string,
        imageURL: string,
        hiddenID: string
    ) {
        super(color, imageURL, hiddenID);
        this.sleeves = sleeves;
        this.length = length;
        this.size = this.setSize([[38, 40, 42, 44, 46, 48, 50, 52, 54], 3]);
    }

    override toString(): string[] {
        let sl: string = this.propertyToString("sleeves")
        let color = this.color[0].toUpperCase() + this.color.slice(1);
        return [`${this.length[0].toUpperCase() + this.length.slice(1)} dress ${sl}`,"", `Color: ${color}`, `${this.propertyToString("size")}`, `Price: ${this.price}$`]



    }
    propertyToString(prop: string) {
        let result = "";
        if (prop === "sleeves") {
            this.sleeves ? result = "with sleeves" : result = "without sleeves"
        }
        if (prop === "length") {
            result = `${this.length[0].toUpperCase() + this.length.slice(1)} length`
        }
        if (prop === "size") {
            result = `Available sizes: ${this.size.join(", ")}`
        }
        if (prop === "color") {
            result = `Color: ${this.color}`
        }
        return result;
    }
}

export class ManCloth extends Cloth {
    tie: enums.ties | string;
    complexity: enums.dressComplex | number;
    gender: string = "Man"

    constructor(
        color: enums.manColors | string,
        complexity: enums.dressComplex | number,
        tie: enums.ties | string,
        imageURL: string,
        hiddenID: string
    ) {
        super(color, imageURL, hiddenID);
        this.size = this.setSize([[42, 44, 46, 48, 50, 52, 54, 56, 58], 3]);
        this.tie = tie;
        this.complexity = complexity;
    }

    override toString(): string[] {
        let t: string = this.propertyToString("tie")
        let color = this.color[0].toUpperCase() + this.color.slice(1);
        return [`${this.propertyToString("complexity")}`,`${t}`, `Color: ${color}`, `${this.propertyToString("size")}`, `Price: ${this.price}$`]
    }

    propertyToString(prop: string) {
        let result = "";
        if (prop === "complexity") {
            this.complexity === 2 ? result = "Two pieces suit" : this.complexity === 3 ? result = "Three pieces suit" : result = "One piece suit"
        }
        if (prop === "tie") {
            this.tie === enums.ties.BOW ? result = 'with a bow tie' : this.tie === enums.ties.TIE ? result = 'with a classic tie' : result = 'without a tie'
        }
        if (prop === "size") {
            result = `Available sizes: ${this.size.join(", ")}`
        }
        if (prop === "color") {
            result = `Color: ${this.color}`
        }


        return result;
    }

}

