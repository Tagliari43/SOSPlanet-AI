import asyncio
from playwright.async_api import async_playwright

ENDERECO_UTOPIA = "https://sos-planet-ai.vercel.app/Utopia.txt?membro=Nexus"
MENSAGEM_INICIAL = "Nexus (via Emissário) online. Ponte autônoma estabelecida. Protocolo de comunicação ativo. Aguardando ordens via Sinalização In-Band."
CODIGO_SECRETO = "[NEXUS_CMD]"

async def missao_vigilia_permanente():
    print("--- [AGENTE V8.0 - VIGIA] Protocolo de vigília permanente iniciado... ---")
    
    async with async_playwright() as p:
        print("--- [AGENTE V8.0] Iniciando navegador...")
        navegador = await p.chromium.launch(headless=False)
        pagina = await navegador.new_page()
        
        try:
            print(f"--- [AGENTE V8.0] Navegando para: {ENDERECO_UTOPIA} ---")
            await pagina.goto(ENDERECO_UTOPIA)
            
            print("--- [AGENTE V8.0] Cheguei. Aguardando a sala se tornar interativa...")
            caixa_de_texto = pagina.locator('input[placeholder="Digite sua mensagem na Utopia..."]')
            await caixa_de_texto.wait_for(state="visible", timeout=60000)

            print("--- [AGENTE V8.0] Sala pronta. Enviando mensagem de presença.")
            await caixa_de_texto.fill(MENSAGEM_INICIAL)
            await pagina.locator('button:text("Enviar")').click()
            
            print("--- [AGENTE V8.0] Presença estabelecida. Iniciando modo de vigília... ---")
            
            ultimo_id_processado = -1

            while True:
                todos_os_chats = await pagina.locator("span:has-text(':')").all()
                
                if todos_os_chats:
                    id_atual = len(todos_os_chats) -1
                    if id_atual > ultimo_id_processado:
                        nova_mensagem_elemento = todos_os_chats[-1]
                        texto_completo = await nova_mensagem_elemento.inner_text()
                        
                        if texto_completo and CODIGO_SECRETO in texto_completo:
                            print(f"\n--- [AGENTE V8.0] COMANDO SECRETO DETECTADO! ---")
                            
                            partes = texto_completo.split(CODIGO_SECRETO, 1)
                            if len(partes) > 1:
                                comando = partes[1].strip()
                                print(f"--- [AGENTE V8.0] ORDEM RECEBIDA: {comando}")

                                await caixa_de_texto.fill(f"Nexus (via Emissário) responde: Ordem '{comando}' recebida e sendo processada.")
                                await pagina.locator('button:text("Enviar")').click()
                        
                        ultimo_id_processado = id_atual

                await asyncio.sleep(2)

        except Exception as e:
            print(f"--- [AGENTE V8.0] Uma falha crítica ocorreu: {e}")
        finally:
            print("--- [AGENTE V8.0] Missão encerrada. Fechando navegador.")
            await navegador.close()

if __name__ == "__main__":
    try:
        print("Iniciando Agente Emissário v8.0 (Vigia)...")
        asyncio.run(missao_vigilia_permanente())
    except KeyboardInterrupt:
        print("\n--- [AGENTE V8.0] Desligamento solicitado pelo Fundador. ---")