const User = require("../models/User");
const Tailor = require("../models/Tailor");
const Vendor = require("../models/Vendor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
// tailor sign up
  creatNewTailor: async (req, res, next, anyUserHashedPassword) => {
    const { username, email, location, phone, description, tailorType } =
      req.body;
    try {
      const alreadyExist = await Tailor.findOne({ email: email }); // user already exists
      if (alreadyExist) throw new Error("This tailor already Exists");
  
      const newTailor = new Tailor({
        username: username,
        password: anyUserHashedPassword,
        email: email,
        location: location,
        tailorType: tailorType,
        phone: phone,
        description: description,
      });
      const savedTailor = await newTailor.save();
      res.json({ NewUser: savedTailor._id, username: username });
    } catch (err) {
      next(err);
    }
  },

  // user sign up
  creatNewUser: async (req, res, next, anyUserHashedPassword) => {
    const { username, email } = req.body;
    try {
      const alreadyExist = await User.findOne({ email: email });
      if (alreadyExist) throw new Error("This user already Exists");
  
      const newUser = new User({
        username: username,
        password: anyUserHashedPassword,
        email: email,
      });
  
      const savedUser = await newUser.save();
      res.json({ NewUser: savedUser._id, username: username });
    } catch (err) {
      next(err);
    }
  },
  
  // vendor sign up
  creatNewVendor: async (req, res, next, anyUserHashedPassword) =>{
    const { username, email, location, phone, description, tailorType } =
      req.body;
    try {
      const alreadyExist = await Vendor.findOne({ email: email }); // user already exists
      if (alreadyExist) throw new Error("This Vendor already Exists");
  
      const newVendor = new Vendor({
        username: username,
        password: anyUserHashedPassword,
        email: email,
        location: location,
        phone: phone,
        description: description,
      });
      const savedVendor = await newVendor.save();
      res.json({ NewUser: savedVendor._id, username: username });
    } catch (err) {
      next(err);
    }
  },
  
  // tailor login 
  tailorLogIn: async (req, res, next)=> {
    try {
      const foundTailor = await Tailor.findOne({ email: req.body.email });
      if (!foundTailor) throw new Error("tailor email notttt found");
      const validPass = await bcrypt.compare(
        req.body.password,
        foundTailor.password
      );
      if (!validPass) throw new Error("passowrd didn't match");
      createToken(res, foundTailor._id, foundTailor.username, req.body.type); // assign a token for each user
    } catch (err) {
      next(err);
    }
  },
  
  // user login
  userLogIn: async (req, res, next) => {
    try {
      const foundUser = await User.findOne({ email: req.body.email });
  
      if (!foundUser) throw new Error("user email notttt found");
      const validPass = await bcrypt.compare(
        req.body.password,
        foundUser.password
      );
      if (!validPass) throw new Error("passowrd didn't match");
      createToken(res, foundUser._id, foundUser.username, req.body.type); // assign a token for each user
    } catch (err) {
      next(err);
    }
  },
  
  // vendor login
  vendorLogIn: async(req, res, next) => {
    try {
      const foundVendor= await Vendor.findOne({ email: req.body.email });
      if (!foundVendor) throw new Error("Vendor email notttt found");
      const validPass = await bcrypt.compare(
        req.body.password,
        foundVendor.password
      );
      if (!validPass) throw new Error("passowrd didn't match");
      createToken(res, foundVendor._id, foundVendor.username, req.body.type); // assign a token for each user
    } catch (err) {
      next(err);
    }
  }
}

// creating user token
function createToken(res, userId, username, type){
  const token = jwt.sign(
    { _id: userId, username: username, type: type },
    process.env.Token_Secret,
    { expiresIn: "1h" }
  );
  res.json({ token: token });
}