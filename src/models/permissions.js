module.exports = (sequelize, DataTypes) => {
    const Permission = sequelize.define("permission", {
      permission_id: {
        type: DataTypes.INTEGER,
        field: 'permission_id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      permission_name: {
        type: DataTypes.STRING,
        field: 'permission_name',
        allowNull: false,
      },
      permission_config: {
        type: DataTypes.TEXT,
        field: 'permission_config',
        allowNull: true,
      },
    });
  
    return Permission;
  };