const { auth_service_login } = require('../services/auth.service')
const { createLogger, sendLog } = require('../utils/logger');
const { APP_NOTI_TYPE } = require('../utils/server.config');

const auth_controller_login = async (req, res) => {
    const logger = createLogger('login');
    const { email, password } = req.body;
    let arrayLog = { function: "login", params: { email, password }, data: {}, error:{}};
    try {
      
      if (!email || !password) {
        return res.status(401).json({status: 1, message: 'Incorrect username or password' });
      }
      
      const user = await auth_service_login(email, password);
      arrayLog['data']['get_user'] = user || null;
      if (user.status === 0) {
        return res.status(401).json({status: 1, message: 'Incorrect username or password' });
      }

      sendLog({ arrayLog, logger });
      return res.status(200).json({status: 1, message:'Success!', data: user});

    } catch (e) {
      console.error('Error during login:', e);
      arrayLog['error'] = { name: e.name, message: e.message, trace: e.stack };
      sendLog({type: APP_NOTI_TYPE.ERROR, arrayLog, logger });
      return res.status(500).json({status: 0, message: 'Internal server error' });
    }
}

module.exports = {
    auth_controller_login: auth_controller_login,
};