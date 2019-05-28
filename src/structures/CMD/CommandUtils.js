module.exports = class CommandUtils {
    constructor(client) {
        this.client = client
    }

    _run() { }

    async GetUser(args, message, guild, author) {
        let USER = null
        try {
            if (args[0]) {
                if (message.mentions.users.first()) {
                    USER = message.mentions.users.first()
                } else if (!(isNaN(args[0]))) {
                    if (this.client.fetchUser(args[0])) {
                        USER = await this.client.fetchUser(args[0]).then(a => { return a })
                    }
                }
                if (!USER) {
                    if (guild.members.get(args[0]) || this.client.users.get(args[0])) {
                        USER = guild.members.get(args[0]) ? guild.members.get(args[0]).user : this.client.users.get(args[0]);
                    } else {
                        USER = await (this.client.users.find(user => user.username.toLowerCase() === args.join(' ').toLowerCase()) ? this.client.users.find(user => user.username.toLowerCase() === args.join(' ').toLowerCase()) : this.client.users.find(user => user.tag.toLowerCase() === args.join(' ').toLowerCase()) ? this.client.users.find(user => user.tag.toLowerCase() === args.join(' ').toLowerCase()) : message.guild.members.find(user => user.displayName.toLowerCase() === args.join(' ').toLowerCase()) ? message.guild.members.find(user => user.displayName.toLowerCase() === args.join(' ').toLowerCase()).user : message.guild.members.find(user => user.displayName.toLowerCase().includes(args.join(' ').toLowerCase())) ? message.guild.members.find(user => user.displayName.toLowerCase().includes(args.join(' ').toLowerCase())).user : this.client.users.find(user => user.username.toLowerCase().includes(args.join(' ').toLowerCase())) ? this.client.users.find(user => user.username.toLowerCase().includes(args.join(' ').toLowerCase())) : null)
                    }
                }
            } else {
                USER = author
            }
            if (!USER) USER = author;
            return USER;
        } catch (err) {
            return author;
        }
    }
}