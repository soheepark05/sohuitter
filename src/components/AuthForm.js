import  {authService}  from '../routes/fnbase';
//fnbase찾기
import { useState } from "react";
//수정
import { getAuth } from 'firebase/auth';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth"

const AuthForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount ] = useState("true");
    const [error, setError] =useState("");

    
    const onChange = (event) => {
        
        const {
            target: {name, value},
        } = event;
        if (name === "email"){
            setEmail(value);
        } else if (name === "password"){
            setPassword(value);
        }

    }
    
    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            let data;
        if(newAccount){
            //create newAccount
            const auth = getAuth();
            data = await createUserWithEmailAndPassword(auth, email,password);
        }else{ 
            //log in 안되면 sign앞에 authService.붙이기 
            const auth = getAuth();
            data = await signInWithEmailAndPassword(auth, email, password);
        }
            //console.log(data);
    }catch(error)
    {
        console.log(error);
        setError(error.message);
    }

    }

    const toggleAccount = () => setNewAccount((prev) => !prev);


    return (
        <div>
            <form onSubmit={onSubmit} className="container">
                <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange} className="authInput"/>
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} className="authInput"/>
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} className="authInput authSubmit" />
                {error && <span className="authError">{error}</span>}
            </form>
    
            <span onClick={toggleAccount} className="authSwitch">
                {newAccount ? "Sign In" : "Create Account"}
            </span>

    
        </div>
    
      );
        
    };
    export default AuthForm;