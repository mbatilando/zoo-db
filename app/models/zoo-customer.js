module.exports = function (sequelize, DataTypes) {

  var ZooCustomer = sequelize.define('Zoo Customer', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
      classMethods: {
        associate: function(models) {
          ZooCustomer.hasMany(models.ZooMembership);
        }
      },
      timestamps: false
    }
  );

  return ZooCustomer;
};
