const { department_id } = require('@src/validations/department.validation');
const { Department } = require('../db')
const { Op, where, fn, col } = require('sequelize');

const departments_services_getList = async (params) => {
  return Department.findAll(params);
}

const departments_services_getOne = async (params) => {
  return Department.findOne(
    {
      where : {
        department_id : params
      }
    }
  );
}

const departments_services_create = async (data) => {
  return Department.create(data);
}

const departments_services_update = async (conditions, data) => {
  return Department.update(data, {
    where: conditions
  });
}

const departments_services_delete = async (conditions) => {
  return Department.destroy(
    {
      where : {
        department_id : conditions
      }
    }
  ).then( async (result) => { 
    if(result > 0) {
      await User.update({ user_department_id : null },{ where : { user_department_id : conditions.department_id }});
    }
  })
}

const departments_services_checkExisted =async (arrayInput) => {
  let whereQuery = {
    where : {
      department_name : arrayInput.department_name
    }
  }

  const department = await Department.findOne(whereQuery);

  if (department) {
    return {status: 0, message: 'Phòng ban tồn tại!' };
  }
  return {status: 1, data: department };

}
module.exports = {
  departments_services_getList,
  departments_services_getOne,
  departments_services_create,
  departments_services_update,
  departments_services_delete,
  departments_services_checkExisted
};