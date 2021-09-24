import {
  Grid,
  Container,
  makeStyles,
  Button,
  Snackbar,
  ButtonGroup,
  TextField
} from "@material-ui/core"
import Post from "./Post"
import AddIcon from '@material-ui/icons/Add'
import Board from "../sample/Board"
import React, { useState, useCallback, useRef, useEffect } from "react"
import MuiAlert from "@material-ui/lab/Alert"
import { withCookies } from 'react-cookie'
import { ToastContainer, toast } from "react-toastify"
import axios from "axios"
import { useHistory } from "react-router-dom"
import Tooltip from '@material-ui/core/Tooltip'
import Modal from '@material-ui/core/Modal'


// const postList = [
//   { id: "9v8fga", title: "Payroll Matters", img: "https://images.pexels.com/photos/7319337/pexels-photo-7319337.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" },
//   { id: "8lct7o", title: "Settle staff issues", img: "https://images.pexels.com/photos/7363671/pexels-photo-7363671.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" },
//   { id: "qc8tc4", title: "Do filing", img: "https://images.pexels.com/photos/7245535/pexels-photo-7245535.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" },
//   { id: "mr4yek", title: "Recipes That", img: "https://images.pexels.com/photos/7245477/pexels-photo-7245477.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" },
//   { id: "zlsb4l", title: "Shortcut Travel Guide", img: "https://images.pexels.com/photos/7078467/pexels-photo-7078467.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" },
//   { id: "uiobgh", title: "Killer Actions", img: "https://images.pexels.com/photos/7833646/pexels-photo-7833646.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" }
// ]


const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
  },

  boardsGridContainer: {
    justifyContent: "space-around"
  },

  addNewPost: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
    fontSize: "larger",
    border: "1px solid #c4c4c4",
    width: "fit-content",
    height: "31px",
    margin: "40px auto",
    cursor: "pointer"
  },

  paper: {
    position: 'absolute',
    width: "23%",
    minWidth: "fit-content",
    top: '50% !important',
    left: '50% !important',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: '50px 50px 60px 50px',
    transform: "translate(-50%, -50%)"
  },

  postActionModal: {
    width: "fit-content",
    display: "grid",
    margin: "auto"
  },
  postModalTitle: {
    margin: "auto",
    paddingBottom: "30px",
    fontSize: "large",
    fontWeight: "500"
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

const Feed = (props) => {
  let history = useHistory()
  const classes = useStyles()
  const childRef = useRef()
  const [isPostView, setPostView] = useState(true)
  const [boardTitle, setBoardTitle] = useState('')
  const [boardId, setBoardId] = useState('')
  const [posts, setPosts] = useState([])
  const [openAlert, setOpenAlert] = useState(false)
  const [updateStatus, setUpdateStatus] = useState("")
  const [updateMessage, setUpdateMessage] = useState("")
  const [authToken, setAuthToken] = useState(props.cookies.get('auth_token'))
  const [userId, setUserId] = useState(props.cookies.get('userId'))
  const [isNewPost, setIsNewPost] = useState(false)
  const [postTitle, setPostTitle] = React.useState("")
  const [postId, setPostId] = React.useState("")
  const [openModal, setOpenModal] = React.useState(false)
  const [postModalTitle, setPostModalTitle] = React.useState("")

  const axiosConfig = {
    headers: { 'x-access-token': authToken }
  }

  useEffect(() => {
    props.handleVisibility('block')
    getAllPosts()
  }, [])

  const handleInvalidUser = () => {
    console.log('No user logged in - please log in again')
    setTimeout(() => {
      history.push("/login")
    }
      , 3500);
    toast.warning("Invalid user - please log in again");
  };

  const getAllPosts = () => {
    if (userId) {
      axios.get(`${process.env.REACT_APP_BACKEND_API_BASE_URL}/api/v1/boards/${userId}`, axiosConfig)
        .then(response => {
          if (response && response.data) {
            const { data } = response.data;
            if (data && data.length) {
              setPosts(data);
            } else {
              setPosts([]);
              setUpdateStatus("warning");
              setUpdateMessage("No Boards Available!");
              setOpenAlert(true);
            }
          } else {
            setUpdateStatus("error");
            setUpdateMessage("Unable to Fetch Boards!");
            setOpenAlert(true);
          }
        })
        .catch(err => {
          console.log('Error while fetching all boards : ', err)
          setUpdateStatus("error");
          setUpdateMessage("Error in Fetching Boards");
          setOpenAlert(true);
        })
    } else {
      handleInvalidUser();
    }
  };

  const handleCreatePost = (data) => {
    const { title } = data;
    if (userId) {
      if (title) {
        const reqBody = {
          title: title
        }
        axios.post(`${process.env.REACT_APP_BACKEND_API_BASE_URL}/api/v1/boards/${userId}`,
          reqBody,
          axiosConfig
        )
          .then(response => {
            if (response && response.data) {
              const { success } = response.data;
              if (success && success == true) {
                getAllPosts();
                setUpdateStatus("success");
                setUpdateMessage("New Board Created");
                setOpenAlert(true);
              }
            } else {
              console.log(response)
              getAllPosts();
              setUpdateStatus("warning");
              setUpdateMessage("Board NOT Created");
              setOpenAlert(true);
            }
          })
          .catch(err => {
            console.log('Error in Creating A new board : ', err)
            setUpdateStatus("error");
            setUpdateMessage("Error in Creating Board");
            setOpenAlert(true);
          })
      } else {
        setUpdateStatus("warning");
        setUpdateMessage("Nothing To Create");
        setOpenAlert(true);
      }
    } else {
      handleInvalidUser();
    }
  };

  const handleUpdatePost = (data) => {
    const { boardId, title } = data
    if (userId) {
      if (title || boardId) {
        const reqBody = {
          title: title
        }
        axios.patch(`${process.env.REACT_APP_BACKEND_API_BASE_URL}/api/v1/boards/${userId}/${boardId}`,
          reqBody,
          axiosConfig
        )
          .then(response => {
            if (response && response.data) {
              const { success, message } = response.data
              if (success && success == true) {
                getAllPosts();
                setUpdateStatus("success");
                setUpdateMessage(message);
                setOpenAlert(true);
              }
            } else {
              console.log(response)
              getAllPosts()
              setUpdateStatus("warning")
              setUpdateMessage("Board NOT Updated")
              setOpenAlert(true)
            }
          })
          .catch(err => {
            console.log('Error in Creating A new board : ', err)
            setUpdateStatus("error")
            setUpdateMessage("Error in Creating Board")
            setOpenAlert(true)
          })
      } else {
        setUpdateStatus("warning")
        setUpdateMessage("Provide Details To Update")
        setOpenAlert(true)
      }
    } else {
      handleInvalidUser();
    }
  };

  const handleDeletePost = (data) => {
    const { boardId } = data;
    if (userId) {
      if (boardId) {
        axios.delete(`${process.env.REACT_APP_BACKEND_API_BASE_URL}/api/v1/boards/${userId}/${boardId}`,
          axiosConfig
        )
          .then(response => {
            if (response && response.data) {
              const { success, message } = response.data
              if (success && success == true) {
                getAllPosts()
                setUpdateStatus("success")
                setUpdateMessage(message)
                setOpenAlert(true)
              }
            } else {
              console.log(response)
              getAllPosts()
              setUpdateStatus("warning")
              setUpdateMessage("Board NOT Deleted")
              setOpenAlert(true)
            }
          })
          .catch(err => {
            console.log('Error in Deleting the board : ', err)
            setUpdateStatus("error")
            setUpdateMessage("Error in Deleting Board")
            setOpenAlert(true);
          })
      } else {
        setUpdateStatus("warning");
        setUpdateMessage("Provide Details to Delete")
        setOpenAlert(true)
      }
    } else {
      handleInvalidUser()
    }
  };

  const handlePostView = (id, title) => {
    setBoardId(id)
    setBoardTitle(title)
    setPostView(false)
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") 
    return
    setOpenAlert(false)
  };

  const handlePostDetails = ({ actionType, id, titleToUpdate }) => {
    if (actionType === 'save') {
      if (id) {
        const updateBoardData = {
          boardId: id,
          title: titleToUpdate
        }
        handleUpdatePost(updateBoardData)
      } else {
        const newBoardData = {
          title: titleToUpdate,
          img: ''
        }
        handleCreatePost(newBoardData)
      }
    } else if (actionType === 'delete') {
      const dataToDeleteBoard = {
        boardId: id
      }
      handleDeletePost(dataToDeleteBoard)
    }
  };

  const handleOpenModal = (isExistingPost, title) => {
    if (isExistingPost && title) {
      setIsNewPost(false)
      setPostTitle(title)
      setPostModalTitle('Update')
    } else {
      setIsNewPost(true)
      setPostTitle('')
      setPostModalTitle('Create New')
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handlePost = (actionType) => {
    const dataToUpadtePost = {
      titleToUpdate: postTitle,
      actionType: actionType
    }
    if (!isNewPost) dataToUpadtePost.id = postId
    handlePostDetails(dataToUpadtePost)
    setOpenModal(false)
  }

  const handleExistingPost = (data) => {
    const { id, title } = data
    setPostId(id)
    setPostTitle(title)
    handleOpenModal(true, title)
  }


// Render either Boards Post (PostView) OR the specific Board itself (Board) 

  return (

    <>
      {isPostView
        ?
        <Container className={classes.container} display="inline">

          <div
            style={{
              color: "purple",
              marginTop: 10,
              marginBottom: 20,
              fontSize: 30,
              fontWeight: "bold",
              textAlign: "center",
            }}>
            <p>My Current Board Posts</p>
          </div>

          <Tooltip title="Add Board">
            <Button className={classes.addNewPost} onClick={() => handleOpenModal(false, null)}>
              <AddIcon /> Add New
            </Button>
          </Tooltip>

          // Display all boards for user
          <Grid container className={classes.boardsGridContainer}>
            {posts.map(post =>
              <Grid>
                <Post
                  key={post.boardId}
                  ref={childRef}
                  id={post.boardId}
                  img={post.img}
                  title={post.title}
                  handlePostView={handlePostView}
                  handleExistingPost={handleExistingPost}
                />
              </Grid>
            )}
          </Grid>

        </Container>
        :
        
        <Board boardId={boardId} boardTitle={boardTitle} />
      }
      
      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <MuiAlert onClose={handleCloseAlert} severity={updateStatus} elevation={6} variant="filled">
          {updateMessage}
        </MuiAlert>
      </Snackbar>

      <ToastContainer
        autoClose={3000}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
      />

      <Modal
        open={openModal}
      >
        <div className={classes.paper}>
          <div className={classes.postActionModal}>
            <p className={classes.postModalTitle}>{postModalTitle} Board Post Title</p>
            
            <TextField required value={postTitle} onChange={(e) => setPostTitle(e.target.value)}>
            </TextField>
            
            <ButtonGroup className={classes.btnGroup} color="primary" aria-label="contained primary button group">
              <Button className={classes.btns} disabled={postTitle === ''} onClick={() => handlePost('save')}>Save</Button>
              <Button className={classes.btns} style={{ color: "#c36928" }} onClick={() => handleCloseModal()}>Cancel</Button>
              {isNewPost ? null : <Button onClick={() => handlePost('delete')} className={classes.btns} style={{ color: "#de0000" }}>Delete</Button>}
            </ButtonGroup>
          
          </div>
        </div>
      </Modal>

    </>
  );
};

export default withCookies(Feed)