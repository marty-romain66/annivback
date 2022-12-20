'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserInEvenement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserInEvenement.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      UserInEvenement.belongsTo(models.Evenement, {
        foreignKey: 'evenementId'
      })
      UserInEvenement.hasMany(models.Post, {foreignKey : 'evenementId'})
      // UserInEvenement.hasMany(models.Post, {foreignKey : 'userId'})
      
    }
  }
  UserInEvenement.init({
    userId: DataTypes.INTEGER,
    evenementId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserInEvenement',
  });
  return UserInEvenement;
};