import React, { useEffect, useRef } from 'react'
import "./css/Messages.css";
const Messages = (props) => {
    const chatBox = useRef();
    const { messages, type } = props;
    const scrollToBottom = () => {
        chatBox.current.scrollTop = chatBox.current.scrollHeight;
    }
    useEffect(scrollToBottom, [scrollToBottom]);
    return (
        <div ref={chatBox} className='chat-messages'>
            {
                messages.map((val, ind) => {
                    return (
                        <div key={ind} className={`message ${val.type === type ? 'right' : 'left'}`}>
                            <div>
                                <pre>
                                    {val.message}
                                </pre>
                                <p>{(new Date(val.time)).toLocaleString()}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Messages
