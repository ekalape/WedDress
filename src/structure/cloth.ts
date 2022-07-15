
export class Cloth {
    imageURL: string;
    hiddenID: string;
    gender: string;
    color: string;
    sizes: number[];
    popularity: number;
    price: number;
    carted: boolean;

    sleeves?: string;
    len?: string;
    tie?: string;
    compl?: string;

    constructor(hiddenID: string, imageURL: string, gender: string, color: string) {
        this.hiddenID = hiddenID;
        this.imageURL = imageURL;
        this.gender = gender;
        this.color = color;
        this.carted = false;
        this.price = this.setRandom(3500, 1000);
        this.sizes = this.setSize([[38,40,42,44,46, 48,50,52,54,56], 2]);
        this.popularity = this.setRandom(4, 2);

    }
    setTie(tie: string) {
        this.tie = tie;
    }
    setCompl(compl: string) {
        this.compl = compl;
    }
    setLen(len: string) {
        this.len = len;
    }
    setSleeves(sleeves: string) {
        this.sleeves = sleeves;
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
            // if (addProp2.length != 0) result.unshift(addProp2);
        }
        if (this.gender === "Woman") {
            addProp1 = this.len ? this.len[0].toUpperCase() + this.len.slice(1) : ""
            addProp2 = this.sleeves ? this.sleeves.includes("with") ? "with sleeves" : "without sleeves" : ""
            desc = `${addProp2} wedding dress`
            if (addProp1.length != 0) result.unshift(addProp1);
            result.unshift(desc);
            //  if (addProp2.length != 0) result.unshift(addProp2);
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
        return card;
    }
    private createDescription(elem: string) {
        const descr = [];
        for (let i = 0; i < 3; i++) {
            const pp = document.createElement(elem);
            descr.push(pp)
        }
        descr[0].textContent = `${this.toString()[0]} ${this.toString()[1]}`;
        descr[1].textContent = `${this.toString()[2]}`;
        descr[2].textContent = `${this.toString()[3]}`;
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
        console.log(this.toString());
        const liis =[...this.createDescription("li")]
  
       
        const pr = document.createElement("li");
        pr.textContent = this.toString()[4];
        liis.push(pr)

        liis.forEach(x=>x.classList.add("modal_list__item"))
        list.append(...liis)

        cardDescription.append(title, list) //appended inside description
        /* --- create popularity sign --- */
        const modalPopularity = this.starsCreator(this.popularity);
        modalPopularity.classList.add("popolarity", "modal_popularity");
        cardDescription.append(modalPopularity);

        //console.log(`created modal ${this.toString().join(", ")}`);

        return cardModal;
    }
    addToCart(): void {
        this.carted = true;
    }
    removeFromCart(): void {
        this.carted = false;
    }

    private setSize(a: [number[], number]): number[] {
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

