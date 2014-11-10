module.exports = function (sequelize, DataTypes) {

  var Zoo = sequelize.define('Zoo', {
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
    country: DataTypes.STRING,
    opening_time: DataTypes.DATE,
    closing_time: DataTypes.DATE
  });

  return Zoo;
};

