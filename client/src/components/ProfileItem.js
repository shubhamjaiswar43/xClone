import xClone from "./assets/xClone.jpg"
import "./css/ProfileItem.css"
import {
    Link, useNavigate
} from "react-router-dom";
function ProfileItem(props) {
    const { data } = props;
    const navigate = useNavigate();
    const handleUsernameClick = (e) => {
        e.preventDefault();
        navigate(`/profile/${data.username}`);
    }
    return (
        <div className="profileItem">
            <img className="profileImg" srcSet={xClone} alt="PFP" />
            <div className="profileDesc">
                <h5 className="profileName">{data && data.name ? data.name : "Name"}</h5>
                <Link onClick={handleUsernameClick} className="profileId" to="/" >@{data && data.username ? data.username : "Username"}</Link>
            </div>
        </div>
    )
}

export default ProfileItem;