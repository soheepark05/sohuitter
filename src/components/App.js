import {useEffect, useState} from "react";

import AppRouter from "./Router";

import {authService} from "../routes/fnbase";
import { updateProfile } from "firebase/auth";



function App() {
    
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

    const [userObj, setUserObj] = useState(null);

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(user);
                //setUserObj(user);
                setUserObj({
                    uid: user.uid,
                    displayName : user.displayName,
                    //updateProfile: (args) => user.updateProfile(args), 밑에꺼로 수정함
                    updateProfile: (args) => updateProfile(user, {displayName: user.displayName}), //안되면위꺼

                });

            } else {
                setIsLoggedIn(false);
            }
            setInit(true);

        }
        
        );
    },[]);
    
    const refreshUser = () => {
        //setUserObj(authService.currentUser);
       const user = authService.currentUser;
       setUserObj({
         uid: user.uid,
         displayName: user.displayName,
         updateProfile: (args) => user.updateProfile(args),
       });
    };

   return (
       <>
        {init ? (<AppRouter refreshUser={refreshUser} isLoggedIn={isLoggedIn} userObj={userObj}/> 
        ) : ( 
            
            "initializing..." 
            
            )}
        
       </>
   );
  
}


export default App;
