import React, { useEffect, useState } from "react";
import ConversationList from "./conversationlist";
import NewConversation from "./newConverstaion";
import ChatWindow from "./chatwindow";
import axios from "axios";
import { create_conversation, handleMessageSend, handleSelection, getConversations } from "../../actions/actions";
import { useDispatch, useSelector } from "react-redux";



const ChatRoom = ()=>{
    const api_url = "http://127.0.0.1:8000/"
    const dispatch = useDispatch()
    const conversations = useSelector((store) =>{
        return store.conversationReducer.conversations
    })

    const get_conversations = ()=>{
        const conversationsRetrieve = getConversations()
        conversationsRetrieve(dispatch)
    }

    useEffect(()=>{
        get_conversations()
    }, [])


    const messages = useSelector((store)=>{
        return store.conversationReducer.messages;
    })

    const [currentConversationIndex, setCurrentConverstaionIndex] = useState(0)
    const [showNewConversation, setShowNewConversation] = useState(false)
    const conversationKey = useSelector((store)=>{
        return store.conversationReducer.conversationKey
    })

    const handleSelectConvesation = (conversationKey)=>{
        const handleKeySelection = handleSelection(conversationKey)
        handleKeySelection(dispatch)
    }

    // the server should return another conversation
    const handleNewConversation = (name)=>{
        const createConversation = create_conversation(name)
        setShowNewConversation(false)
        createConversation(dispatch)
    }

    const handleSendMessage = (message)=>{
        console.log(conversationKey)
        const handleMessage  = handleMessageSend(conversationKey, message)
        handleMessage(dispatch)
    }

    return(
        <div className="chatroom" style={{display:"flex", height:"100%", backgroundColor:"white", fontFamily : "monospace"}}>
            {showNewConversation?(
            <NewConversation onCreate = {handleNewConversation}/>
        ) : (
            <div style={{
                margin : "0",
                display : "flex",
                flexDirection : "row",
                width : '100%'
            }}>
                <ConversationList
                conversations = {conversations}
                onSelect={handleSelectConvesation}
                onNew={()=>{setShowNewConversation(true)}}/>
                <ChatWindow messages = {messages}
            onSend = {handleSendMessage}/>
            </div>
        )}
        </div>
    )
}

export default ChatRoom;