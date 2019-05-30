const utilsCommand = require("./structures/CMD/");

module.exports = {
    Command: utilsCommand.Command,
    CommandContext: utilsCommand.CommandContext,
    CommandLoader: utilsCommand.CommandLoader, 
    CommandUtils: utilsCommand.CommandUtils,
    CommandVerify: utilsCommand.CommandVerify,
    ErrorCommand: utilsCommand.ErrorCommand,
    CommandManager: utilsCommand.CommandManager,
    EvaledCommand: utilsCommand.EvaledCommand,

    Emojis: require("./utils/Emojis.js"),
    ClientEmbed: require("./structures/ClientEmbed.js")
}