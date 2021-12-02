import { Button, Card, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { baseURL } from "../App";
import { makeStyles } from "@mui/styles";



const useStyles = makeStyles({
    card: {
        padding: '1em',
        minWidth: '15em',
        minHeight: '16em',
    },
    header: {
        textAlign: 'center',

    }
})


const Routines = () => {
    const [routines, setRoutines] = useState([]);
    const classes = useStyles();

    const fetchRoutines = async () => {
        const response = await fetch(`${baseURL}/routines`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const routines = await response.json();
        setRoutines(routines)
        console.log(routines[0].activities[0])

    }
    useEffect(() => {
        fetchRoutines();
    }, [])



    return (
        <>
            <h2 className={classes.header}>Browse All Routines</h2>
            <Grid container spacing={3} margin='auto'>
                {
                    routines.map(routine => (
                        <Grid item key={routine.id} xs='auto'>

                            <Card raised className={classes.card}>
                                <Typography
                                    align="center"
                                    variant="body1"
                                    fontWeight="700"
                                >{routine.name}
                                </Typography>
                                <Typography
                                    align="left"
                                    variant="subtitle1"
                                    padding=".5em"
                                    color="#31708e"
                                >
                                    Goal: {routine.goal}
                                </Typography>
                                <Typography
                                    align="left"
                                    variant="subtitle1"
                                    padding=".5em"
                                    color="#31708e"
                                >
                                    Creator: {routine.creatorName}
                                </Typography>

                                <div class="dropdown" style={{ float: 'left' }}>
                                    <Button class="dropbtn">Activities</Button>
                                    {routine.activities.map(activity => (
                                        <div key={activity.id} class="dropdown-content" >
                                            <h5>Activity:</h5>
                                            <p>{activity.name}</p>
                                            <p>{activity.description}</p>
                                            <span>Duration: {activity.duration} </span>
                                            <span> Count: {activity.count}</span>


                                        </div>
                                    ))}
                                </div>
                            </Card>

                        </Grid>
                    ))
                }
            </Grid >
        </>
    );
}


export default Routines;