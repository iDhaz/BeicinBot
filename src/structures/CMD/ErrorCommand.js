const ClientEmbed = require("../ClientEmbed.js");

module.exports =  class CommandError extends Error {
    constructor(message) {
        super(message);
    }

    static commandError(client, t, channel, author, error, { displayAvatarURL } = client.user) {
        try {
            return channel.send(new ClientEmbed(author)
                .setAuthor(t('errors:CommandError'), displayAvatarURL)
                .setDescription(error.message ? error.message : error)
                .setColor(process.env.ERROR_COLOR)
            ).then(async () => {
                const CHANNEL_SEND = await client.imGuild
                    .channels.get(JSON.parse(process.env.UTILS_LOGS)['ERROR'])

                CHANNEL_SEND ? CHANNEL_SEND.send(new ClientEmbed(used)
                    .setColor(process.env.ERROR_COLOR)
                    .setTitle("Erro ao executar um Comando")
                    .addField("Comando", command.name, true)
                    .addField("Usado Por:", used.tag, true)
                    .addField("No Servidor:", channel.guild.name + ' `(' + channel.guild.id + ')`', true)
                    .addField("Erro", error)
                    .setThumbnail(channel.guild.iconURL ? channel.guild.iconURL : displayAvatarURL)
                ) : console.log('\nErro ao executar um Comando\n' + `"Comando": ${command.name}\n"Erro": ${error}`)
            });
        } catch (err) {
            return client.LOG_ERR(err);
        }
    }
}