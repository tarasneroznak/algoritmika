function mergeIntervals(data) {
    const storage = new Map();
    const n = data.length;
    const values = [...data];
    const intervals = parseInt(Math.sqrt(n));

    // split by intervals - index divide by count of intevals
    /*
        n = 5
        с = sqrt(n) = 2.23 => 2

        i / с = ...

        0/2=0    => 0
        1/2=0.5  => 0
        2/2=1    => 1
        ...
        -------------------------------
        n = 10
        с = sqrt(n) = 3.16 => 3

        i / с = ...

        0/3=0    => 0
        1/3=0.3  => 0
        2/3=0.6  => 0
        3/3=1    => 1
        4/3=1.33 => 1
        ...
    */
    
    for (let i = 0; i < n; i++) {
        const interval = parseInt(i / intervals);
        storage.set(interval, (storage.get(interval) || 0) + values[i]);
    }

    return {
        /*
        оновдення по індексу
        просто отримуємо інтервал - i / с і оновлюємо значення,стор і масив
        */
        update: (id, operation) => {
            let index = id - 1;
            let interval = parseInt((index) / intervals);
            let value = storage.get(interval) || 0;

            if (operation === '+') {
                value += 1;
                values[index] += 1;
            } else {
                value -= 1;
                values[index] -= 1;
            }

            storage.set(interval, value);
        },
        /* сумування по інтервалу */
        get: (fromId, toId) => {
            let from = fromId - 1;
            let to = toId - 1;
            let sum = 0;

            /* ітеруємося з початку до кінця інтевалу */
            while (from <= to) {
                let isStartInterval = from % intervals === 0; // якщо остаток від ділення 0 то це початок інтервалу
                let isOneInterval = from + intervals <= to; // перевірка щоб інтервал вмістився в запрошений

                if (isStartInterval && isOneInterval) {
                    // коли запрошено повний інтервал просто беремо його зі стору
                    let interval = parseInt(from / intervals);
                    let value = storage.get(interval) || 0;

                    sum += value;
                    from += intervals;
                } else {
                    // сумуємо частичну інтервалу, по індексу з масиву
                    sum += values[from];
                    from += 1;
                }
            }

            return sum;
        }
    }
}