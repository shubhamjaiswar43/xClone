import "./css/LoginSignup.css";
import {
    Link
} from "react-router-dom"
import xClone from "./assets/xClone.jpg"
import myContext from "../context/myContext.js";
import { useContext, useEffect, useState } from "react";
function Login(props) {
    const { alert,signin,isLogin } = useContext(myContext);
    const onForgetClick = (e)=>{
        e.preventDefault();
        alert("","We Will Implement This Feature Soon!!!","blue")
    }
    useEffect(()=>{
        isLogin();
        //eslint-disable-next-line
    },[])
    const [data,setData] = useState({});
    const onChange = (e)=>{
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handleClick = (e)=>{
        e.preventDefault();
        let cnt = 0;
        for(let key in data){
            if(data[key].length>=1)
                cnt++;
        }
        if(cnt<2){
            alert("","Please Input All Data!!!","red");
            return;
        }
        if(data.password.length<8){
            alert("","Invalid Crendentials!!!","red");
            return;
        }
        signin(data);
    }
    return (
        <div className="login-body">
            <form className="Login">
            <img alt="X-logo" className="image" src={xClone} />
                <hr className="login-signup-hr"/>
                <h1 className="login-signup-h1">Login</h1>
                <div className="Name">
                    <label>Username: </label>
                    <input name="username" onChange={onChange} placeholder="Username" required></input>
                </div>

                <div className="Name">
                    <label>Password: </label>
                    <input autoComplete="" name="password" onChange={onChange} type="password" placeholder="Password" required></input>
                </div>

                <div className="Name changeDir">
                    <Link className="login-signup-a" onClick={onForgetClick}>Forgot Password?</Link>
                </div>

                <div className="Name changeDir">
                    <label className="Nota">Don't Have An Account?</label>
                    <Link className="login-signup-a pageHop" to="/signup">Signup</Link>
                </div>

                <button className="login-signup-btn" onClick={handleClick}>Login</button>
            </form>
        </div>
    );
}

export default Login;