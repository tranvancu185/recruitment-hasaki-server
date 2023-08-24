const { body } = require('express-validator');

const userValidations = {
  user_id: [],
  user_name: [body('user_name').notEmpty().withMessage('User name is required')],
  user_phone: [],
  user_email: [body('user_email').isEmail().withMessage('Invalid email')],
  user_address: [],
  user_avatar: [],
  user_status: [],
  user_data: [],
  user_skill: [],
  user_role_id: [],
  user_department_id: [],
  user_position: [],
  user_password: [body('user_password').notEmpty().withMessage('User password is required')],
};

module.exports = userValidations;
