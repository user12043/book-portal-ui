import React, {
  ChangeEvent,
  FC,
  FormEventHandler,
  useEffect,
  useState
} from "react";
import { apiReq } from "utils";
import { User } from "utils/models";

const UserManagement: FC = () => {
  const [users, setUsers] = useState<Array<User>>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchKeyWord, setSearchKeyWord] = useState<string | null>(null);

  const fetchUsers = () => {
    apiReq("users")
      .then(data => setUsers(data))
      .catch(error => alert(error));
    setEditingUser(null);
  };

  const search: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    searchKeyWord
      ? apiReq(
          `users/findByName/${encodeURIComponent(searchKeyWord || "")}`
        ).then(setUsers)
      : fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const saveUser = () => {
    editingUser &&
      apiReq("users", {
        method: "PUT",
        body: editingUser
      })
        .then(() => fetchUsers())
        .catch(error => alert(error));
  };

  const deleteUser = (userId: number) => {
    apiReq(`users/${userId}`, {
      method: "DELETE"
    }).finally(() => fetchUsers());
  };

  const change = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.currentTarget;
    // @ts-ignore
    const checked = e.currentTarget["checked"] || "";
    const key = name as keyof User;
    const isCheckbox = type === "checkbox";
    setEditingUser({
      ...editingUser,
      [key]: !isCheckbox ? value : checked
    } as User);
  };

  return (
    <section>
      <h1>USER MANAGEMENT</h1>
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
            editingUser ? "danger" : "success"
          } fs-3`}
          onClick={() =>
            editingUser ? setEditingUser(null) : setEditingUser({} as User)
          }
        >
          <i className={`bi bi-${editingUser ? "x" : "plus"}-square`}></i>
        </button>
      </div>
      <table
        className="table table-dark table-striped table-hover text-center"
        style={{ tableLayout: "fixed" }}
      >
        <thead>
          <tr>
            <th>Username</th>
            <th>Password</th>
            <th>Name</th>
            <th>Email</th>
            <th>Is Admin</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          <tr className={`bg-success fs-5 ${editingUser ? "" : "d-none"}`}>
            <td>
              <input
                className="w-100"
                type="text"
                name="username"
                value={editingUser?.username || ""}
                onChange={change}
                autoFocus
              />
            </td>
            <td>
              <input
                className="w-100"
                type="password"
                name="password"
                value={editingUser?.password || ""}
                onChange={change}
              />
            </td>
            <td>
              <input
                className="w-100"
                type="text"
                name="name"
                value={editingUser?.name || ""}
                onChange={change}
              />
            </td>
            <td>
              <input
                className="w-100"
                type="email"
                name="email"
                value={editingUser?.email || ""}
                onChange={change}
              />
            </td>
            <td>
              <select
                name="role"
                className="form-select"
                value={editingUser?.role}
                onChange={change}
                required
              >
                <option value="">-</option>
                <option value="USER" defaultChecked>
                  USER
                </option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </td>
            <td>
              <div className="d-flex justify-content-around">
                <button
                  className="btn btn-outline-success"
                  onClick={() => saveUser()}
                >
                  <i className="bi bi-save"></i>
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => setEditingUser(null)}
                >
                  <i className="bi bi-x"></i>
                </button>
              </div>
            </td>
          </tr>
          {users?.map(
            ({ userId, username, password, name, email, role }, index) => {
              return (
                <tr key={username}>
                  <td>{username}</td>
                  <td>*****</td>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{role}</td>
                  <td>
                    <div className="d-flex justify-content-around">
                      <button
                        className="btn btn-outline-warning"
                        onClick={() => setEditingUser(users[index])}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => userId && deleteUser(userId)}
                        disabled={userId === 1}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </section>
  );
};

export default UserManagement;
