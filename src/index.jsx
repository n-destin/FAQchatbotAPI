import React from "react"
import {createRoot} from "react-dom/client"
import App from "./components/app"
// import "./components/index.css"

// const App = () => <div className="testing">React components belong here</div>

const root = createRoot(document.getElementById('main'))
root.render(<React.StrictMode>
    <App />
</React.StrictMode>)