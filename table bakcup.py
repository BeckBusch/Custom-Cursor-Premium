names = ['ana', 'bastion', 'bigritte', 'doomfist', 'dva', 'genji', 'hammond', 'hanzo', 'junkrat', 'lucio', 'mccree', 'mei', 'mercy', 'moira', 'orisa', 'pharah', 'reaper', 'reinhardt', 'roadhog', 'soldier76', 'sombra', 'symmetra', 'torb', 'tracer', 'widow', 'winston', 'zarya', 'zenyatta', 'hero 29', 'hero 30' ]
step = 0
table = open('table.html', 'a')

table.write("<table>")
table.write("<tbody>")
for i in range(10):
    table.write("<tr>")
    for i in range(3):
        table.write("<td class=\"cur_but\"> <img src=\"cursors/arrows/" + names[step] + ".png\"> <br><button class=\"mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect curChoice\"id=\"" + names[step] + "\">" + names[step].capitalize() + "</button></td>")
        step += 1
    table.write("</tr>")
table.write("</tbody>")
table.write("</table>")

table.close()
