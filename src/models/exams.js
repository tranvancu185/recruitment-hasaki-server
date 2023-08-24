module.exports = (sequelize, DataTypes) => {
    const Exam = sequelize.define('exam', {
        exam_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          field: 'exam_id',
          autoIncrement: true,
          allowNull: false,
        },
        exam_name: {
          type: DataTypes.STRING,
          field: 'exam_name',
          allowNull: false,
        },
        exam_start_time: {
          type: DataTypes.STRING,
          field: 'exam_start_time',
          allowNull: true,
        },
        exam_end_time: {
          type: DataTypes.STRING,
          field: 'exam_end_time',
          allowNull: true,
        },
        exam_total_questions: {
          type: DataTypes.INTEGER,
          field: 'exam_total_questions',
          allowNull: false,
        },
        exam_passing_score: {
          type: DataTypes.INTEGER,
          field: 'exam_passing_score',
          allowNull: true,
        },
        exam_data: {
          type: DataTypes.TEXT,
          field: 'exam_data',
        },
      });
  
    return Exam;
  };
  