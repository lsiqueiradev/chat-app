const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Chat = require('../app/models/Chat');
const Message = require('../app/models/Message');
const User = require('../app/models/User');

const connection = new Sequelize(dbConfig);

Chat.init(connection);
Message.init(connection);
User.init(connection);

Chat.associate(connection.models);
User.associate(connection.models);
Message.associate(connection.models);
// Message.associate(connection.models);

module.exports = connection;