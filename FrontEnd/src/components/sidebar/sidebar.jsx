import './sidebar.css';
import { Home, Chat, Group, AccountCircleRounded } from "@mui/icons-material";
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import HubIcon from '@mui/icons-material/Hub';


export default function Sidebar() {
  const { user } = useContext(AuthContext)

  function handleLogout() {
    localStorage.removeItem('user');
    window.location.reload();
  }

  return (
    <div className='sidebar'>
      <div className='sidebarWrapper'>
        <ul className='sidebarList'>
          <li className='sidebarListItem'>
            <Link to={{ pathname: '/' }} className='link'>
              <Home className='sidebarIcon' />
              <span className='sidebarListItemtext hover-sidebarItems'>
                Home </span>
            </Link>
          </li>
          <li className='sidebarListItem'>
            <Link to={{ pathname: '/search' }} className='link'>
              <SearchIcon className='sidebarIcon' />
              <span className='sidebarListItemtext hover-sidebarItems'>
                Search</span>
            </Link>
          </li>
          <li className='sidebarListItem'>
            <Link to={{ pathname: '/messenger' }} className='link'>
              <Chat className='sidebarIcon' />
              <span className='sidebarListItemtext hover-sidebarItems'>
                Chats </span>
            </Link>
          </li>
          <Link to={{ pathname: '/communities' }} className='link'>
            <li className='sidebarListItem'>
              <Group className='sidebarIcon' />
              <span className='sidebarListItemtext hover-sidebarItems'>
                Communities </span>
            </li>
          </Link>
          <Link to={{ pathname: `/profile/${user.username}` }} className='link'>
            <li className='sidebarListItem'>
              <AccountCircleRounded className='sidebarIcon' />
              <span className='sidebarListItemtext hover-sidebarItems'>
                Profile </span>
            </li>
            </Link>
          <Link to={{ pathname: `/connect`}} className='link'>
          <li className='sidebarListItem'>
            <HubIcon className='sidebarIcon' />
            <span className='sidebarListItemtext hover-sidebarItems'>
              Connect </span>
          </li>
          </Link>
          <li className='sidebarListItem'>
            <LogoutIcon className='sidebarIcon' />
            <button onClick={handleLogout} className='logoutBtn hover-sidebarItems'>
              Logout </button>
          </li>
        </ul>
      </div>
    </div>
  );
}


