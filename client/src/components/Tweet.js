import React, { useState } from 'react'
import "./css/Tweet.css"
import {
    Link, useNavigate
} from "react-router-dom";
const Tweet = (props) => {
    const navigate = useNavigate();
    const [data, setData] = useState(props.data);
    if (!data.likes) {
        setData({ ...data, likes: [] })
    }
    if (!data.unlikes) {
        setData({ ...data, unlikes: [] })
    }

    const handleUsernameClick = (e) => {
        e.preventDefault();
        navigate(`/profile/${data.username}`);
    }

    const handleLike = (e) => {
        e.preventDefault();
        const username = localStorage.getItem('username');
        if (data.likes.indexOf(username) !== -1)
            return;
        const host = process.env.REACT_APP_SERVER_HOST;
        fetch(`${host}/post/like/${data._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('authToken')
            }
        })
        let likes = data.likes;
        let unlikes = data.unlikes;
        likes.push(username);
        unlikes = unlikes.filter(key => key !== username);
        setData({ ...data, likes, unlikes });
    }
    const handleUnlike = (e) => {
        e.preventDefault();
        const username = localStorage.getItem('username');
        if (data.unlikes.indexOf(username) !== -1)
            return;
        const host = process.env.REACT_APP_SERVER_HOST;
        fetch(`${host}/post/unlike/${data._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('authToken')
            }
        })
        let likes = data.likes;
        let unlikes = data.unlikes;
        unlikes.push(username);
        likes = likes.filter(key => key !== username);
        setData({ ...data, likes, unlikes });
    }
    return (
        <>
            <div className='tweet'>
                <div className="tweet-head">
                    <p>{data.name} &nbsp;</p>
                    <Link onClick={handleUsernameClick}>@{data.username} &nbsp;</Link>
                    <p>&nbsp;•&nbsp;</p>
                    <p>{(new Date(data.uploadDate)).toDateString() + " " + (new Date(data.uploadDate)).toLocaleTimeString()}</p>
                </div>
                <div className="tweet-body">
                    <pre>
                        {data.tweet}
                    </pre>
                </div>
                <div className="like-unlike-box">
                    <i onClick={handleLike} className={`fa-${data.likes.indexOf(localStorage.getItem('username')) === -1 ? "regular" : "solid"} fa-thumbs-up`}></i>
                    <p className='unselectable-text'>{data.likes ? data.likes.length : "0"}</p>
                    <i onClick={handleUnlike} className={`fa-${data.unlikes.indexOf(localStorage.getItem('username')) === -1 ? "regular" : "solid"} fa-thumbs-down`}></i>
                    <p className='unselectable-text'>{data.unlikes ? data.unlikes.length : "0"}</p>
                </div>
            </div>
        </>
    )
}

export default Tweet
