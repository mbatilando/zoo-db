module.exports = function (sequelize, DataTypes) {

  var Animal = sequelize.define('Animal', {
    given_name: DataTypes.STRING,
    weight: DataTypes.STRING,
    picture_url: DataTypes.STRING,
    birth_date: DataTypes.DATE,
    gender: DataTypes.ENUM('male', 'female'),
    species: {
    	type: DataTypes.INTEGER,
    	references: 'Species',
    	referencesKey: 'id'
    }
  });

  return Animal;
};