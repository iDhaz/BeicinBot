const CommandVerify = require("./CommandVerify.js");
const ErrorCommand = require("./ErrorCommand.js");
const CommandUtils = require("./CommandUtils.js");

module.exports = class Command extends CommandUtils {
    constructor(client, options) {
        super(client)

        this.client = client
        this.name = options.name || "Sem Nome"
        this.description = options.description || "Nenhuma"
        this.usage = options.usage || { args: false, argsNeed: false }
        this.category = options.category || "Nenhuma"
        this.Permissions = options.Permissions || ["SEND_MESSAGES"]
        this.UserPermissions = options.UserPermissions || []
        this.cooldownTime = options.cooldown || 5000
        this.aliases = options.aliases || []
        this.devNeed = options.devNeed || false
        this.ownerNeed = options.ownerNeed || false
        this.cooldown = new Map();
    }

    async _run(settings) {
        const { command, channel, author, language, developer, used, t } = settings;
        const CMDVerify = new CommandVerify(this.client);
        try {
            if ((!t)) throw new ErrorCommand(this.client.ERRORS.language[language]);
            if (this.Permissions.length >= 1 && await !(CMDVerify.VERIFY_CLIENT(settings))) return;
            if ((!developer) && this.UserPermissions.length >= 1 && await !(CMDVerify.VERIFY_MEMBER(settings))) return;

            await command.commandHelp.run(settings, t);
            return true;
        } catch (e) {
            return ErrorCommand.commandError(this.client, command, t, channel, author, used, e);
        }
    }
}