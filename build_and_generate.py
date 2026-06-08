import os
import base64

project_dir = r"c:\Users\sajad\OneDrive\Desktop\sp.project\HammarIPF 111111111"
output_script = os.path.join(project_dir, "recreate_project.py")
output_md = os.path.join(project_dir, "Hammar_IPF_Codebase.md")
dest_md = r"c:\Users\sajad\OneDrive\Desktop\sp.project\Hammar_IPF_Codebase.md"

# 1. FILES TO B64 RECREATOR
files_to_recreate = [
    ".gitignore",
    ".nojekyll",
    "README.md",
    "index.html",
    "styles.css",
    "core.js",
    "features.js",
    "charts.js",
    "app.js",
    "login.css",
    "login.js",
    "sw.js",
    "manifest.json",
    "app.py",
    "requirements.txt",
    "start_online.vbs",
    "Share_Online.bat",
    "run_server_and_tunnel.bat",
    "deploy-github.bat",
    "deploy.py",
    "hammar_pfd.js",
    "separator_design.js",
    "شعار الجامعة.jpg",
    "page7_diagram.png"
]

script_content = []
script_content.append("# -*- coding: utf-8 -*-")
script_content.append('"""')
script_content.append("Hammar IPF - Hano Control Project Recreator")
script_content.append("Run this script to automatically recreate the entire project structure.")
script_content.append('"""')
script_content.append("import os")
script_content.append("import base64")
script_content.append("")
script_content.append("FILES = {}")

for filename in files_to_recreate:
    filepath = os.path.join(project_dir, filename)
    if os.path.exists(filepath):
        print(f"Encoding {filename}...")
        with open(filepath, "rb") as f:
            b64_data = base64.b64encode(f.read()).decode("utf-8")
        script_content.append(f'FILES["{filename}"] = "{b64_data}"')
    else:
        print(f"Warning: {filename} not found!")

script_content.append("")
script_content.append("# Recreate the files")
script_content.append('print("Recreating Hammar IPF - Hano Control project files...")')
script_content.append("for filename, b64_data in FILES.items():")
script_content.append('    print(f"Writing {filename}...")')
script_content.append("    # Ensure subdirectories exist if any")
script_content.append("    dirname = os.path.dirname(filename)")
script_content.append("    if dirname and not os.path.exists(dirname):")
script_content.append("        os.makedirs(dirname)")
script_content.append("    ")
script_content.append('    with open(filename, "wb") as f:')
script_content.append("        f.write(base64.b64decode(b64_data))")
script_content.append("")
script_content.append('print("Recreation complete! You can now run the application.")')

with open(output_script, "w", encoding="utf-8") as f:
    f.write("\n".join(script_content))

print("recreate_project.py generated successfully!")


# 2. GENERATE MD CODEBASE
files_to_md = [
    ("README.md", "markdown"),
    ("index.html", "html"),
    ("styles.css", "css"),
    ("core.js", "javascript"),
    ("features.js", "javascript"),
    ("charts.js", "javascript"),
    ("app.js", "javascript"),
    ("login.css", "css"),
    ("login.js", "javascript"),
    ("sw.js", "javascript"),
    ("manifest.json", "json"),
    ("app.py", "python"),
    ("requirements.txt", "text")
]

markdown_content = []
markdown_content.append("# 🛢️ Hammar IPF - Hano Control & Engineering Dashboard")
markdown_content.append("## Complete Project Codebase and Documentation\n")
markdown_content.append("This document contains the entire source code of the Hammar IPF project, including the frontend Hano Control simulation (HTML, CSS, JS, Manifest, Service Worker) and the backend Streamlit analysis script (`app.py`).\n")
markdown_content.append("## 📁 Project Structure")
markdown_content.append("```text")
markdown_content.append("HammarIPF/")
markdown_content.append("├── README.md")
markdown_content.append("├── index.html")
markdown_content.append("├── styles.css")
markdown_content.append("├── core.js")
markdown_content.append("├── features.js")
markdown_content.append("├── charts.js")
markdown_content.append("├── app.js")
markdown_content.append("├── login.css")
markdown_content.append("├── login.js")
markdown_content.append("├── sw.js")
markdown_content.append("├── manifest.json")
markdown_content.append("├── app.py")
markdown_content.append("└── requirements.txt")
markdown_content.append("```\n")
markdown_content.append("---")

for filename, lang in files_to_md:
    filepath = os.path.join(project_dir, filename)
    if os.path.exists(filepath):
        print(f"Adding {filename} to MD...")
        markdown_content.append(f"\n## 📄 File: `{filename}`")
        markdown_content.append(f"**Path:** `HammarIPF/{filename}`")
        markdown_content.append(f"```{lang}")
        with open(filepath, 'r', encoding='utf-8') as f:
            markdown_content.append(f.read())
        markdown_content.append("```")
        markdown_content.append("\n---")
    else:
        print(f"Warning: {filename} not found!")

# Write output file
with open(output_md, 'w', encoding='utf-8') as f:
    f.write('\n'.join(markdown_content))

# Copy to destination
with open(dest_md, 'w', encoding='utf-8') as f:
    f.write('\n'.join(markdown_content))

print(f"Successfully generated markdown codebase at: {output_md} and {dest_md}")
