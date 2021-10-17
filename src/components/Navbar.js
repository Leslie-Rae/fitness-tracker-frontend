import { Link } from "react-router-dom"

const Navbar = (props) => {

    const handleLogout = () => {
        //remove token form local storage
        localStorage.removeItem("token")
        //remove user from state
        props.setUser(null)
    }

    const linkStyle = {
        margin: "1rem",
        textDecoration: "none",
        color: 'white',
    };


    return (
        <div className="navbar">
            <h2 className="name">Fitness<br></br>Tracker</h2>
            <div className="links">
                <Link to="/" style={linkStyle}>Home</Link>|
                <Link to="/activities" style={linkStyle}>Activities</Link>|
                <Link to="/routines" style={linkStyle}>Routines</Link>|

                {!props.user && (<>
                    <Link to="/login" style={linkStyle}>Log In</Link>|
                    <Link to="/register" style={linkStyle}>Register</Link>
                </>)}
                {props.user && (<>
                    <Link to="/my-routines" style={linkStyle}>My Routines</Link>|
                    <Link onClick={handleLogout} to="/" style={linkStyle}>Logout</Link>
                    <p>Welcome {props.user.username}!</p>
                </>)}
            </div>
        </div>
    );
};

export default Navbar;