import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from "../../components/sidebar/sidebar";
import CommunityRightbar from "../../components/communityRightBar/CommunityRightBar";
import "./communities.css";
import CommunityFeed from "../../components/communityFeed/CommunityFeed";
import logo from "../login/logo.png";
import { Link } from "react-router-dom";

export default function Communities() {
  const { id } = useParams();
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(false);
  const [user, setUser] = useState(null);
  const communityName = useParams().communityName


  useEffect(() => {
    const fetchCommunity = async () => {
      const res = await axios.get(`/communities?name=${communityName}`);
      setCommunity(res.data);
    };
    fetchCommunity();
  }, [communityName]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [communityResponse, userResponse] = await Promise.all([
          axios.get(`/api/communities/${id}`),
          axios.get('/api/users/current')
        ]);
        setCommunity(communityResponse.data);
        setUser(userResponse.data);
        if (communityResponse.data.members.some(member => member._id === userResponse.data._id)) {
          setJoined(true);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleJoin = async () => {
    try {
      await axios.post(`/api/communities/${id}/join`);
      setCommunity(prevCommunity => ({
        ...prevCommunity,
        members: [...prevCommunity.members, user]
      }));
      setJoined(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLeave = async () => {
    try {
      await axios.post(`/api/communities/${id}/leave`);
      setCommunity(prevCommunity => ({
        ...prevCommunity,
        members: prevCommunity.members.filter(member => member._id !== user._id)
      }));
      setJoined(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="parent">
      <div className="communityContainer">
      <div className='profileSideBar'>
      <Link to="/" style={{ textDecoration: "none" }}>
        <img src={logo} alt="logo" class="profilePageLogoImg"></img>
      </Link>
      <div className='profileSideBarWrapper'><Sidebar /></div>
    </div>
        <div className="main">
          {community ? (
            <>
              <div ><img className="coverImage" src={community.coverImage}></img></div>
              <div className="lowerContainer">
                <div className="communityfeed">
                  <CommunityFeed />
                </div>
                <CommunityRightbar />
              </div>
              {joined ? (
                <button className="leaveButton" onClick={handleLeave}>Leave Community</button>
              ) : (
                <button className="joinButton" onClick={handleJoin}>Join Community</button>
              )}
            </>
          ) : (
            <>
            <div className='notFound'>No Communities found</div>
            <div className="newCommunity">
            <button className="JoinCommunity">Join Communities</button>
            <button className="CreateCommunity">Create Community</button>
            </div>

            </>
          )}
        </div>
      </div>
    </div>
  );
}
