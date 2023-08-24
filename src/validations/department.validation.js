const { body } = require('express-validator');

const departmentValidations = {
  department_id: [],
  department_name: [body('department_name').notEmpty().withMessage('Department name is required')],
  department_status: [],
};

module.exports = departmentValidations;
