const {
    around,
    getRandomInt,
    getSymbol,
    wait
} = require("./utils");

const RANGE_MIN = 10;
const RANGE_MAX = 50;
const AROUND_FLY = 20;


async function digSquare(bot, basePosition, yPosition, aroundLimit) {
    for (const [x, z] of around(aroundLimit)) {
        const block = bot.blockAt(basePosition.floored().offset(
            x, 
            yPosition, 
            z,
        ));
        console.log("bot dig at:");
        console.log(block.position);
        await new Promise((resolve) => {
            if (block && block.type !== 0) {
                bot.dig(block, resolve);
            } else {
                console.log("block invalid");
                console.log(block);
                resolve();
            }
        });
        await wait(100);
    }
}

async function digAround(bot, deep, aroundLimit) {
    const deepArr = [1, 2, 0].concat(new Array(deep).fill(-1));
    bot.chat(`Start to dig. deep: ${deep}`);
    for (const y of deepArr) {
        const spawnPos = bot.entity.position.floored();
        await digSquare(bot, spawnPos, y, aroundLimit);
    }
    bot.chat("My hole is amazing :)");
}

async function goUp(bot, h) {
    let positionY = -99999;
    let finalPosition = bot.entity.position.offset(0, h, 0).y;
    console.log("Start to fly pos:");
    console.log(finalPosition);
    while (finalPosition >= positionY) {
        const position = bot.entity.position.floored();
        await digSquare(bot, position, 1, 3);
        const nextPosition = position.offset(0, 1, 0); 
        await new Promise((r) => bot.creative.flyTo(
            nextPosition, 
            r,
        ));
        positionY = bot.entity.position.floored().y;
    }
    console.log("Finish to fly");
}


async function fly(bot, loops, h = 10) {
    let i = 0;
    bot.chat(`Start to fly. loops: ${loops}`);
    await goUp(bot, h);
    while (i <= loops) {
        const { position } = bot.entity;
        // Draw a spiral
        await new Promise((r) => {
            bot.creative.flyTo(
                position.offset(
                    Math.sin(i) * AROUND_FLY, 
                    0, 
                    Math.cos(i) * AROUND_FLY
                ),
                r,
            );
        });
        i++;
    }
    bot.chat("My flight was amazing!");
}

async function goAround(bot, { xSymbol, zSimbol }) {
    const initial = bot.entity.position.floored();
    let results;

    while (true) { // eslint-disable-line
        const xPosition = getRandomInt(RANGE_MIN, RANGE_MAX) * (xSymbol || getSymbol());
        const zPosition = getRandomInt(RANGE_MIN, RANGE_MAX) * (zSimbol || getSymbol());
        console.log("Goind around to: (x:", xPosition, "z:", zPosition, ")");
        const to = initial.offset(
            xPosition,
            0,
            zPosition
        );
    
        bot.chat(`Start to goAround. goal: (${to.x}, ${to.y}, ${to.z})`);
    
        results = bot.navigate.findPathSync(to);
        if (results.status === "noPath") {
            const upTo = 125 - initial.y; 
            const loops = getRandomInt(20, 50);
            await fly(bot, loops, upTo);
            bot.creative.stopFlying();
            await wait(5000);
        } else {
            break;
        }
    }


    bot.chat("goAround status: " + results.status);
    return new Promise((resolve) => bot.navigate.walk(results.path, (stopReason) => {
        bot.chat("done. " + stopReason);
        resolve();
    }));
}

module.exports = {
    digAround,
    fly,
    goAround,
};
