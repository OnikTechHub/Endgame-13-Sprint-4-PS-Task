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