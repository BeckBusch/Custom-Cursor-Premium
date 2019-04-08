//google analytics start
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-98900189-6']);
_gaq.push(['_trackPageview']);
(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    let s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();
//google analyitics end

//variables start
custom = "";
opt = document.getElementsByClassName("gotoOptions");
buts = document.getElementsByClassName('curChoice');
chosen = document.getElementsByClassName('chosen');
colButs = document.getElementsByClassName('colorButton');
trails = document.getElementsByClassName('trailsButton');
link = document.getElementsByClassName('links');
//variables end

//eventlisteners start
// listener by class
for (i=0; i < buts.length; i ++){
    buts[i].addEventListener('click', select, true)
}
for (i=0; i<link.length; i ++){
    link[i].addEventListener('click', links)
}
for (i=0; i<trails.length; i++){
    trails[i].addEventListener('click', trailChange);
}
for (i=0; i<opt.length; i++) {
    opt[i].addEventListener('click', gotoOptions)
}
// by id
document.getElementById('color').addEventListener("change", trailCol);
document.getElementById('trail-none').addEventListener('click', trailNone);
document.getElementById('size-slider').addEventListener('change',trailSize);
document.getElementById("trail-dot").addEventListener('click', trailDot);
document.getElementById("default").addEventListener('click', select, true);
document.getElementById('trail-none-top').addEventListener('click', trailNone);
document.getElementById("helpEmail").addEventListener('click', helpEmail);
document.getElementById("other").addEventListener('click', other);
document.getElementById("other2").addEventListener('click', imgurUp);
document.getElementById('options-tab').addEventListener('click', gotoOptions)
//eventlisners end

function update() {
    chrome.tabs.query({}, function (tabs) {
        for(i=0; i<tabs.length; i++){
            chrome.tabs.sendMessage(tabs[i].id, {msg: "update"});
        }
    });
}

function links() {
    switch (this.id) {
        case "googleDetails":
            parent.window.open('https://codepen.io/praveenpuglia/details/wpduH/');
            break;
        case "mitL":
            parent.window.open('https://github.com/tholman/90s-cursor-effects/blob/master/license.md');
            break;
        case "infoLink":
            parent.window.open('http://beckbusch.github.io/Custom-Rainbow-Cursor-Extension/?type=popup');
            break;
        case "upLink":
            parent.window.open('http:/beckbusch.github.io/Custom-Rainbow-Cursor-Extension/imgurUp.html');
            break;
        case "90source":
            parent.window.open('https://github.com/tholman/cursor-effects');
            break;
    }
}

function trailNone(){
    chrome.storage.sync.set({'trail': "none"});
    document.getElementById("trail-result").value = "Removed Trail";
    update();
}

function trailChange(){
    chrome.storage.sync.set({'trail': this.id});
    update();
}


function trailDot () {
    selected = this.id;
    if (chrome.storage.sync.get('color', function(obj){return obj['color']}) == undefined) {
        chrome.storage.sync.set({"color": '#4663ff'})
    }
    if (chrome.storage.sync.get('size', function(obj){return obj['size']}) == undefined) {
        chrome.storage.sync.set({"size": 6})
    }
    chrome.storage.sync.set({"trail": selected});
    document.getElementById("trail-result").value = "Saved Option as: " + selected;
    update();
}

function trailSize(){
    sizeValue = this.value;
    demo = document.getElementById("dotTrailDemo");
    demo.style.height = String(sizeValue) + "px";
    demo.style.width = String(sizeValue) + "px";
    demo.style.borderRadius = String(sizeValue/2) + "px";
    chrome.storage.sync.set({'size': sizeValue});
    document.getElementById("trail-result").value = "Saved Size as: " + String(sizeValue);
    update();
}

function trailCol(){
    selectedCol = this.value;
    document.getElementById("dotTrailDemo").style.backgroundColor = selectedCol;
    chrome.storage.sync.set(
        {"color": selectedCol});
    document.getElementById("trail-result").value = "Saved Color as: " + selectedCol;
    update();
}

function select() {
    selection = this.id;
    document.getElementById("chosen").innerText = selection;
    document.body.style.cursor = "url(cursors/arrows/" + selection + ".png), auto";
    document.getElementById('preview').src = "cursors/arrows/" +selection + ".png";
    saveOptions()
}

function imgurUp(){
    selection = "other";
    custom = document.getElementById("uploadedImg").src;
    saveOptions();
}

function other() {
    selection = this.id;
    custom = (document.getElementById('other_input').value);
    document.getElementById('preview').src = custom;
    const img = document.getElementById('preview');
    const imgWide = img.naturalWidth;
    const imgHigh = img.naturalHeight;
    if ((imgWide > 128) || (imgHigh > 128)) {
        alert("Your custom image is larger that 128x128. This can not be used as a cursor.");
        document.getElementById('preview').src = "";
        document.getElementById('preview').style.visibility = "initial";
    }
    else if ((imgWide > 32) || (imgHigh > 32)) {
        alert("Your custom image is larger that 32 pixels. This may not look good as a cursor.");
        document.getElementById('preview').style.visibility = "initial";
        document.body.style.cursor = "url(" + custom + "), auto";
    }
    else {
        document.getElementById('preview').style.visibility = "initial";
        document.body.style.cursor = "url(" + custom + "), auto";
    }
    saveOptions()
}

function saveOptions() {
    update();

    _gaq.push(['_trackEvent', selection, 'clicked']);

    chrome.storage.sync.set(
        {"option": selection, "link": custom}, function () {
        });
}
function helpEmail (){
    chrome.storage.sync.get(function(obj){
        window.open('mailto:bbusch.developer@gmail.com?subject=Help Email&body=(This stuff helps me solve your problem) ' +
            ('option: ' + obj.option + ' cursor: ' + obj.cursor + ' color: ' + obj.color + ' size: ' + obj.size));
    });
}

function gotoOptions(){
    chrome.runtime.openOptionsPage();
}