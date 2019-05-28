const CommandVerify = require("./CommandVerify.js"),
    ErrorCommand = require("./ErrorCommand.js"),
    CommandUtils = require("./CommandUtils.js");

module.exports = class Command extends CommandUtils {
    constructor(client, options) {
        super(client)

        this.client = client
        this.name = options.name || "Sem Nome"
        this.description = options.description || false
        this.usage = options.usage || false
        this.category = options.category || "Outros"
        this.Permissions = options.Permissions || ["SEND_MESSAGES"]
        this.UserPermissions = options.UserPermissions || []
        this.cooldownTime = options.cooldown || 5000
        this.aliases = options.aliases || []
        this.devNeed = options.devNeed || false
        this.cooldown = new Map();
    }

    async _run(settings) {
        const { command, channel, author, developer, t } = settings;
        const CMDVerify = new CommandVerify(this.client);
        try {
            if (this.UserPermissions.length >= 1 && await (CMDVerify.VERIFY_MEMBER(settings)) === false) return;
            if (this.Permissions.length >= 1 && await (CMDVerify.VERIFY_CLIENT(settings)) === false) return;

            await command.commandHelp.run(settings, t);
            return true;
        } catch (e) {
            return ErrorCommand.commandError(this.client, t, channel, author, e);
        }
    }
}