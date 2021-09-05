import React, { FC, useContext } from "react";
import Logo from "img/logo.svg";
import { AppContext } from "context";
import { NavLink, useHistory } from "react-router-dom";

const NavBar: FC = () => {
  const history = useHistory();

  const {
    appState: { loggedUser },
    appDispatch
  } = useContext(AppContext);
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <span className="navbar-brand mb-0 h1" onClick={() => history.push("/")}>
        <img
          id="navbarLogo"
          className="rounded d-inline-block align-text-center"
          src={Logo}
          alt=""
        />
        {process?.env?.REACT_APP_NAME || "unnamed app"}
      </span>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navBarContent"
        aria-controls="navBarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      {loggedUser ? (
        <div id="navBarContent" className="collapse navbar-collapse">
          <nav className="navbar-nav nav-justified nav-pills mx-auto">
            <NavLink to="/page1" className="nav-link">
              Page1
            </NavLink>
            <NavLink to="/page2" className="nav-link">
              Page2
            </NavLink>
            <NavLink to="/page3" className="nav-link">
              Page3
            </NavLink>
          </nav>
          <div>
            <span>{loggedUser?.name}</span>
            <button
              className="btn btn-danger ms-3"
              onClick={() => appDispatch({ type: "LOGOUT" })}
            >
              <i className="bi bi-box-arrow-right"></i>
            </button>
          </div>
        </div>
      ) : null}
    </nav>
  );
};

export default NavBar;
