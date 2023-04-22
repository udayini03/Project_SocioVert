import "./rightbar.css";
import { Users } from "../../DummyData";
import Online from "../Online/online"
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link} from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';


export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );
  const [posts, setPosts] = useState([]);
  // const [postCount, setPostCount] = useState([]);
  const id = user._id;
  const navigate = useNavigate();

  // const [numFriends, setNumFriends] = useState(0);

  // const displayFriends = async () => {
  //   try {
  //     const res = await axios.get('/friends');
  //     setNumFriends(res.data.length);
  //   } catch (err) {
  //     console.log(err);
  //   } }

  useEffect((id)=>{
    const fetchPosts = async () => {
      const id = user._id;
      const res = currentUser ?
       await axios.get(`/posts/profile/${currentUser}`)
       : await axios.get(`posts/timeline/${id}`);
      setPosts(res.data.sort((p1,p2)=>{
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }))
  
    }
    fetchPosts(); 
  },[currentUser, user._id, id]);

  console.log(posts);


  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);

        console.log(friendList);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err)
      }
    };
    getFriends();
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, { userId: currentUser._id });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      }
      else {
        await axios.put(`/users/${user._id}/follow`, { userId: currentUser._id });
        dispatch({ type: "FOLLOW", payload: user._id })
      }
      setFollowed(!followed)
    } catch (err) {
      console.log(err);
    }
  };

  const Message = async ({ history }) => {
    try {
      const res = await axios.post('/conversations', {
        senderId: currentUser._id,
        receiverId: user._id // the id of the user that the current page represents
      });
      const newConversation = res.data;
      // navigate to the chat page with the new conversation id
      navigate(`/messenger/${newConversation._id}`);
    } catch (err) {
      console.log(err);
    }
  };
  
  console.log(posts);
  

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={`${PF}gift.png`} alt="" />
          <span className="birthdayText">
            <b>Millie Bobby Brown</b> and <b>2 other friends</b> have their birthday
          </span>
        </div>
        <hr></hr>
        <h4 className="rightbarTitle">Online Now</h4>
        <ul rightbarfriendlist>
          {Users.map(u => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    )
  };
  
  const ProfileRightbar = () => {
    const [isShown, setIsShown] = useState(false);
    const displayFriends = () => {
      setIsShown(!isShown);
    };
  
    return (

      <>
        {user.username !== currentUser.username && (
        <>
        <button className="rightbarFollowButton" onClick={handleClick}>
        {followed ? "Unfollow" : "Follow"}
        {followed ? <Remove /> : <Add />}
      </button>

          <button className="rightbarMessageButton" onClick={Message}>Message
          </button>
        </>

        )}
        <div className="userBio">
          <div className="followersDetail">
            <h1 class="friendsCount">{friends.length}</h1>
            <button id = "friendsLink" className="rightbarTitle" onClick={displayFriends}>Friends</button>
          </div>
          <div className="followersDetail">
            <h1 class="CommunitiesCount">1</h1>
            <button className="rightbarTitle">Communities</button>
          </div>
          <div className="followersDetail">
            <h1 class="PostCount">5</h1>
            <button className="rightbarTitle">Post</button>
          </div>

          {isShown && <div className="rightbarFollowings">
            <h1 className="friendsHeading">Friends</h1>
            {friends.map((friend) => (
              <Link to={"/profile/" + friend.username} style={{ textDecoration: "none" }}>
                <div className="rightbarFollowing">
                  <img src={friend.profilePicture ? PF + friend.profilePicture : PF + "Persons/noAvatar.png"} alt="" className="rightbarFollowingImg" />
                  <span className="rightbarFollowingName">{friend.username}</span>
                </div>
              </Link>
            ))}

          </div>}

        </div> 
      </>
    )
  }

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
};
