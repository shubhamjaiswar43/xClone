import Home from "./components/Home.js";
import Navbar from "./components/Navbar.js";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import Profile from "./components/Profile.js";
import Explore from "./components/Explore.js";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import MyState from "./context/MyState.js";
import Alert from "./components/Alert.js";
import Loading from "./components/Loading.js";
import { useState } from "react";
import Follow from "./components/Follow.js";
import NewPost from "./components/NewPost.js";

function App() {
  const [data, setData] = useState({ isAlert: false, timeOutId: "" });
  const [loading, setLoading] = useState(false);
  const alert = (type, message, color) => {
    clearTimeout(data.timeOutId);
    const timeOutId = setTimeout(() => {
      setData({ isAlert: false });
    }, 1500);
    setData({ isAlert: true, type, message, color, timeOutId });
  }
  const startLoading = () => {
    const body = document.querySelector('body');
    setLoading(true);
    body.style.filter = 'blur(2px)';
  }
  const endLoading = () => {
    const body = document.querySelector('body');
    setLoading(false);
    body.style.filter = 'none';
  }
  return (
    <>
      <Router>
        <MyState alert={alert} startLoading={startLoading} endLoading={endLoading}>
          {loading && <Loading />}
          {data.isAlert && <Alert data={data} />}
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/explore" element={<Explore />} />
            <Route exact path="/explore/:id" element={<Explore />} />
            <Route exact path="/post" element={<NewPost />} />
            <Route exact path="/profile/:id" element={<Profile />} />
            <Route exact path="/signin" element={<Login data="self" />} />
            <Route exact path="/signup" element={<Signup data="self" />} />
            <Route exact path="/users/:type/:id" element={<Follow/>} />
          </Routes>
        </MyState>
      </Router>
    </>
  );
}

export default App;
