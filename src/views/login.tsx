import React, { FC, useContext } from "react";
import { AppContext } from "context";

const Login: FC = () => {
  const { appDispatch } = useContext(AppContext);

  const login = () => {
    appDispatch({
      type: "LOGIN",
      payload: {
        username: "testuser",
        name: "Test User"
      }
    });
  };

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
            id="username"
            aria-describedby="usernameAddon"
            placeholder="user@example.com"
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
            id="password"
            aria-describedby="passwordAddon"
            placeholder="****"
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
