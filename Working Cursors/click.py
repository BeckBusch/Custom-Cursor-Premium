import os
#change for folder 5 0
path = os.getcwd() + "\\fingers"
files = []
# r=root, d=directories, f = files
for r, d, f in os.walk(path):
    for file in f:
            #change for filetype
        if '.png' in file:
            files.append(file[:-4])

for i, f in enumerate(files):
        print(files[i] + ": {a: '00 00', p: '05 00'},")
