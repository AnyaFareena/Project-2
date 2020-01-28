module.exports = (sequelize, DataTypes) => {
  const Locations = sequelize.define('Locations', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    category: DataTypes.STRING,
  });
  return Locations;
};
