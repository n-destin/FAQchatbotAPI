from pymongo import MongoClient 

def get__db_handle(name, host, port, username, password):
    client = MongoClient(host = host, port = int(port), username = username, password(password))
    handle = client("database_name")
    return handle, client
