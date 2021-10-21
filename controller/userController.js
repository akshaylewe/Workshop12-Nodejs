const User = require("../model/userModel");

//APi'S
//Register Api
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  });
  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role:user.role
    });
  } else {
    res.status(400);
    throw new Error("Error Occured");
  }
};

//Login Api
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      Welcome: user.name,
      YourEmail: user.email,
      YourRole: user.role
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email and Password");
  }
};

//Get Users Api With Paginating
const users = async (req, res) => {
  const { page = 1, limit = 6} = req.query;

  const user = await User.find()
    .limit(limit * 1)
    .skip((page - 1) * limit);
  if (user) {
    res.json({
      users: user.length,
      user,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Request");
  }
};

//Search User Api With Sorting & Filtering
const userSearch  = async (req, res) => {
    const regex = new RegExp(req.params.name,'i');
    const regexemail = new RegExp(req.params.email,'i')
  
    const user = await User.find({name:regex, email:regexemail})
    if (user) {
      res.json({
        users: user.length,
        user,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Request");
    }
  };




module.exports = { registerUser, loginUser, users, userSearch };
