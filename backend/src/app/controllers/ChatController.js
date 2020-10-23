const express = require('express');
const { Op, literal } = require("sequelize");
const auth = require('../middlewares/authentication');

const User = require('../models/User');
const Chat = require('../models/Chat');
const Message = require('../models/Message');

const router = express.Router();


router.post('/', auth,async (req, res) => {
  const { user_sender, user_receiver } = req.body;

  await Chat.findOrCreate(
    {
      where: {
        [Op.or]: [
          {
            [Op.and]: [{ user_receiver:user_receiver }, { user_sender:user_sender }],
          },
          {
            [Op.and]: [{ user_sender: user_receiver }, { user_receiver: user_sender }],
          }
        ]
      },
      defaults: {user_sender,user_receiver}
    }
  ).then((result, created) => {

    return res.json(result);
  });
});

router.delete('/delete/:id/:id2', auth, async (req, res) => {});

router.get('/page/:page', auth, async (req, res) => {
  const { userLogged, params } = req;
  
  const { page } = params;
  const user_id = userLogged.id;

  const chats = await Chat.findAll({
    where: {
      [Op.or]: [
        {
          [Op.and]: [{ user_receiver: { [Op.ne]: user_id } }, { user_sender: user_id }],
        },
        {
          [Op.and]: [{ user_sender: { [Op.ne]: user_id } }, { user_receiver: user_id }],
        }
      ]
    },
    include: [{
      model: User,
      as: 'users_sender'
    },{
      model: User,
      as: 'users_receiver'
    }],
    limit: 10,
    offset: (page -1) * 10,
    order: [
      ['updated_at', 'DESC'],
    ],
  });
  const chatsCount = await Chat.count({
    distinct: 'id',
    where: {
      [Op.or]: [{ user_receiver: user_id },{user_sender: user_id }]
    },
  });

  return res.json({chats, chatsCount});

});

router.get('/:id/page/:page', auth, async (req, res) => {
  const { page, id } = req.params;

  const position = (page -1) * 20;

  const messages = await Message.findAll({
    where: {
      chat_id: id
    },
    include: [{
      model: User,
      as: 'user'
    }],
    limit: 20,
    offset: position,
    order: [
      ['created_at', 'DESC'],
    ],
  });

  const messagesCount = await Message.count({
    distinct: 'id',
    where: {
      chat_id: id
    },
  });

  let array = {
    countMessages:messagesCount, 
    messages
  };

  return res.json(array);

});

router.post('/send/:id', auth, async (req, res) => {
  const { userLogged, io, connectedUsers, body, params } = req;
  const { id } = params;
  const { text } = body;
  const user_id = userLogged.id;
  const name = userLogged.name;


  const chat = await Chat.findByPk(id);

  if(!chat){
    return res.status(401).json({error: 'Chat not found!'})
  }

  const message = await Message.create({
    chat_id: id,
    user_id: user_id,
    text
  });  

  chat.message_count = literal('message_count + 1');
  chat.last_message = text;
  await chat.save();

  if (connectedUsers) {
    let userid;
    if (chat.user_receiver === user_id) {
      userid = chat.user_sender;
    } else {
      userid = chat.user_receiver;
    }
    const userSocket = connectedUsers[userid];
    if (userSocket) {
      const msg = {
        id: chat.id,
        text,
        created_at: chat.created_at,
        user: {
          _id: user_id,
          name,
        },
      };
      io.to(userSocket).emit('response', msg);
    }
  }

  return res.send(message);
});

router.delete('/:id', auth, async (req, res) => {});

module.exports = app => app.use('/chat', router);
