const Event = require("../../structures/Event.js");

module.exports = class ReadyEvent extends Event {
    constructor(client) {
        super(client)

        this.client = client
        this.name = 'ready'
        super.ON_LOG()
    }

    async ON() {
        return this.client.user.setPresence({
            game: {
                name: this.client.RandomMatch.txt.replace('{{user}}', this.client.user.username),
                type: this.client.RandomMatch.type,
                url: this.client.RandomMatch.url
            },
            status: this.client.RandomMatch.status
        });
    }
}