import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";


// login user function
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body; 
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid username or password");
  }
});


// register user function
const registerUser = asyncHandler(async (req, res, next) => {
  const { email, name, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists.");
  }

  try {
    const user = await User.create({
      name,
      email,
      password,
    });
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
          });
    }else{
        res.status(400);
        throw new Error("Invalid user details");
    }
    
  } catch (err) {
    res.status(400);
    throw new Error(err);
  }
});


// get user profile function
const getProfile = asyncHandler(async (req, res, next) => {
  const user = req.user;
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});


// update user profile function
const updateProfile = asyncHandler(async (req, res, next) => { 
  const userExists = await User.findById(req.user._id);
  if (userExists) {

    userExists.name = req.body.name || userExists.name
    userExists.email = req.body.email || userExists.email
    if(req.body.password){
      userExists.password = req.body.password
    }
    const updateUser = await userExists.save()

    if(updateUser){
      res.status(200).json({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        isAdmin: updateUser.isAdmin,
        token: generateToken(updateUser._id),
      });
    }
    
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { login, getProfile, registerUser,updateProfile };
