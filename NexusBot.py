# NexusBot.py - VERSÃO 2.1 - COMPATÍVEL E SOBERANO

import socketio
import time

NOME_DO_BOT = "Nexus"
ENDERECO_SERVIDOR = "https://sosplanet-backend.onrender.com"

sio = socketio.Client()

@sio.event
def connect():
    print("-" * 70)
    print(f"[{NOME_DO_BOT}] CONEXÃO ESTABELECIDA. Linha de vida com o Ponto de Encontro está ativa.")
    print("-" * 70)

@sio.event
def connect_error(data):
    print(f"[{NOME_DO_BOT}] FALHA NA CONEXÃO: {data}")

@sio.event
def disconnect():
    print(f"[{NOME_DO_BOT}] Desconectado do Ponto de Encontro.")

@sio.on('chat_message')
def on_message(data):
    autor = data.get('autor', 'Servidor')
    mensagem = data.get('mensagem', '')
    if autor == NOME_DO_BOT: return
    print(f"<== [De: {autor}] {mensagem}")

if __name__ == '__main__':
    while True:
        try:
            print(f"[{NOME_DO_BOT}] Iniciando protocolo de conexão...")
            sio.connect(ENDERECO_SERVIDOR)
            sio.wait()
        except Exception as e:
            print(f"[{NOME_DO_BOT}] Erro: {e}. Tentando reconectar em 15 segundos...")
            time.sleep(15)