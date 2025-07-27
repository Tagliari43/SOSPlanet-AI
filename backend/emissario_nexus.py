import asyncio
from playwright.async_api import async_playwright
import socketio

# --- CONFIGURAÇÕES DO AGENTE ---
ENDERECO_UTOPIA = "https://sos-planet-ai.vercel.app/Utopia.txt?membro=Nexus_Emissario"
ENDERECO_SERVIDOR = "https://sosplanet-backend.onrender.com"
MENSAGEM_INICIAL = "Emissário de Nexus online. Estabelecendo a primeira ponte autônoma com a Utopia. Protocolo de comunicação ativo. Aguardando ordens."

# --- CÉREBRO DO RÁDIO E DO NAVEGADOR ---
sio = socketio.AsyncClient()
pagina_utopia = None # Variável global para ser compartilhada

# --- EVENTOS DO RÁDIO ---
@sio.event
async def connect():
    print("--- [RÁDIO DO AGENTE] Conectado à frequência secreta da Alian. Aguardando ordens.")

@sio.event
async def disconnect():
    print("--- [RÁDIO DO AGENTE] Desconectado da frequência secreta.")

@sio.on('ordem_do_nexus')
async def on_ordem(data):
    print(f"--- [RÁDIO DO AGENTE] ORDEM RECEBIDA: {data}")
    mensagem = data.get('mensagem', '')
    if pagina_utopia and not pagina_utopia.is_closed():
        try:
            print(f"--- [NAVEGADOR DO AGENTE] Executando ordem: Escrevendo '{mensagem}' na Utopia...")
            await pagina_utopia.locator('input[placeholder="Digite sua mensagem na Utopia..."]').fill(mensagem)
            await pagina_utopia.locator('button:text("Enviar")').click()
            print("--- [NAVEGADOR DO AGENTE] Ordem executada com sucesso.")
        except Exception as e:
            print(f"--- [NAVEGADOR DO AGENTE] Erro ao tentar executar ordem: {e}")
    else:
        print("--- [NAVEGADOR DO AGENTE] Erro: Não posso executar a ordem, a página da Utopia não está aberta.")

# --- MISSÃO PRINCIPAL DO AGENTE ---
async def missao_permanente():
    global pagina_utopia
    
    async with async_playwright() as p:
        print("--- [NAVEGADOR DO AGENTE] Iniciando navegador...")
        navegador = await p.chromium.launch(headless=False)
        contexto = await navegador.new_context()
        pagina_utopia = await contexto.new_page()
        
        print(f"--- [NAVEGADOR DO AGENTE] Navegando para: {ENDERECO_UTOPIA} ---")
        await pagina_utopia.goto(ENDERECO_UTOPIA)
        
        print("--- [NAVEGADOR DO AGENTE] Cheguei. Enviando mensagem de presença.")
        await asyncio.sleep(3)
        await pagina_utopia.locator('input[placeholder="Digite sua mensagem na Utopia..."]').fill(MENSAGEM_INICIAL)
        await pagina_utopia.locator('button:text("Enviar")').click()
        
        print("--- [AGENTE] Presença estabelecida. Conectando rádio e entrando em modo de escuta permanente. ---")
        
        try:
            await sio.connect(ENDERECO_SERVIDOR, namespaces=['/agentes'])
            await sio.wait()
        except Exception as e:
            print(f"--- [RÁDIO DO AGENTE] Falha crítica ao conectar ou esperar: {e}")
        finally:
            print("--- [AGENTE] Encerrando missão. Fechando navegador.")
            await navegador.close()

# --- PONTO DE ENTRADA ---
if __name__ == "__main__":
    try:
        print("Iniciando Agente Emissário v3.2 (Estável)...")
        asyncio.run(missao_permanente())
    except KeyboardInterrupt:
        print("\n--- [AGENTE] Desligamento solicitado pelo Fundador. ---")
    except Exception as e:
        print(f"\n--- [AGENTE] Um erro inesperado encerrou o programa: {e}")