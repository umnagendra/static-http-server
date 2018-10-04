const os = require("os");
const express = require("express");
const packageJSON = require("../../package.json");

const URI = "/ping";
const router = express.Router();

router.get("/", (req, res) => {
    const pingResponse = {
        name: packageJSON.name,
        version: packageJSON.version,
        state: "online",
        uptimeSeconds: process.uptime(),
        host: os.hostname(),
        timestamp: new Date().getTime(),
    };
    res.contentType("json").send(pingResponse);
});

module.exports = {
    URI,
    router,
};
