module.exports = (sequelize, DataTypes) => {
    const ExamQuestion = sequelize.define('exams_questions', {
        exams_questions_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          field: 'exams_questions_id',
          autoIncrement: true,
        },
        exams_questions_exam_id:{
          type: DataTypes.INTEGER,
          field: 'exams_questions_exam_id',
          allowNull: false,
        },
        exams_questions_questions_id: {
          type: DataTypes.INTEGER,
          field: 'exams_questions_questions_id',
          allowNull: false,
        },
      });
  
    return ExamQuestion;
};
  