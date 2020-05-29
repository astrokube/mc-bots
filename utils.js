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

function getSymbol() {
    return getRandomInt(5, 11) % 2 === 0 ? 1 : -1;
}

function wait(ms) {
    return new Promise((r) => setTimeout(() => r(), ms));
}

module.exports = {
    around,
    getRandomInt,
    getSymbol,
    wait
};