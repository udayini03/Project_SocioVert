import "./topbar.css";
import {Search, Person, Chat, Notifications} from '@mui/icons-material'
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar(){

    const {user} = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className="topbarContainer">
        <div className="topbarLeft">
        <Link to= "/" style={{textDecoration: "none"}}>
        <span className="Logo">ShadySocial</span>
        </Link>
        </div>
        <div className="topbarCenter">
        <div className="searchbar">
        <Search className="searchIcon"/>
        <input placeholder="Search for Friends" className="searchInput"/>
        </div>
        </div>
        <div className="topbarRight">
        <span className="topbarLinks">HomePage</span>
        <span className="topbarLinks">TimeLine</span>
        </div>
        <div className="topbarIcons">
        <div className="topbarIconItem">
        <Person/>
        <span className="topbarIconBadge">1</span>
        </div>
        
        <Link to={{ pathname: '/messenger' }}>
        <div className="topbarIconItem">
          <Chat/>
          <span className="topbarIconBadge">1</span>
        </div>
      </Link>
        
        <div className="topbarIconItem">
        <Notifications/>
        <span className="topbarIconBadge">1</span>
        </div>
        </div>
        {user && (
            <Link to={`/profile/${user.username}`}>
            <img src={user.profilePicture ? PF + user.profilePicture : PF+"Persons/noAvatar.png"} alt="" className="topbarImg"/>
            </Link>    
            )}
            </div>
    )
}

