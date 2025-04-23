# 🧑‍🍳 Recipe Matcher (Plantjammer-Inspired)

An expirement in vibe coding, in order to bring back a beloved app that no longer exists.

---

## 🚀 Current Approach
- Embeds ingredient lists from a large recipe dataset using `sentence-transformers`.
- Matches your available ingredients to the closest recipe suggestions.
- Supports chunked embedding with resume capability for large datasets.
- Progress saved automatically per batch to avoid loss during long runs.