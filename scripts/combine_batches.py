import modal

volume = modal.Volume.from_name("recipe-embeddings-vol", create_if_missing=False)

image = modal.Image.debian_slim().pip_install(
    ["torch", "tqdm"]
)

app = modal.App("combine-batches")

@app.function(
    image=image,
    volumes={"/root/data": volume},
    timeout=60000,  # 1000 minutes
)
def combine_batches():
    import torch
    import os
    import glob
    from tqdm import tqdm

    data_dir = "/root/data"
    output_path = os.path.join(data_dir, "ingredient_embeddings.pt")

    print("🔍 Searching for batch files...")
    batch_files = sorted(glob.glob(os.path.join(data_dir, "batch_*.pt")))
    print(f"✅ Found {len(batch_files)} batch files.")

    all_embeddings = []

    for f in tqdm(batch_files, desc="🔄 Loading and combining batches"):
        batch = torch.load(f, map_location=torch.device("cpu"))
        all_embeddings.extend(batch)

    print(f"✅ Combined {len(all_embeddings)} total embeddings.")
    torch.save(all_embeddings, output_path)
    print(f"💾 Saved to: {output_path}")
