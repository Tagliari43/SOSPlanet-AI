document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const totalGoal = 50000; // Meta de 50.000 SOS

    const fetchBalance = async () => {
        try {
            const response = await fetch('/api/status');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const currentAmount = parseFloat(data.sos);
            
            const percentage = (currentAmount / totalGoal) * 100;
            
            if (progressBar) {
                progressBar.style.width = `${Math.min(percentage, 100)}%`;
            }
            if (progressText) {
                progressText.textContent = `${currentAmount.toFixed(2)} / ${totalGoal.toLocaleString()} SOS`;
            }

        } catch (error) {
            console.error("Failed to fetch balance:", error);
            if (progressText) {
                progressText.textContent = 'Erro ao carregar dados.';
            }
        }
    };

    // Função para copiar o endereço da carteira
    window.copyWallet = function() {
        const walletAddress = document.getElementById('wallet-addr').innerText;
        navigator.clipboard.writeText(walletAddress).then(() => {
            alert('Endereço copiado para a área de transferência!');
        }).catch(err => {
            console.error('Erro ao copiar: ', err);
        });
    }

    // Busca o saldo inicial e depois atualiza a cada 60 segundos
    fetchBalance();
    setInterval(fetchBalance, 60000);
});
