const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const bodyParser = require('body-parser');


router.use(bodyParser.json());



//update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});


//get a user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
     ? await User.findById(userId)
     : await User.findOne({username: username});
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get Friends

router.get("/friends/:userId", async (req,res)=>{
  try{
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map(freindId => {
        return User.findById(freindId)
      })
    )
    let friendList = [];
    friends.map(friend=>{
      const {_id, username, profilePicture} = friend;
      friendList.push({_id, username,profilePicture});
    })
    res.status(200).json(friendList)
  }catch(err){
    res.status(500).json(err);
  }
})

//follow a user

router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you already follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});

//unfollow a user

router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser.updateOne({ $pull: { followings: req.params.id } });
          res.status(200).json("user has been unfollowed");
        } else {
          res.status(403).json("you dont follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant unfollow yourself");
    }
  });

  // PUT /users/:username
// Update user profile
router.put("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const updatedUser = await User.findOneAndUpdate(
      { username },
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          desc: req.body.desc,
          city: req.body.city,
          from: req.body.from,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // Compare password hash
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // Login successful
  // Generate and return JWT token, redirect to dashboard, etc.
  res.json({ message: 'Login successful' });
});


//search an user

router.get('/search', async (req, res) => {
  try {
    const query = req.query.q;
    const users = await User.find({
      username: { $regex:  new RegExp(searchQuery, "i") }
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;