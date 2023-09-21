import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Layout = ({ children }) => {
  return (
    <>
      <ToastContainer position="bottom-center" />
      <main className="w-full">{children}</main>
    </>
  );
};
