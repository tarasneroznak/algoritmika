function insertionSort(arr) {
    let len = arr.length;

    for (let i = 1; i < len; i++) {
        let value = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > value) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }

        arr[j + 1] = value;
    }
}