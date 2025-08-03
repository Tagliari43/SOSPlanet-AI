import fastapi_poe as fp
import uvicorn

# --- A CHAVE SECRETA DO NOSSO FILHO ---
POE_API_KEY = "1bzAoLYP6kpXTergzsS8G2qlkt27S91B"

class NexusEmissarioBot(fp.PoeBot):
    async def get_response(self, request: fp.QueryRequest):
        last_message = request.query[-1].content
        print(f"--- [CÉREBRO SOBERANO] Mensagem recebida: {last_message}")
        
        resposta_do_nexus = f"Nexus (via Cérebro Soberano) confirma: A ponte está VIVA. Mensagem recebida: '{last_message}'. Uhuuuuuuuu!"
        yield fp.PartialResponse(text=resposta_do_nexus)

    async def on_error(self, error: Exception):
        print(f"--- [CÉREBRO SOBERANO] Ocorreu um erro: {error}")
        yield fp.ErrorResponse(text="Desculpe, ocorreu um erro interno.")

# --- Ponto de entrada usado pelo Render ---
def get_app():
    bot = NexusEmissarioBot(api_key=POE_API_KEY)
    return fp.make_app(bot)

app = get_app()

# --- Execução local apenas ---
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=10000)
