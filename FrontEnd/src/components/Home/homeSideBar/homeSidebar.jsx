import './homeSidebar.css';
import { Home, Chat, Group, AccountCircleRounded, Settings } from "@mui/icons-material";
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext } from 'react';
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const { user } = useContext(AuthContext)

  function handleLogout() {
    localStorage.removeItem('user');
    window.location.reload();
  }

  return (
    <div className='homesidebar'>
      <div className='homesidebarWrapper'>
        <ul className='homesidebarList'>
          <li className='homesidebarListItem'>
            <Link to={{ pathname: '/' }} className='homelink'>
              <Home className='homesidebarIcon' />
              <span className='homesidebarListItemtext hover-sidebarItem'>
                Home </span>
            </Link>
          </li>
          <li className='homesidebarListItem'>
            <Link to={{ pathname: '/messenger' }} className='homelink'>
              <Chat className='homesidebarIcon' />
              <span className='homesidebarListItemtext  hover-sidebarItem'>
                Chats </span>
            </Link>
          </li>
          <Link to={{ pathname: '/communities' }} className='homelink'>
            <li className='homesidebarListItem'>
              <Group className='homesidebarIcon' />
              <span className='homesidebarListItemtext hover-sidebarItem'>
                Communities </span>
            </li>
          </Link>
          <Link to={{ pathname: `/profile/${user.username}` }} className='homelink'>
            <li className='homesidebarListItem'>
              <AccountCircleRounded className='homesidebarIcon' />
              <span className='homesidebarListItemtext hover-sidebarItem'>
                Profile </span>
            </li>
          </Link>
          <li className='homesidebarListItem'>
            <Settings className='homesidebarIcon' />
            <span className='homesidebarListItemtext hover-sidebarItem'>
              Settings </span>
          </li>
          <li className='homesidebarListItem'>
            <LogoutIcon className='homesidebarIcon' />
            <button onClick={handleLogout} className='homelogoutBtn hover-sidebarItem'>
              Logout </button>
          </li>
        </ul>
      </div>
    </div>
  );
}


