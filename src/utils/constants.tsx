export const API_ROOT =
  process?.env?.NODE_ENV === "production"
    ? "https://bookportal-api.herokuapp.com/api/"
    : "/api/";

export const ADMIN_PATH = "/admin";

export const PATHS = {
  LOGIN: "/login",
  ADMIN_PATH,
  ADMIN: {
    USER_MAN: ADMIN_PATH + "/user-management",
    BOOK_MAN: ADMIN_PATH + "/book-management",
    AUTHOR_MAN: ADMIN_PATH + "/author-management"
  },
  READLIST: "/read-list",
  FAV_LIST: "/favourites"
};

export const ROLES = {
  USER: "USER",
  ADMIN: "ADMIN"
};
