import { useState } from "react";
import { useHistory } from "react-router-dom";
import { baseURL } from "../App";

const Register = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        const response = await fetch(`${baseURL}/users/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        const info = (await response.json());
        if (info.error) {
            return setErrorMessage(info.error)
        }
        localStorage.setItem("token", info.token);
        props.setUser({ token: info.token, id: info.user.id, username: info.user.username });
        history.push("/")
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} placeholder="Enter Username">
                </input>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={6}
                    type="password"
                    placeholder="Enter Password">
                </input>
                <input value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    minLength={6}
                    type="password"
                    placeholder="Confirm Password"></input>
                <button>Register</button>
                <p>{errorMessage}</p>
            </form>
        </>
    )
};

export default Register;