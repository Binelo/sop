const mainMemory = [];
const secondaryMemory = [];
const processQueue = [];
const maxMainMemory = 3;
let processCounter = 1;

function displayMemory() {
    const mainMemoryDiv = document.getElementById('main-memory');
    const secondaryMemoryDiv = document.getElementById('secondary-memory');
    const queueDiv = document.getElementById('process-queue');
    
    mainMemoryDiv.innerHTML = '';
    secondaryMemoryDiv.innerHTML = '';
    queueDiv.innerHTML = '';
    
    mainMemory.forEach((process, index) => {
        const div = document.createElement('div');
        div.className = 'block';
        div.textContent = `P${process}`;
        div.onclick = () => removeFromMainMemory(index);
        mainMemoryDiv.appendChild(div);
    });
    
    secondaryMemory.forEach(process => {
        const div = document.createElement('div');
        div.className = 'block';
        div.textContent = `P${process}`;
        secondaryMemoryDiv.appendChild(div);
    });
    
    processQueue.forEach(process => {
        const div = document.createElement('div');
        div.className = 'block';
        div.textContent = `P${process}`;
        queueDiv.appendChild(div);
    });
}

function removeFromMainMemory(index) {
    mainMemory.splice(index, 1);

    if (secondaryMemory.length > 0) {
        const swappedIn = secondaryMemory.shift();
        mainMemory.push(swappedIn);
    } 
    else if (processQueue.length > 0) {
        const nextProcess = processQueue.shift();
        mainMemory.push(nextProcess);
    }
    
    displayMemory();
}

function addToQueue() {
    processQueue.push(processCounter++);
    displayMemory();
}

function processQueueF() {
    while (processQueue.length > 0) {
        const process = processQueue.shift();
        
        if (mainMemory.length >= maxMainMemory) {
            const swappedOut = mainMemory.shift();
            secondaryMemory.push(swappedOut);
        }
        
        mainMemory.push(process);
    }
    
    displayMemory();
}
