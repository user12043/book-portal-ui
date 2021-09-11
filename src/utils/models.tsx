export interface User {
  userId?: number;
  username?: string;
  password?: string;
  name?: string;
  email?: string;
  role: string;
  readList: Array<Book>;
  favouriteList: Array<Book>;
}

export interface Author {
  authorId?: number;
  name?: string;
}

export interface Book {
  bookId?: number;
  name?: string;
  author?: Author;
}
