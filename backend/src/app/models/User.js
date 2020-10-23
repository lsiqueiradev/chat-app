const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt'); 

class User extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      avatar: DataTypes.STRING,
      password: DataTypes.VIRTUAL,
      password_hash: DataTypes.STRING,
      active: DataTypes.INTEGER,
    }, {
      sequelize,
    });
    

    this.addHook('beforeSave', async (user) => {
      if(user.password){
        user.password_hash = await bcrypt.hash(user.password, 8);
      }

    });
    return this;
  }

  static associate(models) {
    this.hasMany(models.Chat, { foreignKey: 'user_sender', as: 'chats_sender' });
    this.hasMany(models.Chat, { foreignKey: 'user_receiver', as: 'chats_receiver' });
    this.hasMany(models.Message, { foreignKey: 'user_id', as: 'messages_user' });
   // this.belongsToMany(models.Tech, { foreignKey: 'user_id', through: 'user_techs', as: 'techs' });
  }
}

module.exports = User;