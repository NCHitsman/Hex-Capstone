'use strict';
module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define('Permission', {
    user_id: DataTypes.INTEGER,
    system_id: DataTypes.INTEGER,
    level: DataTypes.INTEGER
  }, {});
  Permission.associate = function(models) {
    Permission.belongsTo(models.User, {foreignKey:'user_id'})
    Permission.belongsTo(models.System, {foreignKey:'system_id', onDelete: 'cascade'})
  };
  return Permission;
};
