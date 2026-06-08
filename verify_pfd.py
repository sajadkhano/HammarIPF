import re
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

tabs = re.findall(r'id="tab-([^"]+)"', content)
navs = re.findall(r'data-tab="([^"]+)"', content)
print('Tab panels:', tabs)
print()
print('Nav buttons:', navs)
print()
print('hammar-pfd panel exists:', 'tab-hammar-pfd' in content)
print('hammar-pfd nav exists:', 'data-tab="hammar-pfd"' in content)
print('hammar_pfd.js linked:', 'hammar_pfd.js' in content)
print('pfdShowDetail exists:', 'pfdShowDetail' in content)
print('pfdModal exists:', 'pfdModal' in content)
print()
print('Total HTML size:', len(content), 'chars /', round(len(content)/1024,1), 'KB')
