import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import Chat from "../pages/Chat";
import Login from "../pages/Login";

const AllRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path={"/register"} element={<Register />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/"} element={<Chat />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
