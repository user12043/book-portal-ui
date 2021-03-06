import React, { FC, useContext } from "react";
import "css/App.scss";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { AppContext } from "context";
import { Redirect, Route, Switch, useLocation } from "react-router";
import Login from "views/login";
import NavBar from "components/navbar";
import Aside from "components/aside";
import UserManagement from "views/user_management";
import { PATHS } from "utils/constants";
import Authorized from "components/authorized";
import BookManagement from "views/book_management";
import AuthorManagement from "views/author_management";
import Home from "views/home";

const App: FC = () => {
  const { appState } = useContext(AppContext);
  const { pathname } = useLocation();
  return (
    <div className="h-100 bg-dark bg-gradient">
      <header id="header">
        <NavBar />
      </header>
      <article id="article" className="pt-3">
        <section className="container h-100">
          <Switch>
            {appState.loggedUser ? (
              pathname === PATHS.LOGIN ? (
                <Redirect to="/" />
              ) : (
                <>
                  <Route path={["/", PATHS.READLIST, PATHS.FAV_LIST]} exact>
                    <Home />
                  </Route>
                  <Route path={PATHS.ADMIN.USER_MAN}>
                    <Authorized>
                      <UserManagement />
                    </Authorized>
                  </Route>
                  <Route path={PATHS.ADMIN.AUTHOR_MAN}>
                    <Authorized>
                      <AuthorManagement />
                    </Authorized>
                  </Route>
                  <Route path={PATHS.ADMIN.BOOK_MAN}>
                    <Authorized>
                      <BookManagement />
                    </Authorized>
                  </Route>
                </>
              )
            ) : (
              <Route path={PATHS.LOGIN}>
                <Login />
              </Route>
            )}
            <Route path="*">
              <Redirect to={appState.loggedUser ? "/" : PATHS.LOGIN} />
            </Route>
          </Switch>
        </section>
      </article>
      <aside>{appState.loggedUser ? <Aside /> : null}</aside>
      <footer>
        <div className="fixed-bottom fs-6 text-end">
          <small>
            <code>version: {appState.version}</code>
          </small>
        </div>
      </footer>
    </div>
  );
};

export default App;
