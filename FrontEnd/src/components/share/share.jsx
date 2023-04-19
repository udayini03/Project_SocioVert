import { useContext, useRef, useState } from "react"
import "./share.css"
import { Cancel } from "@mui/icons-material";
import AttachmentIcon from '@mui/icons-material/Attachment';
import SendIcon from '@mui/icons-material/Send';
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id.toString(),
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try {
        await axios.post("/upload", data);
      } catch (err) { }
    }
    try {
      const res = await axios.post("/posts", newPost);
      console.log(res);
      window.location.reload();

    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={user.profilePicture ? PF + user.profilePicture : PF + "Persons/noAvatar.png"} alt=" " />
          <input placeholder={"     What's on your mind " + user.username + " ?"}
            className="shareInput"
            ref={desc} />
          <form className="shareBottom" onSubmit={submitHandler}>
            <label htmlFor="file" className="shareOption">
              <AttachmentIcon className="shareIcon" sx={{ color: "" }} />
              <span className="shareOptiontext"></span>
              <input style={{ display: "none" }} type="file" id="file" accept=".png,.jpeg,.jpg,.webp" onChange={(e) => setFile(e.target.files[0])} />
            </label>
            <button className="shareButton" type="submit"> <SendIcon fontSize="small" sx={{ color: "" }} /> </button>
          </form>
        </div>
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
      </div>
    </div>
  )
}

