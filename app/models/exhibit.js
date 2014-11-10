module.exports = function (sequelize, DataTypes) {

  var Exhibit = sequelize.define('Exhibit', {
    name: DataTypes.STRING,
    zookeeper: {
      type: DataTypes.INTEGER,
      references: 'Zookeeper',
      referencesKey: 'id'
    }
  });

  return Exhibit;
};
