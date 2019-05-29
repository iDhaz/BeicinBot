const {
    Command,
    Emojis,
    ClientEmbed
} = require("../../");

class ReloadLocales extends Command {
    constructor(client) {
        super(client, {
            name: "reloadlocales",
            description: "Recarrega o sistema de linguagem",
            usage: { args: false, argsNeed: false },
            category: "Developer",
            cooldown: 3000,
            aliases: ["locales", "rlc"],
            Permissions: ["SEND_MESSAGES"],
            UserPermissions: [],
            devNeed: true
        });
    }

    async run({ channel, author }, t) {
        const EMBED = new ClientEmbed(author);
        const LOADED = await (this.client.language.LoaderLanguage());

        if (LOADED) {
            return channel.send(EMBED
                .setDescription(`${Emojis.Certo} **${author.username}**, ${t('comandos:reloadlocales.loaded')}`)
            )
        } else {
            return channel.send(EMBED
                .setDescription(`${Emojis.Certo} **${author.username}**, ${t('comandos:reloadlocales.noloaded')}`)
            )
        }
    }
}

module.exports = ReloadLocales;