module.exports = function (sequelize, DataTypes) {

  var Exhibit = sequelize.define('Exhibit', {
    name: DataTypes.STRING
  }, {
  	classMethods: {
	    associate: function(models) {
	      Exhibit.hasMany(models.Show);
	      Exhibit.hasMany(models.Animal);
	    },
      timestamps: false
	}
  });

  return Exhibit;
};
