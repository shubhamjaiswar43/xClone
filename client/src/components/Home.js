import React, { useContext, useState } from "react";
import "./css/Home.css";
import TweetSection from "./TweetSection.js";
import myContext from "../context/myContext.js";
const Home = () => {
  const [homePage, setHomePage] = useState("all");
  const { getPost, getPostOfFollowing } = useContext(myContext);
  let isGetPost = false;
  const [post, setPost] = useState([]);
  const [postToShow, setPostToShow] = useState([]);
  useState(() => {
    if (!isGetPost) {
      getPost('all', setPost, setPostToShow);
      isGetPost = true;
    }
  }, [postToShow])
  const handleAllClick = (e) => {
    e.preventDefault();
    if (homePage === "all")
      return;
    setHomePage("all");
    setPostToShow(post);
  }
  const handleFollowingClick = async (e) => {
    e.preventDefault();
    if (homePage === "following")
      return;
    setHomePage("following");
    getPostOfFollowing(post, setPostToShow);
  }
  return (
    <>
      <div className="main-window home">
        <h1>WELCOME TO X</h1>
        <div className="home-head">
          <button onClick={handleAllClick} className={`home-head-btn ${homePage === "all" ? "home-head-btn-alternate" : ""}`}>All</button>
          <button onClick={handleFollowingClick} className={`home-head-btn ${homePage === "following" ? "home-head-btn-alternate" : ""}`}>Following</button>
        </div>
        <TweetSection data={postToShow} />
      </div>
    </>
  );
};

export default Home;
