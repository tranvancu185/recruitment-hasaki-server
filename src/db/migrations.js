module.exports = (sequelize, DataTypes) => {
    const User = require('../models/users')(sequelize, DataTypes);
    const Role = require('../models/roles')(sequelize, DataTypes);
    const Permission = require('../models/permissions')(sequelize, DataTypes);
    const Department = require('../models/departments')(sequelize, DataTypes);
    const Exam = require('../models/exams')(sequelize, DataTypes);
    const Question = require('../models/questions')(sequelize, DataTypes);
    const ExamQuestion = require('../models/exams_questions')(sequelize, DataTypes);
    const UserExam = require('../models/user_exams')(sequelize, DataTypes);
    const UserPermission = require('../models/user_permission')(sequelize, DataTypes);
    
    return {
        User,
        Role,
        Permission,
        Department,
        Exam,
        Question,
        ExamQuestion,
        UserExam,
        UserPermission,
    };
}