import React from "react"
import {createRoot} from "react-dom/client"
import App from "./components/app"
import { rootReducer } from "./reducers/root_reducer"
import { configureStore } from "@reduxjs/toolkit"
import { action_types } from "./actions/actions"
import { Provider } from "react-redux"
import { useNavigate } from "react-router"
// import "./components/index.css"

// const App = () => <div className="testing">React components belong here</div>
// const navigate = useNavigate()
const store = configureStore({
    reducer : rootReducer
})
const token = localStorage.getItem('token')

if(token){
    store.dispatch({type : action_types.AUTHENTICATE_USER})
    // navigate("/chatroom")
}


const root = createRoot(document.getElementById('main'))
root.render(<React.StrictMode>
    <Provider store={store} >
        <App />
    </Provider>
</React.StrictMode>)