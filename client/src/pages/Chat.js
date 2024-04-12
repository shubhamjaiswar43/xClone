import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Messages from '../components/Messages.js';
import myContext from '../context/myContext.js';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../providers/SocketProvider.js';
import "./css/Chat.css";
const Chat = () => {
    const { socket } = useSocket();
    const navigate = useNavigate();
    const parms = useParams();
    const { alert, startLoading, endLoading } = useContext(myContext);
    const [type, setType] = useState('user1');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (message.length === 0) {
            alert('', 'Please Type Something', 'lightgray');
            return;
        }
        const hostname = process.env.REACT_APP_SERVER_HOST;
        let res = await fetch(`${hostname}/chat/sendMessage`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('authToken'),
            },
            body: JSON.stringify({ user: parms.id, message })
        })
        res = await res.json();
        if (!res.success) {
            alert('Error', res.Error, 'red');
        }
    }
    const getData = async () => {
        startLoading();
        const hostname = process.env.REACT_APP_SERVER_HOST;
        let res = await fetch(`${hostname}/chat/getMessage/${parms.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('authToken')
            }
        });
        res = await res.json();
        if (res.success) {
            setMessages(res.room.messages);
        } else {
            alert('Error', res.Error, 'red');
        }
        endLoading();
    }
    const joinRoom = () => {
        let roomId;
        if (localStorage.getItem('username') > parms.id) {
            roomId = `${parms.id}:${localStorage.getItem('username')}`;
        } else {
            roomId = `${localStorage.getItem('username')}:${parms.id}`;
        }
        console.log(roomId)
        socket.emit('joinRoom', { roomId });
        socket.on('messageReceived', (data) => {
            setMessages(prevMessages => {
                return [...prevMessages, data];
            })
            if (data.type === type)
                setMessage('');
        })
    }
    useEffect(() => {
        if (localStorage.getItem('username') > parms.id)
            setType('user2');
        getData();
        joinRoom();
        //eslint-disable-next-line
    }, []);
    const goToPreviousPage = () => {
        navigate(-1);
    }
    return (
        <div className='main-window chat'>
            <div className='chat-head'>
                <i onClick={goToPreviousPage} className="fa-solid fa-arrow-left back-btn"></i>

                <h1 className='user'>{parms.id}</h1>
            </div>
            <Messages type={type} messages={messages} />
            <form className='form-message' onSubmit={handleSendMessage}>
                <input value={message} placeholder='Send A Message' className='input-message' onChange={(e) => { setMessage(e.target.value) }} type="text" />
                <button className='message-send-btn'>
                    <p>Send</p>
                    {/* <p>Message</p> */}
                </button>
            </form>
        </div>
    )
}

export default Chat
