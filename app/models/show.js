module.exports = function (sequelize, DataTypes) {

  var Show = sequelize.define('Show', {
    name: DataTypes.STRING,
    time: DataTypes.STRING
  }, {
  	timestamps: false
  });

  return Show;
};
