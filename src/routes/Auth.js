import  authService  from './fnbase';
//fnbase찾기
import { useState } from "react";

import  {firebaseInstance} from "./fnbase";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
    } from "firebase/auth";

const Auth = () => {

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
            data = await authService.createUserWithEmailAndPassword(email,password);
        }else{
            //log in
            data = await authService.signInWithEmailAndPassword(email, password);
        }
            console.log(data);
    }catch(error)
    {
        console.log(error);
        setError(error.message);
    }

    }

    const toggleAccount = () => setNewAccount((prev) => !prev);

    const onSocialClick = async (event) => {
        //console.log(event.target.name);

        // const {
        //     target: { name },
        // } = event;
        // let provider;
        // if (name === "google") {
        //     // 책 provider = new firebaseInstance.auth.GoogleAuthProvider();
        //     //provider = new GoogleAuthProvider();
        //     provider = new GoogleAuthProvider();

        // } else if (name === "github") {
        //     //provider = new firebaseInstance.auth.GithubAuthProvider();
        //     provider = new GithubAuthProvider();
        // }

        // //const data = await authService.signInWithPopup(provider);
        // await signInWithPopup(authService, provider);
        // //console.log(error);
        const name = event.target.name;
        let provider;
        if (name === "google") {
        provider = new GoogleAuthProvider();
        } else if (name === "github") {
        provider = new GithubAuthProvider();
        }
        const data = await signInWithPopup(authService, provider);

    };

  return (
    <div>
        <form onSubmit={onSubmit}>
            <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange}/>
            <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange}/>
            <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
            {error}
        </form>

        <span onClick={toggleAccount}>
            {newAccount ? "Sign In" : "Create Account"}
        </span>

        <div>
            <button onClick={onSocialClick} name="google">Continue with Google</button>
            <button onClick={onSocialClick} name="github">Continue with Github</button>
        </div>

    </div>

  );
    
};

export default Auth;