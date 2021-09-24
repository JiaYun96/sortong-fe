import {
  ButtonGroup,
  Button,
  Container,
  Fab,
  makeStyles,
  Modal,
  Snackbar,
  TextField,
  Tooltip,
} from "@material-ui/core"
import { Add as AddIcon } from "@material-ui/icons"
import React, { useState, useImperativeHandle, forwardRef, ref } from "react"
import MuiAlert from "@material-ui/lab/Alert"

const useStyles = makeStyles((theme) => ({
  fab: {
    right: "26%",
    bottom: 35,
    position: "fixed"
  },

  container: {
    width: "25% !important",
    height: "min-content",
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
      height: "100vh",
    }
  },

  form: {
    padding: theme.spacing(2),
  },

  item: {
    marginBottom: theme.spacing(3),
  },

  taskModalTitle: {
    fontSize: "large",
    fontWeight: "500",
    padding: "30px",
    display: "flex",
    justifyContent: "center"
  },

  btnGroup: {
    marginTop: "10%",
    display: "flex",
    justifyContent: "center"
  },

  btns: {
    width: "40%",
    height: "90%"
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const Add = forwardRef((props, ref) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [cardStatus, setCardStatus] = useState("")
  const [cardId, setId] = useState("") 
  const [cardTitle, setTitle] = useState("")
  const [cardDescription, setDesc] = useState("")
  const [updateStatus, setUpdateStatus] = useState("")
  const [updateMessage, setUpdateMessage] = useState("")
  const [taskModalTitle, setTaskModalTitle] = useState("Create New")
  const [isNewTask, setIsNewTask] = useState(false)

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return
    setOpenAlert(false)
  };

  const handleOpenModal = (isExistingTask, cardStatus, data) => {
    if (isExistingTask) {
      const { cardId, cardTitle, cardDescription } = data
      setTaskModalTitle('Update')
      setIsNewTask(false)
      setCardStatus(cardStatus)
      setId(cardId)
      setTitle(cardTitle)
      setDesc(cardDescription)
    }
    setOpen(true)
  };

  const handleTaskDetails = (actionType) => {
    const dataToUpadtePost = {
      cardTitle: cardTitle,
      cardDescription: cardDescription,
      actionType: actionType
    }
    if (!isNewTask) {
      dataToUpadtePost.cardId = cardId;
      dataToUpadtePost.cardStatus = cardStatus;
    }
    props.handleBoardUpdate(dataToUpadtePost);
    setOpen(false)
    setOpenAlert(true)
    setId("")
    setTitle("")
    setDesc("")
  }

  const handleUpdateStatus = (status, message) => {
    if (status) setOpenAlert(true)
    setUpdateStatus(status)
    setUpdateMessage(message)
  }

  const handleCloseModal = () => {
    setId("")
    setTitle("")
    setDesc("")
    setOpen(false)
    setTaskModalTitle("Create New")
  };

  const openCreateTaskModal = () => {
    setIsNewTask(true)
    setOpen(true)
  }

  useImperativeHandle(ref, () => ({
    handleOpenModal: handleOpenModal,
    handleUpdateStatus: handleUpdateStatus
  }));

  return (
    <>
      <Tooltip title="Add Card">
        <Fab color="primary" className={classes.fab} onClick={() => openCreateTaskModal()}>
          <AddIcon />
        </Fab>
      </Tooltip>

      <Modal open={open} className={classes.modal}>
        <Container className={classes.container}>
          <p className={classes.taskModalTitle}>{taskModalTitle} Task</p>

          <form className={classes.form} autoComplete="off">
            
            <div className={classes.item}>
              <TextField
                required={true}
                id="standard-basic"
                label="Title"
                size="small"
                style={{ width: "100%" }}
                value={cardTitle}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className={classes.item}>
              <TextField
                required={true}
                id="outlined-multiline-static"
                multiline
                rows={4}
                placeholder="Describe your task"
                variant="outlined"
                label="Description"
                size="small"
                style={{ width: "100%" }}
                value={cardDescription}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>

            <div className={classes.item}>
              <ButtonGroup
                className={classes.btnGroup}
                color="primary"
                aria-label="contained primary button group"
              >
                <Button
                  className={classes.btns}
                  disabled={cardTitle === '' || cardDescription === ''}
                  onClick={() => handleTaskDetails('save')}
                >
                  {isNewTask ? "Create" : "Update"}
                </Button>
                <Button
                  className={classes.btns}
                  style={{ color: "#c36928" }}
                  onClick={() => handleCloseModal()}
                >
                  Cancel
                </Button>
                {isNewTask ?
                  null
                  :
                  <Button
                    className={classes.btns}
                    style={{ color: "#de0000" }}
                    onClick={() => handleTaskDetails('delete')}
                  >
                    Delete
                  </Button>}
              </ButtonGroup>
            </div>

          </form>
        </Container>
      </Modal>

      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert onClose={handleClose} severity={updateStatus}>
          {updateMessage}
        </Alert>
      </Snackbar>

    </>
  )
})

export default Add