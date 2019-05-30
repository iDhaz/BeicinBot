const { ShardingManager } = require("discord.js");

const manager = new ShardingManager('./index.js', {
    token: process.env.TOKEN,
    respawn: true,
    totalShards: 1
});

manager.spawn().catch(e => { console.log(e); process.exit(1); });