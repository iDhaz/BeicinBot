if(!(Number(process.version.slice(1).split(".")[0]) > 9)) throw new Error('Please update the process!')

const InitializeClient = require("./src/Client.js");

const settingsClient = {
    compress: true,
    GlobalPrefix: process.env.PREFIX
}

const Client = new InitializeClient(settingsClient);
Client.CONNECT();