import "./profilePost.css"
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
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
    <div className="profileMainBox">
      <div className="profilePost">
        <div className="profilePostWrapper">
          <div className="profilePostTop">
            <div className="profilePostTopLeft">
              <Link to={`/profile/${user.username}`}>
                <img className="profilePostProfileImg" src={user.profilePicture ? PF + user.profilePicture : PF + "Persons/noAvatar.png"} alt="" />
              </Link>
              <span className="profilePostUsername">{user.username}</span>
            </div>
            <div>
              <span className="profilePostDate">{format(post.createdAt)}</span>
            </div>
          </div>

          <div className="profileuploadDeatils">
            <div className="profilePostCenter">
              <div className="profilePostText">{post?.desc}</div>
              <img className="profilePostImg" src={PF + post.img} alt=""></img>
            </div>
            <div className="profilePostBottom">
              <div className="profilePostBottomLeft">
                <div className = "likeIcon">
                  {isliked ? (
                    <FavoriteIcon sx={{ color: "red" }} fontSize="medium" onClick={likeHandler} alt="" />
                  ) : (
                    <FavoriteBorderIcon sx={{ color: "white" }} fontSize="medium" onClick={likeHandler} alt="" />
                  )}
                </div>
                <span className="profilePostLikeCounter"> {like} likes</span>
              </div>
              <div className="profilePostBottomRight">
                <span className="profilePostCommentText">{post.comment}Comments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
