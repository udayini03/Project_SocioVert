import Topbar from "../../components/topbar/topbar";
import Sidebar from "../../components/sidebar/sidebar";
import CommunityRightbar from "../../components/communityRightBar/CommunityRightBar";
import Feed from "../../components/feed/feed";
import "./communities.css";

export default function Communities() {
    return (
        <div className="parent">
        <Topbar/>
        <div className="communityContainer">
        <Sidebar/>
        <div className="main">
        <div ><img className="coverImage" src = "https://www.fbcoverlover.com/maker/covers-images/download/friends-2-Facebook-Covers-FBcoverlover-facebook-cover.jpg"></img></div>
        <div className="lowerContainer">
        <div className="communityfeed">
        <Feed/>
        </div>
        <CommunityRightbar/>
        </div>
        </div>
        </div>
           
        </div>

    )
}