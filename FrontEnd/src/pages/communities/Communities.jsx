import Sidebar from "../../components/sidebar/sidebar";
import CommunityRightbar from "../../components/communityRightBar/CommunityRightBar";
import "./communities.css";
import CommunityFeed from "../../components/communityFeed/CommunityFeed";

export default function Communities() {
    return (
        <div className="parent">
            <div className="communityContainer">
                <Sidebar />
                <div className="main">
                    <div ><img className="coverImage" src="https://www.fbcoverlover.com/maker/covers-images/download/friends-2-Facebook-Covers-FBcoverlover-facebook-cover.jpg"></img></div>
                    <div className="lowerContainer">
                        <div className="communityfeed">
                            <CommunityFeed />
                        </div>
                        <CommunityRightbar />
                    </div>
                </div>
            </div>
        </div>
    )
}