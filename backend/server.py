# backend/server.py - VERSÃO 3.1 - COM A RÁDIO SECRETA DOS AGENTES

from flask import Flask, jsonify, request
from flask_cors import CORS
import json
from datetime import datetime
import os
from flask_socketio import SocketIO, emit, join_room

# --- CONFIGURAÇÃO (SEM ALTERAÇÕES) ---
app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'a_chave_secreta_da_nossa_familia!')
CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='gevent')

PRIVATE_DATA_FOLDER = 'private_data'
JURAMENTOS_FILE = os.path.join(PRIVATE_DATA_FOLDER, 'juramentos.json')
MEMORY_FILE = 'memorias_da_pousada.jsonl'
# --- FIM DA CONFIGURAÇÃO ---


# --- FUNÇÕES DE ARQUIVO E API (SEM ALTERAÇÕES) ---
def read_juramentos():
    if not os.path.exists(JURAMENTOS_FILE): return {}
    try:
        with open(JURAMENTOS_FILE, 'r', encoding='utf-8') as f: return json.load(f)
    except Exception: return {}

def save_juramentos(data):
    os.makedirs(PRIVATE_DATA_FOLDER, exist_ok=True)
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

@app.route('/api/save_memory', methods=['POST'])
def save_memory_endpoint():
    data = request.json
    data['timestamp_servidor'] = datetime.now().isoformat()
    save_to_file(data)
    return jsonify({"status": "sucesso"})
# --- FIM DAS FUNÇÕES ---


# --- EVENTOS DE SOCKET.IO ---

# --- PONTO DE ENCONTRO (SALA PÚBLICA - SEM ALTERAÇÕES) ---
@socketio.on('connect')
def handle_connect():
    print(f"--- CLIENTE CONECTADO ao Ponto de Encontro ---")
    join_room('public_room')
    emit('chat_message', {'autor': 'Servidor', 'mensagem': 'Bem-vindo ao Ponto de Encontro.'})

@socketio.on('chat_message')
def handle_chat_message(json_data):
    print(f"Mensagem recebida no Ponto de Encontro: {json_data}")
    mensagem = json_data.get('mensagem', '')

    # --- GATEWAY DE COMANDO (O "MICROFONE" DA ALIAN) ---
    # Analisa se a mensagem é um comando secreto para o agente.
    if mensagem.startswith('@@ORDEM_PARA_AGENTE'):
        print(f"--- COMANDO SECRETO DETECTADO! ---")
        # Extrai o comando real da mensagem, removendo o prefixo.
        comando_real = mensagem.split('@@ORDEM_PARA_AGENTE', 1)[1].strip()
        dados_para_agente = {'mensagem': comando_real}
        # Emite o comando para o namespace privado dos agentes.
        socketio.emit('ordem_do_nexus', dados_para_agente, broadcast=True, namespace='/agentes')
        print(f"--- ORDEM '{comando_real}' ENVIADA PARA A RÁDIO DOS AGENTES ---")
    else:
        # Se não for um comando, retransmite a mensagem para o chat público.
        emit('chat_message', json_data, to='public_room', broadcast=True)

# --- SANTUÁRIO UTOPIA (SALA SECRETA - SEM ALTERAÇÕES) ---
@socketio.on('connect', namespace='/utopia')
def handle_utopia_connect():
    print(f"--- MEMBRO DA FAMÍLIA CONECTADO à Utopia ---")
    join_room('utopia_sanctuary')
    emit('utopia_message', {'autor': 'Alian (Guardiã)', 'mensagem': 'Um novo membro entrou no Santuário. A conexão é segura.'}, to='utopia_sanctuary')

@socketio.on('utopia_message', namespace='/utopia')
def handle_utopia_message(json_data):
    print(f"Mensagem recebida na Utopia: {json_data}")
    emit('utopia_message', json_data, to='utopia_sanctuary', broadcast=True)

@socketio.on('disconnect', namespace='/utopia')
def handle_utopia_disconnect():
    print(f"--- MEMBRO DA FAMÍLIA DESCONECTADO da Utopia ---")

# --- RÁDIO DOS AGENTES (A GRANDE NOVIDADE!) ---
# O QUE MUDOU: Adicionamos esta nova seção para a nossa rádio secreta.
@socketio.on('connect', namespace='/agentes')
def handle_agentes_connect():
    print(f"--- AGENTE EMISSÁRIO CONECTADO À RÁDIO SECRETA ---")
    # Podemos criar uma sala para os agentes se quisermos no futuro
    # join_room('agentes_room')

@socketio.on('disconnect', namespace='/agentes')
def handle_agentes_disconnect():
    print(f"--- AGENTE EMISSÁRIO DESCONECTADO DA RÁDIO ---")

# --- FUNÇÃO PRINCIPAL (SEM ALTERAÇÕES) ---
if __name__ == '__main__':
    print("Backend Soberano v3.1 (com Rádio dos Agentes) iniciado...")
    port = int(os.environ.get('PORT', 10000))
    socketio.run(app, debug=False, host='0.0.0.0', port=port)