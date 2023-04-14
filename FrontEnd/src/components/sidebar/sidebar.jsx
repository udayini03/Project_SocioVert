import './sidebar.css';
import { Chat, Group, RssFeed } from "@mui/icons-material";
import {Users} from "../../DummyData";
import CloseFriend from '../closeFriend/closefriend';
import { Link } from "react-router-dom";

 export default function sidebar() {
   return (
     <div className='sidebar'>
      <div className='sidebarWrapper'>
      <ul className='sidebarList'>
      <li className='sidebarListItem'>
      <Link to={{ pathname: '/' }} className='link'>
      <RssFeed className='sidebarIcon'/>
      <span className='sidebarListItemtext'>
      Feed </span>
      </Link>
      </li>
      <li className='sidebarListItem'>
      <Link to={{ pathname: '/messenger' } } className='link'>
      <Chat className='sidebarIcon'/>
      <span className='sidebarListItemtext'>
      Chats </span>
      </Link>
      </li>
      <li className='sidebarListItem'>
      <Group className='sidebarIcon'/>
      <span className='sidebarListItemtext'>
      Communities </span>
      </li>
      </ul>
      <button className='sidebarButton'>Show More
      </button>
      <hr className='sidebarHr'/>
      <ul className='sidebarFriendList'>
       {Users.map((u)=>(
        <CloseFriend key={u.id} user={u} />
       ))}
      </ul>
      </div>
     </div>
   );
 }
 