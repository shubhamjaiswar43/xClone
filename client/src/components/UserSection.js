import React from 'react'
import ProfileItem from "./ProfileItem.js"
import "./css/UserSection.css"

const UserSection = (props) => {
    const { data } = props;
    return (
        <div className='users-section'>
            {
                (!data || data.length===0)?"No User Available":data.map((val, key) => {
                    return (
                        <ProfileItem data={val} key={key} />
                    )
                })
            }
        </div>
    )
}

export default UserSection
