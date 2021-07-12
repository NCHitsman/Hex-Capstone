# Planetary Empires

Planetary Empires is an expansion game for Warhammer 40,000 released by Games Workshop. The game rules and accompanying map board and pieces allow you to wage a campaign across a planetary-size landscape. It is designed to help you run evocative, narrative-driven campaign. 

This site helps you organize players, systems, and maps, allowing you to run a Planetary Empires game all in one place! Create an account, create a System, invite your friends, and make multiple Maps to play on!

![Example Gif](./frontend/src/images/example.gif)

## Technologies Used

- Javascript
- PostgresQL
- Sequelize
- React
- Redux
- ThreeJS

## MVPs

### Systems
- The ability to view Systems you own and have been invited too.
- The ability to make Systems.
- The ability to delete owned Systems.

### Maps
- The ability to view maps you have have, or maps in systems you have been invited too.
- The ability to create maps using a ThreeJS hex grid.
- The ability to delete your maps.

### Inviting
- The ability to invite other users to your owned Systems by username.
- The ability for invited users to view your System and Maps.
- The ability for invited users to interact with the System in different ways depending on permissions.

### Map Mechanics
- The ability to interact with maps you have owner or captian permissions on.
- The ability to add game buildings.
- The ability to clear tiles.
- The ability to add teritory for your team, or for any team in the case of the owner.
- The ability to save your changes.

### Join Teams
- The ability to accept or decline system invites.
- The ability to be set as a player on a team, or to set yourself and others on teams if you are a Captian.
- The ability to create teams if you are a Captian.
- The ability to delete teams if you are a Captian.

### Permissions
- The ability to give permissions to players when inviting them.
- The ability to choose between the 'Player' and 'Captian' permissions.
- The ability for those permissions to change how the invited users can interact with the System and it's Maps.
- The ability for inivted users to only see certian options when they have a specific permission.

