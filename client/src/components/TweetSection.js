import Tweet from "./Tweet.js";
import "./css/TweetSection.css";
const TweetSection = (props) => {
    const { data } = props;
    return (
        <div className="home-tweet">
            {
                !data ? "No Data Available" : (
                    data.length === 0 ? "No Feed Available" : (
                        data.map((val, key) => {
                            return (
                                <Tweet key={val.uploadDate} data={val} />
                            )
                        })
                    )
                )
            }
        </div>
    )
}

export default TweetSection
