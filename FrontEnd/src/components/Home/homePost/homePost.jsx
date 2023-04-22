import "./homePost.css"
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
    <div className="homemainBox">
      <div className="homepost">
        <div className="homepostWrapper">
          <div className="postTop">
            <div className="homepostTopLeft">
              <Link to={`/profile/${user.username}`}>
                <img className="homepostProfileImg" src={user.profilePicture ? PF + user.profilePicture : PF + "Persons/noAvatar.png"} alt="" />
              </Link>
              <span className="homepostUsername">{user.username} </span>
            </div>
            <div>
              <span className="homepostDate">{format(post.createdAt)}</span>
            </div>
          </div>

          <div className="homeuploadDeatils">
            <div className="homepostCenter">
              <div className="homepostText">{post?.desc}</div>
              <img className="homepostImg" src={PF + post.img} alt=""></img>
            </div>
            <div className="homepostBottom">
              <div className="homepostBottomLeft">
                <div className = "homelikeIcon">
                  {isliked ? (
                    <FavoriteIcon sx={{ color: "red" }} fontSize="medium" onClick={likeHandler} alt="" />
                  ) : (
                    <FavoriteBorderIcon sx={{ color: "black" }} fontSize="medium" onClick={likeHandler} alt="" />
                  )}
                </div>
                <span className="homepostLikeCounter"> {like} likes</span>
              </div>
              <div className="homepostBottomRight">
                <span className="homepostCommentText">{post.comment}Comments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
