import { dbService , storageService} from "./fnbase";
import { addDoc, getDocs ,collection } from "firebase/firestore";
import { onSnapshot, query, orderBy } from "firebase/firestore";
import React, { useState , useEffect} from "react";
import Nweet from "../components/Nweet";
import { v4 as uuidv4 } from "uuid";

import { ref, uploadString ,getDownloadURL } from "@firebase/storage";




const Home = ({userObj}) =>{
  
    console.log(userObj);
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState("");



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

      const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if (attachment !== "") {
        //파일 경로 참조 만들기
        const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
        //storage 참조 경로로 파일 업로드 하기
        const uploadFile = await uploadString(fileRef, attachment, "data_url");
        console.log(uploadFile);
        //storage에 있는 파일 URL로 다운로드 받기
        attachmentUrl = await getDownloadURL(uploadFile.ref);
        }
        
        //트윗할때, 메시지와 사진도 같이 firestore에 생성
        const nweetPosting = {
        //text : nweets,
        nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        attachmentUrl,
        };
        await addDoc(collection(dbService, "nweets"), nweetPosting);
        setNweet("");
        setAttachment("");
        };
        /*
        try {
            const docRef = await addDoc(collection(dbService, "nweets"), {
            nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            });
            console.log("Document written with ID: ", docRef.id);
            } catch (error) {
            console.error("Error adding document: ", error);
            }
            */
            //setNweet(""); 

            //수정중
            //const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
           // const response = await uploadString(attachmentRef, attachment, "data_url");
            //const attachmentUrl = await getDownloadURL(attachmentRef).then();

            
            
             

            const onChange = ({ target: { value } }) => {
            setNweet(value);
            };


              const onFileChange = (event) => {

                  //console.log(event.target.files);
                  const {
                      target: { files },

                  } = event;
                  const theFile = files[0];

                  const reader = new FileReader();
                  reader.onloadend = (finishedEvent) => {
                    //console.log(finishedEvent);
                    const {
                      currentTarget: { result },
                    } = finishedEvent;
                    setAttachment(result);
                    };
                    
                    reader.readAsDataURL(theFile);
                  };

                  
             

            const onClearAttachment = () => {setAttachment("")};

            return (
            <>  
            <form onSubmit={onSubmit}>
            <input
                    name="nweet"
                     value={nweet}
                     onChange={onChange}
                     type="text"
                     placeholder="What's on your mind?"
                     maxLength={120}
                     />

               <input type= "file" accept="image/*" onChange={onFileChange}/>
               <input type= "submit" value="Nweet" />
               {attachment && (
                 <div>
                    <img src={attachment} width="50px" height="60px"/>
                    <button onClick={onClearAttachment} >Clear</button>
              
                </div>
               )}

            </form>
            <div>
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
            
            );
        };
    

        export default Home;