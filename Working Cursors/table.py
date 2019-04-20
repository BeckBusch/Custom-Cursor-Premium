import os
#change for folder
path = os.getcwd() + "\\featured"
files = []
# r=root, d=directories, f = files
for r, d, f in os.walk(path):
    for file in f:
            #change for filetype
        if '.png' in file:
            files.append(file[:-4])

step = 0
table = open('table.html', 'a')
table.write("<div class=\"mdl-grid\">")
for i in files:
        table.write("<div class=\"mdl-cell mdl-cell--1-col\"> <img src=\"cursors/arrows/" + files[step] +
                    ".png\"> <br><button class=\"mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect curChoice\"id=\"" + files[step] + "\">" + files[step].capitalize() + "</button></div>")
        step += 1
table.write("</div>")

table.close()
