const utilsCommand = require("./structures/CMD/");

module.exports = {
    Command: utilsCommand.Command,
    CommandContext: utilsCommand.CommandContext,
    EvaledCommand: utilsCommand.EvaledCommand,
    ErrorCommand: utilsCommand.ErrorCommand,

    Emojis: require("./utils/Emojis.js"),
    ClientEmbed: require("./structures/ClientEmbed.js")
}