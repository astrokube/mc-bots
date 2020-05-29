const mineflayer = require("mineflayer");
const navigatePlugin = require("mineflayer-navigate")(mineflayer);

function createBot({
    username,
    host,
    port,
    version,
    verbose,
}) {

    const bot = mineflayer.createBot({ 
        username, 
        host, 
        port,
        version,
        verbose, 
    });

    navigatePlugin(bot);

    bot.navigate.blocksToAvoid[132] = true; // avoid tripwire
    bot.navigate.blocksToAvoid[59] = false; // ok to trample crops
    bot.navigate.on("pathFound", (path) => {
        bot.chat("found path. I can get there in " + path.length + " moves.");
    });
    bot.navigate.on("cannotFind", (closestPath) => {
        bot.chat("unable to find path. getting as close as possible");
        bot.navigate.walk(closestPath);
    });
    bot.navigate.on("arrived", () => {
        bot.chat("I have arrived");
    });
    bot.navigate.on("interrupted", () => {
        bot.chat("stopping");
    });
    bot.on("error", err => console.log(err));

    return bot;
}

module.exports = createBot;

