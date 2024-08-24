import { useDispatch } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
const ROOT_URL = import.meta.env.VITE_API_URL
const api_key = "?key=destin_niyomufasha"


export const action_types = {
    AUTHENTICATE_USER : "AUTHENTICATE_USER",
    DE_AUTHENTICATE_USER : "DE_AUTHENTICATE_USER",
    UPDATE_CONVERSATIONS : "UPDATE_CONVERSATIONS",
    SEND_MESSAGE : "SEND_MESSAGE",
    AUTHENTICATION_ERROR : "AUTHENTICATION_ERROR", 
    UPDATE_MESSAGES : 'UPDATE_MESSAGES',
    UPDATE_CONVERSATION_KEY : "UPDATE_CONVERSATION_KEY"
 }

 export function authenticate_user(email, password, navigate){
    return (dispatch) =>{
        axios.post(`${ROOT_URL}/authenticate/login`, {email:email, password : password}).then((response)=>{
            if(response){

                dispatch({
                    type : action_types.AUTHENTICATE_USER
                })
                console.log(response);
                localStorage.setItem("token", response.data.userToken)
                navigate("/chatroom")
            }
        }).catch((error)=>{
            dispatch({
                type : action_types.AUTHENTICATION_ERROR, 
                payload  : error.response.data
            })
        })
    }

 }


 export function updateMessages(messages){
    return (dispatch)=>{
        dispatch({
            type : action_types.UPDATE_MESSAGES, 
            payload : messages
        })
    }
 }


 export function getConversations(){
    return (dispatch)=>{
        axios.get(`${ROOT_URL}/conversation/all`, {headers : {"Authorization" : `Token ${localStorage.getItem('token')}`}}).then((response)=>{
            dispatch({
                type : action_types.UPDATE_CONVERSATIONS,
                payload : response.data.conversations
            })
        })
    }
 }

export function updateConversationKey(conversationKey){
    return (dispatch)=>{
        dispatch({
            type : action_types.UPDATE_CONVERSATION_KEY,
            payload : conversationKey
        })
    }
}

export function create_conversation(conversation_name){
    return (dispatch)=>{
        axios.post(`${ROOT_URL}/conversation/create`, {conversation_name : conversation_name}, {headers : {"Authorization" : `Token ${localStorage.getItem("token")}`}}).then((response)=>{
            dispatch({
                type : action_types.UPDATE_CONVERSATIONS,
                payload : response.data.conversations
            })
            const updateConversationKeyHandler = updateConversationKey(response.data.conversationKey)
            const updateMessagesHandler =  updateMessages(response.data.messages)
            updateConversationKeyHandler(dispatch)
            updateMessagesHandler(dispatch)
        }).catch((error)=>{
            dispatch({
                type : action_types.AUTHENTICATION_ERROR, 
                payload  : error.response.data
            })
        })
    }
 }


 export function create_user(first_name, last_name, email, password, navigate){
    return (dispatch)=>{
        axios.post(`${ROOT_URL}/authenticate/register`, {email:email, first_name: first_name, last_name:last_name, user_name : email, password : password}).then((response)=>{
            if(response){
                dispatch({
                    type : action_types.AUTHENTICATE_USER
                })
                localStorage.setItem("token", response.data.userToken)
                navigate("/chatroom")
            }
        }).catch((error)=>{
            dispatch({
                type : action_types.AUTHENTICATION_ERROR, 
                payload  : error.response.data
            })
        })
    }
 }




 export function handleMessageSend(conversation_key, message){
    return (dispatch)=>{
        axios.post(`${ROOT_URL}/messages/new`, {conversation_key : conversation_key, content : message}, {headers : {"Authorization" : `Token ${localStorage.getItem("token")}`}}).then((response)=>{
            dispatch({
                type : action_types.UPDATE_MESSAGES,
                payload : response.data.messages
            })
        }).catch((error)=>{
            console.log("something wrong happenend", error);
        })
    }
 }

 export function handleSelection(conversation_key){
    return (dispatch)=>{
        axios.get(`${ROOT_URL}/messages/all`, {
            params: { conversationKey: conversation_key },
            headers: { "Authorization": `Token ${localStorage.getItem("token")}` }
        }).then((response)=>{
            console.log(response.data);
            dispatch({
                type: action_types.UPDATE_MESSAGES,
                payload: response.data.messages
            })

            const keyUpdate = updateConversationKey(conversation_key)
            keyUpdate(dispatch)
            
        })
    }
}

