module.exports = (sequelize, DataTypes) => {
    const UserPermission = sequelize.define('user_permission', {
      user_permission_id: {
        type: DataTypes.INTEGER,
        field: 'user_permission_id',
        primaryKey: true,
        autoIncrement: true,
      },
      user_permission_user_id: {
        type: DataTypes.INTEGER,
        field: 'user_permission_user_id',
        allowNull: false,
      },
      user_permission_permission_id: {
        type: DataTypes.INTEGER,
        field: 'user_permission_permission_id',
        allowNull: false,
      }
    });
  
    return UserPermission;
  };
  