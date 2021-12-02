import { Link } from "react-router-dom"
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    logo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start'
    },
    links: {
        display: 'flex',
        // justifyContent: 'space-around',
        alignContent: 'space-around'
    }
})



const Navbar = (props) => {
    const classes = useStyles();

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
            <div className={classes.logo}>
                <img
                    style={{
                        width: '2em',
                        height: '2em',
                        paddingTop: '1em',
                    }}
                    src={"/images/logo.png"}
                ></img>
                <h2 className="name">Fitness<br></br>Tracker</h2>
            </div>
            <div className={classes.links}>
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
                </>)}
            </div>
        </div>
    );
};

export default Navbar;