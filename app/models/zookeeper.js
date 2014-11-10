module.exports = function (sequelize, DataTypes) {

  var Zookeeper = sequelize.define('Zookeeper', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone: DataTypes.STRING,
    work_days: DataTypes.ENUM('M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su'),
    zoo: {
      type: DataTypes.INTEGER,
      references: 'Zoo',
      referencesKey: 'id'
    }
  });

  return Zookeeper;
};
