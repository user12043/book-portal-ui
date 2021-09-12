import BookCard from "components/book_card";
import React, { FC, FormEventHandler, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { apiReq, getLoggedUser } from "utils";
import { PATHS } from "utils/constants";
import { Book } from "utils/models";

const Home: FC = () => {
  const [books, setBooks] = useState<Array<Book>>([]);
  const [readList, setReadList] = useState<Array<Book>>([]);
  const [favList, setFavList] = useState<Array<Book>>([]);
  const [searchKeyWord, setSearchKeyWord] = useState<string | null>(null);
  const { pathname } = useLocation();

  const fetchBooks = () => apiReq("books").then(setBooks);

  const fetchReadList = () =>
    apiReq(`books/findReadListOfUser/${getLoggedUser()?.userId}`).then(
      setReadList
    );
  const fetchFavList = () =>
    apiReq(`books/findFavouriteListOfUser/${getLoggedUser()?.userId}`).then(
      setFavList
    );

  useEffect(() => {
    fetchBooks();
    fetchReadList();
    fetchFavList();
  }, []);

  const search: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    searchKeyWord
      ? apiReq(
          `books/findByName/${encodeURIComponent(searchKeyWord || "")}`
        ).then(setBooks)
      : fetchBooks();
  };

  const booksToShow =
    pathname === PATHS.READLIST
      ? readList
      : pathname === PATHS.FAV_LIST
      ? favList
      : books;

  return (
    <section>
      <div className="row mb-4">
        <form className="col-4 mx-auto" onSubmit={search}>
          <input
            type="text"
            className="form-control"
            placeholder="Search book..."
            onChange={({ currentTarget: { value } }) => setSearchKeyWord(value)}
          />
        </form>
      </div>
      <div className="row">
        {booksToShow?.map(b => (
          <div key={b.bookId} className="col-md-3">
            <BookCard
              book={b}
              readList={readList}
              favList={favList}
              onChange={() => {
                fetchReadList();
                fetchFavList();
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;
