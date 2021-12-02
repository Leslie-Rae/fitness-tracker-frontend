
import { Button, Card, TextField, Typography, } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { baseURL } from "../App";

const useStyles = makeStyles({

    container: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        margin: '2em',

    },
    card: {
        margin: '1em',
        padding: '1em',
    },
    form: {
        display: "flex",
        flexDirection: "column",
        width: '80%',
        alignItems: 'center',
        margin: 'auto',
    }
})

const Activities = ({ token, user }) => {
    const [activities, setActivities] = useState([]);
    const [newActivities, setNewActivities] = useState([]);
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [errorMessage, setErrorMessage] = useState("");
    const classes = useStyles();

    const fetchActivities = async () => {
        const response = await fetch(`${baseURL}/activities`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const allActivities = await response.json();
        setActivities(allActivities)
    }
    useEffect(() => {
        fetchActivities()
    }, [])

    const newActivity = async (e) => {
        e.preventDefault();
        console.log(name, description)
        const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/activities', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: name,
                description: description
            })
        })
        const newActivities = await response.json();
        if (newActivities.error) {
            console.log(newActivities.error)
            return setErrorMessage(newActivities.error)
        }
        setNewActivities(newActivities)

        setName("")
        setDescription("")
        fetchActivities();
    }


    return (
        <div className={classes.container}>
            <div>
                <Typography variant='h5'>Browse All Activities</Typography>
                {
                    activities.map(activity => (
                        <Card key={activity.id} className={classes.card}>
                            <p>ID # {activity.id}</p>
                            <p>Activity: {activity.name}</p>
                            <p>Description: {activity.description}</p>
                            <br></br>
                        </Card>
                    ))
                }
            </div>

            {user !== null ?
                <Box

                    className={classes.form}
                    component="form"
                    onSubmit={newActivity}
                    sx={{ mt: 2 }}
                >
                    <Typography component="h1" variant="h5">
                        Add Your Own
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
                        }} placeholder="Activity Name"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="text"
                        min={8}
                        placeholder="Description"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }}
                    />
                    <Button
                        className={classes.button}
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor: 'gray' }}
                    >
                        Let's go!
                    </Button>
                    <p>{errorMessage}</p>

                </Box>
                : <h4>Log in to create a new Activity</h4>}
        </div >
    );
}




export default Activities;