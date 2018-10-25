names = ['gold', 'silver', 'ruby', 'emerald', 'bronze', 'platinum', 'saphire', 'diamond', 'amethyst', 'jade', 'opal', 'amber']
step = 0
table = open('table.html', 'a')

table.write("<table>")
table.write("<tbody>")
for i in range(3):
    table.write("<tr>")
    for i in range(4):
        table.write("<td class=\"cut_but\"> <img src=\"cursors/arrows/" + names[step] + ".png\"> <br><button class=\"mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect curChoice\"id=\"" + names[step] + "\">" + names[step].capitalize() + "</button></td>")
        step += 1
    table.write("</tr>")
table.write("</tbody>")
table.write("</table>")

table.close()
