const express = require('express');
const { permissions_controller_getList,
        permissions_controller_getById,
        permissions_controller_create,
        permissions_controller_update, 
        permissions_controller_delete} = require('@src/controllers/permissions.controller');
const authenticateToken = require('@src/middlewares/auth.middleware');
const {validateMiddleware} = require('@src/middlewares/validation.middleware');
const permissionsMiddleware = require('@src/middlewares/permissions.middleware');

let router = express.Router();

let initPermissionRoutes = (app) => {
  router.get('/permissions', [permissionsMiddleware()],permissions_controller_getList);
  router.get('/permissions/:id', [permissionsMiddleware()],permissions_controller_getById);
  router.post('/permissions', [permissionsMiddleware(), validateMiddleware('permissions')],permissions_controller_create);
  router.put('/permissions/:id', [permissionsMiddleware(), validateMiddleware('permissions')],permissions_controller_update);
  router.delete('/permissions/:id', [permissionsMiddleware()],permissions_controller_delete);
  return app.use('/api', authenticateToken, router);
}

module.exports = initPermissionRoutes;
