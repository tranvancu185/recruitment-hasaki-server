const userValidations = require('@src/validations/user.validation');
const roleValidations = require('./role.validation');
const permissionValidations = require('./permission.validation');
const departmentValidations = require('./department.validation');

const rulesValidation = {
  users: userValidations,
  roles: roleValidations,
  permissions: permissionValidations,
  departments: departmentValidations
};

module.exports = rulesValidation;
