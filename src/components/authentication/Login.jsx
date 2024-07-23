import React from "react";


const LoginHolder =  (handleChange) =>{
    return(
        <div>
            <input type="text" value={email} onChange={(e) => {handleChange(e, "handle_email")}} />
            <button onClick={login_request}>Login</button>
        </div>
    )
}


export default LoginHolder;