const { User } = require('@src/db')
const { Op, where, fn, col } = require('sequelize');

const users_services_getList = async (params) => {
  let orQuery = [];
  let andQuery = [];

  if(params) {
    if(params?.status) {
      if (params.status == -1) {
        delete params.status
      } else {
        if(params.status.includes('[')) {
          params.status = eval(params.status);
        }
        andQuery.push({ user_status: params.status })
      }
    }
  
    // if (date !== undefined) {
    //   const dateString = dayjs.unix(date).format('YYYY-MM-DD');
    //   // const dateString = date;
    //   andQuery.push(where(
    //     fn('date', col('createdTime'), 'unixepoch'), '==', dateString),
    //   )
    // }

    if(params?.code){
      orQuery.push(
        {
          user_name: {[Op.substring]: params.code}
        },
        {
          user_phone: {[Op.substring]: params.code}
        },
        {
          user_email: {[Op.substring]: params.code}
        },
        {
          user_id: {[Op.substring]: params.code}
        },
      );
    }
    let whereQuery = {};

    if(orQuery.length !== 0 ){
      whereQuery[Op.or] = orQuery;
    }
    if(andQuery.length !== 0){
      whereQuery[Op.and] = andQuery;
    }

    return User.findAll({where: whereQuery, attributes: {exclude: ['user_password']},});
  } else {
    return User.findAll();
  }
  
}

const users_services_getOne = async (params) => {
  return User.findOne({where: params});
}

const users_services_create = async (data) => {
  return User.create(data);
}

const users_services_update = async (conditions, data) => {
  return User.update(data, {
    where: conditions
  });
}

const users_services_delete = async (conditions) => {
  return User.destroy({ where: conditions })
}

const users_services_checkExisted = async (arrayInput) => {
  let orQuery = [];
  let andQuery = [];

  const keys = Object.keys(arrayInput);
  const values = Object.values()
  if(arrayInput.user_phone){
    orQuery.push({ user_phone: arrayInput.user_phone })
  }
  if(arrayInput.user_email){
    orQuery.push({ user_email: arrayInput.user_email })
  }

  let whereQuery = {
    [Op.or] : orQuery 
  }
  let params = {
    where: whereQuery,
  }
  const user = await User.findOne(params);

  if (user) {
    return {status: 0, message: 'Người dùng tồn tại!' };
  }
  return {status: 1, data: user };
}

module.exports = {
  users_services_getList,
  users_services_getOne,
  users_services_create,
  users_services_update,
  users_services_delete,
  users_services_checkExisted
};