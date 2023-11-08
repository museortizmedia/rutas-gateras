import React from "react";
import { useState, useEffect } from 'react';

import mouse from "../img/mouse.png"
function Mouse() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [ampliacion, setAmpliacion] = useState(70);

    const handlemouse = (e)=>setPosition({x: e.clientX, y: e.clientY});
    const handlemouseclic = (e)=>{
        setAmpliacion(100);
        setTimeout(() => {
            setAmpliacion(70);
          }, ampliacion);
    }
    
    document.body.onmousemove = handlemouse;  
    document.body.onmousedown = handlemouseclic;
    return (
        <>
            <img src={mouse} alt="Imagen"
              className="mycursor"
              width={"auto"} height={ampliacion}
              style={{
                left: position.x-ampliacion/2 + 'px',
                top: position.y-ampliacion/2 + 'px',
                filter: `grayscale(${100-ampliacion}%)`
              }}
            />
        </>
    );
};
export default Mouse;