const { API_TOKEN_KEY, APP_NOTI_TYPE } = require('../utils/server.config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const { User, UserPermission, Role, Permission } = require('../db')
const { Op, where, fn, col } = require('sequelize');

const auth_service_login = async (email, password) => {
  let params = {
    where: {user_email: email?? ''},
  }
  const user = await User.findOne(params);
  if (!user) {
    return {status: 0, message: 'Người dùng không tồn tại!' };
  }
  // So sánh mật khẩu
  const isPasswordValid = await bcrypt.compare(password,user.user_password);
  if (!isPasswordValid) {
    return {status: 0, message: 'Sai thông tin đăng nhập hoặc mật khẩu!' };
  }

  // Lấy danh sách roles của user
  const role = await Role.findOne({ where: { role_id: user.user_role_id }, raw: true, attributes:['role_id', 'role_name']});

  // Kiểm tra nếu user không có role nào
  if (!role) {
    return {status: 0, message: 'Người dùng không có quyền truy cập!' };
  }

  // Lấy danh sách các permission của các user
  const permissions = await UserPermission.findAll({ where: { user_permission_user_id: user.user_id } }).then( (userPermissions) => {
    const permissionIds = userPermissions.map( (userPermission) => { return userPermission.user_permission_permission_id } );
    return Permission.findAll({ where: { permission_id: permissionIds }, attributes : ['permission_name'] }).then((ListPermission) => {
      console.log(ListPermission)
      return ListPermission.map((item) => {return item.permission_name});
    });
  });

  // Tạo object chứa thông tin user và các permissions
  const userPayload = {
    user_id: user.user_id,
    user_name: user.user_name,
    user_email: user.user_email,
    user_phone: user.user_phone,
    user_address: user.user_address,
    user_avatar: user.user_avatar,
    user_status: user.user_status,
    user_data: user.user_data,
    user_skill: user.user_skill,
    user_position: user.user_position,
    user_gender: user.user_gender,
    user_description: user.user_description,
    user_birth: user.user_birth,
    role,
    permissions,
  };

  const token = jwt.sign(JSON.stringify(userPayload), API_TOKEN_KEY);
  
  user.user_data = {...user.user_data, token: token };

  await user.update({...user});

  userPayload.token = token;

  return userPayload || null;
}

module.exports = {
  auth_service_login
};