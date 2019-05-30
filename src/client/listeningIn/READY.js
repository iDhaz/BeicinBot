const Event = require("../../structures/Event.js");

module.exports = class ReadyEvent extends Event {
    constructor(client) {
        super(client)

        this.client = client
        this.name = 'ready'
        super.ON_LOG()
    }

    async ON() {
        if (this.client.shard) this.ShardManager()

        return this.client.user.setPresence({
            game: {
                name: this.client.RandomMatch.txt.replace('{{user}}', this.client.user.username),
                type: this.client.RandomMatch.type,
                url: this.client.RandomMatch.url
            },
            status: this.client.RandomMatch.status
        });
    }

    async ShardManager() {
        this.client.imGuild = {
            send: async (channel, msg) => {
                if (this.client.guilds.get(process.env.GUILD_ID)) {
                    return await this.client.guilds.get(process.env.GUILD_ID).channels.get(channel).send(msg).catch(this.client.LOG_ERR);
                } else {
                    return this.client.shard.broadcastEval(`
                        try {
                            this.guilds.get('${process.env.GUILD_ID}').channels.get('${channel}').send('${msg}')
                        } catch (err) { }
                    `);
                }
            }
        };

        return this.client.on("error", this.client.LOG_ERR).on("warn", this.client.LOG_ERR).on("debug", debug => {
            console.log(`\x1b[31m[SHARD ${(this.client.shard.id + 1)}]\x1b[0m  ${debug}`);
        })
    }
}