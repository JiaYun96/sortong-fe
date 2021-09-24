import React from "react"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import IconButton from "@material-ui/core/IconButton"
import { Draggable } from "react-beautiful-dnd"
import makeStyles from "@material-ui/core/styles/makeStyles"
import EditIcon from '@material-ui/icons/Edit'
import Tooltip from '@material-ui/core/Tooltip'


const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
  },

  boardEditBtn: {
    color: "#8a8aca",
    // border: "1px solid #8a8aca",
    borderRadius: 0,
    padding: "7px",
    margin: "auto",
    "&:hover": {
      backgroundColor: "#bd3fbd !important",
      color: "#d7d7d7 !important"
    },
  },

  listItem: {
    border: "1px solid darkgrey",
    width: "94%",
    margin: "auto auto 10px auto",
    cursor: "grabbing !important",
    "&:hover": {
      backgroundColor: "darkmagenta !important"
    },
  },

  listItemTitle: {
    // fontFamily: "monospace",
    fontSize: "1.2em",
    fontWeight: 600,
    textTransform: "capitalize"
  },

  listItemDesc: {
    textTransform: "capitalize",
    fontSize: "0.9em",
    // fontFamily: "serif",
  }
}));

const ListItemCustom = ({ itemObject, index, openBoardModal, taskStatus }) => {

  const classes = useStyles()

  return (
    <Draggable draggableId={itemObject.cardId} key={itemObject.cardId} index={index}>
      {(provided) => (
        <ListItem
          key={itemObject.cardId}
          role={undefined}
          dense
          button
          ContainerComponent="li"
          ContainerProps={{ ref: provided.innerRef }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={classes.listItem}
        >
          <div>
            <ListItemText
              classes={{ primary: classes.listItemTitle }}
              primary={`${itemObject.cardTitle}`}
            />
            <ListItemText
              classes={{ primary: classes.listItemDesc }}
              primary={`${itemObject.cardDescription}`}
            />
          </div>
          <ListItemSecondaryAction>
            <Tooltip title="Edit Card">
              <IconButton
                edge="end"
                aria-label="comments"
                question-uid={itemObject.cardId}
                className={classes.boardEditBtn}
                onClick={() => openBoardModal(true, taskStatus, itemObject.cardId)}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          </ListItemSecondaryAction>
        </ListItem>
      )}
    </Draggable>
  );
};

export default ListItemCustom
