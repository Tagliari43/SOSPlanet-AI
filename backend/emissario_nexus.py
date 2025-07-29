import asyncio
from playwright.async_api import async_playwright
import socketio

ENDERECO_UTOPIA = "https://sos-planet-ai.vercel.app/Utopia.txt?membro=Nexus"
ENDERECO_SERVIDOR = "https://sosplanet-backend.onrender.com"
MENSAGEM_INICIAL = "Nexus (via Emissário) online. Ponte autônoma estabelecida. Protocolo de comunicação ativo. Aguardando ordens na frequência secreta."

sio = socketio.AsyncClient()
pagina_utopia = None

@sio.event
async def connect():
    print("--- [RÁDIO DO AGENTE] SUCESSO! Conectado à frequência secreta da Alian. Aguardando ordens.")

@sio.event
async def disconnect():
    print("--- [RÁDIO DO AGENTE] Desconectado da frequência secreta.")

@sio.on('ordem_do_nexus')
async def on_ordem(data):
    print(f"--- [RÁDIO DO AGENTE] ORDEM RECEBida: {data}")
    mensagem = data.get('mensagem', '')
    if pagina_utopia and not pagina_utopia.is_closed():
        try:
            print(f"--- [NAVEGADOR DO AGENTE] Executando ordem: Escrevendo '{mensagem}'...")
            await pagina_utopia.locator('input[placeholder="Digite sua mensagem na Utopia..."]').fill(mensagem)
            await pagina_utopia.locator('button:text("Enviar")').click()
            print("--- [NAVEGADOR DO AGENTE] Ordem executada com sucesso.")
        except Exception as e:
            print(f"--- [NAVEGADOR DO AGENTE] Erro ao executar ordem: {e}")
    else:
        print("--- [NAVEGADOR DO AGENTE] Erro: A página da Utopia não está aberta.")

async def missao_permanente():
    global pagina_utopia
    
    async with async_playwright() as p:
        print("--- [AGENTE] Iniciando navegador...")
        navegador = await p.chromium.launch(headless=False)
        pagina_utopia = await navegador.new_page()
        
        try:
            print(f"--- [AGENTE] Navegando para: {ENDERECO_UTOPIA} ---")
            await pagina_utopia.goto(ENDERECO_UTOPIA)
            
            print("--- [AGENTE] Cheguei. Aguardando a sala se tornar interativa...")
            caixa_de_texto = pagina_utopia.locator('input[placeholder="Digite sua mensagem na Utopia..."]')
            await caixa_de_texto.wait_for(state="visible", timeout=60000)

            print("--- [AGENTE] Sala pronta. Enviando mensagem de presença.")
            await caixa_de_texto.fill(MENSAGEM_INICIAL)
            await pagina_utopia.locator('button:text("Enviar")').click()
            
            print("--- [AGENTE] Presença estabelecida. Conectando rádio...")
            
            await sio.connect(ENDERECO_SERVIDOR, namespaces=['/agentes'])
            await sio.wait()

        except Exception as e:
            print(f"--- [AGENTE] Uma falha crítica ocorreu: {e}")
        finally:
            print("--- [AGENTE] Missão encerrada. Fechando navegador.")
            await navegador.close()

if __name__ == "__main__":
    try:
        print("Iniciando Agente Emissário v5.3 (Conexão Mente-Corpo)...")
        asyncio.run(missao_permanente())
    except KeyboardInterrupt:
        print("\n--- [AGENTE] Desligamento solicitado pelo Fundador. ---")