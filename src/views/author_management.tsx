import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { apiReq } from "utils";
import { Author } from "utils/models";

const AuthorManagement: FC = () => {
  const [authors, setAuthors] = useState<Array<Author>>([]);
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);

  const fetchAuthors = () => {
    apiReq("authors")
      .then(data => setAuthors(data))
      .catch(error => alert(error));
    setEditingAuthor(null);
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const saveAuthors = () => {
    editingAuthor &&
      apiReq("authors", {
        method: "PUT",
        body: editingAuthor
      })
        .then(() => fetchAuthors())
        .catch(error => alert(error));
  };

  const deleteAuthor = (authorId: number) => {
    apiReq(`authors/${authorId}`, {
      method: "DELETE"
    }).finally(() => fetchAuthors());
  };

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    const key = name as keyof Author;
    setEditingAuthor({
      ...editingAuthor,
      [key]: value
    } as Author);
  };

  return (
    <section>
      <div className="row mb-3">
        <h1 className="col col-11">BOOK MANAGEMENT</h1>
        <button
          className={`col ms-auto btn btn-outline-${
            editingAuthor ? "danger" : "success"
          } fs-3`}
          onClick={() =>
            editingAuthor
              ? setEditingAuthor(null)
              : setEditingAuthor({} as Author)
          }
        >
          <i className={`bi bi-${editingAuthor ? "x" : "plus"}-square`}></i>
        </button>
      </div>
      <table
        className="table table-dark table-striped table-hover text-center"
        style={{ tableLayout: "fixed" }}
      >
        <thead>
          <tr>
            <th>Author Name</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          <tr className={`bg-success fs-5 ${editingAuthor ? "" : "d-none"}`}>
            <td>
              <input
                className="w-100"
                type="text"
                name="name"
                value={editingAuthor?.name || ""}
                onChange={change}
                autoFocus
              />
            </td>
            <td>
              <div className="d-flex justify-content-around">
                <button
                  className="btn btn-outline-success"
                  onClick={() => saveAuthors()}
                >
                  <i className="bi bi-save"></i>
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => setEditingAuthor(null)}
                >
                  <i className="bi bi-x"></i>
                </button>
              </div>
            </td>
          </tr>
          {authors?.map(({ authorId, name }, index) => {
            return (
              <tr key={authorId}>
                <td>{name}</td>
                <td>
                  <div className="d-flex justify-content-around">
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => setEditingAuthor(authors[index])}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => authorId && deleteAuthor(authorId)}
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

export default AuthorManagement;
