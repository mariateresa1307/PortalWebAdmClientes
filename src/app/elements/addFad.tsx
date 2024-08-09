import * as React from "react";

import Fab from '@mui/material/Fab';


const CustomAdd = (props:any) => {

  return (
  
     
        <Fab
        onClick={props.onClick}
          variant="extended"
          color="primary"
          style={{
            position: "fixed",
            right: "40px",
            bottom: "40px",
            zIndex: 60,
            padding: "0 56px",
            boxShadow:"rgb(26 35 126 / 38%) 0px 3px 20px 0px, rgb(26 35 126 / 34%) 0px 0px 2px 0px, rgb(26 35 126 / 5%) 0px 1px 2px 0px",
           
          }}
        >
             {props.children}
        </Fab>
     
    
  );
};


export default CustomAdd
