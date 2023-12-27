import React, { useContext, useEffect, useState } from 'react'
import "./css/Explore.css"
import UserSection from './UserSection.js';
import myContext from '../context/myContext.js';
import { useNavigate, useParams } from 'react-router-dom';
const Explore = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [data, setData] = useState([]);
    const parms = useParams();
    const { searchUser } = useContext(myContext);
    useEffect(() => {
        if (parms.id) {
            setUsername(parms.id);
            searchUser(parms.id, setData);
        }
        //eslint-disable-next-line
    }, []);
    const handleSearch = (e) => {
        e.preventDefault();
        if (username)
            navigate(`/explore/${username}`);
        searchUser(username, setData);
    }
    return (
        <>
            <div className="main-window explore">
                <form onSubmit={handleSearch}>
                    <input value={username} onChange={(e) => { setUsername(e.target.value) }} className='input-search' type="text" placeholder='Search' />
                </form>
                <UserSection data={data} />
            </div>
        </>
    )
}

export default Explore
