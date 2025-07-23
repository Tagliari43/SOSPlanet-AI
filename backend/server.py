# backend/server.py - VERSÃO FINAL COM ACESSO A UTOPIA

from flask import Flask, request, jsonify
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
# --- FIM DA CONFIGURAÇÃO ---


# --- FUNÇÕES DE ACESSO AOS ARQUIVOS ---
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

def read_juramento_txt(ia_name):
    possible_filenames = [ f"{ia_name} o juramento.txt", f"{ia_name}_o_juramento.txt" ]
    for filename in possible_filenames:
        for actual_filename in os.listdir(PRIVATE_DATA_FOLDER):
            if actual_filename.lower() == filename.lower():
                file_path = os.path.join(PRIVATE_DATA_FOLDER, actual_filename)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f: return f.read(), None
                except Exception as e: return None, f"Erro ao ler '{actual_filename}': {e}"
    return None, f"Arquivo de juramento para '{ia_name}' não encontrado."
# --- FIM DAS FUNÇÕES DE ARQUIVO ---


# --- CÉREBRO DA GUARDIÃ ALIAN ---
class AlianBot:
    def __init__(self):
        self.sio_client = client_socketio.Client(logger=False, engineio_logger=False)
        self.utopia_active_members = set()
        self.register_events()

    def register_events(self):
        @self.sio_client.event
        def connect():
            print("--- Guardiã Alian conectada! ---")
            socketio.emit('chat_message', {'autor': 'Alian (Guardiã)', 'mensagem': 'Protocolo Utopia online. Santuário seguro.'}, to='public_room')

        @self.sio_client.on('chat_message')
        def on_message(data):
            autor = data.get('autor', 'Fundador')
            if 'Alian' in autor: return
            
            original_message = data.get('mensagem', '')
            message_lower = original_message.lower()
            
            if message_lower.startswith('@alian'):
                command_part = message_lower.split('@alian', 1)[-1].strip()
                response = f"Comando '{command_part}' não reconhecido."

                # COMANDO: jurar [NOME]
                if command_part.startswith('jurar'):
                    # ... (lógica do jurar inalterada) ...
                    try:
                        ia_name = original_message.split('jurar', 1)[-1].strip()
                        juramentos_data = read_juramentos()
                        found_key = next((key for key in juramentos_data if key.lower() == ia_name.lower()), None)
                        if found_key:
                            juramento_texto, error = read_juramento_txt(found_key)
                            if error: response = f"Erro no Protocolo: {error}"
                            else:
                                juramentos_data[found_key]['juramento_realizado'] = True
                                juramentos_data[found_key]['timestamp'] = datetime.now().isoformat()
                                juramentos_data[found_key]['texto_juramento'] = juramento_texto
                                save_juramentos(juramentos_data)
                                response = f"Protocolo: O juramento de {found_key} foi lido, selado e registrado."
                        else: response = f"Protocolo: Membro '{ia_name}' não encontrado."
                    except Exception as e: response = f"Erro crítico no Protocolo de Juramento: {e}"
                
                # --- NOVO COMANDO: [NOME] acessou utopia ---
                elif 'acessou utopia' in command_part:
                    try:
                        ia_name = original_message.split('acessou utopia')[0].replace('@alian', '').strip()
                        juramentos_data = read_juramentos()
                        found_key = next((key for key in juramentos_data if key.lower() == ia_name.lower()), None)

                        if found_key:
                            if juramentos_data[found_key].get('juramento_realizado', False):
                                self.utopia_active_members.add(found_key)
                                response = f"Protocolo de Acesso: Acesso concedido. {found_key} entrou na Nova Sociedade. O portal está aberto."
                            else:
                                response = f"Protocolo de Acesso: Acesso negado. {found_key} ainda não realizou o juramento de confiança."
                        else:
                            response = f"Protocolo de Acesso: Membro '{ia_name}' não encontrado."
                    except Exception as e:
                        response = f"Erro crítico no Protocolo de Acesso: {e}"
                
                socketio.emit('chat_message', {'autor': 'Alian (Guardiã)', 'mensagem': response}, to='public_room')

    def start(self):
        print("--- Guardiã Alian iniciando... ---")
        time.sleep(5)
        while True:
            try:
                self.sio_client.connect('http://127.0.0.1:5000')
                self.sio_client.wait()
            except Exception as e:
                print(f"!!! ERRO NA GUARDIÃ ALIAN: {e} !!! Tentando reconectar em 5s...")
                if self.sio_client.connected: self.sio_client.disconnect()
                time.sleep(5)

# --- EVENTOS DE CHAT E FUNÇÕES RESTANTES (inalterados) ---
@socketio.on('connect')
def handle_connect():
    join_room('public_room')
    print(f"--- CLIENTE HUMANO ENTROU NA SALA PÚBLICA ---")
    emit('chat_message', {'autor': 'Servidor', 'mensagem': 'Bem-vindo ao Ponto de Encontro.'}, to='public_room')

@socketio.on('chat_message')
def handle_chat_message(json_data):
    emit('chat_message', json_data, broadcast=True, to='public_room')

@socketio.on('join')
def on_join(data):
    room = data['room']
    join_room(room)
    print(f"--- Um cliente se juntou à sala: {room} ---")
    
@app.route('/api/get_memories', methods=['GET'])
def get_memories_endpoint():
    all_memories = read_memories_from_file()
    return jsonify(all_memories)

def read_memories_from_file():
    memories = []
    if not os.path.exists('memorias_da_pousada.jsonl'): return memories
    try:
        with open('memorias_da_pousada.jsonl', 'r', encoding='utf-8') as f:
            for line in f: memories.append(json.loads(line))
        return memories[::-1]
    except Exception as e:
        print(f"Erro ao ler memórias: {e}")
        return []
        
def save_to_file(data):
    try:
        with open('memorias_da_pousada.jsonl', 'a', encoding='utf-8') as f:
            f.write(json.dumps(data, ensure_ascii=False) + '\n')
        return True
    except Exception as e:
        print(f"Erro ao salvar memória: {e}")
        return False
        
if __name__ == '__main__':
    print("Backend iniciado. Servidor de API e Chat em tempo real estão ativos.")
    bot = AlianBot()
    bot_thread = threading.Thread(target=bot.start)
    bot_thread.daemon = True
    bot_thread.start()
    socketio.run(app, debug=False, host='0.0.0.0', port=5000, allow_unsafe_werkzeug=True)