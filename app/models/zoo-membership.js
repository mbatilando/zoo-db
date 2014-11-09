// Example model


module.exports = function (sequelize, DataTypes) {

  var ZooMembership = sequelize.define('Zoo Membership', {
    zoo_id: DataTypes.INTEGER,
    zoo_customer_id: DataTypes.INTEGER,
    membership_expiration: DataTypes.DATE
  });

  return ZooMembership;
};