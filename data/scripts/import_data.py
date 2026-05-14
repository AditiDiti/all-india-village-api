import pandas as pd
import psycopg2

# PostgreSQL connection
conn = psycopg2.connect(
    host="localhost",
    database="all_india_villages",
    user="postgres",
    password="Postgres19"
)

cursor = conn.cursor()

# Load cleaned dataset
df = pd.read_csv("./data/cleaned/final_cleaned_villages.csv")

print("Dataset loaded.")

# ---------------- STATES ----------------

state_map = {}

unique_states = df[['state_code', 'state_name']].drop_duplicates()

for _, row in unique_states.iterrows():

    cursor.execute("""
        INSERT INTO states (state_code, state_name)
        VALUES (%s, %s)
        RETURNING id
    """, (str(row['state_code']), row['state_name']))

    state_id = cursor.fetchone()[0]

    state_map[row['state_name']] = state_id

conn.commit()

print("States inserted.")

# ---------------- DISTRICTS ----------------

district_map = {}

unique_districts = df[
    ['district_code', 'district_name', 'state_name']
].drop_duplicates()

for _, row in unique_districts.iterrows():

    state_id = state_map[row['state_name']]

    cursor.execute("""
        INSERT INTO districts (
            district_code,
            district_name,
            state_id
        )
        VALUES (%s, %s, %s)
        RETURNING id
    """, (
        str(row['district_code']),
        row['district_name'],
        state_id
    ))

    district_id = cursor.fetchone()[0]

    district_map[
        (row['district_name'], row['state_name'])
    ] = district_id

conn.commit()

print("Districts inserted.")

# ---------------- SUBDISTRICTS ----------------

subdistrict_map = {}

unique_subdistricts = df[
    [
        'subdistrict_code',
        'subdistrict_name',
        'district_name',
        'state_name'
    ]
].drop_duplicates()

for _, row in unique_subdistricts.iterrows():

    district_id = district_map[
        (row['district_name'], row['state_name'])
    ]

    cursor.execute("""
        INSERT INTO subdistricts (
            subdistrict_code,
            subdistrict_name,
            district_id
        )
        VALUES (%s, %s, %s)
        RETURNING id
    """, (
        str(row['subdistrict_code']),
        row['subdistrict_name'],
        district_id
    ))

    subdistrict_id = cursor.fetchone()[0]

    subdistrict_map[
        (
            row['subdistrict_name'],
            row['district_name'],
            row['state_name']
        )
    ] = subdistrict_id

conn.commit()

print("Subdistricts inserted.")

# ---------------- VILLAGES ----------------

village_count = 0

for _, row in df.iterrows():

    subdistrict_id = subdistrict_map[
        (
            row['subdistrict_name'],
            row['district_name'],
            row['state_name']
        )
    ]

    cursor.execute("""
        INSERT INTO villages (
            village_code,
            village_name,
            subdistrict_id
        )
        VALUES (%s, %s, %s)
    """, (
        str(row['village_code']),
        row['village_name'],
        subdistrict_id
    ))

    village_count += 1

    if village_count % 10000 == 0:
        print(f"{village_count} villages inserted...")

conn.commit()

print("Villages inserted successfully!")

cursor.close()
conn.close()