const { roles_services_getList,
    roles_services_getOne,
    roles_services_create,
    roles_services_update,
    roles_services_delete, } = require('../services/roles.service');
const { createLogger, sendLog } = require('../utils/logger');
const { APP_NOTI_TYPE } = require('../utils/server.config');

//Get list role
const roles_controller_getList = async (req, res) => {
const logger = createLogger('role');
let arrayLog = { function: "getList_role", params: {}, data: {}, error:{}};
try {
  const listRole = await roles_services_getList();
  return res.status(200).json({status: 1, message:'Success!', data: listRole});
} catch (e) {
  console.error('Error during login:', e);
  arrayLog['error'] = { name: e.name, message: e.message, trace: e.stack };
  sendLog({type: APP_NOTI_TYPE.ERROR, arrayLog, logger });
  return res.status(500).json({status: 0, message: 'Internal server error' });
}
}

//Get role by id
const roles_controller_getById =  async (req, res) => {
const logger =  createLogger('role');
let arrayLog = { function: "get_role_by_id", params: {},  data: {}, error: {}};

try {
  const {id} = req.params;
  
  const getRoleById = await roles_services_getOne({ role_id: id });
  return res.status(200).json({status: 1, message:'Success!', data: getRoleById});
} catch (e) {
  console.error('Error during login:', e);
  arrayLog['error'] = { name: e.name, message: e.message, trace: e.stack };
  sendLog({type: APP_NOTI_TYPE.ERROR, arrayLog, logger });
  return res.status(500).json({status: 0, message: 'Internal server error' });
}
}

//Create Role
const roles_controller_create =  async (req, res) => {
const logger = createLogger('role');
let arrayLog = { function: "create_role", params: {}, data: {}, error:{}};
try {
  const dataRole = await roles_services_create(req.body);

  return res.status(200).json({status: 1, message:'Success!', data: dataRole});
} catch (e) {
  console.error('Error during login:', e);
  arrayLog['error'] = { name: e.name, message: e.message, trace: e.stack };
  sendLog({type: APP_NOTI_TYPE.ERROR, arrayLog, logger });
  return res.status(500).json({status: 0, message: 'Internal server error' });
}
}

//Update Role
const roles_controller_update = async (req, res) => {
  const logger = createLogger('role');
  let arrayLog = { function: "update_role", params: {}, data: {}, error:{}};
  try {
    const {id} = req.params;
    await roles_services_update({ role_id : id }, req.body );
    const updateRole = await roles_services_getOne({ role_id: id });
    return res.status(200).json({status: 1, message:'Success!', data: updateRole});
  } catch (e) {
    console.error('Error during login:', e);
    arrayLog['error'] = { name: e.name, message: e.message, trace: e.stack };
    sendLog({type: APP_NOTI_TYPE.ERROR, arrayLog, logger });
    return res.status(500).json({status: 0, message: 'Internal server error' });
  }
}

const roles_controller_delete = async (req, res) => {
  const logger = createLogger('role');
  let arrayLog = { function: "update_role", params: {}, data: {}, error:{}};
  try {
    const {id} = req.params;
    await roles_services_delete({ role_id : id});
    return res.status(200).json({status: 1, message:'Delete Success!'});
  } catch (e) {
    console.error('Error during login:', e);
    arrayLog['error'] = { name: e.name, message: e.message, trace: e.stack };
    sendLog({type: APP_NOTI_TYPE.ERROR, arrayLog, logger });
    return res.status(500).json({status: 0, message: 'Internal server error' });
  }
}

module.exports = {
  roles_controller_getList,
  roles_controller_getById,
  roles_controller_create,
  roles_controller_update,
  roles_controller_delete
}