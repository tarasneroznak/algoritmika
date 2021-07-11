// let loanPercent = 12 / 100;
// let percent = 1 / 12

// const d = 9.562054624583681 * (1 / 12);

// console.log('2000', 2000 * (d / 100));
// console.log('1505.94', 1505.94 * (d / 100));

// console.log({ d });

// const a = [15.94, 12.00, 8.03, 4.03].reduce((acc, i) => acc + i) / 4
// console.log(a);

function processData(input) {
    const [price, monthlyPayment, loanTerm] = input.split(' ').map(n => +n);

    let result = 0;

    function getFinalBallance(x) {
        result = x;
        let ballance = price;
        const mounhtX = x * (1 / 12);

        for (let i = 0; i < loanTerm; i++) {
            let p = (ballance * (mounhtX / 100));
            let b = (ballance - monthlyPayment);
            ballance = b + p;
        }

        return ballance <= 0;
    }

    let bad = 0;
    let good = 100;

    while (good - bad > 0.0000001) {
        let m = (bad + good) / 2;
        if (getFinalBallance(m)) bad = m;
        else good = m;
    }

    console.log(result);
}

processData('2000.00 510.00 4');
// 0.000001
// 9,562054624583681
// 9.562054555863142
