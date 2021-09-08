import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Draggable } from "react-beautiful-dnd";
import makeStyles from "@material-ui/core/styles/makeStyles";


const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
  },
}));

const ListItemCustom = ({ itemObject, index }) => {

  const classes = useStyles();

  return (
    <Draggable draggableId={itemObject.id} key={itemObject.id} index={index}>
      {(provided) => (
        <ListItem
          key={itemObject.id}
          role={undefined}
          dense
          button
          ContainerComponent="li"
          ContainerProps={{ ref: provided.innerRef }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ListItemText
            sytles={{ fontFamily: "Quicksand" }}
            primary={`${itemObject.text}`}
          />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="comments"
              question-uid={itemObject.id}
            >
              <HighlightOffIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      )}
    </Draggable>
  );
};

export default ListItemCustom;
