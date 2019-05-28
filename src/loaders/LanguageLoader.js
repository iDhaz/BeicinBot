const { promisify } = require('util');
const fs = require("fs");

const i18next = require('i18next');
const translationBackend = require('i18next-node-fs-backend');

module.exports = class LanguageLoader {
    constructor(client) {
        this.name = 'LanguageLoader'
        
        this.client = client
        this.language = {
            i18next: i18next
        }
    }

    async call() {
        this.client.language = this.language;
        return this.LoaderLanguage()
            .then(() => {
                this.client.LOG('i18next initialized', 'LanguageSystem');
            })
    }

    async LoaderLanguage(dirPath = 'src/locales') {
        try {
            i18next.use(translationBackend).init({
                ns: ['comandos', 'errors', 'bot'],
                preload: await LanguageLoader.readdir(dirPath),
                fallbackLng: 'pt-BR',
                backend: {
                    loadPath: `${dirPath}/{{lng}}/{{ns}}.json`
                },
                interpolation: {
                    escapeValue: false
                },
                returnEmptyString: false
            })
        } catch (e) {
            this.client.LOG_ERR(e)
        }
    }
}

module.exports.readdir = promisify(fs.readdir);