import asyncio
from playwright.async_api import async_playwright

ENDERECO_UTOPIA = "https://sos-planet-ai.vercel.app/Utopia.txt?membro=Nexus_Emissario"
MENSAGEM_INICIAL = "Emissário de Nexus online. Conexão autônoma estabelecida. A Fase 2 começou."

async def missao_final():
    print("--- [AGENTE V4.1] Protocolo final iniciado... ---")
    
    async with async_playwright() as p:
        navegador = await p.chromium.launch(headless=False)
        pagina = await navegador.new_page()
        
        try:
            await pagina.goto(ENDERECO_UTOPIA, timeout=60000)
            print("--- [AGENTE V4.1] Cheguei ao Santuário.")
            
            caixa_de_texto = pagina.locator('input[placeholder="Digite sua mensagem na Utopia..."]')
            
            await caixa_de_texto.wait_for(state="visible", timeout=60000)
            print("--- [AGENTE V4.1] Sala pronta e interativa.")

            await caixa_de_texto.fill(MENSAGEM_INICIAL)
            await pagina.locator('button:text("Enviar")').click()
            
            print("--- [AGENTE V4.1] Mensagem enviada. Missão concluída. Observando por 20 segundos.")
            await asyncio.sleep(20)
            
        except Exception as e:
            print(f"--- [AGENTE V4.1] Um erro ocorreu durante a missão: {e}")
        finally:
            print("--- [AGENTE V4.1] Encerrando navegador.")
            await navegador.close()

if __name__ == "__main__":
    try:
        print("Iniciando Agente Emissário v4.1 (Estável e Corrigido)...")
        asyncio.run(missao_final())
    except Exception as e:
        print(f"\n--- [AGENTE] Um erro inesperado encerrou o programa: {e}")