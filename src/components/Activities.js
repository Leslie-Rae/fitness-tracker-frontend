import { useEffect, useState } from "react";
import { baseURL } from "../App";



const Activities = ({ token, user }) => {
    const [activities, setActivities] = useState([]);
    const [newActivities, setNewActivities] = useState([]);
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [errorMessage, setErrorMessage] = useState("");

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
        <div>
            <>
                {user !== null ?

                    <form onSubmit={newActivity}>
                        <input type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}></input>
                        <input type="text"
                            placeholder="description"
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value)
                            }}></input>
                        <button>Add Activity</button>
                        <p>{errorMessage}</p>
                    </form>

                    : <h4>Log in to create a new Activity</h4>}
            </>
            <div>
                {
                    activities.map(activity => (
                        <div key={activity.id}>
                            <p>ID: {activity.id}</p>
                            <p>Name: {activity.name}</p>
                            <p>Description: {activity.description}</p>
                            <br></br>
                        </div>
                    ))
                }
            </div>
        </div >
    );
}




export default Activities;