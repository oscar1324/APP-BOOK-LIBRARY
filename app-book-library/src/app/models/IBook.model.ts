
export class Ibook {
    id: Number;
    title: string;
    author: string;
    year: number;
    genre: string;
    price: number;

    constructor(data:any) {
        this.id = data.id;
        this.title = data.title;
        this.author = data.author;
        this.year = data.year;
        this.genre = data.genre;
        this.price = data.price;
    }


}