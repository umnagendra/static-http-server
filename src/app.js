const express = require("express");
const helmet = require("helmet");
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

// setup the web service
app.listen(process.env.PORT, () => {
    logger.info(`Service listening on port ${process.env.PORT} ...`);
});

process.on("unhandledRejection", (reason, promise) => logger.warn("Unhandled promise rejection", reason, promise));
