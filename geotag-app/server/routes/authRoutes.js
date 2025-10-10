const express = require('express');
const router = express.Router();
const User = require('../models/users');

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
    /*
    accces it like this in frontend axios
    try {
      const response = await axios.post('/api/auth/register', {
       name: '',
       email: '',
       password: ''
     });
    }
     catch (err) {
       // The server response is in err.response.data
       console.log(err.response.data.message); // "All fields are required"
     }
   Key points
   err.response → contains the full response object from the server.
   err.response.data → contains the JSON object sent by res.json().
   err.response.data.message → accesses the message property you defined.
    */
  }

  try {
    const user = new User({ name, email, password });
    await user.save();
    //.save() is a method on Mongoose document instances used to store or update data in MongoDB.
    res.status(200).json({ message: 'Signup successful' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
});

module.exports = router;
/*
module.exports is the Node.js syntax for exporting something
from a file so that other files can import it.
module.exports
This is the actual object that Node returns when you use require().
You can assign any value to it: an object, a function, a class, etc.

Example:
// math.js
module.exports = function add(a, b) {
  return a + b;
};

// main.js
const add = require('./math');
console.log(add(2, 3)); // 5

Here, module.exports was assigned a function, and that’s what require() returns.

const authRoutes = require('./authRoutes'); in index.js is used to import this file
*/
