const { body } = require('express-validator');

const permissionValidations = {
  permission_id: [],
  permission_name: [body('permission_name').notEmpty().withMessage('Permission name is required')],
};

module.exports = permissionValidations;
