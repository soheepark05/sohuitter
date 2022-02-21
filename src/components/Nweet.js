import { dbService } from "../routes/fnbase";

import { doc, updateDoc, deleteDoc,getFirestore  } from "firebase/firestore";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";



const Nweet = ({ nweetObj , isOwner}) => {
    
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.nweet);


    const onDeleteClick = async() => {
        const ok = window.confirm("정말로 삭제하시겠습니까?");
        console.log(ok);
        if(ok){
            //console.log(nweetObj.id);
            await deleteDoc(doc(getFirestore(),'nweets',nweetObj.id));
           

        }

    };
   
    const toggleEditing = () => setEditing((prev) => !prev);
    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewNweet(value);

    };
    const NweetTextRef =doc(dbService, "nweets", `${nweetObj.id}`);
    
    const onSubmit = async(event) => {
        event.preventDefault();
        console.log(nweetObj.id,newNweet);
        await updateDoc(NweetTextRef, { nweet: newNweet}); setEditing(false);

    };
    
 

    return (
        <div className="nweet">
            {editing ? (
                <>
                    <form onSubmit={onSubmit} className="container nweetEdit">
                        <input onChange={onChange} value={newNweet} required placeholder="Edit your nweet" 
                        autoFocus className="formInput" />

                        <input type="submit" value="update Nweet" className="formBtn" />
                    </form>
                    <button onClick={toggleEditing} className="formBtn cancelBtn">Cancel</button>
                </>

            ) : (

            <>


            <h4>{nweetObj.nweet}</h4> 
            
            {nweetObj.attachmentUrl && (

                <img src={nweetObj.attachmentUrl} width="50px" height= "50px" />
            )}


            {isOwner && ( 
            <>
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
       
            </>
            )}
            </>
            )}
            </div>

    );
};

export default Nweet;