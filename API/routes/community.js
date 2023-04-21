const express = require("express");
const router = express.Router();
const Community = require("../models/Community");
const User = require("../models/User");

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

// Get all communities
router.get('/api/communities', async (req, res) => {
  try {
    const communities = await Community.find();
    res.status(200).json(communities);
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

    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).json("User not found");
    }

    if (community.members.includes(req.body.userId)) {
      return res.status(400).json("You are already a member of this community");
    }

    community.members.push(req.body.userId);
    user.communities.push(community._id);
    await community.save();
    await user.save();

    res.status(200).json("You have joined the community successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
