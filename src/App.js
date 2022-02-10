import {useState} from "react";

import AppRouter from "./components/Router";
import fbase from "./firebase";


function App() {
    const auth = fbase.auth;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    

   return (
       <>
        <AppRouter isLoggedIn={isLoggedIn} />
        <footer>&copy; {new Date().getFullYear()} sohuitter </footer>
       </>
   );
  
}


export default App;
