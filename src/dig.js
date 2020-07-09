const mineflayer = require("mineflayer");
const navigatePlugin = require("mineflayer-navigate")(mineflayer);

const RANGE_MIN = 10;
const RANGE_MAX = 50;

const AROUND_FLY = 20;


const bot = mineflayer.createBot({ 
    username: "pasque16", 
    host: "188.40.151.195", // optional
    port: 25565,            // optional
    version: "1.14.4",
    verbose: true, 
});

navigatePlugin(bot);


bot.navigate.blocksToAvoid[132] = true; // avoid tripwire
bot.navigate.blocksToAvoid[59] = false; // ok to trample crops
bot.navigate.on("pathFound", function (path) {
    bot.chat("found path. I can get there in " + path.length + " moves.");
});
bot.navigate.on("cannotFind", function (closestPath) {
    bot.chat("unable to find path. getting as close as possible");
    bot.navigate.walk(closestPath);
});
bot.navigate.on("arrived", function () {
    bot.chat("I have arrived");
});
bot.navigate.on("interrupted", function() {
    bot.chat("stopping");
});


function* around(limit = 3) {
    const aroundLimit = Math.floor(limit / 2);
    for (let indexX = aroundLimit * -1; indexX <= aroundLimit; indexX++) {
        for (let indexZ = aroundLimit* -1; indexZ <= aroundLimit; indexZ++) {
            yield [indexX, indexZ];
        }
    } 
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getSymbol(min, max) {
    return getRandomInt(5, 10) % 2 === 0 ? 1 : -1;
}

function wait(ms) {
    return new Promise((r) => setTimeout(() => r(), ms));
}

async function digAround(bot, deep, aroundLimit) {
    const deepArr = [1, 2, 0].concat(new Array(deep).fill(-1));
    bot.chat(`Start to dig. deep: ${deep}`);
    for (const y of deepArr) {
        const spawnPos = bot.entity.position.floored();
        console.log(`bot spawned at: ${spawnPos}`);
        for (const [x, z] of around(aroundLimit)) {
            await new Promise((resolve) => {
                const block = bot.blockAt(spawnPos.offset(
                    x, 
                    y, 
                    z,
                ));
                console.log("bot dig at:");
                console.log(block.position);

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
    bot.chat("My hole is amazing");
}

async function fly(bot, loops, h = 10) {
    let i = 0;
    const { position } = bot.entity;
    bot.chat(`Start to fly. loops: ${loops}`);
    await new Promise((r) => bot.creative.flyTo(
        position.offset(0, h, 0), 
        r,
    ));

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

function goAround(bot, { xSymbol, zSimbol }) {
    const initial = bot.entity.position.floored();

    const xPosition = getRandomInt(RANGE_MIN, RANGE_MAX) * (xSymbol || getSymbol());
    const zPosition = getRandomInt(RANGE_MIN, RANGE_MAX) * (zSimbol || getSymbol());

    console.log(xSymbol, zSimbol);
    console.log("x", xPosition, "z", zPosition);

    const to = initial.offset(
        xPosition,
        0,
        zPosition
    );

    console.log(to);

    bot.chat(`Start to goAround. goal: (${to.x}, ${to.y}, ${to.z})`);

    const results = bot.navigate.findPathSync(to, {timeout:20000});

    bot.chat("goAround status: " + results.status);
    return new Promise((resolve) => bot.navigate.walk(results.path, (stopReason) => {
        bot.chat("done. " + stopReason);
        resolve();
    }));
}


bot.on("spawn", async function() {
    await wait(10000);
  
    const initial = bot.entity.position;
    console.log(`bot spawned at: ${initial}`);
    const seedDir = getSymbol();
    console.log(seedDir);
    const optsWalkAround = {};
    if (seedDir > 0) {
        optsWalkAround.xSymbol = seedDir;
    } else {
        optsWalkAround.zSimbol = seedDir;
    }

    while (true) {
        await goAround(bot, optsWalkAround);
        await wait(1000);
    }

    // await goAround(bot);
    // await wait(1000);
    // await goAround(bot);
    // while (true) {
    //   const deep = getRandomInt(2, 20);
    //   await digAround(bot, deep, 5);
    //   const { position } = bot.entity;
    //   const upTo = 125 - position.y; 
    //   const loops = getRandomInt(20, 50);
    //   await fly(bot, loops, upTo);
    //   bot.creative.stopFlying();
    //   await wait(5000);
    // }
});


bot.on("error", err => console.log(err));
