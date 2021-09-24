import { createTheme } from "@material-ui/core";
import purple from '@material-ui/core/colors/purple';

export const theme = createTheme({
  palette: {
    primary: {
      main: purple[700],
    },

    secondary: {
      main: '#f44336',
    },
    
    myButton: {
      backgroundColor: "blue",
      color: "white",
      border: "1px solid black",
    },
  },
});