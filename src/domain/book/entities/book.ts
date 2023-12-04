import { randomUUID } from "crypto";

export type BookProps  = {
  id?: string;
  name: string;
  genre: string;
  author: string;
}

export type BookPropsUpdate = {
  name?: string;
  genre?: string;
  author?: string;
}

export class Book {
  public id: string;
  public name: string;
  public genre: string;
  public author: string;

  constructor(props: BookProps){
    this.id = props.id || randomUUID()
    this.name = props.name;
    this.genre= props.genre;
    this.author = props.author;
  }

  update(props: Partial<BookPropsUpdate>){
    const book = new Book({ ...this, ...props})
    return book;
  }
}
