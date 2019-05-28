const {
    Command,
    Emojis,
    ClientEmbed,
    EvaledCommand
} = require("../../");

class Eval extends Command {
    constructor(client) {
        super(client, {
            name: "eval",
            description: "Executa códigos em JS",
            usage: [{ args: true, argsNeed: true, argsTxt: "code", usage: "{prefix} {cmd} [{args}]" }],
            category: "Developer",
            cooldown: 3000,
            aliases: ["e"],
            Permissions: ["SEND_MESSAGES"],
            UserPermissions: [],
            devNeed: true
        });
    }

    async run(settings, t) {
        const { author, channel, args } = settings;
        const CODE = async () => {
            const EvaledCMD = new EvaledCommand(this.client);
            const CODE = args.join(' ').replace(/^```(js|javascript ? \n )?|```$/gi, '')
            const Evaled = await EvaledCMD.getEvaled(settings, CODE);

            if (Evaled.result.length > 500) {
                console.log('______________________________________')
                console.log(Evaled.result)
                console.log('\n' + '--------------------------------------')
                Evaled.result = Evaled.result.slice(0, 500) + '\n[...]'
            }
            const evalTransform = await this.evalTransform(Evaled);
            return { evalTransform, color: Evaled.code == 'xl' ? true : false };
        }

        const EMBED = new ClientEmbed(author)
            .setAuthor(this.client.user.username, this.client.user.displayAvatarURL);

        if (args[0]) {
            const { evalTransform, color } = await CODE();

            if (color) {
                EMBED.setColor(process.env.ERROR_COLOR)
            }
            return channel.send(EMBED
                .setDescription(evalTransform)
            ).catch(this.client.logError)
        } else {
            return channel.send(EMBED
                .setDescription(`${Emojis.Errado} **${author.username}** ` + t('errors:noArgs'))
                .setColor(process.env.ERROR_COLOR)
            );
        }
    }

    evalTransform({ code, result }) {
        return '📤' + '\n' + '```' + code + '\n' + result + '\n```';
    }
}

module.exports = Eval;