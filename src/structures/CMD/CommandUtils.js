const CommandManager = require("./CommandManager.js");

module.exports = class CommandUtils extends CommandManager {
    constructor(client) {
        super(client)
        
        this.client = client
    }

    _run() { }

    async GetUser(args, message, guild, author) {
        args = (args && Array.isArray(args) ? args.join(' ') : args ? args : false)
        let USER = false

        try {
            if (args) {
                if (message.mentions.users.first()) {
                    USER = message.mentions.users.first()
                } else if (!(isNaN(args))) {
                    if (this.client.fetchUser(args)) {
                        USER = await this.client.fetchUser(args).then(a => { return a })
                    } else if (guild.members.get(args)) {
                        USER = guild.members.get(args).user;
                    }
                }
                if (!USER) {
                    if (this.client.users.find(user => user.username.toLowerCase() === args.toLowerCase())) {
                        USER = this.client.users.find(user => user.username.toLowerCase() === args.toLowerCase())
                    } else if (this.client.users.find(user => user.tag.toLowerCase() === args.toLowerCase())) {
                        USER = this.client.users.find(user => user.tag.toLowerCase() === args.toLowerCase())
                    } else if (this.client.users.find(user => user.username.toLowerCase().includes(args.toLowerCase()))) {
                        USER = this.client.users.find(user => user.username.toLowerCase().includes(args.toLowerCase()))
                    } else if (message.guild.members.find(user => user.displayName.toLowerCase() === args.toLowerCase())) {
                        USER = message.guild.members.find(user => user.displayName.toLowerCase() === args.toLowerCase()).user
                    } else if (message.guild.members.find(user => user.displayName.toLowerCase().includes(args.toLowerCase()))) {
                        USER = message.guild.members.find(user => user.displayName.toLowerCase().includes(args.toLowerCase())).user
                    }
                }
            } else {
                USER = author
            }
            return USER ? USER : author;
        } catch (err) {
            return author;
        }
    }
}