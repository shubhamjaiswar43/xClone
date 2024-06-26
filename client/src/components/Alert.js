import React, { useEffect } from 'react'
import "./css/Alert.css";
const Alert = (props) => {
    let { type, message, color } = props.data;
    useEffect(() => {
        const alert = document.querySelector(".alert");
        if (alert) {
            alert.style.backgroundColor = color;
        }
    }, [color]);
    if (!message) {
        type = "Error";
        message = "Internal Server Error!!! Please Try Again Later"
    }
    return (
        <>
            <div className='alert'>
                {type ? `${type} : ` : ""}
                {message}
            </div>
        </>
    )
}

export default Alert
