const { CommandLoader, Command } = require("../structures/CMD/");
const { readdir } = require("fs");
const { promisify } = require('util');
const path = require('path');
const fs = require("fs");

module.exports = class CommandsLoader extends CommandLoader {
    constructor(client) {
        super(client)

        this.name = 'CommandsLoader'

        this.client = client
        this.commands = new client.collection
        this.client.loaderCommand = async (cmd) => { return await this.CommandLoad(cmd) }
    }

    async call() {
        this.client.commands = this.commands;
        return this.LoaderCommands()
            .then(() => {
                this.client.LOG('All commands successfully loaded', 'COMMANDS');
            })
    }

    async LoaderCommands(DIR_COMMANDS = 'src/commands') {
        const files = await CommandsLoader.readdir(DIR_COMMANDS);
        return Promise.all(files.map(async file => {
            const fullPath = path.resolve(DIR_COMMANDS, file);
            readdir(fullPath, (err, files) => {
                files.forEach(cmd => {
                    const cmdPath = `${file}/${cmd}`
                    const required = require('../commands/' + cmdPath);
                    delete require.cache[require.resolve(`../commands/${cmdPath}`)];
                    const command = new (required)(this.client);

                    if (!(command instanceof Command)) return;

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