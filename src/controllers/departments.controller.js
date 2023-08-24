const { departments_services_getList,
    departments_services_getOne,
    departments_services_create,
    departments_services_update,
    departments_services_delete,
    departments_services_checkExisted } = require('../services/departments.service');
const { createLogger, sendLog } = require('../utils/logger');
const { APP_NOTI_TYPE } = require('../utils/server.config');

//Get list department
const departments_controller_getList = async (req, res) => {
    const logger = createLogger('department');
    let arrayLog = { function: "getList_department", params: {}, data: {}, error:{}};
    try {
      const listDepartment = await departments_services_getList();
      return res.status(200).json({status: 1, message:'Success!', data: listDepartment});
    } catch (e) {
      console.error('Error during login:', e);
      arrayLog['error'] = { name: e.name, message: e.message, trace: e.stack };
      sendLog({type: APP_NOTI_TYPE.ERROR, arrayLog, logger });
      return res.status(500).json({status: 0, message: 'Internal server error' });
    }
}

  //Get by department_id
const departments_controller_getById = async (req, res) => {
  const logger = createLogger('department');
  let arrayLog = { function: "getById_department", params: {}, data: {}, error:{}};
  try {
    const { id } = req.params;
    const getDepartment = await departments_services_getOne(id);
    return res.status(200).json({status: 1, message:'Success!', data: getDepartment});
  } catch (e) {
    console.error('Error during login:', e);
    arrayLog['error'] = { name: e.name, message: e.message, trace: e.stack };
    sendLog({type: APP_NOTI_TYPE.ERROR, arrayLog, logger });
    return res.status(500).json({status: 0, message: 'Internal server error' });
  }
}

//Create department
const departments_controller_create =  async (req, res) => {
    const logger = createLogger('department');
    let arrayLog = { function: "create_department", params: {}, data: {}, error:{}};
    try {
      const checkExisted = await departments_services_checkExisted(req.body);
      if(checkExisted.status == 0){
        return res.status(400).json({status: 0, message:checkExisted.message });
      }
      const department = await departments_services_create(req.body);

      return res.status(200).json({status: 1, message:'Success!', data: department});
    } catch (e) {
      console.error('Error during login:', e);
      arrayLog['error'] = { name: e.name, message: e.message, trace: e.stack };
      sendLog({type: APP_NOTI_TYPE.ERROR, arrayLog, logger });
      return res.status(500).json({status: 0, message: 'Internal server error' });
    }
  }

//Update department
const departments_controller_update =  async (req, res) => {
    const logger = createLogger('department');
    let arrayLog = { function: "update_department", params: {}, data: {}, error:{}};
    try {

      const { id } = req.params;
      const checkExisted = await departments_services_checkExisted(req.body);
      if(checkExisted.status == 0){
        return res.status(400).json({status: 0, message:checkExisted.message });
      }

      const department = await departments_services_update({department_id : id}, req.body);

      return res.status(200).json({status: 1, message:'Success!', data: department});
    } catch (e) {
      console.error('Error during login:', e);
      arrayLog['error'] = { name: e.name, message: e.message, trace: e.stack };
      sendLog({type: APP_NOTI_TYPE.ERROR, arrayLog, logger });
      return res.status(500).json({status: 0, message: 'Internal server error' });
    }
  }
//Delete Department
  const departments_controller_delete =  async (req, res) =>{
    const logger = createLogger('department');
    let arrayLog = { function: "delete_department", params: {}, data: {}, error:{}};
    try {
      const {id} = req.params;
      await departments_services_delete({ department_id : id});
      return res.status(200).json({status: 1, message:'Success!'});
    } catch (e) {
      console.error('Error during login:', e);
      arrayLog['error'] = { name: e.name, message: e.message, trace: e.stack };
      sendLog({type: APP_NOTI_TYPE.ERROR, arrayLog, logger });
      return res.status(500).json({status: 0, message: 'Internal server error' });
    }
  }

module.exports = {
    departments_controller_getList,
    departments_controller_create,
    departments_controller_update,
    departments_controller_getById,
    departments_controller_delete
}