import { useContext, useRef, useState } from "react"
import "./homeshare.css"
import { Cancel } from "@mui/icons-material";
import AttachmentIcon from '@mui/icons-material/Attachment';
import SendIcon from '@mui/icons-material/Send';
import { AuthContext } from "../../../context/AuthContext";
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
    <div className="homeshare">
      <div className="homeshareWrapper">
        <div className="homeshareTop">
          <img className="homeshareProfileImg" src={user.profilePicture ? PF + user.profilePicture : PF + "Persons/noAvatar.png"} alt=" " />
          <textarea placeholder={"     What's on your mind " + user.username + " ?"}
            className="homeshareInput"
            ref={desc} />
          <form className="homeshareBottom" onSubmit={submitHandler}>
            <label htmlFor="file" className="homeshareOption">
              <AttachmentIcon className="homeshareIcon" sx={{ color: "" }} />
              <span className="homeshareOptiontext"></span>
              <input style={{ display: "none" }} type="file" id="file" accept=".png,.jpeg,.jpg,.webp" onChange={(e) => setFile(e.target.files[0])} />
            </label>
            <button className="homeshareButton" type="submit"> <SendIcon fontSize="small" sx={{ color: "" }} /> </button>
          </form>
        </div>
        {file && (
          <div className="homeshareImgContainer">
            <img className="homeshareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="homeshareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
      </div>
    </div>
  )
}

