import React from 'react'
import UserSection from './UserSection.js'
import "./css/Follow.css";
import { useNavigate } from 'react-router-dom';

const Follow = (props) => {
    const navigate = useNavigate();
    const { data, type } = props.data;
    const goToPreviousPage = () => {
        navigate(-1);
    }
    return (
        <div className='main-window follow-section'>
            <div className='d-flex ai-center'>
                <i onClick={goToPreviousPage} className="fa-solid fa-arrow-left back-btn"></i>
                <div>
                    <p className='text-primary'>{type}</p>
                    <p>{data? data.length : 0} {type.toLowerCase()}</p>
                </div>
            </div>
            <UserSection data={data} />
        </div>
    )
}

export default Follow
