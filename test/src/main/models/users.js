module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      field : 'id'
    },
    name:
    { 
    type : DataTypes.STRING(255),
    field :'name'
    },
    token: 
    {
      type: DataTypes.STRING(255),
      field : 'token'
    
    },
  
  }, {
    tableName: 'users',
    timestamps: true,
  
  });
};
