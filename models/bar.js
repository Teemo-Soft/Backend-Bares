'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bar = sequelize.define('Bar', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    address: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {paranoid: true});
  Bar.associate = function(models) {
    Bar.belongsTo(models.User, {as: 'users',foreignKey: 'userId'})
  };
  return Bar;
};