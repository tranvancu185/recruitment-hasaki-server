const { User, Role } = require('@src/db')
const { Op, where, fn, col } = require('sequelize');

const roles_services_getList = async (params) => {
  return Role.findAll(params);
}

const roles_services_getOne = async (params) => {
  console.log(params)
  return Role.findOne({ where: params });
}

const roles_services_create = async (data) => {
  return Role.create(data);
}

const roles_services_update = async (conditions, data) => {
  return Role.update(data, {
    where: conditions
  });
}

const roles_services_delete = async (conditions) => {
  return Role.destroy({ where: conditions }).then( async (result) => { 
    if(result > 0) {
      await User.update({ user_role_id : null },{ where : { user_role_id : conditions.role_id }});
    }
  })
}

module.exports = {
    roles_services_getList,
    roles_services_getOne,
    roles_services_create,
    roles_services_update,
    roles_services_delete,
};