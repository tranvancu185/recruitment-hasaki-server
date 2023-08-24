module.exports = (sequelize, DataTypes) => {
  const UserExam = sequelize.define('user_exam', {
    user_exam_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'user_exam_id',
      autoIncrement: true,
    },
    user_exam_exam_id:{
      type: DataTypes.INTEGER,
      field: 'user_exam_exam_id',
      allowNull: false,
    },
    user_exam_user_id: {
      type: DataTypes.INTEGER,
      field: 'user_exam_user_id',
      allowNull: false,
    },
    user_exam_score: {
      type: DataTypes.INTEGER,
      field: 'user_exam_score',
      allowNull: false,
    },
    user_exam_start_time: {
      type: DataTypes.STRING,
      field: 'user_exam_start_time',
      allowNull: false,
    },
    user_exam_end_time: {
      type: DataTypes.STRING,
      field: 'user_exam_end_time',
      allowNull: false,
    },
    user_exam_data: {
      type: DataTypes.TEXT,
      field: 'user_exam_data',
      // Add other fields as needed
    },
  });
  
    return UserExam;
  };
  