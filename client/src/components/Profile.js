import React, { useContext, useEffect, useState } from 'react'
import "./css/Profile.css"
import { useNavigate } from 'react-router-dom';
import xClone from "./assets/xClone.jpg";
import { Link } from 'react-router-dom';
import myContext from '../context/myContext.js';
import MyTweet from './MyTweet.js';
const Profile = (props) => {
    const [isFollowed, setIsFollowed] = useState(null);
    const [myPost, setMyPost] = useState([]);
    const [data, setData] = useState({
        name: "name",
        username: "username",
    });
    const { getData, getPost, setFollowData } = useContext(myContext);
    const navigate = useNavigate();
    const performOp = async () => {
        if (data.username === "username") {
            let flag = (props.username === "self" || props.username === localStorage.getItem('username'));
            let tempData = await getData(props.username, setData);
            if (!flag) {
                flag = tempData.followers.reduce((prev, curr) => prev || (curr.username === localStorage.getItem('username')), false);
                setIsFollowed(flag);
            }
            await getPost(props.username, setMyPost);
        }
    }
    useEffect(() => {
        performOp();
        //eslint-disable-next-line
    }, [])
    const goToPreviousPage = () => {
        navigate(-1);
    }
    const handleFollowingClick = (e) => {
        e.preventDefault();
        setFollowData({ data: data.followings, type: "FOLLOWINGS" })
        navigate('/follow');
    }
    const handleFollowerClick = (e) => {
        e.preventDefault();
        setFollowData({ data: data.followers, type: "FOLLOWERS" })
        navigate('/follow');
    }
    const handleFollowClick = (e) => {
        e.preventDefault();
        const host = process.env.REACT_APP_SERVER_HOST;
        if (isFollowed) {
            fetch(`${host}/user/unfollow/${data.username}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': localStorage.getItem('authToken')
                }
            }).catch((err) => { alert("", "Internal Server Error,Please Try Again Later!!!", "red") });
            setIsFollowed(false);
        } else {
            fetch(`${host}/user/follow/${data.username}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': localStorage.getItem('authToken')
                }
            }).catch((err) => { alert("", "Internal Server Error,Please Try Again Later!!!", "red") });
            setIsFollowed(true);
        }
    }

    return (
        <>
            <div className='main-window profile'>
                <div className='d-flex ai-center'>
                    <i onClick={goToPreviousPage} className="fa-solid fa-arrow-left back-btn"></i>
                    <div>
                        <p className='text-primary'>{data.name}</p>
                        <p>{myPost ? myPost.length : 0} posts</p>
                    </div>
                </div>
                <div className='prof-page d-flex fd-col'>
                    <div className='user-info'>
                        <img className='profile-img' src={xClone} alt="" />
                        <p className='text-primary'>{data.name}</p>
                        <p className='text-secondary'>@{data.username}</p>
                        <p className="text-secondary">
                            <i className="fa-solid fa-location-dot mr-5"></i>
                            {data.city}, {data.state}
                        </p>
                        <p className="text-secondary">
                            <i className="fa-regular fa-calendar-days mr-5"></i>
                            {"Joined Date : " + (new Date(data.joinedDate)).toDateString()}
                        </p>
                        <div className='d-flex'>
                            <Link onClick={handleFollowingClick} className='text-link'>
                                {data.followings ? data.followings.length : 0} Following
                            </Link>
                            <Link onClick={handleFollowerClick} className='text-link'>
                                {data.followers ? data.followers.length : 0} Followers
                            </Link>
                            {isFollowed !== null && <button onClick={handleFollowClick} className='follow-btn'>
                                {
                                    isFollowed ? "Unfollow" : "Follow"
                                }
                            </button>}
                        </div>
                    </div>
                    <div className="posts">
                        <h1>Your Posts</h1>
                        <MyTweet data={myPost} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
