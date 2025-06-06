import pandas as pd
import torch
from sentence_transformers import SentenceTransformer
from tqdm import tqdm
import os

# Load and prep data
df = pd.read_csv("full_dataset.csv")
df['flat_ingredients'] = df['NER'].apply(lambda x: ', '.join(eval(x)))

# Set batch size and output file
BATCH_SIZE = 1000
MODEL_NAME = 'all-MiniLM-L6-v2'
OUTPUT_FILE = "ingredient_embeddings.pt"

# Load model
model = SentenceTransformer(MODEL_NAME)

# Resume logic
start = 0
embeddings = []

if os.path.exists(OUTPUT_FILE):
    print("Loading existing embeddings to resume...")
    embeddings = torch.load(OUTPUT_FILE)
    start = len(embeddings)
    print(f"Resuming from batch {start}")

# Process in batches
for i in tqdm(range(start, len(df), BATCH_SIZE)):
    batch = df['flat_ingredients'][i:i+BATCH_SIZE].tolist()
    batch_embeddings = model.encode(batch, convert_to_tensor=True)
    embeddings.extend(batch_embeddings)

    # Save progress every batch
    torch.save(embeddings, OUTPUT_FILE)
    print(f"Saved {len(embeddings)} embeddings")

print("✅ All embeddings complete and saved.")
