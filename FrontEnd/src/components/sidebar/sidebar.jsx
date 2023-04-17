import './sidebar.css';
import { Home, Chat, Group, AccountCircleRounded, Settings} from "@mui/icons-material";
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { Link} from "react-router-dom";

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
              <span className='sidebarListItemtext'>
                Home </span>
            </Link>
          </li>
          <li className='sidebarListItem'>
            <Link to={{ pathname: '/messenger' }} className='link'>
              <Chat className='sidebarIcon' />
              <span className='sidebarListItemtext'>
                Chats </span>
            </Link>
          </li>
          <Link to={{ pathname: '/communities' }} className='link'>
          <li className='sidebarListItem'>
          <Group className='sidebarIcon' />
          <span className='sidebarListItemtext'>
          Communities </span>
          </li>
          </Link>
          <Link to={{ pathname: `/profile/${user.username}` }} className='link'>
          <li className='sidebarListItem'>
          <AccountCircleRounded className='sidebarIcon' />
          <span className='sidebarListItemtext'>
          Profile </span>
          </li>
          </Link>
          <li className='sidebarListItem'>
            <Settings className='sidebarIcon' />
            <span className='sidebarListItemtext'>
              Settings </span>
          </li>
          <li className='sidebarListItem'>
          <LogoutIcon className='sidebarIcon' />
          <button onClick={handleLogout} className='sidebarListItemtext'>
          Logout </button>
          </li>
        </ul>
      </div>
    </div>
  );
} 


