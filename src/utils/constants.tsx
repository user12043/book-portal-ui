export const API_ROOT = process?.env?.API_URL || "/api/";

export const ADMIN_PATH = "/admin";

export const PATHS = {
  LOGIN: "/login",
  ADMIN_PATH,
  ADMIN: {
    USER_MAN: ADMIN_PATH + "/user-management",
    BOOK_MAN: ADMIN_PATH + "/book-management",
    AUTHOR_MAN: ADMIN_PATH + "/author-management"
  }
};

export const ROLES = {
  USER: "USER",
  ADMIN: "ADMIN"
};
