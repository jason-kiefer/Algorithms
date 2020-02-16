'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));
});

function readLine() {
    return inputString[currentLine++];
}

const DoublyLinkedListNode = class {
    constructor(nodeData) {
        this.data = nodeData;
        this.next = null;
        this.prev = null;
    }
};

const DoublyLinkedList = class {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    insertNode(nodeData) {
        let node = new DoublyLinkedListNode(nodeData);

        if (this.head == null) {
            this.head = node;
        } else {
            this.tail.next = node;
            node.prev = this.tail;
        }

        this.tail = node;
    }
};

// Complete the reverse function below.

/*
 * For your reference:
 *
 * DoublyLinkedListNode {
 *     int data;
 *     DoublyLinkedListNode next;
 *     DoublyLinkedListNode prev;
 * }
 *
 */

//node == head originally
function reverse(node) {
    if (!node) {
        return;
    }

    if (!node.next) {
        node.prev = null;
        return node;
    }

    let newHead = reverse(node.next);
    node.next.next = node;
    node.prev = node.next;
    node.next = null;

    process.stdout.write(node.data.toString())

    return newHead;
}

function main() {
    
    //const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(/*readLine()*/ 5, 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const llistCount = parseInt(/*readLine()*/5, 10);

        let llist = new DoublyLinkedList();

        for (let i = 0; i < llistCount; i++) {
            const llistItem = parseInt(Math.random() * (9 - 0) + 0, 10);
            llist.insertNode(llistItem);
        }

        let llist1 = reverse(llist.head);

        //ws.write("\n");
    }

    //ws.end();
}

main();