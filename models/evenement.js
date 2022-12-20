'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Evenement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Evenement.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      Evenement.hasMany(models.UserInEvenement, {foreignKey : 'evenementId'})
      Evenement.hasMany(models.Post, {foreignKey : 'evenementId'})
    // un evenement a un user

    Evenement.belongsTo(models.User, {
      foreignKey: 'userId'
    })
    

    }
  }
  Evenement.init({
    evenementName: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Evenement',
  });
  return Evenement;
};