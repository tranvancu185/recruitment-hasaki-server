const { body } = require('express-validator');

const roleValidations = {
  role_id: [],
  role_name: [body('role_name').notEmpty().withMessage('Role name is required')],
  role_status: [],
};

module.exports = roleValidations;
