import pandas as pd
from collections import defaultdict

# Define flavor buckets
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

# Normalize bucket map
normalized_bucket_map = defaultdict(list)
for bucket, ingredients in bucket_map.items():
    for ing in ingredients:
        normalized_bucket_map[ing.lower()].append(bucket)

# Load sample data
df = pd.read_csv("data/sample_dataset.csv")
df['parsed_ingredients'] = df['NER'].apply(lambda x: [i.strip().lower() for i in eval(x)])

# Tag flavor buckets
def get_flavor_buckets(ingredients):
    buckets = set()
    for ing in ingredients:
        for known in normalized_bucket_map:
            if known in ing:
                buckets.update(normalized_bucket_map[known])
    return sorted(list(buckets))

df['flavor_buckets'] = df['parsed_ingredients'].apply(get_flavor_buckets)

# Save to new file
df.to_csv("data/sample_dataset_with_buckets.csv", index=False)

print("✅ Flavor buckets added to sample dataset!")
