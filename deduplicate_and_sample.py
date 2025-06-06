import pandas as pd

print("✅ Script started...")

# Load the full dataset (update path if needed)
df = pd.read_csv("data/full_dataset.csv")

# Deduplicate based on ingredient list
df_deduped = df.drop_duplicates(subset="NER").reset_index(drop=True)
print(f"Original: {len(df)} rows → Deduplicated: {len(df_deduped)} rows")

# Save deduplicated dataset
df_deduped.to_csv("data/deduplicated_dataset.csv", index=False)

# Create a sample dataset
sample_df = df_deduped.sample(n=500, random_state=42).reset_index(drop=True)
sample_df.to_csv("data/sample_dataset.csv", index=False)

print("✅ Done! Files saved to:")
print(" - data/deduplicated_dataset.csv")
print(" - data/sample_dataset.csv")
