module.exports = function (sequelize, DataTypes) {

  var ZooMembership = sequelize.define('ZooMembership', {
    membership_expiration: DataTypes.DATE
  }, {
  	timestamps: false
  });

  return ZooMembership;
};
