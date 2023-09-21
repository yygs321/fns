import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const LoginCheck = () => {
  const isLogin = useSelector((state) => {
    return state.auth.isLogin;
  });

  if (isLogin) {
    return <Outlet />;
  } else {
    return <Navigate replace to="/" />;
  }
};

export default LoginCheck;
