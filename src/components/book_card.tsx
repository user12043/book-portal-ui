import React, { FC } from "react";
import { Book } from "utils/models";
import bookIcon from "img/book.svg";

const BookCard: FC<{ book: Book }> = ({ book }) => {
  return (
    <div className="card bg-dark text-center pt-2 rounded" key={book.bookId}>
      <img src={bookIcon} className="card-img-top" alt="book"></img>
      <div className="card-body bg-secondary">
        <h5 className="card-title">{book.name}</h5>
        {/* <p className="card-text">HO</p> */}
      </div>
    </div>
  );
};

export default BookCard;
