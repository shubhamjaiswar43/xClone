import Tweet from "./Tweet.js";
import "./css/MyTweet.css";
const MyTweet = (props) => {
    const { data } = props;
    return (
        <div>
            {
                !data ? "No Data Available" : (
                    data.length === 0 ? "No Feed Available" : (
                        data.map((val, key) => {
                            return (
                                <Tweet key={key} data={val} />
                            )
                        })
                    )
                )
            }
        </div>
    )
}

export default MyTweet
