import pandas as pd
from sentence_transformers import SentenceTransformer, util
import torch
from collections import defaultdict

# --- Define flavor buckets ---
bucket_map = {
    "base": ["rice", "pasta", "bread", "noodles", "quinoa", "potatoes"],
    "umami": ["mushroom", "soy sauce", "parmesan", "anchovy", "beef", "chicken", "cheese", "fish sauce"],
    "spicy": ["chili", "hot sauce", "jalapeno", "cayenne", "pepper flakes", "sriracha"],
    "sweet": ["sugar", "honey", "maple syrup", "dates", "molasses"],
    "sour": ["lemon", "lime", "vinegar", "yogurt", "sour cream", "buttermilk"],
    "crunch": ["nuts", "celery", "crackers", "carrot", "radish", "apple", "panko"],
    "fresh": ["basil", "cilantro", "parsley", "mint", "scallion", "dill", "chives"],
    "bitter": ["arugula", "kale", "endive", "radicchio", "coffee", "dark chocolate"],
    "oil": ["olive oil", "butter", "vegetable oil", "sesame oil", "ghee"],
    "aroma": ["garlic", "onion", "ginger", "cinnamon", "clove", "cardamom"]
}

normalized_bucket_map = defaultdict(list)
for bucket, ingredients in bucket_map.items():
    for ing in ingredients:
        normalized_bucket_map[ing.lower()].append(bucket)

def get_flavor_buckets(ingredients):
    buckets = set()
    for ing in ingredients:
        ing = ing.lower()
        for known in normalized_bucket_map:
            if known in ing:
                buckets.update(normalized_bucket_map[known])
    return buckets

# --- Load sample dataset ---
df = pd.read_csv("data/sample_dataset_with_buckets.csv")
df['flat_ingredients'] = df['NER'].apply(lambda x: ', '.join(eval(x)))
df['parsed_ingredients'] = df['NER'].apply(lambda x: [i.strip().lower() for i in eval(x)])
df['flavor_buckets'] = df['flavor_buckets'].apply(eval)

# --- Model + Embedding ---
model = SentenceTransformer("all-MiniLM-L6-v2")
print("🔍 Generating recipe embeddings...")
recipe_embeddings = model.encode(df['flat_ingredients'].tolist(), convert_to_tensor=True)

# --- User input ---
user_ingredients = ["chicken", "garlic", "rice", "onion"]
user_input = ", ".join(user_ingredients)
user_set = set(i.lower() for i in user_ingredients)
user_embedding = model.encode(user_input, convert_to_tensor=True)
user_buckets = get_flavor_buckets(user_ingredients)
desired_buckets = {"umami", "crunch"}

print(f"\n👨‍🍳 User ingredients: {user_input}")
print(f"🧂 Detected flavor profile: {', '.join(sorted(user_buckets))}")
print(f"🎯 Desired recipe flavor buckets: {', '.join(desired_buckets)}")

# --- Cosine similarity ---
cosine_scores = util.cos_sim(user_embedding, recipe_embeddings)[0]

# --- Re-rank using combined score (cosine + ingredient overlap) ---
results = []
for idx, cos_score in enumerate(cosine_scores):
    recipe_ings = set(df.iloc[idx]['parsed_ingredients'])
    recipe_buckets = set(df.iloc[idx]['flavor_buckets'])

    if not desired_buckets.issubset(recipe_buckets):
        continue

    overlap = len(user_set & recipe_ings) / len(user_set)
    combined = 0.7 * cos_score.item() + 0.3 * overlap

    results.append({
        "index": idx,
        "cosine_score": cos_score.item(),
        "overlap": overlap,
        "combined_score": combined
    })

# --- Sort by combined score ---
results = sorted(results, key=lambda x: x["combined_score"], reverse=True)

# --- Show top 5 matches ---
print("\n🥇 Top Matches (Combined Score):\n")
if not results:
    print("❌ No matches found with the desired flavor buckets.")
else:
    for match in results[:5]:
        i = match["index"]
        recipe = df.iloc[i]
        recipe_buckets = set(recipe["flavor_buckets"])
        missing = recipe_buckets - user_buckets

        print(f"{recipe['title']} (Score: {match['combined_score']:.4f})")
        print(f"Ingredients: {recipe['flat_ingredients']}")
        print(f"Flavor Buckets: {', '.join(sorted(recipe_buckets))}")
        print(f"Matched Ingredients: {len(user_set & set(recipe['parsed_ingredients']))}/{len(user_set)}")
        if missing:
            print(f"🧪 Consider adding: {', '.join(sorted(missing))}")
        print()
