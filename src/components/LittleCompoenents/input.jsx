import React from "react";

const Input = ({placeholder, width, handleChange, margin}) =>{
    return(
        <input placeholder={placeholder} onChange={handleChange} type="text" style={{
            width: width,
            color: "rgb(38, 50, 56)",
            fontWeight: "400",
            fontSize: "14px",
            background: "white",
            padding: "10px 20px",
            borderRadius: "20px",
            outline: "none",
            boxSizing: "border-box",
            border: "2px solid rgba(0, 0, 0, 0.02)",
            textAlign: "center",
            margin : margin
        }}/>
    )
}

export default Input