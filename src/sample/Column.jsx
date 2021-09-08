import React from "react";
import { Droppable } from "react-beautiful-dnd";
import RootRef from "@material-ui/core/RootRef";
import List from "@material-ui/core/List";
import ListItemCustom from "./ListItemCustom";
import { Typography } from "@material-ui/core"


const Column = ({ column }) => {

  return (
    <div>
      
    <div
      style={{
        backgroundColor: "purple",
        margin: 10,
        paddingTop: 20,
        color: "white",
        width: 247,
        borderRadius: '20px',
        fontWeight: "bold",
        textAlign: "center",
      }}
    >
    <div
      style={{
        backgroundColor: "#ede7f6",
        color: "black",
        width: 247,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 20,
      }}
    >
      <Typography variant={"h4"}>{column.id}</Typography></div>

      <Droppable droppableId={column.id}>
        {(provided) => (
          <RootRef rootRef={provided.innerRef}>
            <List>
              {column.list.map((itemObject, index) => {
                return <ListItemCustom index={index} itemObject={itemObject} />;
              })}
              {provided.placeholder}
            </List>
          </RootRef>
        )}
      </Droppable>

    </div>
    </div>
  );
};

export default Column;
