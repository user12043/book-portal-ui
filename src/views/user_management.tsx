import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { apiReq } from "utils";
import { User } from "utils/models";

const UserManagement: FC = () => {
  const [users, setUsers] = useState<Array<User>>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const fetchUsers = () => {
    apiReq("users")
      .then(data => setUsers(data))
      .catch(error => alert(error));
    setEditingUser(null);
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
    });
  };

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.currentTarget;
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
      <table className="table table-dark table-striped table-hover text-center">
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
          <tr className={`bg-success ${editingUser ? "" : "d-none"}`}>
            <td>
              <input
                className="w-100"
                type="text"
                name="username"
                value={editingUser?.username}
                onChange={change}
              />
            </td>
            <td>
              <input
                className="w-100"
                type="password"
                name="password"
                value={editingUser?.password}
                onChange={change}
              />
            </td>
            <td>
              <input
                className="w-100"
                type="text"
                name="name"
                value={editingUser?.name}
                onChange={change}
              />
            </td>
            <td>
              <input
                className="w-100"
                type="email"
                name="email"
                value={editingUser?.email}
                onChange={change}
              />
            </td>
            <td>
              <input
                className="w-100"
                type="text"
                name="role"
                value={editingUser?.role}
                onChange={change}
              />
            </td>
            <td>
              <button
                className="btn btn-outline-success"
                onClick={() => saveUser()}
              >
                <i className="bi bi-save"></i>
              </button>
              <button
                className="btn btn-outline-danger ms-3"
                onClick={() => setEditingUser(null)}
              >
                <i className="bi bi-x"></i>
              </button>
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
                  <td className="d-flex justify-content-center">
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => setEditingUser(users[index])}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      className="btn btn-outline-danger ms-3"
                      onClick={() => deleteUser(userId)}
                      disabled={userId === 1}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
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
