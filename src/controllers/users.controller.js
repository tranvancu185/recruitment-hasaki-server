const { users_services_getList,
        users_services_getOne,
        users_services_create,
        users_services_update,
        users_services_delete, } = require('../services/users.service');
const { createLogger, sendLog } = require('../utils/logger');
const { APP_NOTI_TYPE } = require('../utils/server.config');

//Get list user
const users_controller_getList = async (req, res) => {
    const logger = createLogger('user');
    let arrayLog = { function: "getList_user", params: {}, data: {}, error:{}};
    try {
      const params = req.query;
      const listUser = await users_services_getList(params);
      return res.status(200).json({status: 1, message:'Success!', data: listUser});
    } catch (e) {
      console.error('Error during login:', e);
      arrayLog['error'] = { name: e.name, message: e.message, trace: e.stack };
      sendLog({type: APP_NOTI_TYPE.ERROR, arrayLog, logger });
      return res.status(500).json({status: 0, message: 'Internal server error' });
    }
}

//Get user by id
const users_controller_getById =  async (req, res) => {
    const logger =  createLogger('user');
    let arrayLog = { function: "get_user_by_id", params: {},  data: {}, error: {}};

    try {
      const {id} = req.params;
      console.log(id)
      const getUserById = await users_services_getOne({ user_id: id});
      return res.status(200).json({status: 1, message:'Success!', data: getUserById});
    } catch (e) {
      console.error('Error during login:', e);
      arrayLog['error'] = { name: e.name, message: e.message, trace: e.stack };
      sendLog({type: APP_NOTI_TYPE.ERROR, arrayLog, logger });
      return res.status(500).json({status: 0, message: 'Internal server error' });
    }
}

//Create User
const users_controller_create =  async (req, res) => {
    const logger = createLogger('user');
    let arrayLog = { function: "create_user", params: {}, data: {}, error:{}};
    try {
      await users_services_create(req.body);

      return res.status(200).json({status: 1, message:'Success!', data: dataUser});
    } catch (e) {
      console.error('Error during login:', e);
      arrayLog['error'] = { name: e.name, message: e.message, trace: e.stack };
      sendLog({type: APP_NOTI_TYPE.ERROR, arrayLog, logger });
      return res.status(500).json({status: 0, message: 'Internal server error' });
    }
}

//Update User
const users_controller_update = async (req, res) => {
    const logger = createLogger('user');
    let arrayLog = { function: "update_user", params: {}, data: {}, error:{}};
    try {
      const {id} = req.params;
      const updateUser = await users_services_update({ user_id : id}, req.body );

      return res.status(200).json({status: 1, message:'Success!', data: updateUser});
    } catch (e) {
      console.error('Error during login:', e);
      arrayLog['error'] = { name: e.name, message: e.message, trace: e.stack };
      sendLog({type: APP_NOTI_TYPE.ERROR, arrayLog, logger });
      return res.status(500).json({status: 0, message: 'Internal server error' });
    }
}

const users_controller_delete = async (req, res) => {
  const logger = createLogger('user');
  let arrayLog = { function: "update_user", params: {}, data: {}, error:{}};
  try {
    const {id} = req.params;
    await users_services_delete({ user_id : id});

    return res.status(200).json({status: 1, message:'Delete Success!'});
  } catch (e) {
    console.error('Error during login:', e);
    arrayLog['error'] = { name: e.name, message: e.message, trace: e.stack };
    sendLog({type: APP_NOTI_TYPE.ERROR, arrayLog, logger });
    return res.status(500).json({status: 0, message: 'Internal server error' });
  }
}

module.exports = {
    users_controller_getList,
    users_controller_getById,
    users_controller_create,
    users_controller_update,
    users_controller_delete
}