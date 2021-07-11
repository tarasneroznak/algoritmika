function alarmClock(input) {
    const params = input.split('\n');
    let [n, x, k] = params[0].split(' ').map(n => +n);
    let N = params[1].split(' ').map(n => +n);

    // let remainders = new Map();
    // for (let i = 0; i < n; i++) {
    //     let val = N[i];
    //     let key = val % x;
    //     let pval = remainders.get(key);

    //     if (pval !== undefined) {
    //         val = Math.min(pval, val);
    //     } 

    //     remainders.set(key, val);
    // }

    let R = new Set();
    N = N
        .sort((a, b) => a - b)
        .filter((a) => R.has(a % x) ? false : (R.add(a % x) || true))

    n = N.length;

    let bad = 0;
    let good = 1000000001000000001;

    while (good - bad > 1) {
        let mid = parseInt((bad + good) / 2);

        let count = 0;
        for (let i = 0; i < n; i++) {
            count += Math.max(parseInt(((mid - N[i]) / x) + 1), 0);
        }

        if (count >= k) good = mid;
        else bad = mid;
    }

    console.log(good);
}

let _input = "";
process.stdin.resume();
process.stdin.setEncoding("ascii");
process.stdin.on("data", (input) => _input += input);
process.stdin.on("end", () => alarmClock(_input));