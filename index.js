require('dotenv').config()
// require('./connectDB')
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const db = require('@src/db');
const { User, Role, Permission, Department, UserPermission } = require('@src/db'); // Đường dẫn đến các mô hình đã tạo ở bước 3.
const initAuthRoutes = require('@src/routes/auth.route');
const initUserRoutes = require('@src/routes/users.route');
const initRoleRoutes = require('@src/routes/roles.route');
const initPermissionRoutes = require('@src/routes/permissions.route');
const initExamRoutes = require('@src/routes/exam.route');
const initDepartmentRoutes = require('@src/routes/departments.route');
const app = express();

//Provider
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true, limit: '30mb'}));
app.use(cors());

async function createDatabase() {
  try {
    const adminUser = await User.findOne({ where: { user_name: 'admin_user' } });

    if(!adminUser) {
      // Tạo roles
      const adminRole = await Role.create({ role_name: 'admin' });
      const hrRole = await Role.create({ role_name: 'hr' });
      const reviewRole = await Role.create({ role_name: 'review' });
      const candidateRole = await Role.create({ role_name: 'candidate' });

      // Tạo permissions
      const userManagementPermissions = [
        'get_list_users',
        'get_one_users',
        'view_users',
        'create_user',
        'edit_user',
        'delete_user'
      ];
      
      const roleManagementPermissions = [
        'get_list_roles',
        'view_roles',
        'create_role',
        'edit_role',
        'delete_role'
      ];

      const permissionManagementPermissions = [
        'get_list_permissions',
        'view_permissions',
        'create_permission',
        'edit_permission',
        'delete_permission'
      ];

      const departmentManagementPermissions = [
        'get_list_departments',
        'view_departments',
        'create_department',
        'edit_department',
        'delete_department'
      ];

      const examManagementPermissions = [
        'get_list_exam',
        'view_exams',
        'create_exam',
        'edit_exam',
        'delete_exam'
      ];

      const questionManagementPermissions = [
        'get_list_questions',
        'view_questions',
        'create_question',
        'edit_question',
        'delete_question'
      ];
      
      const otherPermissions = [
        'assess_answer',
        'update_score',
      ];
      
      const allPermissionArrays = [
        userManagementPermissions,
        roleManagementPermissions,
        permissionManagementPermissions,
        departmentManagementPermissions,
        examManagementPermissions,
        questionManagementPermissions,
        otherPermissions
      ];

      (async () => {
        try {
          for (const permissionArray of allPermissionArrays) {
            for (const permissionName of permissionArray) {
              await Permission.create({ permission_name: permissionName });
            }
          }
        } catch (error) {
          console.error('Error creating permissions:', error);
        }
      })();

      // Tạo phòng ban
      const adminDepartment = await Department.create({ department_name: 'Admin Department' });
      const hrDepartment = await Department.create({ department_name: 'HR Department' });
      const reviewDepartment = await Department.create({ department_name: 'Review Department' });

      // Tạo mật khẩu băm
      const hashedPassword = await bcrypt.hash('admin', 10);

      const userAdmin = await User.create({
        user_name: 'admin_user',
        user_password: hashedPassword,
        user_email: 'admin@admin.com',
        user_role_id: adminRole.role_id,
        user_department_id: adminDepartment.department_id,
      });

      const userHr = await User.create({
        user_name: 'hr_user',
        user_password: hashedPassword,
        user_email: 'hr@admin.com',
        user_role_id: hrRole.role_id,
        user_department_id: hrDepartment.department_id,
      });

      const userReviewer = await User.create({
        user_name: 'review_user',
        user_password: hashedPassword,
        user_email: 'review@admin.com',
        user_role_id: reviewRole.role_id,
        user_department_id: reviewDepartment.department_id,
      });

      const userCandidate = await User.create({
        user_name: 'candidate_user',
        user_password: hashedPassword,
        user_email: 'candidate@admin.com',
        user_role_id: candidateRole.role_id,
      });

      //Reviewer _ Permissions
      try {
        const reviewerPermissions = [ 
          'view_exams','create_exam','edit_exam',
          'view_questions', 'create_question', 'edit_question', 
          'update_score', 'assess_answer',
          'get_list_departments',
          'get_list_questions',
          'get_one_users',
        ];
        for (const permissionName of reviewerPermissions) {
          const permission = await Permission.findOne({ where: { permission_name: permissionName } });
          if (permission) {
            await UserPermission.create({user_permission_user_id: userReviewer.user_id, user_permission_permission_id: permission.permission_id})
          } else {
            console.log(`Permission "${permissionName}" not found.`);
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
      //HR _ Permissions
      try {
        const hrPermissions = ['view_users', 'create_user', 'edit_user', 'update_score', 'get_list_departments','get_one_users'];
        for (const permissionName of hrPermissions) {
          const permission = await Permission.findOne({ where: { permission_name: permissionName } });
          if (permission) {
            await UserPermission.create({user_permission_user_id: userHr.user_id, user_permission_permission_id: permission.permission_id})
          } else {
            console.log(`Permission "${permissionName}" not found.`);
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
      //Candidate _ Permissions
      try {
        const candidatePermissions = ['create_exam','get_list_departments', 'get_one_users'];
        for (const permissionName of candidatePermissions) {
          const permission = await Permission.findOne({ where: { permission_name: permissionName } });
          if (permission) {
            await UserPermission.create({user_permission_user_id: userCandidate.user_id, user_permission_permission_id: permission.permission_id})
          } else {
            console.log(`Permission "${permissionName}" not found.`);
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    
    console.log('Database created and initialized successfully.');
  } catch (error) {
    console.error('Error creating database:', error);
  }
}

const port = process.env.PORT; // Cổng của máy chủ của bạn

db.sequelize.sync().then(() => {
  createDatabase();
  initAuthRoutes(app);
  initUserRoutes(app);
  initRoleRoutes(app);
  initPermissionRoutes(app);
  initExamRoutes(app);
  initDepartmentRoutes(app);
  app.listen(port || 3000, () => {
    console.log(`Server is running on port ${port}`);
  })
})
