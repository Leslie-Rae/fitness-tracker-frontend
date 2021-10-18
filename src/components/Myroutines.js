import { useEffect, useState } from "react";
import { baseURL } from "../App";

const Myroutines = (props) => {
    const [myRoutines, setMyRoutines] = useState([])
    const [name, setName] = useState("")
    const [goal, setGoal] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const username = props.user.username


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
                name: 'Long Cardio Day',
                goal: 'To get your heart pumping!'
            })
        })
        const info = await response.json()
        console.log(info)
    }

    return (
        <div>
            <>
                <form onSubmit={handleSubmit}>
                    <input type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}></input>
                    <input type="text"
                        placeholder="Goal"
                        value={goal}
                        onChange={(e) => {
                            setGoal(e.target.value)
                        }}></input>
                    <button>Create New Routine</button>
                    <p>{errorMessage}</p>
                </form>
            </>
            <div>
                {myRoutines.map(routine => (
                    <div key={routine.id}>
                        <p>Routine: {routine.name}</p>
                        <p>{routine.goal}</p>
                        <button onClick={() => updateRoutine()}
                        >Edit</button>
                        <button onClick={() => handleDelete(routine.id)}
                        >Delete</button>
                    </div>
                ))}
            </div>
        </div>

    )
}
export default Myroutines;