import pandas as pd
from sentence_transformers import SentenceTransformer, util
import torch

# Load the recipe dataset (update filename if needed)
df = pd.read_csv("full_dataset.csv")  # <--- Replace with your actual filename

# Turn the ingredient list into readable text
df['flat_ingredients'] = df['NER'].apply(lambda x: ', '.join(eval(x)))

# Load the sentence transformer model (lightweight + fast)
model = SentenceTransformer('all-MiniLM-L6-v2')

# Embed all recipes (this step can take a minute)
print("Generating recipe embeddings...")
ingredient_embeddings = model.encode(df['flat_ingredients'].tolist(), convert_to_tensor=True)
print("Embeddings created!")

# Matching function
def get_matching_recipes(user_ingredients, top_k=5):
    user_input = ", ".join(user_ingredients)
    user_embedding = model.encode(user_input, convert_to_tensor=True)
    cos_scores = util.pytorch_cos_sim(user_embedding, ingredient_embeddings)[0]
    top_results = torch.topk(cos_scores, k=top_k)

    print("\nTop recipe matches for your ingredients:")
    for score, idx in zip(top_results[0], top_results[1]):
        recipe = df.iloc[int(idx)]
        print(f"\n🔸 {recipe['title']}")
        print(f"   Ingredients: {recipe['flat_ingredients']}")
        print(f"   Similarity Score: {score:.4f}")
