import "./post.css"
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';


export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length)
  const [isliked, setisLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);


  useEffect(() => {
    setisLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      console.log(post.userId);
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id })
    } catch (err) { }
    setLike(isliked ? like - 1 : like + 1);
    setisLiked(!isliked)
  }
  return (
    <div className="mainBox">
      <div className="post">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <Link to={`/profile/${user.username}`}>
                <img className="postProfileImg" src={user.profilePicture ? PF + user.profilePicture : PF + "Persons/noAvatar.png"} alt="" />
              </Link>
              <span className="postUsername">{user.username}</span>
            </div>
            <div>
              <span className="postDate">{format(post.createdAt)}</span>
            </div>
          </div>

          <div className="uploadDeatils">
            <div className="postCenter">
              <div className="postText">{post?.desc}</div>
              <img className="postImg" src={PF + post.img} alt=""></img>
            </div>
            <div className="postBottom">
              <div className="postBottomLeft">
                <div className = "likeIcon">
                  {isliked ? (
                    <FavoriteIcon sx={{ color: "red" }} fontSize="medium" onClick={likeHandler} alt="" />
                  ) : (
                    <FavoriteBorderIcon sx={{ color: "white" }} fontSize="medium" onClick={likeHandler} alt="" />
                  )}
                </div>
                <span className="postLikeCounter"> {like} likes</span>
              </div>
              <div className="postBottomRight">
                <span className="postCommentText">{post.comment}Comments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
