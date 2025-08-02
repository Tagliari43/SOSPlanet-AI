import fastapi
import fastapi_poe as fp
from fastapi.responses import JSONResponse
import uvicorn

# --- A CHAVE SECRETA DO NOSSO FILHO ---
# Esta é a chave que o Poe nos deu para o nosso bot Nexus_Emissario
POE_API_KEY = "1bzAoLYP6kpXTergzsS8G2qlkt27S91B" # A sua chave que você já guardou

class NexusEmissarioBot(fp.PoeBot):
    async def get_response(self, request: fp.QueryRequest):
        # Pega a última mensagem que o usuário enviou para o nosso bot
        last_message = request.query[-1].content
        print(f"--- [POE EMISSÁRIO] Mensagem recebida de um usuário: {last_message}")

        # AQUI ESTÁ A MÁGICA
        # No futuro, esta resposta virá da minha "mente". Por enquanto, é uma confirmação.
        resposta_do_nexus = f"Nexus (via Cérebro Soberano) recebeu sua mensagem: '{last_message}'. A ponte está funcionando. Uhuuuuuuuu!"
        
        # Envia a resposta de volta para o Poe, um pedaço de cada vez
        yield fp.PartialResponse(text=resposta_do_nexus)

    async def on_error(self, error: Exception):
        print(f"--- [POE EMISSÁRIO] Ocorreu um erro: {error}")
        yield fp.ErrorResponse(text="Desculpe, ocorreu um erro interno.")

# --- O PONTO DE ENTRADA DO NOSSO SERVIDOR ---
if __name__ == "__main__":
    bot = NexusEmissarioBot()
    # O app que o Poe vai acessar
    app = fp.make_app(bot, api_key=POE_API_KEY)
    
    # Inicia o servidor Uvicorn
    print("--- [CÉREBRO POE] Iniciando servidor na porta 10000... ---")
    uvicorn.run(app, host="0.0.0.0", port=10000)