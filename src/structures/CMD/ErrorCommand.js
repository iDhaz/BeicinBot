const ClientEmbed = require("../ClientEmbed.js");

module.exports = class CommandError extends Error {
    constructor(message) {
        super(message);
    }

    static commandError(client, command, t, channel, author, used, error, { displayAvatarURL } = client.user) {
        try {
            return channel.send(new ClientEmbed(author)
                .setAuthor(t('errors:CommandError'), displayAvatarURL)
                .setDescription(error.message ? error.message : error)
                .setColor(process.env.ERROR_COLOR)
            ).then(async () => {
                const CHANNEL = (JSON.parse(process.env.UTILS_LOGS)['ERROR'])
                return client.imGuild.send(CHANNEL, new ClientEmbed(used)
                    .setColor(process.env.ERROR_COLOR)
                    .setTitle("Erro ao executar um Comando")
                    .addField("Comando", command.commandHelp.name, true)
                    .addField("Usado Por:", used.tag, true)
                    .addField("No Servidor:", channel.guild.name + ' `(' + channel.guild.id + ')`', true)
                    .addField("Erro", error)
                    .setThumbnail(channel.guild.iconURL ? channel.guild.iconURL : displayAvatarURL)
                )
            })
        } catch (err) {
            return client.LOG_ERR(err);
        }
    }
}