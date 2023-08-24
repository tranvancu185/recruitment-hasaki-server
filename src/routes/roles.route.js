const express = require('express');
const { roles_controller_getList,
        roles_controller_getById,
        roles_controller_create,
        roles_controller_update, 
        roles_controller_delete} = require('@src/controllers/roles.controller');
const authenticateToken = require('@src/middlewares/auth.middleware');
const {validateMiddleware} = require('@src/middlewares/validation.middleware');
const permissionsMiddleware = require('@src/middlewares/permissions.middleware')

let router = express.Router();

let initRoleRoutes = (app) => {
  router.get('/roles',[permissionsMiddleware()] ,roles_controller_getList);
  router.get('/roles/:id', [permissionsMiddleware()], roles_controller_getById);
  router.post('/roles', [permissionsMiddleware(), validateMiddleware('roles')],roles_controller_create);
  router.put('/roles/:id',[permissionsMiddleware(), validateMiddleware('roles')], roles_controller_update);
  router.delete('/roles/:id', [permissionsMiddleware()],roles_controller_delete);
  return app.use('/api', authenticateToken, router);
}

module.exports = initRoleRoutes;
