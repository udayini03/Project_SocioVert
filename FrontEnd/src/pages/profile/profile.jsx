import './profile.css'
import Sidebar from "../../components/sidebar/sidebar";
import Rightbar from "../../components/rightbar/rightbar";
import ProfileFeed from "../../components/profile/profileFeed/profileFeed";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router';
import logo from './logo.png';
import { Link } from "react-router-dom";
import { storage} from '../../firebase';

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
        <div className='profileSideBar'>
          <Link to="/" style={{ textDecoration: "none" }}>
            <img src={logo} alt="logo" class="profilePageLogoImg"></img>
          </Link>
          <div className='profileSideBarWrapper'><Sidebar /></div>
        </div>

        <div className='profileRight'>
          <div className='profileRightTop'>
            <div className='profileCover'>
              <img className='profileCoverImg' src={user.coverPicture ? PF + user.coverPicture : PF + "Persons/noCover.png"} alt='' />
              <img className='profileUserImg' src={user.profilePicture ? PF + user.profilePicture : PF + "Persons/noAvatar.png"} alt='' />
            </div>

            <div className='profileInfo'>
              <div className="profileDesgin">
                <svg id="sw-js-blob-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
                      <stop id="stop1" stop-color="rgba(55, 248, 205.825, 1)" offset="0%"></stop>
                      <stop id="stop2" stop-color="rgba(38.702, 251, 31, 1)" offset="100%"></stop>
                    </linearGradient>
                  </defs>
                  <path fill="url(#sw-gradient)" d="M28.2,-27.9C34,-22.4,34.5,-11.2,32.4,-2.1C30.3,7,25.7,14,19.9,20.6C14,27.2,7,33.3,-1.7,35C-10.4,36.6,-20.7,33.8,-26.8,27.3C-33,20.7,-34.9,10.4,-35.1,-0.2C-35.3,-10.8,-33.9,-21.7,-27.8,-27.2C-21.7,-32.7,-10.8,-32.9,0.2,-33C11.2,-33.2,22.4,-33.4,28.2,-27.9Z" width="100%" height="100%" transform="translate(50 50)" stroke-width="0" stroke="url(#sw-gradient)"></path>
                </svg>
              </div>
              <div><h4 className='profileInfoName'>{user.username}</h4></div>
              <div className='profileInfoDesc'>{user.desc}</div>
              <div class = "friendSide"><Rightbar user={user} /></div>
            </div>
          </div>
          <div className='profileRightBottom'>
            <ProfileFeed username={username} />
          </div>
        </div>
      </div>

    </>
  );
}
