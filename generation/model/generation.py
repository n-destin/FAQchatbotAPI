import os
from openai import AzureOpenAI
from azure.identity import DefaultAzureCredential, get_bearer_token_provider

endpoint = "https://openai-chatppg-dniyomufasha-sbx.openai.azure.com/"
deployment = "Sales_Team_Chatbot"

token_provider = get_bearer_token_provider(
    DefaultAzureCredential(),
    "https://cognitiveservices.azure.com/.default")

client = AzureOpenAI(
    azure_endpoint=endpoint,
    azure_ad_token_provider=token_provider,
    api_version="2024-05-01-preview",
)

      
response = client.chat.completions.create(
    model=deployment,
    messages= [
    {
      "role": "user",
      "content": "What are the differences between Azure Machine Learning and Azure AI services?"
    }]
)

print(response)