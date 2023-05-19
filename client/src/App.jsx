import Cookies from "js-cookie";
import Header from "./Layout/Header";
import RoutesBase from "./app/routes";

function App() {
  const userToken = Cookies.get("token");
  console.log(userToken);
  return (
    <>
      <Header />

      <RoutesBase />
    </>
  );
}

export default App;
