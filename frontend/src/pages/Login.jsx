import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Login() {

    const navigate = useNavigate();
    const {setUser} = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const data = await loginUser({
                email,
                password
            });
            setUser(data.user);
            alert(data.message);

            navigate("/dashboard");

        } catch (err) {

            alert(err.response?.data?.message || "Login Failed");

        }

    };

    return (
        <div>

            <h1>Login</h1>

            <form onSubmit={handleLogin}>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br /><br />

                <button type="submit">
                    Login 
                </button>

            </form>

       

        </div>
    );
}

export default Login;