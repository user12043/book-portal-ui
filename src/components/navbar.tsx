import React, { FC, useContext } from "react";
import Logo from "img/logo.svg";
import { AppContext } from "context";
import { NavLink, useHistory } from "react-router-dom";
import { PATHS } from "utils/constants";
import Authorized from "./authorized";

const NavBar: FC = () => {
  const history = useHistory();

  const {
    appState: { loggedUser },
    appDispatch
  } = useContext(AppContext);
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <span
        className="navbar-brand mb-0 h1 fs-4"
        onClick={() => history.push("/")}
      >
        <img
          id="navbarLogo"
          className="rounded d-inline-block align-text-center"
          src={Logo}
          alt=""
        />
        Book Portal
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

      <div id="navBarContent" className="collapse navbar-collapse">
        <Authorized>
          <nav className="navbar-nav nav-pills mx-auto">
            <NavLink to={PATHS.ADMIN.USER_MAN} className="nav-link">
              User Management
            </NavLink>
            <NavLink to={PATHS.ADMIN.AUTHOR_MAN} className="nav-link">
              Author Management
            </NavLink>
            <NavLink to={PATHS.ADMIN.BOOK_MAN} className="nav-link">
              Book Management
            </NavLink>
          </nav>
          <div className="me-2">
            <span>{loggedUser?.name}</span>
            <button
              className="btn btn-danger ms-3"
              onClick={() => appDispatch({ type: "LOGOUT" })}
            >
              <i className="bi bi-box-arrow-right"></i>
            </button>
          </div>
        </Authorized>
      </div>
    </nav>
  );
};

export default NavBar;
