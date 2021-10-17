import { useEffect, useState } from "react";
import { baseURL } from "../App";

const Routines = () => {
    const [routines, setRoutines] = useState([]);

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
        <div>
            {routines.map(routine => (
                <div key={routine.id}>
                    <h4>Routine:</h4>
                    <p>Name: {routine.name}</p>
                    <p>Goal: {routine.goal}</p>
                    <p>Creator: {routine.creatorName}</p>
                    <div>
                        {routine.activities.map(activity => (
                            <div key={activity.id}>
                                <h5>Activities for this routine:</h5>
                                <p>Name: {activity.name}</p>
                                <p>Desciption: {activity.description}</p>
                                <p>Duration: {activity.duration}</p>
                                <p>Count: {activity.count}</p>
                            </div>
                        ))}
                    </div>
                    <hr></hr>
                </div>
            ))}
        </div>
    );
}


export default Routines;