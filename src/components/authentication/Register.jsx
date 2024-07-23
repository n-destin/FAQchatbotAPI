import React from "react";

const RegisterHolder = (handleChange) =>{
    return(
        <div>
            <input type="text" value={first_name} onChange={(e) =>{handleChange(e, "first_name")}} />
            <input type="text" value={last_name}  onChange={(e) => handleChange(e, "last_name")} />
            <input type="text" value={email} onChange={(e) => handleChange(e, "handle_email")} />
            <button onClick={login_request}>Register</button>
        </div>
    )
}


export default RegisterHolder;