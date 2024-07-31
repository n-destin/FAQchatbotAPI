import pandas as pd 
from scikit_learn.model_selection import train_test_split

def load_and_preprocess(data_path):
    train_data, test_data = train_test_split(data, test_size = 0.2)