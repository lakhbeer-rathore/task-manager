import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log(response.data);
      // alert(response.data.message);
      navigate("/dashboard")
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(error.response?.data?.message || "Login Failed");
    }
  }
  //     catch (error) {
  //   console.log("ERROR OBJECT:", error);
  //   console.log("ERROR RESPONSE:", error.response);
  //   console.log("ERROR DATA:", error.response?.data);
  //   console.log("ERROR MESSAGE:", error.message);
  // }
  //   }

  return (
    <div className="login-container">
      <h1>Task Manager</h1>

      <h2 className="login">Login</h2>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button onClick={handleLogin}>
        Login
      </button>

<br />

      <button onClick={() => navigate("/signup")}>
        Create New Account
      </button>
    </div>
  );
}

export default Login;

