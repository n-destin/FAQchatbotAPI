import axios from "axios";
import React, { useState } from "react";
const base_url = "http://127.0.0.1:8000/chatbot"

const Login = () =>{
    
    const [email, setEmail] = useState("")

    function login_request(){
        axios.post(base_url + "/login", {email}).then((response)=>{
            console.log(response)
        })
    }

    function changeEmail(event){
        setEmail(event.target.value);
    }

    return(
        <div>
            {/* <form action="submit"> */}
                <input type="text" onChange={changeEmail} />
                <button onClick={login_request}>Login</button>
            {/* </form> */}
        </div>
    )
}

export default Login;