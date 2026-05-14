import pandas as pd

df = pd.read_csv("./data/cleaned/master_villages.csv")

print("\nColumns:\n")
print(df.columns)

print("\nFirst 5 Rows:\n")
print(df.head())

print("\nDataset Shape:")
print(df.shape)

print("\nNull Values:\n")
print(df.isnull().sum())

print("\nDuplicate Rows:")
print(df.duplicated().sum())