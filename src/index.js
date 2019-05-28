const utilsCommand = require("./structures/CMD/");

module.exports = {
    Command: utilsCommand.Command,
    CommandContext: utilsCommand.CommandContext,
    EvaledCommand: utilsCommand.EvaledCommand,

    Emojis: require("./utils/Emojis.js"),
    ClientEmbed: require("./structures/ClientEmbed.js")
}