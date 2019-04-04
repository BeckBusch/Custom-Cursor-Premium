locations = {
    //  name : {a : '00 00', p : '00 00'},
    ana: {a: '00 19', p: '00 17'},
    ashe: {a: '00 00', p: '00 00'},
    bastion: {a: '00 52', p: '00 52'},
    brigitte: {a: '00 10', p: '00 05'},
    doomfist: {a: '00 39', p: '00 00'},
    dva: {a: '01 64', p: '03 63'},
    genji: {a: '00 47', p: '00 47'},
    hammond: {a: '00 64', p: '00 00'},
    hanzo: {a: '00 36', p: '00 36'},
    junkrat: {a: '00 28', p: '00 27 '},
    lucio: {a: '00 45', p: '00 45'},
    mccree: {a: '00 32', p: '00 32'},
    mei: {a: '00 21', p: '02 22'},
    mercy: {a: '00 50', p: '00 54'},
    moira: {a: '06 31', p: '00 00'},
    orisa: {a: '00 56', p: '00 43'},
    pharah: {a: '00 29', p: '00 29'},
    reaper: {a: '00 59', p: '00 59'},
    reinhardt: {a: '00 67', p: '00 76'},
    roadhog: {a: '00 12', p: '00 15'},
    soldier76: {a: '00 21', p: '01 27'},
    sombra: {a: '00 20', p: '00 24'},
    symmetra: {a: '01 16', p: '01 19'},
    torb: {a: '00 34', p: '00 40'},
    tracer: {a: '00 40', p: '01 41'},
    widow: {a: '00 24', p: '00 27'},
    winston: {a: '17 21', p: '17 21'},
    zarya: {a: '00 46', p: '00 47'},
    zenyatta: {a: '02 07', p: '02 35'},
};

const imgURL = chrome.runtime.getURL("cursors/");

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.msg == "update") {
            cursor();
        }
    });

cursor();
trail();


function cursor() {
    chrome.storage.sync.get('option', function (obj) {

        if (obj['option'] === "other") {
            chrome.storage.sync.get('link', function (obj) {
                document.body.style.cursor = "url(" + obj['link'] + "), auto";
            });
        }
        else if (obj['option'] === "default") {
            document.body.style.cursor = "auto";

        }
        else {
            if (locations[obj['option']] != undefined) {
                var locaA = locations[obj['option']].a;
                var locaP = locations[obj['option']].p;
            }
            else {
                locaA = "";
                locaP = "";
            }

            document.body.style.cursor = "url(" + imgURL + "arrows/" + obj['option'] + ".png)" + locaA + ", auto";
            items = document.getElementsByTagName("*");
            for (i = 0; i < items.length; i++) {
                if (getComputedStyle(items[i]).cursor === 'default') {
                    items[i].style.cursor = "url(" + imgURL + "arrows/" + obj['option'] + ".png)" + locaA + ", auto";
                }
            }

            for (i = 0; i < items.length; i++) {
                if (getComputedStyle(items[i]).cursor === 'pointer') {
                    items[i].style.cursor = "url(" + imgURL + "pointers/" + obj['option'] + ".png)" + locaP + ", auto";
                }
            }
        }
    });
}

function trail() {
    chrome.storage.sync.get('trail', function (obj) {
        if (obj['trail'] === undefined) {
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
        else if (obj['trail'] === "trail-dot") {
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
        else if (obj['trail'] === "fairy") {
            /*!
 * Fairy Dust Cursor.js
 * - 90's cursors collection
 * -- https://github.com/tholman/90s-cursor-effects
 * -- http://codepen.io/tholman/full/jWmZxZ/
 */

            (function fairyDustCursor() {

                var possibleColors = ["#D61C59", "#E7D84B", "#1B8798"]
                var width = window.innerWidth;
                var height = window.innerHeight;
                var cursor = {x: width / 2, y: width / 2};
                var particles = [];

                function init() {
                    bindEvents();
                    loop();
                }

                // Bind events that are needed
                function bindEvents() {
                    document.addEventListener('mousemove', onMouseMove);
                    document.addEventListener('touchmove', onTouchMove);
                    document.addEventListener('touchstart', onTouchMove);

                    window.addEventListener('resize', onWindowResize);
                }

                function onWindowResize(e) {
                    width = window.innerWidth;
                    height = window.innerHeight;
                }

                function onTouchMove(e) {
                    if (e.touches.length > 0) {
                        for (var i = 0; i < e.touches.length; i++) {
                            addParticle(e.touches[i].clientX, e.touches[i].clientY, possibleColors[Math.floor(Math.random() * possibleColors.length)]);
                        }
                    }
                }

                function onMouseMove(e) {
                    cursor.x = e.clientX;
                    cursor.y = e.clientY;

                    addParticle(cursor.x, cursor.y, possibleColors[Math.floor(Math.random() * possibleColors.length)]);
                }

                function addParticle(x, y, color) {
                    var particle = new Particle();
                    particle.init(x, y, color);
                    particles.push(particle);
                }

                function updateParticles() {

                    // Updated
                    for (var i = 0; i < particles.length; i++) {
                        particles[i].update();
                    }

                    // Remove dead particles
                    for (var i = particles.length - 1; i >= 0; i--) {
                        if (particles[i].lifeSpan < 0) {
                            particles[i].die();
                            particles.splice(i, 1);
                        }
                    }

                }

                function loop() {
                    requestAnimationFrame(loop);
                    updateParticles();
                }

                /**
                 * Particles
                 */

                function Particle() {

                    this.character = "*";
                    this.lifeSpan = 120; //ms
                    this.initialStyles = {
                        "position": "absolute",
                        "display": "block",
                        "pointerEvents": "none",
                        "z-index": "10000000",
                        "fontSize": "16px",
                        "will-change": "transform"
                    };

                    // Init, and set properties
                    this.init = function (x, y, color) {

                        this.velocity = {
                            x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
                            y: 1
                        };

                        this.position = {x: x - 10, y: y - 20};
                        this.initialStyles.color = color;

                        this.element = document.createElement('span');
                        this.element.innerHTML = this.character;
                        applyProperties(this.element, this.initialStyles);
                        this.update();

                        document.body.appendChild(this.element);
                    };

                    this.update = function () {
                        this.position.x += this.velocity.x;
                        this.position.y += this.velocity.y;
                        this.lifeSpan--;

                        this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px,0) scale(" + (this.lifeSpan / 120) + ")";
                    };

                    this.die = function () {
                        this.element.parentNode.removeChild(this.element);
                    }

                }

                /**
                 * Utils
                 */

                // Applies css `properties` to an element.
                function applyProperties(target, properties) {
                    for (var key in properties) {
                        target.style[key] = properties[key];
                    }
                }

                init();
            })();

        }
    });
}