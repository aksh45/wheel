(() => {
    "use strict";
    var e = {
            583: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.Component = void 0, t.Component = class {
                    constructor(e) {
                        this.el = e
                    }
                    removeChildren() {
                        if (this.el.childNodes.length > 0)
                            for (; this.el.firstChild;) this.el.removeChild(this.el.firstChild)
                    }
                }
            },
            983: (e, t, o) => {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.ItemRemoval = void 0;
                const a = o(583);
                class n extends a.Component {
                    constructor(e) {
                        const t = document.createElement("img");
                        t.src = "/static/close.png", t.alt = "delete", t.className = "item-delete", t.id = `${e}-delete`, super(t)
                    }
                }
                t.ItemRemoval = n
            },
            658: (e, t, o) => {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.MenuItem = void 0;
                const a = o(583),
                    n = o(983);
                class l extends a.Component {
                    constructor(e, t, o) {
                        const a = new n.ItemRemoval(e),
                            l = document.createElement("li");
                        l.className = "menu-item", l.id = `${e}-item`, l.textContent = t, l.style.backgroundColor = o, l.appendChild(a.el), super(l), this.deleteItem = a, this.appearAnimation()
                    }
                    appearAnimation() {
                        this.el.animate([{
                            transform: "scale(1.25)"
                        }, {
                            transform: "scale(1.00)"
                        }], {
                            duration: 500
                        })
                    }
                }
                t.MenuItem = l
            },
            191: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.ItemList = void 0, t.ItemList = class {
                    constructor(e) {
                        this.items = [], this.maximumSize = e
                    }
                    add(e) {
                        this.items.length < this.maximumSize && this.items.push(e)
                    }
                    removeById(e) {
                        const t = this.items.find((t => t.id === e));
                        t && this.remove(t)
                    }
                    remove(e) {
                        this.items.splice(this.items.indexOf(e), 1)
                    }
                    clear() {
                        this.items = []
                    }
                }
            },
            418: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.Item = void 0, t.Item = class {
                    constructor(e, t, o) {
                        this.id = e, this.name = t, this.color = o
                    }
                }
            },
            497: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.IdPool = void 0;
                class o {
                    static initializeIdsPool(e) {
                        for (let t = 1; t <= e; t++) o.avaliableIds[t] = t
                    }
                    static getAnId() {
                        const e = this.avaliableIds.pop();
                        if (e) return e;
                        alert("Maxiumum number of items!")
                    }
                    static addId(e) {
                        this.avaliableIds.push(e)
                    }
                }
                t.IdPool = o, o.avaliableIds = []
            },
            617: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.LightDarkMode = void 0, t.LightDarkMode = class {}
            },
            974: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.avaliableRGBs = void 0, t.avaliableRGBs = ["rgba(255, 0, 0, 0.5)", "rgba(0, 255, 0, 0.5)", "rgba(0, 0, 255, 0.5)", "rgba(255, 255, 0, 0.5)", "rgba(0, 255, 255, 0.5)", "rgba(205, 127, 50, 0.5)", "rgba(115, 147, 179, 0.5)", "rgba(255, 117, 24, 0.5)", "rgba(255, 0, 255, 0.5)", "rgba(191, 64, 191, 0.5)", "rgba(47, 197, 114, 0.5)", "rgba(255, 222, 173, 0.5)", "rgba(204, 204, 255, 0.5)", "rgba(93, 63, 211, 0.5)", "rgba(250, 128, 114, 0.5)", "rgba(0, 255, 127, 0.5)"]
            }
        },
        t = {};

    function o(a) {
        var n = t[a];
        if (void 0 !== n) return n.exports;
        var l = t[a] = {
            exports: {}
        };
        return e[a](l, l.exports, o), l.exports
    }(() => {
        const e = o(658),
            t = o(418),
            a = o(191),
            n = o(497),
            l = o(617),
            i = o(974),
            s = document.getElementsByClassName("add-item-button")[0],
            r = document.querySelector("input"),
            d = document.getElementsByClassName("menu-item-list")[0],
            c = document.getElementsByClassName("counter")[0],
            m = document.getElementsByClassName("remove-all-items-button")[0],
            u = document.getElementsByClassName("light-dark-mode")[0],
            h = document.querySelector("canvas"),
            g = document.querySelector("body"),
            v = u.querySelector("img"),
            b = document.getElementsByClassName("winner")[0],
            f = document.querySelector("footer"),
            p = document.getElementsByClassName("icons-authors")[0],
            y = new Audio("/static/roulette-wheel.mp3"),
            I = h.getContext("2d"),
            M = h.width / 2,
            C = h.height / 2,
            k = h.height / 2 - 5,
            P = 1e3 / 60,
            x = new a.ItemList(16),
            E = [];
        let B = 0;

        function L() {
            c.textContent = `${x.items.length}/16`, c.animate([{
                transform: "scale(1.5)"
            }, {
                transform: "scale(1.00)"
            }], {
                duration: 500
            })
        }

        function w(e) {
            const t = 360 / E.length;
            let o = t + e;
            I.clearRect(0, 0, h.width, h.height), I.beginPath(), I.save(), I.translate(M + k + 50, C), I.lineTo(0, -20), I.lineTo(0, 20), I.lineTo(-50, 0), I.fillStyle = "#C4B454", I.fill(), I.stroke(), I.restore(), I.arc(M, C, k, 0, 2 * Math.PI), I.stroke();
            for (let a = 0; a < E.length; a++) {
                I.beginPath(), I.lineTo(M, C), I.font = "bold 24px verdana, sans-serif", I.arc(M, C, k, e * Math.PI / 180, o * Math.PI / 180), I.lineTo(M, C), I.fillStyle = x.items[a].color, I.fill(), I.save(), I.fillStyle = "black";
                const n = x.items[a].name;
                if (E.length > 1) {
                    const o = (e + t / 2) * Math.PI / 180,
                        a = M + Math.cos(o) * k / 2,
                        l = C + Math.sin(o) * k / 2;
                    I.translate(a, l), I.rotate(Math.PI / E.length + Math.PI / 180 * e), I.fillText(n, -I.measureText(n).width / 2, 0)
                } else I.fillText(n, M, C);
                I.restore(), 1 !== E.length && I.stroke(), e += t, o += t
            }
        }
        c.textContent = "0/16", y.volume = .2, l.LightDarkMode.currentMode = "dark", n.IdPool.initializeIdsPool(16), s.addEventListener("click", (() => {
            if (!_) {
                A();
                const o = r.value;
                if (o) {
                    const a = n.IdPool.getAnId();
                    if (a) {
                        r.value = "";
                        const l = i.avaliableRGBs[a % i.avaliableRGBs.length],
                            s = new t.Item(a, o, l),
                            c = new e.MenuItem(a, o, l);
                        c.deleteItem.el.addEventListener("click", (() => {
                                _ || (A(), c.el.remove(), E.splice(E.indexOf(c), 1), x.remove(s), n.IdPool.addId(s.id), L(), w(0))
                            })),
                            function(e, t) {
                                t.el.addEventListener("click", (() => {
                                    if (!_) {
                                        const o = i.avaliableRGBs.indexOf(t.el.style.backgroundColor);
                                        if (-1 !== o) {
                                            const a = i.avaliableRGBs[(o + 1) % i.avaliableRGBs.length];
                                            t.el.style.backgroundColor = a, e.color = a, w(0)
                                        }
                                    }
                                }))
                            }(s, c), x.add(s), E.push(c), d.appendChild(c.el), L(), N = Math.floor(Math.random() * E.length), S = 360 / E.length, T = 7200 + S * N, w(0)
                    }
                }
            }
        })), g.addEventListener("keyup", (e => {
            "Enter" === e.key && s.click()
        })), m.addEventListener("click", (() => {
            _ || (A(), E.length > 0 && (E.forEach((e => e.el.remove())), E.length = 0, x.clear(), n.IdPool.initializeIdsPool(16), L(), w(0)))
        })), u.addEventListener("click", (() => {
            v.animate([{
                transform: "rotate(360deg)"
            }], {
                duration: 500
            }), "dark" === l.LightDarkMode.currentMode ? (v.src = "/static/sun.png", g.style.backgroundColor = "#FAF9F6", g.style.color = "black", l.LightDarkMode.currentMode = "light") : (v.src = "/static/moon.png", g.style.backgroundColor = "#121212", g.style.color = "white", l.LightDarkMode.currentMode = "dark")
        })), w(0), h.addEventListener("click", (function() {
            E.length > 1 && !_ && (A() ? w(0) : (y.play(), s.style.background = "#C0C0C0", m.style.background = "#C0C0C0", N = Math.floor(Math.random() * E.length), O = x.items[N].name, S = 360 / E.length, B = 0, T = 7200 + (E.length - 1 - N) * S + Math.random() * S, R = T / 50 * P, j()))
        })), f.addEventListener("click", (() => {
            p.hidden = !p.hidden
        }));
        let _, O, R, N = Math.floor(Math.random() * E.length),
            S = 360 / E.length,
            T = 7200 + S * N;

        function j() {
            const e = (0, o = T, (t = B) == (a = R) ? 0 + o : o * (1 - Math.pow(2, -10 * t / a)) + 0);
            var t, o, a;
            B < R || T - e > .1 ? setTimeout((() => {
                w(e), B += P, _ = window.requestAnimationFrame(j)
            }), P) : (window.cancelAnimationFrame(_), _ = null, b.textContent = `Winner: ${O}`, s.style.background = "#6082B6", m.style.background = "#6082B6", b.animate({
                opacity: [.5, 1],
                easing: ["ease-in", "ease-out"]
            }, 1e3))
        }

        function A() {
            return !!O && (O = "", b.textContent = "", !0)
        }
    })()
})();