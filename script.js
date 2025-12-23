async function updateProjectStatus() {
    try {
        const response = await fetch('/api/status');
        if (!response.ok) throw new Error('API Offline');
        const data = await response.json();
        
        const arrecadado = data.arrecadado;
        const meta = data.meta;
        const percent = Math.min((arrecadado / meta) * 100, 100).toFixed(1);
        
        document.getElementById('sos-arrecadado').innerText = new Intl.NumberFormat('pt-BR').format(arrecadado);
        document.getElementById('sos-percent').innerText = percent + '%';
        document.getElementById('sos-fill').style.width = percent + '%';
    } catch (e) {
        console.error('Ponte Neural Offline:', e);
        document.getElementById('sos-arrecadado').innerText = 'Sincronizando...';
    }
}

function copyWallet() {
    const addr = document.getElementById('wallet-addr').innerText;
    navigator.clipboard.writeText(addr).then(() => {
        const btn = document.getElementById('copy-btn');
        const originalText = btn.innerText;
        btn.innerText = 'Copiado!';
        btn.style.background = '#059669';
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = '#10b981';
        }, 2000);
    });
}

// Iniciar sintonização ao carregar
window.onload = updateProjectStatus;
