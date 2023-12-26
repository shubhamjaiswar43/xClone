import React, { useContext, useState } from 'react'
import "./css/Explore.css"
import UserSection from './UserSection.js';
import myContext from '../context/myContext.js';
const Explore = () => {
    const [data, setData] = useState([]);
    let username = "";
    const { searchUser } = useContext(myContext);
    const handleSearch = (e) => {
        e.preventDefault();
        searchUser(username, setData);
    }
    return (
        <>
            <div className="main-window explore">
                <form onSubmit={handleSearch}>
                    <input onChange={(e) => { username = e.target.value }} className='input-search' type="text" placeholder='Search' />
                </form>
                <UserSection data={data} />
            </div>
        </>
    )
}

export default Explore
