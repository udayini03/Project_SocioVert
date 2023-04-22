import "./message.css"
import { format } from "timeago.js";
// import Sidebar from "../sidebar/sidebar";
export default function Message({ message, own }) {
  return (
    <>
    <div className="background">
      <div className={own ? "message own" : "message "}>
          <div className="messageTop">
            <p className={own ? "message own messageText" : "message messageText"}>{message.text}</p>
          </div>
        <div className="messageBottom">{format(message.createdAt)}</div>
      </div>
    </div>
    </>
  )
}
