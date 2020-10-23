const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/auht.json');
const auth = require('../middlewares/authentication');

const User = require('../models/User');

const router = express.Router();

function generateToken(params = {}) {
  return jwt.sign(params, config.secretKey, {
    expiresIn: 86400,
  });
}

router.post('/create', async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({where: {email}});

  if(userExists){
    return res.status(401).json({error: 'User already exists'})
  }

  const user = await User.create({name, email, password});

  return res.json(user);
});

router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;

  if(email === ''){
    return res.status(401).json({error: 'Enter a valid email address'})
  }

  if(password === ''){
    return res.status(401).json({error: 'Enter at least 8 characters'})
  }

  const user = await User.findOne({where: {email}});

  if(!user){
    return res.status(401).json({ error: 'User not found' });
  }
  console.log(user);

  if (!await bcrypt.compare(password, user.password_hash)){
    return res.status(401).send({ error: 'Invalid password' });
  }

  res.send({
    user,
    token: generateToken({ user, id: user.id }),
  });

});

// router.delete('/delete/:id/:id2', auth, async (req, res) => {});

// router.get('/page/:page', auth, async (req, res) => {});

// router.get('/:id/page/:page', auth, async (req, res) => {});

// router.delete('/:id', auth, async (req, res) => {});

module.exports = app => app.use('/user', router);
