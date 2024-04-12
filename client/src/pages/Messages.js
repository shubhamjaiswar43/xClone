import React, { useContext, useEffect, useState } from 'react'
import UserSection from '../components/UserSection.js';
import { useNavigate } from 'react-router-dom';
import myContext from '../context/myContext.js';
import './css/Messages.css'
const Messages = () => {
    const { alert, startLoading, endLoading } = useContext(myContext);
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const getData = async () => {
        startLoading();
        const hostname = process.env.REACT_APP_SERVER_HOST;
        let res = await fetch(`${hostname}/chat/getUsers`, {
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('authToken')
            }
        })
        res = await res.json();
        if (res.success) {
            setData(res.users);
        } else {
            alert('Error', res.Error, 'red');
        }
        endLoading();
    }
    useEffect(() => {
        getData();
        //eslint-disable-next-line
    }, []);
    const goToPreviousPage = () => {
        navigate(-1);
    }
    return (
        <div className='main-window messages'>
            <div className='messages-head'>
                <i onClick={goToPreviousPage} className="fa-solid fa-arrow-left back-btn"></i>
                <h1>Messages</h1>
            </div>
            {
                data.length !== 0 ?
                    <UserSection path="/messages" data={data} /> :
                    <div className='no-chat-div'>
                        <div>
                            <p>No Chat Here</p>
                            <button onClick={()=>{navigate('/explore/')}} className='message-with-people-btn'>Start Chatting Now</button>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Messages
