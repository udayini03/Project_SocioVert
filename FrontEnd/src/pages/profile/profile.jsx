import './profile.css'
import Sidebar from "../../components/sidebar/sidebar";
import Rightbar from "../../components/rightbar/rightbar";
import Feed from "../../components/feed/feed";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router';
import logo from './logo.png';
import { Link } from "react-router-dom";

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
      <div className="profile">
        <div>
          <Link to="/" style={{ textDecoration: "none" }}>
            <img src={logo} alt="logo" class="logoimg"></img>
          </Link>
          <Sidebar />
        </div>
        <div className='profileRight'>
          <div className='profileRightTop'>
            <div className='profileCover'>
              <img className='profileCoverImg' src={user.coverPicture ? PF + user.coverPicture : PF + "Persons/noCover.png"} alt='' />
              <img className='profileUserImg' src={user.profilePicture ? PF + user.profilePicture : PF + "Persons/noAvatar.png"} alt='' />
            </div>

            <div className='profileInfo'>
              <div><h4 className='profileInfoName'>{user.username}</h4></div>
              <div className='profileInfoDesc'>{user.desc}IIITian</div>
              <div class="friendSide"><Rightbar user={user} /></div>
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
