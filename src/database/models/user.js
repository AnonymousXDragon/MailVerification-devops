'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    lastlogin: DataTypes.DATE,
    isverified: DataTypes.BOOLEAN,
    resetPasswordToken: DataTypes.STRING,
    resetPasswordExpiresAt: DataTypes.DATE,
    verificationToken: DataTypes.STRING,
    verificationTokenExpiresAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'user',
  });

  user.addHook('beforeSave',(user,options) => {
    const randNum = Math.floor(10000 * Math.random * 90000)
    user.resetPasswordToken = randNum;
    user.isverified = false;
    user.lastlogin = new Date();
    user.verificationToken = '';
    user.verificationTokenExpiresAt = new Date();
  })
  return user;
};