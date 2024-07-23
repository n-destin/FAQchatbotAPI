import React, { useState } from "react";

const ChatWindow = ({messages, ondSend}) => {
    const [input, setInput] = useState("")
    const handleSend = ()=>{
        if(input.trim() !== " "){
            ondSend(input)
            setInput("")
        }
    }
    return(
        <div className="w-3/4  flex flex-col h-full p-4 bg-gray-100"
        style={{width : "75%", display : "flex", flexDirection :'column', height  : '99%', padding : '5px', backgroundColor : '#f3f4f6' }}>
            <div className="flex-grow overflow-auto bg-white p-4 rounded-sm" style={{
                flexGrow : 1, 
                overflowY : 'auto',
                backgroundColor : 'white',
                padding : '16px',
                borderRadius : '4px',
                boxShadow : '0 1px 3px rgba(0,0,0, 0.1)'
            }}>
                {messages.map((message, index)=>{
                    <div key={message.key} style={{
                        marginBottom : '16px',
                        padding : '8px',
                        borderRadius : '4px',
                        maxWidth : '50%',
                        backgroundColor : message.sender == "user "  ? "#3b82f6" : '#e5e7eb',
                        color : message.sender == "user" ? 'white' : 'black',
                        alignSelf : message.sender == "user" ? 'flex-end' : 'flex-start'
                    }} className={`mb-4 p-2 rounded-md max-w-xs ${message.sender === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 self-start'}`}>
                        {message.text}
                    </div>
                })}
            </div>
            <div className="flex mt-4">
                <input type="text"
                style={{
                    width : "90%",
                    height : '1.5rem',
                    flexGrow : 1,
                    padding : '5px',
                    border : 'none',
                    borderRadius  : '4px 0 0 4px',
                    outline : 'none',
                    boxShadow : '0 1px 3px rgba(0,0,0, 0.1)'
                }}
                className="flex-grow p-2 border rounded-l-md focus:outline-none focus:rind focus:border-blue-300"
                value = {input}
                onChange={(event)=>{setInput(event.target.value)}} 
                onKeyDown={(event)=>{event.key == "Enter" && handleSend()}}/>
                <button onClick={handleSend}
                style={{
                    height : '2.2rem',
                    width : '3.5rem',
                    backgroundColor : '#3b82f6',
                    color : 'white',
                    padding : '8px 8px',
                    border : 'none',
                    margin : '5px 5px 5px 10px',
                    borderRadius : '0 4px 4px 0',
                    cursor : 'pointer',
                    boxShadow : '0 1px 3px rgba(0,0,0, 0.1)'
                }}
                 className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:rind focus:ring-blue-300">
                    Send
                </button>
            </div>
        </div>
    )
}

export default ChatWindow;