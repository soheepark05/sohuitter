import {authService, dbService} from './fnbase';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '@firebase/auth';

const Profile = ({ userObj , refreshUser }) =>{
    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const onLogOutClick = () => {
        authService.signOut();
        navigate("/");
    };

    const onChange = (event) =>
    {
        const {
            target: {value},

        } = event;
        setNewDisplayName(value);
    };
    const onSubmit = async(event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            //await userObj.updateProfile({displayName: newDisplayName});
            //여기부터
            //await updateProfile(userObj, { displayName: newDisplayName });
            //여기까지 일단 수정한거 blog보고,
            await updateProfile(authService.currentUser, { displayName: newDisplayName });
            refreshUser();
        }
    };

    return (
        <div className="container">
        <>
            <form onSubmit={onSubmit} className="profileForm">
                <input 
                onChange={onChange} 
                type="text" 
                placeholder="Display name"
                value={newDisplayName} 
                autoFocus
                className="formInput"
                />
                <input type="submit" value="Update Profile"
                className='formBtn' style={{ marginTop: 10,}} />
            </form>
            <span className="formBtn cancleBtn logOut" onClick={onLogOutClick}>Log Out</span>
            
        </>
      
        </div>
    );


};

export default Profile;

