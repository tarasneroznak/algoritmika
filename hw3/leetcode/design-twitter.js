function Heap() {
    let heap = [];
    let size = 0;

    const swap = (i, j) => [heap[i], heap[j]] = [heap[j], heap[i]];

    function insert(data) {
        size++;
        heap[size] = data;
        siftup(size);
    }

    function extract() {
        let element = heap[1];
        swap(1, size);
        heap.length = size;
        size--;
        siftdown(1);

        return element;
    }

    function siftup(index) {
        let i = index;
        let p = parseInt(i / 2);

        while (i > 1 && heap[p].t < heap[i].t) {
            swap(i, p);
            i = parseInt(i / 2);
            p = parseInt(i / 2);
        }
    }

    function siftdown(index) {
        let i = index;

        while (i * 2 <= size) {
            let min = i;
            let element = heap[i];

            let li = (i * 2);
            let ri = (i * 2) + 1;
            let l = heap[li];
            let r = heap[ri];

            if (l.t > element.t) min = li;
            if (r && r.t > element.t && l.t < r.t) min = ri;
            if (min === i) break;

            swap(min, i);
            i = min;
        }
    }

    return {
        length: () => size,
        extract,
        insert
    }
}

class Twitter {
    constructor() {
        this.FEED_LIMIT = 10;
        this.TIMESTAMP = 0;

        this.followers = {};
        this.tweets = Heap();
    }

    postTweet(userId, tweetId) {
        this.tweets.insert({ tweetId, userId, t: this.TIMESTAMP });
        this.TIMESTAMP++;
    }

    getNewsFeed(userId) {
        const follow = [userId, ...(this.followers[userId] || [])];
        const feed = [];
        const back = [];

        // extract max 10 tweets from heap
        while (this.tweets.length() > 0 && feed.length < this.FEED_LIMIT) {
            let tweet = this.tweets.extract();
            if (follow.includes(tweet.userId)) {
                feed.push(tweet.tweetId);
            }

            back.push(tweet)
        }

        // back to heap
        for (let i = 0; i < back.length; i++) {
            this.tweets.insert(back[i]);
        }

        return feed;
    }

    follow(followerId, followeeId) {
        this.followers[followerId] = [...(this.followers[followerId] || []), followeeId];
    }

    unfollow(followerId, followeeId) {
        this.followers[followerId] = (this.followers[followerId] || []).filter(id => id !== followeeId);
    }
}



/**
 * Your Twitter object will be instantiated and called as such:
 */

const t = new Twitter()
const methods = [
    ["postTweet", [1, 5]],
    ["postTweet", [1, 3]],
    ["getNewsFeed", [1]],
    // ["postTweet", [1, 5]],
    // ["getNewsFeed", [1]],
    // ["follow", [1, 2]],
    // ["postTweet", [2, 6]],
    // ["getNewsFeed", [1]],
    // ["unfollow", [1, 2]],
    // ["getNewsFeed", [1]],
]

// for (let i = 0; i < methods.length; i++) {
//     let r = t[methods[i][0]](...methods[i][1]) || 'empty';
//     console.log(`Call: ${methods[i][0]}(${methods[i][1]}) -> ${r}`);
// }

function merge(nums1, m, nums2, n) {
    let l = m + n;
    --m;
    --n;

    // start set from end
    
    while (l--) {
        if (n < 0 || nums1[m] > nums2[n])
            nums1[l] = nums1[m--];
        else
            nums1[l] = nums2[n--];
    }
};

// function merge(nums1, m, nums2, n) {
//     let tmp = [...nums1];
//     let len = Math.max(m, n);
//     let i = 0;
//     let l = 0;
//     let r = 0;

//     while (
//         (l < m && r < n) &&
//         (tmp[l] !== undefined && nums2[r] !== undefined)
//     ) {
//         if (tmp[l] <= nums2[r]) {
//             nums1[i++] = tmp[l++];
//         } else {
//             nums1[i++] = nums2[r++];
//         }
//     }

//     while (l < m) nums1[i++] = tmp[l++];
//     while (r < n) nums1[i++] = nums2[r++];
// };

// let n1 = [1, 2, 3, 0, 0, 0];
// let m = 3;
// let n2 = [2, 5, 6];
// let n = 3;

let n1 = [4, 5, 6, 0, 0, 0];
let m = 3;
let n2 = [1, 2, 3];
let n = 3;

// let n1 = [1];
// let m = 1;
// let n2 = [];
// let n = 0;

merge(n1, m, n2, n)

console.log(n1);