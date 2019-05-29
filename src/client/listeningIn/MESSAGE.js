const Event = require("../../structures/Event.js"),
    { ClientEmbed, CommandContext, Emojis } = require("../../");

const GET_MENTION = (id) => { return new RegExp(`^<@!?${id}>( |)$`) }

const GET_PREFIX = (message, PREFIXES) => {
    let verify = PREFIXES.some(Prefix => message.content.startsWith(Prefix))
    return verify ? PREFIXES.find(Prefix => message.content.startsWith(Prefix)) : false;
}

const MENTIONS = (PREFIXES, id) => { for (const value of [`<@!${id}>`, `<@${id}>`]) PREFIXES.push(value) }

module.exports = class MessageEvent extends Event {
    constructor(client) {
        super(client)

        this.client = client
        this.name = 'message'
        this.parameters = 'message'

        super.ON_LOG();
    }

    async ON(message) {
        if (this.client && !(this.client.database.guilds || this.client.database.users)) return;
        if (message.author.bot || message.channel.type === "dm") return;

        await this.DatabaseVerify(message.guild, message.author);

        const { developer, blacklist, owner } = await this.client.database.users.findOne(message.author.id);
        const { prefix, language } = await this.client.database.guilds.findOne(message.guild.id);

        if (message.content.match(await GET_MENTION(this.client.user.id)) && (!blacklist)) {
            return message.channel.send(new ClientEmbed(message.author)
                .setDescription(`${Emojis.Certo} **${message.author.username}**, ` + this.client.language.i18next.getFixedT(language)('comandos:mentionBot', { prefix }))
            )
        }

        const PREFIXES = [prefix]; await MENTIONS(PREFIXES, this.client.user.id)
        const PREFIX = await GET_PREFIX(message, PREFIXES);

        if (PREFIX && message.content.length > PREFIX.length || (!message.channel.permissionsFor(message.guild.me).missing('SEND_MESSAGES'))) {
            const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
            const cmdInsert = args.shift().toLowerCase();
            const command = this.client.commands.find(cmd => cmd.commandHelp.name === cmdInsert || (
                cmd.commandHelp.aliases.includes(cmdInsert)
            ));

            if (command) {
                const APROVE = async () => {
                    const { devPermission, ownerPermission } = await this.client.database.comandos.findOne(command.commandHelp.name);

                    if (blacklist) {
                        return { aproved: false, because: 'errors:isClientBlackListed' }
                    } else if (devPermission && (!developer) && (!owner)) {
                        return { aproved: false, because: 'errors:noClientDeveloper' }
                    } else if(ownerPermission && (!owner)) {
                        return { aproved: false, because: 'errors:noClientOwner' }
                    }
                    return { aproved: true }
                }

                const { aproved, because } = await APROVE();

                if (!(aproved)) return message.channel.send(new ClientEmbed(message.author)
                    .setDescription(`${Emojis.Errado} **${message.author.username}**, ` + this.client.language.i18next.getFixedT(language)(because))
                )

                const settings = new CommandContext({
                    client: this.client,
                    aliase: cmdInsert,
                    used: message.author,
                    command,
                    prefix,
                    message,
                    args,
                    language,
                    developer
                });

                return command.commandHelp._run(settings)
                    .then(this.CommandUtils(command))
                    .catch(this.client.LOG_ERR);
            }
        }
    }
}