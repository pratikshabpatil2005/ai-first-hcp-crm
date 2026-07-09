import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        try {
            const response = await api.post("/auth/login", {
                email,
                password,
            });

            localStorage.setItem(
                "token",
                response.data.access_token
            );

            alert("Login Successful");

            navigate("/dashboard");
        } catch (error) {
            alert("Invalid Email or Password");
            console.error(error);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <div style={{ width: "300px" }}>
                <h1>AI First HCP CRM</h1>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: "100%", padding: "10px" }}
                />

                <br />
                <br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: "100%", padding: "10px" }}
                />

                <br />
                <br />

                <button
                    onClick={login}
                    style={{
                        width: "100%",
                        padding: "10px",
                    }}
                >
                    Login
                </button>
            </div>
        </div>
    );
}

export default Login;