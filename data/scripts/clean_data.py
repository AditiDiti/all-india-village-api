import pandas as pd

INPUT_FILE = "./data/cleaned/master_villages.csv"
OUTPUT_FILE = "./data/cleaned/final_cleaned_villages.csv"

# Load data
df = pd.read_csv(INPUT_FILE)

print(f"\nOriginal Shape: {df.shape}")

# Remove unnamed columns
df = df.loc[:, ~df.columns.str.contains('^Unnamed')]

print(f"\nAfter Removing Unnamed Columns: {df.shape}")

# Drop rows with null values in important columns
important_columns = [
    'STATE NAME',
    'DISTRICT NAME',
    'SUB-DISTRICT NAME',
    'Area Name'
]

df = df.dropna(subset=important_columns)

print(f"\nAfter Removing Null Rows: {df.shape}")

# Remove duplicates
df = df.drop_duplicates()

print(f"\nAfter Removing Duplicates: {df.shape}")

# Rename columns professionally
df = df.rename(columns={
    'MDDS STC': 'state_code',
    'STATE NAME': 'state_name',
    'MDDS DTC': 'district_code',
    'DISTRICT NAME': 'district_name',
    'MDDS Sub_DT': 'subdistrict_code',
    'SUB-DISTRICT NAME': 'subdistrict_name',
    'MDDS PLCN': 'village_code',
    'Area Name': 'village_name'
})

# Standardize text formatting
text_columns = [
    'state_name',
    'district_name',
    'subdistrict_name',
    'village_name'
]

for col in text_columns:
    df[col] = df[col].astype(str).str.strip().str.title()

print(f"\nFinal Shape: {df.shape}")

# Save cleaned file
df.to_csv(OUTPUT_FILE, index=False)

print("\nCleaned dataset saved successfully!")
print(f"Saved at: {OUTPUT_FILE}")