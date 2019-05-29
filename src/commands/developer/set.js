const { Command, Emojis, ClientEmbed, ErrorCommand } = require("../../");

const aliases = [
    { arg: "developer", type: "developer", num: 1 },
    { arg: "dev", type: "developer", num: 1 },
    { arg: "owner", type: "owner", num: 2 },
    { arg: "own", type: "owner", num: 2 }
];
const GET_PARAMETERS = () => {
    let PARAMETERS = []
    let NUM1 = aliases.filter(a => a.num == 1).slice(0, 1)[0];
    let NUM2 = aliases.filter(a => a.num == 2).slice(0, 1)[0];
    PARAMETERS.push(NUM1); PARAMETERS.push(NUM2);
    return PARAMETERS.map(parameter => parameter.type).join(' | ')
}
const GET_ALIASE = (msg) => { return aliases.find(aliase => aliase.arg.toLowerCase() === msg.toLowerCase()) }

class SetRole extends Command {
    constructor(client) {
        super(client, {
            name: "set",
            description: "Seta um cargo ao usuário inserido",
            usage: { args: true, argsNeed: true, argsTxt: "<parameter> <user>", need: "{prefix} {cmd} {args}" },
            category: "Owner",
            cooldown: 3000,
            aliases: ["setar"],
            Permissions: ["SEND_MESSAGES"],
            UserPermissions: [],
            devNeed: false,
            ownerNeed: true
        });
    }

    async run({ message, channel, author, guild, args }, t) {
        const EMBED = new ClientEmbed(author);
        const USER = await this.GetUser(args[1], message, guild, author);
        const USER_DB = (await this.client.database.users.verificar(USER.id) ? await this.client.database.users.findOne(USER.id) : false)

        if (args[0] && args[1] && USER_DB && (USER_DB._id !== author.id)) {
            let ALIASE = await GET_ALIASE(args[0]);
            if (ALIASE) {
                let SET = (USER_DB[ALIASE.type] ? false : true)
                await this.client.DatabaseUtils['set' + ALIASE.type.charAt(0).toUpperCase() + ALIASE.type.slice(1)](USER, SET)
                    .catch((err) => { throw new ErrorCommand(err) });

                return channel.send(EMBED
                    .setDescription(`${Emojis.Certo} **${author.username}**, ${t(`comandos:set.${SET ? 'setTo' : 'unSetTo'}`, { user: USER.username, type: ALIASE.type })}`)
                )
            } else {

            }

        } else {
            const error = (args[0] && args[1] && !USER_DB ? 'comandos:set.noUserDb'
                : args[0] && args[1] && (USER.id === author.id) ? 'comandos:set.hasApplied'
                    : args[0] && !GET_ALIASE(args[0]) ? 'comandos:set.noAliaseContent'
                        : !args[0] ? 'comandos:set.noParameters' : !args[1] ? 'comandos:set.noUserIdentify'
                            : 'comandos:set.noParameters')
            console.log(error)
            return channel.send(EMBED
                .setDescription(`${Emojis.Errado} **${author.username}**, ${t(error, { user: USER.username, parameters: await GET_PARAMETERS() })}`)
                .setColor(process.env.ERROR_COLOR)
            )
        }
    }
}

module.exports = SetRole;