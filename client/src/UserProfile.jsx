import Header from "./header";
import '/Users/rudrarajpurohit/Desktop/Blog Space/client/src/App.css'
import { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserContext"
import { Navigate } from "react-router-dom";

const API_URL=import.meta.env.VITE_API_URL;

export default function UserProfile(){
    const {setUserInfo,userInfo}=useContext(UserContext)
    const [userProfile,setUserProfile]=useState({});
    const username=userInfo.username;
    const [isChanged, setIsChanged] = useState(false);
    const [redirect,setRedirect]=useState(false);
    const [isClickedOnce,setIsClickedOnce]=useState(false);

    
    const id=userInfo.id;
    console.log("From User profile",id);
    useEffect(() => {
        async function callDB() {

            const res = await fetch(`${API_URL}/userprofile`, {
                method: 'POST',
                body: JSON.stringify({id }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            const serverRes = await res.json();
            return serverRes;
        }
    
        if (userInfo.username) {
            (async () => {
                const serverRes = await callDB();
                console.log("server resppp", serverRes); 
                setUserProfile(serverRes)
                
            })();
    
           
        }
    }, []);

    const handleChange = (field, value) => {
        setUserProfile(prev => ({
            ...prev,
            [field]: value
        }));
        setIsChanged(true);
        setIsClickedOnce(true);
    };

    console.log("user progile: infor:",userInfo)

    async function updateProfile(ev){
        setIsClickedOnce(true);
        setIsChanged(false);
        const userProfileData={
            id:userInfo.id,
            username:userProfile.username,
            firstName:userProfile.firstname,
            lastName:userProfile.lastname,
            email:userProfile.email
        }
        console.log("user data form user profile:   ",userProfileData)
        try{
            const responseUpdate =await fetch(`${API_URL}/updateprofile`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(userProfileData),
        });

       if(responseUpdate.ok) { const updateRes=await responseUpdate.json();
        console.log("gotten", updateRes)
        console.log("After update and before setting",userInfo.id);
        setUserInfo({id:updateRes.id,username:updateRes.username});
        console.log("After update and after setting",userInfo.id);
        alert("Profile has been updated succesfully !!!")}
        setRedirect(true);
        }
        catch(err){
            alert("Server Down, try again later"+err)
        }


    }

    if(redirect){
        return <Navigate to ={'/'}/>    
    }

    return (
        <div className="profileMain">
            <Header />
            <div className="userProfile">
                <div className="profileTitle">My Profile</div>

                <div className="profileContainer">
                    <div className="inputGroup">
                        <label>Pen Name (Anonymity):</label>
                        <input
                            type="text"
                            placeholder="First name"
                            value={userProfile.username || ''}
                            onChange={(ev) => handleChange('username', ev.target.value)}
                        />
                    </div>

                    <div className="inputGroup">
                        <label>First Name:</label>
                        <input
                            type="text"
                            placeholder="Last name"
                            value={userProfile.firstname || ''}
                            onChange={(ev) => handleChange('firstname', ev.target.value)}
                        />
                    </div>

                    <div className="inputGroup">
                        <label>Last Name:</label>
                        <input
                            type="text"
                            placeholder="Pen name"
                            value={userProfile.lastname || ''}
                            onChange={(ev) => handleChange('lastname', ev.target.value)}
                        />
                    </div>

                    <div className="inputGroup">
                        <label>Email:</label>
                        <input
                            type="text"
                            placeholder="Email"
                            value={userProfile.email || ''}
                            onChange={(ev) => handleChange('email', ev.target.value)}
                        />
                    </div>

                    <button onClick={updateProfile}
                        className={`saveButton ${isChanged ? 'active' : 'disabled'}`} 
                        disabled={!isChanged&&isClickedOnce}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );

}