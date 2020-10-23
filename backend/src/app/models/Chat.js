const { Model, DataTypes } = require('sequelize');

class Chat extends Model {
  static init(sequelize) {
    super.init({
      user_sender: DataTypes.INTEGER,
      user_receiver: DataTypes.INTEGER,
      last_message: DataTypes.STRING,
      message_count: DataTypes.INTEGER,
    }, {
      sequelize,
    })
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_sender', as: 'users_sender' });
    this.belongsTo(models.User, { foreignKey: 'user_receiver', as: 'users_receiver' });
   // this.belongsToMany(models.Tech, { foreignKey: 'user_id', through: 'user_techs', as: 'techs' });
  }
}

module.exports = Chat;