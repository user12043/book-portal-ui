import React, { ChangeEvent, FC, useContext, useState } from "react";
import { AppContext } from "context";
import { User } from "utils/models";
import { apiReq } from "utils";

const Login: FC = () => {
  const { appDispatch } = useContext(AppContext);
  const [loginUser, setLoginUser] = useState<User | null>(null);

  const login = () => {
    loginUser &&
      apiReq("login", {
        method: "POST",
        body: loginUser
      }).then(user =>
        user
          ? appDispatch({
              type: "LOGIN",
              payload: user
            })
          : alert("login failed")
      );
  };

  const change = ({
    currentTarget: { name, value }
  }: ChangeEvent<HTMLInputElement>) =>
    setLoginUser({ ...loginUser, [name]: value } as User);

  return (
    <div className="row h-100 align-items-center px-2">
      <form
        className="col-md-4 offset-md-4 bg-dark p-3 rounded"
        onSubmit={e => {
          e.preventDefault();
          login();
        }}
      >
        <h1 className="mb-3">Book Portal Login</h1>
        <div className="input-group">
          <i className="input-group-text bi bi-person" id="usernameAddon"></i>
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
        <div className="mb-3 form-check fs-6">
          <input type="checkbox" className="form-check-input" id="rememberMe" />
          <label className="form-check-label" htmlFor="rememberMe">
            Remember me
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
