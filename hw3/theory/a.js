const shift = 10000;
const length = 6;

const a = Array.from({ length }, (_, i) => Date.now() + parseInt((Math.random() * shift)));

// [a[1], a[3]] = [a[3], a[1]];
// [a[4], a[5]] = [a[5], a[4]];
// [a[7], a[6]] = [a[6], a[7]];

// resole_conflicts(a);
// resole_conflicts([42, 1, 32, 22, 23, 25])
// resole_conflicts([50, 9, 8, 1, 2, 3, 5, 7, 6])

let v = [50, 9, 8, 1, 2, 3, 5, 7, 6]
quickSort_tp(v)
console.log(v);

function resole_conflicts(a) {
   let len = a.length;
   let index = len// a.length - 1;
   let max = Math.max(...a);

   let result = new Array(len);

   for (let i = 0; i < len; i++) {
      let item = a[i];

      let x = parseInt((index * item) / max);
      console.log({
         item,
         i,
         x,
         i1: (index * item) / max,
         i2: (index * item) % max,
      });
      result[x] = item;
   }

   // console.log(' ');
   // console.log(a.toString());
   console.log(result.toString());
   console.log(a.sort((a, b) => a - b).toString());
}

// testExecutor(
//    () => getRandomNumberArray(getRandomInt(1, 10), -100, 100).sort((a, b) => a - b),
//    (nums) => _sortedSquares([...nums]),
//    (nums) => sortedSquaresTwoPointers([...nums]),
//    (a, b) => JSON.stringify(a) === JSON.stringify(b),
//    { disable: false }
// )

function quickSort_tp(A) {
   function partition(left, right) {
      let pivot = A[parseInt((right + left) / 2)];
      let l = left;
      let r = right;

      while (l <= r) {
         while (A[l] < pivot) l++;
         while (A[r] > pivot) r--;

         if (l <= r) {
            console.log([A[l], A[r]]);
            [A[l], A[r]] = [A[r], A[l]];
            l++;
            r--;
         }
      }

      return l;
   }

   function qs(left, right) {
      while (right > left) {
         let p = partition(left, right);
         qs(p, right);
         right = p - 1;
      }
   }

   return qs(0, A.length - 1);
}