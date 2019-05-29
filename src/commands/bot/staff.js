const { Command, Emojis, ClientEmbed } = require("../../");

class Staff extends Command {
    constructor(client) {
        super(client, {
            name: "staff",
            description: "Envolvidos em minha criação",
            usage: { args: false, argsNeed: false },
            category: "Bot",
            cooldown: 3000,
            aliases: ["stf"],
            Permissions: ["SEND_MESSAGES"],
            UserPermissions: [],
            devNeed: false
        });
    }

    async run({ author, channel }, t) {
        const EMBED = new ClientEmbed(author)
            .setAuthor(`${this.client.user.username} Staff`, this.client.user.displayAvatarURL)
            .setThumbnail(this.client.user.displayAvatarURL);

        const STAFFERS = await this.client.database.users.findAll();
        const owners = [];
        const developers = [];

        await this.PUSH(STAFFERS, owners, developers);

        return channel.send(EMBED
            .addField('Owner(s)', `${owners.length > 0 ? owners.map(user => `${user.tag} \`(${user.id})\``).join('\n') : 'None'}`)
            .addField('Developer(s)', `${developers.length > 0 ? developers.map(user => `${user.tag} \`(${user.id})\``).join('\n') : 'None'}`)
        )
    }

    async PUSH(STAFFERS, owners, developers) {
        for (const owner of STAFFERS.filter(user => user.owner)) {
            owners.push(await this.client.fetchUser(owner._id).then(user => { return user }))
        }
        for (const developer of STAFFERS.filter(user => user.developer)) {
            developers.push(await this.client.fetchUser(developer._id).then(user => { return user }))
        }
    }
}

module.exports = Staff;