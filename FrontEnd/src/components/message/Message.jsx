import "./message.css"
import {format} from "timeago.js";

export default function Message({message,own}) {
  return (
    <div className={own ? "message own" : "message "}>
    <div className="messageTop">
    <img className="messageImg" src="https://images.hindustantimes.com/img/2022/12/12/550x309/_38b36c44-c6e8-11e9-9ed0-dd7a6b36c3ad_1670826748640_1670826748640.jpg" alt=""/>
    <p className="messageText">{message.text}</p>
    </div>
    <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  )
}
