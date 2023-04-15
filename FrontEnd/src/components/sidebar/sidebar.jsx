import './sidebar.css';
import { Home, Chat, Group, AccountCircleRounded, Settings} from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function sidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebarWrapper'>
        <ul className='sidebarList'>
          <li className='sidebarListItem'>
            <Link to={{ pathname: '/' }} className='link'>
              <Home className='sidebarIcon' />
              <span className='sidebarListItemtext'>
                Feed </span>
            </Link>
          </li>
          <li className='sidebarListItem'>
            <Link to={{ pathname: '/messenger' }} className='link'>
              <Chat className='sidebarIcon' />
              <span className='sidebarListItemtext'>
                Chats </span>
            </Link>
          </li>
          <li className='sidebarListItem'>
            <Group className='sidebarIcon' />
            <span className='sidebarListItemtext'>
              Communities </span>
          </li>
          <li className='sidebarListItem'>
            <AccountCircleRounded className='sidebarIcon' />
            <span className='sidebarListItemtext'>
              Profile </span>
          </li>
          <li className='sidebarListItem'>
            <Settings className='sidebarIcon' />
            <span className='sidebarListItemtext'>
              Settings </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
