import { User } from "utils/models";
import React, { FC, useReducer } from "react";
import { getLoggedUser, setLoggedUser } from "utils";

interface AppState {
  version: string;
  loggedUser: User | null;
}

const initialState: AppState = {
  version: process?.env?.REACT_APP_VERSION || "undefined-version",
  loggedUser: getLoggedUser()
};

interface AppContextValue {
  appState: AppState;
  appDispatch: React.Dispatch<any>;
}

const initialAppContextValue = {
  appState: initialState,
  appDispatch: () => null
};

export const AppContext = React.createContext<AppContextValue>(
  initialAppContextValue
);

const appReducer = (state: AppState, action: any) => {
  const { payload } = action;
  switch (action.type) {
    case "LOGIN":
      setLoggedUser(payload);
      return {
        ...state,
        loggedUser: payload
      };

    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        loggedUser: null
      };

    default:
      break;
  }
  return state;
};

export const AppContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ appState: state, appDispatch: dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
