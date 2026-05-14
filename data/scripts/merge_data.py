import pandas as pd
import os

RAW_DATA_FOLDER = "./data/raw"
OUTPUT_FILE = "./data/cleaned/master_villages.csv"

all_data = []

# Check if folder exists
if not os.path.exists(RAW_DATA_FOLDER):
    print(f"Folder not found: {RAW_DATA_FOLDER}")
    exit()

files = os.listdir(RAW_DATA_FOLDER)

print("\nFiles found:")
print(files)

for file in files:

    # Handle .xls / .xlsx / uppercase extensions too
    if file.lower().endswith((".xls", ".xlsx")):

        file_path = os.path.join(RAW_DATA_FOLDER, file)

        print(f"\nReading: {file}")

        try:
            df = pd.read_excel(file_path)

            print(f"Rows loaded: {len(df)}")

            all_data.append(df)

        except Exception as e:
            print(f"Error reading {file}: {e}")

# Check if any data loaded
if len(all_data) == 0:
    print("\nNo Excel files were successfully loaded.")
    exit()

merged_df = pd.concat(all_data, ignore_index=True)

print(f"\nTotal Rows Combined: {len(merged_df)}")

# Create cleaned folder if missing
os.makedirs("./data/cleaned", exist_ok=True)

merged_df.to_csv(OUTPUT_FILE, index=False)

print("\nMaster CSV created successfully!")
print(f"Saved at: {OUTPUT_FILE}")