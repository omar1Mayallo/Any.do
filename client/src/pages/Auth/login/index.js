import {useState} from "react";
import Cookies from "js-cookie";
import {usePostData} from "../../../common/hooks/api/usePost";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Make API call to authenticate user and get JWT token
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const res = await usePostData("/auth/login", {
        email,
        password,
      });

      // Set token to cookies to expire in 30 days
      Cookies.set("token", res.data.token, {expires: 30});

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
