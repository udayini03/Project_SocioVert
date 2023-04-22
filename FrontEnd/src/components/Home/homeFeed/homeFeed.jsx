import "./homeFeed.css";
import Post from "../../Home/homePost/homePost";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import HomeShare from "../homeshare/homeshare"

export default function Feed({username}) {
  const [posts, setPosts] = useState([]);
  const {user} = useContext(AuthContext);
  const id = user._id;

  useEffect((id)=>{
    const fetchPosts = async () => {
      const id = user._id;
      const res = username ?
       await axios.get(`/posts/profile/${username}`)
       : await axios.get(`posts/timeline/${id}`);
      setPosts(res.data.sort((p1,p2)=>{
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }))
  
    }
    fetchPosts(); 
  },[username, user._id, id]);
  return (
    
      <div className="homefeedWrapper">
    {(!username || username === user.username) && <div className="homeshareBox"><HomeShare/></div>}
   {posts.map(p=>(
       <Post key = {p._id} post={p}/>
))}
    
      </div>
    
  )
}
