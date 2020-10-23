const { Model, DataTypes } = require('sequelize');

class Message extends Model {
  static init(sequelize) {
    super.init({
      chat_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      text: DataTypes.STRING,
    }, {
      sequelize,
    })
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

module.exports = Message;