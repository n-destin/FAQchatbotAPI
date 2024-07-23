import React, { useState } from "react";
import ConversationList from "./conversationlist";
import NewConversation from "./newConverstaion";
import ChatWindow from "./chatwindow";


const ChatRoom = ()=>{
    const[conversations, setConversations] = useState([{
        "name" : "Sample conversation",
        "key" :"sample_key",
        "messages" : [{
            "key" : "sample key",
            "sender" : "user",
            "text" : "sample text in conversation"
        }]
    }])

    const [currentConversationIndex, setCurrentConverstaionIndex] = useState(0)
    const [showNewConversation, setShowNewConversation] = useState(false)

    const handleSelectConvesation = (key)=>{
        setCurrentConverstaionIndex(key)
    }

    const handleNewConversation = (name)=>{
        setConversations([...conversations, {name : name, key : "sample key", messages:[]}])
        setShowNewConversation(false)
    }

    const handleSendMessage = (text)=>{
        const newConversations = [...conversations]
        newConversations[currentConversationIndex].messages.push({
            text,
            sender: "user"
        })
        setConversations(newConversations)
    }

    return(
        <div className="chatroom" style={{display:"flex", height:"100%", backgroundColor:"white"}}>
            <ConversationList
            conversations = {conversations}
            onSelect={handleSelectConvesation}
            onNew={()=>{setShowNewConversation(true)}}/>
            {showNewConversation?(
            <NewConversation onCreate = {handleNewConversation}/>
        ) : (
        <ChatWindow messages = {conversations[0].messages}
        onSend = {handleSendMessage}/>
        )}
        </div>
    )
}

export default ChatRoom;