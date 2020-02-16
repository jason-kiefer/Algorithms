
class Node {
    constructor(data) {
        this.left = null;
        this.right = null;
        this.data = data;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(node, root = this.root) {
        if (!root)
            this.root = node;
        else
            if (root.data > node.data)
                if (!root.left)
                    root.left = node
                else
                    this.insert(node, root.right)
            else
                if (!root.right)
                    root.right = node
                else
                    this.insert(node, root.left)    
    }

    pre_traverse(root) {
        if (!root)
            return;

        process.stdout.write(root.data.toString() + ' ');
        this.pre_traverse(root.left);
        this.pre_traverse(root.right);
    }

    ordered_traverse(root) {
        if (!root)
            return;
        
        this.ordered_traverse(root.left);
        process.stdout.write(root.data.toString() + ' ');
        this.ordered_traverse(root.right);
    }

    reverse_traverse(root) {
        if (!root)
            return;
        
        this.reverse_traverse(root.right);
        process.stdout.write(root.data.toString() + ' ');
        this.reverse_traverse(root.left);
    }
}

let BST = new BinarySearchTree();

for (let i = 0 ; i < 5 ; i ++ ){
    BST.insert(new Node(parseInt(Math.random() * (10000 - 1) + 1, 10)));
}

BST.pre_traverse(BST.root);
process.stdout.write('\n');
BST.ordered_traverse(BST.root);
process.stdout.write('\n');
BST.reverse_traverse(BST.root);
