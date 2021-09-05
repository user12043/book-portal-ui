import React, { FC, useEffect, useState } from "react";
import { apiReq } from "utils";
import { User } from "utils/models";

const UserManagement: FC = () => {
  const [users, setUsers] = useState<Array<User>>([]);
  const [editingUser, setEditingUser] = useState<User | undefined>();

  useEffect(() => {
    apiReq("users")
      .then(data => setUsers(data))
      .catch(error => alert(error));
  }, []);

  const saveUser = (user: User | undefined) => {
    apiReq("users/save", {
      method: "PUT",
      body: JSON.stringify(user)
    }).catch(error => alert(error));
  };

  return (
    <section>
      <h1>USER MANAGEMENT</h1>
      <table className="table table-dark table-striped table-hover text-center">
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ userId, username, name, email }) => {
            const editing = editingUser?.userId === userId;
            return (
              <tr key={username}>
                <td>
                  {editing ? <input type="text" value={username} /> : username}
                </td>
                <td>{name}</td>
                <td>{email}</td>
                <td className="d-flex justify-content-center">
                  {editing ? (
                    <>
                      <button
                        className="btn btn-outline-warning"
                        onClick={() =>
                          setEditingUser(users.find(u => u.userId === userId))
                        }
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className="btn btn-outline-danger ms-3">
                        <i className="bi bi-trash"></i>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-outline-success"
                        onClick={() =>
                          saveUser(users.find(u => u.userId === userId))
                        }
                      >
                        <i className="bi bi-save"></i>
                      </button>
                      <button
                        className="btn btn-outline-danger ms-3"
                        onClick={() => setEditingUser(undefined)}
                      >
                        <i className="bi bi-x"></i>
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default UserManagement;
