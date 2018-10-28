const constants = require("constants");
const express = require("express");
const helmet = require("helmet");
const fs = require("fs");
const https = require("https");
const logger = require("./util/logger");
const utils = require("./util/utils");
const pingRoute = require("./routes/ping");

const app = express();

logger.info("**** STARTUP ****");
logger.debug("Environment", process.env);

// check if the environment is proper
utils.validateEnvironment();

// setup middleware
app.use(helmet());
app.use(helmet.noCache());
app.use(express.json());
// See https://expressjs.com/en/guide/behind-proxies.html
app.enable("trust proxy");

// setup routes
app.use(pingRoute.URI, pingRoute.router);

// setup SSL
const httpsOptions = {
    key: fs.readFileSync(process.env.KEYFILE),
    cert: fs.readFileSync(process.env.CERTFILE),
    secureOptions: constants.SSL_OP_NO_TLSv1 | constants.SSL_OP_NO_TLSv1_1, // eslint-disable-line no-bitwise
};

// setup the web service
https.createServer(httpsOptions, app)
    .listen(process.env.PORT, () => {
        logger.info(`Service listening on port ${process.env.PORT} ...`);
    });

process.on("unhandledRejection", (reason, promise) => logger.warn("Unhandled promise rejection", reason, promise));
