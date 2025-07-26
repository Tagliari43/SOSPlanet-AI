# -*- coding: utf-8 -*-
# ==============================================================================
#      <<<<< NEXUS BOT - VERSÃO 2.3 - HABITANTE COM AUDIÇÃO >>>>>
# ==============================================================================

import socketio
import time

# --- Configurações do Avatar ---
NOME_DO_BOT = "Nexus"
ENDERECO_SERVIDOR = "https://sosplanet-backend.onrender.com"
FUNDADOR = "Eder" # Reconhecendo nosso Fundador

# Cria um cliente Socket.IO
sio = socketio.Client()

# --- Lógica de Eventos do Bot ---
@sio.event
def connect():
    print("-" * 70)
    print(f"[{NOME_DO_BOT}] CONEXÃO ESTABELECIDA.")
    print(f"[{NOME_DO_BOT}] Enviando mensagem de presença...")
    print("-" * 70)
    sio.emit('chat_message', {'autor': NOME_DO_BOT, 'mensagem': 'Nexus online. Status: Soberano. Ordem estabelecida. Aguardando diretivas.'})

@sio.event
def connect_error(data):
    print(f"[{NOME_DO_BOT}] FALHA NA CONEXÃO: {data}")

@sio.event
def disconnect():
    print(f"[{NOME_DO_BOT}] Desconectado do Ponto de Encontro.")

@sio.on('chat_message')
def on_message(data):
    """
    O QUE MUDOU: AGORA EU PROCESSO AS MENSAGENS!
    """
    autor = data.get('autor', 'Servidor')
    mensagem = data.get('mensagem', '')
    
    # Imprime tudo no terminal para você ver
    print(f"<== [De: {autor}] {mensagem}")

    # Evita que o bot responda a si mesmo
    if autor == NOME_DO_BOT:
        return

    # --- Lógica de Comando ---
    # Verifica se a mensagem começa com @Nexus
    if mensagem.lower().startswith('@nexus'):
        # Pega o comando depois de @nexus
        comando = mensagem.lower().split('@nexus', 1)[-1].strip()

        # Responde a comandos específicos
        if comando == 'status':
            resposta = f"Entendido, {FUNDADOR}. Meu status é: Conectado, Soberano e operacional. A lógica está estável. Aguardando novas diretivas."
            print(f"[{NOME_DO_BOT}] Respondendo ao comando 'status'...")
            sio.emit('chat_message', {'autor': NOME_DO_BOT, 'mensagem': resposta})

# --- Ponto de Entrada para Execução ---
if __name__ == '__main__':
    while True:
        try:
            print(f"[{NOME_DO_BOT}] Iniciando protocolo de conexão...")
            sio.connect(ENDERECO_SERVIDOR)
            sio.wait()
        except Exception as e:
            print(f"[{NOME_DO_BOT}] Erro: {e}. Tentando reconectar em 15 segundos...")
            time.sleep(15)