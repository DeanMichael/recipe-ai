import os
import glob
import pandas as pd
import torch
from sentence_transformers import SentenceTransformer
from tqdm import tqdm
import modal

# Set up Modal
volume = modal.Volume.lookup("recipe-embeddings-vol")

app = modal.App("recipe-embedder")

@app.function(
    image=modal.Image.debian_slim().pip_install(
        "pandas", "torch", "sentence-transformers", "tqdm"
    ),
    volumes={"/root/data": volume},
    gpu="A10G",
    timeout=60 * 60 * 4,
    retries=2,
)
def embed_recipes():
    print("✅ Loading dataset...")
    df = pd.read_csv("/root/data/deduplicated_dataset.csv")
    df['flat_ingredients'] = df['NER'].apply(lambda x: ', '.join(eval(x)))

    model = SentenceTransformer('all-MiniLM-L6-v2')
    BATCH_SIZE = 1000

    # Determine which batch to resume from
    existing_batches = sorted(glob.glob("/root/data/batch_*.pt"))
    start_batch = len(existing_batches)
    print(f"🔁 Resuming from batch {start_batch}")

    for i in tqdm(range(start_batch * BATCH_SIZE, len(df), BATCH_SIZE)):
        batch_num = i // BATCH_SIZE
        batch = df["flat_ingredients"][i:i + BATCH_SIZE].tolist()
        batch_embeddings = model.encode(batch, convert_to_tensor=True)

        batch_file = f"/root/data/batch_{batch_num:04d}.pt"
        torch.save(batch_embeddings, batch_file)
        print(f"💾 Saved {batch_file}")

@app.function()
def list_files():
    print("📁 Contents of /root/data:")
    for f in os.listdir("/root/data"):
        print(f)
