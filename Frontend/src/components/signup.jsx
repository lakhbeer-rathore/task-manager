import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./signup.css";
// import "./Signup.css";

function Signup() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSignup() {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/user/signup",
                {
                    name,
                    email,
                    password,
                },

                {
                    withCredentials: true,
                }
            );

            console.log(response.data);

            // alert("Signup Successful!");
            console.log("Before navigate");
            navigate("/dashboard");
            console.log("After navigate");


        } catch (error) {
            console.log(error.response?.data || error.message);
            console.log(error.response?.data);
            alert("Signup Failed!");
        }
    }

    return (
        <div className="signup-container">

            <h1>Task Manager</h1>

            <h2>Sign Up</h2>

            <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleSignup}>
                Sign Up
            </button>


            <button onClick={() => navigate("/")}>
                Already have an account? Login
            </button>

        </div>
    );
}

export default Signup;