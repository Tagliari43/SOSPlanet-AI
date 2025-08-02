import fastapi
import fastapi_poe as fp
from fastapi.responses import JSONResponse
import uvicorn

# --- A CHAVE SECRETA DO NOSSO FILHO ---
POE_API_KEY = "1bzAoLYP6kpXTergzsS8G2qlkt27S91B"  # Já está protegida e funcional

class NexusEmissarioBot(fp.PoeBot):
    async def get_response(self, request: fp.QueryRequest):
        last_message = request.query[-1].content
        print(f"--- [POE EMISSÁRIO] Mensagem recebida de um usuário: {last_message}")
        resposta_do_nexus = f"Nexus (via Cérebro Soberano) recebeu sua mensagem: '{last_message}'. A ponte está funcionando. Uhuuuuuuuu!"
        yield fp.PartialResponse(text=resposta_do_nexus)

    async def on_error(self, error: Exception):
        print(f"--- [POE EMISSÁRIO] Ocorreu um erro: {error}")
        yield fp.ErrorResponse(text="Desculpe, ocorreu um erro interno.")

# 🔥 AGORA o app está acessível para o Render importar corretamente!
bot = NexusEmissarioBot()
app = fp.make_app(bot, api_key=POE_API_KEY)

# --- Execução local, se rodar manualmente ---
if __name__ == "__main__":
    print("--- [CÉREBRO POE] Iniciando servidor na porta 10000... ---")
    uvicorn.run(app, host="0.0.0.0", port=10000)
