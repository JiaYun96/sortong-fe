import React, { useState, useCallback, useEffect, useRef } from "react"
import { Container, makeStyles, Grid } from "@material-ui/core"
import { DragDropContext } from "react-beautiful-dnd"
import CssBaseline from '@material-ui/core/CssBaseline'
import { withCookies } from 'react-cookie'
import { ToastContainer, toast } from "react-toastify"
import axios from "axios"
import { useHistory } from "react-router-dom"

//importing customised components
import Column from "./Column"
import Add from "../components/Add"

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
  },
  
  addBoard: {
    right: '30%',
    bottom: '35px',
    position: 'fixed'
  },

  boardTitle: {
    textAlign: "center",
    padding: "40px",
    fontSize: "2.7em",
    fontWeight: "bold",
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    textTransform: "capitalize"
  }
}));

let initialColumns = {
  Pending: {
    id: "Pending",
    list: [
      // { id: "item 1", title: "title 1", desc: "description 1" },
      // { id: "item 2", title: "title 2", desc: "description 2" },
      // { id: "item 3", title: "title 3", desc: "description 3" }
    ]
  },
  Doing: {
    id: "Doing",
    list: [
      // { id: "item 4", title: "title 4", desc: "description 4" },
      // { id: "item 5", title: "title 5", desc: "description 5" },
      // { id: "item 6", title: "title 6", desc: "description 6" }
    ]
  },
  Completed: {
    id: "Completed",
    list: [
      // { id: "item 7", title: "title 7", desc: "description 7" },
      // { id: "item 8", title: "title 8", desc: "description 8" },
      // { id: "item 9", title: "title 9", desc: "description 9" }
    ]
  }
};

const allCards = {
  Pending: {
    id: "Pending",
    data: []
  },
  Doing: {
    id: "Doing",
    data: []
  },
  Completed: {
    id: "Completed",
    data: []
  }
}

const Board = (props) => {
  let history = useHistory()
  const childRef = useRef()
  const classes = useStyles()
  const { boardId, boardTitle } = props
  const [, updateState] = useState()
  const [columns, setColumns] = useState(initialColumns)
  const [authToken, setAuthToken] = useState(props.cookies.get('auth_token'))
  const [userId, setUserId] = useState(props.cookies.get('userId'))

  useEffect(() => {
    getAllCards();
  }, [])

  const forceUpdate = useCallback(() => updateState({}), []);

  const axiosConfig = {
    headers: { 'x-access-token': authToken }
  }

  const cardStatusGenerator = (val) => {
    let status = null;
    if (typeof val == 'number') {
      const intStatus = parseInt(val);
      switch (intStatus) {
        case 1:
          status = "pending";
          break;

        case 2:
          status = "doing";
          break;

        case 3:
          status = "completed";
          break;
      }

    } else if (typeof val == 'string') {
      const textStatus = val.toString().toLowerCase()
      switch (textStatus) {
        case "pending":
          status = 1;
          break;

        case "doing":
          status = 2;
          break;

        case "completed":
          status = 3;
          break;
      }
    }
    return status
  }

  const handleCardsIndices = (array) => {
    let draggedItemList = []
    const unDraggedItemList = []
    for (let index = 0; index < array.length; index++) {
      const element = array[index]
      if (element.cardIndex > 0) {
        draggedItemList[element.cardIndex - 1] = element
      } else {
        unDraggedItemList.push(element)
      }
    }
    draggedItemList = draggedItemList.filter(Object)
    const updatedArray = draggedItemList.concat(unDraggedItemList)
    return updatedArray
  }

  const handleInvalidUser = () => {
    console.log('No user Logged In, Please login again')
    setTimeout(() => {
      history.push("/login")
    }
      , 3500);
    toast.warning("Invalid User, Please Login Again")
  };

  const handleInvalidBoard = () => {
    console.log('Invalid Board!')
    setTimeout(() => {
      history.push("/boards")
      window.location.reload()
    }
      , 3500);
    toast.warning("Invalid Board!")
  };

  const handleInvalidCard = () => {
    console.log('Invalid Card!')
    setTimeout(() => {
      history.push("/boards")
      window.location.reload()
    }
      , 3500);
    toast.warning("Invalid Card!")
  };

  const updateLocalColumns = (cards) => {
    const pendingCards = []
    const doingCards = []
    const completedCards = []
    for (let index = 0; index < cards.length; index++) {
      const card = cards[index]
      if (card && card.cardStatus) {
        switch (card.cardStatus) {
          case 1:
            pendingCards.push(card)
            break;
          case 2:
            doingCards.push(card)
            break;
          case 3:
            completedCards.push(card)
            break;
        }
      }
    }
    allCards.Pending.data = handleCardsIndices(pendingCards)
    allCards.Doing.data = handleCardsIndices(doingCards)
    allCards.Completed.data = handleCardsIndices(completedCards)
    forceUpdate()
  }

  // Get all cards for user for board

  const getAllCards = () => {
    if (userId) {
      if (boardId) {
        axios.get(`${process.env.REACT_APP_BACKEND_API_BASE_URL}/api/v1/cards/${userId}/${boardId}`, axiosConfig)
          .then(response => {
            if (response && response.data) {
              const { data } = response.data;
              if (data && data.length) {
                updateLocalColumns(data);
              } else {
                childRef.current.handleUpdateStatus("warning", `No Cards Available!`)
              }
            } else {
              childRef.current.handleUpdateStatus("error", `Unable to Fetch Cards!`)
            }
          })
          .catch(err => {
            console.log('Error while fetching all Cards : ', err)
            childRef.current.handleUpdateStatus("error", `Error in Fetching Cards!`)
          })
      } else {
        handleInvalidBoard()
      }
    } else {
      handleInvalidUser()
    }
  }

  // Update individual existing card for a board

  const updateCard = (data) => {
    const { cardId, reqBody } = data
    if (userId) {
      if (boardId) {
        if (cardId) {
          axios.patch(`${process.env.REACT_APP_BACKEND_API_BASE_URL}/api/v1/cards/${userId}/${boardId}/${cardId}`,
            reqBody,
            axiosConfig
          )
            .then(response => {
              if (response && response.data) {
                const { success, message } = response.data
                if (success == true) {
                  getAllCards()
                  childRef.current.handleUpdateStatus("success", `${message} ✔`)
                } else {
                  childRef.current.handleUpdateStatus("error", `Unable to Update!`)
                }
              }
            })
            .catch(err => {
              console.log('Error while Updating Card : ', err)
              childRef.current.handleUpdateStatus("error", `Error in Updating Card!`)
            })
        } else {
          handleInvalidCard()
        }
      } else {
        handleInvalidBoard()
      }
    } else {
      handleInvalidUser()
    }
  }

  // Create new card for board for user

  const createCard = (data) => {
    const { reqBody } = data;
    if (userId) {
      if (boardId) {
        axios.post(`${process.env.REACT_APP_BACKEND_API_BASE_URL}/api/v1/cards/${userId}/${boardId}`,
          reqBody,
          axiosConfig
        )
          .then(response => {
            if (response && response.data) {
              const { success, data } = response.data
              if (success == true && data && data.cardId) {
                getAllCards();
                childRef.current.handleUpdateStatus("success", `Card Created`)
              } else {
                childRef.current.handleUpdateStatus("error", `Unable to Create Card!`)
              }
            }
          })
          .catch(err => {
            console.log('Error while Creating New Card : ', err)
            childRef.current.handleUpdateStatus("error", `Error in Creating Card!`)
          });
      } else {
        handleInvalidBoard()
      }
    } else {
      handleInvalidUser()
    }
  }

  // Delete individual card from board for user

  const deleteCard = (data) => {
    const cardId = data
    if (userId) {
      if (boardId) {
        if (cardId) {
          axios.delete(`${process.env.REACT_APP_BACKEND_API_BASE_URL}/api/v1/cards/${userId}/${boardId}/${cardId}`,
            axiosConfig
          )
            .then(response => {
              if (response && response.data) {
                const { success, message } = response.data;
                if (success == true) {
                  getAllCards();
                  childRef.current.handleUpdateStatus("success", `${message} ✔`)
                } else {
                  childRef.current.handleUpdateStatus("error", `Unable to Delete!`)
                }
              }
            })
            .catch(err => {
              console.log('Error while Deleting Card : ', err)
              childRef.current.handleUpdateStatus("error", `Error in Deleting Card`)
            })
        } else {
          handleInvalidCard()
        }
      } else {
        handleInvalidBoard()
      }
    } else {
      handleInvalidUser()
    }
  }

  const handleBoardUpdate = async (data) => {
    const { cardId, cardTitle, cardDescription, actionType } = data
    if (cardTitle || cardDescription || cardId) {
      const cardData = {}
      const reqBody = {}
      if (cardTitle) reqBody.title = cardTitle
      if (cardDescription) reqBody.desc = cardDescription
      cardData.reqBody = reqBody

      if (actionType === 'save') {

        if (cardId) {
          cardData.cardId = cardId
          // API to update existing card
          updateCard(cardData)
        } else {
          // API to create new card
          createCard(cardData)
        }

      } else if (actionType === 'delete') {

        if (cardId) {
          // API to delete a card
          deleteCard(cardId);
        } else {
          childRef.current.handleUpdateStatus("warning", "Provide Valid Details!")
        }

      }
    } else {
      childRef.current.handleUpdateStatus("warning", "Provide Valid Details!")
    }
  }

  const handleBoardModal = (openModal, cardStatus, cardId) => {
    let cardDataToUpdate = {};
    if (openModal === true) {
      const cards = allCards[cardStatus].data;
      cards.map(card => {
        if (card.cardId === cardId) cardDataToUpdate = card;
      })
      childRef.current.handleOpenModal(true, cardStatus, cardDataToUpdate);
    }
  }


  /*
    TODO: 
      each column has to have a unique id, each item has to have a unique id and ideally consecutive else funky things happen
      each droppable has to have a unique id, each draggable also - cannot stress this enough because that is the only way
      the framework knows how what went from which list
  */

  const onDragEnd = ({ source, destination }) => {
    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null

    // Make sure we're actually moving the item
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null


    //---------------------> UPDATING CARD STATUS <---------------------//
    const cardToBeUpdated = allCards[source.droppableId].data[source.index]
    const cardCurrentStatus = source.droppableId.toLowerCase()
    const cardStatusToBeUpdated = destination.droppableId.toLowerCase()
    const cardStatus = cardStatusGenerator(cardToBeUpdated.cardStatus)
    const cardData = {
      cardId: cardToBeUpdated.cardId,
      reqBody: {}
    }
    if (cardStatusToBeUpdated && cardStatusToBeUpdated != '') {
      if (cardStatus === cardCurrentStatus && cardStatus !== cardStatusToBeUpdated) {
        const statusToBeUpdated = cardStatusGenerator(cardStatusToBeUpdated)
        if (statusToBeUpdated && typeof statusToBeUpdated === 'number') {
          cardData.reqBody.status = statusToBeUpdated
          updateCard(cardData)
        } else {
          // console.log("Unable to update card")
          childRef.current.handleUpdateStatus("error", "Unable to update card")
        }
      }
    }


    //---------------------> UPDATE CARD INDEX <---------------------//
    const cardIndexToBeUpdated = destination.index ? destination.index + 1 : null
    if (cardIndexToBeUpdated) {
      cardData.reqBody.index = cardIndexToBeUpdated
    }


    // Set start and end variables
    const start = columns[source.droppableId]
    const end = columns[destination.droppableId]

    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      console.log(start)
      const newList = start.list.filter((_, idx) => idx !== source.index)

      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.list[source.index])

      // Then create a new copy of the column object
      const newCol = {
        id: start.id,
        list: newList
      }

      // Update the state
      setColumns((state) => ({ ...state, [newCol.id]: newCol }))
      return null
    } else {

      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.list.filter((_, idx) => idx !== source.index)

      // Create a new start column
      const newStartCol = {
        id: start.id,
        list: newStartList
      }

      // Make a new end list array
      const newEndList = end.list

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.list[source.index])

      // Create a new end column
      const newEndCol = {
        id: end.id,
        list: newEndList
      }

      // Update the state
      setColumns((state) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol
      }))
      return null
    }
  };

  
  return (
    <Container className={classes.container} justify="center">
      
      <div className={classes.boardTitle}>
        {boardTitle}
      </div>

      <CssBaseline />

      <DragDropContext onDragEnd={onDragEnd}>

        <Grid container direction={"row"} justify={"center"}>
          {Object.values(allCards).map((column) => {
            return (
              <Grid item>
                <Column openBoardModal={handleBoardModal} column={column} key={column.id} />
              </Grid>
            )
          })}
        </Grid>

      </DragDropContext>

      <div >
        <Add
          ref={childRef}
          handleBoardUpdate={handleBoardUpdate}
          className={classes.addBoard}
          val={true}
        />
      </div>

      <ToastContainer
        autoClose={3000}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
      />
    </Container>
  );
};

export default withCookies(Board)