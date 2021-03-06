module.exports = function (sequelize, DataTypes) {

  var Animal = sequelize.define('Animal', {
      given_name: DataTypes.STRING,
      weight: DataTypes.FLOAT,
      picture_url: DataTypes.STRING,
      birth_date: DataTypes.DATE,
      gender: DataTypes.ENUM('male', 'female')
    }, {
      classMethods: {
        associate: function(models) {
        }
      },
      timestamps: false
    });

  return Animal;
};
