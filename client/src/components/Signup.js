import "./css/LoginSignup.css";
import {
    Link
} from "react-router-dom"
import xClone from "./assets/xClone.jpg"
import myContext from "../context/myContext.js";
import { useContext, useState } from "react";

function SignUp(props) {
    const [data, setData] = useState({});
    const { alert, signup } = useContext(myContext);
    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handleClick = (e) => {
        e.preventDefault();
        let cnt = 0;
        for (let key in data) {
            if (data[key].length >= 1)
                cnt++;
        }
        if (cnt < 7) {
            alert("", "Please Input All Data!!!", "red");
            return;
        }
        if (data.password !== data.confirmPassword) {
            alert("", "Password And Confirm Password Should Be Same!!", "red");
            return;
        }
        if (data.password.length < 8) {
            alert("", "Password Must Be Of Length Minimum Length 8!!", "red");
            return;
        }
        signup(data);
    }
    return (
        <div className="signup-body">
            <form className="Signup">
                <img alt="X-logo" className="image" src={xClone} />
                <hr className="login-signup-hr" />
                <h1 className="hSign login-signup-h1 ">Sign Up</h1>
                <div className="Name">
                    <label>Name : </label>
                    <input onChange={onChange} name="name" type="text" placeholder="Name" required></input>
                </div>
                <div className="Name">
                    <label>Username : </label>
                    <input onChange={onChange} name="username" type="text" placeholder="UserName" required></input>
                </div>
                <div className="Name">
                    <label>Date Of Birth : </label>
                    <input onChange={onChange} name="dob" type="date" placeholder="Birth Date" required></input>
                </div>
                <div className="Name">

                    <label>City : </label>
                    <input onChange={onChange} name="city" type="text" placeholder="City" required></input>
                </div>
                <div className="Name">
                    <label>State : </label>
                    <input onChange={onChange} name="state" type="text" placeholder="State" required></input>
                </div>
                <div className="Name">
                    <label>New Password : </label>
                    <input autoComplete="" onChange={onChange} name="password" type="password" placeholder="New Password" required></input>
                </div>
                <div className="Name">
                    <label>Confirm Password : </label>
                    <input autoComplete="" onChange={onChange} name="confirmPassword" type="password" placeholder="Confirm Password" required></input>
                </div>
                <div className="Name changeDir">
                    <label className="Nota">Already Have An Account? </label>
                    <Link className="pageHop login-signup-a" to="/signin">Login</Link>
                </div>
                <button onClick={handleClick} className="login-signup-btn">Signup</button>
            </form>
        </div>
    );
}

export default SignUp;