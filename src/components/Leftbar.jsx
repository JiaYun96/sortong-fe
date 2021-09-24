import { Container, makeStyles, Typography, Grid } from "@material-ui/core"
import Box from '@material-ui/core/Box'
import {
  ExitToApp,
  Home,
  AccountCircle,
  Work,
} from "@material-ui/icons"
import Link from '@material-ui/core/Link'

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    // color: "white",
    paddingTop: theme.spacing(10),
    backgroundColor: "#ede7f6",
    position: "sticky",
    top: 0,
    [theme.breakpoints.up("sm")]: {
      backgroundColor: "#ede7f6",
      // color: "#555",
      border: "1px solid #ece7e7",
    },
  },

  item: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    marginBottom: theme.spacing(3),
    cursor: "pointer",
    "&:hover": {
      color: "black",
    },
    [theme.breakpoints.up("sm")]: {
      marginBottom: theme.spacing(3),
      cursor: "pointer",
    },
  },

  icon: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      fontSize: "24px",
    },
  },

  text: {
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },

}))

const Leftbar = (props) => {
const classes = useStyles()

  return (
    <Container className={classes.container} style={{display: props && props.isVisible}} justify = "center">
      
      <Box m={2}>
        
        <Grid container justify = "center">
          
          <div
            style={{
              color: "purple",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "17px",
            }}>

            <Typography variant="h7">
                Your INKredible Planner
            </Typography>
          </div>

          <div style={classes.logoHorizontallyCenter}>
              <img src={"https://imgur.com/BLdxREs.png"} className={classes.logo} alt="logo" />
          </div>
        
        </Grid>
      
      </Box>

      <div>
      {/* { <Link className={classes.item} href="http://localhost:3000/" style={{ textDecoration: 'none' }}>
        <Home className={classes.icon} />
        <Typography className={classes.text}>Homepage</Typography>
      </Link> */}

        <Link className={classes.item} href="" style={{ textDecoration: 'none' }}>
          <AccountCircle className={classes.icon} />
          <Typography className={classes.text}>My Profile</Typography>
        </Link>
        
        <Link className={classes.item} href="/boards" style={{ textDecoration: 'none' }}>
          <Work className={classes.icon} />
          <Typography className={classes.text}>My Boards</Typography>
        </Link>
        
        <Link className={classes.item} href="http://localhost:3000/" style={{ textDecoration: 'none' }}>
          <ExitToApp className={classes.icon} />
          <Typography className={classes.text}>Logout</Typography>
        </Link>
      
      </div>    
    </Container>
  )
}

export default Leftbar