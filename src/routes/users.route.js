const express = require('express');
const { users_controller_getList,
        users_controller_getById,
        users_controller_create,
        users_controller_update, 
        users_controller_delete} = require('@src/controllers/users.controller');
const authenticateToken = require('@src/middlewares/auth.middleware');
const {validateMiddleware} = require('@src/middlewares/validation.middleware');
const permissionsMiddleware = require('@src/middlewares/permissions.middleware')

let router = express.Router();

let initUserRoutes = (app) => {
  router.get('/users',users_controller_getList);
  router.get('/users/:id', users_controller_getById);
  router.post('/users',users_controller_create);
  router.put('/users', users_controller_update);
  router.delete('/users', users_controller_delete);
  return app.use('/api', authenticateToken, router);
}

module.exports = initUserRoutes;
