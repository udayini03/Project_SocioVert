import './profile.css'
import Topbar from "../../components/topbar/topbar";
import Sidebar from "../../components/sidebar/sidebar";
import Rightbar from "../../components/rightbar/rightbar";
import Feed from "../../components/feed/feed";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router';

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username


  useEffect(() => {
    const fetchUser = async () => {

      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data)
    }
    fetchUser();
  }, [username]);
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className='profileRight'>
          <div className='profileRightTop'>
            <div className='profileCover'>
              <img className='profileCoverImg' src={user.coverPicture ? PF + user.coverPicture : PF + "Persons/noCover.png"} alt='' />
              <img className='profileUserImg' src={user.profilePicture ? PF + user.profilePicture : PF + "Persons/noAvatar.png"} alt='' />
            </div>

            <div className='profileInfo'>
              <div><h4 className='profileInfoName'>{user.username}</h4></div>
              <div className='profileInfoDesc'>{user.desc}IIITian</div>
              <div class = "friendSide"><Rightbar user={user} /></div>
            </div>
          </div>
          <div className='profileRightBottom'>
            <Feed username={username} />
          </div>
        </div>
      </div>

    </>
  );
}
