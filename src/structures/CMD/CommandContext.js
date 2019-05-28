class CommandContext {

    constructor(options = {}) {
        this.client = options.client

        this.message = options.message
        this.author = options.message.author
        this.member = options.message.member
        this.channel = options.message.channel
        this.aliase = options.aliase
        this.used = options.used
        this.voiceChannel = options.message.member.voiceChannel
        this.guild = options.message.guild
        this.command = options.command
        this.args = options.args
        this.t = this.setFixedT(options.client.language.i18next.getFixedT(options.language)) || this.newMethod()
    }

    newMethod() {
        return null;
    }

    setFixedT(translate) {
        return this.t = translate
    }

    setFlags(flags) {
        this.flags = flags
    }
}

module.exports = CommandContext;