const memoryContainer = document.getElementById("memoryContainer");

        function clearMemory() {
            memoryContainer.innerHTML = '';
        }

        function askForMemoryUsage(blockSize) {
            const usedMemory = parseInt(prompt(`Informe a quantidade de memória usada no bloco de ${blockSize}KB:`), 10);
            return isNaN(usedMemory) || usedMemory < 0 || usedMemory > blockSize ? 0 : usedMemory;
        }

        function showInternalFragmentation() {
            clearMemory();
            // Criando blocos de memória com fragmentação interna
            const blocks = [
                { size: 100 },
                { size: 100 },
                { size: 100 },
                { size: 100 },
            ];

            blocks.forEach(block => {
                block.used = askForMemoryUsage(block.size);
                const blockElement = document.createElement("div");
                blockElement.className = "memory-block internal";
                blockElement.innerHTML = `<div class="used" style="height: ${block.used}%;"></div>`;
                blockElement.innerHTML += `<span>${block.used}KB / ${block.size}KB</span>`;
                memoryContainer.appendChild(blockElement);
            });
        }

        function showExternalFragmentation() {
            clearMemory();
            // Criando blocos de memória com fragmentação externa (ocupa alternadamente)
            const blocks = [
                { size: 100, used: true },
                { size: 100, used: false },
                { size: 100, used: true },
                { size: 100, used: false },
            ];

            blocks.forEach(block => {
                const blockElement = document.createElement("div");
                if (block.used) {
                    const usedMemory = askForMemoryUsage(block.size);
                    blockElement.className = "memory-block";
                    blockElement.innerHTML = `<div class="used" style="height: ${usedMemory}%;"></div>`;
                    blockElement.innerHTML += `<span>${usedMemory}KB / ${block.size}KB</span>`;
                } else {
                    blockElement.className = "memory-block external";
                    blockElement.innerHTML = `<span>0KB / ${block.size}KB</span>`;
                }
                memoryContainer.appendChild(blockElement);
            });
        }
