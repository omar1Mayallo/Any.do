import * as React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";

import Login from "../../pages/Auth/login";
import Register from "../../pages/Auth/register";
import Home from "../../pages/Home";

const RoutesBase = () => {
  const {userToken} = useSelector((state) => state.auth.loggedStatus);

  return (
    <Routes>
      <Route>
        <Route
          path="/"
          element={userToken ? <Home /> : <Navigate to={"/login"} />}
        />
      </Route>
      <Route
        path="/login"
        element={!userToken ? <Login /> : <Navigate to={"/"} />}
      />
      <Route
        path="/register"
        element={!userToken ? <Register /> : <Navigate to={"/"} />}
      />

      {/* NOTFOUND_ROUTES */}
      <Route path="*" element={<div>Not Found Page</div>} />
    </Routes>
  );
};

export default RoutesBase;
