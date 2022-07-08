export enum dressLength {
    LONG = 'long',
    MEDIUM = 'medium',
    SHORT = 'short',
}
export enum dressComplex {
    TWO_PIECES = 2,
    THREE_PIECES = 3,
}
export enum ties {
    TIE = 'tie',
    BOW = 'bow',
    NOTHING = 'none',
}

export enum womanColors {
    WHITE = 'white',
    RED = 'red',
    BLUE = 'blue',
    YELLOW = 'yellow',
}
export enum manColors {
    WHITE = 'white',
    BLACK = 'black',
    BLUE = 'blue',
    GRAY = 'gray',
}
export type dressColors = manColors | womanColors | string


export enum ordering{
    "SHAFFLE", "PRICE_UP","PRICE_DOWN", "POPULARITY_UP", "POPULARITY_DOWN"
}
