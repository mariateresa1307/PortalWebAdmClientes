import * as React from 'react';
import CircularProgress, {
} from '@mui/material/CircularProgress';



export function GradientCircularProgress() {
  return (
    <div id="loader" style={{ 
      display: "none",
      width: "100%",
      backgroundColor: "#00000078",
      height: "100%",
      position: "fixed",
      top: "0px",
      zIndex: 99999,
      textAlign: "center",
      
  
    }}>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="50%" stopColor="#A8EB12" />
            <stop offset="100%" stopColor="#051937" />
          </linearGradient>
        </defs>
      </svg>
      <div style={{  top:"50%", marginTop:"-20px",     position:  "relative" }}>
      <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />

      </div>
    </div>
  );
}

