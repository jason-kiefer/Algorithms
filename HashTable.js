/*
*   JavaScript Hash Example
*   Work in progress
*/

let bcrypt = require('bcrypt')

class LinkedList {

}

class HashTable {
    constructor() {
        this.table = new Array(12).fill({
            data: '',
            next: null
        })
    }

    async hash(data) {
        return new Promise((resolve, reject) => {
             bcrypt.genSalt(10)
            .then(salt => {
                bcrypt.hash(data.toString(), salt)
                .then(hash => {
                    resolve(hash);
                })
                .catch(err => {
                    reject(err);
                })
            })
            .catch(err => {
                reject(err);
            })
        })
    }

    async generateKey(hash) {
        return new Promise((resolve, reject) => {
            //hash.split('$')[3].toString()
            resolve(this.stringToInt(hash.split('$')[3].toString(), 0, 1000));
        });
    }

    async stringToInt(str, min, max) {
        return new Promise((resolve, reject) => {

            let result = 0;

            for (let i = 0; i < str.length; i++)
                result = result + str.charCodeAt(i);
        
            resolve((result % (max - min)) + min);
        })
    }

    async insert(data) {

        let { table } = this;
  
        let entry = {
            data: JSON.stringify(data),
            next: null
        };

        this.hash(data)
        .then(hash => {
            this.generateKey(hash)
            .then(key => {
                let node = table[key];
    
                if (node == null) {
                    table[key] = entry;
                    return;
                }

                while(node.next) {
                    node = node.next;
                }

                node.next = entry;
            })
        })
    }
}

function main() {

    let heap = new HashTable();

    for ( i = 1 ; i <= 3 ; i ++ )
        heap.insert({ 
            placed: true, 
            position: i 
        })

    for ( let i = 0 ; i < heap.table.length ; i++ ) {
        
        let node = heap.table[i].head;

        while(node) {
            process.stdout.write(node.data.toString())
            node = node.next;
        }
    }
}

main();