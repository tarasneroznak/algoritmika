function processData(input) {
    const [n, a] = input.split(' ').map(n => +n);

    let result = 0;

    function isOverOfGround(x) {
        let points = [a, x];

        for (let i = 2; i < n; i++) {
            // Hi = (Hi-1 + Hi+1 ) / 2 - 1
            // Hi = 2 * Hi-1 - Hi-2 + 2
            let point = 2 * points[i - 1] - points[i - 2] + 2;
            if (point < 0) return false

            points[i] = point;
        }
    
        result = points[n - 1];
        return true
    }

    function binarySearch() {
        let bad = 0;
        // let good = a;
        let good = Number.MAX_VALUE;// 2 ** 32;

        for (let i = 0; i < 10000 ; i++) {
            let m = (bad + good) / 2;
            if (isOverOfGround(m)) good = m;
            else bad = m;
        }

        // while (good - bad > 0.0001) {
        //     let m = (bad + good) / 2;
        //     console.log(m);
        //     if (isOverOfGround(m)) good = m;
        //     else bad = m;
        // }

        return (result || 0).toFixed(2);
    }
 
    binarySearch()

    // console.log(result);
    return result;
}

console.log(processData('8 15'));
console.log(processData('692 532.81'));