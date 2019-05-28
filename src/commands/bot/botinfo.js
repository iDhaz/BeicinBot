const {
    Command,
    Emojis,
    ClientEmbed,
    EvaledCommand
} = require("../../");

class BotInfo extends Command {
    constructor(client) {
        super(client, {
            name: "botinfo",
            description: "Informações sobre o bot",
            usage: { args: false, argsNeed: false },
            category: "Developer",
            cooldown: 3000,
            aliases: ["bi", "boti"],
            Permissions: ["SEND_MESSAGES"],
            UserPermissions: [],
            devNeed: false
        });
    }

    async run({ author, channel, args }, t) {
        const EMBED = new ClientEmbed(author)
            .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
            .setThumbnail(this.client.user.displayAvatarURL);

            return channel.send(EMBED)
    }
}

module.exports = BotInfo;