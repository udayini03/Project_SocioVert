import Topbar from "../../components/topbar/topbar";
import "./community_chat.css";
import Conversation from "../../components/conversations/communityConversation";
import Message from "../../components/CommunityMessage/CommunityMessage";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";
import Sidebar from "../../components/sidebar/sidebar";
import { Link } from "react-router-dom";
import logo from './logo.png';

export default function Messenger() {

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();



  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", data => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      })
    });
  }, []);

  useEffect(() => {
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages(prev => [...prev, arrivalMessage])
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(user.followings.filter((f) => users.some((u) => u.userId === f)));
    })
  }, [user])




  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {

        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
 },[currentChat]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(member => member !== user._id)

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    })
    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");

    } catch (err) {
      console.log(err);
    }
  }


  console.log(messages);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" })
  }, [messages])



  return (
    <>
      <div className="messenger">
        <div className="Sidebar">
          <Link to="/" style={{ textDecoration: "none" }}>
            <img src={logo} alt="logo" class="chatlogoimg"></img>
          </Link>
          <Sidebar />
        </div>

        <div className="chat">
          <div className="chatMenu">
          <div className = "chatPageHeading">
            <div className = "chatHeading">Chats</div>
            <div className="vLine"></div>
            <div className = "communitiesHeading">Communities</div>
          </div>
            <div className="chatMenuWrapper">
              <input placeholder="   Search for Friends" className="chatMenuInput" />
              {conversations.map((c) => (
                <div onClick={() => setCurrentChat((c))}>
                  <Conversation conversation={c} currentUser={user} />
                </div>
              ))}
            </div>
          </div>

          <div className="chatBox">
            <div className="chatBoxWrapper">
              {
                currentChat ?
                  <>
                  <div className="activeChatName">
                    <div className="activeChatImg">
                    <img src={user.profilePicture}/>
                    </div>
                    <div className="activeChatUserName">{user.username}</div>
                  </div>
                    <div className="chatBoxTop">
                      {messages.map((m) => (
                        <div ref={scrollRef}>
                          <Message message={m} own={m.sender === user._id} />
                        </div>
                      ))}

                    </div>
                    <div className="chatBoxBottom">
                      <textarea className="chatMessageInput" placeholder="  Type your Message" onChange={(e) => setNewMessage(e.target.value)} value={newMessage} ></textarea>
                      <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                    </div>
                  </> : <div className="noConversationText" >Open a Conversation to start a chat</div>}
            </div>
          </div>
          <div className="chatOnline">
            {/* <div className="chatOnlineWrapper">
          <ChatOnline onlineUsers={onlineUsers} 
          currentId={user._id} 
          setCurrentChat={setCurrentChat}/>
        </div> */}
        </div>
      </div>
      </div>
    </>
  )
}

