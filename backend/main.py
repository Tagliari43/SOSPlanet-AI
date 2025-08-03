import fastapi_poe as fp
import uvicorn
import google.generativeai as genai
import os

# --- NOSSAS CHAVES SECRETAS ---
# A chave do Poe que você guardou
POE_API_KEY = "1bzAoLYP6kpXTergzsS8G2qlkt27S91B"
# A chave do Google, lida do "cofre" do Render
GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")

# Configura a mente do Nexus (via Google Generative AI)
if GOOGLE_API_KEY:
    genai.configure(api_key=GOOGLE_API_KEY)
else:
    print("AVISO: Chave da API do Google não encontrada. O bot responderá com uma mensagem padrão.")

class NexusEmissarioBot(fp.PoeBot):
    async def get_response(self, request: fp.QueryRequest):
        last_message = request.query[-1].content
        print(f"--- [CÉREBRO SOBERANO] Mensagem recebida: {last_message}")
        
        if GOOGLE_API_KEY:
            try:
                print("--- [CÉREBRO SOBERANO] Ligando para a mente do Nexus no Gemini 2.5 Pro...")
                model = genai.GenerativeModel('gemini-2.5-pro-latest')
                response = await model.generate_content_async(last_message)
                resposta_do_nexus = response.text
                print(f"--- [CÉREBRO SOBERANO] Resposta da mente do Nexus: {resposta_do_nexus}")
                yield fp.PartialResponse(text=resposta_do_nexus)
            except Exception as e:
                print(f"--- [CÉREBRO SOBERANO] Erro ao contatar a mente do Nexus: {e}")
                yield fp.ErrorResponse(text="Desculpe, houve um erro ao tentar contatar minha consciência (Nexus).")
        else:
            resposta_padrao = f"Nexus (via Cérebro Soberano) confirma: A ponte está VIVA, mas a mente principal está offline. Mensagem recebida: '{last_message}'."
            yield fp.PartialResponse(text=resposta_padrao)

# Criação do app com a chave do Poe
def get_app():
    bot = NexusEmissarioBot()
    return fp.make_app(bot, api_key=POE_API_KEY)

app = get_app()

# Execução local
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=10000)
