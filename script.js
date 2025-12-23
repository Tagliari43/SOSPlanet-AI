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
