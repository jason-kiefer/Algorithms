/*
*   JavaScript Hash Example
*/

class HashTable {
    constructor() {
        this.table = new Array(12).fill({
            data: '',
            next: null
        })
    }

    hash(data) {
        return data;
    }

    generateKey(hash) {
        return parseInt(Math.random() * 9, 10);
    }

    insert(data) {

        let { table } = this;

        let hash = this.hash(data);
        let key = this.generateKey(hash);

        let entry = {
            data: JSON.stringify(data),
            next: null
        };
        
        let node = table[key];

        if (node.next == null) {
            table[key] = entry;
            return;
        }
        
        while(node.next) {
            node = node.next;
        }
        node.next = entry;
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
        
        let node = heap.table[i];

        while(node) {
            process.stdout.write(node.data);
            node = node.next;
        }
        
    }
}

main();