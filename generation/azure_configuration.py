import os
from dotenv import load_dotenv
load_dotenv()

from promptflow.core import Prompty, AzureOpenAIModelConfiguration

model_config = AzureOpenAIModelConfiguration(
    azure_deployment=os.getenv("AZURE_OPENAI_CHAT_DEPLOYMENT"),
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"), 
    api_version= os.getenv("AZURE_OPENAI_API_VERSION"),
    api_key=os.getenv("API_KEY")
)

prompty = Prompty.load("./generation/chat.prompty", model={'configuration': model_config})



def generate(prompt, chat_history):
    result = prompty(
    chat_history = chat_history,
    chat_input=prompt)
    return result 
