module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define("role", {
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'role_id',
        primaryKey: true,
        autoIncrement: true,
      },
      role_name: {
        type: DataTypes.STRING,
        field: 'role_name',
        allowNull: false,
      },
      role_status:{
        type: DataTypes.INTEGER,
        field: 'role_status',
        allowNull: true,
      }
    });
  
    return Role;
  };
  