import React from "react";

const ConversationList = ({conversations, onSelect, onNew}) =>{
    console.log(conversations)
    return(
        <div className="w-1/4 bg-blue-200 h-full p-4"
        style={
            {
                width : "25%",
                backgroundColor : "#e2e8f0",
                height : '98%',
                padding : "8px",
                borderRadius : "4px"
            }
        }>
            <div className="flex justify-between items-center mb-4"
            style={{display:"flex", justifyContent:"space-between", alignItems : "center", marginBottom : "16px"}}>
                <h2 className="text-sm font-bold" 
                style={{fontSize:"1.125rem", fontWeight : "bold",}}>Conversations</h2>
                <button 
                onClick={onNew}
                className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600" style={{
                    backgroundColor: "#3b82f6",
                    color:'white',
                    padding: '8px 16px',
                    borderRadius : '4px',
                    cursor :'pointer',
                    border : "none"
                }}>
                    New
                </button>
            </div>
            <ul>
                {conversations.map((conversation)=>{
                    <li key={conversation.key} onClick={()=> onSelect(conversation.key)}
                    className="p-2 bg-white mb-2 rounded-md shadow-md cursor-pointer hover:bg-gray-100" style={{
                        padding : '8px',
                        backgroundColor :'white',
                        marginBottom :'8px',
                        borderRadius : '4px',
                        boxShadow : '0 1px rgba(0,0,0,0.1)',
                        cursor : 'pointer'
                    }}>
                        {conversation.name}
                    </li>
                })}
            </ul>
        </div>
    )
}


export default ConversationList;