module.exports = (sequelize, DataTypes) => {
  const EventReservation = sequelize.define("EventReservation", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    reward: {
      type: DataTypes.ENUM('unclaimed', 'claimed','pending'),
      defaultValue: 'unclaimed'
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
      allowNull: false
    },
    eventId: {
      type: DataTypes.STRING,
      references: {
        model: 'Events',
        key: 'eventid'
      },
      allowNull: false
    },
    transactionHash:{
      type:DataTypes.STRING,
      allowNull:true,
      defaultValue:null,
    }
  });

  return EventReservation;
};
