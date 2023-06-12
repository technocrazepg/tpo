import { useState } from "react";
import AuthContext from "./authcontext";
const AuthState =(props)=>{
    const [authToken, setAuthToken] = useState("")
    const [name, setName] = useState("")
    const [data, setData] = useState({fname:"", lname:"", email:"", id:"", phone: "", address: "", course: "", department: "", year: "", scholar: ""});
    return(
        <AuthContext.Provider value={{authToken, setAuthToken, name, setName, data, setData}}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthState 