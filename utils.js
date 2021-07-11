function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function getRandomImage(length) {
    return Array.from({ length }, () => {
        return Array.from({ length }, () => getRandomInt(0, 255))
    })
}

function getRandomNumberArray(length, min = 0, max = 1000) {
    return Array.from({ length }, () => getRandomInt(min, max))
}

function looper(callback) {
    let n = 2000000;
    while (n > 0) {
        callback(n);
        n--;
    }
}

function timer(log, callback) {
    let start = Date.now();
    callback()
    console.log(log, Date.now() - start);
}

module.exports = {
    getRandomInt,
    getRandomNumberArray,
    getRandomImage,
    timer,
    looper
}