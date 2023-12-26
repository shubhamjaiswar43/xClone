import React, { useContext, useState } from 'react'
import "./css/NewPost.css";
import myContext from '../context/myContext.js';

const NewPost = () => {
    const [tweet, setTweet] = useState("");
    const { alert, startLoading, endLoading } = useContext(myContext);
    const handlePostClick = async (e) => {
        e.preventDefault();
        startLoading()
        try {
            if (tweet.length === 0) {
                alert("", "Please Input Some Text!!!", "red");
                endLoading();
                return;
            }
            const host = process.env.REACT_APP_SERVER_HOST;
            await fetch(`${host}/post/tweet`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': localStorage.getItem('authToken')
                },
                body: JSON.stringify({ tweet })
            })
            setTweet("");
            endLoading();
            alert("", "Tweet Posted Successfully!!!", "green");
        } catch (err) {
            endLoading();
            alert("", "Internal Server Error, Please Try Again!!!", "red");
        }
    }
    return (
        <>
            <div className='main-window newpost'>
                <h1>Post A Tweet</h1>
                <div>
                    <textarea key={0} value={tweet} onChange={e => { setTweet(e.target.value) }} className='input-post' type="text" placeholder='Share Your Thoughts' />
                    <button onClick={handlePostClick} className='post-btn'>Share</button>
                </div>
            </div>
        </>
    )
}

export default NewPost
