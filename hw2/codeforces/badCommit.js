function flush() {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
}

function programm() {
    let bad = -1;
    let good = 0;
    let number = 0;

    function testResult(input) {
        flush();
        const value = +input;

        if (value > 1) good = value;
        if (value <= 1) {
            if (value === 0) good = number;
            else bad = number;
        }
        
        if (good - bad <= 1) {
            process.stdin.write(`! ${good}`);
            process.exit(0);
        }
        
        number = parseInt(((bad + good) / 2));

        process.stdin.write(`${number}\n`);
        flush();
    }

    return {
        testResult
    }
}

const p = programm();

process.stdin.resume();
process.stdin.setEncoding("ascii");
process.stdin.on("data", (input) => p.testResult(input));