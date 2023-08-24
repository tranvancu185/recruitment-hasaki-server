const { Permission, UserPermission } = require('@src/db')
const { Op, where, fn, col } = require('sequelize');

const permissions_services_getList = async (params) => {
  return Permission.findAll(params);
}

const permissions_services_getOne = async (params) => {
  return Permission.findOne({ where: params });
}

const permissions_services_create = async (data) => {
  return Permission.create(data);
}

const permissions_services_update = async (conditions, data) => {
  return Permission.update(data, {
    where: conditions
  });
}

const permissions_services_delete = async (conditions) => {
  return await UserPermission.destroy({
    where: {
      user_permission_permission_id: conditions.permission_id
    }
  }).then(async (result) => {
    await Permission.destroy({ where: conditions });
  })
   
}

module.exports = {
    permissions_services_getList,
    permissions_services_getOne,
    permissions_services_create,
    permissions_services_update,
    permissions_services_delete,
};