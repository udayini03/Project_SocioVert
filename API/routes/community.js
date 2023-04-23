const express = require("express");
const router = express.Router();
const Community = require("../models/Community");
const User = require("../models/User");
const communityPost = require("../models/communityPost")

// Create a new community
router.post("/createCommunity", async (req, res) => {
  try {
  const newCommunity = new Community({
    name: req.body.name,
    description: req.body.description,
    owner: req.body.owner,
    tags : req.body.tags,
    profilePicture : req.body.profilePicture,
    coverPicture : req.body.coverPicture,
  });
  const savedCommunity = await newCommunity.save();
    res.status(200).json(savedCommunity);
  } catch (err) {
    res.status(500).json(err);
  }
});

//fetch the community

router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const communities = await Community.find({ members: userId });
    res.json(communities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});



// Get all communities
router.get('/communities', async (req, res) => {
  try {
    const communities = await Community.find();
    res.status(200).json(communities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Search for Community

router.get('/search', async (req, res) => {
  try {
    const searchQuery = req.query.q;
    const communities = await Community.find({
      name: { $regex: new RegExp(searchQuery, "i") }
    });
    res.json(communities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//posting in a community 

router.post('/:id/post', async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }

    const newPost = {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      postImage : req.body.postImage
    };
    
    // initialize the posts field if it is undefined
    if (!community.posts) {
      community.posts = [];
    }
    
    community.posts.push(newPost);
    await community.save();

    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Get a specific community by ID
router.get("/:communityid", async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    res.status(200).json(community);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a community
router.put("/:id", async (req, res) => {
  try {
    const updatedCommunity = await Community.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCommunity);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a community
router.delete("/:id", async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    if (!community) {
      return res.status(404).json("Community not found");
    }

    // Remove the community from all users who are members
    const members = community.members;
    for (let i = 0; i < members.length; i++) {
      const member = await User.findById(members[i]);
      member.communities = member.communities.filter(
        (c) => c.toString() !== community._id.toString()
      );
      await member.save();
    }

    await community.delete();
    res.status(200).json("Community deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});


// Join a community
router.put("/:id/join", async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    if (!community) {
      return res.status(404).json("Community not found");
    }

    // Check if user is already a member of the community
    if (community.members.includes(req.body.userId)) {
      return res.status(400).json("You are already a member of this community");
    }

    // Add user to the community's members list
    community.members.push(req.body.userId);

    // Save the updated community
    await community.save();

    res.status(200).json("You have joined the community successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});


//Leave the Community 

router.post('/:id/leave', async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }

    // Check if the user is a member of the community
    const userId = req.body.userId;
    if (!community.members.includes(userId)) {
      return res.status(400).json({ message: 'User is not a member of the community' });
    }

    // Remove the user from the community's members array
    community.members = community.members.filter(member => member.toString() !== userId.toString());
    await community.save();

    // Remove the community from the user's communities array
    const user = await User.findById(userId);
    user.communities = user.communities.filter(communityId => communityId.toString() !== req.params.id.toString());
    await user.save();

    res.status(200).json({ message: 'Successfully left the community' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
