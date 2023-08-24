const express = require('express');
const { exams_controller_create } = require('@src/controllers/exam.controller');
const authenticateToken = require('@src/middlewares/auth.middleware');

let router = express.Router();

let initExamRoutes = (app) => {
    router.post('/exams', exams_controller_create);
    return app.use('/api',authenticateToken, router);
}

module.exports = initExamRoutes;
