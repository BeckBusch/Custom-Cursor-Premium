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
            trail();
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
                        n.style.zIndex = '1000';
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
        else if (obj['trail'] === "osu") {
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
                    n.style.zIndex = '1000';
                    n.style.height = "20px";
                    n.style.width = "20px";
                    n.style.borderRadius = "10px";
                    n.style.background = "#ffeb21";
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
                    x += (nextDot.x - dot.x) * .55;
                    y += (nextDot.y - dot.y) * .55;

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
        }
        else if (obj['trail'] === "Tfairy") {
            (function fairyDustCursor() {
                var possibleColors = ["#D61C59", "#E7D84B", "#1B8798"];
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
                }

                function onMouseMove(e) {
                    cursor.x = e.pageX;
                    cursor.y = e.pageY;
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
                        "left": "0px",
                        "top": "0px",
                        "display": "inline",
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

                        this.position = {x: x - 5, y: y - 10};
                        this.initialStyles.color = color;

                        this.element = document.createElement('div');
                        this.element.innerHTML = this.character;
                        applyProperties(this.element, this.initialStyles);
                        this.update();

                        document.body.appendChild(this.element);
                    };

                    this.update = function () {
                        this.position.x += this.velocity.x;
                        this.position.y += this.velocity.y;
                        this.lifeSpan--;

                        this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px, 0) scale(" + (this.lifeSpan / 120) + ")";
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
        else if (obj['trail'] === "Tbubbles") {
            /*!
 * Bubble Cursor.js
 * - 90's cursors collection
 * -- https://github.com/tholman/90s-cursor-effects
 * -- http://codepen.io/tholman/full/qbxxxq/
 */

            (function bubblesCursor() {

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
                }

                function onMouseMove(e) {
                    cursor.x = e.pageX;
                    cursor.y = e.pageY;

                    addParticle(cursor.x, cursor.y);
                }

                function addParticle(x, y) {
                    var particle = new Particle();
                    particle.init(x, y);
                    particles.push(particle);
                }

                function updateParticles() {

                    // Update
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

                    this.lifeSpan = 250; //ms
                    this.initialStyles = {
                        "position": "absolute",
                        "left": "0px",
                        "top": "0px",
                        "display": "block",
                        "pointerEvents": "none",
                        "z-index": "10000000",
                        "width": "5px",
                        "height": "5px",
                        "background": "#e6f1f7",
                        "box-shadow": "-1px 0px #6badd3, 0px -1px #6badd3, 1px 0px #3a92c5, 0px 1px #3a92c5",
                        "border-radius": "1px",
                        "will-change": "transform"
                    };

                    // Init, and set properties
                    this.init = function (x, y) {

                        this.velocity = {
                            x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 10),
                            y: (-.4 + (Math.random() * -1))
                        };

                        this.position = {x: x - 10, y: y - 10};

                        this.element = document.createElement('span');
                        applyProperties(this.element, this.initialStyles);
                        this.update();

                        document.body.appendChild(this.element);
                    };

                    this.update = function () {
                        this.position.x += this.velocity.x;
                        this.position.y += this.velocity.y;

                        // Update velocities
                        this.velocity.x += (Math.random() < 0.5 ? -1 : 1) * 2 / 75;
                        this.velocity.y -= Math.random() / 600;
                        this.lifeSpan--;

                        this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px,0) scale(" + (0.2 + (250 - this.lifeSpan) / 250) + ")";
                    }

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
        else if (obj['trail'] === "Tbats"){
            /*!
 * Bats Cursor.js
 * - 90's cursors collection
 * -- https://github.com/tholman/90s-cursor-effects
 * -- http://codepen.io/tholman/full/kkmZyq/
 */

            (function batCursor() {

                var width = window.innerWidth;
                var height = window.innerHeight;
                var cursor = {x: width/2, y: width/2};
                var particles = [];

                function init() {
                    bindEvents();
                    attachInitialParticleStyles();
                    loop();
                }

                // Bind events that are needed
                function bindEvents() {
                    document.addEventListener('mousemove', onMouseMove);
                }

                function onMouseMove(e) {
                    cursor.x = e.pageX;
                    cursor.y = e.pageY;
                    addParticle( cursor.x, cursor.y);
                }

                function addParticle(x, y) {
                    var particle = new Particle();
                    particle.init(x, y);
                    particles.push(particle);
                }

                function updateParticles() {

                    // Update
                    for( var i = 0; i < particles.length; i++ ) {
                        particles[i].update();
                    }

                    // Remove dead particles
                    for( var i = particles.length - 1; i >= 0; i-- ) {
                        if( particles[i].lifeSpan < 0 ) {
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

                    this.lifeSpan = 100; //ms

                    // Init, and set properties
                    this.init = function(x, y) {

                        this.velocity = {
                            x:  (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 2),
                            y: (-2.5 + (Math.random() * -1))
                        };

                        this.position = {x: x - 15, y: y - 15};

                        this.element = document.createElement('div');
                        this.element.className = "particle-bats";
                        this.update();

                        document.body.appendChild(this.element);
                    };

                    this.update = function() {
                        this.position.x += this.velocity.x;
                        this.position.y += this.velocity.y;

                        // Update velocities
                        this.velocity.x += (Math.random() < 0.5 ? -1 : 1) * 2 / 75;
                        this.velocity.y -= Math.random() / 600;
                        this.lifeSpan--;

                        this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px,0) scale(" + ( 0.2 + (250 - this.lifeSpan) / 500) + ")";
                    };

                    this.die = function() {
                        this.element.parentNode.removeChild(this.element);
                    }
                }

                /**
                 * Utils
                 */

                // Injects initial bat styles to the head of the page.
                function attachInitialParticleStyles() {

                    var initialStyles =
                        [
                            ".particle-bats {",
                            "position: absolute;",
                            "top: 0px;",
                            "left: 0px;",
                            "display: block;",
                            "pointer-events: none;",
                            "z-index: 10000000;",
                            "width: 20px;",
                            "height: 20px;",
                            "will-change: transform;",
                            "background-size: contain;",
                            "background-image: url('data:image/png;base64,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');",
                            "}"
                        ].join('');

                    var style = document.createElement('style');
                    style.type = 'text/css';
                    style.innerHTML = initialStyles;
                    document.getElementsByTagName('head')[0].appendChild(style)
                }
                init();
            })();
        }
        else if (obj['trail'] === "Tghost"){
            /*!
 * Ghost Cursors.js
 * - 90's cursors collection
 * -- https://github.com/tholman/90s-cursor-effects
 * -- http://codepen.io/tholman/full/oYJQZx
 */

            (function ghostCursor() {
                var width = window.innerWidth;
                var height = window.innerHeight;
                var cursor = {
                    x: width / 2,
                    y: width / 2,
                };
                var particles = [];

                function init() {
                    bindEvents();
                    attachInitialParticleStyles();
                    loop();
                }

                // Bind events that are needed
                function bindEvents() {
                    document.addEventListener("mousemove", onMouseMove);
                }

                function onMouseMove(e) {
                    cursor.x = e.pageX;
                    cursor.y = e.pageY;

                    addParticle(cursor.x, cursor.y);
                }

                function addParticle(x, y) {
                    var particle = new Particle();
                    particle.init(x, y);
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
                    // How long cursor particle will live for
                    this.maxLifeSpan = 60;

                    // Will begin fading at this point in the lifespan
                    this.fadePoint = 30;

                    this.lifeSpan = this.maxLifeSpan;

                    // Init, and set properties
                    this.init = function(x, y) {
                        this.position = {
                            x: x,
                            y: y,
                        };

                        this.element = document.createElement("span");
                        this.element.className = "particle-cursors";
                        this.update();

                        document.body.appendChild(this.element);
                    };

                    this.update = function() {
                        this.lifeSpan--;

                        this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px,0)";

                        if (this.lifeSpan < this.fadePoint) {
                            this.element.style.opacity = (this.lifeSpan - 1) / (this.fadePoint - 1);
                        }
                    };

                    this.die = function() {
                        this.element.parentNode.removeChild(this.element);
                    };
                }

                /**
                 * Utils
                 */

                // Injects initial cursor styles to the head of the page.
                function attachInitialParticleStyles() {
                    var initialStyles = [
                        ".particle-cursors {",
                        "position: absolute;",
                        "left: 0px;",
                        "top: 0px;",
                        "display: block;",
                        "pointer-events: none;",
                        "z-index: 1000000;",
                        "width: 12px;",
                        "height: 19px;",
                        "will-change: transform;",
                        "background-size: contain;",
                        "background-image: url('data:image/png;base64,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/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAA7NJREFUeAEAowNc/AEXFyPxp6WY3zQ2K0YBAwfqBgEHAAEAAgD9/fwA/P77AP4D/AADAQMABQAFAAH/AAACAAAADoGEjS/MztTBAf8DGv7/AQD/AAAA/AEAAPkC/wD3/wEA+/8DAPz+AQD/AQIAABcXI///////QEFJ/8DBw9318vUf8/DzAO7x8ADp8/AA7PXyAPP09QD18/YA+Pb1AAAXFyP///////////9AQUr/vLy/4fDp6yXw7u0A7/PxAPT49AD29vUA9fP0APX09AAAFxcj/////////////////z4+R/+9ubjm9fPuKvT48wD2+vQA9ffxAPDy7gDu8+0AABcXI///////////////////////P0BH/8HEv+v2+vEx9/nxAPX27wDx9e8A7PXtAAAXFyP///////////////////////////8/QUn/wMK/7/by7Dj28+8A8/byAO748gAAFxci/////////////////////////////////z8/Sf/Curzy9PHtP/H28QDr+PQAABcXIv/////////////////////////////////4+fv/QD5H/77AuPXu9utH6PfxAAAXFyL///////////////////////////////////////Dw8/8/QEb/vsG8+fD07k8AFxcj////////////////////////////////////////////6Ojq/z9ASf/AwMDXABcXI//////////////////////////////////////////////////h4eP/QEFK5gQAAAAAAAAAAAAAAAAAAAAA9fX4AAsLCAAAAAAAQEFLAAEAAAAAAP8A/wAAAAABAQ8AFxcj////////////9PT3/woKF/+ztLz//////0FBSv+vq6/59/PvOvL18Cf0+fQzABcXI///////9PT3/wsLGP++wML/KSo1///////h4eP/Kyo1//b08mjx9fQA9Pn1AAIAAAAA9fX4ABcWIACztav2MjQvaR4fHADDw8oAHh4cAB0gHAC1uLyXAgEBBgH/AQAAP0BJ9AsKF+XAvMDS8/LxOfL07gC/wL/tJiYx///////W1tj/LCw3//X08hH29vUAAPT49AD09fEA9vPwAPj27wD39+0A9vPvQUhIU//W1tj//////zExO//z9fEe9fbzAAD2+/cA9fn1APb17wD49uwA+PjtAPf18Aze2NvMJyYy3V5fZu7FyMX48fbtK/H07QABAAD//2frWsrkfUspAAAAAElFTkSuQmCC');",
                        "}",
                    ].join("");

                    var style = document.createElement("style");
                    style.type = "text/css";
                    style.innerHTML = initialStyles;
                    document.getElementsByTagName("head")[0].appendChild(style);
                }

                // Applies css `properties` to an element.
                function applyProperties(target, properties) {
                    for (var key in properties) {
                        target.style[key] = properties[key];
                    }
                }

                init();
            })();
        }
        else if (obj['trail'] === "Tsnow"){
            /*!
 * Snowflakes Cursor.js
 * - 90's cursors collection
 * -- https://github.com/tholman/90s-cursor-effects
 * -- http://codepen.io/tholman/full/oYJQZx
 */

            (function snowflakeCursor() {

                var possibleEmoji = ["❄️"]
                var width = window.innerWidth;
                var height = window.innerHeight;
                var cursor = {x: width/2, y: width/2};
                var particles = [];

                function init() {
                    bindEvents();
                    loop();
                }

                // Bind events that are needed
                function bindEvents() {
                    document.addEventListener('mousemove', onMouseMove);
                }

                function onMouseMove(e) {
                    cursor.x = e.pageX;
                    cursor.y = e.pageY;

                    addParticle( cursor.x, cursor.y, possibleEmoji[Math.floor(Math.random()*possibleEmoji.length)]);
                }

                function addParticle(x, y, character) {
                    var particle = new Particle();
                    particle.init(x, y, character);
                    particles.push(particle);
                }

                function updateParticles() {

                    // Updated
                    for( var i = 0; i < particles.length; i++ ) {
                        particles[i].update();
                    }

                    // Remove dead particles
                    for( var i = particles.length -1; i >= 0; i-- ) {
                        if( particles[i].lifeSpan < 0 ) {
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

                    this.initialStyles ={
                        "position": "absolute",
                        "left": "0px",
                        "top": "0px",
                        "display": "block",
                        "pointerEvents": "none",
                        "z-index": "10000000",
                        "fontSize": "16px",
                        "will-change": "transform"
                    };

                    // Init, and set properties
                    this.init = function(x, y, character) {

                        this.velocity = {
                            x:  (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
                            y: (1 + Math.random())
                        };

                        this.lifeSpan = 120 + Math.floor(Math.random() * 60); //ms

                        this.position = {x: x - 10, y: y - 10};

                        this.element = document.createElement('span');
                        this.element.innerHTML = character;
                        applyProperties(this.element, this.initialStyles);
                        this.update();

                        document.body.appendChild(this.element);
                    };

                    this.update = function() {
                        this.position.x += this.velocity.x;
                        this.position.y += this.velocity.y;

                        this.velocity.x += (Math.random() < 0.5 ? -1 : 1) * 2 / 75;
                        this.velocity.y -= Math.random() / 400;

                        this.lifeSpan--;

                        this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px,0) scale(" + (this.lifeSpan / 180) + ") rotate("
                            + (2 * this.lifeSpan) + "deg)";

                    }


                    this.die = function() {
                        this.element.parentNode.removeChild(this.element);
                    }

                }

                /**
                 * Utils
                 */

                // Applies css `properties` to an element.
                function applyProperties( target, properties ) {
                    for( var key in properties ) {
                        target.style[ key ] = properties[ key ];
                    }
                }

                init();
            })();

        }
        else if (obj['trail'] === "Temoji"){
            /*!
 * Emoji Cursor.js
 * - 90's cursors collection
 * -- https://github.com/tholman/90s-cursor-effects
 * -- http://codepen.io/tholman/full/rxJpdQ
 */

            (function emojiCursor() {

                var possibleEmoji = ["😀", "😂", "😆", "😊"];
                var width = window.innerWidth;
                var height = window.innerHeight;
                var cursor = {x: width/2, y: width/2};
                var particles = [];

                function init() {
                    bindEvents();
                    loop();
                }

                // Bind events that are needed
                function bindEvents() {
                    document.addEventListener('mousemove', onMouseMove);
                }

                function onMouseMove(e) {
                    cursor.x = e.clientX;
                    cursor.y = e.clientY;

                    addParticle( cursor.x, cursor.y, possibleEmoji[Math.floor(Math.random()*possibleEmoji.length)]);
                }

                function addParticle(x, y, character) {
                    var particle = new Particle();
                    particle.init(x, y, character);
                    particles.push(particle);
                }

                function updateParticles() {

                    // Updated
                    for( var i = 0; i < particles.length; i++ ) {
                        particles[i].update();
                    }

                    // Remove dead particles
                    for( var i = particles.length -1; i >= 0; i-- ) {
                        if( particles[i].lifeSpan < 0 ) {
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

                    this.lifeSpan = 120; //ms
                    this.initialStyles ={
                        "position": "fixed",
                        "top": "0",
                        "display": "block",
                        "pointerEvents": "none",
                        "z-index": "10000000",
                        "fontSize": "24px",
                        "will-change": "transform"
                    };

                    // Init, and set properties
                    this.init = function(x, y, character) {

                        this.velocity = {
                            x:  (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
                            y: 1
                        };

                        this.position = {x: x - 10, y: y - 20};

                        this.element = document.createElement('span');
                        this.element.innerHTML = character;
                        applyProperties(this.element, this.initialStyles);
                        this.update();

                        document.body.appendChild(this.element);
                    };

                    this.update = function() {
                        this.position.x += this.velocity.x;
                        this.position.y += this.velocity.y;
                        this.lifeSpan--;

                        this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px,0) scale(" + (this.lifeSpan / 160) + ")";
                    }

                    this.die = function() {
                        this.element.parentNode.removeChild(this.element);
                    }
                }

                /**
                 * Utils
                 */

                // Applies css `properties` to an element.
                function applyProperties( target, properties ) {
                    for( var key in properties ) {
                        target.style[ key ] = properties[ key ];
                    }
                }

                init();
            })();
        }
    });
}