const { Client, Collection } = require("discord.js");
const MODULES = require("./loaders/");
const { Aliases, Errors, Match, Regions,  } = require("./utils/JSON/");

module.exports = class Beicin extends Client {
    constructor(settings) {
        super(settings);

        settings.requireEnv();

        this.collection = Collection
        this.Aliases = Aliases
        this.ERRORS = Errors
        this.RandomMatch = Match
        this.regionsLang = Regions
        
    }

    async CONNECT() {
        await this.initializeLoaders();
        return super.login(process.env.TOKEN)
            .then(async () => {
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