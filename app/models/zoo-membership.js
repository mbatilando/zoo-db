module.exports = function (sequelize, DataTypes) {

  var ZooMembership = sequelize.define('Zoo Membership', {
    zoo_id: {
      type: DataTypes.INTEGER,
      references: 'Zoo',
      referencesKey: 'id'
    },
    zoo_customer_id: {
      type: DataTypes.INTEGER,
      references: 'Zoo Customer',
      referencesKey: 'id'
    },
    membership_expiration: DataTypes.DATE
  });

  return ZooMembership;
};
