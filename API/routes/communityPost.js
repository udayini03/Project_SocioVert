const express = require('express');
const router = express.Router();
const communityPost = require("../models/communityPost");
const community = require("../models/Community")

router.post('/api/community/posts', async (req, res) => {
  try {
    const newPost = new CommunityPost(req.body);
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
