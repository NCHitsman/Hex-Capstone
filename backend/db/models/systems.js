'use strict';
module.exports = (sequelize, DataTypes) => {
  const System = sequelize.define('System', {
    owner_id: DataTypes.INTEGER,
    name: DataTypes.STRING(30)
  }, {});
  System.associate = function(models) {
    System.belongsTo(models.User, {foreignKey:'owner_id'})
    System.hasMany(models.Permission, {foreignKey:'system_id'})
    System.hasMany(models.Team, {foreignKey:'system_id'})
    System.hasMany(models.Map, {foreignKey:'system_id'})
  };
  return System;
};
