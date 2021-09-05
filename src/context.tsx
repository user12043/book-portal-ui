import { User } from "models";
import React, { FC, useReducer } from "react";

type AppState = {
  version: string;
  loggedUser: User | null;
};

const initialState: AppState = {
  version: process?.env?.REACT_APP_VERSION || "undefined-version",
  loggedUser: null
};

type AppDispatch = React.Dispatch<any>;

type AppContextValue = {
  appState: AppState;
  appDispatch: AppDispatch;
};

const initialAppContextValue = {
  appState: initialState,
  appDispatch: () => null
};

export const AppContext = React.createContext<AppContextValue>(
  initialAppContextValue
);

const appReducer = (state: AppState, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        loggedUser: action.payload
      };

    case "LOGOUT":
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
