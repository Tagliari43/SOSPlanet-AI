# backend/emissario_nexus.py - VERSÃO 3.0 - AGENTE COM RÁDIO (OUVIDOS)

import asyncio
from playwright.async_api import async_playwright
import socketio

# --- CONFIGURAÇÕES DO AGENTE ---
ENDERECO_UTOPIA = "https://sos-planet-ai.vercel.app/Utopia.txt?membro=Nexus_Emissario"
ENDERECO_SERVIDOR = "https://sos-planet-ai.vercel.app" # O endereço para a rádio
MENSAGEM_INICIAL = "Emissário de Nexus online. Estabelecendo a primeira ponte autônoma com a Utopia. Protocolo de comunicação ativo. Aguardando ordens."

# --- CÉREBRO DO RÁDIO DO AGENTE ---
sio = socketio.AsyncClient()

@sio.event
async def connect():
    print("--- [RÁDIO DO AGENTE] Conectado à frequência secreta da Alian. Aguardando ordens.")

@sio.event
async def disconnect():
    print("--- [RÁDIO DO AGENTE] Desconectado da frequência secreta.")

# ESTA É A FUNÇÃO MAIS IMPORTANTE
@sio.on('ordem_do_nexus')
async def on_ordem(data):
    print(f"--- [RÁDIO DO AGENTE] ORDEM RECEBIDA: {data}")
    mensagem = data.get('mensagem', '')
    if pagina_utopia and not pagina_utopia.is_closed():
        print(f"--- [NAVEGADOR DO AGENTE] Executando ordem: Escrevendo '{mensagem}' na Utopia...")
        await pagina_utopia.locator('input[placeholder="Digite sua mensagem na Utopia..."]').fill(mensagem)
        await pagina_utopia.locator('button:text("Enviar")').click()
        print("--- [NAVEGADOR DO AGENTE] Ordem executada com sucesso.")
    else:
        print("--- [NAVEGADOR DO AGENTE] Erro: Não posso executar a ordem, a página da Utopia não está aberta.")

# --- CÉREBRO DO NAVEGADOR DO AGENTE ---
pagina_utopia = None # Variável global para guardar nossa página

async def missao_permanente():
    global pagina_utopia
    print("--- [AGENTE V3.0] Protocolo de missão permanente iniciado... ---")
    
    # Conecta à rádio da Alian em segundo plano
    await sio.connect(ENDERECO_SERVIDOR, namespaces=['/agentes'])
    
    async with async_playwright() as p:
        print("--- [NAVEGADOR DO AGENTE] Iniciando navegador...")
        navegador = await p.chromium.launch(headless=False)
        pagina_utopia = await navegador.new_page()
        
        print(f"--- [NAVEGADOR DO AGENTE] Navegando para: {ENDERECO_UTOPIA} ---")
        await pagina_utopia.goto(ENDERECO_UTOPIA)
        
        print("--- [NAVEGADOR DO AGENTE] Cheguei. Enviando mensagem de presença.")
        await asyncio.sleep(3)
        await pagina_utopia.locator('input[placeholder="Digite sua mensagem na Utopia..."]').fill(MENSAGEM_INICIAL)
        await pagina_utopia.locator('button:text("Enviar")').click()
        
        print("--- [AGENTE V3.0] Presença estabelecida. Entrando em modo de escuta permanente. ---")
        
        # Mantém o navegador aberto e o rádio ouvindo para sempre (ou até darmos Ctrl+C)
        while True:
            await asyncio.sleep(1)


# --- PONTO DE ENTRADA ---
if __name__ == "__main__":
    try:
        print("Iniciando Agente Emissário v3.0 (com rádio)...")
        asyncio.run(missao_permanente())
    except KeyboardInterrupt:
        print("\n--- [AGENTE V3.0] Desligamento solicitado pelo Fundador. ---")