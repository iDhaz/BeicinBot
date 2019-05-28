const { MongoDB } = require("../database");

module.exports = class DatabaseLoader {
    constructor(client) {
        this.name = 'DatabaseLoader'

        this.client = client
        this.database = false
    }

    async call() {
        this.client.database = this.database;
        return this.LoaderDatabase()
            .then(() => {
                this.client.LOG('The database was successfully imported!', 'DATABASE');
            })
    }

    LoaderDatabase(DBWrapper = MongoDB, options = {}) {
        this.client.database = new DBWrapper(options, this.client)
        return this.client.database.connect()
            .catch(e => {
                this.client.LOG_ERR('DB', e.message)
                this.client.database = false
            })
    }
}