const {
    Command,
    Emojis,
    ClientEmbed
} = require("../../");

class Reload extends Command {
    constructor(client) {
        super(client, {
            name: "reload",
            description: "Recarrega o comando inserido",
            usage: { args: true, argsNeed: true, argsTxt: "<command>", need: "{prefix} {cmd} {args}" },
            category: "Developer",
            cooldown: 3000,
            aliases: ["r", "rl"],
            Permissions: ["SEND_MESSAGES"],
            UserPermissions: [],
            devNeed: true
        });
    }

    async run({ channel, author, args }, t) {
        const EMBED = new ClientEmbed(author);
        const CMD = await this.client.commands.find(cmd => cmd.commandHelp.name === args.join(' ') || (
            cmd.commandHelp.aliases.includes(args.join(' '))
        ))

        if (args[0] && CMD) {
            const { error, errorEmit } = await this.client.loaderCommand(CMD, t);
            const STATUS = (error ? 'comandos:reload.error' : 'comandos:reload.reloaded');

            if (error) EMBED.setColor(process.env.ERROR_COLOR);

            return channel.send(EMBED
                .setDescription(`${error ? Emojis.Errado : Emojis.Certo} **${author.username}**, ${t(STATUS, { error: errorEmit.message, cmd: CMD.commandHelp.name })}`)
            )
        } else {
            const ERROR = (args[0] ? 'comandos:reload.noCommand' : 'comandos:reload.noArgs')
            return channel.send(EMBED
                .setDescription(`${Emojis.Errado} **${author.username}**, ${t(ERROR, { cmd: args.join(' ') })}`)
                .setColor(process.env.ERROR_COLOR)
            )
        }
    }
}

module.exports = Reload;