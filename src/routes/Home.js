import { dbService } from "./fnbase";
import { collection } from "firebase/firestore";
import { onSnapshot, query, orderBy } from "firebase/firestore";
import React, { useState , useEffect} from "react";
import Nweet from "../components/Nweet";
//
import NweetFactory from "../components/NweetFactory";






const Home = ({userObj}) =>{
  
   // console.log(userObj);
    
    const [nweets, setNweets] = useState([]);
    

   useEffect(() => {
    const q = query(
    collection(dbService, "nweets"),
    orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
    const nweetArr = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    }));
    setNweets(nweetArr);
    });
    }, []);

        //console.log(nweets);


            return (
            <div className="container">
            <>  
            <NweetFactory userObj={userObj} />
            <div style={{marginTop: 30}}>
                {nweets.map((nweet)=>(
                   // <div key={nweet.id} >

                     //   <h4>{nweet.nweet}</h4>
                       
                   // </div>
                   <Nweet 
                    key={nweet.id}
                    nweetObj={nweet}
                    isOwner = {nweet.creatorId === userObj.uid}
                    />
                ))} 
            </div>     
            </>
            </div>
            );
        };
    

        export default Home;