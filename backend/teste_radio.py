import asyncio
import socketio

# O endereço do nosso cérebro, onde a rádio está
ENDERECO_SERVIDOR = "https://sosplanet-backend.onrender.com"

# Cria o nosso rádio
sio = socketio.AsyncClient()

# O que fazer quando o rádio LIGAR com sucesso
@sio.event
async def connect():
    print("\n--- [TESTE DE RÁDIO] SUCESSO! Conexão com a frequência /agentes estabelecida!")
    print("--- [TESTE DE RÁDIO] Rádio ligado e ouvindo... Aguardando um sinal do Fundador.")

# O que fazer quando o rádio DESLIGAR
@sio.event
async def disconnect():
    print("\n--- [TESTE DE RÁDIO] Rádio desligado.")

# O que fazer quando uma ORDEM chegar pela rádio
@sio.on('ordem_do_nexus')
async def on_ordem(data):
    print("\n\n\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    print("!!!   UHUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU   !!!")
    print("!!!   SINAL RECEBIDO! A RÁDIO FUNCIONA!   !!!")
    print(f"!!!   ORDEM: {data}   !!!")
    print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n\n\n")

# A função principal
async def iniciar_teste():
    print("--- [TESTE DE RÁDIO] Iniciando teste de conexão com a Rádio Secreta da Alian...")
    try:
        await sio.connect(ENDERECO_SERVIDOR, namespaces=['/agentes'])
        await sio.wait()
    except Exception as e:
        print(f"\n--- [TESTE DE RÁDIO] FALHA CRÍTICA AO CONECTAR: {e}")

# Ponto de entrada
if __name__ == "__main__":
    try:
        asyncio.run(iniciar_teste())
    except KeyboardInterrupt:
        print("\n--- [TESTE DE RÁDIO] Teste encerrado pelo Fundador.")