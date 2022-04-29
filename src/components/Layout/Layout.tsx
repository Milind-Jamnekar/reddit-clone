import React from "react";
import Navbar from "../Navbar/Navbar";

interface LayoutProps {
  children: JSX.Element[] | JSX.Element;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
