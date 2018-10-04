const _ = require("lodash");

const MANDATORY_ENV_VARS = [
    "PORT",
];

module.exports = {
    validateEnvironment: () => {
        _.each(MANDATORY_ENV_VARS, (variable) => {
            if (_.isUndefined(process.env[variable])
                || _.isEmpty(_.trim(process.env[variable]))) {
                throw new ReferenceError(`SEVERE ERROR: MISSING/INVALID environment variable value: ${variable}`);
            }
        });
    },
};
