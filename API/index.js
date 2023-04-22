const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const ConversationRoute = require("./routes/coversations");
const MessageRoute = require("./routes/messages");
const path = require("path");
const communityRoute = require("./routes/community");
const communityPostRoute = require("./routes/communityPost");


const multer = require("multer");

dotenv.config();

async function connectToMongo() {
    try {
      await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
      console.log('Connected to MongoDB!');
      // your code here
    } catch (err) {
      console.error('Error connecting to MongoDB:', err.message);
    }
  }
  
  connectToMongo();

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));   

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"public/images")
  },
  filename: (req,file,cb)=>{
    cb(null, req.body.name);
  },
});

const upload = multer({storage: storage});
app.post("/api/upload", upload.single("file"), (req,res)=>{
  try{
    return res.status(200).json("File Uploaded Successfully")
  }catch(err){
    console.log(err);
  }
})

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", ConversationRoute);
app.use("/api/messages", MessageRoute);
app.use("/api/community", communityRoute);
app.use("/api/communityPost", communityPostRoute);


app.listen(8800, ()=> {
    console.log("Server is Running!")
});