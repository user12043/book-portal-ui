import { API_ROOT } from "./constants";
import { User } from "./models";

interface MyRequestInit extends Omit<RequestInit, "body"> {
  body?: Object;
}

export const getLoggedUser = (): User | null => {
  const record = localStorage.getItem("loggedUser");
  return record ? JSON.parse(record) : null;
};

export const setLoggedUser = (user: User): void =>
  localStorage.setItem("loggedUser", JSON.stringify(user));

export const apiReq = (path: string, options?: MyRequestInit) => {
  const handleFetchError = (response: Response) => {
    if (!response.ok) {
      return Promise.reject(response);
    }
    return response;
  };

  if (!options) {
    options = {
      method: "GET"
    };
  }

  const headers = new Headers({ ...options.headers });
  headers.set("Accept", "application/json, text/plain");
  headers.set("Content-Type", "application/json");
  /* if (authenticated()) {
    headers.set("Authorization", "Bearer " + localStorage.getItem(API_TOKEN));
  } */
  options.headers = headers;

  if (options.body) {
    options.body = JSON.stringify(options.body);
  }

  return fetch(
    !path.startsWith("http") ? API_ROOT + path : path,
    options as RequestInit
  )
    .then(handleFetchError)
    .then(
      response => {
        return response.json();
      },
      async errorResponse => {
        const status = errorResponse.status + ": " + errorResponse.statusText;
        const responseObject = await errorResponse.json();
        console.log(status);
        console.log(responseObject);
        throw Error(
          status + (responseObject.message ? "\n" + responseObject.message : "")
        );
      }
    )
    .catch(error => alert(error));
};
