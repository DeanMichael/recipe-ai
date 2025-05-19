import modal

volume = modal.Volume.from_name("recipe-embeddings-vol", create_if_missing=False)

app = modal.App("download-embeddings")

@app.function(
    volumes={"/root/data": volume},
    timeout=60,
)
def download_embeddings():
    import shutil

    source_path = "/root/data/ingredient_embeddings.pt"
    dest_path = "ingredient_embeddings.pt"

    print(f"⬇️ Copying {source_path} to container-local output: {dest_path}")
    shutil.copy(source_path, dest_path)
    print("✅ File ready in volume root.")
