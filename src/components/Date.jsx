import  React from 'react' 
import { useState , useEffect } from 'react'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AccessTimeIcon from '@material-ui/icons/AccessTime';


export const DateTime = () => {

    var [date,setDate] = useState(new Date());
    
    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    
    });

    

    return(
        <div
        style={{
            textAlign: "center",
          }}>

    <div      
        style={{
            color: "black",
            marginTop: 10,
            marginBottom: 20,
            fontSize: 30,
            fontWeight: "bold",
            textAlign: "center",
          }}>
            <p><CalendarTodayIcon /> {date.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'})}</p>
            {/* <p>{date.toLocaleTimeString()}</p> */}

        </div>
        </div>
    )
}

export default DateTime