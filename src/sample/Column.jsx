import React from "react"
import { Droppable } from "react-beautiful-dnd"
import RootRef from "@material-ui/core/RootRef"
import List from "@material-ui/core/List"
import ListItemCustom from "./ListItemCustom"
import { Typography } from "@material-ui/core"


const Column = ({ column, openBoardModal }) => {

  return (
    <div style={{
      textAlign: "-webkit-center"
    }}>
      <div
        style={{
          backgroundColor: "rgb(128 0 128 / 28%)",
          color: "black",
          width: 247,
          fontWeight: "700",
          textAlign: "center",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          margin: "auto auto -9px auto",
        }}
      >
        <Typography variant={"h5"}>{column.id}</Typography>
      </div>
      <div
        style={{
          backgroundColor: "purple",
          margin: 10,
          paddingTop: 10,
          color: "white",
          width: 247,
          borderRadius: '20px',
          fontWeight: "bold",
          textAlign: "center",
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0
        }}
      >
        <Droppable droppableId={column.id}>
          {(provided) => (
            <RootRef rootRef={provided.innerRef}>
              <List>
                {column.data.map((itemObject, index) => {
                  return <ListItemCustom
                    openBoardModal={openBoardModal}
                    taskStatus={column.id}
                    index={index}
                    itemObject={itemObject}
                  />;
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

export default Column
