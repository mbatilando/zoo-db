module.exports = function (sequelize, DataTypes) {

  var Species = sequelize.define('Species', {
    scientific_name: DataTypes.STRING,
    common_name: DataTypes.STRING,
    description: DataTypes.STRING(1000)
  }, {
      classMethods: {
        associate: function(models) {
          Species.hasMany(models.Animal, {
          	foreignKey: 'SpeciesId'
          });
        }
      }
    }
  );

  return Species;
};
