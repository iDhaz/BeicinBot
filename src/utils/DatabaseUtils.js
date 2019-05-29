module.exports = class DatabaseUtils {
    constructor(client) {
        this.client = client
    }

    async setPrefix(guild, prefix) {
        return await this.client.database.guilds.update(guild.id, { $set: { prefix } })
    }

    async setDeveloper(user, developer) {
        return await this.client.database.users.update(user.id, { $set: { developer } })
    }

    async setOwner(user, owner) {
        return await this.client.database.users.update(user.id, { $set: { owner } })
    }

    async setUserBlacklist(user, blacklist) {
        return await this.client.database.users.update(user.id, { $set: { blacklist } })
    }
}