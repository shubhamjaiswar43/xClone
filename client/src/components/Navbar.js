import { useContext, useEffect } from "react";
import xClone from "./assets/xClone.jpg"
import "./css/Navbar.css"
import { Link, useLocation, useNavigate } from "react-router-dom";
import myContext from "../context/myContext.js";
const Navbar = () => {
    const location = useLocation().pathname;
    const navigate = useNavigate();
    const { isLogin } = useContext(myContext);
    const askForLogOut = (e) => {
        e.preventDefault();
        let isLogOut = window.confirm("Confirm Logout?");
        if (isLogOut) {
            localStorage.removeItem('authToken');
            isLogin();
        }
    }
    useEffect(() => {
        document.title = `${location === "/" ? "Welcome" : (location[1].toUpperCase() + location.slice(2,))
            } / X`
    }, [location]);
    return (
        <>
            <div className="navbar">
                <img onClick={() => { navigate("/"); }} src={xClone} alt="Logo" className="logo invert-ele" />
                <ul className='nav-elements'>
                    <li>
                        <Link className={`${location === "/" ? "fw-bd" : ""}`} to="/">
                            <i className="fa-solid fa-house"></i>
                            <p>Home</p>
                        </Link>
                    </li>
                    <li>
                        <Link className={`${location === "/explore" ? "fw-bd" : ""}`} to="/explore">
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <p>Explore</p>
                        </Link>
                    </li>
                    <li>
                        <Link className={`${location === "/post" ? "fw-bd" : ""}`} to="/post">
                            <i className="fa-regular fa-square-plus"></i>
                            <p>Post A Tweet</p>
                        </Link>
                    </li>
                    <li>
                        <Link className={`not-implemented ${location === "/messages" ? "fw-bd" : ""}`} to="/messages">
                            <i className="fa-regular fa-envelope"></i>
                            <p>Messages</p>
                        </Link>
                    </li>
                    <li>
                        <Link className={`not-implemented ${location === "/lists" ? "fw-bd" : ""}`} to="/lists">
                            <i className="fa-regular fa-rectangle-list"></i>
                            <p>Lists</p>
                        </Link>
                    </li>
                    <li>
                        <Link className={`not-implemented ${location === "/bookmarks" ? "fw-bd" : ""}`} to="/bookmarks">
                            <i className="fa-regular fa-bookmark"></i>
                            <p>Bookmarks</p>
                        </Link>
                    </li>
                    <li>
                        <Link className={`not-implemented ${location === "/premium" ? "fw-bd" : ""}`} to="/premium">
                            <i className="fa-brands fa-x-twitter"></i>
                            <p>Premium</p>
                        </Link>
                    </li>
                    <li>
                        <Link to={`/profile/${localStorage.getItem('username')}`} className={`${location === `/profile/${localStorage.getItem('username')}` ? "fw-bd" : ""}`}>
                            <i className="fa-solid fa-user"></i>
                            <p>Profile</p>
                        </Link>
                    </li>
                    <li>
                        <Link onClick={askForLogOut} className={`${location === "/logout" ? "fw-bd" : ""}`}>
                            <i className={`fa-solid fa-arrow-right-from-bracket`}></i>
                            <p>Logout</p>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Navbar
