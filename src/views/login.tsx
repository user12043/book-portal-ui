import React, { ChangeEvent, FC, useContext, useState } from "react";
import { AppContext } from "context";
import { User } from "utils/models";
import { apiReq } from "utils";

const Login: FC = () => {
  const { appDispatch } = useContext(AppContext);
  const [loginUser, setLoginUser] = useState<User | null>(null);
  const [register, setRegister] = useState(false);

  const login = () => {
    loginUser &&
      apiReq(!register ? "login" : "users", {
        method: !register ? "POST" : "PUT",
        body: { ...loginUser, role: "USER" }
      }).then(user =>
        !register
          ? user
            ? appDispatch({
                type: "LOGIN",
                payload: user
              })
            : alert("login failed")
          : setRegister(false)
      );
  };

  const change = ({
    currentTarget: { name, value }
  }: ChangeEvent<HTMLInputElement>) =>
    setLoginUser({ ...loginUser, [name]: value } as User);

  return (
    <div className="row h-100 align-items-center px-2">
      <form
        className="form col-md-4 offset-md-4 bg-dark p-3 rounded"
        onSubmit={e => {
          e.preventDefault();
          login();
        }}
      >
        <h1 className="mb-3">Book Portal {!register ? "Login" : "Register"}</h1>
        {register && (
          <>
            <div className="mb-3 input-group">
              <i className="input-group-text bi bi-tag" id="usernameAddon"></i>
              <input
                type="text"
                className="form-control"
                name="username"
                aria-describedby="usernameAddon"
                placeholder="username"
                value={loginUser?.username || ""}
                onChange={change}
                required
              />
            </div>
            <div className="mb-3 input-group">
              <i className="input-group-text bi bi-dash" id="nameAddon"></i>
              <input
                type="text"
                className="form-control"
                name="name"
                aria-describedby="nameAddon"
                placeholder="name"
                value={loginUser?.name || ""}
                onChange={change}
                required
              />
            </div>
          </>
        )}
        <div className="input-group">
          <i className="input-group-text bi bi-person" id="emailAddon"></i>
          <input
            type="email"
            className="form-control"
            name="email"
            aria-describedby="emailAddon"
            placeholder="user@example.com"
            value={loginUser?.email || ""}
            onChange={change}
            required
          />
        </div>
        <div className="form-text fs-6 mb-3">
          We'll never share your email with anyone else.
        </div>
        <div className="mb-3 input-group">
          <i className="input-group-text bi bi-key" id="passwordAddon"></i>
          <input
            type="password"
            className="form-control"
            name="password"
            aria-describedby="passwordAddon"
            placeholder="****"
            value={loginUser?.password || ""}
            onChange={change}
            required
          />
        </div>
        <div className="ms-auto w-50 mb-3 fs-6">
          <i>
            {!register && "No account?  "}
            <a href="#/#" onClick={() => setRegister(!register)}>
              {!register ? "Register" : "Login"}
            </a>
          </i>
        </div>
        <button type="submit" className="btn btn-primary">
          {!register ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Login;
