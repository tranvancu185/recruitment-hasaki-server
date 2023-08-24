const winston = require("winston");
const moment = require('moment');
const { APP_NOTI_TYPE } = require('./server.config');

const createLogger = (fileName) => winston.createLogger({
    // Log only if level is less than (meaning more severe) or equal to this
    level: "info",

    // Use timestamp and printf to create a standard log format
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
      )
    ),
    // Log to the console and a file
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: `./src/storage/app/logs/${fileName + "-" +moment().format('YYYY-MM-DD')}.log`}),
    ],
  });

  const sendLog = ({ type= APP_NOTI_TYPE.INFO, arrayLog, logger }) => {
    try {
      switch(type) {
        case APP_NOTI_TYPE.ERROR:
          logger.log(type, JSON.stringify(arrayLog));
          break;
        default: 
          logger.log(type, JSON.stringify(arrayLog));
          break;
      }
    }catch(e) {
      console.log(e);
      throw e;
    }
  }

  module.exports = {
    createLogger,
    sendLog
};
  