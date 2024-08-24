import axios from "axios";
// import dotenv from "dotenv"
import React, { useState } from "react";
const base_url = "http://127.0.0.1:8000/chatbot/"
import Button from "./LittleCompoenents/button";
import Input from "./LittleCompoenents/input";
import { authenticate_user } from "../actions/actions";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { create_user } from "../actions/actions";
// dotenv.config({silent : true}) // call only when needed

const Login = () =>{

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // This has login and crate account
    
    const [email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[rendered, setRendered] = useState("Register")
    const[renderLogin, setRenderLogin] = useState(true)
    const [first_name, setFirstName] = useState("")
    const[last_name, setLastName] = useState("")

    function authentication_request(event, type){
        if (type == "Login"){
            const authenticate = authenticate_user(email, password, navigate)
            authenticate(dispatch)
        }else{
            const authenticate = create_user(first_name, last_name, email, password, navigate)
            authenticate(dispatch)
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

    function handlePassword(event){
        setPassword(event.target.value)
    }
    

    const changeRender = () =>{
        (rendered === "Login")? setRendered("Register") : setRendered("Login")
        setRenderLogin(!renderLogin)
    }

    return (
        <div style={{
            width : "50%",
            height : "70%",
            margin : "0em auto",
            borderRadius : ".5em",
            boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px", 
            backgroundColor : "#e2e8f0",
            position : "relative",
            fontFamily : "monospace",
            top : "15%"
        }}>
                <div style={{
                    display : "flex",
                    flexDirection :"column",
                    justifyContent : "center",
                }}>
                    {renderLogin? (
                        <div style={{
                            margin : "7rem auto", 
                            marginBottom : "1em",
                            display : "flex",
                        }}>
                            {/* <Input width="28rem" handleChange={handleEmail} placeholder= "PPG email address" margin = "0"/> */}
                        </div>
                    ) : (
                        <div style={{
                            display : "flex",
                            flexDirection : "column", 
                            margin : "8em auto",
                            marginBottom : "0px"
                        }}>
                            <div style={{
                                display : "flex",
                                flexDirection : "row",
                                justifyContent : "center"
                            }}>
                                <Input handleChange={handleFirstName} width="35%" margin = "20px" placeholder= "First name"/>
                                <Input handleChange={handleLastName} width= "35%" margin = "20px" placeholder= "Last name"/>
                            </div>
                        </div>
                    )}
                <Input handleChange={handleEmail} width= "76%" margin= "0 auto" placeholder= "PPG Email address"/>
                <Input handleChange={handlePassword} width= "76%" margin= "0 auto" placeholder= "Password"/>
                <Button text = {(rendered == "Login" ? "Register" : "Login")} handleClick={(event)=>{authentication_request(event, (rendered == "Login")? "Register" : "Login")}} width= "130px" margin = "35px auto"/>
                </div>
                <div style={{
                    display : "flex",
                    flexDirection : "row",
                    position : "absolute",
                    bottom : "5%",
                    justifyContent : "center",
                    marginRight : "auto",
                    marginLeft : "auto",
                    right  : 0,
                    left : 0
                }}>
                    <p>{(rendered == "Login") ? "If you have an account already" : "If you don't have an account yet"}</p>
                    <Button text = {rendered} handleClick ={changeRender} width = "130px" height= "10%" margin= "8px"/>
                </div>
        </div>
    );
}

export default Login;