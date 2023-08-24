const express = require('express');
const { departments_controller_getList, 
        departments_controller_create,
        departments_controller_update,
        departments_controller_getById,
        departments_controller_delete } = require('../controllers/departments.controller');
const authenticateToken = require('../middlewares/auth.middleware')
const {validateMiddleware} = require('@src/middlewares/validation.middleware');
const permissionsMiddleware = require('@src/middlewares/permissions.middleware');

let router = express.Router();

let initDepartmentRoutes = (app) => {
  router.get('/departments', [permissionsMiddleware('get_list_departments')], departments_controller_getList);
  router.get('/departments/:id', [permissionsMiddleware()], departments_controller_getById);
  router.post('/departments', [permissionsMiddleware(), validateMiddleware('departments')], departments_controller_create);
  router.put('/departments/:id', [permissionsMiddleware(), validateMiddleware('departments')], departments_controller_update);
  router.delete('/departments/:id', [permissionsMiddleware()], departments_controller_delete);
  return app.use('/api',authenticateToken, router);
}

module.exports = initDepartmentRoutes;