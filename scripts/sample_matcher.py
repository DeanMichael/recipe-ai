import pandas as pd
from sentence_transformers import SentenceTransformer, util
import torch

# Load sample dataset
df = pd.read_csv("data/sample_dataset.csv")
df['flat_ingredients'] = df['NER'].apply(lambda x: ', '.join(eval(x)))

# Load model
model = SentenceTransformer("all-MiniLM-L6-v2")

# Generate embeddings
print("🔍 Generating recipe embeddings...")
recipe_embeddings = model.encode(df['flat_ingredients'].tolist(), convert_to_tensor=True)

# Define user input (test ingredients)
user_ingredients = ["chicken", "garlic", "rice", "onion"]
user_input = ", ".join(user_ingredients)
user_embedding = model.encode(user_input, convert_to_tensor=True)

# Find matches
print(f"🔎 Finding matches for: {user_input}")
cosine_scores = util.cos_sim(user_embedding, recipe_embeddings)[0]
top_k = torch.topk(cosine_scores, k=5)

# Display top results
print("\n🥇 Top 5 Recipe Matches:\n")
for score, idx in zip(top_k.values, top_k.indices):
    i = idx.item()  # convert tensor to integer
    print(f"{df.iloc[i]['title']} (Score: {score.item():.4f})")
    print(f"Ingredients: {df.iloc[i]['flat_ingredients']}\n")

