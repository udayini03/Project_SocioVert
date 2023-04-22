import Topbar from "../../components/topbar/topbar";
import HomeSidebar from "../../components/sidebar/sidebar";
import HomeFeed from "../../components/Home/homeFeed/homeFeed";
import "./home.css";

export default function Home() {
    return (
        <>
            <Topbar />

            <div className="homeSecContainer">
               
                <div className="homeSideBar"><HomeSidebar /></div>
                <div class="homeFeed"><HomeFeed /></div>
            </div>

        </>

    )
}