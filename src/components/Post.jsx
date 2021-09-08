import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    makeStyles,
    Typography,
  } from "@material-ui/core";
  import CssBaseline from '@material-ui/core/CssBaseline';

  const useStyles = makeStyles((theme) => ({
    card: {
      width: 270,
      marginBottom: theme.spacing(5),
    },
    root: {
      flexGrow: 1,
      padding: theme.spacing(2)
    },
    media: {
      height: 250,
      [theme.breakpoints.down("sm")]: {
        height: 150,
      },
    },
  }));
  
  const Post = ({ img, title }) => {
    const classes = useStyles();
    return (
      <Card className={classes.card} >
              <CssBaseline />

        <CardActionArea>
          {/* <CardMedia className={classes.media} image={img} title="My Post" /> */}
          <CardContent>
            <Typography gutterBottom variant="h5">
              {title}
            </Typography>

            <Typography variant="body2">
              Due Date: 
            </Typography>
          </CardContent>
        </CardActionArea>
        
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>

      </Card>
    );
  };
  
  export default Post;