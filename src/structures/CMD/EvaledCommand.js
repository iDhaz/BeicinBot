const { inspect } = require('util');

const resole = async (codein) => {
    await new Promise(function (resolve, reject) {
        setTimeout(resolve, 100)
    })
    return codein.replace('await', '');
};
const codein = async (codein) => {
    let verify = codein.includes('await') ? resole(codein) : codein;
    return verify;
};

module.exports = class EvaledCommand {
    constructor(client) {
        this.client = client
        this.REPLACES = [
            process.env.TOKEN
        ]
    }

    async getEvaled({ author, channel, guild, message }, code, t) {
        let RESULT;
        let ERRROR_EMIT = false;

        try {
            if (code.includes('send') && code.includes('process.env')) {
                RESULT = 'I will not send my private information!'
                ERRROR_EMIT = true;
            } else {
                RESULT = await eval(await codein(code));
            }
        } catch (err) {
            err = err.message;
            RESULT = err;
            ERRROR_EMIT = true;
        } finally {
            RESULT = inspect(RESULT, { depth: 0 });

            let resultCheck = RESULT; (typeof resultCheck === 'object' ? JSON.stringify(resultCheck) : resultCheck);

            if (code.includes('process.env') || this.REPLACES.some(rs => resultCheck.includes(rs))) {
                const RES = await this.replaceProcess(RESULT);
                RESULT = RES;
            }
            RESULT = ERRROR_EMIT ? RESULT : this.clean(RESULT);
            return { code: ERRROR_EMIT ? 'xl' : 'js', result: RESULT };
        }
    }

    async replaceProcess(RESULT) {
        try {
            let BACKUP = RESULT;
            RESULT = (typeof RESULT === 'object' ? JSON.stringify(RESULT) : RESULT);

            for (const txt of this.REPLACES) {
                return RESULT.replace(txt, '*'.repeat(txt.length));
            }
            return typeof BACKUP === 'object' ? JSON.parse(RESULT) : RESULT;
        } catch (e) {
            throw new Error(e);
        }
    }

    clean(text) {
        const blankSpace = String.fromCharCode(8203)
        return typeof text === 'string' ? text.replace(/`/g, '`' + blankSpace).replace(/@/g, '@' + blankSpace) : text
    }
}