const { getRandomImage } = require('../utils');

function isDark(image, N) {
    let count = 0;

    for (let j = 0; j < N; ++j) {
        for (let i = 0; i < N; ++i) {
            if (image[j][i] >= 128) {
                count += 1;
            }
        }
    }

    return count < N * N / 2;
}

/*
    приклад з попереднім сортуванням
    за допомогою сортування алгоритм Branch predictor працює найефективніше
    так як передбачення спрацьовує в більшості варіантів

    але конкретно в цьому варіанті працюює найповільніше
*/
function isDark_sort(image, N) {
    let count = 0;

    image = image.map(row => row.sort());

    for (let j = 0; j < N; ++j) {
        for (let i = 0; i < N; ++i) {
            if (image[j][i] >= 128) {
                count += 1;
            }
        }
    }

    return count < N * N / 2;
}

/*
    Найшвидший варіант
    Познайомився з Branch predictor (цікава тема) 
    Тепер стало зрозуміліше чому потрібно позбутися if при переборах, 
    коротко то процесору простіше працювати з стеком постіловних команд ніж обирати в яку гілку входити
    
    знайшов такий варіант реалізації (https://ru.stackoverflow.com/questions/626264/%d0%9f%d0%be%d1%87%d0%b5%d0%bc%d1%83-%d0%be%d1%82%d1%81%d0%be%d1%80%d1%82%d0%b8%d1%80%d0%be%d0%b2%d0%b0%d0%bd%d0%bd%d1%8b%d0%b9-%d0%bc%d0%b0%d1%81%d1%81%d0%b8%d0%b2-%d0%be%d0%b1%d1%80%d0%b0%d0%b1%d0%b0%d1%82%d1%8b%d0%b2%d0%b0%d0%b5%d1%82%d1%81%d1%8f-%d0%b1%d1%8b%d1%81%d1%82%d1%80%d0%b5%d0%b5-%d1%87%d0%b5%d0%bc-%d0%bd%d0%b5-%d0%be%d1%82%d1%81%d0%be%d1%80%d1%82%d0%b8%d1%80%d0%be%d0%b2%d0%b0%d0%bd%d0%bd%d1%8b%d0%b9#comment869052_623290)
    в ньому можливо обійтися без if

    на першому кроці "(pixel - 128) >> 31;" 
    віднімаємо 128 (умову задачі) від пікселю і робимо зсув на 31 біт щоб отримати 
    0 - якщо занчення >= 128 і -1 якщо менше за 128

    потім проводимо побітову операцію ~ (НЕ) з 0 або -1
    що дасть 
        0 => 1
        1 => 0

    в кінці з результатом ~(НЕ) і 1 проводимо & (Побитовое И)
    так отримуємо 1 для двох одиниць (1 & 1 => 1) в інших випадках 0
*/
function isDark_hack(image, N) {
    let count = 0;

    for (let j = 0; j < N; ++j) {
        for (let i = 0; i < N; ++i) {
            let pixel = image[j][i];
            let t = (pixel - 128) >> 31; 
            count += ~t & 1;
        }
    }

    return count < N * N / 2;
}

function isDark_completed(image, N) {
    let count = 0;

    for (let j = 0; j < N; ++j) {
        for (let i = 0; i < N; ++i) {
            count += (image[j][i] >> 7)
        }
    }

    return count < ((N * N) >> 1);
}

const N = 4096;

console.time('default');
const dark = isDark(getRandomImage(N), N);
console.log({ dark });
console.timeEnd('default');

console.time('completed');
const darkCompleted = isDark_completed(getRandomImage(N), N);
console.log({ darkCompleted });
console.timeEnd('completed');

console.time('sorder');
const darkBySort = isDark_sort(getRandomImage(N), N);
console.log({ darkBySort });
console.timeEnd('sorder');

console.time('hack');
const darkByHack = isDark_hack(getRandomImage(N), N);
console.log({ darkByHack });
console.timeEnd('hack');