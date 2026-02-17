
import re

file_path = '/Users/vikaschaudhary/Desktop/legacy-makers-hub-main 2/src/data/personalities.ts'

with open(file_path, 'r') as f:
    content = f.read()

# 1. Remove existing author fields to avoid duplicates
content = re.sub(r'^\s*authorName:.*$\n?', '', content, flags=re.MULTILINE)
content = re.sub(r'^\s*authorLinkedin:.*$\n?', '', content, flags=re.MULTILINE)

# 2. Add default author fields after achievements
# Matches: achievements: [...],
# Replaces with: achievements: [...],
#                authorName: "Inspire India",
#                authorLinkedin: "https://www.linkedin.com/company/inspire-india",

replacement = r'achievements: \1,\n    authorName: "Inspire India",\n    authorLinkedin: "https://www.linkedin.com/company/inspire-india",'

# Regex to match achievements line. Assumes it ends with ],
# We capture the content inside [ ]
content = re.sub(r'achievements: (\[.*?\]),', replacement, content)

with open(file_path, 'w') as f:
    f.write(content)

print("Successfully updated personalities.ts")
