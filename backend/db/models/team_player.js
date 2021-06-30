'use strict';
module.exports = (sequelize, DataTypes) => {
  const Team_Player = sequelize.define('Team_Player', {
    user_id: DataTypes.INTEGER,
    team_id: DataTypes.INTEGER
  }, {});
  Team_Player.associate = function(models) {
    Team_Player.belongsTo(models.Team, {foreignKey: 'team_id'})
    Team_Player.belongsTo(models.User, {foreignKey: 'user_id'})
  };
  return Team_Player;
};
