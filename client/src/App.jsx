import * as React from "react";
import {Route, Routes} from "react-router-dom";

import Login from "./pages/Auth/login";
import Register from "./pages/Auth/register";
import Home from "./pages/Home";

import Header from "./Layout/Header";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
