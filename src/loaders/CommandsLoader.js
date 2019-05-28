const DIR_COMMANDS = 'src/commands',
    { readdir } = require("fs"),
    { promisify } = require('util'),
    path = require('path'),
    fs = require("fs")

module.exports = class CommandsLoader {
    constructor(client) {
        this.name = 'CommandsLoader'

        this.client = client
        this.commands = new client.collection
    }

    async call() {
        this.client.commands = this.commands;
        return this.LoaderCommands()
            .then(() => {
                this.client.LOG('All commands successfully loaded', 'COMMANDS');
            })
    }

    async LoaderCommands() {
        const files = await CommandsLoader.readdir(DIR_COMMANDS);
        return Promise.all(files.map(async file => {
            const fullPath = path.resolve(DIR_COMMANDS, file);
            readdir(fullPath, (err, files) => {
                files.forEach(cmd => {
                    const cmdPath = `${file}/${cmd}`
                    const required = require('../commands/' + cmdPath);
                    delete require.cache[require.resolve(`../commands/${cmdPath}`)];
                    const command = new (required)(this.client);
                    this.commands.set(command.name, {
                        commandHelp: command,
                        commandDirectory: cmdPath
                    })
                })
            })
        }))
    }
}

module.exports.readdir = promisify(fs.readdir);