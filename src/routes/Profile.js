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
        <>
            <form onSubmit={onSubmit}>
                <input 
                onChange={onChange} 
                type="text" 
                placeholder="Display name"
                value={newDisplayName} 
                />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>

    );


};

export default Profile;

