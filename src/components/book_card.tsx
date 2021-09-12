import React, { FC } from "react";
import { Book } from "utils/models";
import bookIcon from "img/book.svg";
import { apiReq, getLoggedUser } from "utils";

const BookCard: FC<{
  book: Book;
  readList: Array<Book>;
  favList: Array<Book>;
  onChange: Function;
}> = ({ book, readList, favList, onChange }) => {
  const user = getLoggedUser();
  const inReadList = readList?.find(b => b.bookId === book.bookId);
  const inFavList = favList?.find(b => b.bookId === book.bookId);

  const toggleReadList = () =>
    apiReq(
      `users/toggleReadList?userId=${user?.userId}&bookId=${book.bookId}`
    ).then(() => onChange());

  const toggleFavList = () =>
    apiReq(
      `users/toggleFavouriteList?userId=${user?.userId}&bookId=${book.bookId}`
    ).then(() => onChange());

  return (
    <div className="card bg-dark text-center pt-2 rounded" key={book.bookId}>
      <img src={bookIcon} className="card-img-top" alt="book"></img>
      <div className="card-body bg-secondary d-flex justify-content-between">
        <h5 className="card-title">{book.name}</h5>
        {/* <p className="card-text">HO</p> */}
        <div>
          <i
            className={`bi bi-bookmark${inReadList ? "-fill" : ""} me-2`}
            onClick={toggleReadList}
          ></i>
          <i
            className={`bi bi-star${inFavList ? "-fill" : ""}`}
            onClick={toggleFavList}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
