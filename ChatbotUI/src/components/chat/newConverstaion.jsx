import React, { useState } from "react";

const NewConversation = ({onCreate}) =>{
    const [name, setName] = useState("")
    const handleCreate = () =>{
        if(name.trim() !== ''){
            onCreate(name)
            setName('')
        }
    }

    return(
        <div className="w-1/4 bg-gray-200 h-full p-4"
        style={{
            width : "25%",
            backgroundColor : "#e2e8f0",
            height : "30%",
            padding : "16px",
            borderRadius :"4px",
            marginLeft : "35%",
            marginTop : "15%",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            justifyContent : "center",
            fontFamily : "monospace"

        }}>
            <h2 className="text-lg fond-bold mb-4"
            style={{
                fontSize : "1.125rem",
                fontWeight : "bold",
                marginBottom : "16px",
                textAlign : "center"
            }}> New Conversation</h2>
            <input type="text" 
            className="w-full p-2 border rounded-md mb-4 focus:outline-none focus: ring  focus:border-blue-300"
            placeholder="Conversation Name"
            value = {name}
            style={{
                width : "95%",
                padding : "8px",
                border : "1px solid #d1d5db",
                borderRadius : "4px",
                marginBottom : "16px",
                outline : "none"
            }}
            onChange={(event)=>{setName(event.target.value)}}/>
            <button className="w-full bg-blue-500 text-white py-2 roundd-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 "
            onClick={handleCreate}
            style={{
                width : "30%",
                border : "none",
                backgroundColor : "#3b82f6",
                color :"white",
                padding : "8px 16px",
                borderRadius : "4px",
                cursor : "pointer",
                alignSelf : "center"
            }}>
                Create
            </button>
        </div>
    ) 
}


export default NewConversation;