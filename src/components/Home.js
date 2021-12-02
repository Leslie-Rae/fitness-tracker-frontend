import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    container: {
        position: 'relative',
        textAlign: 'center',
        color: 'white',
    },
    topLeft: {
        position: 'absolute',
        top: '2em',
        left: '3.5em',
        fontFamily: 'Marcellus',
        fontSize: '2.5vw'
    },
    welcome: {
        position: 'absolute',
        top: '1.5em',
        right: '3.5em',
        fontFamily: 'Marcellus',
        fontSize: '3vw'
    }
})

const Home = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <img
                style={{
                    width: '100%',
                    margin: 'auto',

                }}
                src={"/images/cameron.jpg"}
            ></img>
            <div className={classes.topLeft}>
                <h3>Find Your Healthy.</h3>
                <h3>Find Your Happy.</h3>
            </div>
            <div className={classes.welcome}>
                {props.user && (<>
                    <h4>Welcome {props.user.username}</h4>
                </>)}
            </div>
        </div>
    )
}

export default Home;