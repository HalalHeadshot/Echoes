const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/users');
const verifyToken = require('../middleware/verifyToken');
const jwt = require('jsonwebtoken');

router.post('/sethome', verifyToken, async (req, res) => {
  try {
    //Find user by ID
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    //Update or create home coordinates
    user.home = {
      lat: req.body.lat,
      lng: req.body.lng,
    };

    //Save changes
    await user.save();

    res.json({ message: 'Home location saved successfully', home: user.home });
  } catch (err) {
    console.error('Error saving location:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/gethome',verifyToken,async(req,res)=>{
try{
 const user= await User.findById(req.userId).select('home');
 if(!user) return res.status(404).json({ message: 'could fetch user home Coordinates' });
 res.status(200).json(user.home);
} 
catch(err){
 console.error('Error fetching home location:', err);
 res.status(500).json({ message: 'Server error' });
}
});







module.exports=router;