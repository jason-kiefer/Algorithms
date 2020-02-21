const {Builder, By, Key, until} = require('selenium-webdriver');
let chrome = require('selenium-webdriver/chrome');
let chromedriver = require('chromedriver');
let gecko = require('geckodriver');
let JSSoup = require('jssoup').default;

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

async function scrape() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to Url
        await driver.get('https://www.google.com');

        // Enter text "cheese" and perform keyboard action "Enter"
        await driver.findElement(By.name('q')).sendKeys('cake wikipedia', Key.ENTER);

        await driver.wait(until.elementLocated(By.css('h3')), 10000).click();

        driver.getPageSource()
        .then(page => {
            let html = new JSSoup(page).findAll('p');
            console.log(html[1].text);
        })
        /*
        .then(wiki => {
            let html = new JSSoup(wiki).findAll('p');
            console.log(html);
            /*wiki.forEach(async el => {
                const result = await el.getAttribute('textContent');
                console.log(result);
            });
        })*/
    }
    finally {
        driver.quit();
    }
};

class LinkedList {
    constructor() {
        this.head = null;
    }
}

class Definition {
    constructor(description = null) {
        this.description = description;
        this.next = null;
    }
}

class Word {
    constructor() {
        this.definitions = new LinkedList();
    }
}

class Trie {
    constructor() {
        this.root = {}
    }

    insertList(list) {
        list.forEach(el => {
            return this.insert(el);
        })
    }
    
    createWord(word, root = this.root) {
        if(!root)
            this.root = root;
        [...word].forEach(el => {
            if (!root[el])
                root[el] = new Word();
            root = root[el]
        })
        root = new Word();
    }

    insertDefinition(word, description, root = this.root) {
        [...word].forEach(el => {
            if (!root[el])
                return null;
            root = root[el]
        })
        
        let node = root.definitions.head;
        
        if (!node) {
            root.definitions.head = new Definition(description);
            return;
        }
        

        while(node.next) 
            node = node.next;
        node.next = new Definition(description);
    }

    traverse(value, root = this.root) {

        process.stdout.write('Searching for \'' + value + '\': \n');

        [...value].forEach(el => {
            root = root[el]
        })

        let head = root.definitions.head

        while(head) {
            head 
                ? process.stdout.write(head.description.toString() + '\n')
                : process.stdout.write('No definitions found\n');
            head = head.next;
        }
    }
}



function main() {

    scrape();

    let trie = new Trie();

    trie.createWord('hey');
    trie.createWord('Horse');

    trie.insertDefinition('hey', 'Greeting');
    trie.insertDefinition('hey', 'Slang');
    trie.insertDefinition('Horse', 'A fast land mammel');
    trie.insertDefinition('Horse', 'Used by knights in medieval times');
    trie.insertDefinition('Horse', 'Give live births');

    trie.traverse('hey');
    trie.traverse('Horse');

    //trie.search('Empty');
}

main();