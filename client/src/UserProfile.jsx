//**************First Gen Code**************

// import Header from "./header";
// import './App.css'
// import { useContext, useEffect, useState } from "react"
// import { UserContext } from "./UserContext"
// import { Navigate } from "react-router-dom";

// const API_URL=import.meta.env.VITE_API_URL;

// export default function UserProfile(){
//     const {setUserInfo,userInfo}=useContext(UserContext)
//     const [userProfile,setUserProfile]=useState({});
//     const username=userInfo.username;
//     const [isChanged, setIsChanged] = useState(false);
//     const [redirect,setRedirect]=useState(false);
//     const [isClickedOnce,setIsClickedOnce]=useState(false);
//     const [followerCount,setFollowerCount]=useState(null);
//     const [followingCount,setFollowingCount]=useState(null);

//     const id=userInfo.id;
//     console.log("From User profile",id);
//     useEffect(() => {
//         async function callDB() {

//             const res = await fetch(`${API_URL}/userprofile`, {
//                 method: 'POST',
//                 body: JSON.stringify({id }),
//                 headers: { 'Content-Type': 'application/json' },
//                 credentials: 'include',
//             });
//             const serverRes = await res.json();
//             return serverRes;
//         }

//         async function getFollowers(){
//             const call=await fetch(`${API_URL}/getfollowers/${userInfo.username}`,
//                 { method: 'GET',}
//             )

//             const res=await call.json();
//             return res;
//         }

//         async function getFollowing(){
//             const call=await fetch(`${API_URL}/getfollowing/${userInfo.username}`,{
//                 method:'GET'
//             })

//             const res=await call.json();
//             return res;
//         }
    
//         if (userInfo.username) {
//             (async () => {
//                 const serverRes = await callDB();
//                 console.log("server resppp", serverRes); 
//                 setUserProfile(serverRes)

//                 const getCountFollowers=await getFollowers();
//                 console.log("Follower Count:",parseInt(getCountFollowers.msg.follower_count));
//                 setFollowerCount(getCountFollowers.msg.follower_count)

//                 const getCountFollowing=await getFollowing();
//                 console.log("Following Count:",parseInt(getCountFollowing.msg.follower_count));
//                 setFollowingCount(getCountFollowing.msg.follower_count);
                
//             })();
    
           
//         }
//     }, []);

//     const handleChange = (field, value) => {
//         setUserProfile(prev => ({
//             ...prev,
//             [field]: value
//         }));
//         setIsChanged(true);
//         setIsClickedOnce(true);
//     };

//     console.log("user progile: infor:",userInfo)

//     async function updateProfile(ev){
//         setIsClickedOnce(true);
//         setIsChanged(false);
//         const userProfileData={
//             id:userInfo.id,
//             username:userProfile.username,
//             firstName:userProfile.firstname,
//             lastName:userProfile.lastname,
//             email:userProfile.email
//         }
//         console.log("user data form user profile:   ",userProfileData)
//         try{
//             const responseUpdate =await fetch(`${API_URL}/updateprofile`,{
//             method:'PUT',
//             headers:{
//                 'Content-Type':'application/json'
//             },
//             body:JSON.stringify(userProfileData),
//         });

//        if(responseUpdate.ok) { const updateRes=await responseUpdate.json();
//         console.log("gotten", updateRes)
//         console.log("After update and before setting",userInfo.id);
//         setUserInfo({id:updateRes.id,username:updateRes.username});
//         console.log("After update and after setting",userInfo.id);
//         alert("Profile has been updated succesfully !!!")}
//         setRedirect(true);
//         }
//         catch(err){
//             alert("Server Down, try again later"+err)
//         }


//     }

//     if(redirect){
//         return <Navigate to ={'/'}/>    
//     }

//     return (
//         <div className="profileMain">
//             <Header />
//             <div className="userProfile">
//                 <div className="profileTitle">My Profile</div>

//                 <div className="profileContainer">
//                     <div className="inputGroup">
//                         <label>Pen Name (Anonymity):</label>
//                         <input
//                             type="text"
//                             placeholder="First name"
//                             value={userProfile.username || ''}
//                             onChange={(ev) => handleChange('username', ev.target.value)}
//                         />
//                     </div>

//                     <div className="inputGroup">
//                         <label>First Name:</label>
//                         <input
//                             type="text"
//                             placeholder="Last name"
//                             value={userProfile.firstname || ''}
//                             onChange={(ev) => handleChange('firstname', ev.target.value)}
//                         />
//                     </div>

//                     <div className="inputGroup">
//                         <label>Last Name:</label>
//                         <input
//                             type="text"
//                             placeholder="Pen name"
//                             value={userProfile.lastname || ''}
//                             onChange={(ev) => handleChange('lastname', ev.target.value)}
//                         />
//                     </div>

//                     <div className="inputGroup">
//                         <label>Email:</label>
//                         <input
//                             type="text"
//                             placeholder="Email"
//                             value={userProfile.email || ''}
//                             onChange={(ev) => handleChange('email', ev.target.value)}
//                         />
//                     </div>

//                     <button onClick={updateProfile}
//                         className={`saveButton ${isChanged ? 'active' : 'disabled'}`} 
//                         disabled={!isChanged&&isClickedOnce}
//                     >
//                         Save Changes
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );

// }

// ****************Second Gen Code with follows/following****************

// import Header from "./header";
// import './App.css'
// import { useContext, useEffect, useState } from "react"
// import { UserContext } from "./UserContext"
// import { Navigate } from "react-router-dom";

// const API_URL=import.meta.env.VITE_API_URL;

// export default function UserProfile(){
//     const {setUserInfo,userInfo}=useContext(UserContext)
//     const [userProfile,setUserProfile]=useState({});
//     const username=userInfo.username;
//     const [isChanged, setIsChanged] = useState(false);
//     const [redirect,setRedirect]=useState(false);
//     const [isClickedOnce,setIsClickedOnce]=useState(false);
//     const [followerCount,setFollowerCount]=useState(null);
//     const [followingCount,setFollowingCount]=useState(null);

//     const id=userInfo.id;
//     console.log("From User profile",id);
//     useEffect(() => {
//         async function callDB() {

//             const res = await fetch(`${API_URL}/userprofile`, {
//                 method: 'POST',
//                 body: JSON.stringify({id }),
//                 headers: { 'Content-Type': 'application/json' },
//                 credentials: 'include',
//             });
//             const serverRes = await res.json();
//             return serverRes;
//         }

//         async function getFollowers(){
//             const call=await fetch(`${API_URL}/getfollowers/${userInfo.username}`,
//                 { method: 'GET',}
//             )

//             const res=await call.json();
//             return res;
//         }

//         async function getFollowing(){
//             const call=await fetch(`${API_URL}/getfollowing/${userInfo.username}`,{
//                 method:'GET'
//             })

//             const res=await call.json();
//             return res;
//         }
    
//         if (userInfo.username) {
//             (async () => {
//                 const serverRes = await callDB();
//                 console.log("server resppp", serverRes); 
//                 setUserProfile(serverRes)

//                 const getCountFollowers=await getFollowers();
//                 console.log("Follower Count:",parseInt(getCountFollowers.msg.follower_count));
//                 setFollowerCount(getCountFollowers.msg.follower_count)

//                 const getCountFollowing=await getFollowing();
//                 console.log("Following Count:",parseInt(getCountFollowing.msg.follower_count));
//                 setFollowingCount(getCountFollowing.msg.follower_count);
                
//             })();
    
           
//         }
//     }, []);

//     const handleChange = (field, value) => {
//         setUserProfile(prev => ({
//             ...prev,
//             [field]: value
//         }));
//         setIsChanged(true);
//         setIsClickedOnce(true);
//     };

//     console.log("user progile: infor:",userInfo)

//     async function updateProfile(ev){
//         setIsClickedOnce(true);
//         setIsChanged(false);
//         const userProfileData={
//             id:userInfo.id,
//             username:userProfile.username,
//             firstName:userProfile.firstname,
//             lastName:userProfile.lastname,
//             email:userProfile.email
//         }
//         console.log("user data form user profile:   ",userProfileData)
//         try{
//             const responseUpdate =await fetch(`${API_URL}/updateprofile`,{
//             method:'PUT',
//             headers:{
//                 'Content-Type':'application/json'
//             },
//             body:JSON.stringify(userProfileData),
//         });

//        if(responseUpdate.ok) { const updateRes=await responseUpdate.json();
//         console.log("gotten", updateRes)
//         console.log("After update and before setting",userInfo.id);
//         setUserInfo({id:updateRes.id,username:updateRes.username});
//         console.log("After update and after setting",userInfo.id);
//         alert("Profile has been updated succesfully !!!")}
//         setRedirect(true);
//         }
//         catch(err){
//             alert("Server Down, try again later"+err)
//         }


//     }

//     if(redirect){
//         return <Navigate to ={'/'}/>    
//     }

//     return (
//         <div className="profileMain">
//             <Header />
//             <div className="userProfile">
//                 <div className="profileTitle">My Profile</div>

//                 <div className="profileContainer">
//                     <div className="inputGroup">
//                         <label>Pen Name (Anonymity):</label>
//                         <input
//                             type="text"
//                             placeholder="First name"
//                             value={userProfile.username || ''}
//                             onChange={(ev) => handleChange('username', ev.target.value)}
//                         />
//                     </div>

//                     <div className="inputGroup">
//                         <label>First Name:</label>
//                         <input
//                             type="text"
//                             placeholder="Last name"
//                             value={userProfile.firstname || ''}
//                             onChange={(ev) => handleChange('firstname', ev.target.value)}
//                         />
//                     </div>

//                     <div className="inputGroup">
//                         <label>Last Name:</label>
//                         <input
//                             type="text"
//                             placeholder="Pen name"
//                             value={userProfile.lastname || ''}
//                             onChange={(ev) => handleChange('lastname', ev.target.value)}
//                         />
//                     </div>

//                     <div className="inputGroup">
//                         <label>Email:</label>
//                         <input
//                             type="text"
//                             placeholder="Email"
//                             value={userProfile.email || ''}
//                             onChange={(ev) => handleChange('email', ev.target.value)}
//                         />
//                     </div>

//                     <div className="socialStatsContainer">
//                         <div className="socialStats">
//                             <div className="statBox">
//                                 <span className="statCount">{followerCount || 0}</span>
//                                 <span className="statLabel">Followers</span>
//                             </div>
//                             <div className="statBox">
//                                 <span className="statCount">{followingCount || 0}</span>
//                                 <span className="statLabel">Following</span>
//                             </div>
//                         </div>
//                     </div>

//                     <button onClick={updateProfile}
//                         className={`saveButton ${isChanged ? 'active' : 'disabled'}`} 
//                         disabled={!isChanged&&isClickedOnce}
//                     >
//                         Save Changes
//                     </button>
//                 </div>
//             </div>

//             <style jsx>{`
//                 .profileMain {
//                     font-family: 'Arial', sans-serif;
//                 }
                
//                 .userProfile {
//                     max-width: 800px;
//                     margin: 40px auto;
//                     padding: 30px;
//                     border-radius: 12px;
//                     box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
//                     background-color: white;
//                 }
                
//                 .profileTitle {
//                     font-size: 28px;
//                     font-weight: 700;
//                     margin-bottom: 30px;
//                     color: #333;
//                     text-align: center;
//                     border-bottom: 2px solid #f0f0f0;
//                     padding-bottom: 15px;
//                 }
                
//                 .profileContainer {
//                     display: flex;
//                     flex-direction: column;
//                     gap: 20px;
//                 }
                
//                 .inputGroup {
//                     display: flex;
//                     flex-direction: column;
//                     gap: 8px;
//                 }
                
//                 .inputGroup label {
//                     font-size: 16px;
//                     font-weight: 600;
//                     color: #555;
//                 }
                
//                 .inputGroup input {
//                     padding: 12px 15px;
//                     border: 1px solid #ddd;
//                     border-radius: 6px;
//                     font-size: 16px;
//                     transition: border 0.3s ease;
//                 }
                
//                 .inputGroup input:focus {
//                     border-color: #4a90e2;
//                     outline: none;
//                     box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
//                 }
                
//                 .saveButton {
//                     margin-top: 25px;
//                     padding: 14px;
//                     border: none;
//                     border-radius: 6px;
//                     font-size: 16px;
//                     font-weight: 600;
//                     cursor: pointer;
//                     transition: all 0.3s ease;
//                 }
                
//                 .saveButton.active {
//                     background-color: #4a90e2;
//                     color: white;
//                 }
                
//                 .saveButton.active:hover {
//                     background-color: #3a7bc8;
//                 }
                
//                 .saveButton.disabled {
//                     background-color: #e0e0e0;
//                     color: #888;
//                     cursor: not-allowed;
//                 }
                
//                 /* Social stats styling */
//                 .socialStatsContainer {
//                     margin: 20px 0;
//                     padding: 15px 0;
//                     border-top: 1px solid #eee;
//                     border-bottom: 1px solid #eee;
//                 }
                
//                 .socialStats {
//                     display: flex;
//                     justify-content: center;
//                     gap: 50px;
//                 }
                
//                 .statBox {
//                     display: flex;
//                     flex-direction: column;
//                     align-items: center;
//                     padding: 15px 25px;
//                     background-color: #f8f9fa;
//                     border-radius: 10px;
//                     transition: transform 0.2s ease;
//                 }
                
//                 .statBox:hover {
//                     transform: translateY(-3px);
//                     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
//                 }
                
//                 .statCount {
//                     font-size: 28px;
//                     font-weight: 700;
//                     color: #4a90e2;
//                 }
                
//                 .statLabel {
//                     font-size: 14px;
//                     color: #666;
//                     margin-top: 5px;
//                 }
//             `}</style>
//         </div>
//     );
// }


import Header from "./header";
import './App.css'
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
    const [followerCount,setFollowerCount]=useState(null);
    const [followingCount,setFollowingCount]=useState(null);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'followers', or 'following'

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

        async function getFollowers(){
            const call=await fetch(`${API_URL}/getfollowers/${userInfo.username}`,
                { method: 'GET',}
            )

            const res=await call.json();
            return res;
        }

        async function getFollowing(){
            const call=await fetch(`${API_URL}/getfollowing/${userInfo.username}`,{
                method:'GET'
            })

            const res=await call.json();
            return res;
        }

        async function getFollowersList(){
            const call=await fetch(`${API_URL}/getfollowerslist/${userInfo.username}`,{
                method:'GET'
            })
            
            const res=await call.json();
            return res;
            
        }
        
        async function getFollowingList(){
            const call=await fetch(`${API_URL}/getfollowinglist/${userInfo.username}`,{
                method:'GET'
            })
            
            const res=await call.json();
            return res;
            
        }

        if (userInfo.username) {
            (async () => {
                const serverRes = await callDB();
                console.log("server resppp", serverRes); 
                setUserProfile(serverRes)

                const getCountFollowers=await getFollowers();
                console.log("Follower Count:",parseInt(getCountFollowers.msg.follower_count));
                setFollowerCount(getCountFollowers.msg.follower_count);

                const getCountFollowing=await getFollowing();
                console.log("Following Count:",parseInt(getCountFollowing.msg.follower_count));
                setFollowingCount(getCountFollowing.msg.follower_count);

                const getListFollowers=await getFollowersList();
                console.log("Followers List:    ",getListFollowers.msg);
                setFollowers(getListFollowers.msg || []); 

                const getListFollowing=await getFollowingList();
                console.log("Following List: ", getListFollowing.msg);
                setFollowing(getListFollowing.msg || []); 
                
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

    const renderTabContent = () => {
        switch(activeTab) {
            case 'followers':
                return (
                    <div className="userListContainer">
                        <h3 className="listTitle">People who follow you</h3>
                        {followers.length === 0 ? (
                            <p className="emptyMessage">You don't have any followers yet.</p>
                        ) : (
                            <ul className="userList">
                                {followers.map((follower, index) => (
                                    <li key={index} className="userListItem">
                                        <div className="userAvatar">
                                            {follower.follower_list?.charAt(0).toUpperCase() || '?'}
                                        </div>
                                        <div className="userInfo">
                                            <span className="userName">{follower.follower_list || 'Unknown User'}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                );
                case 'following':
                    return (
                        <div className="userListContainer">
                            <h3 className="listTitle">People you follow</h3>
                            {following.length === 0 ? (
                                <p className="emptyMessage">You're not following anyone yet.</p>
                            ) : (
                                <ul className="userList">
                                    {following.map((followedUser, index) => (
                                        <li key={index} className="userListItem">
                                            <div className="userAvatar">
                                                {followedUser.following_list?.charAt(0).toUpperCase() || '?'}
                                            </div>
                                            <div className="userInfo">
                                                <span className="userName">{followedUser.following_list || 'Unknown User'}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    );
            default:
                return (
                    <div className="profileFormContainer">
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
                );
        }
    };

    return (
        <>
        <Header />
        <div className="profileMain">
            
            <div className="userProfile">
                <div className="profileTitle">My Profile</div>
                
                <div className="socialStatsContainer">
                    <div className="socialStats">
                        <div className="statBox" onClick={() => setActiveTab('followers')}>
                            <span className="statCount">{followerCount || 0}</span>
                            <span className="statLabel">Followers</span>
                        </div>
                        <div className="statBox" onClick={() => setActiveTab('following')}>
                            <span className="statCount">{followingCount || 0}</span>
                            <span className="statLabel">Following</span>
                        </div>
                    </div>
                </div>
                
                <div className="tabNavigation">
                    <button 
                        className={`tabButton ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        Profile
                    </button>
                    <button 
                        className={`tabButton ${activeTab === 'followers' ? 'active' : ''}`}
                        onClick={() => setActiveTab('followers')}
                    >
                        Followers
                    </button>
                    <button 
                        className={`tabButton ${activeTab === 'following' ? 'active' : ''}`}
                        onClick={() => setActiveTab('following')}
                    >
                        Following
                    </button>
                </div>

                <div className="profileContainer">
                    {renderTabContent()}
                </div>
            </div>

            <style jsx>{`
                .profileMain {
                    font-family: 'Arial', sans-serif;
                }
                
                .userProfile {
                    max-width: 800px;
                    margin: 10px auto;
                    padding: 30px;
                    border-radius: 12px;
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
                    background-color: white;
                }
                
                .profileTitle {
                    font-size: 28px;
                    font-weight: 700;
                    margin-bottom: 30px;
                    color: #333;
                    text-align: center;
                    border-bottom: 2px solid #f0f0f0;
                    padding-bottom: 15px;
                }
                
                .profileContainer {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .profileFormContainer {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }
                
                .inputGroup {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                
                .inputGroup label {
                    font-size: 16px;
                    font-weight: 600;
                    color: #555;
                }
                
                .inputGroup input {
                    padding: 12px 15px;
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    font-size: 16px;
                    transition: border 0.3s ease;
                }
                
                .inputGroup input:focus {
                    border-color: #4a90e2;
                    outline: none;
                    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
                }
                
                .saveButton {
                    margin-top: 25px;
                    padding: 14px;
                    border: none;
                    border-radius: 6px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .saveButton.active {
                    background-color: #4a90e2;
                    color: white;
                }
                
                .saveButton.active:hover {
                    background-color: #3a7bc8;
                }
                
                .saveButton.disabled {
                    background-color: #e0e0e0;
                    color: #888;
                    cursor: not-allowed;
                }
                
                /* Social stats styling */
                .socialStatsContainer {
                    margin: 20px 0;
                    padding: 15px 0;
                    border-top: 1px solid #eee;
                    border-bottom: 1px solid #eee;
                }
                
                .socialStats {
                    display: flex;
                    justify-content: center;
                    gap: 50px;
                }
                
                .statBox {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 15px 25px;
                    background-color: #f8f9fa;
                    border-radius: 10px;
                    transition: transform 0.2s ease;
                    cursor: pointer;
                }
                
                .statBox:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
                }
                
                .statCount {
                    font-size: 28px;
                    font-weight: 700;
                    color: #4a90e2;
                }
                
                .statLabel {
                    font-size: 14px;
                    color: #666;
                    margin-top: 5px;
                }
                
                /* Tab Navigation */
                .tabNavigation {
                    display: flex;
                    justify-content: center;
                    margin: 20px 0;
                    border-bottom: 1px solid #eee;
                }
                
                .tabButton {
                    background: none;
                    border: none;
                    padding: 12px 20px;
                    margin: 0 5px;
                    font-size: 16px;
                    font-weight: 500;
                    color: #666;
                    cursor: pointer;
                    position: relative;
                    transition: all 0.2s ease;
                }
                
                .tabButton:hover {
                    color: #4a90e2;
                }
                
                .tabButton.active {
                    color: #4a90e2;
                    font-weight: 600;
                }
                
                .tabButton.active:after {
                    content: '';
                    position: absolute;
                    bottom: -1px;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background-color: #4a90e2;
                    border-radius: 3px 3px 0 0;
                }
                
                /* User List Styling */
                .userListContainer {
                    padding: 10px 0;
                }
                
                .listTitle {
                    font-size: 20px;
                    color: #333;
                    margin-bottom: 20px;
                    text-align: center;
                }
                
                .emptyMessage {
                    text-align: center;
                    color: #888;
                    font-style: italic;
                    padding: 20px;
                }
                
                .userList {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                
                .userListItem {
                    display: flex;
                    align-items: center;
                    padding: 15px;
                    border-bottom: 1px solid #eee;
                    transition: background-color 0.2s ease;
                }
                
                .userListItem:hover {
                    background-color: #f9f9f9;
                }
                
                .userAvatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background-color: #4a90e2;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 18px;
                    font-weight: bold;
                    margin-right: 15px;
                }
                
                .userInfo {
                    display: flex;
                    flex-direction: column;
                }
                
                .userName {
                    font-size: 16px;
                    font-weight: 600;
                    color: #333;
                }
                
                .userBio {
                    font-size: 14px;
                    color: #777;
                    margin-top: 3px;
                }
            `}</style>
        </div></>
        
    );
}
// *************************imporved UI to be integrated later*************************

// import Header from "./header";
// import './App.css'
// import { useContext, useEffect, useState } from "react"
// import { UserContext } from "./UserContext"
// import { Navigate } from "react-router-dom";

// const API_URL=import.meta.env.VITE_API_URL;

// export default function UserProfile(){
//     const {setUserInfo,userInfo}=useContext(UserContext)
//     const [userProfile,setUserProfile]=useState({});
//     const username=userInfo.username;
//     const [isChanged, setIsChanged] = useState(false);
//     const [redirect,setRedirect]=useState(false);
//     const [isClickedOnce,setIsClickedOnce]=useState(false);
//     const [activeTab, setActiveTab] = useState('followers');
    
//     // Sample data for followers and following - replace with actual data from API
//     const [followers, setFollowers] = useState([
//         { id: 1, username: "reader123", avatar: "https://i.pravatar.cc/100?img=1" },
//         { id: 2, username: "bookworm", avatar: "https://i.pravatar.cc/100?img=2" },
//         { id: 3, username: "literaryFan", avatar: "https://i.pravatar.cc/100?img=3" }
//     ]);
    
//     const [following, setFollowing] = useState([
//         { id: 4, username: "writer456", avatar: "https://i.pravatar.cc/100?img=4" },
//         { id: 5, username: "poetryLover", avatar: "https://i.pravatar.cc/100?img=5" }
//     ]);
    
//     const id=userInfo.id;
//     console.log("From User profile",id);
//     useEffect(() => {
//         async function callDB() {

//             const res = await fetch(`${API_URL}/userprofile`, {
//                 method: 'POST',
//                 body: JSON.stringify({id }),
//                 headers: { 'Content-Type': 'application/json' },
//                 credentials: 'include',
//             });
//             const serverRes = await res.json();
//             return serverRes;
//         }
    
//         if (userInfo.username) {
//             (async () => {
//                 const serverRes = await callDB();
//                 console.log("server resppp", serverRes); 
//                 setUserProfile(serverRes)
                
//                 async function getFollowers(){
//                     const res=await fetch(`${API_URL}/getfollowers/${userInfo.username}`,{
//                         method:'GET',
//                     });

//                     const response=await res.json();
//                     console.log("folwoj doc ", response);

//                 }

//                 getFollowers();
                
//             })();
    
//         }


//     }, []);

//     const handleChange = (field, value) => {
//         setUserProfile(prev => ({
//             ...prev,
//             [field]: value
//         }));
//         setIsChanged(true);
//         setIsClickedOnce(true);
//     };

//     console.log("user progile: infor:",userInfo)

//     async function updateProfile(ev){
//         setIsClickedOnce(true);
//         setIsChanged(false);
//         const userProfileData={
//             id:userInfo.id,
//             username:userProfile.username,
//             firstName:userProfile.firstname,
//             lastName:userProfile.lastname,
//             email:userProfile.email
//         }
//         console.log("user data form user profile:   ",userProfileData)
//         try{
//             const responseUpdate =await fetch(`${API_URL}/updateprofile`,{
//             method:'PUT',
//             headers:{
//                 'Content-Type':'application/json'
//             },
//             body:JSON.stringify(userProfileData),
//         });

//        if(responseUpdate.ok) { const updateRes=await responseUpdate.json();
//         console.log("gotten", updateRes)
//         console.log("After update and before setting",userInfo.id);
//         setUserInfo({id:updateRes.id,username:updateRes.username});
//         console.log("After update and after setting",userInfo.id);
//         alert("Profile has been updated succesfully !!!")}
//         setRedirect(true);
//         }
//         catch(err){
//             alert("Server Down, try again later"+err)
//         }
//     }

//     if(redirect){
//         return <Navigate to ={'/'}/>    
//     }

//     return (
//         <div className="profileMain">
//             <Header />
//             <div className="pageWrapper">
//                 <div className="userProfile">
//                     <div className="profileHeader">
//                         <div className="profileAvatar">
//                             {username ? username.charAt(0).toUpperCase() : "U"}
//                         </div>
//                         <div className="profileTitle">My Profile</div>
//                     </div>

//                     <div className="profileContainer">
//                         <div className="inputGroup">
//                             <label>Pen Name (Anonymity):</label>
//                             <input
//                                 type="text"
//                                 placeholder="First name"
//                                 value={userProfile.username || ''}
//                                 onChange={(ev) => handleChange('username', ev.target.value)}
//                             />
//                         </div>

//                         <div className="inputGroup">
//                             <label>First Name:</label>
//                             <input
//                                 type="text"
//                                 placeholder="Last name"
//                                 value={userProfile.firstname || ''}
//                                 onChange={(ev) => handleChange('firstname', ev.target.value)}
//                             />
//                         </div>

//                         <div className="inputGroup">
//                             <label>Last Name:</label>
//                             <input
//                                 type="text"
//                                 placeholder="Pen name"
//                                 value={userProfile.lastname || ''}
//                                 onChange={(ev) => handleChange('lastname', ev.target.value)}
//                             />
//                         </div>

//                         <div className="inputGroup">
//                             <label>Email:</label>
//                             <input
//                                 type="text"
//                                 placeholder="Email"
//                                 value={userProfile.email || ''}
//                                 onChange={(ev) => handleChange('email', ev.target.value)}
//                             />
//                         </div>

//                         <button onClick={updateProfile}
//                             className={`saveButton ${isChanged ? 'active' : 'disabled'}`} 
//                             disabled={!isChanged&&isClickedOnce}
//                         >
//                             Save Changes
//                         </button>
//                     </div>
                    
//                     <div className="socialNetworkSection">
//                         <h2>Network Connections</h2>
                        
//                         <div className="socialStatsBar">
//                             <div className="statBox">
//                                 <span className="statCount">{followers.length}</span>
//                                 <span className="statLabel">Followers</span>
//                             </div>
//                             <div className="statBox">
//                                 <span className="statCount">{following.length}</span>
//                                 <span className="statLabel">Following</span>
//                             </div>
//                         </div>
                        
//                         <div className="connectionTabs">
//                             <button 
//                                 className={activeTab === 'followers' ? 'active' : ''}
//                                 onClick={() => setActiveTab('followers')}
//                             >
//                                 Followers
//                             </button>
//                             <button 
//                                 className={activeTab === 'following' ? 'active' : ''}
//                                 onClick={() => setActiveTab('following')}
//                             >
//                                 Following
//                             </button>
//                         </div>
                        
//                         <div className="connectionList">
//                             {activeTab === 'followers' ? (
//                                 followers.length > 0 ? (
//                                     followers.map(follower => (
//                                         <div className="connectionCard" key={follower.id}>
//                                             <div className="avatarContainer">
//                                                 <img 
//                                                     src={follower.avatar || '/default-avatar.png'} 
//                                                     alt={`${follower.username}'s avatar`} 
//                                                     className="avatar"
//                                                 />
//                                             </div>
//                                             <div className="connectionInfo">
//                                                 <span className="connectionName">{follower.username}</span>
//                                             </div>
//                                             <button className="followButton">View Profile</button>
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <div className="emptyState">
//                                         <p>You don't have any followers yet</p>
//                                     </div>
//                                 )
//                             ) : (
//                                 following.length > 0 ? (
//                                     following.map(followedUser => (
//                                         <div className="connectionCard" key={followedUser.id}>
//                                             <div className="avatarContainer">
//                                                 <img 
//                                                     src={followedUser.avatar || '/default-avatar.png'} 
//                                                     alt={`${followedUser.username}'s avatar`} 
//                                                     className="avatar"
//                                                 />
//                                             </div>
//                                             <div className="connectionInfo">
//                                                 <span className="connectionName">{followedUser.username}</span>
//                                             </div>
//                                             <button className="unfollowButton">Unfollow</button>
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <div className="emptyState">
//                                         <p>You're not following anyone yet</p>
//                                     </div>
//                                 )
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <style jsx>{`
//                 .profileMain {
//                     font-family: 'Poppins', 'Arial', sans-serif;
//                     background-color: #f5f7fa;
//                     min-height: 100vh;
//                     padding-bottom: 60px;
//                 }
                
//                 .pageWrapper {
//                     max-width: 1500px;  /* Increased from 1000px */
//                     width: 90%;         /* Added to ensure responsive behavior */
//                     margin: 0 auto;
//                     padding: 20px;
//                 }
                
//                 .userProfile {
//                     margin: 20px auto;
//                     padding: 0;
//                     border-radius: 16px;
//                     overflow: hidden;
//                     box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
//                     background-color: white;
//                     width: 100%;        /* Added to ensure full width */
//                 }
                
//                 .profileHeader {
//                     background: linear-gradient(135deg, #4a90e2 0%, #2c6cd1 100%);
//                     color: white;
//                     padding: 40px 30px;
//                     display: flex;
//                     align-items: center;
//                     position: relative;
//                 }
                
//                 .profileAvatar {
//                     width: 80px;
//                     height: 80px;
//                     background-color: white;
//                     color: #4a90e2;
//                     border-radius: 50%;
//                     display: flex;
//                     align-items: center;
//                     justify-content: center;
//                     font-size: 32px;
//                     font-weight: 700;
//                     margin-right: 20px;
//                     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
//                     border: 3px solid rgba(255, 255, 255, 0.7);
//                 }
                
//                 .profileTitle {
//                     font-size: 32px;
//                     font-weight: 700;
//                     margin: 0;
//                     text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//                 }
                
//                 .profileContainer {
//                     display: flex;
//                     flex-direction: column;
//                     gap: 24px;
//                     padding: 40px 60px;   /* Increased horizontal padding */
//                     background-color: white;
//                     border-bottom: 1px solid #eee;
//                 }
                
//                 .inputGroup {
//                     display: flex;
//                     flex-direction: column;
//                     gap: 10px;
//                 }
                
//                 .inputGroup label {
//                     font-size: 15px;
//                     font-weight: 600;
//                     color: #555;
//                     display: flex;
//                     align-items: center;
//                 }
                
//                 .inputGroup input {
//                     padding: 14px 16px;
//                     border: 1px solid #e0e0e0;
//                     border-radius: 8px;
//                     font-size: 16px;
//                     transition: all 0.3s ease;
//                     background-color: #f9fbfd;
//                     width: 100%;        /* Ensure inputs take full width */
//                 }
                
//                 .inputGroup input:focus {
//                     border-color: #4a90e2;
//                     outline: none;
//                     box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
//                     background-color: white;
//                 }
                
//                 .saveButton {
//                     margin-top: 10px;
//                     padding: 16px;
//                     border: none;
//                     border-radius: 8px;
//                     font-size: 16px;
//                     font-weight: 600;
//                     cursor: pointer;
//                     transition: all 0.3s ease;
//                     position: relative;
//                     overflow: hidden;
//                 }
                
//                 .saveButton.active {
//                     background: linear-gradient(135deg, #4a90e2 0%, #2c6cd1 100%);
//                     color: white;
//                 }
                
//                 .saveButton.active:hover {
//                     transform: translateY(-2px);
//                     box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
//                 }
                
//                 .saveButton.active:active {
//                     transform: translateY(0);
//                 }
                
//                 .saveButton.disabled {
//                     background-color: #e0e0e0;
//                     color: #888;
//                     cursor: not-allowed;
//                 }
                
//                 /* Social Network Section */
//                 .socialNetworkSection {
//                     padding: 40px 60px;   /* Increased horizontal padding */
//                     background-color: white;
//                 }
                
//                 .socialNetworkSection h2 {
//                     font-size: 24px;
//                     color: #333;
//                     margin-bottom: 30px;
//                     text-align: center;
//                     position: relative;
//                 }
                
//                 .socialNetworkSection h2:after {
//                     content: "";
//                     position: absolute;
//                     bottom: -12px;
//                     left: 50%;
//                     transform: translateX(-50%);
//                     width: 60px;
//                     height: 3px;
//                     background: linear-gradient(90deg, #4a90e2, #2c6cd1);
//                     border-radius: 2px;
//                 }
                
//                 .socialStatsBar {
//                     display: flex;
//                     justify-content: center;
//                     gap: 60px;        /* Increased gap between stat boxes */
//                     margin-bottom: 30px;
//                 }
                
//                 .statBox {
//                     display: flex;
//                     flex-direction: column;
//                     align-items: center;
//                     padding: 20px 25px;
//                     background-color: #f8fbff;
//                     border-radius: 12px;
//                     min-width: 180px;   /* Increased from 140px */
//                     box-shadow: 0 3px 10px rgba(0, 0, 0, 0.04);
//                     border: 1px solid #e8f0fe;
//                     transition: all 0.3s ease;
//                 }
                
//                 .statBox:hover {
//                     transform: translateY(-5px);
//                     box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
//                 }
                
//                 .statCount {
//                     font-size: 32px;
//                     font-weight: 700;
//                     color: #4a90e2;
//                     margin-bottom: 5px;
//                 }
                
//                 .statLabel {
//                     font-size: 14px;
//                     color: #666;
//                 }
                
//                 /* Connection Tabs */
//                 .connectionTabs {
//                     display: flex;
//                     justify-content: center;
//                     gap: 20px;       /* Increased gap */
//                     margin-bottom: 25px;
//                 }
                
//                 .connectionTabs button {
//                     padding: 12px 30px;  /* Wider buttons */
//                     border: none;
//                     background-color: #f0f4f8;
//                     border-radius: 30px;
//                     font-size: 15px;
//                     font-weight: 600;
//                     color: #666;
//                     cursor: pointer;
//                     transition: all 0.3s ease;
//                     box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
//                     min-width: 140px;    /* Added minimum width */
//                     text-align: center;
//                 }
                
//                 .connectionTabs button.active {
//                     background: linear-gradient(135deg, #4a90e2 0%, #2c6cd1 100%);
//                     color: white;
//                     box-shadow: 0 4px 10px rgba(74, 144, 226, 0.3);
//                 }
                
//                 /* Connection List */
//                 .connectionList {
//                     max-height: 450px;
//                     overflow-y: auto;
//                     padding: 15px;
//                     border-radius: 12px;
//                     background-color: #f8fbff;
//                     border: 1px solid #e8f0fe;
//                     scrollbar-width: thin;
//                     scrollbar-color: #d1d5db transparent;
//                 }
                
//                 .connectionList::-webkit-scrollbar {
//                     width: 6px;
//                 }
                
//                 .connectionList::-webkit-scrollbar-track {
//                     background: transparent;
//                 }
                
//                 .connectionList::-webkit-scrollbar-thumb {
//                     background-color: #d1d5db;
//                     border-radius: 20px;
//                 }
                
//                 .connectionCard {
//                     display: flex;
//                     align-items: center;
//                     padding: 18px 24px;   /* Increased horizontal padding */
//                     margin-bottom: 12px;
//                     background-color: white;
//                     border-radius: 10px;
//                     box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
//                     border: 1px solid #f0f0f0;
//                     transition: all 0.3s ease;
//                 }
                
//                 .connectionCard:hover {
//                     transform: translateY(-3px);
//                     box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
//                     border-color: #e8f0fe;
//                 }
                
//                 .avatarContainer {
//                     margin-right: 20px;
//                 }
                
//                 .avatar {
//                     width: 55px;
//                     height: 55px;
//                     border-radius: 50%;
//                     object-fit: cover;
//                     border: 3px solid #e8f0fe;
//                     box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
//                 }
                
//                 .connectionInfo {
//                     flex-grow: 1;
//                 }
                
//                 .connectionName {
//                     font-weight: 600;
//                     color: #333;
//                     font-size: 16px;
//                 }
                
//                 .followButton, .unfollowButton {
//                     padding: 10px 20px;
//                     border: none;
//                     border-radius: 8px;
//                     font-size: 14px;
//                     font-weight: 600;
//                     cursor: pointer;
//                     transition: all 0.3s ease;
//                     min-width: 120px;    /* Added minimum width */
//                     text-align: center;
//                 }
                
//                 .followButton {
//                     background: linear-gradient(135deg, #4a90e2 0%, #2c6cd1 100%);
//                     color: white;
//                 }
                
//                 .followButton:hover {
//                     box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
//                     transform: translateY(-2px);
//                 }
                
//                 .unfollowButton {
//                     background-color: #f0f4f8;
//                     color: #666;
//                 }
                
//                 .unfollowButton:hover {
//                     background-color: #ff5b57;
//                     color: white;
//                     box-shadow: 0 4px 12px rgba(255, 91, 87, 0.3);
//                     transform: translateY(-2px);
//                 }
                
//                 .emptyState {
//                     padding: 40px 20px;
//                     text-align: center;
//                     color: #888;
//                     font-style: italic;
//                     background-color: white;
//                     border-radius: 8px;
//                     border: 1px dashed #ddd;
//                     margin: 10px 0;
//                 }
                
//                 @media (max-width: 992px) {
//                     .pageWrapper {
//                         width: 95%;
//                         padding: 15px;
//                     }
                    
//                     .profileContainer, .socialNetworkSection {
//                         padding: 30px;
//                     }
//                 }
                
//                 @media (max-width: 768px) {
//                     .profileHeader {
//                         flex-direction: column;
//                         text-align: center;
//                         padding: 30px 20px;
//                     }
                    
//                     .profileAvatar {
//                         margin-right: 0;
//                         margin-bottom: 15px;
//                     }
                    
//                     .profileContainer, .socialNetworkSection {
//                         padding: 25px 20px;
//                     }
                    
//                     .statBox {
//                         min-width: 120px;
//                         padding: 15px;
//                     }
                    
//                     .connectionTabs button {
//                         min-width: 100px;
//                         padding: 10px 15px;
//                     }
//                 }
//             `}</style>
//         </div>
//     );
// }