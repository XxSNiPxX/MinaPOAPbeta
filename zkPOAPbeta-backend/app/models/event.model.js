module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define("Event", {
    eventid: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    eventname: DataTypes.STRING,
    description: DataTypes.STRING,
    reservedspots: DataTypes.INTEGER,
    totalslots: DataTypes.INTEGER,
    availableslots: DataTypes.INTEGER,
    creatorId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users', // name of the table
        key: 'id' // primary key in the Users table
      },
      allowNull: false
    },
    eventstatus: {
      type: DataTypes.ENUM('active', 'ended'),
      defaultValue: 'active'
    },
    eventinformation: DataTypes.TEXT,
    eventimagelink:DataTypes.STRING,
  });

  return Event;
};
