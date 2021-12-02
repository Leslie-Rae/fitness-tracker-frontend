import { useEffect, useState } from "react";
import { baseURL } from "../App";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Button, Card, TextField, Typography } from "@mui/material";

const useStyles = makeStyles({
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr'
    },
    form: {
        display: "flex",
        flexDirection: "column",
        width: '80%',
        alignItems: 'center',
        margin: 'auto',


    },
    card: {
        padding: '1em',
        margin: '1em'
    }
})

const Myroutines = (props) => {
    const [myRoutines, setMyRoutines] = useState([])
    const [name, setName] = useState("")
    const [goal, setGoal] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const username = props.user.username;
    const classes = useStyles();


    useEffect(() => {
        if (!props.user) {
            return <h1>You must be logged in to see your routines.</h1>
        }
        fetchMyRoutines();
    }, []);


    const fetchMyRoutines = async () => {
        const response = await fetch(`${baseURL}/users/${username}/routines`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const myRawRoutines = await response.json();
        console.log(myRawRoutines[0])
        setMyRoutines(myRawRoutines)
    };


    const handleSubmit = async (e) => {
        // console.log(props.user.token)
        e.preventDefault();
        const resp = await fetch(
            `http://fitnesstrac-kr.herokuapp.com/api/routines`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${props.user.token}`,
                },
                body: JSON.stringify({
                    name: name,
                    goal: goal,
                    isPublic: true,
                }),
            }
        );
        const info = await resp.json();
        if (info.error) {
            setErrorMessage("A Routine by that name already exists");
            return;
        }
        setGoal("");
        setName("");
        fetchMyRoutines();
    };


    const handleDelete = async (routineId) => {
        const response = await fetch(`${baseURL}/routines/${routineId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.user.token}`
            }
        })
        const info = await response.json();
        fetchMyRoutines();
    }

    const updateRoutine = async (routineId) => {
        const response = await fetch(`${baseURL}/routines/${routineId}`, {
            method: "PATCH",
            body: JSON.stringify({
                name: name,
                goal: goal
            })
        })
        const info = await response.json()
        console.log(info)
    }

    return (
        <div>


            <div className={classes.grid}>
                <div>
                    {myRoutines.map(routine => (
                        <Card key={routine.id} className={classes.card}>
                            <p>Routine: {routine.name}</p>
                            <p>{routine.goal}</p>
                            {/* <Button onClick={() => updateRoutine()}
                            >Edit</Button> */}
                            <Button onClick={() => handleDelete(routine.id)}
                                color="error"
                            >Delete</Button>
                        </Card>
                    ))}
                </div>
                <Box
                    className={classes.form}
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ mt: 2 }}
                >
                    <Typography component="h1" variant="h5">
                        Create A New Routine
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        placeholder="Name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                        }} placeholder="Routine Name"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="text"
                        placeholder="Goal"
                        value={goal}
                        onChange={(e) => {
                            setGoal(e.target.value)
                        }}
                    />
                    <Button
                        className={classes.button}
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor: 'gray' }}
                    >
                        Let's Go!
                    </Button>
                    <p>{errorMessage}</p>
                </Box>
            </div>
        </div>


    )
}
export default Myroutines;