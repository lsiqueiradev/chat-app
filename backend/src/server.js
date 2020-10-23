var express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('./database');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

const connectedUsers = {}

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;
  return next();
});

require('./app/controllers/index')(app);

io.on('connection', function(socket){

  const { user_id } = socket.handshake.query;
  connectedUsers[user_id] = socket.id;
  console.log(connectedUsers);
})

server.listen(3333);