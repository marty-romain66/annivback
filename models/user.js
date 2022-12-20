'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Evenement, {
        foreignKey: 'userId'
      })
      models.User.hasMany(models.UserInEvenement, {
        foreignKey: 'userId'
      })
    }
  }
  User.init({
    email: DataTypes.STRING,
    adress: DataTypes.STRING,
    password: DataTypes.STRING,
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    numero: DataTypes.STRING,
    evenementId : DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};