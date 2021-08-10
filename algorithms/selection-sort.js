function selectionSort(arr) {
    let len = arr.length;

    for (let i = 0; i < len - 1; i++) {
        let min_idx = i;

        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }

        [arr[min_idx], arr[i]] = [arr[i], arr[min_idx]];
    }
}