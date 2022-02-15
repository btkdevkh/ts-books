import { IBook } from "../models/Book";

const books: IBook[] = [
  {
    id: 1,
    title: 'Eloquent JavaScript, 1rd',
    author: 'Marijn Haverbeke',
    pages: 472
  },
  {
    id: 2,
    title: 'Eloquent JavaScript, 3rd',
    author: 'Marijn Haverbeke',
    pages: 372
  },
  {
    id: 3,
    title: 'JavaScript pour les web designers',
    author: 'Mat Marquis',
    pages: 300
  }
]

export const bookDatas = new Promise((resolve, reject) => setTimeout(() => resolve(books), 100))
