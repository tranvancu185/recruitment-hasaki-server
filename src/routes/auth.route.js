const express = require('express');
const { auth_controller_login } = require('../controllers/auth.controller');

let router = express.Router();

let initAuthRoutes = (app) => {
  router.post('/auth/login', auth_controller_login);
  return app.use('/api', router);
}

module.exports = initAuthRoutes;
