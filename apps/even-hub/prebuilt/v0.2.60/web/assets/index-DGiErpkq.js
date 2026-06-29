var jt = Object.defineProperty;

var Ht = (o, t, e) => t in o ? jt(o, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: e
}) : o[t] = e;

var P = (o, t, e) => Ht(o, typeof t != "symbol" ? t + "" : t, e);

(function() {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const r of document.querySelectorAll('link[rel="modulepreload"]')) n(r);
    new MutationObserver(r => {
        for (const i of r) if (i.type === "childList") for (const u of i.addedNodes) u.tagName === "LINK" && u.rel === "modulepreload" && n(u);
    }).observe(document, {
        childList: !0,
        subtree: !0
    });
    function e(r) {
        const i = {};
        return r.integrity && (i.integrity = r.integrity), r.referrerPolicy && (i.referrerPolicy = r.referrerPolicy), 
        r.crossOrigin === "use-credentials" ? i.credentials = "include" : r.crossOrigin === "anonymous" ? i.credentials = "omit" : i.credentials = "same-origin", 
        i;
    }
    function n(r) {
        if (r.ep) return;
        r.ep = !0;
        const i = e(r);
        fetch(r.href, i);
    }
})();

const a = T;

(function(o, t) {
    const e = T, n = o();
    for (;;) try {
        if (-parseInt(e(1296)) / 1 + parseInt(e(424)) / 2 * (-parseInt(e(1142)) / 3) + -parseInt(e(1345)) / 4 * (parseInt(e(821)) / 5) + -parseInt(e(760)) / 6 * (parseInt(e(718)) / 7) + parseInt(e(1367)) / 8 * (-parseInt(e(1290)) / 9) + -parseInt(e(483)) / 10 + parseInt(e(976)) / 11 * (parseInt(e(596)) / 12) === t) break;
        n.push(n.shift());
    } catch {
        n.push(n.shift());
    }
})(Ee, 305050);

var kt = Object[a(616)], Ot = Object[a(400)], Ut = Object[a(716)], Qe = Object[a(625)], Rt = Object[a(771)][a(1164)], Wt = Object.prototype.propertyIsEnumerable, $e = (o, t, e) => t in o ? kt(o, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: e
}) : o[t] = e, E = (o, t) => {
    const e = a, n = {
        WLLyI: function(i, u) {
            return i(u);
        },
        mVLjQ: function(i, u, s, f) {
            return i(u, s, f);
        }
    };
    for (var r in t || (t = {})) Rt.call(t, r) && $e(o, r, t[r]);
    if (Qe) for (var r of n[e(998)](Qe, t)) Wt[e(1355)](t, r) && n.mVLjQ($e, o, r, t[r]);
    return o;
}, O = (o, t) => Ot(o, Ut(t)), q = (o, t, e) => new Promise((n, r) => {
    const i = a, u = {
        YNDGr: "undefined",
        MmrhG: i(1204),
        qaLyx: function(l, c) {
            return l != c;
        },
        etxmO: function(l, c) {
            return l == c;
        },
        izpqa: function(l, c) {
            return l != c;
        },
        AVofO: function(l, c) {
            return l !== c;
        },
        RVQgr: i(1230),
        nejqW: i(667),
        cQSNE: i(613),
        fSVCU: "vxWKN",
        IiKPJ: i(1128),
        qxGHJ: i(1337),
        azJNt: i(634),
        mpOLv: "disconnected",
        XiJiI: i(619),
        lAMxM: function(l, c) {
            return l === c;
        },
        RHTSl: i(1396),
        exqXB: function(l, c) {
            return l(c);
        },
        qDWql: function(l, c) {
            return l(c);
        }
    };
    var s = l => {
        const c = i, x = {
            xMFxl: u[c(368)],
            KSloS: c(1260),
            TmeBR: u[c(375)],
            gglAf: function(v, g) {
                return u[c(890)](v, g);
            },
            IiZvM: function(v, g) {
                return u[c(1168)](v, g);
            },
            SwlDT: function(v, g) {
                return u.izpqa(v, g);
            },
            CeaeB: function(v, g) {
                return u.izpqa(v, g);
            }
        };
        try {
            if (u[c(841)](u[c(1297)], u.nejqW)) d(e[c(724)](l)); else {
                if (typeof _0x40d0ed == x[c(454)]) return _0x30182f[c(725)](void 0);
                let v = _0x4587b2[c(640)];
                return v && v[c(427)] ? v[c(427)](x[c(606)], _0x3cae75.stringify(_0x3c38e7)) : (_0x56d717.warn(x.TmeBR), 
                _0x314f27.resolve(void 0));
            }
        } catch (v) {
            if (u[c(841)](u[c(614)], u[c(1325)])) r(v); else {
                var h, p, w, y;
                return new _0x53f1ea({
                    uid: x[c(1280)](h = x[c(421)](_0x5c6fc9, null) ? void 0 : _0x526e1a[c(723)], null) ? h : 0,
                    name: x[c(334)](p = x.IiZvM(_0xf9619, null) ? void 0 : _0x209fce[c(1234)], null) ? p : "",
                    avatar: x[c(711)](w = x.IiZvM(_0x2d5141, null) ? void 0 : _0x22a1a0.avatar, null) ? w : "",
                    country: (y = x.IiZvM(_0x4aef52, null) ? void 0 : _0x23e9f2.country) != null ? y : ""
                });
            }
        }
    }, f = l => {
        const c = i;
        try {
            if (u[c(928)](c(1129), u[c(922)])) switch (_0x3e727e) {
              case c(1128):
                return u[c(861)];

              case u[c(629)]:
                return c(1337);

              case c(634):
                return u[c(810)];

              case u[c(356)]:
                return u[c(356)];

              case u.XiJiI:
                return u[c(765)];

              default:
                return u[c(861)];
            } else u[c(838)](d, e[c(1006)](l));
        } catch (x) {
            r(x);
        }
    }, d = l => l[i(1347)] ? n(l[i(977)]) : Promise[i(725)](l.value)[i(540)](s, f);
    u.qDWql(d, (e = e[i(659)](o, t))[i(724)]());
});

if (typeof window != a(563)) {
    let o = function(f, d) {
        const l = a, c = {
            CxHNm: function(x, h, p, w, y) {
                return x(h, p, w, y);
            },
            fEUad: "eventType",
            ILvAM: l(1264),
            kNTSa: l(1184),
            pNOGk: l(677),
            LnejT: l(1066),
            Bpily: l(983),
            cifqi: l(958),
            OtFkF: l(775),
            QwdJo: l(495),
            QeTud: l(889),
            qVRkQ: l(1034),
            lmSOe: function(x, h) {
                return x !== h;
            }
        };
        try {
            if (c[l(1295)]("EBYqm", l(916))) {
                if (!_0x1049ba(_0x55c8ac)) return new _0x276301;
                let x = c[l(888)](_0x4a82bc, _0xd9309f, c[l(1353)], c[l(348)], l(952));
                return new _0x23f2f9({
                    containerID: c[l(888)](_0x3397ec, _0xf90f0, c[l(1326)], c.pNOGk, c[l(755)]),
                    containerName: _0x1cc918(_0x5c9bd8, l(876), c[l(1211)], c.cifqi),
                    currentSelectItemName: c[l(888)](_0x38aa84, _0x2cf8a5, c.OtFkF, l(445), c[l(1115)]),
                    currentSelectItemIndex: c[l(888)](_0x4f44c8, _0x5dde70, l(385), c[l(398)], c[l(1134)]),
                    eventType: _0x2fbc09[l(1027)](x)
                });
            } else window[l(859)](new CustomEvent("shadow-timer:" + f, {
                detail: d
            }));
        } catch {}
    }, t = new Map, e = 1, n = window[a(530)][a(1379)](window), r = window.setInterval[a(1379)](window), i = window.clearTimeout.bind(window), u = window.clearInterval[a(1379)](window), s = a(1061);
    window[a(681)] = (f, d, ...l) => {
        const c = a, x = {
            nRUaf: function(v, g) {
                return v(g);
            },
            urnlw: c(363),
            IyYGL: c(676),
            AGNso: "X_Position",
            FuViE: function(v, g) {
                return v(g);
            },
            IjmqL: c(1099),
            iDceS: c(1248),
            VSQpK: c(819),
            yzzaZ: c(639),
            kmPgG: c(339),
            vLZCi: function(v, g) {
                return v(g);
            },
            mnbKw: c(876),
            Exqde: c(983),
            XQnDl: "Container_Name",
            aLYXb: function(v, g) {
                return v === g;
            },
            QKgek: c(504),
            DhmRM: function(v, g) {
                return v !== g;
            },
            krInr: c(438),
            hWJcX: function(v, g) {
                return v != g;
            },
            CiPSA: c(833),
            uKljB: function(v, g, L) {
                return v(g, L);
            },
            QYZKn: c(964),
            FXmwP: function(v) {
                return v();
            },
            yvKtZ: function(v, g) {
                return v != g;
            },
            VYAnV: "function",
            JLoPI: function(v, g, L, ...D) {
                return v(g, L, ...D);
            },
            ijKuH: function(v, g) {
                return v || g;
            },
            wTUiR: function(v, g) {
                return v + g;
            }
        };
        if (x[c(1394)](typeof f, x.VYAnV)) return x[c(1299)](r, f, d, ...l);
        let h = e++, p = Math[c(507)](+x[c(658)](d, 0), 1), w = () => {
            const v = c, g = {
                ZGVst: function(L, D) {
                    return x[T(1158)](L, D);
                },
                OKaWk: function(L, D, I, z, B) {
                    return L(D, I, z, B);
                },
                GKWhS: x[v(736)],
                VuJRQ: x[v(1160)],
                XnQJc: x[v(1019)],
                xpuUl: function(L, D) {
                    return x[v(413)](L, D);
                },
                TrCSy: x[v(749)],
                QIugj: x.iDceS,
                miziU: function(L, D, I, z) {
                    return L(D, I, z);
                },
                NlqPu: x[v(691)],
                dndMX: x.yzzaZ,
                xIvBT: x[v(920)],
                FsLCx: function(L, D, I, z, B) {
                    return L(D, I, z, B);
                },
                qwZif: function(L, D) {
                    return x.vLZCi(L, D);
                },
                TOWoz: x[v(973)],
                uToGL: x[v(717)],
                bkClV: x.XQnDl
            };
            if (x[v(1257)](x[v(984)], x[v(984)])) try {
                f(...l);
            } catch (L) {
                if (x.DhmRM(x[v(1383)], x[v(1383)])) return new _0x28e025({
                    xPosition: g[v(782)](_0x128939, g.OKaWk(_0x5e0eaf, _0x4dcdc9, g[v(1150)], g[v(1388)], g[v(364)])),
                    yPosition: g[v(879)](_0x175a21, g[v(830)](_0x1d993f, _0x427b96, g[v(1107)], "YPosition", g.QIugj)),
                    width: g[v(782)](_0xd53fd6, g[v(788)](_0x24b1d2, _0x36f2eb, g.NlqPu, "Width")),
                    height: g[v(782)](_0x56e6a8, _0x59532d(_0x5cf746, g[v(1153)], g[v(441)])),
                    containerID: _0x28c104(g[v(1133)](_0x900a2c, _0x405e14, v(1184), v(677), v(1066))),
                    containerName: g[v(1082)](_0x28c8cf, _0x14b812(_0x336857, g[v(980)], g[v(1156)], g[v(866)]))
                });
                console[v(1373)](L);
            } else (void 0)[v(723)] = _0x1e638a[v(723)], (void 0)[v(1234)] = _0xe4b889[v(1234)], 
            (void 0)[v(860)] = _0x3bc1cc[v(860)], (void 0)[v(768)] = _0x569d14[v(768)];
        }, y = {
            id: h,
            fn: w,
            delay: p,
            remaining: p,
            repeat: !0,
            cleared: !1,
            nativeId: 0,
            skipNextShadowTick: !1
        };
        return y[c(630)] = x[c(1395)](r, () => {
            const v = c;
            if (x[v(1257)](v(1402), x[v(465)])) return _0x50987d({}, x[v(419)](void 0, null) ? void 0 : {});
            y[v(699)] || (y[v(492)] = y.delay, y[v(533)] = !0, x[v(1395)](o, x.QYZKn, {
                id: h,
                delay: p
            }), x[v(1381)](w));
        }, p), console[c(930)](s, c(502) + h + c(1029) + p + "ms queued (queue=" + x[c(1302)](t[c(1146)], 1) + ")"), 
        t.set(h, y), h;
    }, window.setTimeout = (f, d, ...l) => {
        const c = a, x = {
            ADwsu: function(v, ...g) {
                return v(...g);
            },
            WuIKj: function(v) {
                return v();
            },
            sYzPI: "function",
            rclZv: function(v, g) {
                return v || g;
            },
            CcatN: function(v, g, L) {
                return v(g, L);
            }
        };
        if (typeof f != x.sYzPI) return n(f, d, ...l);
        let h = e++, p = Math.max(+x[c(1098)](d, 0), 0), w = () => {
            const v = c;
            try {
                x.ADwsu(f, ...l);
            } catch (g) {
                console[v(1373)](g);
            }
        }, y = {
            id: h,
            fn: w,
            delay: p,
            remaining: p,
            repeat: !1,
            cleared: !1,
            nativeId: 0,
            skipNextShadowTick: !1
        };
        return y[c(630)] = x.CcatN(n, () => {
            const v = c;
            y.cleared || x[v(1083)](w), t[v(1241)](h);
        }, p), t.set(h, y), h;
    }, window.clearInterval = f => {
        const d = a, l = {
            gewKb: function(x, h) {
                return x == h;
            },
            EwHPk: function(x, h) {
                return x(h);
            }
        };
        if (l[d(903)](f, null)) return;
        let c = t[d(1089)](f);
        if (!c) return l.EwHPk(u, f);
        c[d(699)] = !0, u(c[d(630)]), t[d(1241)](f);
    }, window.clearTimeout = f => {
        const d = a, l = {
            UnhjB: function(x, h) {
                return x == h;
            },
            uwztG: function(x, h) {
                return x(h);
            },
            EGUBS: function(x, h) {
                return x(h);
            }
        };
        if (l[d(728)](f, null)) return;
        let c = t.get(f);
        if (!c) return l[d(1343)](i, f);
        c[d(699)] = !0, l.EGUBS(i, c[d(630)]), t.delete(f);
    }, window[a(509)] = f => {
        const d = a, l = {
            ALPRt: function(p, w) {
                return p === w;
            },
            gNgCi: d(1023),
            SCtcy: function(p, w) {
                return p !== w;
            },
            YhxcP: d(394),
            mceDz: d(632),
            hdjyN: d(1104)
        };
        let c = 0, x = 0, h = t[d(1146)];
        for (let [p, w] of t) if (!w.cleared) if (l[d(420)](l.YhxcP, l[d(556)])) {
            if (w[d(533)]) {
                w.skipNextShadowTick = !1, w[d(492)] = w.delay, x++;
                continue;
            }
            w[d(492)] -= f, w[d(492)] <= 0 && (c++, w.fn(), w[d(549)] ? w[d(492)] = w[d(535)] : t[d(1241)](p));
        } else return l[d(1057)](_0x1a8f0a, l[d(995)]);
        o(l[d(701)], {
            elapsedMs: f,
            queueSize: h,
            fired: c,
            skipped: x
        });
    };
}

var Gt = (o => (o[a(733)] = "getUserInfo", o[a(624)] = a(647), o[a(726)] = a(800), 
o.GetLocalStorage = a(1231), o[a(1062)] = a(541), o[a(379)] = a(354), o.StopAppLocationUpdates = a(1187), 
o[a(333)] = a(873), o[a(990)] = a(1331), o.CreateStartUpPageContainer = a(946), 
o[a(740)] = "rebuildPageContainer", o.UpdateImageRawData = a(395), o[a(408)] = a(1096), 
o[a(1320)] = "audioControl", o[a(1060)] = a(934), o[a(519)] = a(1186), o))(Gt || {}), Vt = (o => (o[a(933)] = a(1028), 
o[a(1105)] = a(376), o))(Vt || {}), Ft = (o => (o[a(654)] = a(542), o.DeviceStatusChanged = a(425), 
o[a(1078)] = a(805), o[a(412)] = "evenAppLaunchSource", o.AppLocationChanged = a(1346), 
o))(Ft || {}), Xt = class ke {
    constructor(t) {
        const e = a;
        this[e(723)] = t[e(723)], this.name = t[e(1234)], this[e(860)] = t[e(860)], this[e(768)] = t.country;
    }
    toJson() {
        const t = a;
        return {
            uid: this[t(723)],
            name: this.name,
            avatar: this.avatar,
            country: this[t(768)]
        };
    }
    static [a(1027)](t) {
        const e = a, n = {
            vDAqv: function(f, d) {
                return f != d;
            },
            oEHPd: function(f, d) {
                return f == d;
            },
            vTdco: function(f, d) {
                return f == d;
            }
        };
        var r, i, u, s;
        return new ke({
            uid: n.vDAqv(r = t == null ? void 0 : t[e(723)], null) ? r : 0,
            name: (i = t == null ? void 0 : t[e(1234)]) != null ? i : "",
            avatar: (u = n.oEHPd(t, null) ? void 0 : t[e(860)]) != null ? u : "",
            country: (s = n[e(1216)](t, null) ? void 0 : t[e(768)]) != null ? s : ""
        });
    }
    static [a(1122)]() {
        return new ke({
            uid: 0,
            name: "",
            avatar: "",
            country: ""
        });
    }
}, Me = (o => (o.None = a(1128), o[a(963)] = a(1337), o[a(384)] = a(634), o[a(1303)] = a(583), 
o[a(548)] = "connectionFailed", o))(Me || {});

(o => {
    const t = a, e = {
        wOnnp: t(1128),
        VAOSh: t(1337),
        BVXJf: t(634),
        xGCfM: t(583),
        cYhtR: "connectionFailed"
    };
    function n(r) {
        const i = t;
        switch (r) {
          case e[i(403)]:
            return e.wOnnp;

          case e[i(1181)]:
            return e[i(1181)];

          case e[i(652)]:
            return e[i(652)];

          case i(583):
            return e.xGCfM;

          case i(619):
            return e[i(586)];

          default:
            return e[i(403)];
        }
    }
    o.fromString = n;
})(Me || (Me = {}));

var Oe = class Ue {
    constructor(t) {
        const e = a, n = {
            FMFfJ: function(d, l) {
                return d != l;
            },
            mmVhT: function(d, l) {
                return d != l;
            }
        };
        var r, i, u, s, f;
        this.sn = t.sn, this[e(497)] = n[e(1123)](r = t[e(497)], null) ? r : e(1128), this[e(1192)] = (i = t.isWearing) != null ? i : !1, 
        this[e(1064)] = (u = t[e(1064)]) != null ? u : 0, this[e(1266)] = n[e(1058)](s = t[e(1266)], null) ? s : !1, 
        this[e(1285)] = n[e(1123)](f = t[e(1285)], null) ? f : !1;
    }
    [a(489)]() {
        const t = a;
        return {
            sn: this.sn,
            connectType: this[t(497)],
            isWearing: this[t(1192)],
            batteryLevel: this[t(1064)],
            isCharging: this[t(1266)],
            isInCase: this.isInCase
        };
    }
    isNone() {
        const t = a, e = {
            xTKHe: function(n, r) {
                return n === r;
            },
            pMamr: t(1128)
        };
        return e[t(991)](this[t(497)], e.pMamr);
    }
    [a(650)]() {
        const t = a;
        return this[t(497)] === t(634);
    }
    [a(1219)]() {
        const t = a, e = {
            MvZHA: function(n, r) {
                return n === r;
            },
            FcJCt: t(1337)
        };
        return e[t(895)](this[t(497)], e[t(966)]);
    }
    isDisconnected() {
        const t = a;
        return {
            rfwCX: function(n, r) {
                return n === r;
            }
        }[t(694)](this[t(497)], t(583));
    }
    [a(1108)]() {
        const t = a;
        return {
            ufucb: function(n, r) {
                return n === r;
            }
        }[t(1400)](this[t(497)], t(619));
    }
    static [a(1027)](t) {
        const e = a, n = {
            vgVyo: function(l, c) {
                return l != c;
            },
            BNOMu: function(l, c) {
                return l == c;
            },
            WJlWY: function(l, c) {
                return l != c;
            },
            GCrsg: function(l, c) {
                return l != c;
            },
            pNAdB: function(l, c) {
                return l == c;
            }
        };
        var r, i, u, s, f, d;
        return new Ue({
            sn: n[e(707)](r = n[e(852)](t, null) ? void 0 : t.sn, null) ? r : "",
            connectType: Me.fromString(n[e(1067)](i = n[e(852)](t, null) ? void 0 : t[e(497)], null) ? i : ""),
            isWearing: n[e(968)](u = n.BNOMu(t, null) ? void 0 : t[e(1192)], null) ? u : !1,
            batteryLevel: n[e(968)](s = n[e(393)](t, null) ? void 0 : t[e(1064)], null) ? s : 0,
            isCharging: (f = n[e(393)](t, null) ? void 0 : t[e(1266)]) != null ? f : !1,
            isInCase: n.WJlWY(d = t == null ? void 0 : t[e(1285)], null) ? d : !1
        });
    }
    static [a(1122)](t = "") {
        const e = a, n = {
            TBjvU: e(1128)
        };
        return new Ue({
            sn: t,
            connectType: n[e(987)],
            isWearing: !1,
            batteryLevel: 0,
            isCharging: !1,
            isInCase: !1
        });
    }
}, X = (o => (o.G1 = "g1", o.G2 = "g2", o[a(488)] = a(1023), o))(X || {});

(o => {
    const t = a, e = {
        hgqjv: function(u, s) {
            return u !== s;
        },
        HPnXz: t(1308),
        qTHZE: t(1023),
        kEKMA: t(562),
        TNtYO: t(1025),
        lQszY: function(u, s) {
            return u === s;
        },
        FTdQH: function(u, s) {
            return u === s;
        }
    };
    function n(u) {
        const s = t, f = {
            vGiCF: function(d, ...l) {
                return d(...l);
            }
        };
        if (e.hgqjv(e.HPnXz, e[s(1363)])) f[s(1209)](_0x4d97db, ..._0x238326); else switch (u) {
          case "g1":
            return "g1";

          case "g2":
            return "g2";

          case e[s(887)]:
            return e[s(887)];

          default:
            return "g1";
        }
    }
    o[t(574)] = n;
    function r(u) {
        const s = t, f = {
            YMXLI: function(d, l) {
                return d === l;
            },
            NlsRL: e[s(967)]
        };
        return e.hgqjv(s(1315), e.TNtYO) ? e[s(698)](u, "g1") || e[s(945)](u, "g2") : f[s(646)](_0x3ea8a0, f[s(1120)]);
    }
    o[t(885)] = r;
    function i(u) {
        return u === "ring1";
    }
    o[t(1109)] = i;
})(X || (X = {}));

var Yt = class Dt {
    constructor(t) {
        const e = a, n = {
            YnLPb: function(i, u) {
                return i != u;
            }
        };
        var r;
        this.model = t.model, this.sn = t.sn, this[e(1246)] = n[e(573)](r = t[e(1246)], null) ? r : Oe[e(1122)](t.sn);
    }
    static fromJson(t) {
        const e = a, n = {
            MLLgK: function(f, d) {
                return f == d;
            },
            RSOeW: function(f, d) {
                return f != d;
            },
            FIITK: function(f, d, l) {
                return f(d, l);
            },
            bshoz: function(f, d) {
                return f != d;
            }
        };
        var r, i, u;
        let s = (r = n[e(671)](t, null) ? void 0 : t.sn) != null ? r : "";
        return new Dt({
            model: X[e(574)](n[e(431)](i = t == null ? void 0 : t[e(937)], null) ? i : ""),
            sn: s,
            status: Oe.fromJson(n[e(796)](O, E({}, n[e(855)](u = n.MLLgK(t, null) ? void 0 : t.status, null) ? u : {}), {
                sn: s
            }))
        });
    }
    [a(458)](t) {
        const e = a;
        ({
            gsSvj: function(r, i) {
                return r === i;
            }
        })[e(951)](t.sn, this.sn) && (this[e(1246)] = t);
    }
    [a(885)]() {
        const t = a;
        return X[t(885)](this[t(937)]);
    }
    isRing() {
        return X[a(1109)](this.model);
    }
    [a(489)]() {
        const t = a;
        return {
            model: this[t(937)],
            sn: this.sn,
            status: this[t(1246)][t(489)]()
        };
    }
};

function H(o) {
    const t = a;
    return !!o && {
        hUENU: function(n, r) {
            return n == r;
        }
    }[t(461)](typeof o, t(508)) && !Array[t(1361)](o);
}

function m(o, ...t) {
    const e = a, n = {
        VIZur: function(r, i) {
            return r !== i;
        }
    };
    for (let r of t) if (o && n[e(1178)](o[r], void 0)) return o[r];
}

function et(o) {
    const t = a;
    return {
        XhDbc: function(n, r) {
            return n(r);
        }
    }.XhDbc(String, o).replace(/_/g, "")[t(988)]();
}

function j(o, ...t) {
    const e = a, n = {
        EUgPI: function(u, s, ...f) {
            return u(s, ...f);
        },
        GMHIw: function(u, s) {
            return u !== s;
        },
        XgVgf: function(u, s) {
            return u(s);
        },
        pHsEj: function(u, s) {
            return u === s;
        },
        fhPiX: function(u, s) {
            return u === s;
        }
    };
    let r = n.EUgPI(m, o, ...t);
    if (n.GMHIw(r, void 0)) return r;
    if (!n.XgVgf(H, o) || n.pHsEj(t[e(1262)], 0)) return;
    let i = t[e(914)](et);
    for (let u in o) {
        if (!Object[e(771)].hasOwnProperty[e(1355)](o, u)) continue;
        let s = n[e(868)](et, u);
        for (let f = 0; f < i[e(1262)]; f++) if (n[e(1177)](s, i[f])) return o[u];
    }
}

function b(o) {
    const t = a, e = {
        bbNTZ: function(r, i) {
            return r == i;
        },
        BMSuf: function(r, i) {
            return r(i);
        }
    };
    if (e[t(1227)](o, null)) return;
    let n = e[t(544)](Number, o);
    return Number.isFinite(n) ? n : void 0;
}

function U(o) {
    const t = a, e = {
        lznQe: function(n, r) {
            return n != r;
        },
        WotvZ: function(n, r) {
            return n(r);
        }
    };
    if (e[t(1384)](o, null)) return e.WotvZ(String, o);
}

function S(o, ...t) {
    const e = a, n = {
        Jozdn: function(r, i) {
            return r(i);
        },
        uSTNI: function(r, i, ...u) {
            return r(i, ...u);
        }
    };
    return n.Jozdn(b, n[e(1073)](j, o, ...t));
}

function F(o, ...t) {
    const e = a, n = {
        wTyGd: function(i, u, ...s) {
            return i(u, ...s);
        },
        sSRod: function(i, u) {
            return i != u;
        }
    };
    let r = n.wTyGd(j, o, ...t);
    if (n[e(1387)](r, null)) return U(r);
}

function Be(o) {
    return {
        iukMc: function(n, r) {
            return n(r);
        }
    }[a(730)](H, o) ? o : {};
}

function At(o) {
    const t = a, e = {
        XTPOn: function(n, r) {
            return n == r;
        },
        idMIf: "sysEvent",
        yCEDp: t(896),
        jJUkt: t(899),
        rSzmT: function(n, r) {
            return n != r;
        },
        ZiUJX: t(953),
        sliIQ: t(1392),
        LvMHw: t(965),
        NsaNq: t(558),
        JAaeG: t(757),
        xETKr: "sys",
        WBiZR: t(1056),
        KzxRE: function(n, r) {
            return n != r;
        },
        NcdjC: function(n, r) {
            return n !== r;
        },
        EBdxe: function(n, r) {
            return n instanceof r;
        }
    };
    if (e[t(1054)](o, null)) if (e.NcdjC(t(331), t(962))) {
        if (e.XTPOn(typeof o, e[t(814)])) return o;
        if (Array[t(1361)](o)) return o[t(914)](n => Number(n) & 255);
        if (e[t(526)](o, Uint8Array)) return Array[t(947)](o);
        if (o instanceof ArrayBuffer) return Array[t(947)](new Uint8Array(o));
    } else {
        if (e[t(678)](typeof _0x59495c, t(608)) && _0x4f154c.isFinite(_0x105fa6)) switch (_0x44e7a7) {
          case 0:
            return t(965);

          case 1:
            return "textEvent";

          case 2:
            return e[t(948)];

          case 3:
            return e[t(570)];

          default:
            return e[t(1291)];
        }
        if (e[t(1041)](typeof _0x7d27b, e[t(814)])) return e.jJUkt;
        let n = _0x111713[t(906)]()[t(988)]();
        return n ? n[t(722)](e[t(1310)]) ? e[t(516)] : n.includes(e.NsaNq) ? e.JAaeG : n[t(722)](e[t(528)]) ? "sysEvent" : n[t(722)](e[t(389)]) ? t(896) : e.jJUkt : e[t(1291)];
    }
}

var Jt = (o => (o[a(891)] = a(1317), o[a(1162)] = a(1258), o))(Jt || {}), Zt = (o => (o.Low = "low", 
o[a(343)] = a(1003), o[a(697)] = a(383), o))(Zt || {});

function Re(o) {
    const t = a, e = {
        Tervs: function(n, r) {
            return n === r;
        },
        qjMmt: t(1258)
    };
    return e[t(729)](o, e.qjMmt) ? e[t(1114)] : t(1317);
}

function tt(o) {
    const t = a, e = {
        NbPZE: function(u, s) {
            return u(s);
        },
        LCTWL: "lat",
        HkmLz: function(u, s, f, d, l) {
            return u(s, f, d, l);
        },
        qFwrV: t(769),
        UcIlj: t(709),
        IEEnT: function(u, s) {
            return u(s);
        },
        uZzCa: function(u, s, f, d) {
            return u(s, f, d);
        },
        JqfNT: t(1009),
        dZYYH: t(842),
        BjSrH: t(737),
        pgGdT: function(u, s, f) {
            return u(s, f);
        },
        crUdf: t(626),
        TnOaq: "timestamp",
        OfWpF: t(825)
    };
    if (!e[t(607)](H, o)) return null;
    let n = S(o, t(1229), e[t(938)]), r = e[t(857)](S, o, t(1088), e[t(560)], e.UcIlj);
    if (!Qt(n) || !e[t(1338)]($t, r)) return null;
    let i = {
        latitude: n,
        longitude: r
    };
    return e.uZzCa(Z, i, e[t(1001)], S(o, e[t(1001)])), e.uZzCa(Z, i, t(842), S(o, e[t(969)])), 
    e[t(460)](Z, i, e.BjSrH, e[t(702)](S, o, t(737))), e[t(460)](Z, i, e[t(382)], e[t(702)](S, o, e[t(382)])), 
    e[t(460)](Z, i, e.TnOaq, e[t(460)](S, o, e[t(1124)], e[t(330)])), i;
}

function nt(o) {
    const t = a, e = {
        jMkgS: function(f, d) {
            return f(d);
        },
        QRAiy: function(f, d, l) {
            return f(d, l);
        },
        FrQyu: t(1234),
        IhpLs: function(f, d, l, c) {
            return f(d, l, c);
        },
        vmOpX: "mimeType",
        yMNtT: t(475),
        ZKWEc: t(1146),
        irCBe: function(f, d) {
            return f == d;
        }
    };
    if (!e.jMkgS(H, o)) return null;
    let n = e.QRAiy(F, o, t(970)), r = F(o, e[t(1283)]), i = e[t(942)](F, o, e[t(402)], e[t(669)]), u = e[t(1401)](S, o, e[t(590)]), s = F(o, t(869));
    return !n || !r || !i || e[t(559)](u, null) || !s ? null : {
        path: n,
        name: r,
        mimeType: i,
        size: u,
        base64: s
    };
}

function Z(o, t, e) {
    e !== void 0 && (o[t] = e);
}

function Qt(o) {
    const t = a, e = {
        rrznq: function(n, r) {
            return n !== r;
        },
        QmKvR: function(n, r) {
            return n <= r;
        }
    };
    return e[t(341)](o, void 0) && o >= -90 && e.QmKvR(o, 90);
}

function $t(o) {
    return o !== void 0 && {
        fVIiR: function(e, n) {
            return e >= n;
        }
    }.fVIiR(o, -180) && o <= 180;
}

var en = (o => (o[a(1356)] = a(1356), o.APP_REQUEST_CREATE_INVAILD_CONTAINER = a(1213), 
o[a(719)] = a(719), o.APP_REQUEST_CREATE_OUTOFMEMORY_CONTAINER = a(1093), o.APP_REQUEST_UPGRADE_IMAGE_RAW_DATA_SUCCESS = a(956), 
o[a(1399)] = a(1399), o.APP_REQUEST_REBUILD_PAGE_SUCCESS = a(1154), o[a(469)] = a(469), 
o[a(882)] = a(882), o[a(1052)] = a(1052), o.APP_REQUEST_UPGRADE_SHUTDOWN_SUCCESS = a(456), 
o[a(770)] = "APP_REQUEST_UPGRADE_SHUTDOWN_FAILED", o[a(1140)] = a(1140), o[a(406)] = a(406), 
o[a(653)] = a(653), o))(en || {}), tn = (o => (o[o[a(355)] = 100] = a(355), o[o[a(1014)] = 200] = a(1014), 
o[o[a(610)] = 300] = a(610), o[o[a(593)] = 400] = "P400", o[o[a(645)] = 500] = "P500", 
o[o.P600 = 600] = "P600", o[o.P700 = 700] = a(447), o[o.P800 = 800] = a(1198), o[o[a(1307)] = 900] = a(1307), 
o[o.P1000 = 1e3] = a(832), o))(tn || {}), We = class ge {
    constructor(t = {}) {
        Object[a(959)](this, t);
    }
    static [a(1027)](t) {
        const e = a, n = {
            FsOsS: function(r, i, u, s, f) {
                return r(i, u, s, f);
            },
            pXMBY: e(1372),
            bQaUR: e(971),
            zkwUW: function(r, i) {
                return r(i);
            },
            IMauv: function(r, i, u, s, f) {
                return r(i, u, s, f);
            },
            XwLaK: e(572),
            nXSia: e(1135),
            yCAHr: e(776),
            vibaZ: "Is_Item_Select_Border_En",
            ZUsMo: function(r, i, u, s, f) {
                return r(i, u, s, f);
            },
            xaOMj: "itemName",
            pPdYS: e(512),
            knhKm: "Item_Name"
        };
        return new ge({
            itemCount: b(n[e(1079)](m, t, n.pXMBY, e(1125), n[e(1121)])),
            itemWidth: n[e(457)](b, n[e(554)](m, t, n.XwLaK, e(742), e(824))),
            isItemSelectBorderEn: b(n[e(1079)](m, t, n[e(605)], n[e(466)], n[e(1175)])),
            itemName: n[e(1217)](m, t, n[e(575)], n[e(580)], n[e(1199)])
        });
    }
    static [a(489)](t) {
        const e = a;
        return t ? {
            tPOdw: function(r, i) {
                return r instanceof i;
            }
        }[e(1389)](t, ge) ? t[e(489)]() : new ge(t)[e(489)]() : {};
    }
    [a(489)]() {
        const t = a, e = {
            VoCDz: function(n, r, i) {
                return n(r, i);
            },
            qnFlY: function(n, r) {
                return n != r;
            }
        };
        return e[t(557)](E, {}, e[t(700)](this, null) ? this : {});
    }
}, ce = class pe {
    constructor(t = {}) {
        Object.assign(this, t);
    }
    static [a(1027)](t) {
        const e = a, n = {
            ngjAt: function(i, u, s, f, d) {
                return i(u, s, f, d);
            },
            uiUzy: e(682),
            WFUUP: e(673),
            txCcO: function(i, u) {
                return i(u);
            },
            zNtLg: function(i, u, s, f, d) {
                return i(u, s, f, d);
            },
            WxBty: e(363),
            YFHry: e(676),
            nKQbM: e(767),
            QqgcX: "yPosition",
            arQSG: e(651),
            EPqHz: e(1248),
            xfoML: function(i, u) {
                return i(u);
            },
            IzhYm: function(i, u, s, f) {
                return i(u, s, f);
            },
            tKGqg: e(819),
            dWthO: e(1304),
            AFWnj: function(i, u) {
                return i(u);
            },
            RzbSq: e(339),
            LVkiq: function(i, u) {
                return i(u);
            },
            dloYK: function(i, u, s, f, d) {
                return i(u, s, f, d);
            },
            PwslM: "BorderWidth",
            cEvCh: e(741),
            orOgk: function(i, u, s, f, d) {
                return i(u, s, f, d);
            },
            oybMe: "borderColor",
            riTMO: e(366),
            gZqPQ: e(534),
            rEwRc: e(972),
            aoxcS: e(803),
            HxjtC: e(1224),
            fQrYn: function(i, u) {
                return i(u);
            },
            zjiOX: e(1340),
            hUqyP: "PaddingLength",
            CsDIU: function(i, u) {
                return i(u);
            },
            QbfJE: function(i, u, s, f, d) {
                return i(u, s, f, d);
            },
            idlzW: e(1184),
            fHFJj: "ContainerID",
            nTYwO: "Container_ID",
            vIHaV: e(876),
            VkRHP: "ContainerName",
            NYOER: e(958),
            kmfsH: function(i, u, s, f, d) {
                return i(u, s, f, d);
            }
        };
        let r = n.ngjAt(m, t, n.uiUzy, n[e(901)], e(1351));
        return new pe({
            xPosition: n[e(1077)](b, n[e(1324)](m, t, n[e(898)], n.YFHry, n[e(1272)])),
            yPosition: n[e(1077)](b, m(t, n[e(642)], n[e(1288)], n[e(1091)])),
            width: n[e(434)](b, n[e(1368)](m, t, n[e(797)], n.dWthO)),
            height: n.AFWnj(b, m(t, "height", n.RzbSq)),
            borderWidth: n[e(684)](b, n[e(568)](m, t, e(1116), n[e(524)], n.cEvCh)),
            borderColor: b(n[e(1252)](m, t, n[e(1233)], n.riTMO, n[e(401)])),
            borderRadius: b(m(t, n[e(594)], n[e(532)], n[e(1287)])),
            paddingLength: n[e(567)](b, m(t, n[e(423)], n.hUqyP, e(633))),
            containerID: n[e(390)](b, n[e(511)](m, t, n[e(1382)], n[e(703)], n[e(884)])),
            containerName: U(m(t, n[e(1225)], n.VkRHP, n[e(591)])),
            itemContainer: r ? We[e(1027)](r) : void 0,
            isEventCapture: b(n.kmfsH(m, t, "isEventCapture", e(371), "Is_event_capture"))
        });
    }
    static [a(489)](t) {
        return t ? {
            wCQFN: function(r, i) {
                return r instanceof i;
            }
        }[a(1113)](t, pe) ? t.toJson() : new pe(t).toJson() : {};
    }
    [a(489)]() {
        const t = a, e = {
            ZvEnk: function(n, r, i) {
                return n(r, i);
            },
            KJFQr: function(n, r) {
                return n != r;
            }
        };
        return e[t(1349)](O, e.ZvEnk(E, {}, e[t(627)](this, null) ? this : {}), {
            itemContainer: e[t(627)](this, null) && this[t(682)] ? We[t(489)](this[t(682)]) : void 0
        });
    }
}, W = class we {
    constructor(t = {}) {
        Object[a(959)](this, t);
    }
    static fromJson(t) {
        const e = a, n = {
            nrCBQ: function(r, i) {
                return r(i);
            },
            yBszt: function(r, i, u, s, f) {
                return r(i, u, s, f);
            },
            JIDbT: e(363),
            fnITq: e(767),
            ubRMp: e(651),
            QQUpI: e(1248),
            UBvpN: e(819),
            MBZmp: e(1304),
            CEEOZ: function(r, i, u, s) {
                return r(i, u, s);
            },
            pkVes: "height",
            vIzSw: e(1116),
            NUxfR: e(446),
            xIuNA: e(399),
            SeXEb: "BorderColor",
            JZyXl: function(r, i, u, s, f) {
                return r(i, u, s, f);
            },
            mwDzs: "BorderRadius",
            SmeNH: e(1224),
            dbbST: function(r, i) {
                return r(i);
            },
            LRgVN: function(r, i, u, s, f) {
                return r(i, u, s, f);
            },
            xUScV: "paddingLength",
            kGsBR: e(1350),
            yHCXL: "Padding_Length",
            HLiMs: function(r, i) {
                return r(i);
            },
            YZJta: e(1184),
            WnpLt: e(677),
            FCOSN: e(1066),
            rzgli: function(r, i, u, s, f) {
                return r(i, u, s, f);
            },
            dGJST: e(876),
            JNoop: e(983),
            LaEkC: "Container_Name",
            BsgFt: function(r, i, u, s, f) {
                return r(i, u, s, f);
            },
            mpluF: e(904),
            TPeEG: e(1366),
            WxnTo: function(r, i) {
                return r(i);
            },
            dCAZu: e(1360)
        };
        return new we({
            xPosition: n.nrCBQ(b, n[e(1040)](m, t, n.JIDbT, e(676), n[e(758)])),
            yPosition: b(m(t, "yPosition", n[e(907)], n[e(491)])),
            width: n[e(674)](b, m(t, n.UBvpN, n[e(880)])),
            height: n[e(674)](b, n.CEEOZ(m, t, n[e(764)], "Height")),
            borderWidth: b(n[e(1040)](m, t, n[e(386)], n[e(617)], e(741))),
            borderColor: n.nrCBQ(b, n[e(1040)](m, t, n[e(1298)], n.SeXEb, e(534))),
            borderRadius: n[e(674)](b, n[e(894)](m, t, e(972), n[e(600)], n[e(553)])),
            paddingLength: n[e(449)](b, n[e(1200)](m, t, n[e(470)], n[e(611)], n[e(875)])),
            containerID: n[e(739)](b, n.LRgVN(m, t, n[e(392)], n[e(518)], n[e(786)])),
            containerName: n.nrCBQ(U, n[e(1282)](m, t, n[e(598)], n[e(501)], n[e(756)])),
            isEventCapture: b(n.BsgFt(m, t, n[e(1327)], e(371), n[e(517)])),
            content: n.WxnTo(U, m(t, "content", n[e(1335)]))
        });
    }
    static toJson(t) {
        const e = a;
        return t ? t instanceof we ? t[e(489)]() : new we(t)[e(489)]() : {};
    }
    [a(489)]() {
        const t = a, e = {
            XMsRm: function(n, r, i) {
                return n(r, i);
            },
            NFask: function(n, r) {
                return n != r;
            }
        };
        return e.XMsRm(E, {}, e[t(762)](this, null) ? this : {});
    }
}, fe = class me {
    constructor(t = {}) {
        Object.assign(this, t);
    }
    static fromJson(t) {
        const e = a, n = {
            WnmWz: function(r, i, u, s, f) {
                return r(i, u, s, f);
            },
            ulIZq: e(676),
            MgcTo: e(767),
            KnBOK: e(1099),
            Rljaf: function(r, i) {
                return r(i);
            },
            PTAns: function(r, i, u, s) {
                return r(i, u, s);
            },
            rtXGN: e(1304),
            DTuFI: function(r, i) {
                return r(i);
            },
            bCLkB: e(639),
            oRUsA: function(r, i) {
                return r(i);
            },
            GkGdD: "ContainerID",
            aVmWA: e(1066),
            LKvRY: function(r, i, u, s, f) {
                return r(i, u, s, f);
            },
            DXxgo: "containerName"
        };
        return new me({
            xPosition: b(n[e(442)](m, t, e(363), n[e(839)], n[e(464)])),
            yPosition: b(m(t, n[e(801)], e(651), "Y_Position")),
            width: n[e(1190)](b, n[e(582)](m, t, e(819), n[e(1069)])),
            height: n.DTuFI(b, n[e(582)](m, t, n[e(1364)], e(339))),
            containerID: n[e(1026)](b, m(t, e(1184), n[e(843)], n[e(794)])),
            containerName: n.DTuFI(U, n[e(1309)](m, t, n.DXxgo, e(983), e(958)))
        });
    }
    static [a(489)](t) {
        const e = a;
        return t ? {
            TVBCF: function(r, i) {
                return r instanceof i;
            }
        }[e(772)](t, me) ? t[e(489)]() : new me(t)[e(489)]() : {};
    }
    [a(489)]() {
        return {
            zbUMN: function(e, n, r) {
                return e(n, r);
            }
        }.zbUMN(E, {}, this != null ? this : {});
    }
};

(class ye {
    constructor(t = {}) {
        Object[a(959)](this, t);
    }
    static [a(1027)](t) {
        const e = a, n = {
            bvwjf: function(r, i, u, s, f) {
                return r(i, u, s, f);
            },
            igxjW: e(1184),
            DTGXw: "ContainerID",
            emxlN: e(1066),
            tyPCT: function(r, i) {
                return r(i);
            },
            XyCxl: e(876),
            BVbdJ: e(983),
            tKAID: function(r, i) {
                return r(i);
            },
            HEGJr: "mapSessionId",
            lWkMs: e(372),
            SugSX: function(r, i, u, s, f) {
                return r(i, u, s, f);
            },
            zedGL: e(505),
            xodCh: e(1197),
            BkgbF: e(1232),
            iVIBb: e(846),
            ychzA: e(416),
            CVhTv: function(r, i, u, s, f) {
                return r(i, u, s, f);
            },
            juLaH: e(743),
            AmMCw: "MapFragmentPacketSize",
            HDXsz: "Map_Fragment_Packet_Size",
            XKEid: e(1090),
            eeirS: e(1369),
            upbIB: e(1354)
        };
        return new ye({
            containerID: b(n[e(1111)](m, t, n.igxjW, n[e(892)], n.emxlN)),
            containerName: n[e(858)](U, n[e(1111)](m, t, n[e(1263)], n[e(439)], "Container_Name")),
            mapSessionId: n[e(662)](b, m(t, n[e(599)], n.lWkMs, e(1375))),
            mapTotalSize: n[e(858)](b, n[e(1110)](m, t, n[e(478)], n[e(409)], n[e(655)])),
            compressMode: n.tyPCT(b, n[e(1110)](m, t, e(811), n[e(1143)], n[e(1254)])),
            mapFragmentIndex: b(n.CVhTv(m, t, n[e(527)], "MapFragmentIndex", e(783))),
            mapFragmentPacketSize: b(m(t, e(579), n[e(1072)], n[e(1374)])),
            mapRawData: n[e(1111)](m, t, n[e(1358)], n.eeirS, n[e(829)])
        });
    }
    static [a(489)](t) {
        const e = a;
        return t ? {
            UjMHI: function(r, i) {
                return r instanceof i;
            }
        }[e(1021)](t, ye) ? t[e(489)]() : new ye(t)[e(489)]() : {};
    }
    toJson() {
        const t = a, e = {
            VevNo: function(n, r, i) {
                return n(r, i);
            },
            dXDTr: function(n, r) {
                return n != r;
            },
            GMoSg: function(n, r) {
                return n(r);
            },
            lovbk: function(n, r) {
                return n == r;
            }
        };
        return e[t(1097)](O, e.VevNo(E, {}, e[t(761)](this, null) ? this : {}), {
            mapRawData: e[t(1046)](At, e.lovbk(this, null) ? void 0 : this.mapRawData)
        });
    }
});

var Mt = class Q {
    constructor(t = {}) {
        Object.assign(this, t);
    }
    static [a(1027)](t) {
        const e = a, n = {
            ZBdjw: function(i, u, s, f, d) {
                return i(u, s, f, d);
            },
            GqSYs: e(982),
            fpaBC: function(i, u) {
                return i(u);
            },
            oDmES: function(i, u, s, f, d) {
                return i(u, s, f, d);
            },
            epvUz: "containerID",
            ysZmw: e(677),
            gXbfJ: e(1066),
            hCeVr: function(i, u, s, f, d) {
                return i(u, s, f, d);
            },
            qfgMa: e(876),
            BHZsx: e(958)
        };
        let r = n[e(531)](m, t, n[e(347)], "ImageData", "Image_Data");
        return new Q({
            containerID: n[e(793)](b, n[e(597)](m, t, n.epvUz, n.ysZmw, n[e(1112)])),
            containerName: n[e(793)](U, n[e(1169)](m, t, n[e(813)], e(983), n[e(917)])),
            imageData: Q[e(498)](r)
        });
    }
    static [a(489)](t) {
        const e = a;
        return t ? {
            caueN: function(r, i) {
                return r instanceof i;
            }
        }[e(840)](t, Q) ? t[e(489)]() : new Q(t).toJson() : {};
    }
    static [a(498)](t) {
        const e = a, n = {
            sIajB: function(r, i) {
                return r != i;
            },
            baDCq: function(r, i) {
                return r === i;
            },
            MPzys: e(817),
            XYNIv: e(953),
            nfLav: function(r, i) {
                return r instanceof i;
            },
            YxkTo: function(r, i) {
                return r instanceof i;
            }
        };
        if (n[e(476)](t, null)) if (n.baDCq(n[e(1398)], "ApYOY")) {
            if (typeof t == n[e(1289)]) return t;
            if (Array[e(1361)](t)) return t[e(914)](r => Number(r) & 255);
            if (n[e(870)](t, Uint8Array)) return Array[e(947)](t);
            if (n.YxkTo(t, ArrayBuffer)) return Array.from(new Uint8Array(t));
        } else _0x2632b8[e(959)](this, _0x2d6790);
    }
    [a(489)]() {
        const t = a, e = {
            mnABG: function(n, r, i) {
                return n(r, i);
            },
            OmNEU: function(n, r, i) {
                return n(r, i);
            },
            UBtkX: function(n, r) {
                return n(r);
            },
            WxZLc: function(n, r) {
                return n == r;
            }
        };
        return e[t(878)](O, e[t(1193)](E, {}, this != null ? this : {}), {
            imageData: e[t(1151)](At, e[t(1055)](this, null) ? void 0 : this[t(982)])
        });
    }
}, Y = (o => (o[o[a(712)] = 0] = a(712), o[o[a(720)] = 1] = a(720), o[o[a(663)] = 2] = a(663), 
o[o[a(486)] = 3] = a(486), o))(Y || {});

(o => {
    const t = a, e = {
        TGjsc: function(i, u) {
            return i(u);
        },
        fVLVR: function(i, u, s, f, d) {
            return i(u, s, f, d);
        },
        yrtkE: t(552),
        rXWaW: t(820),
        jPWVE: function(i, u) {
            return i !== u;
        },
        QMxQM: function(i, u, s, f) {
            return i(u, s, f);
        },
        njJvj: t(883),
        PAoPg: function(i, u, s) {
            return i(u, s);
        },
        uHxIg: function(i, u) {
            return i == u;
        },
        ATBzq: function(i, u) {
            return i !== u;
        },
        UBSmX: t(1279),
        tociT: t(608),
        oBHgc: function(i, u) {
            return i(u);
        },
        LraXo: function(i, u) {
            return i == u;
        },
        sYXAg: function(i, u) {
            return i !== u;
        },
        ajshw: "CvxRm",
        jcDdi: function(i, u) {
            return i(u);
        },
        cQnMB: t(712),
        JRPrA: "oversize",
        jkaNW: t(487),
        ZwHFW: t(751),
        GaAAo: function(i, u) {
            return i(u);
        },
        YpMDC: function(i, u) {
            return i(u);
        },
        sGCCZ: function(i, u) {
            return i == u;
        },
        PfYvP: t(953),
        wiWZs: function(i, u) {
            return i(u);
        }
    };
    function n(i) {
        switch (i) {
          case 0:
            return 0;

          case 1:
            return 1;

          case 2:
            return 2;

          case 3:
            return 3;

          default:
            return 1;
        }
    }
    o[t(357)] = n;
    function r(i) {
        const u = t, s = {
            fSWAF: function(c, x) {
                return e[T(774)](c, x);
            },
            zymkx: function(c, x, h, p, w) {
                return e[T(763)](c, x, h, p, w);
            },
            useSU: e.yrtkE,
            JTuyB: u(1270),
            FpVuH: e[u(657)],
            uUhtD: function(c, x) {
                return e[u(1044)](c, x);
            },
            MfHVF: function(c, x, h, p) {
                return e[u(818)](c, x, h, p);
            },
            pIbpo: e[u(571)],
            NBVgM: u(602),
            nWAyW: function(c, x, h) {
                return e[u(690)](c, x, h);
            },
            YzPrO: function(c, x) {
                return c != x;
            },
            doYub: function(c, x) {
                return e.uHxIg(c, x);
            },
            Rjsye: function(c, x) {
                return c == x;
            },
            ffKFU: function(c, x) {
                return e.uHxIg(c, x);
            }
        };
        if (e[u(978)](e[u(1267)], e[u(1267)])) {
            let c = s[u(514)](_0x1e69c4, _0x4ec1c0), x = s[u(514)](_0x2a74a1, s[u(618)](_0x27ce10, c, s[u(668)], s[u(836)], s[u(1385)]));
            if (s[u(1294)](x, void 0)) return new _0x485462({
                audioPcm: x,
                source: s[u(514)](_0x4d60c8, s[u(649)](_0x54574e, c, s[u(785)], s[u(609)]))
            });
        } else {
            if (typeof i == e[u(1152)] && Number[u(1362)](i)) return e[u(1195)](n, i);
            if (e.LraXo(typeof i, u(953))) if (e[u(1377)](e[u(961)], u(346))) {
                let c = e[u(774)](Number, i);
                if (Number.isFinite(c)) return e[u(1201)](n, c);
                let x = i[u(906)]()[u(988)]();
                switch (x[u(722)](".") ? x[u(921)](".")[u(378)]() : x) {
                  case e[u(615)]:
                    return 0;

                  case u(720):
                    return 1;

                  case e[u(954)]:
                    return 2;

                  case e[u(337)]:
                  case e[u(808)]:
                    return 3;

                  default:
                    return 1;
                }
            } else {
                var f, d, l;
                return s[u(656)](_0x5c96f9, s.nWAyW(_0x519b20, {}, s[u(666)](this, null) ? this : {}), {
                    containerTotalNum: s.doYub(this, null) ? void 0 : this[u(484)],
                    listObject: s[u(480)](f = s[u(1339)](this, null) ? void 0 : this.listObject, null) ? void 0 : f.map(_0x4c3641[u(489)]),
                    textObject: s[u(738)](d = s[u(1339)](this, null) ? void 0 : this.textObject, null) ? void 0 : d[u(914)](_0x4916d4[u(489)]),
                    imageObject: (l = s.doYub(this, null) ? void 0 : this[u(595)]) == null ? void 0 : l[u(914)](_0x57f474[u(489)]),
                    widgetId: s[u(480)](this, null) ? void 0 : this[u(1063)]
                });
            }
            if (i && typeof i == u(508)) {
                if (e[u(905)](typeof i[u(359)], u(608))) return e.GaAAo(n, i[u(359)]);
                if (e[u(905)](typeof i[u(977)], e[u(1152)])) return e[u(1033)](n, i[u(977)]);
                if (e.sGCCZ(typeof i[u(1234)], e[u(1166)])) return e.wiWZs(r, i[u(1234)]);
            }
            return 1;
        }
    }
    o[t(1330)] = r;
})(Y || (Y = {}));

var de = (o => (o[a(712)] = a(712), o[a(500)] = a(500), o[a(974)] = a(974), o[a(1049)] = a(1049), 
o[a(562)] = a(562), o))(de || {});

(o => {
    const t = a, e = {
        ATLtw: function(c, x, h) {
            return c(x, h);
        },
        SKOMh: function(c, x) {
            return c != x;
        },
        OniyH: t(340),
        TwQqp: "HoBRL",
        GZGoA: "success",
        lDLlW: t(500),
        WLGlN: t(974),
        KTmqO: t(562),
        bqnSa: function(c, x) {
            return c(x);
        },
        vVCDz: function(c, x) {
            return c(x);
        },
        KoxDG: function(c, x) {
            return c == x;
        },
        rGRKJ: t(953),
        RdclN: t(520),
        Egoln: "imagesizeinvalid",
        tcCwG: t(1038),
        SXvcr: t(872),
        HNDwa: t(1370),
        Vrrhp: "image_to_gray4_failed",
        HavWB: t(1049),
        hJDAU: function(c, x) {
            return c === x;
        },
        cQrsa: t(608),
        kAHto: function(c, x) {
            return c(x);
        },
        OeKSQ: function(c, x) {
            return c == x;
        },
        pJgen: function(c, x) {
            return c == x;
        },
        oqmka: function(c, x) {
            return c(x);
        },
        oMHDG: function(c, x) {
            return c === x;
        },
        hAKJw: t(335),
        bwqLN: t(467),
        qQDwv: function(c, x) {
            return c === x;
        },
        ucShJ: t(1128),
        hFqMp: function(c, x) {
            return c !== x;
        },
        VZzTT: t(623),
        rqueX: "HkbTf"
    };
    function n(c) {
        const x = t;
        if (e[x(975)] === e[x(1265)]) return e[x(910)](_0x1af50c, {}, e[x(353)](this, null) ? this : {
            exitMode: 0
        });
        switch (c) {
          case e[x(455)]:
            return 0;

          case e[x(1305)]:
            return 1;

          case e[x(644)]:
            return 2;

          case "imageToGray4Failed":
            return 2;

          case e[x(404)]:
            return 3;

          default:
            return 3;
        }
    }
    o[t(1155)] = n;
    function r(c) {
        const x = t;
        switch (c) {
          case 0:
            return e.GZGoA;

          case 1:
            return x(500);

          case 2:
            return e[x(644)];

          case 3:
            return e[x(404)];

          default:
            return x(562);
        }
    }
    o[t(357)] = r;
    function i(c) {
        const x = t;
        if (e.KoxDG(typeof c, "number") && Number.isFinite(c)) return r(c);
        if (e[x(510)](typeof c, e.rGRKJ)) if (e.RdclN !== e.RdclN) {
            e.bqnSa(_0x2e3d7d, _0x178d49);
            return;
        } else {
            let h = e[x(1144)](Number, c);
            if (Number.isFinite(h)) return r(h);
            let p = c[x(906)]()[x(988)]();
            switch (p[x(722)](".") ? p[x(921)](".").pop() : p) {
              case e[x(455)]:
                return e[x(455)];

              case x(506):
                return e[x(1305)];

              case e[x(648)]:
                return x(974);

              case e[x(429)]:
              case e.SXvcr:
              case e[x(1271)]:
              case e.Vrrhp:
                return e[x(397)];

              case x(1136):
                return "sendFailed";

              default:
                return e[x(404)];
            }
        }
        if (c && e.KoxDG(typeof c, x(508))) {
            if (e[x(1249)](x(435), x(791))) return e[x(994)](_0x56077f, _0xc4991d(_0x1880e0, ..._0x200091));
            if (e[x(510)](typeof c[x(359)], e[x(1080)])) return e.kAHto(r, c.index);
            if (e[x(985)](typeof c[x(977)], e[x(1080)])) return e[x(414)](r, c[x(977)]);
            if (e[x(522)](typeof c.name, "string")) return i(c[x(1234)]);
        }
        return e[x(404)];
    }
    o.normalize = i;
    function u(c) {
        const x = t;
        return e[x(1249)](c, e[x(455)]);
    }
    o[t(1020)] = u;
    function s(c) {
        return c === e.lDLlW;
    }
    o[t(936)] = s;
    function f(c) {
        const x = t;
        return e[x(1051)](e[x(433)], e[x(798)]) ? e[x(957)](_0x132a61, _0x406567)[x(1165)](/_/g, "").toLowerCase() : e[x(1051)](c, e.WLGlN);
    }
    o[t(900)] = f;
    function d(c) {
        return e[t(1226)](c, e.HavWB);
    }
    o[t(1050)] = d;
    function l(c) {
        const x = t, h = {
            khgAA: function(L, D) {
                return e[T(353)](L, D);
            },
            GjAbB: e.ucShJ,
            ntjev: function(L, D) {
                return e.SKOMh(L, D);
            }
        };
        if (e.hFqMp(e.VZzTT, e[x(1314)])) return c === "sendFailed";
        var p, w, y, v, g;
        this.sn = _0x14633a.sn, this.connectType = h[x(926)](p = _0x52b258[x(497)], null) ? p : h.GjAbB, 
        this[x(1192)] = h[x(993)](w = _0x113d78[x(1192)], null) ? w : !1, this.batteryLevel = h[x(993)](y = _0x921e30.batteryLevel, null) ? y : 0, 
        this.isCharging = h.khgAA(v = _0x2dcc1b.isCharging, null) ? v : !1, this[x(1285)] = h.khgAA(g = _0xab6ab6[x(1285)], null) ? g : !1;
    }
    o[t(943)] = l;
})(de || (de = {}));

var Ve = class be {
    constructor(t = {}) {
        Object.assign(this, t);
    }
    static [a(1027)](t) {
        const e = a, n = {
            vQUAc: function(x, h, p, w) {
                return x(h, p, w);
            },
            eesfv: e(484),
            hikEB: function(x, h) {
                return x != h;
            },
            KSTIs: function(x, h, p, w, y) {
                return x(h, p, w, y);
            },
            FoSzr: e(523),
            iqQNW: "List_Object",
            PMWlf: "textObject",
            pwVdM: e(944),
            xuOwh: function(x, h) {
                return x != h;
            },
            bviga: function(x, h, p, w, y) {
                return x(h, p, w, y);
            },
            vNcNg: "ImageObject",
            ZXHFq: e(1171),
            nvrIS: e(1024),
            kyJFY: function(x, h, p) {
                return x(h, p);
            }
        };
        var r, i, u;
        let s = n[e(1203)](m, t, n[e(1242)], "ContainerTotalNum"), f = (n[e(1321)](r = n[e(1235)](m, t, "listObject", n.FoSzr, n[e(665)]), null) ? r : []).map(ce.fromJson), d = (n[e(1321)](i = n.KSTIs(m, t, n[e(955)], n[e(848)], "Text_Object"), null) ? i : [])[e(914)](W[e(1027)]), l = (n[e(1183)](u = n[e(1391)](m, t, e(595), n[e(911)], e(1126)), null) ? u : [])[e(914)](fe.fromJson), c = n.bviga(m, t, e(1063), n[e(473)], n[e(826)]);
        return new be(n[e(1306)](O, n[e(1306)](E, {}, n[e(1321)](t, null) ? t : {}), {
            containerTotalNum: s,
            listObject: f,
            textObject: d,
            imageObject: l,
            widgetId: c
        }));
    }
    static toJson(t) {
        const e = a;
        return t ? {
            ZVhkN: function(r, i) {
                return r instanceof i;
            }
        }[e(453)](t, be) ? t[e(489)]() : new be(t)[e(489)]() : {};
    }
    [a(489)]() {
        const t = a, e = {
            sECPZ: function(u, s, f) {
                return u(s, f);
            },
            jgjLI: function(u, s) {
                return u == s;
            },
            XtQeD: function(u, s) {
                return u == s;
            }
        };
        var n, r, i;
        return e[t(1048)](O, e.sECPZ(E, {}, this != null ? this : {}), {
            containerTotalNum: e[t(1300)](this, null) ? void 0 : this.containerTotalNum,
            listObject: (n = e[t(499)](this, null) ? void 0 : this[t(1188)]) == null ? void 0 : n[t(914)](ce[t(489)]),
            textObject: e[t(499)](r = e[t(1300)](this, null) ? void 0 : this[t(1102)], null) ? void 0 : r[t(914)](W[t(489)]),
            imageObject: (i = e[t(499)](this, null) ? void 0 : this.imageObject) == null ? void 0 : i[t(914)](fe.toJson),
            widgetId: this == null ? void 0 : this.widgetId
        });
    }
}, Fe = class Le {
    constructor(t = {}) {
        Object.assign(this, t);
    }
    static [a(1027)](t) {
        const e = a, n = {
            GwEMM: function(c, x, h, p) {
                return c(x, h, p);
            },
            SNZdp: e(484),
            LyWSc: "ContainerTotalNum",
            lKsuZ: function(c, x) {
                return c != x;
            },
            EzvTl: function(c, x, h, p, w) {
                return c(x, h, p, w);
            },
            xpzIA: e(1188),
            cTyIc: e(523),
            SUGfk: function(c, x, h, p, w) {
                return c(x, h, p, w);
            },
            yifHN: e(1102),
            MvKfn: e(944),
            MXPfK: e(545),
            HpTGM: function(c, x, h, p, w) {
                return c(x, h, p, w);
            },
            mPtKk: e(595),
            Rqfgs: e(750),
            zdLqg: function(c, x, h) {
                return c(x, h);
            }
        };
        var r, i, u;
        let s = n.GwEMM(m, t, n[e(1012)], n[e(1068)]), f = (n.lKsuZ(r = n.EzvTl(m, t, n[e(804)], n[e(871)], e(1237)), null) ? r : [])[e(914)](ce[e(1027)]), d = (n.lKsuZ(i = n[e(1094)](m, t, n[e(351)], n[e(950)], n.MXPfK), null) ? i : [])[e(914)](W[e(1027)]), l = ((u = n[e(780)](m, t, n[e(777)], n[e(1100)], e(1126))) != null ? u : [])[e(914)](fe.fromJson);
        return new Le(n[e(555)](O, n[e(555)](E, {}, t ?? {}), {
            containerTotalNum: s,
            listObject: f,
            textObject: d,
            imageObject: l
        }));
    }
    static [a(489)](t) {
        return t ? {
            RjciC: function(n, r) {
                return n instanceof r;
            }
        }.RjciC(t, Le) ? t.toJson() : new Le(t).toJson() : {};
    }
    [a(489)]() {
        const t = a, e = {
            AzWoJ: function(u, s, f) {
                return u(s, f);
            },
            fBqlN: function(u, s) {
                return u != s;
            },
            afned: function(u, s) {
                return u == s;
            },
            fsjtb: function(u, s) {
                return u == s;
            },
            NAAGp: function(u, s) {
                return u == s;
            },
            JUWbq: function(u, s) {
                return u == s;
            }
        };
        var n, r, i;
        return e[t(1031)](O, e[t(1031)](E, {}, e[t(721)](this, null) ? this : {}), {
            containerTotalNum: e.afned(this, null) ? void 0 : this[t(484)],
            listObject: (n = e[t(708)](this, null) ? void 0 : this.listObject) == null ? void 0 : n[t(914)](ce[t(489)]),
            textObject: e[t(529)](r = e.fsjtb(this, null) ? void 0 : this[t(1102)], null) ? void 0 : r[t(914)](W[t(489)]),
            imageObject: e.JUWbq(i = this == null ? void 0 : this[t(595)], null) ? void 0 : i[t(914)](fe[t(489)])
        });
    }
}, M = (o => (o[o[a(1101)] = 0] = a(1101), o[o.SCROLL_TOP_EVENT = 1] = a(735), o[o[a(631)] = 2] = a(631), 
o[o.DOUBLE_CLICK_EVENT = 3] = a(1173), o[o[a(538)] = 4] = a(538), o[o[a(919)] = 5] = "FOREGROUND_EXIT_EVENT", 
o[o[a(687)] = 6] = a(687), o[o.SYSTEM_EXIT_EVENT = 7] = a(1179), o[o[a(1086)] = 8] = "IMU_DATA_REPORT", 
o))(M || {});

(o => {
    const t = a, e = {
        vEpJe: function(r, i) {
            return r == i;
        },
        QvfNY: t(608),
        phmHP: function(r, i) {
            return r >= i;
        },
        vjEtr: function(r, i) {
            return r <= i;
        },
        RMGTQ: function(r, i) {
            return r == i;
        },
        AWxXY: t(1101),
        lXTcD: "CLICK",
        IrySq: t(735),
        bGkVH: t(822),
        ELlKd: t(1173),
        DHdVN: t(444),
        xcHcR: t(538),
        OrSNA: t(1138),
        AhYJc: t(919),
        JmWyM: t(695),
        gHJix: "ABNORMAL_EXIT",
        OfMNj: t(1179),
        TUDST: t(746),
        JjGOV: t(1030)
    };
    function n(r) {
        const i = t;
        if (e.vEpJe(typeof r, e[i(1256)]) && Number[i(1362)](r)) return e.phmHP(r, 0) && e.vjEtr(r, 8) ? r : void 0;
        if (e[i(710)](typeof r, "string")) switch (r[i(906)]().toUpperCase()) {
          case e[i(432)]:
          case e[i(1106)]:
            return 0;

          case e[i(689)]:
          case e.bGkVH:
            return 1;

          case "SCROLL_BOTTOM_EVENT":
          case i(672):
            return 2;

          case e.ELlKd:
          case e[i(1250)]:
            return 3;

          case e[i(1251)]:
          case e.OrSNA:
            return 4;

          case e[i(539)]:
          case e[i(784)]:
            return 5;

          case i(687):
          case e.gHJix:
            return 6;

          case e[i(547)]:
          case e.TUDST:
            return 7;

          case "IMU_DATA_REPORT":
          case e[i(1127)]:
          case i(377):
            return 8;

          default:
            return;
        }
    }
    o[t(1027)] = n;
})(M || (M = {}));

var Te = (o => (o[o[a(641)] = 0] = a(641), o[o[a(1017)] = 1] = "TOUCH_EVENT_FROM_GLASSES_R", 
o[o[a(1132)] = 2] = a(1132), o[o[a(370)] = 3] = "TOUCH_EVENT_FROM_GLASSES_L", o))(Te || {});

function T(o, t) {
    o = o - 330;
    const e = Ee();
    let n = e[o];
    if (T.ngcJFk === void 0) {
        var r = function(f) {
            const d = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=";
            let l = "", c = "";
            for (let x = 0, h, p, w = 0; p = f.charAt(w++); ~p && (h = x % 4 ? h * 64 + p : p, 
            x++ % 4) ? l += String.fromCharCode(255 & h >> (-2 * x & 6)) : 0) p = d.indexOf(p);
            for (let x = 0, h = l.length; x < h; x++) c += "%" + ("00" + l.charCodeAt(x).toString(16)).slice(-2);
            return decodeURIComponent(c);
        };
        T.dhFyTs = r, T.FDhtvZ = {}, T.ngcJFk = !0;
    }
    const i = e[0], u = o + i, s = T.FDhtvZ[u];
    return s ? n = s : (n = T.dhFyTs(n), T.FDhtvZ[u] = n), n;
}

(o => {
    const t = a, e = {
        iyaGJ: function(r, i) {
            return r instanceof i;
        },
        NHUQr: function(r, i) {
            return r !== i;
        },
        Asiys: t(471),
        SgoPN: function(r, i) {
            return r == i;
        },
        bTNUf: t(608),
        DuoSA: function(r, i) {
            return r <= i;
        },
        NWqaK: function(r, i) {
            return r == i;
        },
        LERJf: "string",
        weQFx: t(641),
        heEMd: "DUMMY_NULL",
        qHgLc: t(1017),
        YvmFq: "GLASSES_R",
        NDIqW: "RING",
        zpxdB: t(1007)
    };
    function n(r) {
        const i = t, u = {
            uGpko: function(s, f) {
                return e[T(436)](s, f);
            }
        };
        if (e[i(543)](e.Asiys, e[i(428)])) return _0x65f8f5 ? u[i(1212)](_0x94cecb, _0x5792b5) ? _0x2d31e8[i(489)]() : new _0xb0dcc5(_0xf09602)[i(489)]() : {};
        if (e.SgoPN(typeof r, e[i(584)]) && Number[i(1362)](r)) return r >= 0 && e[i(1002)](r, 3) ? r : void 0;
        if (e[i(1333)](typeof r, e[i(1011)])) switch (r.trim()[i(686)]()) {
          case e[i(1118)]:
          case i(1172):
          case e[i(715)]:
            return 0;

          case e[i(472)]:
          case e[i(452)]:
            return 1;

          case i(1132):
          case e[i(835)]:
            return 2;

          case i(370):
          case e.zpxdB:
            return 3;

          default:
            return;
        }
    }
    o[t(1027)] = n;
})(Te || (Te = {}));

var nn = class $ {
    constructor(t = {}) {
        Object[a(959)](this, t);
    }
    static [a(1027)](t) {
        const e = a, n = {
            ywRtg: function(i, u) {
                return i(u);
            },
            nMTdQ: function(i, u, s, f, d) {
                return i(u, s, f, d);
            },
            pacUB: e(546),
            Lllza: e(1264),
            pyLgQ: e(952),
            LFjEA: e(1184),
            vFBWh: e(1066),
            CiMvZ: function(i, u, s, f, d) {
                return i(u, s, f, d);
            },
            fPmKT: "containerName",
            vUrnH: e(983),
            RdsPC: function(i, u, s, f, d) {
                return i(u, s, f, d);
            },
            dWAuP: e(775),
            smPTQ: e(445),
            TQFYn: "CurrentSelect_ItemName",
            oUxYU: function(i, u, s, f, d) {
                return i(u, s, f, d);
            },
            ucWIg: e(385),
            FLNFj: "CurrentSelectItemIndex",
            hdwRd: "CurrentSelect_ItemIndex"
        };
        if (!n[e(778)](H, t)) return new $;
        let r = n.nMTdQ(j, t, n[e(1039)], n.Lllza, n[e(1318)]);
        return new $({
            containerID: n[e(679)](S, t, n[e(1277)], "ContainerID", n.vFBWh),
            containerName: n[e(874)](F, t, n[e(1174)], n[e(612)], e(958)),
            currentSelectItemName: n.RdsPC(F, t, n[e(792)], n[e(474)], n[e(1137)]),
            currentSelectItemIndex: n[e(342)](S, t, n[e(1214)], n[e(1238)], n.hdwRd),
            eventType: M[e(1027)](r)
        });
    }
    static [a(489)](t) {
        const e = a;
        return t ? {
            gYhzo: function(r, i) {
                return r instanceof i;
            }
        }[e(601)](t, $) ? t[e(489)]() : new $(t)[e(489)]() : {};
    }
    [a(489)]() {
        return E({}, this != null ? this : {});
    }
}, rn = class ee {
    constructor(t = {}) {
        Object.assign(this, t);
    }
    static [a(1027)](t) {
        const e = a, n = {
            uQgsX: function(i, u) {
                return i(u);
            },
            Oulhh: function(i, u, s, f, d) {
                return i(u, s, f, d);
            },
            lFigA: "eventType",
            fFGqX: e(1264),
            GdWFa: e(952),
            LVHRR: function(i, u, s, f, d) {
                return i(u, s, f, d);
            },
            nRYjG: e(1184),
            UJrnZ: "ContainerID",
            QbHqe: e(1066),
            MxXcE: e(876),
            fgvyU: e(983),
            HjvUT: e(958)
        };
        if (!n[e(1312)](H, t)) return new ee;
        let r = n[e(521)](j, t, n[e(1205)], n.fFGqX, n[e(790)]);
        return new ee({
            containerID: n[e(1147)](S, t, n[e(1371)], n[e(493)], n[e(451)]),
            containerName: n[e(1147)](F, t, n.MxXcE, n.fgvyU, n.HjvUT),
            eventType: M[e(1027)](r)
        });
    }
    static [a(489)](t) {
        const e = a;
        return t ? {
            OwYMZ: function(r, i) {
                return r instanceof i;
            }
        }[e(815)](t, ee) ? t[e(489)]() : new ee(t)[e(489)]() : {};
    }
    toJson() {
        const t = a, e = {
            EtwRF: function(n, r, i) {
                return n(r, i);
            },
            zQNgT: function(n, r) {
                return n != r;
            }
        };
        return e[t(660)](E, {}, e[t(1037)](this, null) ? this : {});
    }
}, on = class te {
    constructor(t = {}) {
        Object[a(959)](this, t);
    }
    static [a(1027)](t) {
        const e = a, n = {
            VblxN: function(r, i) {
                return r(i);
            },
            Gasog: function(r, i, u, s) {
                return r(i, u, s);
            }
        };
        return n[e(1328)](H, t) ? new te({
            x: n[e(1084)](S, t, "x", "X"),
            y: n[e(1084)](S, t, "y", "Y"),
            z: S(t, "z", "Z")
        }) : new te;
    }
    static [a(489)](t) {
        const e = a;
        return t ? {
            aArhw: function(r, i) {
                return r instanceof i;
            }
        }[e(908)](t, te) ? t[e(489)]() : new te(t)[e(489)]() : {};
    }
    [a(489)]() {
        return E({}, {
            wevMx: function(n, r) {
                return n != r;
            }
        }[a(823)](this, null) ? this : {});
    }
}, un = class ne {
    constructor(t = {}) {
        Object[a(959)](this, t);
    }
    static [a(1027)](t) {
        const e = a, n = {
            QPhXF: function(f, d) {
                return f(d);
            },
            EbSgz: function(f, d, l, c, x) {
                return f(d, l, c, x);
            },
            qGSIu: e(546),
            Ppzbh: "Event_Type",
            dxyih: "eventSource",
            JtfON: e(713),
            JGyyJ: function(f, d, l, c, x, h) {
                return f(d, l, c, x, h);
            },
            Jtouy: e(1141),
            BWXFG: "IMU_Data",
            RZYxM: e(381),
            tegUI: function(f, d) {
                return f(d);
            },
            PGRbr: function(f, d, l, c) {
                return f(d, l, c);
            },
            qwlOl: e(1269),
            qIDeK: e(881)
        };
        if (!n[e(924)](H, t)) return new ne;
        let r = n[e(748)](j, t, n[e(1167)], e(1264), n.Ppzbh), i = j(t, n[e(588)], n[e(918)]), u = n.JGyyJ(j, t, n[e(787)], e(745), n.BWXFG, n[e(675)]), s;
        return n[e(1243)](H, u) && (s = on.fromJson(u)), new ne({
            eventType: M.fromJson(r),
            eventSource: Te[e(1027)](i),
            imuData: s,
            systemExitReasonCode: n[e(1293)](S, t, n[e(1085)], n[e(415)])
        });
    }
    static [a(489)](t) {
        const e = a;
        return t ? {
            FDLdn: function(r, i) {
                return r instanceof i;
            }
        }[e(485)](t, ne) ? t.toJson() : new ne(t)[e(489)]() : {};
    }
    [a(489)]() {
        const t = a, e = {
            mvMHn: function(n, r, i) {
                return n(r, i);
            },
            HvTeD: function(n, r) {
                return n != r;
            }
        };
        return e[t(565)](E, {}, e[t(752)](this, null) ? this : {});
    }
}, an = class Ge {
    constructor(t) {
        const e = a, n = {
            sIXmw: function(i, u) {
                return i != u;
            }
        };
        var r;
        this[e(552)] = t.audioPcm, this[e(883)] = n.sIXmw(r = t[e(883)], null) ? r : e(1317);
    }
    static [a(1027)](t) {
        const e = a, n = {
            NawOL: function(u, s) {
                return u(s);
            },
            ybZcf: function(u, s) {
                return u != s;
            },
            MtVQx: function(u, s, f, d, l) {
                return u(s, f, d, l);
            },
            eHrmo: e(552),
            npKVu: e(1270),
            XNkxC: e(820),
            aBBfQ: function(u, s) {
                return u(s);
            },
            tlEty: function(u, s, f, d) {
                return u(s, f, d);
            },
            OlMnH: e(602)
        };
        var r;
        let i = n[e(345)](Be, t);
        return new Ge({
            audioPcm: n[e(949)](r = rt(n.MtVQx(j, i, n[e(349)], n[e(1316)], n[e(1239)])), null) ? r : new Uint8Array(0),
            source: n.aBBfQ(Re, n[e(1261)](j, i, "source", n[e(753)]))
        });
    }
    static [a(1207)](t) {
        const e = a, n = {
            praun: function(u, s) {
                return u(s);
            },
            ZHTze: function(u, s, f, d, l) {
                return u(s, f, d, l);
            },
            eSeDn: e(552),
            OSUsH: e(1270),
            VGWki: e(820),
            qFOLG: function(u, s, f, d) {
                return u(s, f, d);
            },
            oLvsZ: e(883),
            vtQPh: e(602)
        };
        let r = n[e(999)](Be, t), i = rt(n[e(902)](j, r, n[e(1301)], n.OSUsH, n[e(1215)]));
        if (i !== void 0) return new Ge({
            audioPcm: i,
            source: Re(n[e(635)](j, r, n[e(744)], n[e(1022)]))
        });
    }
};

function rt(o) {
    const t = a, e = {
        gqUZA: function(n, r) {
            return n != r;
        },
        dsTED: function(n, r) {
            return n instanceof r;
        },
        CGdRF: t(953),
        yLQFn: function(n, r) {
            return n(r);
        },
        OLhrr: function(n, r) {
            return n < r;
        }
    };
    if (e[t(897)](o, null)) {
        if (e.dsTED(o, Uint8Array)) return o;
        if (Array[t(1361)](o)) return new Uint8Array(o[t(914)](n => Number(n) & 255));
        if (typeof o == e[t(1202)]) try {
            let n = e[t(1292)](atob, o), r = new Uint8Array(n[t(1262)]);
            for (let i = 0; e[t(1348)](i, n[t(1262)]); i++) r[i] = n[t(789)](i);
            return r;
        } catch {
            return;
        }
    }
}

var sn = (o => (o[a(965)] = a(965), o[a(757)] = a(757), o[a(494)] = "sysEvent", 
o[a(896)] = "audioEvent", o.notSet = a(899), o))(sn || {});

function xn() {
    return {};
}

function it(o) {
    const t = a, e = {
        OnkMV: t(608),
        fJtNm: t(965),
        prFoR: t(757),
        SzQLm: "audioEvent",
        gRCCs: function(r, i) {
            return r != i;
        },
        uihTv: t(953),
        CCQqI: t(899),
        LNmzs: t(637),
        ZCkCM: "sysEvent",
        HTDve: t(1056)
    };
    if (typeof o == e.OnkMV && Number[t(1362)](o)) switch (o) {
      case 0:
        return e[t(925)];

      case 1:
        return e.prFoR;

      case 2:
        return t(494);

      case 3:
        return e[t(1185)];

      default:
        return t(899);
    }
    if (e[t(1313)](typeof o, e[t(336)])) return e[t(1180)];
    let n = o[t(906)]().toLowerCase();
    return n ? n[t(722)](t(1392)) ? e[t(925)] : n[t(722)]("text") ? e[t(696)] : n.includes(e[t(1032)]) ? e[t(407)] : n[t(722)](e[t(1013)]) ? e[t(1185)] : e[t(1180)] : e[t(1180)];
}

function Bt(o) {
    const t = a, e = {
        xneQj: function(x, h) {
            return x(h);
        },
        HKovW: function(x, h, p) {
            return x(h, p);
        },
        NKTzO: "object",
        iAglN: function(x) {
            return x();
        },
        YPluW: function(x, h) {
            return x != h;
        },
        iRTGh: function(x, h) {
            return x != h;
        },
        gayCC: function(x, h) {
            return x != h;
        },
        rXCxD: function(x, h) {
            return x(h);
        },
        FUpVu: function(x, h) {
            return x(h);
        }
    };
    var n, r, i, u, s;
    if (Array[t(1361)](o)) {
        let [x, h] = o, p = e[t(369)](it, x), w = e[t(369)](Be, h);
        return e[t(361)](ot, p, w);
    }
    if (!o || typeof o != e[t(564)]) return e[t(387)](xn);
    let f = e[t(1284)](r = e[t(338)](n = o[t(410)], null) ? n : o[t(546)], null) ? r : o.name, d = e.gayCC(s = e[t(1359)](u = e[t(1359)](i = o[t(1278)], null) ? i : o[t(374)], null) ? u : o[t(1357)], null) ? s : {}, l = e[t(1273)](it, f), c = e.FUpVu(Be, d);
    return e.HKovW(ot, l, c);
}

function Ee() {
    const o = [ "zgvSzxrL", "zwvZzNy", "DgvNvuK", "txDywNe", "zNnXwvO", "C3rHDhvZ", "Au1vuMvWB3j0rw4", "wv9qB3nPDgLVBG", "AePeqvu", "reHKvK4", "Egniy1i", "B3jpz2S", "yLrVvNK", "EwnOEKe", "u0nSCeu", "uxzMtLK", "yuXzwgi", "CgHVBMu", "y3D2vhC", "zxzLBKfWCe1LC3nHz2u", "DgXfDhK", "BgvUz3rO", "whLdEgW", "rxzLBNruExbL", "vhDrCxa", "AxndAgfYz2LUzW", "vujtBvG", "A3PLz0W", "C3LZDgvTrxHPDfjLyxnVBKnVzgu", "yxvKAw9FCgnT", "se5eD2e", "BKTryK0", "CLHdEeq", "y29UDgvUDa", "CgPUtwS", "EMvAq2m", "tezQrue", "ANnVBKrHDge", "DMrXwLy", "z2DSqwy", "t0vhy0C", "CNPNBgK", "rNjrExu", "wvbSDvC", "AxnjBKnHC2u", "AKzJww0", "shHQDem", "yxjru0C", "wfLosxy", "nti4mdiXCu1eCg1T", "AKPvA3q", "EuXrrM4", "ueDsyNi", "DvvODeq", "Bg1tt2u", "ntmYnZi5DhbqA0L5", "uLzrz3i", "EeL1tKe", "sKXVueK", "AMDQteK", "zvnLrg4", "D1rvAvi", "rgLZy29UBMvJDgvK", "v2LKDgG", "BermBfC", "A3LkrLK", "udKWma", "Cejwsxi", "teT2uLK", "C2XPsve", "BMTUrhy", "DvfNC1G", "z1jdq3m", "CNf1zvG", "uhrdDxG", "BNblvNu", "z2XHC3nLCW", "ChLmz1e", "tgnnzKG", "qxvKAw9dB250CM9S", "AgLRrui", "B3z3wMy", "vwrTtgC", "EK50tgC", "zLnwq1u", "A05uu2e", "BxbSDuy", "vMjSEe4", "Cwz4qxG", "BM9YBwfSAxPL", "y2fWDhvYzuLTywDLrNjVBunHBwvYyq", "z1j6Dg0", "tLDXyuS", "CMHsy0i", "zenbwNu", "w0v2zw5bChbcCMLKz2vDiejYAwrNzsbPBML0AwfSAxPLza", "y29UBMvJDgLUzW", "suvfBLq", "uMPZEwu", "CgfKzgLUz0XLBMD0Aa", "v3vWzMW", "BgLYDMe", "DxD6DeC", "uvrOBvO", "otK3mNnLrxvOCa", "yxbWtg9JyxrPB25dAgfUz2vK", "zg9Uzq", "t0XOCNi", "wNzfBMS", "ugfKzgLUz0XLBMD0Aa", "sxrLBv9dB250ywLUzxi", "zejMDfC", "zKvvywq", "twfWx1jHD19eyxrH", "y2fSBa", "qvbqx1jfuvvfu1rFq1jfqvrfx1bbr0vFu1vdq0vtuW", "Cgf5Bg9Hza", "weTfAwq", "z2f5q0m", "q29UDgvUDa", "AxnbCNjHEq", "AxngAw5PDgu", "sfbUwhO", "yKnmA0i", "EMPevhi", "sxnFzxzLBNrFy2fWDhvYzq", "ndHpEvvrEwO", "sxPOww0", "twfWuMf3rgf0yq", "Aw1Hz2v0B19NCMf5ngzHAwXLza", "BLjzAKC", "AxrLBunVDw50", "zxjYB3i", "seryC3O", "twfWx1nLC3nPB25Fswq", "tufpu0m", "C1LyqwC", "EgHRve8", "yMLUza", "EhHusha", "rLHTD1a", "AwrSELC", "A3jjBNi", "BhPUuwu", "rNbwDuG", "uvPZsvi", "C1nsB2q", "vNvkuLe", "DfbpzhC", "sxbbu1u", "yNzPz2e", "BgLZDa", "BgDOz2S", "ExzlDfO", "DuTSAKi", "zuz2seq", "BMfgqw0", "tvb6Exm", "qvbqx1jfuvvfu1rFvvbhuKferv9jtufhrv9sqvDFrefuqv9gquLmruq", "Dwz1y2i", "uvjbAxK", "DwTVr1K", "t2zxCey", "zururvy", "w0v2zw5bChbcCMLKz2vDifvUA25VD24GBwvZC2fNzsbTzxrOB2q6", "ugLJA0LTywDLrNjVBufSyNvT", "u3DSrfq", "Cu1xCwS", "DwLOvhy", "AMTHtLC", "Avjur2G", "sgvPz2H0", "wgfKvwq", "CNj6BNe", "B1v4wvu", "twvKAxvT", "wKr2tKy", "tMf3t0W", "wfLUtxy", "r3ftwxm", "suX2qu0", "zuHYBw8", "A01QzM0", "EwLMse4", "qvfmz0u", "u0TptwG", "C3rHCNrbChbmB2nHDgLVBLvWzgf0zxm", "udeWma", "Bxbpthy", "zNjVBuLUDa", "zgLZCgf0y2HszwfKEuv2zw50", "Aw5KzxG", "Bhb2sfq", "seTVDLC", "CeDVCvO", "EfbVC2L0Aw9U", "wg5rsMm", "w0v2zw5bChbcCMLKz2vDiev2zw5iDwiGzxzLBNq6", "qM9YzgvYq29SB3i", "q0Xjq0S", "wu5er3i", "Eg5LuwO", "ve9vq0HFrvzftLrFrLjptv9hteftu0vtx0W", "sxnfDMvUDenHChr1CMu", "twfWu2vZC2LVBKLK", "t2rsC2W", "zgf0yq", "tw1YAeC", "BgLZDgvUx2v2zw5FyxbWx2rHDge", "su1vx1jfue9sva", "Cg9W", "u3rHCNrbChbmB2nHDgLVBLvWzgf0zxm", "qwHXyMG", "Au1vrgf0yq", "y3jvzgy", "AgLNAa", "q29UBMvJDgvK", "y3vYCMvUDfnLBgvJDeL0zw1jBMrLEa", "DKL6u3C", "AufNBe4", "yuDqugS", "v0jPwLi", "q3nesvu", "A2vrBKu", "wvPkDge", "Ce5bzei", "ve5Atfm", "DxbKyxrLsw1Hz2vsyxDeyxrH", "rvj4s1y", "sgf2v0i", "uwvuDwq", "yM9YzgvYq29SB3i", "zgvMAw5LuhjVCgvYDgLLCW", "z1PXufe", "DM1pCfG", "D09UBNa", "s1rTCu8", "B0XVz2S", "qvbqx1jfuvvfu1rFqvvesu9Fq1rsx1nvq0nfu1m", "wKnRq00", "vgv4DenVBNrHAw5LCLvWz3jHzgu", "Eg9Kq2G", "DhLWzq", "ExL4Avq", "tgf1BMnOu291CMnL", "rNvwAuu", "A0fiDg8", "CuLezuS", "q29TChjLC3nFtw9Kzq", "rhLitfm", "tMDnA2q", "AfDky1G", "u0n0y3K", "swLADK0", "z2v0vxnLCKLUzM8", "EMPPt1G", "ndm3mJe2s2vVCLre", "zgv2AwnLu3rHDhvZq2HHBMDLza", "uMvWB3j0rNjX", "y2fSBeHHBMrSzxi", "qxnPExm", "DgndD0C", "CxjRDgC", "uLnpzvC", "qvD4wfK", "AeflsNC", "EgzVtuW", "wLDItxy", "AxLHr0O", "qujot1jnquXFrvHjva", "D0HqCMS", "qLzIzeO", "rg55AMi", "EeL2qLq", "v25Tv3O", "D0XPzgm", "re9vqKXfx0nmsunl", "q3vYCMvUDfnLBgvJDeL0zw1oyw1L", "qM9YzgvYv2LKDgG", "udCWma", "q2ftC2O", "zgjIu1q", "Cg9ZDe1LC3nHz2u", "uwjiCwu", "wxzTrNe", "wLzOA04", "Ee1gEgW", "r1PhB0e", "qvbqx1jfuvvfu1rFvvbhuKferv9tsfvure9xtL9tvundrvnt", "EMT3vvC", "DxbKyxrLu3rHDhvZ", "y29UDgvUDe9MzNnLDa", "DvP6q2e", "AfvftLu", "D2fYBG", "D25WAvq", "twDJvg8", "q2Lqu0e", "Eunbshi", "A01fB00", "D3rit2C", "qvbqx1jfuvvfu1rFuKvcvuLmrf9qquDfx0zbsuXe", "Efvty1y", "A2z6yNK", "CuHNtgm", "wLHirNe", "C21qvfe", "BwLTzq", "C0LHAKi", "EhLOyLm", "EMvKr0W", "te1MBgi", "zg9zDwi", "Ag1QwvK", "AK1gzMC", "mZGXmdiWmgD4zhL1wG", "y29UDgfPBMvYvg90ywXoDw0", "rKrmzg4", "B3v0t2znzw1VCNK", "B3v0B2zTzw1VCNK", "uMLUzZe", "Dg9kC29U", "Aw11uMvWB3j0rw4", "uvfvCeK", "CMvTywLUAw5N", "vuPYBLO", "C3LZrxzLBNq", "q3vYCMvUDfnLBgvJDf9jDgvTtMfTzq", "tef4vMS", "y29UBMvJDfr5Cgu", "BM9YBwfSAxPLsw1Hz2veyxrH", "whrrzuq", "Aw1Hz2vfEgnLChrPB24", "sK5VB3a", "C2v0sw50zxj2ywWGAwq9", "r1fkC28", "zuXYu2i", "BwfWvg90ywXtAxPL", "Aw1Hz2vLEgnLChrPB24", "Bwf4", "B2jQzwn0", "x190AwnRu2HHzg93vgLTzxjZ", "s294reC", "uwjMsKu", "sxrLBu5HBwu", "qNDLqKC", "zLnxquy", "D2zpD3C", "thznshC", "vfbLruC", "v25Wthq", "u2H1DerVD25qywDLq29UDgfPBMvY", "qLLjzNy", "t3vSAgG", "CePNzw4", "tgLZDe9IAMvJDa", "uhDZBe0", "q29UDgvUDe9MzNnLDa", "rujKEgu", "ANvmyuG", "Eevus3i", "tKfbr3a", "C2v0vgLTzw91Da", "wKjKANC", "yw94y1m", "C2TPCe5LEhrtAgfKB3DuAwnR", "qM9YzgvYx0nVBg9Y", "zgvSyxK", "y2P6ELq", "B0DOCK8", "rK9sruDst1vorf9ftLrfuL9fvKvova", "qwHzsMm", "DgHLBG", "z2v0qxbWtg9JyxrPB24", "zxzLBKfWCejYAwrNzvjLywr5", "tKHvuxi", "qK1tDwy", "vgv4Df9pyMPLy3q", "zxzLBNruExbL", "t2zntMO", "q29UBMvJDgLVBKzHAwXLza", "CMvWzwf0", "BwHLBvC", "ww5lyvm", "yxvKAw9qy20", "u21LtKG", "su1HDxy", "EMrmCwC", "BwnLrhO", "vM9drhO", "Dgv4Da", "AxjdqMu", "Cuz3CLy", "Cxv1zwK", "C2vUzezHAwXLza", "Dw5KzwzPBMvK", "tKTuEK8", "Bxznsg4", "swDAC0K", "zLfYww4", "zgXVwuS", "tKPcB3O", "Eunfrha", "BMPkDMO", "AxrLBvDPzhrO", "ww5mugi", "zNjVBvn0CMLUzW", "EgfptwO", "wKHoEwu", "Defly2y", "su1vuMvWB3j0rw5tDgf0Dxm", "BwfWrNjHz21LBNrqywnRzxrtAxPL", "CfbKwvm", "zNzqq3G", "ufrbBNm", "zgLZy29UBMvJDgvK", "yLrovwy", "CMvHzhK", "y1LODfi", "zhPyyNy", "zhH5AwG", "whfLqvi", "wKTxrwm", "tLLprvi", "CgfYC2u", "udqWma", "CKv3uMm", "Aw1Hz2vpyMPLy3q", "mZzTAvrAAw4", "B0rTrvm", "zeDku1q", "sevhsNi", "BxDeENm", "z1LOEM8", "yxvKAw9tB3vYy2u", "re9nq29UDgvUDeXVywrLza", "EgHKq28", "BLHtAwe", "s1nSB1m", "tMjqwKu", "BNvTyMvY", "tKjwz00", "udmWma", "A0DZqLi", "DLvYBKG", "BefPEwq", "y1fttKu", "y1fUtui", "zgvMAw5LuhjVCgvYDhK", "tLv4zLi", "ENLTA3G", "y29UBMvJDgLVBKzHAwXLza", "uxvbBu0", "rLbgrxK", "D3P6AvC", "DMz0sKe", "r2v0r2XHC3nLC0LUzM8", "z2v0t3DUuhjVCgvYDhLtEw1IB2XZ", "AgvHzgLUzW", "s0Pguxi", "y2fSBev2zw5bCha", "CxHhseO", "BMf0AxzLswq", "u0nst0Xmx0jpvfrptv9fvKvova", "v3DMwvG", "ugfKzgLUz19mzw5NDgG", "y29UBMvJDgvK", "CuzpteC", "DePMAgq", "C3LZ", "x3jLywr5", "AgvPz2H0", "zMX1DhrLCL9PBMfWChDLyNzPzxC", "ve9vq0HFrvzftLrFrK9stv9evu1nwv9ovuXm", "uxfNy1G", "qKjZufi", "v0XhBe4", "uduWma", "wu1yteK", "z2v0r2XHC3nLC0LUzM8", "rwDVBg4", "twzivKy", "AxndB25Uzwn0zwq", "wvbVC2L0Aw9U", "qLzysMy", "qvbqx1jfuvvfu1rFqvvesu9Fq1rsx0zbsuXfra", "qNjPzgDLuMvHzhK", "qMTNyKy", "BLDbEvC", "CLHxyvC", "AwPlDuG", "yxbWBhK", "rxr3uKy", "ANfwrwO", "DeTbsuq", "B3zLCNnPEMu", "zxzLBKfWCeXHDw5JAfnVDxjJzq", "AxfrtLC", "wxPqCK8", "zeDwuem", "DxnLu1u", "Eu1oDfq", "AgfUzgXLr2XHC3nLC1n0yxr1C0nOyw5Nzwq", "tuXmz0S", "u0nst0Xmx0jpvfrptq", "sxrLBunVBNrHAw5LCG", "BNjdqLe", "uLPzEe0", "wfbVC2L0Aw9U", "q29UDgfPBMvYsuq", "wfrqt24", "BK1uzfe", "Bw5ltgi", "C2v0sw50zxj2ywW", "AxrLBunVBNrHAw5LCG", "qKHpwMi", "tfzRAxe", "Aw50zxjHy3rPDMu", "Dg9vChbLCKnHC2u", "qujot1jnquXFrvHjvf9fvKvova", "B25fDMvUshvIrxzLBNq", "sxj5u3e", "uefVugC", "vLnrCeS", "rfHZEw4", "z3HHze8", "CMz3q1G", "rK9sruDst1vorf9fweLu", "ChjgB1i", "sgLNAa", "BffZELK", "y2XLyxjLza", "Cw5gBfK", "AgrQEu4", "CgDhzfq", "zKHgsMO", "tgDAuMy", "s2fWvuW", "zxHPDe1Vzgu", "DMDwEw8", "zNnQDgi", "Bg5N", "uK1hvfe", "q2vHzui", "C3vJy2vZCW", "rxzLBNrtB3vYy2u", "DxL0s0e", "Agvftwq", "z2v0t3DUuhjVCgvYDhLezxnJCMLWDg9YCW", "rxHXzgu", "mtr3ANzmwNa", "qvbqx1jfuvvfu1rFq1jfqvrfx09wrvjtsvPfx1jfu1bptLnfx0nptLrbsu5fuG", "Aw52ywXPza", "zKjXBe4", "Aw5JBhvKzxm", "DwLK", "BMv4Da", "CMvZB2X2zq", "u2v0tg9JywXtDg9YywDL", "z2v0rgv2AwnLsw5MBW", "vw5OAKi", "vgvYDNm", "AxvRtwm", "BwHVuge", "Evr4vgy", "r2v0vxnLCKLUzM8", "C2HHzg93lxrPBwvYoG", "u0nst0Xmx1rpuf9fvKvova", "DxjUBhC", "C3bLzwq", "zMzlrLu", "seXPtxm", "uMvIDwLSzfbHz2vdB250ywLUzxi", "qM9YzgvYx1DPzhrO", "sxrLBvDPzhrO", "BwfWrNjHz21LBNrjBMrLEa", "B0X2C1O", "su1vrgf0yq", "u1Ltvevnx0vysvq", "uhjqsMm", "rwjtz3O", "swPTCuW", "sw1Hz2vpyMPLy3q", "B3v0x29Mx21LBw9YEq", "shzuzuq", "t2XnBKG", "twzbvem", "tg5LALq", "tgffA0m", "Dgv4Dev2zw50", "zM5jvhe", "rNffwge", "mtu3mtuZoeL5wuzgtW", "zfHevhi", "tKzHC2S", "zLzmvLi", "CgTwzxm", "wgLkAuK", "rxzLBKfWCejYAwrNzq", "wf9qB3nPDgLVBG", "y291BNrYEq", "Bg9U", "qvbqx1jfuvvfu1rFvvbhuKferv9tsfvure9xtL9gquLmruq", "ChjVDg90ExbL", "vfzcq0y", "sNfMBLe", "veDQC2m", "y3vYCMvUDfnLBgvJDeL0zw1oyw1L", "sxnjDgvTu2vSzwn0qM9YzgvYrw4", "Bvb0s2S", "ExDsDgC", "rw91tum", "shbur00", "CMvHzhLtDgf0zq", "wKDwC3q", "twfWx0zYywDTzw50x0LUzgv4", "sM1xEu0", "CeLICg8", "rKnpu04", "sNrVDxK", "BwL6Avu", "y2HHCKnVzgvbDa", "r2rxrMe", "qw5kvvm", "zfDbDva", "zNbHqKm", "yvzTv0e", "zezfvwC", "rKLjveS", "DeThCwC", "yNDXte4", "yNbfENK", "C2v0tg9JywXtDg9YywDL", "s25ct0S", "zNjlvgO", "qM9YzgvYuMfKAxvZ", "Ehb6sue", "zxzLBKH1yKv2zw50", "t1jwveW", "z1jvu2y", "wNDirLC", "uwjLBLO", "yxPktNq", "y29TChjLC3nnB2rL", "rM1ytLC", "CwzNtwe", "wMLvsLG", "t3DztvO", "su1vuMvWB3j0rw4", "qxbzt1K", "uu14uu0", "D2LKDgG", "CgnT", "mJa1vej6uu95", "u0nst0Xmx1rpua", "D2v2txG", "sxrLBv9xAwr0Aa", "DgLTzxn0yw1Wtxm", "BNzYsvm", "wNvPywu", "EuXxu0u", "DxbIsui", "t0THv2S", "DKnhrgW", "udeWmda", "whDhrva", "x2XPC3rLBKv2zw5bChbnzxnZywDL", "tKrjCvC", "sLr1Eui", "rKXNwfK", "zxHXwei", "DwXjwNe", "y2f1zu4", "qvzVzK8", "ywX0Axr1zgu", "r2Thzeq", "sM11tvm", "DvPbzNO", "q29TChjLC3nnB2rL", "sNjNsK8", "ChDwze0", "BMPZwwK", "su1vx1jLCg9YDevUx1n0yxr1CW", "CMvWB3j0rNjX", "qK5ptxu", "zgv0ywLS", "w0v2zw5bChbcCMLKz2vDierLDMLJzsbZDgf0DxmGy2HHBMDLzdO", "yNnOB3O", "uwXkCeq", "sgTTthO", "DhLqq1q", "zgLZCgf0y2HfDMvUDa", "yxzHDgfY", "swLlueO", "AgfUzgXLqxbWtg9JyxrPB25dAgfUz2vK", "ENPHzwK", "BwLpthi", "v1rsBhK", "yMTdBfy", "s1fVtNy", "wgDwz2y", "yMfZzty0", "BMzmyxy", "y1r5swm", "Aw1Hz2v0B2DYyxLMywLSzwq", "CgLJA0LTywDLrNjVBufSyNvT", "q2LnDLO", "EuHdweW", "y29UDgfPBMvYtMfTzq", "ANrjwKe", "Bw5bqKC", "Ehb1vwW", "tujABxa", "u3LZDgvTrxHPDfjLyxnVBKnVzgu", "qvbqx1jfuvvfu1rFvvbhuKferv9urvHux0rbvefFu1vdq0vtuW", "C291CMnL", "BLrzD08", "AxnhBgfZC2vZ", "yMDZsuO", "CvriwKu", "q3HitM0", "q3vYCMvUDfnLBgvJDeL0zw1jBMrLEa", "CwfmExG", "r2XHC3nLCW", "rfrhwhC", "Aw5PDa", "sLP5wgW", "txzAsee", "yxvKAw9fDMvUDa", "z3fvwKe", "v3HcDhK", "BM90u2v0", "AxnjBwfNzvnPEMvjBNzHBgLK", "v0zvvva", "wKHuEMu", "z2v3s2i", "AxnfDMvUDenHChr1CMu", "thjHwg8", "DhjPBq", "Dwjstxa", "yufYAhC", "CNriq0C", "qvrmDhC", "DK5JtMC", "EhznBfe", "AgfUzgXLrxzLBKH1yKv2zw50q2HHBMDLza", "BwfW", "vK9jr3m", "rujzCw0", "qKHAC3G", "sNrMt04", "rK9sruDst1vorf9fweLux0vwru5u", "A21qz0C", "C3bSAxq", "uKHuu2W", "Eervzw4", "uvbOwey", "zKP0tM0", "A2HNque", "sxb1zee", "BefnEe0", "uND2EeK", "zgvIDwC", "DuXYEKu", "wxPgwfK", "q2fSBev2zw5bChbnzxrOB2q", "Aw11q29UDhjVBa", "rgPNwvq", "AxnjBwfNzuv4y2vWDgLVBG", "Bw9KzwW", "tenuv0W", "Bgf1BMnOu291CMnL", "Aw5ZDgfUy2u", "BwP4ze4", "swHWthm", "Axntzw5KrMfPBgvK", "vgv4De9IAMvJDa", "rLrKuuG", "y3jLyxrLu3rHCNrvCfbHz2vdB250ywLUzxi", "zNjVBq", "Awrnswy", "EwjAy2y", "txzlzM4", "z3ntDMO", "rxzLBNrFvhLWzq", "C3rYAw5N", "sLjqCKe", "ue1xBgy", "qvbqx1jfuvvfu1rFvvbhuKferv9jtufhrv9sqvDFrefuqv9tvundrvnt", "B3fTA2e", "q29UDgfPBMvYx05HBwu", "yxnZAwDU", "s1DxugS", "ywPZAhC", "rgX3A00", "q29UBMvJDgLUzW", "BMf0AxzLlwzPCMu", "BgLZDev2zw50", "rMnkq3q", "A0vltue", "r0nYC2C", "zfPzwuG", "Cgf0Aa", "sxrLBv9dB3vUDa", "yM9YzgvYuMfKAxvZ", "Bw5Is3C", "Aw1Hz2vtAxPLsw52ywXPza", "t25PEuG", "odG1nJC2mfnkCfzJAW", "DMfSDwu", "qvrcENe", "vxfmCMm", "ve9xB3O", "B3nyBwi", "Aw1Hz2veyxrH", "q29UDgfPBMvYtMfTzq", "uuTNzwS", "t2vlu1e", "seH0AeK", "vejQDLu", "Dg9mB3DLCKnHC2u", "A3fUyLu", "q2fWDhvYzuLTywDLrNjVBunHBwvYyq", "Efrlsgu", "EfDns3G", "BNrQzxy", "DLzdrhO", "z05Nq2K", "CMvIDwLSzfbHz2vdB250ywLUzxi", "CMvTB3zLrxzLBNrmAxn0zw5LCG", "v0XmEuK", "ChjHDw4", "AvHHse8", "sNfMtLq", "rhvVu0e", "BwvKAxvT", "vLfks0m", "A1n2Bvm", "DgHYB3C", "r0Xbu1nfu19m", "y29UDgvUDeXLBMD0Aa", "ywnJDxjHy3K", "DgvLCvm", "tevssMy", "u05Azha", "sfreDMu", "udiWma", "wKDIBha", "BeniDfe", "ve9vq0HFrvzftLrFrLjptv9hteftu0vtx1i", "zNfVzNm", "quDoC28", "AxntDwnJzxnZ", "vwPnseK", "DNrrugG", "CMLUzZe", "v2LKz2v0x0Le", "yuvzugu", "B1jvC0e", "zNjVBuPZB24", "y2fSBf9LDMvUx2fWCf9TzxrOB2q", "igrLBgf5pq", "su1vx0rbvee", "qxPxB0O", "te5TENm", "wxbnrem", "q3vYCMvUDfnLBgvJDf9jDgvTsw5KzxG", "zuDOzMi", "tMzYBu8", "ELfoz1q", "Aw1Hz2v0B2DYyxK0zMfPBgvK", "CgfJvui", "EujZENq", "CLn6Bvq", "wMH1wKi", "AgfUzgXLtgf1BMnOu291CMnL", "ALbxvKu", "ELbdB1u", "r01Vu2C", "AhzMDKC", "C0vdufO", "Aw1Hz2vuB0DYyxK0rMfPBgvK", "AxnjBwfNzvrVr3jHEtrgywLSzwq", "B01ireC", "qvbqx1jfuvvfu1rFvvbhuKferv9urvHux0rbvefFrKfjteve", "y0jkt08", "s3P4uKu", "v3HAtgm", "yxvKAw8", "quXquNq", "Bw1wAfq", "EM5Lsvm", "sw11q29UDhjVBa", "w1nOywrVD1rPBwvYC10", "r2v0qxbWtg9JyxrPB24", "D2LKz2v0swq", "yMf0DgvYEuXLDMvS", "zgX0DfK", "q29UDgfPBMvYx0Le", "v0PSv1K", "thLxu2m", "CNryr04", "vfD0D1K", "Au1vuMvWB3j0rw5tDgf0Dxm", "qw1nq3C", "DvnutKK", "ANLsEwm", "y25gBKq", "DvrUC1y", "DhHdy08", "rxzLBKH1yKv2zw50", "rNnpC1m", "y1fYC2e", "tvHUA1O", "CxDAAwy", "v3vjs2O", "r2fZB2C", "CxDSt2W", "su1vx0rbvefFuKvqt1ju", "Aw11uMvWB3j0rw5tDgf0Dxm", "Bg9Uz2L0DwrL", "z2v0", "BwfWuMf3rgf0yq", "rvbXshO", "uunhuvO", "qvbqx1jfuvvfu1rFq1jfqvrfx09vve9gtuvnt1jzx0nptLrbsu5fuG", "u1vhzMS", "ywrKrxzLBNrmAxn0zw5LCG", "Dgv4DenVBNrHAw5LCLvWz3jHzgu", "vMv2tM8", "CMnSwNy", "EvbVC2L0Aw9U", "uNfMz3m", "q0Xjq0TFrvzftLq", "Dgv4De9IAMvJDa", "v29IELK", "DgLJAW", "tgLZDgvUrxzLBKfWCe5VDgLMEq", "BfHuy0q", "vhjdu3K", "AxndB25Uzwn0Aw9UrMfPBgvK", "AxnsAw5N", "u3vNu1G", "yNz3AMy", "z1HIzKO", "D0nrrK4", "CwPnBxq", "uxDKsM8", "yM9YzgvYv2LKDgG", "rNDiDLm", "D2vrrNG", "BLnXt2m", "tMXZuKW", "yLfHvvi", "y3jLyxrLrgvMyxvSDa", "rK1gzKO", "vg5pyxe", "sxrLBunVDw50", "sw1Hz2vFt2jQzwn0", "sMPht1y", "BM9Uzq", "uujeChu", "rMHXAg8", "zezfD2S", "ve9vq0HFrvzftLrFrLjptv9ssu5h", "rNnmq3G", "CvzsA1e", "AxnjDgvTu2vSzwn0qM9YzgvYrw4", "C2vUzgzHAwXLza", "vffgww4", "rK9sruDst1vorf9ftLrfuG", "DNjyuLO", "qvbqx1jfuvvfu1rFvvbhuKferv9irufsvejfqvrFuefds0vux1nvq0nfu1m", "Aw11rgf0yq", "m2HrEhP6zq", "AvzjqMi", "yNfUu2e", "y29TCgXLDgu", "C2L6zq", "tfziuLi", "ywHkzvO", "BfLxz0e", "r0TxAfm", "vuj0A1G", "Dg9JAvq", "zg5KtvG", "qvbqx1jfuvvfu1rFuKvcvuLmrf9qquDfx1nvq0nfu1m", "DMfSDwvdB2rL", "DvrVr0W", "yxvKAw9dB250CM9S", "BLjvywy", "ANPws1y", "sxLzr0W", "txPsBuK", "ugHVBMu", "te1lv2C", "AgfZt3DUuhjVCgvYDhK", "CMvWBgfJzq", "ugzzDLa", "CuDtsxu", "zxr4Bu8", "AenLvNi", "v2HPr1G", "v2LKz2v0swq", "ve9vq0HFrvzftLrFrLjptv9evu1nwv9ovuXm", "re9vqKXfx0nmsunlx0vwru5u", "zLbTs1q", "DMLIyvO", "tKrVDKO", "zMHqAvG", "vKLADxi", "u1Ltvevnx0vysvrFrvzftLq", "q0nrCuK", "vKfpu2G", "zNvUy3rPB24", "EhvpD2G", "y29UDgfPBMvYsuq", "u3Prtg0", "C2H1DerVD25qywDLq29UDgfPBMvY", "C3rVCefWCeXVy2f0Aw9UvxbKyxrLCW", "BgLZDe9IAMvJDa", "D3POvxm", "uMXQywy", "Eg1zyMC", "AxnxzwfYAw5N", "t21orvu", "B1v0Ewi", "B0jiz2m", "ExnSAvy", "twfWvg90ywXtAxPL", "udGWma", "A25Os20", "tfjNvK4", "AMnezgK", "q0DKuKy", "DLfvqwm", "w0v2zw5bChbcCMLKz2vDihbVC3rnzxnZywDLoIbgBhv0DgvYigHHBMrSzxiGBM90igf2ywLSywjSzq", "BezPz0e", "txDkDvm", "Dhj5rNjVBuPZB24", "CMXkDg8", "DKDPq0y", "r3nRquy", "qNbPBhK", "DuDWA28", "qvbqx1jfuvvfu1rFq1jfqvrfx0LovKfjterFq09ovefjtKvs", "DwnxswC", "vKDxA2K", "DLrKy28", "wLvZtw8", "zMDbv3u", "AxndB25Uzwn0Aw5N", "CgHrsxi", "sgXpExq", "txfes1i", "z2XHC3nLC01LBNu", "qM9YzgvYx1jHzgL1CW", "DKLiyvy", "CvfeD3y", "yMjovfO", "z2v0sw5ZDgfUy2u", "Bgf0Axr1zgu", "ChfxCNq", "z2v0tg9JywXtDg9YywDL", "twfWx1rVDgfSx1nPEMu", "B3LItwu", "BMfTzq", "s1nusxm", "Bwn0t3e", "tgLZDf9pyMPLy3q", "rKXorMO", "we5REem", "Bg9N" ];
    return Ee = function() {
        return o;
    }, Ee();
}

function ot(o, t) {
    const e = a, n = {
        ZVUTL: function(i, u) {
            return i == u;
        },
        qfxAx: function(i, u) {
            return i(u);
        },
        Qxclp: e(757),
        eGhfb: e(494),
        KWWPk: e(896),
        MwJuS: function(i, u) {
            return i === u;
        },
        IgZsI: e(636),
        TqGMA: "tOtiC",
        zPCoU: function(i, u) {
            return i !== u;
        }
    };
    let r = {
        jsonData: t
    };
    switch (o) {
      case "listEvent":
        r[e(965)] = nn[e(1027)](t);
        break;

      case n.Qxclp:
        r[e(757)] = rn.fromJson(t);
        break;

      case n[e(1035)]:
        r.sysEvent = un.fromJson(t);
        break;

      case n[e(960)]:
        if (n[e(1206)](n[e(566)], n.TqGMA)) {
            if (n.ZVUTL(_0x3630da, null)) return;
            let i = _0x19fbf7.get(_0x5b1b54);
            if (!i) return n[e(1329)](_0x52daaa, _0x1de5e0);
            i[e(699)] = !0, _0x2f426b(i[e(630)]), _0x52c538.delete(_0x434adf);
        } else {
            let i = an[e(1207)](t);
            n[e(1045)](i, void 0) && (r[e(896)] = i);
            break;
        }
    }
    return r;
}

var ue = class Ce {
    constructor(t = {}) {
        Object[a(959)](this, t);
    }
    static fromJson(t) {
        const e = a, n = {
            AUBWP: function(r, i, u) {
                return r(i, u);
            },
            YzZpt: function(r, i) {
                return r != i;
            },
            QThmZ: function(r, i) {
                return r(i);
            },
            cjGrG: function(r, i, u, s, f) {
                return r(i, u, s, f);
            },
            vrXRZ: e(1184),
            bToVy: "Container_ID",
            xWMKx: e(876),
            WTRly: e(983),
            frKTj: function(r, i) {
                return r(i);
            },
            mGaZp: e(525),
            ZGblp: e(1008),
            HAUas: "ContentLength",
            OdRsl: function(r, i) {
                return r(i);
            },
            IgXVR: function(r, i, u, s) {
                return r(i, u, s);
            },
            IpASU: e(1274),
            dzXbv: e(1360)
        };
        return new Ce(O(n.AUBWP(E, {}, n.YzZpt(t, null) ? t : {}), {
            containerID: n[e(1344)](b, n.cjGrG(m, t, n[e(1139)], e(677), n[e(1253)])),
            containerName: n[e(1344)](U, n.cjGrG(m, t, n[e(992)], n[e(865)], e(958))),
            contentOffset: n[e(802)](b, m(t, e(459), n.mGaZp)),
            contentLength: b(m(t, n[e(1015)], n.HAUas)),
            content: n[e(373)](U, n.IgXVR(m, t, n[e(1390)], n[e(587)]))
        }));
    }
    static [a(489)](t) {
        const e = a;
        return t ? {
            gRUSf: function(r, i) {
                return r instanceof i;
            }
        }[e(807)](t, Ce) ? t.toJson() : new Ce(t)[e(489)]() : {};
    }
    toJson() {
        const t = a, e = {
            DjgYT: function(n, r, i) {
                return n(r, i);
            },
            ySzvE: function(n, r) {
                return n != r;
            }
        };
        return e[t(935)](E, {}, e.ySzvE(this, null) ? this : {});
    }
}, ut = class ze {
    constructor(t = {}) {
        const e = a, n = {
            kqnbU: function(i, u) {
                return i != u;
            }
        };
        var r;
        this[e(706)] = n[e(989)](r = t.exitMode, null) ? r : 0, Object.assign(this, t);
    }
    static fromJson(t) {
        const e = a, n = {
            XxMhF: function(r, i, u) {
                return r(i, u);
            },
            jyRyc: function(r, i) {
                return r != i;
            }
        };
        return new ze(n.XxMhF(E, {}, n[e(1074)](t, null) ? t : {}));
    }
    static [a(489)](t) {
        const e = a;
        return t ? t instanceof ze ? t[e(489)]() : new ze(t)[e(489)]() : {
            exitMode: 0
        };
    }
    [a(489)]() {
        const t = a, e = {
            oLogk: function(n, r, i) {
                return n(r, i);
            },
            wtHOg: function(n, r) {
                return n != r;
            }
        };
        return e[t(405)](E, {}, e[t(468)](this, null) ? this : {
            exitMode: 0
        });
    }
}, at = class re {
    constructor(t = {}) {
        Object[a(959)](this, t);
    }
    static [a(1027)](t) {
        const e = a, n = {
            mnKLb: function(r, i) {
                return r(i);
            },
            Dnyjb: function(r, i, u, s, f, d) {
                return r(i, u, s, f, d);
            },
            xhkTO: e(1247),
            FmXNW: e(816),
            mhoPa: "IMU_ReportEn",
            xvMlQ: e(490),
            rtHCG: function(r, i, u, s) {
                return r(i, u, s);
            },
            BHOZb: e(851),
            Wupfl: e(426)
        };
        return n[e(680)](H, t) ? new re({
            iMUReportEn: n[e(440)](S, t, n[e(1378)], n[e(812)], n[e(731)], n[e(912)]),
            reportFrq: n[e(909)](S, t, n[e(683)], n[e(1341)])
        }) : new re;
    }
    static toJson(t) {
        const e = a;
        return t ? {
            OIwgk: function(r, i) {
                return r instanceof i;
            }
        }.OIwgk(t, re) ? t[e(489)]() : new re(t)[e(489)]() : {};
    }
    [a(489)]() {
        const t = a, e = {
            tAKcf: function(n, r, i) {
                return n(r, i);
            },
            rlJto: function(n, r) {
                return n != r;
            }
        };
        return e[t(577)](E, {}, e[t(1208)](this, null) ? this : {});
    }
};

(class ie {
    constructor(t = {}) {
        Object.assign(this, t);
    }
    static [a(1027)](t) {
        const e = a, n = {
            exHoO: function(r, i) {
                return r(i);
            },
            GskAF: function(r, i, u, s, f, d) {
                return r(i, u, s, f, d);
            },
            ECisy: e(578),
            cwvTw: e(850),
            cnFnD: e(1087)
        };
        return n.exHoO(H, t) ? new ie({
            iMUReportEnStatus: n[e(1210)](S, t, e(1071), n.ECisy, n[e(1259)], n[e(1075)])
        }) : new ie;
    }
    static [a(489)](t) {
        const e = a;
        return t ? {
            miOLr: function(r, i) {
                return r instanceof i;
            }
        }[e(864)](t, ie) ? t[e(489)]() : new ie(t)[e(489)]() : {};
    }
    toJson() {
        const t = a, e = {
            yyxiT: function(n, r, i) {
                return n(r, i);
            },
            rhRcB: function(n, r) {
                return n != r;
            }
        };
        return e[t(411)](E, {}, e[t(1334)](this, null) ? this : {});
    }
});

var cn = class oe {
    constructor() {
        const t = a;
        this._ready = !1, this[t(893)]();
    }
    static [a(1228)]() {
        const t = a;
        return oe.instance || (oe[t(940)] = new oe), oe[t(940)];
    }
    init() {
        const t = a, e = {
            MzRmI: function(n, r) {
                return n === r;
            },
            fqofs: "rVhEE",
            jFcYm: function(n, r) {
                return n == r;
            },
            ZHNye: "string",
            QuVqI: "deviceStatusChanged",
            MXnkZ: function(n, r) {
                return n || r;
            },
            dHsbv: t(805),
            aGPPk: function(n, r) {
                return n || r;
            },
            keQnE: function(n, r) {
                return n === r;
            },
            sKSQl: function(n, r) {
                return n != r;
            },
            osXmb: function(n, r) {
                return n === r;
            },
            lCHtQ: t(1145),
            phQIr: t(685),
            FqEXa: t(603),
            NfrmO: t(1336)
        };
        e.sKSQl(typeof window, "undefined") && (window[t(766)] = this, e[t(981)](document[t(781)], e[t(1016)]) || document[t(781)] === e[t(1220)] ? (this[t(638)] = !0, 
        this[t(358)]()) : document.addEventListener(e[t(759)], () => {
            const n = t, r = {
                heBEk: function(i, u) {
                    return e[T(1161)](i, u);
                },
                FLgXY: n(1049)
            };
            if (e.fqofs === e[n(1018)]) this._ready = !0, this.dispatchReadyEvent(); else return r.heBEk(_0x188d2e, r[n(837)]);
        }), window[t(834)] = n => {
            const r = t;
            let i = e[r(1286)](typeof n, e[r(576)]) ? JSON[r(592)](n) : n, {method: u, payload: s, data: f} = i;
            e[r(1161)](u, r(664)) ? this[r(1043)](f || s) : u === e.QuVqI ? this[r(670)](e[r(1081)](f, s)) : e.MzRmI(u, e.dHsbv) ? this.handleEvenHubEventChanged(e[r(388)](f, s)) : e[r(391)](u, r(1346)) ? this[r(862)](e[r(1081)](f, s)) : console[r(462)](r(332), u);
        }, console[t(1240)](e[t(1036)]));
    }
    dispatchReadyEvent() {
        const t = a, e = {
            pjnMk: function(n, r) {
                return n != r;
            },
            XqeAR: t(563),
            naFAm: function(n, r) {
                return n == r;
            },
            njsYi: t(1182),
            KapUL: t(542)
        };
        e[t(1275)](typeof window, e[t(589)]) && e[t(1397)](typeof window.dispatchEvent, e[t(849)]) && window[t(859)](new Event(e[t(705)]));
    }
    get [a(585)]() {
        return this[a(638)];
    }
    [a(450)](t) {
        const e = a, n = {
            UNXtY: function(i, u) {
                return i == u;
            },
            JmuMS: e(563),
            vNHKq: e(1260),
            jzVKV: e(1204)
        };
        if (n.UNXtY(typeof window, n[e(844)])) return Promise[e(725)](void 0);
        let r = window[e(640)];
        return r && r[e(427)] ? r.callHandler(n.vNHKq, JSON.stringify(t)) : (console[e(462)](n[e(1159)]), 
        Promise[e(725)](void 0));
    }
    [a(1043)](t) {
        const e = a, n = {
            lYWgA: function(u, s) {
                return u != s;
            },
            bgsIJ: function(u, s) {
                return u == s;
            },
            HZxDP: e(508),
            fgAWu: function(u, s) {
                return u === s;
            },
            KQoNv: "appMenu",
            YzFXY: e(1223),
            MqDKR: function(u, s) {
                return u != s;
            },
            ixcIE: e(563),
            NgMkd: function(u, s) {
                return u == s;
            },
            hvfvG: e(1182),
            ORVTL: e(664)
        };
        let r = n[e(1149)](t, null) && n[e(886)](typeof t, n.HZxDP) ? t[e(939)] : t, i = n[e(1218)](r, n.KQoNv) || n[e(1218)](r, n[e(932)]) ? r : n[e(867)];
        n[e(1222)](typeof window, n.ixcIE) && n[e(418)](typeof window[e(859)], n[e(1047)]) && window.dispatchEvent(new CustomEvent(n[e(806)], {
            detail: {
                launchSource: i
            }
        }));
    }
    handleGlassesStatusChanged(t) {
        const e = a, n = {
            kzegL: function(i, u) {
                return i != u;
            },
            PrPJc: e(563),
            RwvxI: function(i, u) {
                return i == u;
            },
            fvfJv: e(1182),
            CaSsj: e(425)
        };
        let r = Oe.fromJson(t);
        n[e(1268)](typeof window, n[e(747)]) && n[e(929)](typeof window.dispatchEvent, n.fvfJv) && window[e(859)](new CustomEvent(n[e(448)], {
            detail: r
        })), console[e(1240)](e(854), r);
    }
    [a(913)](t) {
        const e = a, n = {
            UqLrc: function(i, u) {
                return i(u);
            },
            qrktg: "undefined",
            hmjYY: function(i, u) {
                return i == u;
            },
            LAxVk: e(1182),
            wyJKc: e(805),
            GvuIK: e(365)
        };
        let r = n[e(979)](Bt, t);
        typeof window != n[e(430)] && n[e(481)](typeof window[e(859)], n[e(496)]) && window[e(859)](new CustomEvent(n.wyJKc, {
            detail: r
        })), console[e(1240)](n.GvuIK, r);
    }
    handleAppLocationChanged(t) {
        const e = a, n = {
            yTxTf: function(i, u) {
                return i != u;
            },
            wzziW: function(i, u) {
                return i == u;
            },
            NFxNx: "appLocationChanged"
        };
        let r = tt(t);
        r && n[e(732)](typeof window, e(563)) && n[e(622)](typeof window[e(859)], e(1182)) && window[e(859)](new CustomEvent(n.NFxNx, {
            detail: r
        }));
    }
    [a(628)](t, e) {
        const n = a, r = {
            yLWSE: "call_even_app_method",
            QZsIR: function(i, u) {
                return i(u);
            },
            Ahqbh: function(i, u, s, f) {
                return i(u, s, f);
            }
        };
        return r[n(380)](q, this, null, function*() {
            const i = n;
            return yield this.postMessage({
                type: r[i(828)],
                method: r[i(1386)](String, t),
                data: e
            });
        });
    }
    getUserInfo() {
        const t = a;
        return {
            fsqYZ: function(n, r, i, u) {
                return n(r, i, u);
            }
        }[t(1245)](q, this, null, function*() {
            const n = t;
            let r = yield this[n(628)](n(422));
            return Xt[n(1027)](r);
        });
    }
    [a(727)]() {
        const t = a, e = {
            UdmLg: t(647),
            CKoiv: function(n, r, i, u) {
                return n(r, i, u);
            }
        };
        return e.CKoiv(q, this, null, function*() {
            const n = t;
            let r = yield this[n(628)](e[n(1323)]);
            return r ? Yt.fromJson(r) : null;
        });
    }
    [a(800)](t, e) {
        const n = a, r = {
            HHthI: function(i, u, s) {
                return i(u, s);
            },
            DXsyn: function(i, u) {
                return i === u;
            },
            QlJpD: n(550),
            ZGwTJ: "setLocalStorage",
            QbenZ: function(i, u) {
                return i != u;
            },
            iXaHO: function(i, u, s, f) {
                return i(u, s, f);
            }
        };
        return r[n(1e3)](q, this, null, function*() {
            const i = n, u = {
                wLidc: function(s, f, d) {
                    return r[T(986)](s, f, d);
                }
            };
            if (r[i(692)](r.QlJpD, r[i(856)])) {
                let s = yield this[i(628)](r.ZGwTJ, {
                    key: t,
                    value: e
                });
                return r[i(809)](s, null) ? s : !1;
            } else return u[i(443)](_0x46f196, {}, this != null ? this : {});
        });
    }
    [a(1231)](t) {
        const e = a, n = {
            kMjfm: "getLocalStorage",
            NcPpj: function(r, i) {
                return r != i;
            },
            Fhqho: function(r, i, u, s) {
                return r(i, u, s);
            }
        };
        return n[e(1130)](q, this, null, function*() {
            const r = e;
            let i = yield this[r(628)](n[r(350)], {
                key: t
            });
            return n.NcPpj(i, null) ? i : "";
        });
    }
    getAppLocation(t) {
        const e = a, n = {
            QCGQZ: function(r, i) {
                return r === i;
            },
            oGhrO: "disconnected",
            BweBG: e(799),
            qpOif: "getAppLocation",
            xyhbS: function(r, i) {
                return r(i);
            },
            quuei: function(r, i, u, s) {
                return r(i, u, s);
            }
        };
        return n[e(561)](q, this, null, function*() {
            const r = e;
            if (n[r(1092)](n[r(513)], r(1196))) return n[r(1092)](this.connectType, n[r(537)]);
            {
                let i = yield this[r(628)](n.qpOif, t);
                return n[r(477)](tt, i);
            }
        });
    }
    [a(354)](t) {
        return {
            bOtLR: function(n, r, i, u) {
                return n(r, i, u);
            }
        }.bOtLR(q, this, null, function*() {
            const n = T;
            return (yield this[n(628)](n(354), t)) === !0;
        });
    }
    [a(1187)]() {
        const t = {
            teeqS: function(e, n) {
                return e === n;
            },
            dZSKm: function(e, n, r, i) {
                return e(n, r, i);
            }
        };
        return t.dZSKm(q, this, null, function*() {
            const e = T;
            return t[e(1010)](yield this[e(628)]("stopAppLocationUpdates"), !0);
        });
    }
    [a(873)]() {
        const t = a, e = {
            eyxYn: function(n, r) {
                return n === r;
            },
            GWRkl: t(344),
            jdoXb: "elcAw",
            pGoqZ: t(873),
            jtIZA: function(n, r, i, u) {
                return n(r, i, u);
            }
        };
        return e[t(877)](q, this, null, function*() {
            const n = t;
            if (e.eyxYn(e.GWRkl, e.jdoXb)) _0xe77998.dispatchEvent(new _0x12b9df(n(734) + _0x1a6ecd, {
                detail: _0x48ce34
            })); else {
                let r = yield this[n(628)](e[n(362)]);
                return nt(r);
            }
        });
    }
    [a(1331)]() {
        const t = {
            lirva: "captureImageFromCamera",
            WobzY: function(e, n) {
                return e(n);
            }
        };
        return q(this, null, function*() {
            const e = T;
            let n = yield this[e(628)](t[e(1342)]);
            return t[e(1103)](nt, n);
        });
    }
    createStartUpPageContainer(t) {
        const e = a, n = {
            ERxKV: function(r, i) {
                return r == i;
            },
            Bzukg: e(608),
            WhiGX: function(r, i) {
                return r >= i;
            },
            VOIGs: function(r, i) {
                return r <= i;
            },
            zjDTr: function(r, i) {
                return r == i;
            },
            wzhUs: e(953),
            Ftpna: e(1101),
            dFEUg: e(367),
            gxadO: e(631),
            IpudA: "SCROLL_BOTTOM",
            crHcO: e(1173),
            HlOyt: e(444),
            MdnpB: e(1138),
            uewwI: e(919),
            zneIS: e(695),
            DyHLS: "ABNORMAL_EXIT_EVENT",
            lpvHT: e(437),
            gRztm: "SYSTEM_EXIT",
            VRNSq: e(1086),
            LMflb: function(r, i) {
                return r !== i;
            },
            FPFEy: e(946),
            TWtwY: function(r, i, u, s) {
                return r(i, u, s);
            }
        };
        return n[e(1070)](q, this, null, function*() {
            const r = e;
            if (n[r(479)](r(845), r(845))) {
                if (n[r(396)](typeof _0x4aec47, n.Bzukg) && _0x35be02[r(1362)](_0x3c5ffd)) return n[r(1170)](_0x5ec304, 0) && n[r(915)](_0x4ccec4, 8) ? _0x298ea1 : void 0;
                if (n[r(1365)](typeof _0x5ab681, n[r(1189)])) switch (_0x2de591[r(906)]()[r(686)]()) {
                  case n.Ftpna:
                  case n[r(795)]:
                    return 0;

                  case "SCROLL_TOP_EVENT":
                  case r(822):
                    return 1;

                  case n[r(693)]:
                  case n[r(927)]:
                    return 2;

                  case n.crHcO:
                  case n[r(1221)]:
                    return 3;

                  case r(538):
                  case n.MdnpB:
                    return 4;

                  case n.uewwI:
                  case n[r(1059)]:
                    return 5;

                  case n[r(417)]:
                  case n[r(360)]:
                    return 6;

                  case "SYSTEM_EXIT_EVENT":
                  case n[r(1332)]:
                    return 7;

                  case n.VRNSq:
                  case "IMU_DATA":
                  case r(377):
                    return 8;

                  default:
                    return;
                }
            } else {
                let i = Ve[r(489)](t);
                i.widgetId = window.__EVEN_HUB_APP_ID__;
                let u = yield this.callEvenApp(n[r(621)], i);
                return Y[r(1330)](u);
            }
        });
    }
    [a(996)](t) {
        const e = a, n = {
            fvPCx: e(996),
            BBsPR: function(r, i) {
                return r != i;
            },
            jqVEj: function(r, i, u, s) {
                return r(i, u, s);
            }
        };
        return n[e(661)](q, this, null, function*() {
            const r = e;
            let i = yield this[r(628)](n[r(581)], Fe[r(489)](t));
            return n[r(643)](i, null) ? i : !1;
        });
    }
    [a(395)](t) {
        const e = a, n = {
            jbfEp: e(395),
            ahJeZ: function(r, i, u, s) {
                return r(i, u, s);
            }
        };
        return n[e(1148)](q, this, null, function*() {
            const r = e;
            let i = yield this[r(628)](n.jbfEp, Mt[r(489)](t));
            return de.normalize(i);
        });
    }
    [a(1096)](t) {
        const e = a, n = {
            YnKaS: function(r, ...i) {
                return r(...i);
            },
            ZpUWF: function(r, i) {
                return r === i;
            },
            dBftW: e(773),
            SClpE: function(r, i) {
                return r != i;
            },
            OEGcG: function(r, i, u, s) {
                return r(i, u, s);
            }
        };
        return n[e(1281)](q, this, null, function*() {
            const r = e, i = {
                MfATC: function(u, ...s) {
                    return n[T(551)](u, ...s);
                }
            };
            if (n.ZpUWF(n[r(1352)], n[r(1352)])) {
                let u = yield this[r(628)](r(1096), ue[r(489)](t));
                return n[r(1255)](u, null) ? u : !1;
            } else i[r(754)](_0x2db55b, ..._0x177fb0);
        });
    }
    [a(1157)](t) {
        const e = a, n = {
            dlttY: function(r, i) {
                return r(i);
            },
            nknDv: e(779),
            cBJOO: function(r, i) {
                return r === i;
            },
            Twlcy: function(r, i, u, s) {
                return r(i, u, s);
            }
        };
        return n.Twlcy(q, this, arguments, function*(r, i = e(1317)) {
            const u = e;
            if (u(1194) === n[u(1311)]) n[u(1065)](_0x4477f3, _0xf95654); else return n[u(1053)](yield this[u(628)]("audioControl", {
                isOpen: r,
                source: n[u(1065)](Re, i)
            }), !0);
        });
    }
    [a(934)](t) {
        const e = a, n = {
            JrgJO: function(r, i) {
                return r !== i;
            },
            zeZCc: e(620),
            nSqOc: function(r, i) {
                return r === i;
            },
            VQJKC: e(934)
        };
        return q(this, arguments, function*(r, i = 100) {
            const u = e;
            return n[u(847)](n.zeZCc, n[u(1276)]) ? _0x52c8d9(_0x19fb2b) ? _0x1ccc24 : {} : n[u(1119)](yield this[u(628)](n[u(1004)], at[u(489)](new at({
                iMUReportEn: r ? 1 : 0,
                reportFrq: i
            }))), !0);
        });
    }
    [a(1186)](t = 0) {
        const e = a, n = {
            ovwZf: e(704)
        };
        return q(this, null, function*() {
            const r = e;
            if (n[r(1322)] === "iLGFL") _0xa4d8f9[r(959)](this, _0x24038a); else {
                let i = new ut({
                    exitMode: t
                }), u = yield this[r(628)](r(1186), ut.toJson(i));
                return u ?? !1;
            }
        });
    }
    onLaunchSource(t) {
        const e = a, n = {
            neUdI: function(i, u) {
                return i != u;
            },
            jwgku: "evenAppLaunchSource",
            xDUen: function(i, u) {
                return i == u;
            }
        };
        if (n[e(923)](typeof window, e(563))) return () => {};
        let r = i => {
            const u = e;
            var s;
            let f = i;
            n.neUdI(s = f[u(853)], null) && s[u(939)] && t(f[u(853)][u(939)]);
        };
        return window[e(1095)](e(664), r), () => {
            window[e(997)](n.jwgku, r);
        };
    }
    onDeviceStatusChanged(t) {
        const e = a, n = {
            uytKA: function(i, u) {
                return i(u);
            },
            ZhuZB: "UqSgg",
            LcMfH: function(i, u) {
                return i(u);
            },
            uTnsV: e(425),
            mjxdN: function(i, u) {
                return i == u;
            },
            kSvmS: e(563)
        };
        if (n[e(941)](typeof window, n[e(1005)])) return () => {};
        let r = i => {
            const u = e, s = {
                Dvxlw: function(d, l) {
                    return n[T(714)](d, l);
                }
            };
            if (n[u(1042)] !== "UqSgg") {
                var f;
                let d = _0x3532b8;
                (f = d.detail) != null && f[u(939)] && s.Dvxlw(_0x48a540, d.detail[u(939)]);
            } else n[u(1319)](t, i[u(853)]);
        };
        return window.addEventListener(n[e(1076)], r), () => {
            const i = e;
            window.removeEventListener(n[i(1076)], r);
        };
    }
    [a(688)](t) {
        const e = a, n = {
            xhdCo: function(i, u) {
                return i(u);
            },
            mZYBv: "evenHubEvent",
            NDovJ: function(i, u) {
                return i == u;
            },
            MAOSC: "undefined"
        };
        if (n[e(1176)](typeof window, n[e(1376)])) return () => {};
        let r = i => {
            const u = e;
            n[u(604)](t, i[u(853)]);
        };
        return window[e(1095)](n.mZYBv, r), () => {
            window[e(997)](n.mZYBv, r);
        };
    }
    onAppLocationChanged(t) {
        const e = a, n = {
            Zuiae: function(i, u) {
                return i(u);
            },
            wfOww: e(1346),
            YkoPo: function(i, u) {
                return i == u;
            },
            vCGDl: "undefined"
        };
        if (n.YkoPo(typeof window, n[e(831)])) return () => {};
        let r = i => {
            const u = e;
            n[u(827)](t, i[u(853)]);
        };
        return window[e(1095)](n[e(515)], r), () => {
            const i = e;
            window[i(997)](n[i(515)], r);
        };
    }
};

function Tt() {
    const o = a, t = {
        BzzWj: function(e, n) {
            return e(n);
        },
        vYZGC: function(e, n) {
            return e instanceof n;
        },
        LMKWg: function(e, n) {
            return e !== n;
        },
        uLrzE: "FtTUN",
        mctOq: o(1380),
        lghgk: function(e, n) {
            return e(n);
        },
        NJBoz: o(953),
        AQLgE: function(e, n) {
            return e instanceof n;
        },
        dFEwk: function(e, n) {
            return e == n;
        },
        cjzzT: o(563),
        FwHvS: function(e, n) {
            return e(n);
        },
        cMVVK: o(542),
        zzaei: function(e, n, r) {
            return e(n, r);
        }
    };
    return new Promise(e => {
        const n = o, r = {
            GQJso: t[n(569)],
            jMFfg: function(i, u) {
                return t[n(352)](i, u);
            }
        };
        if (t.LMKWg(n(463), n(1191))) {
            if (t[n(1131)](typeof window, t[n(536)])) throw new Error("window is not defined");
            let i = window.EvenAppBridge;
            if (i && i[n(585)]) {
                t[n(1117)](e, i);
                return;
            }
            let u = () => {
                let s = window.EvenAppBridge;
                s && (s._ready = !0, t.BzzWj(e, s));
            };
            window[n(1095)](t.cMVVK, u, {
                once: !0
            }), i && t[n(863)](setTimeout, () => {
                const s = n, f = {
                    MwXZq: function(d, l) {
                        return t.vYZGC(d, l);
                    }
                };
                if (t[s(1163)](t[s(931)], t[s(1236)])) i && (i[s(638)] = !0, t[s(1393)](e, i)); else return _0x540958 ? f[s(1244)](_0x374dbf, _0x244c41) ? _0x288ad5.toJson() : new _0x48048e(_0x2553c6)[s(489)]() : {};
            }, 100);
        } else {
            if (typeof _0x213260 == r[n(503)]) return _0x2c3e1c;
            if (_0x56a4bc[n(1361)](_0x40b931)) return _0x2a37b4[n(914)](i => _0x1a2916(i) & 255);
            if (r.jMFfg(_0x550797, _0x3ba210)) return _0x16968e[n(947)](_0x2aac4b);
            if (r[n(482)](_0x5f2c19, _0x3e24c4)) return _0x361e74.from(new _0x326bbb(_0x4d72a1));
        }
    });
}

typeof window < "u" && cn[a(1228)]();

const Ie = "http://localhost:8765", fn = "http://127.0.0.1:8765", dn = "ws://localhost:8765/even-hub-ws", ln = "ws://127.0.0.1:8765/even-hub-ws";

class Et {
    constructor(t = Ie, e = fetch, n = 3e3, r, i = (t === Ie ? [ fn ] : []), u = (typeof window > "u" || typeof WebSocket > "u" ? void 0 : f => new WebSocket(f)), s = (t === Ie ? [ dn, ln ] : [])) {
        P(this, "activeBaseUrl");
        P(this, "activeWebSocketUrl");
        this.baseUrl = t, this.fetcher = e, this.timeoutMs = n, this.accessKey = r, this.fallbackBaseUrls = i, 
        this.webSocketFactory = u, this.webSocketUrls = s;
    }
    async health() {
        return gn(await this.request("GET", "/health", !1));
    }
    async items() {
        const t = await this.request("GET", "/items", !0);
        if (!Array.isArray(t)) throw new G;
        return t.map(xt).map(G2ApplyPinToItem);
    }
    async deleteItem(t) {
        await this.request("DELETE", `/items/${encodeURIComponent(t)}`, !0);
    }
    async clearItems() {
        await this.request("DELETE", "/items", !0);
    }
    async updateRead(t, e) {
        return xt(await this.request("PATCH", `/items/${encodeURIComponent(t)}`, !0, {
            read: e
        }));
    }
    async screenSnapshot() {
        return pn(await this.request("GET", "/screen-snapshot", !0));
    }
    async request(t, e, n, r) {
        const i = Array.from(new Set([ ...this.activeWebSocketUrl ? [ this.activeWebSocketUrl ] : [], ...this.webSocketUrls ]));
        let u;
        if (this.webSocketFactory) for (const f of i) try {
            const d = await this.requestFromWebSocket(f, t, e, n, r);
            return this.activeWebSocketUrl = f, d;
        } catch (d) {
            if (u = d, !st(d)) throw d;
        }
        const s = Array.from(new Set([ ...this.activeBaseUrl ? [ this.activeBaseUrl ] : [], this.baseUrl, ...this.fallbackBaseUrls ]));
        for (const [f, d] of s.entries()) try {
            const l = await this.requestFrom(d, t, e, n, r);
            return this.activeBaseUrl = d, l;
        } catch (l) {
            if (u = l, !st(l) || f === s.length - 1) throw l;
        }
        throw u;
    }
    requestFromWebSocket(t, e, n, r, i) {
        const u = this.webSocketFactory;
        return u ? new Promise((s, f) => {
            let d = !1, l;
            const c = p => {
                d || (d = !0, globalThis.clearTimeout(h), p());
            }, x = () => c(() => f(new TypeError("Local WebSocket connection failed"))), h = globalThis.setTimeout(() => {
                try {
                    l == null || l.close();
                } catch {}
                c(() => f(new DOMException("Timed out", "AbortError")));
            }, Math.min(this.timeoutMs, vn));
            try {
                l = u(t);
            } catch {
                x();
                return;
            }
            l.onopen = () => {
                const p = {
                    id: 1,
                    method: e,
                    path: n,
                    ...r && this.accessKey ? {
                        accessKey: this.accessKey
                    } : {},
                    ...i === void 0 ? {} : {
                        body: JSON.stringify(i)
                    }
                };
                l.send(JSON.stringify(p));
            }, l.onmessage = p => {
                try {
                    const w = hn(p.data);
                    if (w.id !== 1) throw new G;
                    if (w.status < 200 || w.status >= 300) {
                        c(() => f(new Ne(w.status))), l == null || l.close();
                        return;
                    }
                    const y = w.status === 204 ? void 0 : JSON.parse(w.body);
                    c(() => s(y)), l == null || l.close();
                } catch (w) {
                    c(() => f(w)), l == null || l.close();
                }
            }, l.onerror = x, l.onclose = x;
        }) : Promise.reject(new TypeError("WebSocket unavailable"));
    }
    async requestFrom(t, e, n, r, i) {
        const u = new AbortController, s = globalThis.setTimeout(() => u.abort(), this.timeoutMs);
        try {
            const f = {
                Accept: "application/json",
                "X-Send-To-G2-Client": "even-hub"
            };
            r && this.accessKey && (f.Authorization = `Bearer ${this.accessKey}`), i !== void 0 && (f["Content-Type"] = "application/json");
            const d = await this.fetcher(`${t}${n}`, {
                method: e,
                headers: f,
                ...i === void 0 ? {} : {
                    body: JSON.stringify(i)
                },
                signal: u.signal
            });
            if (!d.ok) throw new Ne(d.status);
            return d.status === 204 ? void 0 : await d.json();
        } finally {
            globalThis.clearTimeout(s);
        }
    }
}

const vn = 1500;

function hn(o) {
    if (typeof o != "string") throw new G;
    const t = JSON.parse(o);
    if (!Se(t) || typeof t.id != "number" || !Number.isSafeInteger(t.id) || typeof t.status != "number" || !Number.isSafeInteger(t.status) || typeof t.body != "string") throw new G;
    return {
        id: t.id,
        status: t.status,
        body: t.body
    };
}

function st(o) {
    return o instanceof TypeError || o instanceof DOMException && o.name === "AbortError";
}

class Ne extends Error {
    constructor(t) {
        super(`Local API returned HTTP ${t}`), this.status = t;
    }
}

class G extends Error {
    constructor() {
        super("Local API returned an invalid response");
    }
}

function gn(o) {
    if (!Se(o) || o.ok !== !0 || typeof o.version != "string") throw new G;
    return {
        ok: !0,
        version: o.version
    };
}

const G2_PINNED_ITEMS_KEY = "sendToG2.pinnedItemIds";
let G2PinnedIdCache;
function G2DecodePinnedIds(o) {
    try {
        const t = JSON.parse(String(o || "[]"));
        return Array.isArray(t) ? t.filter(e => typeof e == "string" && e.length > 0) : [];
    } catch {
        return [];
    }
}
function G2ReadPinnedRawValues() {
    return [
        (() => { try { return localStorage.getItem(G2_PINNED_ITEMS_KEY); } catch { return; } })(),
        (() => { try { return sessionStorage.getItem(G2_PINNED_ITEMS_KEY); } catch { return; } })(),
        (() => { try { return G2ReadCookieValue(G2_PINNED_ITEMS_KEY); } catch { return; } })()
    ];
}
function G2LoadPinnedIdsFromStorage() {
    const o = new Set;
    for (const t of G2ReadPinnedRawValues()) for (const e of G2DecodePinnedIds(t)) o.add(e);
    return o;
}
function G2PinnedIds() {
    return G2PinnedIdCache || (G2PinnedIdCache = G2LoadPinnedIdsFromStorage()), G2PinnedIdCache;
}
function G2SavePinnedIds(o) {
    G2PinnedIdCache = new Set(Array.from(o).filter(n => typeof n == "string" && n.length > 0));
    const t = JSON.stringify(Array.from(G2PinnedIdCache)), e = String(Date.now());
    try {
        localStorage.setItem(G2_PINNED_ITEMS_KEY, t);
        localStorage.setItem(`${G2_PINNED_ITEMS_KEY}.updatedAt`, e);
    } catch {}
    try {
        sessionStorage.setItem(G2_PINNED_ITEMS_KEY, t);
        sessionStorage.setItem(`${G2_PINNED_ITEMS_KEY}.updatedAt`, e);
    } catch {}
    try { G2WriteCookieValue(G2_PINNED_ITEMS_KEY, t); } catch {}
}
function G2IsPinnedItemId(o) {
    return typeof o == "string" && G2PinnedIds().has(o);
}
function G2IsPinnedItem(o) {
    return !!(o && (o.pinned === !0 || G2IsPinnedItemId(o.id)));
}
function G2SetPinnedItemId(o, t) {
    if (typeof o != "string" || !o) return;
    const e = new Set(G2PinnedIds());
    t ? e.add(o) : e.delete(o), G2SavePinnedIds(e);
}
function G2ApplyPinToItem(o) {
    return o ? { ...o, pinned: G2IsPinnedItemId(o.id) } : o;
}
function G2ApplyPins(o) {
    return Array.isArray(o) ? o.map(G2ApplyPinToItem) : o;
}
function G2HasPinnedItems(o) {
    return !!(o && o.status === "ready" && o.items.some(G2IsPinnedItem));
}
function G2CurrentPinned(o) {
    return !!(o && o.status === "ready" && G2IsPinnedItem(R(o)));
}
function G2PinnedDeleteBlockedText(o) {
    return (o && o.pinnedDeleteBlocked) || "Pinned item. Unpin it on the phone before deleting.";
}
function G2PinnedClearBlockedText(o) {
    return (o && o.pinnedClearBlocked) || "Pinned items are protected. Unpin them on the phone before clearing the inbox.";
}
function G2PinItemLabel(o, t) {
    return t ? (o && o.unpinItem) || "Unpin" : (o && o.pinItem) || "Pin";
}

function xt(o) {
    if (!Se(o) || typeof o.id != "string" || o.type !== "text" && o.type !== "url" || typeof o.text != "string" || o.text.length > 65536 || typeof o.createdAt != "number" || !Number.isSafeInteger(o.createdAt) || o.createdAt < 0 || typeof o.read != "boolean" || !ct(o.title) || !ct(o.sourceApp)) throw new G;
    return {
        id: o.id,
        type: o.type,
        text: o.text,
        createdAt: o.createdAt,
        read: o.read,
        pinned: G2IsPinnedItemId(o.id),
        ...o.title === void 0 ? {} : {
            title: o.title
        },
        ...o.sourceApp === void 0 ? {} : {
            sourceApp: o.sourceApp
        }
    };
}

function pn(o) {
    if (!Se(o) || typeof o.id != "string" || typeof o.createdAt != "number" || !Number.isSafeInteger(o.createdAt) || o.createdAt < 0 || typeof o.width != "number" || !Number.isInteger(o.width) || o.width < 1 || o.width > 288 || typeof o.height != "number" || !Number.isInteger(o.height) || o.height < 1 || o.height > 144 || o.mimeType !== "image/png" || typeof o.imageBase64 != "string" || o.imageBase64.length === 0 || o.imageBase64.length > 512e3) throw new G;
    return {
        id: o.id,
        createdAt: o.createdAt,
        width: o.width,
        height: o.height,
        mimeType: o.mimeType,
        imageBase64: o.imageBase64
    };
}

function Se(o) {
    return typeof o == "object" && o !== null && !Array.isArray(o);
}

function ct(o) {
    return o === void 0 || typeof o == "string";
}

const Xe = "send-to-g2.local-api-access-key", wn = /^[A-Za-z0-9_-]{20,128}$/;

function Ye(o) {
    return String(o || "").replace(/\s/g, "");
}

function Nt(o) {
    return wn.test(Ye(o));
}

function G2ReadCookieValue(o) {
    try {
        const t = document.cookie.split(";").map(e => e.trim()).find(e => e.startsWith(`${o}=`));
        return t ? decodeURIComponent(t.slice(o.length + 1)) : void 0;
    } catch {
        return;
    }
}

function G2WriteCookieValue(o, t) {
    try {
        document.cookie = `${o}=${encodeURIComponent(t)}; Max-Age=31536000; Path=/; SameSite=Lax`;
        return !0;
    } catch {
        return !1;
    }
}

function G2ClearCookieValue(o) {
    try {
        document.cookie = `${o}=; Max-Age=0; Path=/; SameSite=Lax`;
    } catch {}
}

function G2ReadAccessKeyFromUrl() {
    try {
        const o = new URL(window.location.href), t = o.searchParams.get("accessKey") || o.searchParams.get("apiKey") || o.searchParams.get("key");
        if (t && Nt(t)) return Ye(t);
        const e = new URLSearchParams((o.hash || "").replace(/^#/, "")), n = e.get("accessKey") || e.get("apiKey") || e.get("key");
        return n && Nt(n) ? Ye(n) : void 0;
    } catch {
        return;
    }
}

function G2MirrorAccessKey(o) {
    const t = Ye(o);
    if (!Nt(t)) return !1;
    let e = !1;
    try { localStorage.setItem(Xe, t), e = !0; } catch {}
    try { sessionStorage.setItem(Xe, t), e = !0; } catch {}
    e = G2WriteCookieValue(Xe, t) || e;
    return e;
}

function Je(o = localStorage) {
    const t = [
        G2ReadAccessKeyFromUrl(),
        (() => { try { return o && o.getItem ? o.getItem(Xe) : void 0; } catch { return; } })(),
        (() => { try { return localStorage.getItem(Xe); } catch { return; } })(),
        (() => { try { return sessionStorage.getItem(Xe); } catch { return; } })(),
        G2ReadCookieValue(Xe)
    ];
    for (const e of t) if (e && Nt(e)) return G2MirrorAccessKey(e), Ye(e);
    return;
}

function mn(o, t = localStorage) {
    const e = Ye(o);
    if (!Nt(e)) return !1;
    let n = !1;
    try { t && t.setItem && (t.setItem(Xe, e), n = !0); } catch {}
    return G2MirrorAccessKey(e) || n;
}

function yn(o = localStorage) {
    try { o && o.removeItem && o.removeItem(Xe); } catch {}
    try { localStorage.removeItem(Xe); } catch {}
    try { sessionStorage.removeItem(Xe); } catch {}
    G2ClearCookieValue(Xe);
}

const bn = 700;

function Ln(o, t = bn) {
    if (t < 1) throw new RangeError("maxLength must be positive");
    const e = o.replace(/\r\n?/g, `\n`).replace(/[ \t]+\n/g, `\n`).trim();
    if (!e) return [ "" ];
    const n = [];
    let r = e;
    for (;r.length > t; ) {
        const i = r.slice(0, t + 1), u = Cn(i, t);
        n.push(r.slice(0, u).trimEnd()), r = r.slice(u).trimStart();
    }
    return n.push(r), n;
}

function Cn(o, t) {
    const e = o.lastIndexOf(`\n\n`, t);
    if (e >= Math.floor(t * .5)) return e + 2;
    const n = o.lastIndexOf(`\n`, t);
    if (n >= Math.floor(t * .6)) return n + 1;
    const r = Math.max(o.lastIndexOf(" ", t), o.lastIndexOf("\t", t));
    return r >= Math.floor(t * .7) ? r + 1 : t;
}

function zn(o, t) {
    if (t.type === "load") return t.items.length === 0 ? {
        status: "empty"
    } : {
        status: "ready",
        items: G2ApplyPins(t.items),
        selectedIndex: 0,
        pageIndex: 0
    };
    if (t.type === "refresh") return Dn(o, G2ApplyPins(t.items));
    if (t.type === "fail") return {
        status: "error",
        reason: t.reason
    };
    if (o.status !== "ready") return o;
    if (t.type === "clear") return {
        status: "empty"
    };
    if (t.type === "select-item") return !Number.isInteger(t.index) || t.index < 0 || t.index >= o.items.length || t.index === o.selectedIndex && o.pageIndex === 0 ? o : {
        ...o,
        selectedIndex: t.index,
        pageIndex: 0
    };
    if (t.type === "update-current-read") return {
        ...o,
        items: o.items.map((n, r) => r === o.selectedIndex ? {
            ...n,
            read: t.read
        } : n)
    };
    if (t.type === "delete-current") {
        const n = o.items.filter((r, i) => i !== o.selectedIndex);
        return n.length === 0 ? {
            status: "empty"
        } : {
            status: "ready",
            items: n,
            selectedIndex: Math.min(o.selectedIndex, n.length - 1),
            pageIndex: 0
        };
    }
    if (t.type === "next-item") return {
        ...o,
        selectedIndex: (o.selectedIndex + 1) % o.items.length,
        pageIndex: 0
    };
    if (t.type === "previous-item") return {
        ...o,
        selectedIndex: (o.selectedIndex - 1 + o.items.length) % o.items.length,
        pageIndex: 0
    };
    const e = qe(o).length;
    return t.type === "next-page" ? o.pageIndex >= e - 1 ? o : {
        ...o,
        pageIndex: Math.min(o.pageIndex + 1, e - 1)
    } : o.pageIndex === 0 ? o : {
        ...o,
        pageIndex: Math.max(o.pageIndex - 1, 0)
    };
}

function Dn(o, t) {
    var s;
    if (t.length === 0) return {
        status: "empty"
    };
    if (o.status !== "ready") return {
        status: "ready",
        items: G2ApplyPins(t),
        selectedIndex: 0,
        pageIndex: 0
    };
    const e = (s = o.items[o.selectedIndex]) == null ? void 0 : s.id, n = t.findIndex(f => f.id === e), r = n >= 0 ? n : Math.min(o.selectedIndex, t.length - 1), i = {
        status: "ready",
        items: G2ApplyPins(t),
        selectedIndex: r,
        pageIndex: o.pageIndex
    }, u = qe(i).length;
    return {
        ...i,
        pageIndex: n >= 0 ? Math.min(o.pageIndex, u - 1) : 0
    };
}

function R(o) {
    return o.status === "ready" ? o.items[o.selectedIndex] : void 0;
}

function qe(o) {
    const t = R(o);
    return t ? Ln(t.text) : [ "" ];
}

const De = 17, ft = 64;

function An(o, t, e) {
    const n = Math.max(1, Math.ceil(o.length / De)), r = Math.max(0, Math.min(t, n - 1)), i = r * De, u = o.slice(i, i + De).map((s, f) => {
        var x;
        const d = i + f, l = ((x = s.title) == null ? void 0 : x.trim()) || e.untitled, c = s.read ? e.read : e.unread, m = G2IsPinnedItem(s) ? "★ " : "";
        return {
            kind: "item",
            itemIndex: d,
            label: Bn(`${d + 1}. ${m}[${c}] ${l}`),
            cardLabel: Bn(`${d + 1}. ${m}[${c}]\n${l}`)
        };
    });
    return r > 0 && u.unshift({
        kind: "previous-page",
        label: e.previous
    }), r < n - 1 && u.push({
        kind: "next-page",
        label: e.next
    }), u.unshift({
        kind: "screen-sharing",
        label: e.screenSharing
    }), {
        pageIndex: r,
        pageCount: n,
        itemCount: o.length,
        entries: u
    };
}

function dt(o, t, e) {
    const n = t ? o.entries.find(r => r.label === t) : void 0;
    return n || (e === void 0 ? void 0 : o.entries[e]);
}

function Mn(o) {
    return Math.max(0, Math.floor(o / De));
}

function Bn(o) {
    return o.length <= ft ? o : o.slice(0, ft - 3).trimEnd() + "...";
}

class Tn {
    constructor(t = 800) {
        P(this, "blockedUntil", 0);
        this.cooldownMs = t;
    }
    actionFor(t, e, n, r = Date.now()) {
        if (r < this.blockedUntil || n <= 1) return;
        const i = t === "bottom" ? e < n - 1 ? "next-page" : void 0 : e > 0 ? "previous-page" : void 0;
        if (i) return this.blockedUntil = r + this.cooldownMs, i;
    }
}

class En {
    constructor(t, e, n = 350, r = Date.now) {
        P(this, "previousIndex");
        P(this, "previousTapAt", 0);
        this.onSingleTap = t, this.onDoubleTap = e, this.doubleTapMs = n, this.now = r;
    }
    tap(t, e = this.now()) {
        if (this.previousIndex === t && e >= this.previousTapAt && e - this.previousTapAt <= this.doubleTapMs) {
            this.clearPrevious(), this.onDoubleTap(t);
            return;
        }
        this.previousIndex = t, this.previousTapAt = e, this.onSingleTap(t);
    }
    doubleTapNow(t) {
        this.clearPrevious(), this.onDoubleTap(t);
    }
    clearPrevious() {
        this.previousIndex = void 0, this.previousTapAt = 0;
    }
}

function Nn(o) {
    if (!o) return;
    const t = o.eventType === void 0 ? M.CLICK_EVENT : M.fromJson(o.eventType);
    if (t === M.CLICK_EVENT) return "accept";
    if (t === M.DOUBLE_CLICK_EVENT) return "double-click";
}

function Sn(o) {
    if (qn(o)) return {
        event: o,
        source: "typed"
    };
    const t = YnR1(o);
    return t ? {
        event: t,
        source: "raw-top-event"
    } : {
        event: Bt(o),
        source: "raw"
    };
}

function YnR1(o) {
    if (!o || typeof o != "object") return;
    const t = o.detail && typeof o.detail == "object" ? o.detail : o;
    const e = [ ...Ae(t, "eventtype"), ...Ae(t, "event") ].map(n => M.fromJson(n)).filter(n => n !== void 0);
    let n = e[0];
    const r = (() => {
        try {
            return JSON.stringify(t).toLowerCase();
        } catch {
            return "";
        }
    })();
    const i = Ae(t, "currentselectitemname").find(f => typeof f == "string" && f.length > 0);
    const u = [ ...Ae(t, "currentselectitemindex"), ...Ae(t, "listselectitemid"), ...Ae(t, "listselectitemindex"), ...Ae(t, "selectitemid"), ...Ae(t, "selectedindex"), ...Ae(t, "itemindex") ].map(Hn).find(f => f !== void 0);
    const s = {
        eventType: n
    };
    if (n === void 0 && (i !== void 0 || u !== void 0)) {
        i !== void 0 && (s.currentSelectItemName = i);
        u !== void 0 && (s.currentSelectItemIndex = u);
        return {
            jsonData: t,
            listEvent: s
        };
    }
    if (n === void 0 && (r.includes("click_event") || r.includes("tap"))) n = M.CLICK_EVENT;
    if (n === void 0) return;
    i !== void 0 && (s.currentSelectItemName = i);
    u !== void 0 && (s.currentSelectItemIndex = u);
    return {
        jsonData: t,
        ...i !== void 0 || u !== void 0 ? {
            listEvent: s
        } : {
            sysEvent: s
        }
    };
}

function qn(o) {
    if (!o || typeof o != "object") return !1;
    const t = o;
    return t.listEvent !== void 0 || t.textEvent !== void 0 || t.sysEvent !== void 0;
}

const In = [ 0, 0, 0 ];

async function Kn(o, t = In, e = _n) {
    for (const n of t) {
        n > 0 && await e(n);
        try {
            if (await o()) return !0;
        } catch {}
    }
    return !1;
}

function _n(o) {
    return new Promise(t => globalThis.setTimeout(t, o));
}

class Pn {
    constructor() {
        P(this, "selectedName");
        P(this, "selectedIndex");
    }
    handle(t) {
        const e = t.listEvent;
        e != null && e.currentSelectItemName && (this.selectedName = e.currentSelectItemName), 
        (e == null ? void 0 : e.currentSelectItemIndex) !== void 0 && Number.isInteger(e.currentSelectItemIndex) && e.currentSelectItemIndex >= 0 && (this.selectedIndex = e.currentSelectItemIndex);
        const n = [ Ke(e), Ke(t.textEvent), Ke(t.sysEvent), ...Ae(t.jsonData, "eventtype").map(u => M.fromJson(u)) ].filter(u => u !== void 0), r = Ae(t.jsonData, "currentselectitemname").find(u => typeof u == "string" && u.length > 0), i = [ ...Ae(t.jsonData, "currentselectitemindex"), ...Ae(t.jsonData, "listselectitemid"), ...Ae(t.jsonData, "listselectitemindex"), ...Ae(t.jsonData, "selectitemid"), ...Ae(t.jsonData, "selectedindex"), ...Ae(t.jsonData, "itemindex") ].map(Hn).find(u => u !== void 0), u = i !== void 0 || (e == null ? void 0 : e.currentSelectItemIndex) !== void 0;
        return r && (this.selectedName = r), i !== void 0 && (this.selectedIndex = i), {
            kind: kn(n),
            fromEventIndex: u,
            ...this.selectedName === void 0 ? {} : {
                selectedName: this.selectedName
            },
            ...this.selectedIndex === void 0 ? {} : {
                selectedIndex: this.selectedIndex
            }
        };
    }
}

function Ke(o) {
    if (o) return M.fromJson(o.eventType ?? M.CLICK_EVENT);
}

function Ae(o, t, e = 0) {
    if (!o || typeof o != "object" || e > 3) return [];
    const n = [];
    for (const [r, i] of Object.entries(o)) jn(r) === t && n.push(i), i && typeof i == "object" && n.push(...Ae(i, t, e + 1));
    return n;
}

function jn(o) {
    return o.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function Hn(o) {
    const t = typeof o == "string" && o.trim() ? Number(o) : o;
    return typeof t == "number" && Number.isInteger(t) && t >= 0 ? t : void 0;
}

function kn(o) {
    return o.includes(M.SYSTEM_EXIT_EVENT) || o.includes(M.ABNORMAL_EXIT_EVENT) ? "exit" : o.includes(M.DOUBLE_CLICK_EVENT) ? "double-click" : o.includes(M.CLICK_EVENT) ? "click" : o.includes(M.SCROLL_TOP_EVENT) ? "scroll-top" : o.includes(M.SCROLL_BOTTOM_EVENT) ? "scroll-bottom" : "other";
}

class On {
    constructor(t, e = (u, s) => window.setTimeout(u, s), n = u => window.clearTimeout(u), r = [ 1e3, 3e3 ], i = 1e4) {
        P(this, "activeRefresh");
        P(this, "timer");
        P(this, "stopped", !1);
        this.refresh = t, this.schedule = e, this.cancel = n, this.retryDelays = r, this.intervalMs = i;
    }
    start() {
        this.stopped = !1, this.runAutomatic(0);
    }
    refreshNow() {
        if (this.activeRefresh) return this.activeRefresh;
        const t = this.refresh().finally(() => {
            this.activeRefresh === t && (this.activeRefresh = void 0);
        });
        return this.activeRefresh = t, t;
    }
    stop() {
        this.stopped = !0, this.timer !== void 0 && (this.cancel(this.timer), this.timer = void 0);
    }
    async runAutomatic(t) {
        const e = await this.refreshNow();
        if (this.stopped || e === "terminal-failure") return;
        const n = this.retryDelays[t], r = e === "success" ? this.intervalMs : n ?? this.intervalMs, i = e === "success" ? 0 : t + 1;
        this.timer = this.schedule(() => {
            this.timer = void 0, this.runAutomatic(i);
        }, r);
    }
}

const Un = {
    da: {
        probeEyebrow: "M2 · forbindelsestest",
        endpoint: "Endpoint",
        transport: "Transport",
        transportValue: "Kun lokal HTTP",
        access: "Adgang",
        accessValue: "Læsning uden cloud",
        retry: "Prøv igen",
        connectedHeading: "Lokal API fundet",
        connectedSummary: (o, t) => `${lt(o)} i indbakken. API ${t}.`,
        connectedGlass: (o, t) => `Send to G2\n\nForbundet lokalt\n${lt(o)}\nAPI ${t}\n\nDobbelttryk for at lukke`,
        failedHeading: "Ingen lokal forbindelse",
        failureTimeout: "Forbindelsen fik ikke svar inden for tidsgrænsen.",
        failureHttp: o => `API'en svarede med HTTP ${o ?? "fejl"}.`,
        failureInvalidResponse: "API-svaret havde et ukendt format.",
        failureNetwork: "WebView’en kunne ikke nå localhost eller 127.0.0.1 på port 8765.",
        failedGlass: o => `Send to G2\n\nIngen lokal forbindelse\n${o}\n\nÅbn Android-appen og prøv igen.`,
        readerTitle: "Delt indbakke",
        readerLoading: "Henter delte elementer...",
        readerEmpty: "Ingen delte elementer endnu.",
        readerFailure: {
            unauthorized: "Åbn Indstillinger og gem nøglen fra Android-appen.",
            timeout: "Den lokale indbakke svarede ikke i tide.",
            http: "Den lokale indbakke returnerede en HTTP-fejl.",
            "invalid-response": "Den lokale indbakke returnerede ukendte data.",
            network: "Kan ikke forbinde til telefonens lokale indbakke."
        },
        pairingTitle: "Par med Android-appen",
        pairingLabel: "Adgangsnøgle",
        pairingHelp: "Kopiér nøglen fra “Par Even Hub” i Android-appen.",
        pairingSave: "Gem og forbind",
        pairingInvalid: "Indtast en gyldig adgangsnøgle.",
        openSettings: "Indstillinger",
        settingsTitle: "Indstillinger",
        settingsBack: "Tilbage",
        settingsKeyStatusSet: "Der er gemt en adgangsnøgle på denne enhed.",
        settingsKeyStatusMissing: "Der er ikke gemt en adgangsnøgle endnu.",
        settingsClearKey: "Ryd gemt nøgle",
        settingsKeyCleared: "Den gemte nøgle er ryddet.",
        settingsAndroidApkTitle: "Android-app",
        settingsAndroidApkHelp: "Download eller opdatér Send to G2 Android-appen fra GitHub.",
        settingsAndroidApkDownload: "Download Android APK",
        settingsAndroidApkRepo: "Åbn GitHub-repo",
        settingsSponsor: "Support ongoing development ☕",
        pinItem: "Fastgør",
        unpinItem: "Frigør",
        pinnedBadge: "Fastgjort",
        pinSaved: "Fastgjort. Frigør på telefonen før sletning.",
        unpinSaved: "Frigjort.",
        pinnedDeleteBlocked: "Fastgjort. Frigør i app før sletning.",
        pinnedClearBlocked: "Fastgjorte elementer er beskyttet. Frigør dem på telefonen før rydning af indbakken.",
        readerMeta: (o, t, e, n, r) => `${o}/${t} · ${r} · side ${e}/${n}`,
        readerHelp: "Klik: næste side · Sidste side: slet · Dobbelttryk: tilbage · Hold: exit",
        itemPickerTitle: "Vælg element",
        menuHelp: "Rul: vælg · Tryk: åbn · Dobbelttryk: slet",
        homeHelp: "Rul: vælg · Tryk: åbn · Dobbelt: slet/tilbage",
        menuPrevious: "Forrige liste",
        menuNext: "Næste liste",
        menuRetry: "Indbakken er klar. Tryk for at åbne menuen.",
        glassesDeleteHelp: "Tryk: slet · Dobbelttryk: annuller",
        inputDiagnostics: (o, t, e) => `R1-events: ${o} · seneste: ${t} (${e})`,
        previousItem: "Forrige element",
        nextItem: "Næste element",
        previousPage: "Forrige side",
        nextPage: "Næste side",
        refresh: "Opdatér",
        deleteCurrent: "Slet element",
        clearAll: "Ryd alt",
        markRead: "Markér læst",
        markUnread: "Markér ulæst",
        readStateRead: "Læst",
        readStateUnread: "Ulæst",
        refreshSuccess: "Indbakken er opdateret.",
        refreshFailure: "Indbakken kunne ikke opdateres lige nu.",
        readMutationFailure: "Læst-status kunne ikke opdateres. Prøv igen.",
        snapshotTitle: "Skærmdeling",
        snapshotLoading: "Henter seneste skærmbillede...",
        snapshotEmpty: "Start skærmdeling i Android-appen først.",
        snapshotReady: "Skærmbilledet opdateres automatisk på brillerne.",
        snapshotRefresh: "Opdatér nu",
        snapshotOpenSharing: "Åbn skærmdeling",
        snapshotOpenInbox: "Åbn indbakke",
        snapshotHelp: "Start og stop delingen i Android-appen.",
        snapshotImageAlt: "Seneste skærmbillede",
        snapshotMeta: (o, t) => `${o}×${t} billede`,
        mutationCancel: "Annuller",
        mutationConfirmDelete: "Slet element",
        mutationConfirmClear: "Ryd indbakke",
        mutationDeleteTitle: "Slet dette element?",
        mutationDeleteBody: o => `“${o}” slettes permanent fra telefonen.`,
        mutationClearTitle: "Ryd hele indbakken?",
        mutationClearBody: "Alle delte elementer slettes permanent fra telefonen.",
        mutationWorking: "Arbejder…",
        mutationFailure: "Handlingen kunne ikke gennemføres. Prøv igen.",
        untitled: "Uden titel",
        typeText: "Tekst",
        typeUrl: "Link",
        demoMode: "Demo-data"
    },
    en: {
        probeEyebrow: "M2 · connection test",
        endpoint: "Endpoint",
        transport: "Transport",
        transportValue: "Local HTTP only",
        access: "Access",
        accessValue: "Read-only without cloud",
        retry: "Try again",
        connectedHeading: "Local API found",
        connectedSummary: (o, t) => `${vt(o)} in the inbox. API ${t}.`,
        connectedGlass: (o, t) => `Send to G2\n\nConnected locally\n${vt(o)}\nAPI ${t}\n\nDouble-tap to close`,
        failedHeading: "No local connection",
        failureTimeout: "The connection did not respond before the timeout.",
        failureHttp: o => `The API returned HTTP ${o ?? "error"}.`,
        failureInvalidResponse: "The API returned an unknown response format.",
        failureNetwork: "The WebView could not reach localhost or 127.0.0.1 on port 8765.",
        failedGlass: o => `Send to G2\n\nNo local connection\n${o}\n\nOpen the Android app and try again.`,
        readerTitle: "Shared inbox",
        readerLoading: "Loading shared items...",
        readerEmpty: "No shared items yet.",
        readerFailure: {
            unauthorized: "Open Settings and save the key from the Android app.",
            timeout: "The local inbox did not respond before the timeout.",
            http: "The local inbox returned an HTTP error.",
            "invalid-response": "The local inbox returned unknown data.",
            network: "Could not connect to the phone’s local inbox."
        },
        pairingTitle: "Pair with the Android app",
        pairingLabel: "Access key",
        pairingHelp: "Copy the key from “Pair Even Hub” in the Android app.",
        pairingSave: "Save and connect",
        pairingInvalid: "Enter a valid access key.",
        openSettings: "Settings",
        settingsTitle: "Settings",
        settingsBack: "Back",
        settingsKeyStatusSet: "An access key is saved on this device.",
        settingsKeyStatusMissing: "No access key is saved yet.",
        settingsClearKey: "Clear saved key",
        settingsKeyCleared: "The saved key was cleared.",
        settingsAndroidApkTitle: "Android app",
        settingsAndroidApkHelp: "Download or update the Send to G2 Android app from GitHub.",
        settingsAndroidApkDownload: "Download Android APK",
        settingsAndroidApkRepo: "Open GitHub repo",
        settingsSponsor: "Support ongoing development ☕",
        pinItem: "Pin",
        unpinItem: "Unpin",
        pinnedBadge: "Pinned",
        pinSaved: "Pinned. Unpin on phone before deleting.",
        unpinSaved: "Unpinned.",
        pinnedDeleteBlocked: "Pinned. Unpin in app to delete.",
        pinnedClearBlocked: "Pinned items are protected. Unpin them on the phone before clearing the inbox.",
        readerMeta: (o, t, e, n, r) => `${o}/${t} · ${r} · page ${e}/${n}`,
        readerHelp: "Click: next page · Last page: delete · Double-click: back · Hold: exit",
        itemPickerTitle: "Choose item",
        menuHelp: "Scroll: select · Click: open · Double-click: delete",
        homeHelp: "Scroll: select · Tap: open · Double: back/delete",
        menuPrevious: "Previous list",
        menuNext: "Next list",
        menuRetry: "The inbox is ready. Click to open the menu.",
        glassesDeleteHelp: "Click: delete · Double-click: cancel",
        inputDiagnostics: (o, t, e) => `R1 events: ${o} · latest: ${t} (${e})`,
        previousItem: "Previous item",
        nextItem: "Next item",
        previousPage: "Previous page",
        nextPage: "Next page",
        refresh: "Refresh",
        deleteCurrent: "Delete item",
        clearAll: "Clear all",
        markRead: "Mark read",
        markUnread: "Mark unread",
        readStateRead: "Read",
        readStateUnread: "Unread",
        refreshSuccess: "Inbox refreshed.",
        refreshFailure: "The inbox could not be refreshed right now.",
        readMutationFailure: "Read status could not be updated. Try again.",
        snapshotTitle: "Screen sharing",
        snapshotLoading: "Loading latest screen snapshot...",
        snapshotEmpty: "Start screen sharing in the Android app first.",
        snapshotReady: "The screen image updates automatically on the glasses.",
        snapshotRefresh: "Refresh now",
        snapshotOpenSharing: "Open screen sharing",
        snapshotOpenInbox: "Open inbox",
        snapshotHelp: "Start and stop sharing in the Android app.",
        snapshotImageAlt: "Latest screen snapshot",
        snapshotMeta: (o, t) => `${o}×${t} image`,
        mutationCancel: "Cancel",
        mutationConfirmDelete: "Delete item",
        mutationConfirmClear: "Clear inbox",
        mutationDeleteTitle: "Delete this item?",
        mutationDeleteBody: o => `“${o}” will be permanently deleted from the phone.`,
        mutationClearTitle: "Clear the entire inbox?",
        mutationClearBody: "All shared items will be permanently deleted from the phone.",
        mutationWorking: "Working…",
        mutationFailure: "The action could not be completed. Try again.",
        untitled: "Untitled",
        typeText: "Text",
        typeUrl: "Link",
        demoMode: "Demo data"
    }
};

const G2_LANGUAGE_KEY = "sendToG2.language";
const G2_LANGUAGE_OPTIONS = [ "auto", "en", "da", "de", "es", "fr", "ru", "zh", "ja" ];
const G2_LANGUAGE_LABELS = { auto: "Automatisk / Automatic", en: "English", da: "Dansk", de: "Deutsch", es: "Español", fr: "Français", ru: "Русский", zh: "中文", ja: "日本語" };
function G2NormalizeLanguage(o) {
    const t = String(o || "").toLowerCase().split("-")[0];
    return G2_LANGUAGE_OPTIONS.includes(t) ? t : "auto";
}
function G2GetLanguageFromUrl() {
    try {
        const o = new URLSearchParams(window.location.search), t = G2NormalizeLanguage(o.get("lang") || o.get("language"));
        return t !== "auto" ? t : "auto";
    } catch {
        return "auto";
    }
}
function G2GetLanguageFromCookie() {
    try {
        const o = document.cookie.split(";").map(t => t.trim()).find(t => t.startsWith(`${G2_LANGUAGE_KEY}=`));
        return o ? G2NormalizeLanguage(decodeURIComponent(o.slice(G2_LANGUAGE_KEY.length + 1))) : "auto";
    } catch {
        return "auto";
    }
}
function G2SetLanguageCookie(o) {
    try {
        const t = G2NormalizeLanguage(o);
        t === "auto" ? document.cookie = `${G2_LANGUAGE_KEY}=; Max-Age=0; Path=/; SameSite=Lax` : document.cookie = `${G2_LANGUAGE_KEY}=${encodeURIComponent(t)}; Max-Age=31536000; Path=/; SameSite=Lax`;
    } catch {}
}
function G2GetLanguageOverride() {
    const o = G2GetLanguageFromUrl();
    if (o !== "auto") return o;
    try {
        const t = G2NormalizeLanguage(localStorage.getItem(G2_LANGUAGE_KEY));
        if (t !== "auto") return t;
    } catch {}
    try {
        const t = G2NormalizeLanguage(sessionStorage.getItem(G2_LANGUAGE_KEY));
        if (t !== "auto") return t;
    } catch {}
    return G2GetLanguageFromCookie();
}
function G2SetLanguageOverride(o) {
    const t = G2NormalizeLanguage(o);
    try { t === "auto" ? localStorage.removeItem(G2_LANGUAGE_KEY) : localStorage.setItem(G2_LANGUAGE_KEY, t); } catch {}
    try { t === "auto" ? sessionStorage.removeItem(G2_LANGUAGE_KEY) : sessionStorage.setItem(G2_LANGUAGE_KEY, t); } catch {}
    G2SetLanguageCookie(t);
    try { localStorage.setItem(`${G2_LANGUAGE_KEY}.updatedAt`, String(Date.now())); } catch {}
}
function G2ApplyLanguageToUrl(o) {
    try {
        const t = G2NormalizeLanguage(o), e = new URL(window.location.href);
        t === "auto" ? (e.searchParams.delete("lang"), e.searchParams.delete("language")) : (e.searchParams.set("lang", t), e.searchParams.delete("language"));
        return `${e.pathname}${e.search}${e.hash}`;
    } catch {
        return window.location.href;
    }
}
function G2LanguageOptionsHtml() {
    const o = G2GetLanguageOverride();
    return G2_LANGUAGE_OPTIONS.map(t => `<option value="${t}"${o === t ? " selected" : ""}>${G2_LANGUAGE_LABELS[t] || t}</option>`).join("");
}
function G2LanguageSettingsHtml(o) {
    return `
      <div class="settings-download settings-language">
        <h2>${o.settingsLanguageTitle || "Language"}</h2>
        <p>${o.settingsLanguageHelp || "Choose display language for the app."}</p>
        <select data-language-select aria-label="${o.settingsLanguageTitle || "Language"}" style="width:100%;border:1px solid #5a7865;border-radius:12px;padding:14px;color:#eef7f0;background:#101914;font:inherit;">
          ${G2LanguageOptionsHtml()}
        </select>
      </div>`;
}
Object.assign(Un.da, { settingsLanguageTitle: "Sprog", settingsLanguageHelp: "Vælg sprog for hele appen. Automatisk bruger telefonens/WebView’ens sprog.", settingsLanguageSaved: "Sproget er gemt globalt." });
Object.assign(Un.en, { settingsLanguageTitle: "Language", settingsLanguageHelp: "Choose language for the whole app. Automatic uses the phone/WebView language.", settingsLanguageSaved: "Language saved globally." });
Object.assign(Un.da, {
    failedHeading: "Mobil-APK ikke tilgængelig",
    failureTimeout: "Android-appens lokale API svarede ikke inden for tidsgrænsen.",
    failureNetwork: "WebView’en kunne ikke nå Android-appens lokale API på localhost/127.0.0.1:8765.",
    failedGlass: o => `Send to G2

Mobil-APK ikke tilgængelig
${o}

Åbn eller genstart Send to G2 på telefonen.`,
    mobileApkReconnecting: "Android-appen svarer ikke lige nu. Beholder sidste kendte indbakke.",
    readerFailure: { ...Un.da.readerFailure,
        timeout: "Android-appens lokale indbakke svarede ikke i tide.",
        http: "Android-appens lokale API returnerede en HTTP-fejl.",
        "invalid-response": "Android-appens lokale API returnerede ukendte data.",
        network: "Kan ikke forbinde til Android-appens lokale indbakke på telefonen."
    }
});
Object.assign(Un.en, {
    failedHeading: "Android app not reachable",
    failureTimeout: "The Android companion app's local API did not respond before the timeout.",
    failureNetwork: "This WebView cannot reach the Android companion app on localhost/127.0.0.1:8765.",
    failedGlass: o => `Send to G2

Android app not reachable
${o}

Open or restart the Send to G2 Android app.`,
    mobileApkReconnecting: "Android app not reachable yet. Keeping the last known inbox.",
    readerFailure: { ...Un.en.readerFailure,
        timeout: "The Android companion app's local inbox did not respond in time.",
        http: "The Android companion app's local API returned an HTTP error.",
        "invalid-response": "The Android companion app's local API returned unexpected data.",
        network: "Cannot reach the Android companion app's local inbox on the phone."
    }
});
Un.de = { ...Un.en, readerTitle: "Geteilter Posteingang", openSettings: "Einstellungen", settingsTitle: "Einstellungen", settingsBack: "Zurück", settingsClearKey: "Gespeicherten Schlüssel löschen", settingsKeyCleared: "Der gespeicherte Schlüssel wurde gelöscht.", settingsKeyStatusSet: "Auf diesem Gerät ist ein Zugriffsschlüssel gespeichert.", settingsKeyStatusMissing: "Es ist noch kein Zugriffsschlüssel gespeichert.", settingsAndroidApkTitle: "Android-App", settingsAndroidApkHelp: "Lade oder aktualisiere die Send to G2 Android-App von GitHub.", settingsAndroidApkDownload: "Android APK herunterladen", settingsAndroidApkRepo: "GitHub-Repo öffnen", settingsLanguageTitle: "Sprache", settingsLanguageHelp: "Sprache für die gesamte App wählen. Automatisch nutzt die Sprache des Telefons/WebView.", settingsLanguageSaved: "Sprache gespeichert.", pairingLabel: "Zugriffsschlüssel", pairingHelp: "Kopiere den Schlüssel aus der Android-App.", pairingSave: "Speichern und verbinden", menuHelp: "Scrollen: wählen · Tippen: öffnen · Doppeltippen: löschen", homeHelp: "Scrollen: wählen · Tippen: öffnen · Doppelt: löschen/zurück", readerHelp: "Scrollen: Seite · Doppeltippen: zurück", snapshotTitle: "Bildschirmfreigabe", readStateRead: "Gelesen", readStateUnread: "Ungelesen", refresh: "Aktualisieren", deleteCurrent: "Element löschen", clearAll: "Alles löschen", settingsSponsor: "Support ongoing development ☕" };
Un.es = { ...Un.en, readerTitle: "Bandeja compartida", openSettings: "Ajustes", settingsTitle: "Ajustes", settingsBack: "Atrás", settingsClearKey: "Borrar clave guardada", settingsKeyCleared: "La clave guardada se ha borrado.", settingsKeyStatusSet: "Hay una clave de acceso guardada en este dispositivo.", settingsKeyStatusMissing: "Aún no hay una clave de acceso guardada.", settingsAndroidApkTitle: "App Android", settingsAndroidApkHelp: "Descarga o actualiza la app Android Send to G2 desde GitHub.", settingsAndroidApkDownload: "Descargar Android APK", settingsAndroidApkRepo: "Abrir repositorio GitHub", settingsLanguageTitle: "Idioma", settingsLanguageHelp: "Elige el idioma de toda la app. Automático usa el idioma del teléfono/WebView.", settingsLanguageSaved: "Idioma guardado.", pairingLabel: "Clave de acceso", pairingHelp: "Copia la clave desde la app Android.", pairingSave: "Guardar y conectar", menuHelp: "Desplazar: elegir · Toque: abrir · Doble: borrar", homeHelp: "Desplazar: elegir · Toque: abrir · Doble: borrar/atrás", readerHelp: "Desplazar: página · Doble toque: atrás", snapshotTitle: "Compartir pantalla", readStateRead: "Leído", readStateUnread: "No leído", refresh: "Actualizar", deleteCurrent: "Borrar elemento", clearAll: "Borrar todo", settingsSponsor: "Support ongoing development ☕" };
Un.fr = { ...Un.en, readerTitle: "Boîte partagée", openSettings: "Réglages", settingsTitle: "Réglages", settingsBack: "Retour", settingsClearKey: "Effacer la clé enregistrée", settingsKeyCleared: "La clé enregistrée a été effacée.", settingsKeyStatusSet: "Une clé d’accès est enregistrée sur cet appareil.", settingsKeyStatusMissing: "Aucune clé d’accès n’est encore enregistrée.", settingsAndroidApkTitle: "App Android", settingsAndroidApkHelp: "Télécharge ou mets à jour l’app Android Send to G2 depuis GitHub.", settingsAndroidApkDownload: "Télécharger l’APK Android", settingsAndroidApkRepo: "Ouvrir le dépôt GitHub", settingsLanguageTitle: "Langue", settingsLanguageHelp: "Choisis la langue de cette WebView. Automatique utilise la langue du téléphone/WebView.", settingsLanguageSaved: "Langue enregistrée.", pairingLabel: "Clé d’accès", pairingHelp: "Copie la clé depuis l’app Android.", pairingSave: "Enregistrer et connecter", menuHelp: "Défilement : choisir · Appui : ouvrir · Double : supprimer", homeHelp: "Défilement : choisir · Appui : ouvrir · Double : supprimer/retour", readerHelp: "Défilement : page · Double appui : retour", snapshotTitle: "Partage d’écran", readStateRead: "Lu", readStateUnread: "Non lu", refresh: "Actualiser", deleteCurrent: "Supprimer l’élément", clearAll: "Tout effacer", settingsSponsor: "Support ongoing development ☕" };
Un.ru = { ...Un.en, readerTitle: "Общая папка", openSettings: "Настройки", settingsTitle: "Настройки", settingsBack: "Назад", settingsClearKey: "Удалить сохранённый ключ", settingsKeyCleared: "Сохранённый ключ удалён.", settingsKeyStatusSet: "На этом устройстве сохранён ключ доступа.", settingsKeyStatusMissing: "Ключ доступа ещё не сохранён.", settingsAndroidApkTitle: "Android-приложение", settingsAndroidApkHelp: "Скачай или обнови Android-приложение Send to G2 с GitHub.", settingsAndroidApkDownload: "Скачать Android APK", settingsAndroidApkRepo: "Открыть GitHub-репозиторий", settingsLanguageTitle: "Язык", settingsLanguageHelp: "Выбери язык для этой WebView. Автоматически — язык телефона/WebView.", settingsLanguageSaved: "Язык сохранён.", pairingLabel: "Ключ доступа", pairingHelp: "Скопируй ключ из Android-приложения.", pairingSave: "Сохранить и подключить", menuHelp: "Прокрутка: выбрать · Нажатие: открыть · Двойное: удалить", homeHelp: "Прокрутка: выбрать · Нажатие: открыть · Двойное: удалить/назад", readerHelp: "Прокрутка: страница · Двойное: назад", snapshotTitle: "Демонстрация экрана", readStateRead: "Прочитано", readStateUnread: "Не прочитано", refresh: "Обновить", deleteCurrent: "Удалить элемент", clearAll: "Очистить всё", settingsSponsor: "Support ongoing development ☕" };
Un.zh = { ...Un.en, readerTitle: "共享收件箱", openSettings: "设置", settingsTitle: "设置", settingsBack: "返回", settingsClearKey: "清除已保存密钥", settingsKeyCleared: "已清除保存的密钥。", settingsKeyStatusSet: "此设备已保存访问密钥。", settingsKeyStatusMissing: "尚未保存访问密钥。", settingsAndroidApkTitle: "Android 应用", settingsAndroidApkHelp: "从 GitHub 下载或更新 Send to G2 Android 应用。", settingsAndroidApkDownload: "下载 Android APK", settingsAndroidApkRepo: "打开 GitHub 仓库", settingsLanguageTitle: "语言", settingsLanguageHelp: "选择此 WebView 的语言。自动模式使用手机/WebView 语言。", settingsLanguageSaved: "语言已保存。", pairingLabel: "访问密钥", pairingHelp: "从 Android 应用复制密钥。", pairingSave: "保存并连接", menuHelp: "滚动：选择 · 点击：打开 · 双击：删除", homeHelp: "滚动：选择 · 点击：打开 · 双击：删除/返回", readerHelp: "滚动：翻页 · 双击：返回", snapshotTitle: "屏幕共享", readStateRead: "已读", readStateUnread: "未读", refresh: "刷新", deleteCurrent: "删除项目", clearAll: "清空全部", settingsSponsor: "Support ongoing development ☕" };
Un.ja = { ...Un.en, readerTitle: "共有受信箱", openSettings: "設定", settingsTitle: "設定", settingsBack: "戻る", settingsClearKey: "保存済みキーを削除", settingsKeyCleared: "保存済みキーを削除しました。", settingsKeyStatusSet: "このデバイスにアクセスキーが保存されています。", settingsKeyStatusMissing: "アクセスキーはまだ保存されていません。", settingsAndroidApkTitle: "Android アプリ", settingsAndroidApkHelp: "GitHub から Send to G2 Android アプリをダウンロードまたは更新します。", settingsAndroidApkDownload: "Android APK をダウンロード", settingsAndroidApkRepo: "GitHub リポジトリを開く", settingsLanguageTitle: "言語", settingsLanguageHelp: "アプリ全体の言語を選択します。自動は電話/WebView の言語を使用します。", settingsLanguageSaved: "言語を保存しました。", pairingLabel: "アクセスキー", pairingHelp: "Android アプリからキーをコピーしてください。", pairingSave: "保存して接続", menuHelp: "スクロール: 選択 · タップ: 開く · ダブル: 削除", homeHelp: "スクロール: 選択 · タップ: 開く · ダブル: 削除/戻る", readerHelp: "スクロール: ページ · ダブルタップ: 戻る", snapshotTitle: "画面共有", readStateRead: "既読", readStateUnread: "未読", refresh: "更新", deleteCurrent: "項目を削除", clearAll: "すべて削除", settingsSponsor: "Support ongoing development ☕" };

function Rn(o) {
    const t = G2GetLanguageOverride();
    if (t !== "auto") return t;
    const e = Array.isArray(o) ? o : [];
    for (const n of e) {
        const r = String(n || "").toLowerCase().split("-")[0];
        if (G2_LANGUAGE_OPTIONS.includes(r) && r !== "auto") return r;
    }
    return "en";
}

function Ze(o) {
    return Un[o] || Un.en;
}

function lt(o) {
    return o === 1 ? "1 element" : `${o} elementer`;
}

function vt(o) {
    return o === 1 ? "1 item" : `${o} items`;
}

function _e(o, t) {
    var h;
    const e = Ze(t);
    if (o.status === "loading") return he("loading", e.readerTitle, e.readerLoading, e);
    if (o.status === "error") return he("error", o.reason === "unauthorized" ? e.pairingTitle : e.failedHeading, e.readerFailure[o.reason], e, o.reason === "unauthorized");
    if (o.status === "empty") return he("empty", e.readerTitle, e.readerEmpty, e);
    const n = R(o);
    if (!n) return he("empty", e.readerTitle, e.readerEmpty, e);
    const r = qe(o), i = Math.min(o.pageIndex, r.length - 1), u = r[i] ?? "", s = ((h = n.title) == null ? void 0 : h.trim()) || e.untitled, f = n.type === "url" ? e.typeUrl : e.typeText, d = n.read ? e.readStateRead : e.readStateUnread, l = e.readerMeta(o.selectedIndex + 1, o.items.length, i + 1, r.length, `${f} - ${d}${G2IsPinnedItem(n) ? " · ★" : ""}`), c = G2IsPinnedItem(n) ? `${e.readerHelp} · ★` : e.readerHelp, x = `${l}\n${s}\n\n${u}\n\n${c}`;
    return {
        status: "ready",
        eyebrow: e.readerTitle,
        heading: s,
        body: u,
        meta: l,
        help: c,
        glassText: Wn(x),
        canNavigateItems: o.items.length > 1,
        canNavigatePages: r.length > 1,
        needsPairing: !1,
        currentRead: n.read
    };
}

const ht = [ {
    id: "demo-long",
    type: "text",
    title: "Long reader demo",
    text: Array.from({
        length: 18
    }, (o, t) => `Paragraph ${t + 1}. This is sample text for testing page navigation on the G2 display without changing Android data.`).join(`\n\n`),
    sourceApp: "demo",
    createdAt: 171e10,
    read: !1
}, {
    id: "demo-link",
    type: "url",
    title: "Even Hub documentation",
    text: "https://github.com/GenomiskDiagnostik/share-with-g2",
    sourceApp: "demo",
    createdAt: 1709999e6,
    read: !1
} ];

function he(o, t, e, n, r = !1) {
    return {
        status: o,
        eyebrow: n.readerTitle,
        heading: t,
        body: e,
        meta: "",
        help: o === "error" ? n.retry : "",
        glassText: `Send to G2\n\n${t}\n\n${e}`,
        canNavigateItems: !1,
        canNavigatePages: !1,
        needsPairing: r
    };
}

function Wn(o) {
    return o.length <= 1e3 ? o : o.slice(0, 997).trimEnd() + "...";
}

function Pe(o, t) {
    const e = Ze(t);
    if (o.status === "loading") return je("loading", e.snapshotTitle, e.snapshotLoading, e);
    if (o.status === "empty") return je("empty", e.snapshotTitle, e.snapshotEmpty, e);
    if (o.status === "error") return je("error", o.reason === "unauthorized" ? e.pairingTitle : e.failedHeading, e.readerFailure[o.reason], e, o.reason === "unauthorized");
    const n = e.snapshotMeta(o.snapshot.width, o.snapshot.height), r = `${o.snapshot.mimeType};base64,${o.snapshot.imageBase64}`, i = " ";
    return {
        status: "ready",
        heading: e.snapshotTitle,
        body: e.snapshotReady,
        meta: n,
        help: e.snapshotHelp,
        glassText: i,
        needsPairing: !1,
        imageSrc: `data:${r}`,
        imageAlt: e.snapshotImageAlt
    };
}

function je(o, t, e, n, r = !1) {
    return {
        status: o,
        heading: t,
        body: e,
        meta: "",
        help: o === "error" ? n.retry : "",
        glassText: `Send to G2\n\n${t}\n\n${e}`,
        needsPairing: r,
        imageAlt: n.snapshotImageAlt
    };
}

function Gn(o) {
    const t = atob(o), e = new Uint8Array(t.length);
    for (let n = 0; n < t.length; n += 1) e[n] = t.charCodeAt(n);
    return e;
}

function erG2(o, t = 288, e = 288) {
    return new Promise((n, r) => {
        const i = new Image;
        i.onload = () => n(i), i.onerror = () => r(new Error("Snapshot image decode failed")), 
        i.src = `data:${o.mimeType || "image/png"};base64,${o.imageBase64}`;
    }).then(async n => {
        const r = document.createElement("canvas");
        r.width = t, r.height = e;
        const i = r.getContext("2d");
        if (!i) throw new Error("2d canvas context unavailable");
        i.fillStyle = "#000", i.fillRect(0, 0, t, e);
        const u = Math.min(t / n.naturalWidth, e / n.naturalHeight), s = Math.max(1, Math.round(n.naturalWidth * u)), f = Math.max(1, Math.round(n.naturalHeight * u)), d = Math.round((t - s) / 2), l = Math.round((e - f) / 2);
        i.imageSmoothingEnabled = !1, i.drawImage(n, d, l, s, f);
        const c = async (m, x = 144) => {
            const h = document.createElement("canvas");
            h.width = t, h.height = x;
            const p = h.getContext("2d");
            if (!p) throw new Error("2d canvas context unavailable");
            p.fillStyle = "#000", p.fillRect(0, 0, t, x), p.drawImage(r, 0, -m);
            const w = await new Promise((y, v) => h.toBlob(g => g ? y(g) : v(new Error("Snapshot PNG encode failed")), "image/png"));
            return Array.from(new Uint8Array(await w.arrayBuffer()));
        };
        return [ await c(0), await c(144) ];
    });
}

const ae = 1, se = "sharedInbox", Vn = 10, Fn = "inboxHeader", Xn = 11, Yn = "inboxMenu", gt = 2, pt = "snapshotText", St = 3, qt = "snapshotImage", Jn = 1e4, Zn = 1e3;

const G2_HOME_LOGO_ID = 80, G2_HOME_LOGO_NAME = "g2Logo", G2_HOME_LOGO_BYTES = [ 137,80,78,71,13,10,26,10,0,0,0,13,73,72,68,82,0,0,0,120,0,0,0,92,8,2,0,0,0,42,59,230,165,0,0,1,42,73,68,65,84,120,218,237,218,81,14,194,32,16,0,209,98,184,255,149,235,159,241,163,209,68,89,186,11,111,14,208,202,136,19,182,246,56,128,149,104,195,175,120,158,103,200,7,109,237,222,123,253,201,195,94,155,3,209,53,69,7,253,150,39,19,177,138,206,239,231,21,141,234,181,116,104,244,90,244,57,183,137,56,48,13,191,108,104,0,237,104,233,32,58,73,55,52,154,95,233,32,154,232,93,136,30,110,123,149,181,125,45,126,242,199,0,118,52,209,142,119,91,181,213,142,174,100,89,58,246,16,189,213,232,120,115,163,35,254,219,206,249,253,73,7,209,68,35,87,163,223,83,235,145,169,29,77,180,116,36,31,225,198,222,203,11,52,210,1,162,203,55,250,21,178,245,222,118,76,186,163,157,151,165,3,0,0,0,64,57,202,12,114,151,195,125,161,65,212,100,72,52,209,73,186,113,148,122,88,216,42,250,189,94,73,238,94,75,7,209,142,119,169,138,81,165,33,118,52,209,68,103,238,70,218,51,95,91,198,111,242,94,75,7,209,68,131,104,162,137,166,96,223,17,252,183,51,159,167,119,32,154,104,162,65,52,209,32,154,104,162,65,52,209,32,154,104,162,65,52,209,32,154,104,162,65,52,209,32,154,104,162,65,52,128,57,60,1,245,102,78,155,3,25,158,132,0,0,0,0,73,69,78,68,174,66,96,130 ];
function G2HomeClamp(o, t = 18) {
    const e = String(o || "").replace(/\s+/g, " ").trim();
    return e.length <= t ? e : e.slice(0, t - 1).trimEnd() + "…";
}
function G2HomeWrap(o, t = 22) {
    const e = String(o || "").replace(/\s+/g, " ").trim();
    if (!e) return "";
    if (e.length <= t) return e;
    const n = e.split(" "), r = [];
    let i = "";
    for (const u of n) {
        if (r.length >= 2) break;
        if (!i) {
            i = u.length > t ? u.slice(0, t) : u;
            continue;
        }
        if ((i + " " + u).length <= t) i += " " + u;
        else r.push(i), i = u.length > t ? u.slice(0, t) : u;
    }
    if (r.length < 2 && i) r.push(i);
    if (r.length > 1 && r[1].length >= t && n.join(" ").length > r.join(" ").length) r[1] = r[1].slice(0, t - 1).trimEnd() + "…";
    return r.slice(0, 2).join("\n");
}
function G2HomeIcon(o) {
    return !o ? "" : o.kind === "screen-sharing" ? "⇧" : o.kind === "previous-page" ? "‹" : o.kind === "next-page" ? "›" : "▣";
}
function G2HomeCardText(o, t, e = !1) {
    if (!o) return "";
    // Two top-aligned lines: first line keeps read/unread status, second line
    // keeps the title. The text is hard-limited before it reaches the Even Hub
    // text container, so the home/menu boxes do not scroll.
    const n = String(o.cardLabel || o.label || "");
    if (n.includes("\n")) {
        const r = n.split("\n"), i = r.shift() || "", u = r.join(" ").replace(/\s+/g, " ").trim(), s = e ? 22 : 16;
        return `${G2HomeClamp(i, s)}\n${G2HomeClamp(u, s)}`.trim();
    }
    return G2HomeWrap(n, e ? 22 : 16);
}
function G2HomeTime() {
    try {
        return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
        return "";
    }
}
function G2HomeHeaderText(o, t) {
    const e = String(o || "").replace(/\s+/g, " ").trim(), n = String(t || "").trim();
    if (!n) return e;
    const r = Math.max(1, 34 - e.length - n.length);
    return `${e}${" ".repeat(r)}${n}`;
}
function G2HomeParts(o, t, e = 0) {
    const n = Math.max(0, Math.min(o.entries.length - 1, Number.isInteger(e) ? e : 0)), r = o.entries[n - 1], i = o.entries[n], u = o.entries[n + 1], s = Math.max(0, o.itemCount ?? 0), f = i && i.kind === "item" ? Math.max(1, i.itemIndex + 1) : s > 0 ? Math.min(s, Math.max(1, (o.pageIndex || 0) * De + 1)) : 0, d = s > 0 ? `${f}/${s}` : "0/0", l = `${t.readerTitle} ${d}`;
    return {
        header: l,
        clock: G2HomeTime(),
        prev: G2HomeCardText(r, t, !1),
        current: G2HomeCardText(i, t, !0),
        next: G2HomeCardText(u, t, !1),
        help: t.homeHelp || t.menuHelp || "Scroll · Tap · Double"
    };
}
function G2HomeContainer(o, t, e = 0) {
    const n = G2HomeParts(o, t, e);
    return new Fe({
        containerTotalNum: 9,
        textObject: [ new W({
            xPosition: 0,
            yPosition: 104,
            width: 440,
            height: 24,
            borderWidth: 0,
            borderColor: 5,
            paddingLength: 2,
            containerID: 83,
            containerName: "homeTitle",
            content: n.header,
            isEventCapture: 0
        }), new W({
            xPosition: 500,
            yPosition: 104,
            width: 76,
            height: 24,
            borderWidth: 0,
            borderColor: 5,
            paddingLength: 0,
            containerID: 92,
            containerName: "homeClock",
            content: n.clock,
            isEventCapture: 0
        }), new W({
            xPosition: 14,
            yPosition: 150,
            width: 150,
            height: 74,
            borderWidth: n.prev ? 1 : 0,
            borderColor: 5,
            borderRadius: 6,
            paddingLength: 5,
            containerID: 84,
            containerName: "homePrevBox",
            content: n.prev,
            isEventCapture: 0
        }), new W({
            xPosition: 178,
            yPosition: 146,
            width: 220,
            height: 82,
            borderWidth: 2,
            borderColor: 15,
            borderRadius: 8,
            paddingLength: 0,
            containerID: 85,
            containerName: "homeCurBox",
            content: " ",
            isEventCapture: 0
        }), new W({
            xPosition: 188,
            yPosition: 150,
            width: 200,
            height: 74,
            borderWidth: 0,
            borderColor: 5,
            paddingLength: 5,
            containerID: 88,
            containerName: "homeCurTxt",
            content: n.current,
            isEventCapture: 0
        }), new W({
            xPosition: 412,
            yPosition: 150,
            width: 150,
            height: 74,
            borderWidth: n.next ? 1 : 0,
            borderColor: 5,
            borderRadius: 6,
            paddingLength: 5,
            containerID: 86,
            containerName: "homeNextBox",
            content: n.next,
            isEventCapture: 0
        }), new W({
            xPosition: 0,
            yPosition: 0,
            width: 1,
            height: 1,
            borderWidth: 0,
            borderColor: 0,
            paddingLength: 0,
            containerID: 90,
            containerName: "homeInput",
            content: " ",
            isEventCapture: 1
        }), new W({
            xPosition: 0,
            yPosition: 264,
            width: 576,
            height: 24,
            borderWidth: 0,
            borderColor: 5,
            paddingLength: 2,
            containerID: 91,
            containerName: "homeHelp",
            content: n.help,
            isEventCapture: 0
        }) ],
        imageObject: [ new fe({
            xPosition: 228,
            yPosition: 8,
            width: 120,
            height: 92,
            containerID: G2_HOME_LOGO_ID,
            containerName: G2_HOME_LOGO_NAME
        }) ]
    });
}
async function G2HomeUpgrade(o, t, e, n = 0) {
    const r = G2HomeParts(t, e, n), i = [
        [83, "homeTitle", r.header],
        [92, "homeClock", r.clock],
        [84, "homePrevBox", r.prev],
        [88, "homeCurTxt", r.current],
        [86, "homeNextBox", r.next],
        [91, "homeHelp", r.help]
    ];
    for (const [u, s, f] of i) {
        const d = f || " ";
        await o.textContainerUpgrade(new ue({
            containerID: u,
            containerName: s,
            contentOffset: 0,
            contentLength: d.length,
            content: d
        }));
    }
}
async function G2HomePaintLogo(o) {
    try {
        const t = await o.updateImageRawData(new Mt({
            containerID: G2_HOME_LOGO_ID,
            containerName: G2_HOME_LOGO_NAME,
            imageData: G2_HOME_LOGO_BYTES
        }));
        de.isSuccess(t) || console.warn("G2 logo render failed", t);
    } catch (t) {
        console.warn("G2 logo render failed", t);
    }
}

async function Qn() {
    const o = document.querySelector("#app");
    if (!o) throw new Error("Missing #app root");
    let t = Rn(navigator.languages), e = Ze(t);
    const G2SyncLanguage = () => {
        const C = Rn(navigator.languages);
        if (C === t) return !1;
        t = C, e = Ze(t), document.documentElement.lang = t;
        return !0;
    }, n = new URLSearchParams(window.location.search), r = n.get("demo") === "1";
    G2PinnedIds();
    if (document.documentElement.lang = t, n.get("settings") === "1") {
        sr(o, e);
        return;
    }
    if (n.get("mode") === "snapshot") {
        await $n(o, t, e, r);
        return;
    }
    let i = {
        status: "loading"
    }, u, s, f = "menu", d = "text", l = "", c = 0, m = 0, x = 0, h, p = !1, G2InboxFailureCount = 0;
    const G2_INBOX_FAILURE_THRESHOLD = 5;
    const w = new Tn, y = (C, N) => {
        G2SyncLanguage();
        x += 1;
        const k = e.inputDiagnostics(x, C, N);
        o.dataset.inputDiagnostics = k;
        const K = o.querySelector("#input-diagnostics");
        K && (K.hidden = !1, K.textContent = k);
    }, v = async () => {
        var k;
        G2SyncLanguage();
        const C = _e(i, t);
        if (bt(o, i, C, e, r ? e.demoMode : void 0), !u) return;
        if (f === "delete-confirmation") {
            const K = R(i);
            if (!K) {
                f = "menu", await v();
                return;
            }
            const J = ((k = K.title) == null ? void 0 : k.trim()) || e.untitled, ve = [ e.mutationDeleteTitle, e.mutationDeleteBody(J), e.glassesDeleteHelp ].join(`\n\n`), V = `delete-confirmation:${K.id}`;
            if (V === l) return;
            d === "text" ? await u.textContainerUpgrade(new ue({
                containerID: ae,
                containerName: se,
                contentOffset: 0,
                contentLength: ve.length,
                content: ve
            })) : await u.rebuildPageContainer(yt(ve)), d = "text", l = V;
            return;
        }
        if (nr(i) && f === "menu") {
            const K = mt(i, c, e);
            c = K.pageIndex;
            const J = Number(globalThis.__sendToG2MenuCursor);
            Number.isInteger(J) ? m = Math.max(0, Math.min(K.entries.length - 1, J)) : m = 0;
            globalThis.__sendToG2MenuCursor = m;
            const g2HomeVisibleParts = G2HomeParts(K, e, m), g2HomeSideSig = `${g2HomeVisibleParts.prev ? 1 : 0}:${g2HomeVisibleParts.next ? 1 : 0}`;
            const ve = `home-ui:${m}:${g2HomeSideSig}:${K.entries.map(te => te.label).join("|")}`;
            if (ve === l) return;
            await u.rebuildPageContainer(G2HomeContainer(K, e, m)), await G2HomePaintLogo(u);
            globalThis.__sendToG2HomeSideSig = g2HomeSideSig, d = "home", l = ve;
            return;
        }
        const N = `text:${C.glassText}`;
        N !== l && (d === "text" ? await u.textContainerUpgrade(new ue({
            containerID: ae,
            containerName: se,
            contentOffset: 0,
            contentLength: C.glassText.length,
            content: C.glassText
        })) : await u.rebuildPageContainer(yt(C.glassText)), d = "text", l = N);
    }, g = async C => {
        i = zn(i, C), f !== "snapshot" && await v();
    }, L = async C => {
        const N = i.status === "ready" ? i.items[C] : void 0;
        f = "reader", await g({
            type: "select-item",
            index: C
        });
        if (N && !N.read) try {
            !r && s && await s.updateRead(N.id, !0), await g({
                type: "update-current-read",
                read: !0
            });
        } catch {}
    }, D = async () => {
        const C = globalThis.__sendToG2SnapshotTimer;
        C && (globalThis.clearInterval(C), globalThis.__sendToG2SnapshotTimer = void 0), 
        h == null || h.start(), i.status === "ready" && (c = Mn(i.selectedIndex), m = 1 + (c > 0 ? 1 : 0) + Math.max(0, i.selectedIndex - c * De), 
        globalThis.__sendToG2MenuCursor = m), f = "menu", await v();
    }, Rt = async () => {
        const C = async () => {
            G2SyncLanguage();
            const N = globalThis.__sendToG2SnapshotState || {
                status: "loading"
            }, k = Pe(N, t);
            if (!u) return;
            if (d !== "snapshot") {
                await u.rebuildPageContainer(new Fe({
                    containerTotalNum: 3,
                    textObject: [ new W({
                        xPosition: 0,
                        yPosition: 280,
                        width: 576,
                        height: 8,
                        borderWidth: 0,
                        borderColor: 0,
                        paddingLength: 0,
                        containerID: gt,
                        containerName: pt,
                        content: " ",
                        isEventCapture: 1
                    }) ],
                    imageObject: [ new fe({
                        xPosition: 144,
                        yPosition: 0,
                        width: 288,
                        height: 144,
                        containerID: St,
                        containerName: qt
                    }), new fe({
                        xPosition: 144,
                        yPosition: 144,
                        width: 288,
                        height: 144,
                        containerID: St + 1,
                        containerName: "snapshotBot"
                    }) ]
                })), d = "snapshot", l = "snapshot-locked", globalThis.__sendToG2SnapshotLastRenderedId = void 0, 
                await new Promise(K => setTimeout(K, 900));
            }
            N.status === "ready" && N.snapshot && globalThis.__sendToG2SnapshotLastRenderedId !== N.snapshot.id && (await tr(u, N), 
            globalThis.__sendToG2SnapshotLastRenderedId = N.snapshot.id);
        }, N = async () => {
            try {
                if (r) {
                    globalThis.__sendToG2SnapshotLastId !== He.id && (globalThis.__sendToG2SnapshotState = {
                        status: "ready",
                        snapshot: He
                    }, globalThis.__sendToG2SnapshotLastId = He.id), await C();
                    return;
                }
                if (!s) {
                    if (globalThis.__sendToG2SnapshotState && globalThis.__sendToG2SnapshotState.status === "ready") {
                        await C();
                        return;
                    }
                    globalThis.__sendToG2SnapshotState = {
                        status: "error",
                        reason: "network"
                    }, await C();
                    return;
                }
                const k = await s.screenSnapshot();
                k.id !== globalThis.__sendToG2SnapshotLastId && (globalThis.__sendToG2SnapshotState = {
                    status: "ready",
                    snapshot: k
                }, globalThis.__sendToG2SnapshotLastId = k.id), await C();
            } catch (k) {
                if (globalThis.__sendToG2SnapshotState && globalThis.__sendToG2SnapshotState.status === "ready") {
                    await C();
                    return;
                }
                k instanceof Ne && k.status === 404 ? globalThis.__sendToG2SnapshotState = {
                    status: "empty"
                } : globalThis.__sendToG2SnapshotState = {
                    status: "error",
                    reason: xe(k)
                }, await C();
            }
        };
        h == null || h.stop(), f = "snapshot", globalThis.__sendToG2SnapshotState || (globalThis.__sendToG2SnapshotState = {
            status: "loading"
        }), await C(), globalThis.__sendToG2RefreshSnapshotOnGlasses = N, await N();
        const k = globalThis.__sendToG2SnapshotTimer;
        k && globalThis.clearInterval(k), globalThis.__sendToG2SnapshotTimer = globalThis.setInterval(N, Zn);
    }, I = async C => {
        if (C.kind === "screen-sharing") {
            await Rt();
            return;
        }
        if (C.kind === "item") {
            await L(C.itemIndex);
            return;
        }
        c += C.kind === "next-page" ? 1 : -1, await v();
    }, z = async C => {
        if (i.status !== "ready") return;
        const N = R(i);
        if (N) try {
            if (C === "delete-current" && G2IsPinnedItem(N)) {
                A(o, "#mutation-status", G2PinnedDeleteBlockedText(e));
                return "pinned";
            }
            if (C === "clear" && G2HasPinnedItems(i)) {
                A(o, "#mutation-status", G2PinnedClearBlockedText(e));
                return "pinned";
            }
            if (!r) {
                if (!s) return "network";
                C === "delete-current" ? await s.deleteItem(N.id) : await s.clearItems();
            }
            await g({
                type: C
            });
            return;
        } catch (k) {
            return xe(k);
        }
    }, G2ShowPinnedDeleteBlocked = async C => {
        A(o, "#mutation-status", G2PinnedDeleteBlockedText(e));
        if (u) {
            const N = Wn(`Send to G2

${G2PinnedDeleteBlockedText(e)}`), k = f;
            try { globalThis.__sendToG2PinnedBlockTimer && globalThis.clearTimeout(globalThis.__sendToG2PinnedBlockTimer); } catch {}
            await u.rebuildPageContainer(yt(N)), d = "text", l = `pinned-block:${C && C.id ? C.id : "item"}:${Date.now()}`;
            globalThis.__sendToG2PinnedBlockTimer = globalThis.setTimeout(() => {
                f = k || "menu", d = "", l = "", globalThis.__sendToG2PinnedBlockTimer = void 0, v();
            }, 1200);
            return;
        }
        await v();
    }, B = async C => {
        if (C.kind === "screen-sharing") return;
        if (C.kind === "item") {
            await g({ type: "select-item", index: C.itemIndex });
            const N = R(i);
            if (G2IsPinnedItem(N)) {
                await G2ShowPinnedDeleteBlocked(N);
                return;
            }
            f = "delete-confirmation", await v();
        }
    }, _ = async () => {
        f = "menu";
        const C = await z("delete-current");
        if (C) {
            C === "unauthorized" ? await g({
                type: "fail",
                reason: C
            }) : (A(o, "#mutation-status", e.mutationFailure), await v());
            return;
        }
        await D();
    }, le = async () => {
        if (r) return await g({
            type: "refresh",
            items: ht
        }), p = !0, G2InboxFailureCount = 0, "success";
        if (!s) return G2InboxFailureCount += 1, G2InboxFailureCount >= G2_INBOX_FAILURE_THRESHOLD && await g({
            type: "fail",
            reason: "network"
        }), "retryable-failure";
        try {
            const C = await s.items();
            return await g({
                type: "refresh",
                items: C
            }), p = !0, G2InboxFailureCount = 0, "success";
        } catch (C) {
            const N = xe(C);
            if (N === "unauthorized") return await g({
                type: "fail",
                reason: N
            }), "terminal-failure";
            return G2InboxFailureCount += 1, G2InboxFailureCount < G2_INBOX_FAILURE_THRESHOLD ? (i.status !== "loading" && A(o, "#mutation-status", e.mobileApkReconnecting || e.refreshFailure), "retryable-failure") : (await g({
                type: "fail",
                reason: N
            }), "retryable-failure");
        }
    }, Pt = async C => {
        const N = h ? await h.refreshNow() : await le();
        A(o, "#mutation-status", N === "success" ? e.refreshSuccess : e.refreshFailure);
    };
    ar(o, g, e, () => i, z, () => Pt(), async () => {
        if (i.status !== "ready") return;
        const C = R(i);
        if (!C) return;
        const N = !C.read;
        try {
            if (!r) {
                if (!s) throw new Error("Missing local API client");
                await s.updateRead(C.id, N);
            }
            await g({
                type: "update-current-read",
                read: N
            });
        } catch (k) {
            const K = xe(k);
            K === "unauthorized" ? await g({
                type: "fail",
                reason: K
            }) : A(o, "#mutation-status", e.readMutationFailure);
        }
    }, L), bt(o, i, _e(i, t), e, r ? e.demoMode : void 0);
    globalThis.__sendToG2OpenCurrentDeleteConfirmation = async () => {
        if (i.status !== "ready" || !R(i)) return;
        if (G2IsPinnedItem(R(i))) {
            await G2ShowPinnedDeleteBlocked(R(i));
            return;
        }
        f = "delete-confirmation";
        await v();
    };
    globalThis.__sendToG2MenuCursor = m, globalThis.__sendToG2MenuRender = async () => {
        const C = Number(globalThis.__sendToG2MenuCursor);
        Number.isInteger(C) && (m = C), await v();
    };
    globalThis.__sendToG2LanguageRender = async () => {
        if (G2SyncLanguage()) {
            l = "";
            await v();
        }
    };
    window.addEventListener("storage", C => {
        (C.key === G2_LANGUAGE_KEY || C.key === `${G2_LANGUAGE_KEY}.updatedAt`) && globalThis.__sendToG2LanguageRender();
    });
    const G2LanguagePoll = window.setInterval(() => {
        globalThis.__sendToG2LanguageRender();
    }, 1000);
    window.addEventListener("beforeunload", () => window.clearInterval(G2LanguagePoll), { once: !0 });
    try {
        u = await Tt();
        const C = _e(i, t), N = await u.createStartUpPageContainer(or(C.glassText));
        if (Y.normalize(N) !== Y.success) throw new Error(`G2 startup container failed: ${N}`);
        d = "text", l = `text:${C.glassText}`, cr(u, () => i, () => f, () => d, () => mt(i, c, e), I, B, D, _, y, g, w);
    } catch {
        u = void 0, o.dataset.bridge = "unavailable";
    }
    if (r) await g({
        type: "load",
        items: ht
    }); else {
        const G2AccessKey = Je();
        G2AccessKey ? (s = new Et(void 0, void 0, void 0, G2AccessKey), h = new On(le, void 0, void 0, void 0, Jn), 
        h.start(), window.addEventListener("beforeunload", () => h == null ? void 0 : h.stop(), {
            once: !0
        })) : await g({
            type: "fail",
            reason: "unauthorized"
        });
    }
}

async function $n(o, t, e, n) {
    let r = {
        status: "loading"
    }, i, u = !1, s, f, d, l = "";
    const c = async () => {
        const w = Pe(r, t);
        wt(o, w, e, n ? e.demoMode : void 0), i && u && (w.glassText !== l && (await i.textContainerUpgrade(new ue({
            containerID: gt,
            containerName: pt,
            contentOffset: 0,
            contentLength: w.glassText.length,
            content: w.glassText
        })), l = w.glassText), await tr(i, r));
    }, x = async w => {
        r = w, await c();
    }, h = async () => {
        try {
            if (n) {
                d !== He.id && (await x({
                    status: "ready",
                    snapshot: He
                }), d = He.id);
                return;
            }
            if (!s) return;
            const w = await s.screenSnapshot();
            if (w.id === d) return;
            await x({
                status: "ready",
                snapshot: w
            }), d = w.id;
        } catch (w) {
            const y = xe(w);
            if (w instanceof Ne && w.status === 404) {
                if (r.status === "ready") return;
                d = void 0, r.status !== "empty" && await x({
                    status: "empty"
                });
                return;
            }
            if (r.status === "ready" && y !== "unauthorized") return;
            await x({
                status: "error",
                reason: y
            });
        }
    }, p = async w => {
        if (!f) {
            f = h();
            const y = f;
            y.finally(() => {
                f === y && (f = void 0);
            });
        }
        try {
            await f;
        } finally {
            if (w) {
                const y = o.querySelector("[data-refresh-snapshot]");
                y && (y.disabled = !1, y.textContent = e.snapshotRefresh);
            }
        }
    };
    er(o, e, () => p(!0), n), wt(o, Pe(r, t), e, n ? e.demoMode : void 0);
    try {
        i = await Tt();
        const w = Pe(r, t);
        await i.createStartUpPageContainer(new Ve({
            containerTotalNum: 3,
            textObject: [ new W({
                xPosition: 0,
                yPosition: 280,
                width: 576,
                height: 8,
                borderWidth: 0,
                borderColor: 0,
                paddingLength: 0,
                containerID: gt,
                containerName: pt,
                content: " ",
                isEventCapture: 1
            }) ],
            imageObject: [ new fe({
                xPosition: 144,
                yPosition: 0,
                width: 288,
                height: 144,
                containerID: St,
                containerName: qt
            }), new fe({
                xPosition: 144,
                yPosition: 144,
                width: 288,
                height: 144,
                containerID: St + 1,
                containerName: "snapshotBot"
            }) ]
        })), u = !0, l = "snapshot-locked", fr(i, () => p(!1), () => _t(n));
    } catch {
        o.dataset.bridge = "unavailable";
    }
    if (n) {
        await p(!1);
        return;
    }
    const G2SnapshotAccessKey = Je();
    if (!G2SnapshotAccessKey) {
        await x({
            status: "error",
            reason: "unauthorized"
        });
        return;
    }
    s = new Et(void 0, void 0, void 0, G2SnapshotAccessKey);
    try {
        await s.health(), await p(!1), window.setInterval(() => {
            p(!1);
        }, Zn);
    } catch (w) {
        await x({
            status: "error",
            reason: xe(w)
        });
    }
}

function wt(o, t, e, n) {
    o.innerHTML = `\n    <section class="reader-card snapshot-card" data-state="${t.status}">\n      <div class="reader-topline">\n        <p class="eyebrow">${e.snapshotTitle}</p>\n        <div class="top-actions">\n          <span class="mode-badge" id="mode-badge" hidden></span>\n          <button type="button" class="settings-button" data-open-settings aria-label="${e.openSettings}" title="${e.openSettings}">⚙</button>\n        </div>\n      </div>\n      <p class="reader-meta">${t.meta}</p>\n      <h1>${t.heading}</h1>\n      <p class="summary">${t.body}</p>\n      <div class="snapshot-preview" id="snapshot-preview"></div>\n      <p class="reader-help">${t.help}</p>\n      <div class="reader-actions">\n        <button type="button" data-refresh-snapshot>${e.snapshotRefresh}</button>\n        <button type="button" data-open-inbox>${e.snapshotOpenInbox}</button>\n        <button type="button" data-open-settings data-pairing-settings hidden>${e.openSettings}</button>\n        <button type="button" data-reload hidden>${e.retry}</button>\n      </div>\n    </section>\n  `;
    const r = o.querySelector("#snapshot-preview");
    if (r && t.imageSrc) {
        const f = document.createElement("img");
        f.src = t.imageSrc, f.alt = t.imageAlt, r.append(f);
    }
    const i = o.querySelector("[data-pairing-settings]");
    i && (i.hidden = !t.needsPairing);
    const u = o.querySelector("[data-reload]");
    u && (u.hidden = t.status !== "error" || t.needsPairing);
    const s = o.querySelector("#mode-badge");
    n && s && (s.hidden = !1, s.textContent = n);
}

function er(o, t, e, n) {
    o.addEventListener("click", r => {
        const i = r.target.closest("button[data-refresh-snapshot]");
        if (i) {
            i.disabled = !0, i.textContent = t.mutationWorking, e();
            return;
        }
        if (r.target.closest("button[data-open-inbox]")) {
            _t(n);
            return;
        }
        if (r.target.closest("button[data-open-settings]")) {
            It();
            return;
        }
        r.target.closest("button[data-reload]") && window.location.reload();
    });
}

async function tr(o, t) {
    if (t.status !== "ready") return;
    const e = await erG2(t.snapshot), n = Array.isArray(e[0]) ? e : [ e ];
    for (let r = 0; r < n.length; r += 1) {
        const i = await o.updateImageRawData(new Mt({
            containerID: St + r,
            containerName: r === 0 ? qt : "snapshotBot",
            imageData: n[r]
        }));
        if (!de.isSuccess(i)) throw new Error(`Image update ${r} failed: ${i}`);
        r < n.length - 1 && await new Promise(u => setTimeout(u, 120));
    }
}

const He = {
    id: "demo-snapshot",
    createdAt: 171e10,
    width: 120,
    height: 80,
    mimeType: "image/png",
    imageBase64: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII="
};

function mt(o, t, e) {
    return An(o.status === "ready" ? o.items : [], t, {
        untitled: e.untitled,
        unread: e.readStateUnread,
        read: e.readStateRead,
        previous: e.menuPrevious,
        next: e.menuNext,
        screenSharing: e.snapshotTitle
    });
}

function nr(o) {
    return o.status === "ready" || o.status === "empty";
}

function rr(o, t) {
    return new Fe(ir(o, t));
}

function ir(o, t) {
    const e = `${t.readerTitle} ${o.pageIndex + 1}/${o.pageCount}`;
    return {
        containerTotalNum: 2,
        textObject: [ new W({
            xPosition: 0,
            yPosition: 0,
            width: 576,
            height: 48,
            borderWidth: 0,
            paddingLength: 6,
            containerID: Vn,
            containerName: Fn,
            content: `${e}\n${t.menuHelp}`,
            isEventCapture: 0
        }) ],
        listObject: [ new ce({
            xPosition: 0,
            yPosition: 50,
            width: 576,
            height: 238,
            borderWidth: 0,
            paddingLength: 6,
            containerID: Xn,
            containerName: Yn,
            itemContainer: new We({
                itemCount: o.entries.length,
                itemWidth: 566,
                isItemSelectBorderEn: 1,
                itemName: o.entries.map(n => n.label)
            }),
            isEventCapture: 1
        }) ]
    };
}

function mr(o, t, e = 0) {
    const n = Math.max(0, Math.min(o.entries.length - 1, Number.isInteger(e) ? e : 0));
    const r = o.entries.map((i, u) => `${u === n ? "›" : " "} ${i.label}`).join(`\n`);
    return Wn(`Send to G2\n\n${t.readerTitle} ${o.pageIndex + 1}/${o.pageCount}\n${t.menuHelp}\n\n${r}`);
}

function yt(o) {
    return new Fe({
        containerTotalNum: 1,
        textObject: [ new W({
            xPosition: 0,
            yPosition: 0,
            width: 576,
            height: 288,
            borderWidth: 0,
            borderColor: 5,
            paddingLength: 8,
            containerID: ae,
            containerName: se,
            content: o,
            isEventCapture: 1
        }) ]
    });
}

function or(o) {
    return new Ve({
        containerTotalNum: 1,
        textObject: [ new W({
            xPosition: 0,
            yPosition: 0,
            width: 576,
            height: 288,
            borderWidth: 0,
            borderColor: 5,
            paddingLength: 8,
            containerID: ae,
            containerName: se,
            content: o,
            isEventCapture: 1
        }) ]
    });
}

function bt(o, t, e, n, r) {
    o.innerHTML = `\n    <section class="reader-card" data-state="${e.status}">\n      <div class="reader-topline">\n        <p class="eyebrow" id="reader-eyebrow"></p>\n        <div class="top-actions">\n          <span class="mode-badge" id="mode-badge" hidden></span>\n          <button type="button" class="settings-button" data-open-settings aria-label="${n.openSettings}" title="${n.openSettings}">⚙</button>\n        </div>\n      </div>\n      <section class="item-picker" id="item-picker" hidden>\n        <h2 id="item-picker-title"></h2>\n        <div class="item-picker-list" id="item-picker-list"></div>\n      </section>\n      <p class="reader-meta" id="reader-meta"></p>\n      <h1 id="reader-heading"></h1>\n      <div class="reader-body" id="reader-body"></div>\n      <p class="reader-help" id="reader-help"></p>\n      <p class="reader-help" id="input-diagnostics" hidden></p>\n      <p class="mutation-status" id="mutation-status" role="status"></p>\n      <div class="reader-actions">\n        <button type="button" data-action="previous-page" id="previous-page"></button>\n        <button type="button" data-action="next-page" id="next-page"></button>\n        <button type="button" data-refresh id="refresh-items"></button>\n        <button type="button" data-open-snapshot id="open-snapshot"></button>\n        <button type="button" data-open-settings id="pairing-settings" hidden></button>\n        <button type="button" data-reload id="retry" hidden></button>\n      </div>\n      <div class="mutation-actions" id="mutation-actions" hidden>\n        <button type="button" data-read-toggle id="read-toggle"></button>\n        <button type="button" class="danger-secondary" data-mutation="delete-current" id="delete-current"></button>\n        <button type="button" class="danger" data-mutation="clear" id="clear-all"></button>\n      </div>\n    </section>\n    <div class="confirmation-backdrop" id="confirmation-backdrop" hidden>\n      <section class="confirmation-card" role="dialog" aria-modal="true" aria-labelledby="confirmation-title">\n        <h2 id="confirmation-title"></h2>\n        <p id="confirmation-body"></p>\n        <div class="confirmation-actions">\n          <button type="button" class="danger" data-confirm-mutation id="confirmation-confirm"></button>\n          <button type="button" data-cancel-mutation id="confirmation-cancel"></button>\n        </div>\n      </section>\n    </div>\n  `, 
    A(o, "#reader-eyebrow", e.eyebrow), A(o, "#reader-meta", e.meta), A(o, "#reader-heading", e.heading), 
    A(o, "#reader-body", e.body), A(o, "#reader-help", e.help);
    const i = o.querySelector("#input-diagnostics");
    i && o.dataset.inputDiagnostics && (i.hidden = !1, i.textContent = o.dataset.inputDiagnostics), 
    A(o, "#previous-page", n.previousPage), A(o, "#next-page", n.nextPage), A(o, "#refresh-items", n.refresh), 
    A(o, "#open-snapshot", n.snapshotOpenSharing), A(o, "#retry", n.retry), A(o, "#pairing-settings", n.openSettings), 
    A(o, "#delete-current", n.deleteCurrent), A(o, "#clear-all", n.clearAll), A(o, "#read-toggle", e.currentRead ? n.markUnread : n.markRead), 
    A(o, "#confirmation-cancel", n.mutationCancel), ur(o, t, n);
    const u = o.querySelector("#pairing-settings");
    u && (u.hidden = !e.needsPairing);
    const s = o.querySelector("#mutation-actions");
    s && (s.hidden = e.status !== "ready");
    const f = o.querySelector("#mode-badge");
    r && f && (f.hidden = !1, f.textContent = r);
    for (const l of o.querySelectorAll("[data-action]")) l.dataset.action, l.disabled = !e.canNavigatePages;
    const d = o.querySelector("#retry");
    d && (d.hidden = e.status !== "error" || e.needsPairing);
}

function ur(o, t, e) {
    const n = o.querySelector("#item-picker"), r = o.querySelector("#item-picker-list");
    !n || !r || (n.hidden = t.status !== "ready", t.status === "ready" && (A(o, "#item-picker-title", e.itemPickerTitle), 
    t.items.forEach((i, u) => {
        var l;
        const s = document.createElement("div");
        s.className = "item-picker-row", s.dataset.pinned = G2IsPinnedItem(i) ? "true" : "false";
        const f = document.createElement("button");
        f.type = "button", f.className = "item-picker-button", f.dataset.selectItemIndex = String(u), 
        f.setAttribute("aria-current", u === t.selectedIndex ? "true" : "false");
        const d = ((l = i.title) == null ? void 0 : l.trim()) || e.untitled, c = i.read ? e.readStateRead : e.readStateUnread;
        f.textContent = `${u + 1}. ${G2IsPinnedItem(i) ? "PIN · " : ""}${d} - ${c}`;
        const x = document.createElement("button");
        x.type = "button", x.className = "item-pin-button", x.dataset.pinItemIndex = String(u), x.textContent = G2PinItemLabel(e, G2IsPinnedItem(i)), x.title = G2PinItemLabel(e, G2IsPinnedItem(i));
        s.append(f, x), r.append(s);
    })));
}

function ar(o, t, e, n, r, i, u, s) {
    const f = new En(d => void s(d), d => {
        s(d).then(() => {
            var x;
            const l = R(n());
            if (!l) return;
            if (G2IsPinnedItem(l)) {
                A(o, "#mutation-status", G2PinnedDeleteBlockedText(e));
                return;
            }
            const c = ((x = l.title) == null ? void 0 : x.trim()) || e.untitled;
            Lt(o, e, "delete-current", c);
        });
    });
    o.addEventListener("click", d => {
        var I;
        const G2PinButton = d.target.closest("button[data-pin-item-index]");
        if (G2PinButton) {
            const z = Number(G2PinButton.dataset.pinItemIndex), B = n();
            if (B.status !== "ready" || !Number.isInteger(z) || z < 0 || z >= B.items.length) return;
            const _ = B.items[z], le = !G2IsPinnedItem(_);
            G2SetPinnedItemId(_.id, le), t({ type: "refresh", items: G2ApplyPins(B.items) }), A(o, "#mutation-status", le ? ((e.pinSaved) || "Pinned. Unpin on phone before deleting.") : ((e.unpinSaved) || "Unpinned."));
            return;
        }
        const l = d.target.closest("button[data-select-item-index]");
        if (l) {
            const z = Number(l.dataset.selectItemIndex);
            Number.isInteger(z) && f.tap(z);
            return;
        }
        const c = d.target.closest("button[data-read-toggle]");
        if (c) {
            c.disabled = !0, c.textContent = e.mutationWorking, u().finally(() => {
                if (!c.isConnected) return;
                const z = R(n());
                c.disabled = !1, c.textContent = z != null && z.read ? e.markUnread : e.markRead;
            });
            return;
        }
        const x = d.target.closest("button[data-refresh]");
        if (x) {
            x.disabled = !0, x.textContent = e.mutationWorking, i().finally(() => {
                x.isConnected && (x.disabled = !1, x.textContent = e.refresh);
            });
            return;
        }
        if (d.target.closest("[data-cancel-mutation]")) {
            zt(o);
            return;
        }
        const p = d.target.closest("[data-confirm-mutation]");
        if (p) {
            const z = o.dataset.pendingMutation;
            if (z !== "delete-current" && z !== "clear") return;
            const G2State = n();
            if (z === "delete-current" && G2CurrentPinned(G2State)) {
                zt(o), A(o, "#mutation-status", G2PinnedDeleteBlockedText(e));
                return;
            }
            if (z === "clear" && G2HasPinnedItems(G2State)) {
                zt(o), A(o, "#mutation-status", G2PinnedClearBlockedText(e));
                return;
            }
            p.disabled = !0, p.textContent = e.mutationWorking;
            const B = o.querySelector("[data-cancel-mutation]");
            B && (B.disabled = !0), r(z).then(async _ => {
                if (_) {
                    if (zt(o), _ === "unauthorized") {
                        await t({
                            type: "fail",
                            reason: _
                        });
                        return;
                    }
                    A(o, "#mutation-status", e.mutationFailure);
                }
            });
            return;
        }
        const w = d.target.closest("button[data-mutation]");
        if (w) {
            const z = w.dataset.mutation;
            if (z !== "delete-current" && z !== "clear") return;
            const B = n();
            if (B.status !== "ready") return;
            const _ = R(B);
            if (!_) return;
            if (z === "delete-current" && G2IsPinnedItem(_)) {
                A(o, "#mutation-status", G2PinnedDeleteBlockedText(e));
                return;
            }
            if (z === "clear" && G2HasPinnedItems(B)) {
                A(o, "#mutation-status", G2PinnedClearBlockedText(e));
                return;
            }
            const le = ((I = _.title) == null ? void 0 : I.trim()) || e.untitled;
            Lt(o, e, z, le);
            return;
        }
        if (d.target.closest("button[data-reload]")) {
            window.location.reload();
            return;
        }
        if (d.target.closest("button[data-open-settings]")) {
            It();
            return;
        }
        if (d.target.closest("button[data-open-snapshot]")) {
            const z = new URLSearchParams(window.location.search).get("demo") === "1";
            Kt(z);
            return;
        }
        const L = d.target.closest("button[data-action]");
        if (!L || L.disabled) return;
        const D = L.dataset.action;
        xr(D) && t({
            type: D
        });
    });
}

function Lt(o, t, e, n) {
    o.dataset.pendingMutation = e, A(o, "#confirmation-title", e === "delete-current" ? t.mutationDeleteTitle : t.mutationClearTitle), 
    A(o, "#confirmation-body", e === "delete-current" ? t.mutationDeleteBody(n) : t.mutationClearBody), 
    A(o, "#confirmation-confirm", e === "delete-current" ? t.mutationConfirmDelete : t.mutationConfirmClear);
    const r = o.querySelector("#confirmation-confirm");
    r && (r.disabled = !1);
    const i = o.querySelector("[data-cancel-mutation]");
    i && (i.disabled = !1);
    const u = o.querySelector("#confirmation-backdrop");
    u && (u.hidden = !1), r == null || r.focus();
}

function sr(o, t) {
    const G2StoredAccessKey = Je(), e = !!G2StoredAccessKey;
    o.innerHTML = `\n    <section class="reader-card settings-card" data-state="settings">\n      <div class="reader-topline">\n        <p class="eyebrow">${t.settingsTitle}</p>\n        <button type="button" class="settings-button" data-close-settings aria-label="${t.settingsBack}" title="${t.settingsBack}">←</button>\n      </div>\n      <h1>${t.settingsTitle}</h1>\n      <p class="summary">${e ? t.settingsKeyStatusSet : t.settingsKeyStatusMissing}</p>${G2LanguageSettingsHtml(t)}\n      <form class="pairing-form" data-settings-pairing-form>\n        <label for="access-key">${t.pairingLabel}</label>\n        <input\n          id="access-key"\n          name="access-key"\n          type="text"\n          inputmode="text"\n          autocomplete="off"\n          autocapitalize="none"\n          spellcheck="false"\n          value="${G2StoredAccessKey || ""}"\n          required\n        >\n        <p>${t.pairingHelp}</p>\n        <button type="submit">${t.pairingSave}</button>\n      </form>\n      <div class="settings-download">\n        <h2>${t.settingsAndroidApkTitle}</h2>\n        <p>${t.settingsAndroidApkHelp}</p>\n        <div class="settings-download-actions">\n          <a class="app-link-button" href="https://github.com/GenomiskDiagnostik/share-with-g2/releases/latest" target="_blank" rel="noopener noreferrer">${t.settingsAndroidApkDownload}</a>\n          <a class="app-link-button secondary" href="https://github.com/GenomiskDiagnostik/share-with-g2" target="_blank" rel="noopener noreferrer">${t.settingsAndroidApkRepo}</a>\n          <a class="app-link-button secondary" href="https://github.com/sponsors/GenomiskDiagnostik" target="_blank" rel="noopener noreferrer">${t.settingsSponsor}</a>\n        </div>\n      </div>\n      <p class="mutation-status" id="settings-status" role="status"></p>\n      <div class="reader-actions">\n        <button type="button" data-close-settings>${t.settingsBack}</button>\n        <button type="button" class="danger-secondary" data-clear-access-key>${t.settingsClearKey}</button>\n      </div>\n    </section>\n  `, 
    o.addEventListener("change", n => {
        const r = n.target instanceof Element ? n.target.closest("[data-language-select]") : null;
        if (r instanceof HTMLSelectElement) {
            G2SetLanguageOverride(r.value), A(o, "#settings-status", t.settingsLanguageSaved || "Language saved."), window.setTimeout(() => { window.location.href = G2ApplyLanguageToUrl(r.value); }, 150);
        }
    }), o.addEventListener("submit", n => {
        const r = n.target.closest("[data-settings-pairing-form]");
        if (!r) return;
        n.preventDefault();
        const i = r.elements.namedItem("access-key");
        if (i instanceof HTMLInputElement) {
            if (i.setCustomValidity(""), !mn(i.value)) {
                i.setCustomValidity(t.pairingInvalid), i.reportValidity();
                return;
            }
            Ct();
        }
    }), o.addEventListener("click", n => {
        if (n.target.closest("button[data-close-settings]")) {
            Ct();
            return;
        }
        n.target.closest("button[data-clear-access-key]") && (yn(), A(o, "#settings-status", t.settingsKeyCleared));
    });
}

function It() {
    const o = new URL(window.location.href);
    o.searchParams.set("settings", "1"), window.location.href = `${o.pathname}${o.search}${o.hash}`;
}

function Ct() {
    const o = new URL(window.location.href);
    o.searchParams.delete("settings"), window.location.href = `${o.pathname}${o.search}${o.hash}`;
}

function zt(o) {
    delete o.dataset.pendingMutation;
    const t = o.querySelector("#confirmation-backdrop");
    t && (t.hidden = !0);
}

function xr(o) {
    return o === "previous-item" || o === "next-item" || o === "previous-page" || o === "next-page";
}

function G2SafeShutdown(o) {
    try {
        o && typeof o.shutDownPageContainer == "function" && o.shutDownPageContainer(0);
    } catch {}
}
function G2RequestExitConfirmation(o) {
    try {
        o && typeof o.shutDownPageContainer == "function" && o.shutDownPageContainer(1);
    } catch {}
}

function cr(o, t, e, n, r, i, u, s, f, d, l, c) {
    const x = new Pn;
    let h = !1, G2ReaderDeleteTimer;
    const G2ClearReaderDeleteTimer = () => {
        if (G2ReaderDeleteTimer !== void 0) {
            globalThis.clearTimeout(G2ReaderDeleteTimer);
            G2ReaderDeleteTimer = void 0;
        }
    };
    const p = async y => {
        if (!h) {
            h = !0;
            try {
                await y();
            } finally {
                h = !1;
            }
        }
    }, w = o.onEvenHubEvent(y => {
        const v = Sn(y), g = x.handle(v.event);
        if (d(g.kind, v.source), g.kind === "exit") {
            G2ClearReaderDeleteTimer();
            w();
            G2SafeShutdown(o);
            return;
        }
        if (e() === "menu" && (g.kind === "scroll-top" || g.kind === "scroll-bottom")) {
            if (g.fromEventIndex !== true) {
                const z = r(), B = Number.isInteger(x.selectedIndex) ? x.selectedIndex : Number(globalThis.__sendToG2MenuCursor) || 0;
                x.selectedIndex = Math.max(0, Math.min(z.entries.length - 1, B + (g.kind === "scroll-bottom" ? 1 : -1))), 
                x.selectedName = void 0;
            }
            globalThis.__sendToG2MenuCursor = x.selectedIndex;
            if (n() === "text" || n() === "home") {
                const z = globalThis.__sendToG2MenuRender;
                typeof z == "function" && p(z);
            }
            return;
        }
        const L = Nn(v.event.listEvent);
        if (e() === "menu" && L) {
            if (n() === "text" || n() === "home") {
                const z = r(), B = dt(z, void 0, Number(globalThis.__sendToG2MenuCursor)) ?? dt(z, void 0, g.selectedIndex) ?? dt(z, g.selectedName, void 0) ?? z.entries[0];
                if (!B) return;
                if (L === "accept") {
                    p(() => i(B));
                    return;
                }
                if (B.kind === "screen-sharing") {
                    G2RequestExitConfirmation(o);
                    return;
                }
                B.kind === "item" && p(() => u(B));
                return;
            }
            const z = r(), B = v.event.listEvent, _ = dt(z, void 0, B == null ? void 0 : B.currentSelectItemIndex) ?? dt(z, B == null ? void 0 : B.currentSelectItemName, void 0) ?? dt(z, void 0, g.selectedIndex) ?? dt(z, g.selectedName, void 0) ?? z.entries[0];
            if (!_) return;
            if (L === "accept") {
                p(() => i(_));
                return;
            }
            if (_.kind === "screen-sharing") {
                G2RequestExitConfirmation(o);
                return;
            }
            _.kind === "item" && p(() => u(_));
            return;
        }
        if (e() === "menu") {
            if (g.kind === "other" && g.fromEventIndex === true) {
                const z = r();
                if (Number.isInteger(g.selectedIndex)) {
                    x.selectedIndex = Math.max(0, Math.min(z.entries.length - 1, g.selectedIndex));
                    globalThis.__sendToG2MenuCursor = x.selectedIndex;
                    if (n() === "text" || n() === "home") {
                        const B = globalThis.__sendToG2MenuRender;
                        typeof B == "function" && p(B);
                    }
                }
                return;
            }
            if (g.kind !== "click" && g.kind !== "double-click") return;
            if (n() === "text" || n() === "home") {
                const z = r(), B = dt(z, void 0, Number(globalThis.__sendToG2MenuCursor)) ?? dt(z, void 0, g.selectedIndex) ?? dt(z, g.selectedName, void 0) ?? z.entries[0];
                if (!B) return;
                if (g.kind === "click") {
                    p(() => i(B));
                    return;
                }
                if (B.kind === "screen-sharing") {
                    G2RequestExitConfirmation(o);
                    return;
                }
                B.kind === "item" && p(() => u(B));
                return;
            }
            const z = r(), B = dt(z, void 0, g.selectedIndex) ?? dt(z, g.selectedName, void 0) ?? z.entries[0];
            if (!B) return;
            if (g.kind === "click") {
                p(() => i(B));
                return;
            }
            if (B.kind === "screen-sharing") {
                G2RequestExitConfirmation(o);
                return;
            }
            B.kind === "item" && p(() => u(B));
            return;
        }
        if (e() === "delete-confirmation") {
            G2ClearReaderDeleteTimer();
            g.kind === "click" ? p(f) : g.kind === "double-click" && p(s);
            return;
        }
        if (e() === "snapshot") {
            if (g.kind === "click") {
                const z = globalThis.__sendToG2RefreshSnapshotOnGlasses;
                typeof z == "function" && p(z);
                return;
            }
            if (g.kind === "double-click") {
                G2ClearReaderDeleteTimer();
                p(s);
                return;
            }
            return;
        }
        if (g.kind === "double-click") {
            G2ClearReaderDeleteTimer();
            s();
            return;
        }
        const D = t();
        if (D.status !== "ready") return;
        if (g.kind === "click") {
            const z = qe(D).length;
            if (D.pageIndex >= z - 1) {
                G2ClearReaderDeleteTimer();
                G2ReaderDeleteTimer = globalThis.setTimeout(() => {
                    G2ReaderDeleteTimer = void 0;
                    const B = globalThis.__sendToG2OpenCurrentDeleteConfirmation;
                    typeof B == "function" && p(B);
                }, 420);
                return;
            }
            G2ClearReaderDeleteTimer();
            l({
                type: "next-page"
            });
            return;
        }
        if (g.kind !== "scroll-top" && g.kind !== "scroll-bottom") return;
        const I = c.actionFor(g.kind === "scroll-top" ? "top" : "bottom", D.pageIndex, qe(D).length);
        I && l({
            type: I
        });
    });
}

function fr(o, t, e) {
    const n = new Pn, r = o.onEvenHubEvent(i => {
        const u = n.handle(Sn(i).event);
        u.kind === "click" ? t() : u.kind === "double-click" ? e() : u.kind === "exit" && (r(), G2SafeShutdown(o));
    });
}

function Kt(o) {
    const t = new URL(window.location.href);
    t.searchParams.set("mode", "snapshot"), o ? t.searchParams.set("demo", "1") : t.searchParams.delete("demo");
    const e = `${t.pathname}${t.search}${t.hash}`;
    window.location.href = e, globalThis.setTimeout(() => {
        window.location.href = e;
    }, 25);
}

function _t(o) {
    window.location.href = o ? "?demo=1" : window.location.pathname;
}

function xe(o) {
    return o instanceof DOMException && o.name === "AbortError" ? "timeout" : o instanceof Ne ? o.status === 401 ? "unauthorized" : "http" : o instanceof G ? "invalid-response" : "network";
}

function A(o, t, e) {
    const n = o.querySelector(t);
    n && (n.textContent = e);
}

Qn();