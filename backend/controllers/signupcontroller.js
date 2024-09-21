const User = require("../models/signup");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const buser=require("../models/login");
const generateToken=require("../config/generateToken");


exports.signupUser = async (req, res) => {
    const { username, email, password } = req.body;
    // console.log(User);
     
    try {
      // Hash the password
      if(!username || !email || !password){
        return res.status(400).json({ message: 'teen field bharni h, wo bhi nhi bhari jari' });
      }

      const chuser=await User.findOne({email});
if(chuser){
  return res.status(404).json({ message: 'dubara aake khud ko cool samajh rha h?' });
}

      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user in the database
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword
      });

      const newbuser= await buser.create({
        email,
        password: hashedPassword
      });
  
      // Generate JWT token
      const token = generateToken(newUser._id);

  
      // Send token to client
      res.status(201).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
}; 