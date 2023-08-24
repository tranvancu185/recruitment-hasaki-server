const { exams_services_create } = require('@src/services/exam.service');
const { createLogger, sendLog } = require('@src/utils/logger');

const exams_controller_create = async (req, res) => {
    const logger = createLogger('create exam');
    let arrayLog = { function: "create_exam", params: {}, data: {}, error:{}};
    try {
        const exam = await exams_services_create(req.body);
        while(!exam) {
            exam = await exams_services_create(req.body);
        }
        return res.status(200).json({status: 1, message:'Success!', data: exam});
    } catch (e) {
        console.error('Error during login:', e);
        arrayLog['error'] = { name: e.name, message: e.message, trace: e.stack };
        sendLog({type: APP_NOTI_TYPE.ERROR, arrayLog, logger });
        return res.status(500).json({status: 0, message: 'Internal server error' });
    }
}

module.exports = {
    exams_controller_create
}
