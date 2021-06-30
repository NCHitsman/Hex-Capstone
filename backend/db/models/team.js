'use strict';
module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    name: DataTypes.STRING(30),
    system_id: DataTypes.INTEGER,
    faction: DataTypes.STRING(5),
    points: DataTypes.INTEGER
  }, {});
  Team.associate = function(models) {
    Team.belongsTo(models.System, {foreignKey: 'system_id'})
    Team.hasMany(models.Team_Player, {foreignKey: 'team_id'})
  };
  return Team;
};
