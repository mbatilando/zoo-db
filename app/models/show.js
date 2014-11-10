module.exports = function (sequelize, DataTypes) {

  var Show = sequelize.define('Show', {
    name: DataTypes.STRING,
    time: DataTypes.DATE,
    exhibit: {
      type: DataTypes.INTEGER,
      references: 'Exhibit',
      referencesKey: 'id'
    }
  });

  return Show;
};
