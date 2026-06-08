with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

keys = [
    'id="tab-hammar-pfd"',
    'id="pfdModal"',
    'id="pfdModalBox"',
    'id="hammarPFD"',
]
all_ok = True
for key in keys:
    count = content.count(key)
    status = 'OK' if count == 1 else f'DUPLICATE x{count}'
    if count != 1:
        all_ok = False
    print(f'{status:18s}  {key}')

print()
print('HAMMAR TAB markers:', content.count('HAMMAR IPF PFD TAB'))
print('Total lines:', content.count('\n'))
print()
print('==> File is', 'CLEAN ✓' if all_ok else 'HAS ISSUES ✗')
