module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('question', {
    question_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'question_id',
      autoIncrement: true,
      allowNull: false,
    },
    question_content: {
      type: DataTypes.TEXT,
      field: 'question_content',
      allowNull: false,
    },
    question_type: {
      type: DataTypes.TEXT,
      field: 'question_type',
      allowNull: true,
    },
    question_answer: {
      type: DataTypes.TEXT,
      field: 'question_answer',
      allowNull: true,
    },
    question_data: {
      type: DataTypes.TEXT,
      field: 'question_data',
      get: function() {
        return JSON.parse(this.getDataValue("question_data"));
      },
      set: function(value) {
        return this.setDataValue("question_data", JSON.stringify(value));
      }
    },
  });
  
    return Question;
  };
  