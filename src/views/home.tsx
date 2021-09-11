import BookCard from "components/book_card";
import React, { FC, FormEventHandler, useEffect, useState } from "react";
import { apiReq } from "utils";
import { Book } from "utils/models";

const Home: FC = () => {
  const [books, setBooks] = useState<Array<Book>>([]);
  const [searchKeyWord, setSearchKeyWord] = useState<string | null>(null);

  const fetchBooks = () => apiReq("books").then(setBooks);

  useEffect(() => {
    fetchBooks();
  }, []);

  const search: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    searchKeyWord
      ? apiReq(
          `books/findByName/${encodeURIComponent(searchKeyWord || "")}`
        ).then(setBooks)
      : fetchBooks();
  };

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
        {books?.map(b => (
          <div key={b.bookId} className="col-md-3">
            <BookCard book={b} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;
