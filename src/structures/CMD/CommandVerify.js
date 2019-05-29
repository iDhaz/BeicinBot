const ClientEmbed = require("../ClientEmbed.js");
const ErrorCommand = require("./ErrorCommand.js");

module.exports = class CommandVerify {
    constructor(client) {
        this.client = client
    }

    VERIFY_CLIENT({ channel, command, author, t }) {
        try {
            let PERMS_ARRAY = command.commandHelp.Permissions
            let PERMS_VERIFY = []

            for (const VerifyPerms of Object.values(PERMS_ARRAY)) {
                PERMS_VERIFY.push({ PermName: VerifyPerms, VerifyBoolean: !!channel.permissionsFor(this.client.user.id).has(VerifyPerms) })
            }

            if (PERMS_VERIFY.some(perm => !perm.VerifyBoolean)) {
                let PERMS_LENGTH = PERMS_VERIFY.filter(perm => !perm.VerifyBoolean)
                let NEED_PERMS = PERMS_VERIFY.filter(perm => !perm.VerifyBoolean).map(perm => `**"${perm.PermName}"**`).join(", ")
                let ERR_USAGE = null

                if (PERMS_LENGTH.length == 1) {
                    ERR_USAGE = 'errors:botMissingOnePermission'
                } else if (PERMS_LENGTH.length > 1) {
                    ERR_USAGE = 'errors:botMissingMultiplePermissions'
                }

                const embed = new ClientEmbed(author)
                    .setDescription(t(`${ERR_USAGE}`, { permission: NEED_PERMS.toString() }))
                channel.send(embed.setColor(process.env.ERROR_COLOR));
                return false;
            }
            return true;
        } catch (e) {
            throw new ErrorCommand(e);
        }
    }

    VERIFY_MEMBER({ channel, command, author, message, t }) {
        try {
            let PERMS_ARRAY = command.commandHelp.UserPermissions
            let PERMS_VERIFY = []

            for (const VerifyPerms of Object.values(PERMS_ARRAY)) {
                PERMS_VERIFY.push({ PermName: VerifyPerms, VerifyBoolean: !!message.member.hasPermission(VerifyPerms) })
            }

            if (PERMS_VERIFY.some(perm => !perm.VerifyBoolean)) {

                let PERMS_LENGTH = PERMS_VERIFY.filter(perm => !perm.VerifyBoolean)
                let NEED_PERMS = PERMS_VERIFY.filter(perm => !perm.VerifyBoolean).map(perm => `**"${perm.PermName}"**`).join(", ")
                let ERR_USAGE = null

                if (PERMS_LENGTH.length == 1) {
                    ERR_USAGE = 'errors:missingOnePermission'
                } else if (PERMS_LENGTH.length > 1) {
                    ERR_USAGE = 'errors:missingMultiplePermissions'
                }

                const embed = new ClientEmbed(author)
                    .setDescription(t(`${ERR_USAGE}`, { permission: NEED_PERMS }))
                channel.send(embed.setColor(process.env.ERROR_COLOR));
                return false;
            }
            return true;
        } catch (e) {
            throw new ErrorCommand(e);
        }
    }
}