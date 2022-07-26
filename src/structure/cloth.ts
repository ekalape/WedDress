import { create } from 'nouislider';
import { cartProducts } from "./main";

export class Cloth {
    imageURL: string;
    hiddenID: string;
    gender: string;
    color: string;
    sizes: number[];
    popularity: number;
    price: number;
    carted: boolean;
    searchWords: string[];

    sleeves?: string;
    len?: string;
    tie?: string;
    compl?: string;

    constructor(hiddenID: string, imageURL: string, gender: string, color: string, price:number, sizes:number[], popularity:number) {
        this.hiddenID = hiddenID;
        this.imageURL = imageURL;
        this.gender = gender;
        this.color = color;
        this.carted = false;
        this.price = price;
        this.sizes = sizes;
        this.popularity = popularity;
        this.searchWords = this.initSearchWords();

    }
    setTie(tie: string) {
        this.tie = tie;
        this.searchWords.push("tie");
        this.searchWords.push(this.tie);
    }
    setCompl(compl: string) {
        this.compl = compl;
        this.searchWords.push("complexity");
        this.searchWords.push(this.compl);
    }
    setLen(len: string) {
        this.len = len;
        this.searchWords.push(this.len);

    }
    setSleeves(sleeves: string) {
        this.sleeves = sleeves;
        this.searchWords.push("sleeves");
        this.searchWords.push(this.sleeves);
    }
    addSearchWords(word: string) {
        this.searchWords.push(word)
    }
    private initSearchWords(): string[] {
        const arr: string[] = [];
        if (this.gender === "Man") {
            arr.push("suit");
            arr.push("pieces");

            arr.push("waist");
            arr.push("blazer");
            arr.push("pants");
            if (this.compl === "three")
                arr.push("waistcoat");
            arr.push("vest");
        }
        if (this.gender === "Woman") {
            arr.push("dress");
            arr.push("skirt");
            arr.push("bodice");
            arr.push("lace");
            arr.push("length");
        }

        let ent = Object.entries(this).filter(x => !["imageURL", "carted", "hiddenID", "searchWords"].includes(x[0])).flat(2).map(x => String(x))


        return arr.concat(ent);
    }


    toString(): string[] {

        let addProp1 = "";
        let addProp2 = "";
        let desc = ""
        let result = [`Color: ${this.color}`, `Available sizes: ${this.sizes}`, `Price: ${this.price}$`]

        if (this.gender === "Man") {
            addProp1 = this.tie ? this.tie === "bow" ? "with a bow tie" : this.tie === "classic" ? "with a classic tie" : "without a tie" : "";
            addProp2 = this.compl ? this.compl === "two" ? "Two pieces" : "Three pieces" : "";
            desc = `${addProp2} wedding suit`
            if (addProp1.length != 0) result.unshift(addProp1);
            result.unshift(desc);        
        }
        if (this.gender === "Woman") {
            addProp1 = this.len ? this.len[0].toUpperCase() + this.len.slice(1) : ""//0
            addProp2 = this.sleeves ? this.sleeves.includes("with") ? "with sleeves" : "without sleeves" : ""//2
            desc = `wedding dress`//1
            if (addProp2.length != 0) result.unshift(addProp2);
            result.unshift(desc);
            if (addProp1.length != 0) result.unshift(addProp1);


        }
        return result;
    }
    createCard(): HTMLElement {
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
        cardDescription.append(...this.createDescription("p"))

        card.append(cardImage, cardDescription, cardPopularity);
        cartProducts.forEach(x => {
            if (x.hiddenID === this.hiddenID) {
                this.carted = true;
            }
        })
        const infoSign = this.addCartInfoSign()
        if (infoSign) card.append(infoSign)

        return card;
    }

    addCartInfoSign(): HTMLElement {

        const inthecard_sign = document.createElement("div") as HTMLElement;
        inthecard_sign.classList.add("inthecard_sign","inthecard_invisible");
        inthecard_sign.textContent = "-Is in your cart-"
        inthecard_sign.dataset.hid = this.hiddenID;
       
        if (this.carted) {
           // inthecard_sign.textContent = "-Is in your cart-";         
            inthecard_sign.classList.remove("inthecard_invisible")
           
        }
        return inthecard_sign

    }


    private createDescription(elem: string) {
        const descr = [];
        for (let i = 0; i < 3; i++) {
            const pp = document.createElement(elem);
            descr.push(pp)
        }
        if (this.gender === "Man") {
            descr[0].textContent = `${this.toString()[0]} ${this.toString()[1]}`;
            descr[1].textContent = `${this.toString()[2]}`;
            descr[2].textContent = `${this.toString()[3]}`;
        }
        else {
            descr[0].textContent = `${this.toString()[0]} ${this.toString()[1]} 
            ${this.toString()[2]}`
            descr[1].textContent = `${this.toString()[3]}`;
            descr[2].textContent = `${this.toString()[4]}`;
        }

        return descr;
    }

    createModalWindow(): HTMLElement {
        const cardModal: HTMLElement = document.createElement("div");
        cardModal.classList.add("card_modal"); //card

        const cardImage: HTMLElement = document.createElement("div"); //image
        cardImage.classList.add("card__image_modal")
        cardImage.style.backgroundImage = `url(${this.imageURL})`;

        const cardDescription: HTMLElement = document.createElement("div"); //description
        cardDescription.classList.add("card__descr_modal")

        cardModal.append(cardImage, cardDescription); // appended img and text
        /* --- inside descriprion--- */
        const title: HTMLHeadingElement = document.createElement("h4"); //title
        title.classList.add("descr_modal__title")
        title.textContent = `${this.gender} wedding dress`

        const list: HTMLElement = document.createElement("ul"); //properties container
        list.classList.add("descr_modal__list")
        //created props     
        const liis = [...this.createDescription("li")]

        const pr = document.createElement("li");
        if (this.gender === "Woman") {
            pr.textContent = this.toString()[5];
        } else {
            pr.textContent = this.toString()[4];
        }

        liis.push(pr)

        liis.forEach(x => x.classList.add("modal_list__item"))
        list.append(...liis)

        cardDescription.append(title, list) //appended inside description
        /* --- create popularity sign --- */
        const modalPopularity = this.starsCreator(this.popularity);
        modalPopularity.classList.add("popolarity", "modal_popularity");
        cardDescription.append(modalPopularity);

        return cardModal;
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

}

