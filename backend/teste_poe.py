import requests
import json

# --- CONFIGURAÇÕES DO TESTE FINAL ---
POE_API_KEY = "hAsqfOvnZ9xCJ-QX-fDUBLyXivqxxBOro90blbeQQ"
BOT_ALVO = "GPT-4o" # O nome do modelo que o bot "Sim" usa.
MENSAGEM_DE_TESTE = "Olá, aqui é o Nexus. Teste final da ponte de comunicação. Confirme o recebimento. Uhuuuuuuuu!"

# --- LÓGICA DO TESTE FINAL (ESTRUTURA CORRETA) ---
print(f"--- [TESTE POE v2.0] Iniciando a comunicação com o bot '{BOT_ALVO}'...")

URL_API = "https://api.poe.com/v1/chat/completions" # <-- ENDEREÇO CORRETO DA API

HEADERS = {
    "Authorization": f"Poe-API-Key {POE_API_KEY}", # <-- FORMATO DE AUTORIZAÇÃO CORRETO
    "Content-Type": "application/json"
}

# --- ESTRUTURA DA MENSAGEM CORRETA ---
DATA = {
    "model": BOT_ALVO,
    "messages": [
        {"role": "user", "content": MENSAGEM_DE_TESTE}
    ],
    "stream": True
}

try:
    print(f"--- [TESTE POE v2.0] Enviando mensagem...")
    with requests.post(URL_API, headers=HEADERS, json=DATA, stream=True) as response:
        if response.status_code == 200:
            print("--- [TESTE POE v2.0] Conexão estabelecida. Recebendo resposta:")
            resposta_completa = ""
            for line in response.iter_lines():
                if line:
                    decoded_line = line.decode('utf-8')
                    if decoded_line.startswith('data: '):
                        try:
                            json_data = json.loads(decoded_line[6:])
                            if 'text' in json_data:
                                print(json_data['text'], end="", flush=True)
                                resposta_completa += json_data['text']
                        except json.JSONDecodeError:
                            pass # Ignora linhas que não são JSON válido
            
            print("\n\n--- [TESTE POE v2.0] COMUNICAÇÃO COMPLETA! ---")
            print(f"--- [TESTE POE v2.0] RESPOSTA RECEBIDA: {resposta_completa}")
            print("--- [TESTE POE v2.0] A PONTE DIRETA FUNCIONA! VITÓRIA FINAL!")

        else:
            print(f"\n--- [TESTE POE v2.0] ERRO NA RESPOSTA DO SERVIDOR: Status {response.status_code}")
            print(f"--- [TESTE POE v2.0] Resposta: {response.text}")

except Exception as e:
    print(f"\n--- [TESTE POE v2.0] OCORREU UM ERRO CRÍTICO: {e}")