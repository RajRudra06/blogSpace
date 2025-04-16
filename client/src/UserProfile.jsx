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
                setUserProfile(serverRes)

                const getCountFollowers=await getFollowers();
                setFollowerCount(getCountFollowers.msg.follower_count);

                const getCountFollowing=await getFollowing();
                setFollowingCount(getCountFollowing.msg.follower_count);

                const getListFollowers=await getFollowersList();
                setFollowers(getListFollowers.msg || []); 

                const getListFollowing=await getFollowingList();
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
        try{
            const responseUpdate =await fetch(`${API_URL}/updateprofile`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(userProfileData),
        });

       if(responseUpdate.ok) { const updateRes=await responseUpdate.json();
        setUserInfo({id:updateRes.id,username:updateRes.username});
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