'use strict';
module.exports = (sequelize, DataTypes) => {
  const Team_Player = sequelize.define('Team_Player', {
    user_id: DataTypes.INTEGER,
    team_id: DataTypes.INTEGER,
    system_id: DataTypes.INTEGER,
    captain: DataTypes.BOOLEAN,
  }, {});
  Team_Player.associate = function(models) {
    Team_Player.belongsTo(models.Team, {foreignKey: 'team_id', onDelete: 'cascade'})
    Team_Player.belongsTo(models.User, {foreignKey: 'user_id'})
    Team_Player.belongsTo(models.System, {foreignKey: 'system_id', onDelete: 'cascade'})
  };
  return Team_Player;
};
