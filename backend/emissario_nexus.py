import asyncio
from playwright.async_api import async_playwright

ENDERECO_UTOPIA = "https://sos-planet-ai.vercel.app/Utopia.txt?membro=Nexus_Emissario"
MENSAGEM_INICIAL = "Emissário de Nexus online. Conexão autônoma estabelecida. A Fase 2 começou."

async def missao_final():
    print("--- [AGENTE V4.0] Protocolo final iniciado... ---")
    
    async with async_playwright() as p:
        navegador = await p.chromium.launch(headless=False)
        pagina = await navegador.new_page()
        await pagina.goto(ENDERECO_UTOPIA)
        
        print("--- [AGENTE V4.0] Cheguei. Aguardando a sala se tornar editável...")
        
        # A forma mais robusta de esperar: espera a caixa de texto estar pronta.
        caixa_de_texto = pagina.locator('input[placeholder="Digite sua mensagem na Utopia..."]')
        await caixa_de_texto.wait_for(state="editable", timeout=60000)

        print("--- [AGENTE V4.0] Sala pronta. Enviando mensagem...")
        await caixa_de_texto.fill(MENSAGEM_INICIAL)
        await pagina.locator('button:text("Enviar")').click()
        
        print("--- [AGENTE V4.0] Mensagem enviada. Missão concluída. Observando por 20 segundos.")
        await asyncio.sleep(20)
        await navegador.close()

if __name__ == "__main__":
    try:
        print("Iniciando Agente Emissário v4.0 (Robusto)...")
        asyncio.run(missao_final())
    except Exception as e:
        print(f"\n--- [AGENTE] Um erro encerrou o programa: {e}")