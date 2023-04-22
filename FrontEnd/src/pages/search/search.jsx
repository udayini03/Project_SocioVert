import "./search.css";
import Sidebar from "../../components/sidebar/sidebar";
import logo from './logo.png';
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

export default function search() {
  return (
    <div className="main">
        <div className='profileSideBar'>
            <Link to="/" style={{ textDecoration: "none" }}>
               <img src={logo} alt="logo" class="profilePageLogoImg"></img>
            </Link>
             <div className='profileSideBarWrapper'><Sidebar /></div>
        </div>
            <div className="searchWrapper">
            <div className="searchbar">
            <input placeholder={"     Search for Users or communities"} 
            className="shareInput"/> 
            </div> 
            </div>
    </div>
  )
}
