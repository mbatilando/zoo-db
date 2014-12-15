module.exports = function (sequelize, DataTypes) {

  var Users = sequelize.define('Users', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    user_type: DataTypes.ENUM('user', 'admin')
  }, { timestamps: false }
  );

  return Users;
};
