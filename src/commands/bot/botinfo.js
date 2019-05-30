const { Command, Emojis, ClientEmbed } = require("../../");

class BotInfo extends Command {
    constructor(client) {
        super(client, {
            name: "botinfo",
            description: "Informações sobre o bot",
            usage: { args: false, argsNeed: false },
            category: "Bot",
            cooldown: 3000,
            aliases: ["bi", "boti"],
            Permissions: ["SEND_MESSAGES"],
            UserPermissions: [],
            devNeed: false
        });
    }

    async run({ author, channel }, t) {
        const EMBED = new ClientEmbed(author)
            .setAuthor(this.client.user.username, this.client.user.displayAvatarURL);
        //.setThumbnail(this.client.user.displayAvatarURL);

        return channel.send(EMBED
            .addField(t('clientMessages:users'), (await this.getUsersSize()), true)
            .addField(t('clientMessages:guilds'), (await this.getGuildsSize()), true)
            .addField(t('clientMessages:uptime'), (await this.getUptime()), true)
            .addField(t('clientMessages:ram'), (await this.getRamUsage()), true)
        )
    }
}

module.exports = BotInfo;