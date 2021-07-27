function testExecutor(
    getTestCase,
    correctFn,
    testFn,
    isCorrect = (a, b) => a === b,
    {
        title = '',
        disable = false,
        limit = 1000,
        logCount = 100,
        logTestCase = false,
        logErrorTestCase = true
    } = {}
) {
    if (disable) {
        return;
    }

    if (title) console.log(title);

    let n = 1;
    let i = 0;
    let f = false;

    while (i < limit) {
        let testCase = getTestCase();

        let s = Date.now();
        let aResult = correctFn(testCase);
        let aTime = Date.now() - s;

        s = Date.now();
        let bResult = testFn(testCase);
        let bTime = Date.now() - s;

        if (!isCorrect(aResult, bResult)) {
            console.log(`Test - ${n} failed`);
            if (logErrorTestCase) {
                console.log("Case:");
                console.log("\t", JSON.stringify(testCase));
                console.log("\ncorrectFn:");
                console.log("\t", JSON.stringify(aResult));
                console.log("\ntestFn:");
                console.log("\t", JSON.stringify(bResult));
            }
            f = true;
            break;
        } else if (n % logCount === 0) {
            console.log(`Test - ${n} :::: correctTime: ${aTime}, testTime: ${bTime} : ${logTestCase ? JSON.stringify(testCase) : ""}`);
        }

        n++;
        i++;
    }

    if (f === false) console.log('All tests passed');
}

module.exports = {
    testExecutor
}