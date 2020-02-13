const termBox = document.getElementById('console');

const commands = [
    {
        command: 'make tea',
        results: [
            'Boiling water...',
            'Adding Ginger...',
            'Adding tea powder...',
            'Adding a pinch of sugar...',
            'Boiling...',
            '...',
            '...',
            'Adding Milk...',
            'Boiling...',
            '...',
            '...',
            'Done!'
        ]
    },
    {
        command: './exeami',
        results: [
            '...',
            '...',
            '...',
            '...'
        ]
    }

]
const cursor = document.createElement('div');
cursor.setAttribute('class', 'cursor');
async function executeCode() {
    for ( let i = 0; i < commands.length; i++) {
        const item = commands[i];
        const code = document.createElement('span');
        code.setAttribute('class', 'code')
        code.innerHTML = '$ ' + item.command;
        termBox.append(code);
        termBox.append(cursor);
        termBox.append(document.createElement('br'));
        await sleep(1000);

        for (result of item.results) {
            const res = document.createElement('span');
            res.setAttribute('class', 'code')
            res.innerHTML = result + "<br>";
            termBox.append(res);
            termBox.append(cursor);
            await sleep(1000);
        }
        const pathClone = document.getElementById('userpath').cloneNode(true);
        pathClone.innerHTML =  "<br>" + pathClone.innerHTML;
        if(i  < commands.length-1){
            termBox.append(pathClone);
            termBox.append(cursor);
        }
        
        await sleep(2000);
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

executeCode();