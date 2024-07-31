import React from "react";

const Button = ({text, handleClick, width, height, margin}) =>{
    return(
        <button onClick={handleClick} style={{
            width : width, 
            height : height,
            backgroundColor : "#3b82f6",
            border : "none",
            padding : "8px",
            borderRadius : "1.5em", 
            color : 'white', 
            cursor : 'pointer',
            margin: margin,
        }}>
            {text}
        </button>
    )
}

export default Button;