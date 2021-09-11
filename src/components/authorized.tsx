import React, { FC } from "react";
import { getLoggedUser } from "utils";
import { ROLES } from "utils/constants";

const Authorized: FC<{ roles?: Array<string> }> = ({ children, roles }) => {
  return getLoggedUser() &&
    getLoggedUser()?.role ===
      (roles?.find(r => r === getLoggedUser()?.role) || ROLES.ADMIN) ? (
    <>{children}</>
  ) : null;
};

export default Authorized;
