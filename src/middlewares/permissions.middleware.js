const { APP_ROLE_ID } = require('@src/utils/server.config');

function permissionsMiddleware(action) {
  return (req, res, next) => {

    const { role, permissions } = req.user;

    switch (role.role_id) {
      case APP_ROLE_ID.ROLE_ADMIN:
        next();
        break;
      case APP_ROLE_ID.ROLE_HR:
        {
          // if(role_permissions.hr.includes(action)) {
            if(permissions.includes(action)) {
              next();
            }
           else {
            res.status(500).json({status: 0, code: 404, message: 'You cannot access!' });
          }
        }
        break;
      case APP_ROLE_ID.ROLE_REVIEWER:
        {
          // if(role_permissions.review.includes(action)) {
            if(permissions.includes(action)) {
              next();
            }
           else {
            res.status(500).json({status: 0, code: 404, message: 'You cannot access!' });
          }
        }
        break;
      case APP_ROLE_ID.ROLE_CANDIATE:
        {
          // if(role_permissions.candidate.includes(action)) {
            if(permissions.includes(action)) {
              next();
            }
           else {
            res.status(500).json({status: 0, code: 404, message: 'You cannot access!' });
          }
        }
        break;
      default:
        res.status(500).json({status: 0, code: 404, mes404age: 'You cannot access!' });
        break;
    }  
  };
}

const role_permissions = {
  review: ['view_exams','create_exam','edit_exam', 'view_questions', 'create_question', 'edit_question', 'update_score', 'assess_answer'],
  candidate: ['create_exam'],
  hr: ['view_users', 'create_user', 'edit_user', 'update_score']
};
  
module.exports = permissionsMiddleware;
