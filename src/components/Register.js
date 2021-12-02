import { useState } from "react";
import { useHistory } from "react-router-dom";
import { baseURL } from "../App";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Button, TextField, Typography } from "@mui/material";

const useStyles = makeStyles({
    grid: {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
    },
    main: {
        display: "flex",
        flexDirection: "column",
        width: '80%',
        alignItems: 'center',
        margin: 'auto',
    },
    button: {
        width: '6em'
    }
})

const Register = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const history = useHistory();
    const classes = useStyles();

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
            <div className={classes.grid}>
                <img
                    style={{
                        width: '100%',
                        margin: 'auto',

                    }}
                    src={"/images/lifting.jpg"}
                ></img>
                <Box
                    className={classes.main}
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ mt: 2 }}
                >
                    <Typography component="h1" variant="h5">
                        Register
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
                        min={6}
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        min={6}
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        className={classes.button}
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor: '#304c89' }}
                    >
                        Register
                    </Button>
                    <p>{errorMessage}</p>

                </Box>
            </div>
        </>
    )
};

export default Register;