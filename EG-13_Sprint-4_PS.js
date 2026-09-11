// 01. Isomorphic Strings

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function(s, t) {
    if (s.length !== t.length) return false;
    
    const mapS = {};
    const mapT = {};
    
    for (let i = 0; i < s.length; i++) {
        let charS = s[i];
        let charT = t[i];
        
        if ((mapS[charS] && mapS[charS] !== charT) || (mapT[charT] && mapT[charT] !== charS)) {
            return false;
        }
        
        mapS[charS] = charT;
        mapT[charT] = charS;
    }
    
    return true;
};


console.log(isIsomorphic("egg", "add")); 



// 02. Word Pattern

/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
var wordPattern = function(pattern, s) {
    const words = s.split(' ');
    if (pattern.length !== words.length) return false;
    
    const charToWord = new Map();
    const wordToChar = new Map();
    
    for (let i = 0; i < pattern.length; i++) {
        let char = pattern[i];
        let word = words[i];
        
        if (charToWord.has(char) && charToWord.get(char) !== word) {
            return false;
        }
        if (wordToChar.has(word) && wordToChar.get(word) !== char) {
            return false;
        }
        
        charToWord.set(char, word);
        wordToChar.set(word, char);
    }
    
    return true;
};

console.log(wordPattern("abba", "dog cat cat dog")); 




// 03. Find the Difference

/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
var findTheDifference = function(s, t) {
    let charCodeSum = 0;
    for (let i = 0; i < t.length; i++) {
        charCodeSum += t.charCodeAt(i);
    }
    
    for (let i = 0; i < s.length; i++) {
        charCodeSum -= s.charCodeAt(i);
    }
    
    return String.fromCharCode(charCodeSum);
};


console.log(findTheDifference("abcd", "abcde")); 





// 04. Reverse Linked List

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let prev = null;
    let current = head;
    
    while (current !== null) {
        let nextTemp = current.next;
        current.next = prev;
        prev = current;
        current = nextTemp;
    }
    
    return prev;
};

function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val);
    this.next = (next===undefined ? null : next);
}

function createLinkedList(arr) {
    let head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

function linkedListToArray(head) {
    let result = [];
    let current = head;
    while (current !== null) {
        result.push(current.val);
        current = current.next;
    }
    return result;
}

let testList = createLinkedList([1, 2, 3, 4, 5]);
let reversedHead = reverseList(testList);
console.log(linkedListToArray(reversedHead)); 





// 05. Middle of the Linked List

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function(head) {
    let slow = head;
    let fast = head;
    
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    return slow;
};

let testListForMiddle = createLinkedList([1, 2, 3, 4, 5]);
let middleHead = middleNode(testListForMiddle);
console.log(linkedListToArray(middleHead)); 



// 06. Product of Array Except Self

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    const n = nums.length;
    const res = new Array(n);
    res[0] = 1;
    for (let i = 1; i < n; i++) {
        res[i] = res[i - 1] * nums[i - 1];
    }
    
    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        res[i] *= rightProduct;
        rightProduct *= nums[i];
    }
    
    return res;
};


console.log(productExceptSelf([1, 2, 3, 4])); 



// 07. Remove Nth Node From End of List

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    let dummy = new ListNode(0, head);
    let slow = dummy;
    let fast = dummy;
    
    
    for (let i = 0; i <= n; i++) {
        fast = fast.next;
    }
    
    
    while (fast !== null) {
        slow = slow.next;
        fast = fast.next;
    }
    
    
    slow.next = slow.next.next;
    
    return dummy.next;
};


let testListForRemove = createLinkedList([1, 2, 3, 4, 5]);
let modifiedHead = removeNthFromEnd(testListForRemove, 2);
console.log(linkedListToArray(modifiedHead)); 




// 08. Find First and Last Position of Element in Sorted Array

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    const findBound = (nums, target, isFirst) => {
        let left = 0, right = nums.length - 1;
        let bound = -1;
        
        while (left <= right) {
            let mid = Math.floor((left + right) / 2);
            if (nums[mid] === target) {
                bound = mid;
                if (isFirst) {
                    right = mid - 1; 
                } else {
                    left = mid + 1;
                }
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return bound;
    };
    
    let first = findBound(nums, target, true);
    let last = findBound(nums, target, false);
    
    return [first, last];
};

console.log(searchRange([5, 7, 7, 8, 8, 10], 8)); 




// 09. Permutation in String

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {
    if (s1.length > s2.length) return false;
    
    const sortStr = (str) => str.split('').sort().join('');
    const sortedS1 = sortStr(s1);
    const len = s1.length;
    
    for (let i = 0; i <= s2.length - len; i++) {
        let subStr = s2.substring(i, i + len);
        
        if (sortStr(subStr) === sortedS1) {
            return true;
        }
    }
    
    return false;
};

console.log(checkInclusion("ab", "eidbaooo")); 