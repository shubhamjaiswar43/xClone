import { useLocation, useNavigate } from "react-router-dom";
import myContext from "./myContext.js";
import { useEffect } from "react";
const host = process.env.REACT_APP_SERVER_HOST;
const MyState = (props) => {
    const location = useLocation().pathname;
    const { alert, startLoading, endLoading } = props;
    const navigate = useNavigate();

    const getData = async (username, setData, type) => {
        startLoading();
        try {
            let res;
            let toReqUrl = `${host}/user/getuser`;
            toReqUrl += '/' + username;
            res = await fetch(toReqUrl, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': localStorage.getItem('authToken')
                }
            })
            res = await res.json();
            if (setData) {
                if (type)
                    setData(res.user[type]);
                else
                    setData(res.user);
            }
            endLoading();
            return res.user;
        } catch (err) {
            endLoading();
            alert("", "Internal Server Error, Please Try Again!!!", "red");
        }
    }

    const getPost = async (username, setPost, setPost2) => {
        startLoading();
        try {

            let toReqUrl = `${host}/post`;
            if (username === 'all')
                toReqUrl += '/getallpost';
            else if (username === localStorage.getItem('username'))
                toReqUrl += '/getpost';
            else
                toReqUrl += `/getpost/${username}`;
            let res;
            res = await fetch(toReqUrl, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': localStorage.getItem('authToken')
                }
            })
            res = await res.json();
            res.posts.sort(
                (a, b) => (new Date(b.uploadDate)).getTime() - (new Date(a.uploadDate)).getTime()
            )
            if (setPost)
                setPost(res.posts);
            if (setPost2)
                setPost2(res.posts);
            endLoading();
            return res.posts;
        } catch (err) {
            endLoading();
            alert("", "Internal Server Error, Please Try Again!!!", "red");
        }
    }

    const getPostOfFollowing = async (post, setPost) => {
        startLoading();
        try {
            let posts = []
            const user = await getData(localStorage.getItem('username'));
            for (let i = 0; i < user.followings.length; i++) {
                const temp = post.filter(ele => ele.username === user.followings[i].username)
                posts = posts.concat(temp);
            }
            posts.sort(
                (a, b) => (new Date(b.uploadDate)).getTime() - (new Date(a.uploadDate)).getTime()
            )
            if (setPost) {
                setPost(posts);
            }
            endLoading();
            return posts;
        } catch (err) {
            endLoading();
            alert("", "Internal Server Error, Please Try Again!!!", "red");
        }
    }

    const searchUser = async (username, setData) => {
        startLoading();
        try {
            let res;
            let toReqUrl = `${host}/user/searchuser`;
            if (username)
                toReqUrl += `/${username}`;
            res = await fetch(toReqUrl, {
                method: 'GET',
            })
            res = await res.json();
            setData(res.user);
            endLoading();
        } catch (err) {
            endLoading();
            alert("", "Internal Server Error, Please Try Again!!!", "red");
        }
    }

    const isLogin = () => {
        const navbar = document.querySelector(".navbar");
        const root = document.querySelector("#root");
        if (!localStorage.getItem('authToken')) {
            navbar.style.display = 'none';
            root.style.display = 'block';
            if (location !== "/signin" && location !== "/signup")
                navigate("/signin");
        } else {
            navbar.style.display = 'block';
            root.style.display = 'flex';
            if (location === "/signin" || location === "/signup")
                navigate("/")
        }
    }

    useEffect(() => {
        isLogin();
        //eslint-disable-next-line
    }, [])

    const signup = async (data) => {
        startLoading();
        try {
            let res = await fetch(`${host}/auth/signup`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            res = await res.json();
            endLoading();
            if (res.Error || res.success === false)
                alert("", res.Error, "red");
            else {
                alert("", "Sign Up Successfully", "lightgreen");
                localStorage.setItem("authToken", res.authToken);
                localStorage.setItem("username", data.username);
                isLogin();
                navigate("/");
            }
        } catch (err) {
            endLoading();
            alert("", "Internal Server Error, Please Try Again!!!", "red");
        }
    }

    const signin = async (data) => {
        startLoading();
        try {
            let res = await fetch(`${host}/auth/signin`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            res = await res.json();
            endLoading();
            if (res.Error || res.success === false)
                alert("", res.Error, "red");
            else {
                alert("", "Login Successfully", "lightgreen");
                localStorage.setItem("authToken", res.authToken);
                localStorage.setItem("username", data.username);
                isLogin();
                navigate("/");
            }
        } catch (err) {
            endLoading();
            alert("", "Internal Server Error, Please Try Again!!!", "red");
        }
    }

    return (
        <myContext.Provider value={{ startLoading, endLoading, searchUser, alert, signup, signin, isLogin, getData, getPost, getPostOfFollowing }}>
            {props.children}
        </myContext.Provider>
    )
}

export default MyState;