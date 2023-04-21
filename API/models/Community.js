const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  tags: {
    type: [String],
    required: true,
    default: []
  },
  members: {
    type: [String],
    required: true,
    default: []
  },
  admins: {
    type: [String],
    required: true,
    default: []
  },
  owner: {
    type: String,
    required: true
  },
  profilePicture :{
    type: String,
    default: "",
  },
  coverPicture :{
    type: String, 
    default : "",
  }
}, { timestamps: true });

const Community = mongoose.model('Community', communitySchema);

module.exports = Community;
