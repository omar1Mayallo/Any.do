import {Link, Route, Routes} from "react-router-dom";
import Login from "./pages/Auth/login";
import Register from "./pages/Auth/register";

function App() {
  return (
    <>
      <Link to={"/login"}>Login</Link>
      <Link to={"/register"}>Register</Link>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
