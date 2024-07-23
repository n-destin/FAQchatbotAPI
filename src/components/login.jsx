import axios from "axios";
// import dotenv from "dotenv"
import React, { useState } from "react";
const base_url = "http://127.0.0.1:8000/chatbot/"
// dotenv.config({silent : true}) // call only when needed

const Login = () =>{

    // This has login and crate account
    
    const [email, setEmail] = useState("")
    const[rendered, setRendered] = useState("Register")
    const[renderLogin, setRenderLogin] = useState(true)
    const [first_name, setFirstName] = useState("")
    const[last_name, setLastName] = useState("")
    const[username,  setUsername] = useState("")

    function authentication_request(event, type){
        if(type == "Login"){
            let request_url = base_url + "authenticate/login"
            axios.post(request_url, {email: email}).then((response)=>{
                localStorage.setItem({token : token})
            })
        }else{
            axios.post(base_url + "authenticate/register", {email:email, first_name: first_name, last_name:last_name, user_name : username}).then((response)=>{
                console.log(response)
            }).then((response)=>{

            })
        }
    }


    function handleFirstName(event){
        setFirstName(event.target.value)
    }
    
    function handleLastName(event){
        setLastName(event.target.value)
    }

    function handleEmail(event){
        setEmail(event.target.value)
    }
    

    const changeRender = () =>{
        (rendered === "Login")? setRendered("Register") : setRendered("Login")
        setRenderLogin(!renderLogin)
    }

    function handleUsername(event){
        setUsername(event.target.value);
    }

    return (
        <div>
                <div>
                    {renderLogin? (
                        <div>
                            <input type="text" value={email} onChange={handleEmail} />
                            <button onClick={(event) => {authentication_request(event, "Login")}}>Login</button>
                        </div>
                    ) : (
                        <div>
                            <input type="text" onChange={handleFirstName} />
                            <input type="text" onChange={handleLastName} />
                            <input type="text" onChange={handleEmail} />
                            <input type="text" onChange={handleUsername} />
                            <button onClick={(event)=>{authentication_request(event, "register")}}>Register</button>
                        </div>
                    )}
                </div>
                <button onClick={changeRender}>{rendered}</button>
        </div>
    );
}

export default Login;