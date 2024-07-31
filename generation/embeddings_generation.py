import os
import re 
import requests
import sys
from num2words import num2words
import pandas as pd
import numpy as np
import tiktoken
from openai import AzureOpenAI
from dotenv import load_dotenv
load_dotenv()


dataframe = pd.read_json(os.getenv("json_path"))

# pd.optionstring.mode.chained_assignment = None #https://pandastring.pydata.org/pandas-docs/stable/user_guide/indexing.html#evaluation-order-matters

# stringistringinput text
def normalize_text(string, sep_token = " \n "):
    string = re.sub(r'\s+',  ' ', string).strip()
    string= re.sub(r". ,","",string)
    # remove all instancestringof multiple spaces
    string= string.replace("..",".")
    string= string.replace(". .",".")
    string= string.replace("\n", "")
    string= string.strip()
    
    return string


for column in dataframe.columns.values:
    dataframe[column].apply(lambda x : normalize_text(x) if x != None else "")


tokenizer = tiktoken.get_encoding("cl100k_base")
dataframe = dataframe[dataframe["Message  (Email)"].notna()]

# print(dataframe)

# # dataframe['number of tokens'] = dataframe['Message  (Email)'].apply(lambda x : len(tokenizer.encode(x)) if x != "" else 0)
# # dataframe = dataframe[dataframe["number of tokens"] < 8192] # maximum tokens into the model

# print(dataframe.head(2))



client = AzureOpenAI(
    azure_deployment=os.getenv("AZURE_OPENAI_EMBEDDINGS_DEPLOYMENT"),
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"), 
    api_version= os.getenv("AZURE_OPENAI_API_VERSION"),
    api_key=os.getenv("API_KEY")
)

def generate_embeddings(text, model=os.getenv("AZURE_OPENAI_EMBEDDINGS_DEPLOYMENT")): # model = "deployment_name"
    if text:
        return client.embeddings.create(input = [text], model=model).data[0].embedding
    return 0

dataframe["embeddings"] = dataframe["Message  (Email)"].apply(lambda x : generate_embeddings(x, model = os.getenv("AZURE_OPENAI_EMBEDDINGS_DEPLOYMENT")))

def cosine_similarity(embeddings_a, embeddings_b):
    to_return = np.dot(embeddings_a, embeddings_b) / (np.linalg.norm(embeddings_a) * np.linalg.norm(embeddings_b))
    return to_return

def get_embedding(text, model=os.getenv("AZURE_OPENAI_EMBEDDINGS_DEPLOYMENT")): # model = "deployment_name"
    return client.embeddings.create(input = [text], model=model).data[0].embedding

def search_docs(df, user_query, limit):
    embedding = generate_embeddings(
        user_query,
        model= os.getenv("AZURE_OPENAI_EMBEDDINGS_DEPLOYMENT")
    )
    df["similarities"] = df.embeddings.apply(lambda x: cosine_similarity(x, embedding))
    result = (
        df.sort_values("similarities", ascending=False)
        .head(limit)
    )
    reference_data = []
    for _, row in result.iterrows():
        reference_data.append({ "question" : row["Message  (Email)"], "answer" : row["Response - FAQ AI"]})
    # reference = [{"question" : row["Message  (Email)", "answer" : row["Response - FAQ AI"]]} for _, row in result.iterrows()]
    return reference_data

def generate_reference_documents(prompt):
    return search_docs(dataframe, prompt, limit=10)
