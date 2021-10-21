const { registerUser, loginUser, users, userSearch } = require('../controller/userController');
const express = require('express');
const router = express.Router();


router.route('/').get((req,res)=>{ res.send('Welcome User!') });
router.route('/users/:email').get(userSearch);
router.route('/users/:name').get(userSearch);
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/users').get(users);

module.exports = router