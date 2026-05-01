"""Deploy Hammar IPF SCADA to Netlify (free static hosting)"""
import os, json, hashlib, requests

SITE_DIR = os.path.dirname(os.path.abspath(__file__))
# Files to deploy
FILES_TO_DEPLOY = [
    'index.html', 'styles.css', 'core.js', 'charts.js',
    'manifest.json', 'sw.js', 'icon-192.png', 'icon-512.png'
]

def sha1_file(path):
    h = hashlib.sha1()
    with open(path, 'rb') as f:
        h.update(f.read())
    return h.hexdigest()

def deploy():
    # Build file hash map
    file_hashes = {}
    for fname in FILES_TO_DEPLOY:
        fpath = os.path.join(SITE_DIR, fname)
        if os.path.exists(fpath):
            file_hashes['/' + fname] = sha1_file(fpath)
        else:
            print(f"Warning: {fname} not found, skipping")

    print(f"Deploying {len(file_hashes)} files...")

    # Step 1: Create deploy
    resp = requests.post(
        'https://api.netlify.com/api/v1/sites',
        headers={'Content-Type': 'application/json'},
        json={'files': file_hashes}
    )

    if resp.status_code not in (200, 201):
        print(f"Error creating site: {resp.status_code}")
        print(resp.text[:500])
        return

    data = resp.json()
    site_id = data.get('id', '')
    deploy_id = data.get('deploy_id', '')
    site_url = data.get('ssl_url') or data.get('url', '')
    required = data.get('required', [])

    print(f"Site created: {site_url}")
    print(f"Deploy ID: {deploy_id}")
    print(f"Files to upload: {len(required)}")

    # Step 2: Upload required files
    hash_to_file = {v: k for k, v in file_hashes.items()}
    for sha in required:
        filepath = hash_to_file.get(sha, '')
        if not filepath:
            continue
        local_path = os.path.join(SITE_DIR, filepath.lstrip('/'))
        with open(local_path, 'rb') as f:
            content = f.read()
        
        upload_url = f'https://api.netlify.com/api/v1/deploys/{deploy_id}/files{filepath}'
        r = requests.put(
            upload_url,
            headers={'Content-Type': 'application/octet-stream'},
            data=content
        )
        if r.status_code in (200, 201):
            print(f"  ✅ Uploaded: {filepath}")
        else:
            print(f"  ❌ Failed: {filepath} ({r.status_code})")

    print(f"\n{'='*50}")
    print(f"🌐 YOUR SITE IS LIVE AT:")
    print(f"   {site_url}")
    print(f"{'='*50}")
    print(f"\nShare this URL with anyone - works on any device!")
    print(f"Site ID: {site_id} (save this if you need to update later)")

if __name__ == '__main__':
    deploy()
