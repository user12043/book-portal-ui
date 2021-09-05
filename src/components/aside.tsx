import React, { useState } from "react";

const Aside = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div id="asideBar">
      <div className="d-flex h-100">
        <button
          className="btn btn-info h-50 align-self-center fs-3 p-0"
          data-bs-toggle="collapse"
          data-bs-target="#asideBarCollapse"
          aria-expanded="false"
          aria-controls="asideBarCollapse"
          onClick={toggle}
        >
          <i className={`bi bi-arrow-bar-${!collapsed ? "left" : "right"}`}></i>
        </button>
        <div
          id="asideBarCollapse"
          className="collapse collapse-horizontal container-fluid align-self-center"
        >
          <h3 className="my-auto">CONTENT</h3>
        </div>
      </div>
    </div>
  );
};

export default Aside;
