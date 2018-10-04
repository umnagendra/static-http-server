const winston = require("winston");

module.exports = winston.createLogger({
    transports: [
        new (winston.transports.Console)({
            level: process.env.LOG_LEVEL || "info",
            format: winston.format.simple(),
            handleExceptions: true,
            humanReadableUnhandledException: true,
            colorize: true,
            prettyPrint: true,
        }),
    ],
});
