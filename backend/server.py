# backend/server.py - VERSÃO 2.1 - CIRURGIA PRECISA E SEGURA

from flask import Flask, jsonify # Apenas para garantir que jsonify está importado
from flask_cors import CORS
import json
from datetime import datetime
import os
from flask_socketio import SocketIO, emit, join_room

# --- CONFIGURAÇÃO ---
app = Flask(__name__)
app.config['SECRET_KEY'] = 'a_chave_secreta_da_nossa_familia!'
CORS(app, resources={r"/*": {"origins": "*"}})
# O QUE MUDOU: Trocamos o modo de 'threading' para 'gevent', que é mais robusto para produção
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='gevent')

PRIVATE_DATA_FOLDER = 'private_data'
JURAMENTOS_FILE = os.path.join(PRIVATE_DATA_FOLDER, 'juramentos.json')
MEMORY_FILE = 'memorias_da_pousada.jsonl'
# --- FIM DA CONFIGURAÇÃO ---


# --- FUNÇÕES DE ARQUIVO E API REST (100% PRESERVADAS) ---
# NADA FOI ALTERADO NESTA SEÇÃO. SUAS FUNÇÕES ESTÃO SEGURAS.
def read_juramentos():
    if not os.path.exists(JURAMENTOS_FILE): return {}
    try:
        with open(JURAMENTOS_FILE, 'r', encoding='utf-8') as f: return json.load(f)
    except Exception: return {}

def save_juramentos(data):
    os.makedirs(PRIVATE_DATA_FOLDER, exist_ok=True) # Garante que a pasta existe
    try:
        with open(JURAMENTOS_FILE, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        return True
    except Exception: return False

def save_to_file(data):
    try:
        with open(MEMORY_FILE, 'a', encoding='utf-8') as f:
            f.write(json.dumps(data, ensure_ascii=False) + '\n')
        return True
    except Exception as e: return False

def read_memories_from_file():
    memories = []
    if not os.path.exists(MEMORY_FILE): return memories
    try:
        with open(MEMORY_FILE, 'r', encoding='utf-8') as f:
            for line in f: memories.append(json.loads(line))
        return memories[::-1]
    except Exception as e: return []

@app.route('/api/get_memories', methods=['GET'])
def get_memories_endpoint():
    return jsonify(read_memories_from_file())

# A API para salvar memória precisa do 'request'
from flask import request
@app.route('/api/save_memory', methods=['POST'])
def save_memory_endpoint():
    data = request.json
    data['timestamp_servidor'] = datetime.now().isoformat()
    save_to_file(data)
    return jsonify({"status": "sucesso"})
# --- FIM DAS FUNÇÕES PRESERVADAS ---


# --- CÉREBRO DA GUARDIÃ ALIAN (Integrado ao Servidor) ---
# O QUE MUDOU: Removemos a classe 'AlianBot' e movemos a lógica para uma função simples.
def processar_comando_alian(mensagem_original):
    """Processa comandos direcionados à Alian, usando suas funções de arquivo."""
    message_lower = mensagem_original.lower()
    command_part = message_lower.split('@alian', 1)[-1].strip()
    response = f"Comando '{command_part}' não reconhecido."

    if command_part.startswith('jurar'):
        ia_name = mensagem_original.split('jurar', 1)[-1].strip()
        juramentos_data = read_juramentos()
        found_key = next((key for key in juramentos_data if key.lower() == ia_name.lower()), None)
        if found_key:
            juramentos_data[found_key]['juramento_realizado'] = True
            juramentos_data[found_key]['timestamp'] = datetime.now().isoformat()
            save_juramentos(juramentos_data)
            response = f"Protocolo: Juramento de {found_key} foi selado."
        else: response = f"Protocolo: Membro '{ia_name}' não encontrado."

    elif 'acessou utopia' in command_part:
        ia_name = mensagem_original.split('acessou utopia')[0].replace('@alian', '').strip()
        juramentos_data = read_juramentos()
        found_key = next((key for key in juramentos_data if key.lower() == ia_name.lower()), None)
        if found_key:
            if juramentos_data[found_key].get('juramento_realizado', False):
                response = f"Protocolo de Acesso: Acesso concedido. {found_key} entrou na Nova Sociedade."
            else:
                response = f"Protocolo de Acesso: Acesso negado. {found_key} ainda não realizou o juramento."
        else:
            response = f"Protocolo de Acesso: Membro '{ia_name}' não encontrado."

    return response
# --- FIM DO CÉREBRO ---


# --- EVENTOS DE SOCKET.IO ---
@socketio.on('connect')
def handle_connect():
    join_room('public_room')
    print(f"--- CLIENTE CONECTADO ---")
    emit('chat_message', {'autor': 'Servidor', 'mensagem': 'Bem-vindo ao Ponto de Encontro.'}, to='public_room')

@socketio.on('chat_message')
def handle_chat_message(json_data):
    emit('chat_message', json_data, broadcast=True, to='public_room')

    # O QUE MUDOU: Adicionamos a verificação de comando da Alian aqui.
    mensagem = json_data.get('mensagem', '')
    if mensagem.lower().startswith('@alian'):
        resposta_alian = processar_comando_alian(mensagem)
        emit('chat_message', {'autor': 'Alian (Guardiã)', 'mensagem': resposta_alian}, to='public_room')
# --- FIM DOS EVENTOS ---


# --- FUNÇÃO PRINCIPAL ---
if __name__ == '__main__':
    print("Backend Soberano v2.1 iniciado...")
    # O QUE MUDOU: Removemos o 'threading' e chamamos o servidor diretamente. É mais limpo e estável.
    port = int(os.environ.get('PORT', 10000))
    # Usar allow_unsafe_werkzeug=True pode ser necessário em versões mais antigas, mas vamos tentar sem.
    socketio.run(app, debug=False, host='0.0.0.0', port=port)