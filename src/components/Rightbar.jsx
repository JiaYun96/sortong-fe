import React from 'react';
import {
  Link,
  Avatar,
  Container,
  ImageList,
  ImageListItem,
  makeStyles,
  Typography,
  Divider,
} from "@material-ui/core";
import DateTime from './Date';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import AnnouncementIcon from '@material-ui/icons/Announcement';

//Fullcalendar and Realted Plugins
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; // needed
import listPlugin from '@fullcalendar/list'; //For List View


const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    paddingTop: theme.spacing(10),
    position: "sticky",
    top: 0,
    backgroundColor: "#eceff1",
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
    color: "#555",
  },
  link: {
    marginRight: theme.spacing(2),
    color: "#555",
    fontSize: 16,
  },
}));


const Rightbar = (props) => {
  const classes = useStyles();

  return (

    <Container className={classes.container} style={{ display: props && props.isVisible }}>
      <DateTime></DateTime>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'today prev next',
          right: 'dayGridMonth,dayGridDay,listWeek'
        }}
        events={[
          { title: 'event 1', date: '2020-08-13' },
          { title: 'event 2', date: '2020-08-15' },
          { title: 'event 2', date: '2020-08-15' },
          { title: 'event 2', date: '2020-08-15' },
          { title: 'event 2', date: '2020-08-15' },
          { title: 'event 2', date: '2020-08-15' },
          { title: 'event 2', date: '2020-08-15' }
        ]}
      /> 
      <br/>
      <br/>
      <br/>
      <div
      style={{
            backgroundColor: "Thistle",
          }}>

      <div      
        style={{
            color: "black",
            marginTop: 20,
            fontSize: 30,
            fontWeight: "bold",
            textAlign: "center",
          }}>
            <p><AnnouncementIcon /> Reminders</p>

        </div>
<TextareaAutosize 
// aria-label="empty textarea" 
placeholder="1. Feed the dog
2. Wash the plates in the sink" 
rowsMin={14} 
style={ { width: "100%" } }/> 
</div>

    </Container>
  )
}
  export default Rightbar;