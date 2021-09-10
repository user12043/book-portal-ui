import React, {
  ChangeEvent,
  FC,
  FormEventHandler,
  useEffect,
  useState
} from "react";
import { apiReq } from "utils";
import { Author, Book } from "utils/models";

const BookManagement: FC = () => {
  const [books, setBooks] = useState<Array<Book>>([]);
  const [authors, setAuthors] = useState<Array<Author>>([]);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [searchKeyWord, setSearchKeyWord] = useState<string | null>(null);

  const fetchBooks = () => {
    apiReq("books")
      .then(data => setBooks(data))
      .catch(error => alert(error));
    setEditingBook(null);
  };

  const fetchAuthors = () => {
    apiReq("authors")
      .then(data => setAuthors(data))
      .catch(error => alert(error));
  };

  const search: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    searchKeyWord
      ? apiReq(
          `books/findByName/${encodeURIComponent(searchKeyWord || "")}`
        ).then(setBooks)
      : fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
    fetchAuthors();
  }, []);

  const saveBooks = () => {
    editingBook &&
      apiReq("books", {
        method: "PUT",
        body: editingBook
      })
        .then(() => fetchBooks())
        .catch(error => alert(error));
  };

  const deleteBook = (bookId: number) => {
    apiReq(`books/${bookId}`, {
      method: "DELETE"
    }).finally(() => fetchBooks());
  };

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    const key = name as keyof Book;
    setEditingBook({
      ...editingBook,
      [key]: value
    } as Book);
  };

  return (
    <section>
      <h1>BOOK MANAGEMENT</h1>
      <div className="row mb-3 align-items-center">
        <form className="col col-4" onSubmit={search}>
          <input
            type="text"
            className="form-control"
            placeholder="Search user..."
            onChange={({ currentTarget: { value } }) => setSearchKeyWord(value)}
          />
        </form>
        <button
          className={`col-1 ms-auto btn btn-outline-${
            editingBook ? "danger" : "success"
          } fs-3`}
          onClick={() =>
            editingBook ? setEditingBook(null) : setEditingBook({} as Book)
          }
        >
          <i className={`bi bi-${editingBook ? "x" : "plus"}-square`}></i>
        </button>
      </div>
      <table
        className="table table-dark table-striped table-hover text-center"
        style={{ tableLayout: "fixed" }}
      >
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Author</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          <tr className={`bg-success fs-5 ${editingBook ? "" : "d-none"}`}>
            <td>
              <input
                className="w-100"
                type="text"
                name="name"
                value={editingBook?.name || ""}
                onChange={change}
                autoFocus
              />
            </td>
            <td>
              <select
                name="authorId"
                id="authorId"
                value={editingBook?.author?.authorId}
                onChange={({ currentTarget }) =>
                  setEditingBook({
                    ...editingBook,
                    author: { authorId: +currentTarget.value }
                  })
                }
              >
                <option value="">-</option>
                {authors.map(({ authorId, name }) => (
                  <option key={authorId} value={authorId}>
                    {name}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <div className="d-flex justify-content-around">
                <button
                  className="btn btn-outline-success"
                  onClick={() => saveBooks()}
                >
                  <i className="bi bi-save"></i>
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => setEditingBook(null)}
                >
                  <i className="bi bi-x"></i>
                </button>
              </div>
            </td>
          </tr>
          {books?.map(({ bookId, name, author }, index) => {
            return (
              <tr key={bookId}>
                <td>{name}</td>
                <td>{author?.name}</td>
                <td>
                  <div className="d-flex justify-content-around">
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => setEditingBook(books[index])}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => bookId && deleteBook(bookId)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default BookManagement;
