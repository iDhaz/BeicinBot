const { Client, Collection } = require("discord.js");
const MODULES = require("./loaders/"),
    { Match, Regions, ERRORS } = require("./utils/JSON/");

module.exports = class Beicin extends Client {
    constructor(settings) {
        super(settings);

        settings.requireEnv();

        this.collection = Collection;
        this.RandomMatch = Match
        this.regionsLang = Regions
        this.ERRORS = ERRORS
    }

    async CONNECT(token = false) {
        process.env.TOKEN ? token = process.env.TOKEN : this.Error('No token identify');
        await this.initializeLoaders();
        return super.login(token)
            .then(async () => {
                this.imGuild = await this.guilds.get(process.env.GUILD_ID);
                this.owner = await this.fetchUser(process.env.OWNER_ID)
            });
    }

    async initializeLoaders() {
        const LOADERS = Object.values(MODULES);
        let loadeds = 0;
        for (const initialize of LOADERS) {
            const requirement = new initialize(this);
            try {
                await requirement.call();
                ++loadeds
            } catch (e) {
                this.LOG_ERR(e, requirement.name.toUpperCase());
            }
        }
        return this.LOG(`I successfully loaded ${loadeds} modules from ${LOADERS.length} modules`, 'LOADERS')
    }

    LOG(...args) {
        const Sendlog = `[36m[${args.slice(1).toString()}][0m` + ` ${args[0]}`
        console.log(Sendlog)
    }

    LOG_ERR(...args) {
        const Sendlog = (args.length > 1 ? args.slice(1).map(t => `[${t}] `) : [])
        console.log('[31m[ERROR][0m ' + Sendlog + args[0]);
    }

    Error(err) {
        throw new Error(err);
    }
}