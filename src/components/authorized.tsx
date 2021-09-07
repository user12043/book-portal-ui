import React, { FC } from "react";
import { getLoggedUser } from "utils";
import { ROLES } from "utils/constants";

const Authorized: FC<{ role?: string }> = ({ children, role }) => {
  return getLoggedUser() && getLoggedUser()?.role === (role || ROLES.ADMIN) ? (
    <>{children}</>
  ) : null;
};

export default Authorized;
