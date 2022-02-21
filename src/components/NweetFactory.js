import { useState } from "react";
import {dbService, storageService } from "../routes/fnbase";
import { v4 as uuidv4 } from "uuid";
import { addDoc, getDoc , collection } from "firebase/firestore";
import { ref, uploadString ,getDownloadURL } from "@firebase/storage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

import {useEffect} from "react";

const NweetFactory = ({ userObj }) => {
    
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
    //error 
    if (nweet === ""){
        return;
    }


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
<form onSubmit={onSubmit} className="factoryForm">
    <div className="factoryInput__container">
    <input
        className="factoryInput__input"
        name="nweet"
        value={nweet}
        onChange={onChange}
        type="text"
        placeholder="What's on your mind?"
        maxLength={120}
    />
    <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>

      <label htmlFor="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        id="attach-file"
        style={{
          opacity: 0,
        }}
      />
    {attachment && (
        <div className="factoryForm__attachment">
          <img src={attachment} width="50px" height="50px" alt="" />
          <div onClick={onClearAttachment} className="factoryForm__clear">
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
);
};
export default NweetFactory;