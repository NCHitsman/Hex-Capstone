'use strict';
module.exports = (sequelize, DataTypes) => {
  const Map = sequelize.define('Map', {
    name: DataTypes.STRING(30),
    type: DataTypes.STRING(5),
    system_id: DataTypes.INTEGER,
    size: DataTypes.INTEGER,
    map_seed: DataTypes.STRING
  }, {});
  Map.associate = function(models) {
    Map.belongsTo(models.System, {foreignKey:'system_id'})
  };
  return Map;
};
