import React, { useContext, useEffect, useState } from 'react'
import UserSection from './UserSection.js'
import "./css/Follow.css";
import { useNavigate, useParams } from 'react-router-dom';
import myContext from '../context/myContext.js';

const Follow = (props) => {
    const parms = useParams();
    const navigate = useNavigate();
    const { getData } = useContext(myContext);
    const [data, setData] = useState([]);
    const { type } = parms;
    useEffect(() => {
        if (parms.id) {
            getData(parms.id, setData, type);
        }
        //eslint-disable-next-line
    }, [])
    const goToPreviousPage = () => {
        navigate(-1);
    }
    return (
        <div className='main-window follow-section'>
            <div className='d-flex ai-center'>
                <i onClick={goToPreviousPage} className="fa-solid fa-arrow-left back-btn"></i>
                <div>
                    <p className='text-primary'>{type.toUpperCase()}</p>
                    <p>{data ? data.length : 0} {type.toLowerCase()}</p>
                </div>
            </div>
            <UserSection data={data} />
        </div>
    )
}

export default Follow
