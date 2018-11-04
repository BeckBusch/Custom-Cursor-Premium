locations = {
//  name : {a : '00 00', p : '00 00'},
    ana: {a: '00 19', p: '00 17'},
    symmetra: {a: '01 16', p: '01 19'},
    bastion : {a: '00 52', p: '00 52'},
    zenyatta : {a: '02 07', p: '02 35'}
};


const imgURL = chrome.runtime.getURL("cursors/");

chrome.storage.sync.get('option', function (obj) {

    if (obj['option'] == "other") {
        chrome.storage.sync.get('link', function (obj) {
            document.body.style.cursor = "url(" + obj['link'] + "), auto";
        });
    }
    else if (obj['option'] == "default") {
        document.body.style.cursor = "auto";

    }
    else {
        if(locations[obj['option']] != undefined){
            var locaA = locations[obj['option']].a;
            var locaP = locations[obj['option']].p;
        }
        else{
            loacA = "";
            locaP = "";
        }

        document.body.style.cursor = "url(" + imgURL + "arrows/" + obj['option'] + ".png)" + locaA + ", auto";
        items = document.getElementsByTagName("*");
        for (i = 0; i < items.length; i++) {
            if (getComputedStyle(items[i]).cursor == 'default') {
                items[i].style.cursor = "url(" + imgURL + "arrows/" + obj['option'] + ".png)" + locaA + ", auto";
            }
        }

        for (i = 0; i < items.length; i++) {
            if (getComputedStyle(items[i]).cursor == 'pointer') {
                items[i].style.cursor = "url(" + imgURL + "pointers/" + obj['option'] + ".png)" + locaP + ", auto";
            }
        }
    }
});


chrome.storage.sync.get('trail', function (obj) {
    if (obj['trail'] === undefined) {
        console.log('undefined')
    }
    else if (obj['trail'] === "google") {
        let colorArray = ["#0266C8", "#F90101", "#F2B50F", "#00933B"];
        document.addEventListener('mousemove', function (event) {
            let curColor = colorArray[Math.floor(Math.random() * colorArray.length)];
            let curX = event.pageX;
            let curY = event.pageY;
            let width = Math.random() * 50;
            // noinspection JSSuspiciousNameCombination
            let height = width;
            let item = document.createElement('div');
            item.style.position = 'absolute';
            item.style.display = 'inline-block';
            item.style.borderRadius = '50%';
            item.style.margin = '4px';
            item.style.pointerEvents = 'none';
            item.style.boxShadow = '0 0 10px 0 rgba(0,0,0,.3)';
            item.style.left = String(curX) + "px";
            item.style.top = String(curY) + "px";
            item.style.width = String(width) + "px";
            item.style.height = String(height) + "px";
            item.style.zIndex = "10";
            item.style.backgroundColor = String(curColor);
            setTimeout(function () {
                item.style.opacity = '0';
            }, 500);
            document.body.appendChild(item);
        });


    }
    else if (obj['trail'] == "trail-dot") {
        chrome.storage.sync.get(['color', 'size'], function (obj) {
            const dots = [],
                mouse = {
                    x: 0,
                    y: 0
                };
            const Dot = function () {
                this.x = 0;
                this.y = 0;
                this.node = (function () {
                    const n = document.createElement("div");
                    n.className = "trail";
                    n.style.position = "absolute";
                    n.style.zIndex = '10';
                    n.style.height = String(obj['size']) + "px";
                    n.style.width = String(obj['size']) + "px";
                    n.style.borderRadius = String(obj['size'] / 2) + "px";
                    n.style.background = obj['color'];
                    n.style.pointerEvents = "none";
                    document.body.appendChild(n);
                    return n;
                }());
            };
            const trail = document.getElementsByClassName('trail');
            Dot.prototype.draw = function () {
                this.node.style.left = this.x + "px";
                this.node.style.top = this.y + "px";
            };
            for (let i = 0; i < 12; i++) {
                const d = new Dot();
                dots.push(d);
            }

            function draw() {
                let x = mouse.x,
                    y = mouse.y;
                dots.forEach(function (dot, index, dots) {
                    const nextDot = dots[index + 1] || dots[0];
                    dot.x = x;
                    dot.y = y;
                    dot.draw();
                    x += (nextDot.x - dot.x) * .6;
                    y += (nextDot.y - dot.y) * .6;

                });
            }

            addEventListener("mousemove", function (event) {
                mouse.x = event.pageX;
                mouse.y = event.pageY;
            });

            function animate() {
                draw();
                requestAnimationFrame(animate);
            }

            animate();
        })
    }
});