module.exports = function (sequelize, DataTypes) {

  var ZooMembership = sequelize.define('ZooMembership', {
    membership_expiration: DataTypes.DATE
  });

  return ZooMembership;
};
