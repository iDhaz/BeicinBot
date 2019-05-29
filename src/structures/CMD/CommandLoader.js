const Command = require("./Command.js");

module.exports = class CommandUtils {
    constructor(client) {
        this.client = client
    }

    async CommandLoad(cmd, t, dir = (`../../commands/${cmd.commandDirectory}`), dirBackup = (cmd.commandDirectory)) {
        const OCURRED = ({ error: false, errorEmit: false });
        delete require.cache[require.resolve(dir)];

        try {
            await require(dir);
        } catch (e) {
            (OCURRED.error = true, OCURRED.errorEmit = e);
            return OCURRED
        }

        this.client.commands.delete(cmd.commandHelp.name);

        const required = require(dir);
        const command = new (required)(this.client);

        if (!(command instanceof Command)) {
            (OCURRED.error = true, OCURRED.errorEmit = t('errors:awaitReloadCommandNoCMD'));
            return OCURRED
        }

        this.client.commands.set(command.name, {
            commandHelp: command,
            commandDirectory: dirBackup
        });
        return OCURRED
    }
}