import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
    container: {
        height: "100vh",
        paddingTop: theme.spacing(10),
        backgroundColor: "#ede7f6",
        position: "sticky",
        top: 0,
    },
    paper: {
        marginTop: theme.spacing(8),
        marginRight: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    regBtn: {
        marginRight: '5px'
    }
}));


export default function Landing(props) {
    const classes = useStyles()

    useEffect(() => {
        props.handleVisibility('none')
    });

    return (
        <section className='landing'>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Grid container spacing={2} justify='space-between'>            

                    <div className={classes.paper}>                
                    
                    <p>Special credits to Chelsea, Hakim, Ash & Raymond</p>
                        <br />
                        <img src={"https://imgur.com/BLdxREs.png"} className={classes.logo} />
                        <div
                            style={{
                                color: "purple",
                                fontWeight: "bold",
                                textAlign: "center",
                                fontSize: "48px",
                            }}
                        >
                            <h1>SORTONG</h1>
                        </div>
                        <p>Need to sort your tasks? Use SORTONG today!</p>
                        <br /><br />
                        <div>
                            <Button variant="contained" color="primary" href='/register' className={classes.regBtn}>
                                Register
                            </Button>
                            <Button variant="contained" color="primary" href='/login'>
                                Log In
                            </Button>
                        </div>

                    </div>
                </Grid>
<br/>
<br/>
            </Container>

        </section>
    )
}