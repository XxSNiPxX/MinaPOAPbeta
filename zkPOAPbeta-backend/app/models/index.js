const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.event = require("../models/event.model.js")(sequelize, Sequelize);
db.eventregistration = require("../models/eventregistration.model.js")(sequelize, Sequelize);


db.role.belongsToMany(db.user, {
  through: "user_roles"
});
db.user.belongsToMany(db.role, {
  through: "user_roles"
});

db.user.hasMany(db.event, { foreignKey: 'creatorId' });
db.event.belongsTo(db.user, { foreignKey: 'creatorId', as: 'creator' });

   db.eventregistration.belongsTo(db.event, {
     foreignKey: 'eventId',
     as: 'event',
   });


   db.eventregistration.belongsTo(db.user, {
     foreignKey: 'userId',
     as: 'user',
   });

db.user.belongsToMany(db.event, { through: db.eventregistration, foreignKey: 'userId', as: 'joinedEvents' });
db.event.belongsToMany(db.user, { through: db.eventregistration, foreignKey: 'eventid', as: 'reservedUsers' });


db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
