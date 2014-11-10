module.exports = function (sequelize, DataTypes) {

  var ZooCustomer = sequelize.define('ZooCustomer', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone: DataTypes.STRING,
  });

  return ZooCustomer;
};

