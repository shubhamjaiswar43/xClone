import React, { useEffect, useState } from 'react'
import UserSection from '../components/UserSection.js';
import { useNavigate } from 'react-router-dom';
import './css/Messages.css'
const Messages = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const getData = async () => {
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

        }
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
            <UserSection path="/messages" data={data} />
        </div>
    )
}

export default Messages