function binarySearch(y, variant) {
    let bad = -1;
    let good = y;

    while (good - bad > 1) {
        let mid = parseInt((bad + good) / 2);
        if (variant(m)) good = mid;
        else bad = mid;
    }

    return good;
}

module.exports = binarySearch;