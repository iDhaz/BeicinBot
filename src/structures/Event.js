module.exports = class Event {
    constructor(client) {
        this.client = client
    }

    ON_LOG() {
        console.log('[EVENTS]', `Starting the event ${this.name.toUpperCase()}`);
    }

    async DatabaseVerify(guild, author) {
        try {
            const UsuarioDataVerify = await this.client.database.users.verificar(author.id);
            const GuildDataVerify = await this.client.database.guilds.verificar(guild.id);

            if (!UsuarioDataVerify) {
                await this.client.database.users.add({ '_id': author.id });
            }
            if (!GuildDataVerify) {
                await this.client.database.guilds.add({ '_id': guild.id });
            }
            return true;
        } catch (err) {
            throw new Error(err);
        }
    }

    async CommandUtils(cmd, command = false) {
        try {
            command = await this.client.database.comandos.verificar(cmd.commandHelp.name);
            if (!command) {
                await this.client.database.comandos.add({
                    _id: cmd.commandHelp.name,
                    name: cmd.commandHelp.name.toUpperCase(),
                    devPermission: cmd.commandHelp.devNeed,
                    category: cmd.commandHelp.category,
                    usage: cmd.commandHelp.usage
                })
            } else {
                let name = cmd.commandHelp.name
                await this.client.database.comandos.update(name, { $inc: { Used: 1 } })
            }
            return true;
        } catch (err) {
            throw new Error(err);
        }
    }
}