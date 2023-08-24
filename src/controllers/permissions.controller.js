const { permissions_services_getList,
    permissions_services_getOne,
    permissions_services_create,
    permissions_services_update,
    permissions_services_delete, } = require('../services/permissions.service');
const { createLogger, sendLog } = require('../utils/logger');
const { APP_NOTI_TYPE } = require('../utils/server.config');

//Get list permission
const permissions_controller_getList = async (req, res) => {
const logger = createLogger('permission');
let arrayLog = { function: "getList_permission", params: {}, data: {}, error:{}};
try {
  const listPermission = await permissions_services_getList();
  return res.status(200).json({status: 1, message:'Success!', data: listPermission});
} catch (e) {
  console.error('Error during login:', e);
  arrayLog['error'] = { name: e.name, message: e.message, trace: e.stack };
  sendLog({type: APP_NOTI_TYPE.ERROR, arrayLog, logger });
  return res.status(500).json({status: 0, message: 'Internal server error' });
}
}

//Get permission by id
const permissions_controller_getById =  async (req, res) => {
const logger =  createLogger('permission');
let arrayLog = { function: "get_permission_by_id", params: {},  data: {}, error: {}};

try {
  const {id} = req.params;
  
  const getPermissionById = await permissions_services_getOne({ permission_id: id});
  return res.status(200).json({status: 1, message:'Success!', data: getPermissionById});
} catch (e) {
  console.error('Error during login:', e);
  arrayLog['error'] = { name: e.name, message: e.message, trace: e.stack };
  sendLog({type: APP_NOTI_TYPE.ERROR, arrayLog, logger });
  return res.status(500).json({status: 0, message: 'Internal server error' });
}
}

//Create Permission
const permissions_controller_create =  async (req, res) => {
const logger = createLogger('permission');
let arrayLog = { function: "create_permission", params: {}, data: {}, error:{}};
try {
  const dataPermission = await permissions_services_create(req.body);

  return res.status(200).json({status: 1, message:'Success!', data: dataPermission});
} catch (e) {
  console.error('Error during login:', e);
  arrayLog['error'] = { name: e.name, message: e.message, trace: e.stack };
  sendLog({type: APP_NOTI_TYPE.ERROR, arrayLog, logger });
  return res.status(500).json({status: 0, message: 'Internal server error' });
}
}

//Update Permission
const permissions_controller_update = async (req, res) => {
  const logger = createLogger('permission');
  let arrayLog = { function: "update_permission", params: {}, data: {}, error:{}};
  try {
    const {id} = req.params;
    await permissions_services_update({ permission_id : id}, req.body );
    const updatePermission = await permissions_services_getOne({ permission_id: id });
    return res.status(200).json({status: 1, message:'Success!', data: updatePermission});
  } catch (e) {
    console.error('Error during login:', e);
    arrayLog['error'] = { name: e.name, message: e.message, trace: e.stack };
    sendLog({type: APP_NOTI_TYPE.ERROR, arrayLog, logger });
    return res.status(500).json({status: 0, message: 'Internal server error' });
  }
}

const permissions_controller_delete = async (req, res) => {
  const logger = createLogger('permission');
  let arrayLog = { function: "update_permission", params: {}, data: {}, error:{}};
  try {
    const {id} = req.params;
    await permissions_services_delete({ permission_id : id});
    return res.status(200).json({status: 1, message:'Delete Success!'});
  } catch (e) {
    console.error('Error during login:', e);
    arrayLog['error'] = { name: e.name, message: e.message, trace: e.stack };
    sendLog({type: APP_NOTI_TYPE.ERROR, arrayLog, logger });
    return res.status(500).json({status: 0, message: 'Internal server error' });
  }
}

module.exports = {
permissions_controller_getList,
permissions_controller_getById,
permissions_controller_create,
permissions_controller_update,
permissions_controller_delete
}