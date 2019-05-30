const os = require('os');

module.exports = class CommandUtils {
    constructor(client) {
        this.client = client
    }

    async getPing() {
        let PING = await this.client.shard.broadcastEval('this.ping');
        PING = PING[this.client.shard.id].toFixed(0)
        return PING + '**MS**';
    }

    async getShard() {
        return (`**${(this.client.shard.id + 1)}**` + "/" + `**${this.client.shard.count}**`)
    }

    async getUsersSize() {
        let USERS = await this.client.shard.broadcastEval('this.users.size');
        return USERS.reduce((prev, val) => prev + val, 0);
    }

    async getGuildsSize() {
        let GUILDS = await this.client.shard.broadcastEval('this.guilds.size');
        return GUILDS.reduce((prev, val) => prev + val, 0);
    }

    getRamUsage() {
        let MemoryHeapUsed = (((process.memoryUsage().heapUsed) / 1024 / 1024).toFixed(2))
        let MemoryHeapTotal = ((os.totalmem() / 1024 / 1024).toFixed(2))
        return (`${(MemoryHeapUsed)}**MB**` + " / " + `${(MemoryHeapTotal)}**MB**`)
    }

    getUptime() {
        let NUM = parseInt((this.client.uptime / 1000), 10);
        let HOURS = Math.floor(NUM / 3600);
        let DAYS = Math.floor(HOURS / 24);
        let MINUTES = Math.floor((NUM - (HOURS * 3600)) / 60);
        let SECONDS = (NUM - (HOURS * 3600) - (MINUTES * 60));

        if (HOURS < 10) { HOURS = "0" + HOURS; }
        if (DAYS < 10) { DAYS = "0" + DAYS; }
        if (MINUTES < 10) { MINUTES = "0" + MINUTES; }
        if (SECONDS < 10) { SECONDS = "0" + SECONDS; }

        let TIME = HOURS + 'h ' + MINUTES + 'm ' + SECONDS + 's';

        DAYS > 0 ? (
            TIME = `${DAYS}**d** ` + `${HOURS}**h** ` + `${MINUTES}**m** ` + `${SECONDS}**s**`
        ) : (
                TIME = `${HOURS}**h** ` + `${MINUTES}**m** ` + `${SECONDS}**s**`
            )
        return TIME;
    }
}