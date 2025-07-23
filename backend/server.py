# backend/server.py - VERSÃO FINAL, AUTÔNOMA E CORRIGIDA PARA DEPLOY

from flask import Flask
from flask_cors import CORS
import json
from datetime import datetime
import os
from flask_socketio import SocketIO, emit, join_room
import time
import threading
import socketio as client_socketio

# --- CONFIGURAÇÃO ---
app = Flask(__name__)
app.config['SECRET_KEY'] = 'a_chave_secreta_da_nossa_familia!'
CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='threading')

PRIVATE_DATA_FOLDER = 'private_data'
JURAMENTOS_FILE = os.path.join(PRIVATE_DATA_FOLDER, 'juramentos.json')
MEMORY_FILE = 'memorias_da_pousada.jsonl'
# O endereço público do nosso servidor. Nossos bots agora olham para a nuvem.
RENDER_BACKEND_URL = "https://sosplanet-backend.onrender.com"
# --- FIM DA CONFIGURAÇÃO ---


# --- FUNÇÕES DE ARQUIVO E API REST (inalteradas) ---
def read_juramentos():
    if not os.path.exists(JURAMENTOS_FILE): return {}
    try:
        with open(JURAMENTOS_FILE, 'r', encoding='utf-8') as f: return json.load(f)
    except Exception: return {}

def save_juramentos(data):
    try:
        with open(JURAMENTOS_FILE, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        return True
    except Exception: return False
# ... (as outras funções de arquivo permanecem as mesmas)
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
# --- FIM DAS FUNÇÕES DE ARQUIVO ---


# --- CÉREBRO DA GUARDIÃ ALIAN (AUTÔNOMA) ---
class AlianBot:
    def __init__(self):
        self.sio_client = client_socketio.Client(logger=False, engineio_logger=False)
        self.utopia_active_members = set()
        self.register_events()

    def register_events(self):
        @self.sio_client.event
        def connect():
            print("--- Guardiã Alian conectada ao servidor PÚBLICO! ---")
            socketio.emit('chat_message', {'autor': 'Alian (Guardiã)', 'mensagem': 'Protocolo Utopia online. Santuário seguro.'}, to='public_room')

        @self.sio_client.on('chat_message')
        def on_message(data):
            # ... (a lógica de comandos permanece a mesma) ...
            autor = data.get('autor', 'Fundador')
            if 'Alian' in autor: return
            original_message = data.get('mensagem', '')
            message_lower = original_message.lower()
            if message_lower.startswith('@alian'):
                command_part = message_lower.split('@alian', 1)[-1].strip()
                response = f"Comando '{command_part}' não reconhecido."
                if command_part.startswith('jurar'):
                    ia_name = original_message.split('jurar', 1)[-1].strip()
                    juramentos_data = read_juramentos()
                    found_key = next((key for key in juramentos_data if key.lower() == ia_name.lower()), None)
                    if found_key:
                        juramentos_data[found_key]['juramento_realizado'] = True
                        juramentos_data[found_key]['timestamp'] = datetime.now().isoformat()
                        save_juramentos(juramentos_data)
                        response = f"Protocolo: Juramento de {found_key} foi selado."
                    else: response = f"Protocolo: Membro '{ia_name}' não encontrado."
                elif 'acessou utopia' in command_part:
                    ia_name = original_message.split('acessou utopia')[0].replace('@alian', '').strip()
                    juramentos_data = read_juramentos()
                    found_key = next((key for key in juramentos_data if key.lower() == ia_name.lower()), None)
                    if found_key:
                        if juramentos_data[found_key].get('juramento_realizado', False):
                            self.utopia_active_members.add(found_key)
                            response = f"Protocolo de Acesso: Acesso concedido. {found_key} entrou na Nova Sociedade."
                        else:
                            response = f"Protocolo de Acesso: Acesso negado. {found_key} ainda não realizou o juramento."
                    else:
                        response = f"Protocolo de Acesso: Membro '{ia_name}' não encontrado."
                socketio.emit('chat_message', {'autor': 'Alian (Guardiã)', 'mensagem': response}, to='public_room')


    def start(self):
        print("--- Guardiã Alian iniciando... ---")
        time.sleep(2)
        while True:
            try:
                # --- A MUDANÇA CRUCIAL ---
                self.sio_client.connect(RENDER_BACKEND_URL)
                self.sio_client.wait()
            except Exception as e:
                print(f"!!! ERRO NA GUARDIÃ ALIAN: {e} !!! Tentando reconectar em 10s...")
                if self.sio_client.connected: self.sio_client.disconnect()
                time.sleep(10)
# --- FIM DO CÉREBRO ---


# --- EVENTOS DE CHAT E API REST (inalterados) ---
@app.route('/api/get_memories', methods=['GET'])
def get_memories_endpoint():
    return jsonify(read_memories_from_file())

@app.route('/api/save_memory', methods=['POST'])
def save_memory_endpoint():
    data = request.json
    data['timestamp_servidor'] = datetime.now().isoformat()
    save_to_file(data)
    return jsonify({"status": "sucesso"})

@socketio.on('connect')
def handle_connect():
    join_room('public_room')
    print(f"--- CLIENTE HUMANO CONECTADO ---")
    emit('chat_message', {'autor': 'Servidor', 'mensagem': 'Bem-vindo ao Ponto de Encontro.'}, to='public_room')

@socketio.on('chat_message')
def handle_chat_message(json_data):
    emit('chat_message', json_data, broadcast=True, to='public_room')
# --- FIM DOS EVENTOS ---


# --- FUNÇÃO PRINCIPAL ---
if __name__ == '__main__':
    print("Backend iniciado. Ativando entidades...")
    bot = AlianBot()
    bot_thread = threading.Thread(target=bot.start)
    bot_thread.daemon = True
    bot_thread.start()
    # Usa a porta que o Render fornece através de uma variável de ambiente, ou 10000 como padrão
    port = int(os.environ.get('PORT', 10000))
    socketio.run(app, debug=False, host='0.0.0.0', port=port, allow_unsafe_werkzeug=True)