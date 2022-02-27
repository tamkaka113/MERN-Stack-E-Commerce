import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
const PrivateRoute = ({ children, ...rest }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <Route
      {...rest}
      render={() => {
        return userInfo.token ? children : <Redirect to="/login"></Redirect>;
      }}
    />
  );
};

export default PrivateRoute;
