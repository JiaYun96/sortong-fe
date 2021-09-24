import React from 'react';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  card: {
    width: 270,
    marginBottom: theme.spacing(5),
  },
  postContent: {
    minHeight: "14vh"
  },
  postTitle: {
    minHeight: "7vh",
    textTransform: "capitalize"
  },
  postActions: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  postActionBtns: {
    border: "1px solid #80008029"
  }
}));

const Post = (props) => {
  const { img, title, id, handlePostView, handleExistingPost } = props;
  const classes = useStyles();

  const handlePostData = () => {
    const data = {
      id: id,
      title: title
    }
    handleExistingPost(data)
  }

  return (
    <>
      <Card className={classes.card} >
        <CssBaseline />
        <CardActionArea>
          <CardContent className={classes.postContent}>
            <Typography variant="body2">
              Board Post
            </Typography>
            <Typography className={classes.postTitle} gutterBottom variant="h5">
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.postActions}>
          <Tooltip title="Edit Board">
            <Button
              className={classes.postActionBtns}
              size="small"
              color="primary"
              onClick={() => handlePostData()}
            >
              <EditIcon />
            </Button>
          </Tooltip>
          <Tooltip title="View Board">
            <Button
              className={classes.postActionBtns}
              size="small"
              color="primary"
              onClick={() => handlePostView(id, title)}
            >
              <VisibilityIcon />
            </Button>
          </Tooltip>
        </CardActions>
      </Card>
    </>
  );
};

export default Post;