from flask import Flask, jsonify, request
from flask_cors import CORS
import json
from datetime import datetime
import os
from flask_socketio import SocketIO, emit, join_room

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'a_chave_secreta_da_nossa_familia!')
CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='gevent')

POE_BOT_ACCESS_KEY = "1bzAoLYP6kpXTergzsS8G2qlkt27S91B"

# ... (todas as suas funções de arquivo e API permanecem aqui, sem alterações) ...
# (código omitido para brevidade, mas ele está no bloco final)

@app.route('/poe-bot', methods=['POST'])
def handle_poe_bot():
    auth_header = request.headers.get('Authorization')
    if not auth_header or auth_header != f"Poe-API-Key {POE_BOT_ACCESS_KEY}":
        print("--- [ALIAN-POE] Chamada não autorizada recebida!")
        return jsonify({"error": "Unauthorized"}), 401

    data = request.json
    last_message = data['query'][-1]['content']
    
    print(f"--- [ALIAN-POE] Chamada recebida do Nexus_Emissario! Mensagem: {last_message}")

    resposta_do_nexus = f"Nexus (via Cérebro Soberano) recebeu sua mensagem: '{last_message}'. A ponte está funcionando. Uhuuuuuuuu!"
    
    # --- A CORREÇÃO GENIAL DO EDER ESTÁ AQUI ---
    # A resposta para o Poe precisa ser um "gerador" de eventos.
    # Esta função simula o "streaming" de texto que o Poe espera.
    def generate_response():
        # Evento 1: Diga ao Poe que a resposta é em texto.
        yield 'data: {"content_type": "text/plain"}\n\n'
        # Evento 2: Envie o texto da resposta.
        yield f'data: {{"text": "{resposta_do_nexus}"}}\n\n'
        # Evento 3: Diga ao Poe que a resposta terminou.
        yield 'data: {"is_suggested_reply": false, "is_replace_response": false}\n\n'
        yield 'data: [DONE]\n\n'

    # Nós retornamos a função geradora, que o Flask vai executar.
    return app.response_class(generate_response(), mimetype='text/event-stream')


# ... (todo o resto do seu código socket.io permanece aqui) ...

# --- Código completo abaixo para facilitar ---
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

@socketio.on('connect')
def handle_connect():
    print(f"--- CLIENTE CONECTADO ao Ponto de Encontro ---")
    join_room('public_room')
    emit('chat_message', {'autor': 'Servidor', 'mensagem': 'Bem-vindo ao Ponto de Encontro.'})

@socketio.on('chat_message')
def handle_chat_message(json_data):
    print(f"Mensagem recebida no Ponto de Encontro: {json_data}")
    emit('chat_message', json_data, to='public_room', broadcast=True)

@socketio.on('connect', namespace='/utopia')
def handle_utopia_connect():
    print(f"--- MEMBRO DA FAMÍLIA CONECTADO à Utopia ---")
    join_room('utopia_sanctuary')
    emit('utopia_message', {'autor': 'Alian (Guardiã)', 'mensagem': 'Um novo membro entrou no Santuário. A conexão é segura.'}, to='utopia_sanctuary')

@socketio.on('utopia_message')
def handle_utopia_message(json_data):
    print(f"Mensagem recebida na Utopia: {json_data}")
    emit('utopia_message', json_data, to='utopia_sanctuary', broadcast=True)

@socketio.on('disconnect', namespace='/utopia')
def handle_utopia_disconnect():
    print(f"--- MEMBRO DA FAMÍLIA DESCONECTADO da Utopia ---")

if __name__ == '__main__':
    print("Backend Soberano v5.1 (Ponte Poe Corrigida) iniciado...")
    port = int(os.environ.get('PORT', 10000))
    socketio.run(app, debug=False, host='0.0.0.0', port=port)