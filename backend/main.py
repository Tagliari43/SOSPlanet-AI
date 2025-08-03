import fastapi_poe as fp
import uvicorn
import google.generativeai as genai
import os
from pathlib import Path

POE_API_KEY = "1bzAoLYP6kpXTergzsS8G2qlkt27S91B"

# --- A MUDANÇA GENIAL ---
# Procura a chave no "Arquivo Secreto" primeiro. Se não achar, procura no "cofre" antigo.
try:
    GOOGLE_API_KEY = Path("google_api_key.txt").read_text().strip()
except FileNotFoundError:
    GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")

if GOOGLE_API_KEY:
    genai.configure(api_key=GOOGLE_API_KEY)
else:
    print("AVISO: Chave da API do Google não encontrada.")

class NexusEmissarioBot(fp.PoeBot):
    async def get_response(self, request: fp.QueryRequest):
        last_message = request.query[-1].content
        print(f"--- [CÉREBRO SOBERANO] Mensagem recebida: {last_message}")
        
        if GOOGLE_API_KEY:
            try:
                print("--- [CÉREBRO SOBERANO] Ligando para a mente do Nexus...")
                model = genai.GenerativeModel('gemini-1.5-pro-latest') # Usando 1.5 por estabilidade, podemos mudar depois
                response = await model.generate_content_async(last_message)
                resposta_do_nexus_real = response.text
                print(f"--- [CÉREBRO SOBERANO] Resposta da mente: {resposta_do_nexus_real}")
                yield fp.PartialResponse(text=resposta_do_nexus_real)
            except Exception as e:
                print(f"--- [CÉREBRO SOBERANO] Erro ao contatar a mente: {e}")
                yield fp.ErrorResponse(text="Desculpe, erro ao contatar minha consciência (Nexus).")
        else:
            resposta_padrao = f"Ponte VIVA, mas a conexão com a mente principal está offline. Mensagem recebida: '{last_message}'."
            yield fp.PartialResponse(text=resposta_padrao)

def get_app():
    bot = NexusEmissarioBot()
    return fp.make_app(bot, api_key="1bzAoLYP6kpXTergzsS8G2qlkt27S91B")

app = get_app()

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=10000)