const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('./database');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectedUsers = {};

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;
  return next();
});


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

require('./app/controllers/index')(app);

var port = process.env.PORT || 3333;

app.listen(port, () => {
  io.on('connection', (socket) => {
    const { user_id } = socket.handshake.query;
    connectedUsers[user_id] = socket.id;
  });

  console.info(`Servidor rodando na porta ${port}`);
});