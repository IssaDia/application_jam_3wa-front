import React from "react";
import Navbar from "../component/nav/Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <div className="h-full w-full m-0">
        <Navbar />
      </div>
      {children}
      <p>1</p>
    </>
  );
};

export default Layout;
