module.exports = (sequelize, DataTypes) => {
    const Department = sequelize.define("department", {
      department_id: {
        type: DataTypes.INTEGER,
        field: 'department_id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      department_name: {
        type: DataTypes.STRING,
        field: 'department_name',
        allowNull: false,
      },
      department_status:{
        type: DataTypes.INTEGER,
        field: 'department_status',
        allowNull: true,
      }
    });
  
    return Department;
  };
  