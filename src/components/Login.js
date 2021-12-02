import { Button, Grid, Paper, TextField, Typography, Link, Card, CardContent, CardMedia } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { baseURL } from "../App";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr'
    },
    main: {
        display: "flex",
        flexDirection: "column",
        width: '40%',
        alignItems: 'center',
        margin: 'auto',
    },
    button: {
        width: '6em'
    }
})

const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const classes = useStyles();

    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        const response = await fetch(`${baseURL}/users/login`, {
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
        history.push("/");
    };

    return (
        <>
            <div className={classes.grid}>
                <Box
                    className={classes.main}
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ mt: 2 }}
                >
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        placeholder="Enter email"
                        minLength={6}
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} placeholder="Enter Username"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        min={8}
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        className={classes.button}
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor: '#304c89' }}
                    >
                        Login
                    </Button>
                    <p>{errorMessage}</p>
                    <Link href="/register">{"Don't have an account? Sign Up"}</Link>
                </Box>
                <img
                    style={{
                        width: '100%',
                        height: '80vh',
                    }}
                    src={"/images/stairs.jpg"}
                ></img>
            </div>
        </>
    )
};

export default Login;