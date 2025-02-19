import { E as _, U as pt, T as ge, a as gt, a1 as G, a2 as z, t as P, Z as R, M, aa as mt, ab as xt, w as O, ac as re, ad as W, O as ie, ae as _t, af as I, ag as U, k as E, c as Ue, H as k, P as bt, a4 as ae, R as oe, F as ke, b as L, B as A, ah as yt, y as T, ai as Tt, aj as de, K as se, ak as $, s as le, u as vt, G as wt, al as St, l as Ae, p as Ge, a5 as ze, a8 as He, q as Ct, m as Bt, o as Pt, a6 as Rt, a7 as Mt, a9 as Ft, am as Ut, an as kt, D as We, n as me, e as w, ao as At, __tla as __tla_0 } from "./ModelPerformanceTest-DjV__RXZ.js";
import { S as K, c as q, a as Gt, b as zt, B as De } from "./colorToUniform-C2GHuDhf.js";
import { C as D, __tla as __tla_1 } from "./CanvasPool-dZP2PbFZ.js";
import { __tla as __tla_2 } from "./index-N0A0NpVe.js";
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_1;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_2;
    } catch {
    }
  })()
]).then(async () => {
  class Oe {
    static init(e) {
      Object.defineProperty(this, "resizeTo", {
        set(t) {
          globalThis.removeEventListener("resize", this.queueResize), this._resizeTo = t, t && (globalThis.addEventListener("resize", this.queueResize), this.resize());
        },
        get() {
          return this._resizeTo;
        }
      }), this.queueResize = () => {
        this._resizeTo && (this._cancelResize(), this._resizeId = requestAnimationFrame(() => this.resize()));
      }, this._cancelResize = () => {
        this._resizeId && (cancelAnimationFrame(this._resizeId), this._resizeId = null);
      }, this.resize = () => {
        if (!this._resizeTo) return;
        this._cancelResize();
        let t, r;
        if (this._resizeTo === globalThis.window) t = globalThis.innerWidth, r = globalThis.innerHeight;
        else {
          const { clientWidth: i, clientHeight: s } = this._resizeTo;
          t = i, r = s;
        }
        this.renderer.resize(t, r), this.render();
      }, this._resizeId = null, this._resizeTo = null, this.resizeTo = e.resizeTo || null;
    }
    static destroy() {
      globalThis.removeEventListener("resize", this.queueResize), this._cancelResize(), this._cancelResize = null, this.queueResize = null, this.resizeTo = null, this.resize = null;
    }
  }
  Oe.extension = _.Application;
  class Ie {
    static init(e) {
      e = Object.assign({
        autoStart: true,
        sharedTicker: false
      }, e), Object.defineProperty(this, "ticker", {
        set(t) {
          this._ticker && this._ticker.remove(this.render, this), this._ticker = t, t && t.add(this.render, this, pt.LOW);
        },
        get() {
          return this._ticker;
        }
      }), this.stop = () => {
        this._ticker.stop();
      }, this.start = () => {
        this._ticker.start();
      }, this._ticker = null, this.ticker = e.sharedTicker ? ge.shared : new ge(), e.autoStart && this.start();
    }
    static destroy() {
      if (this._ticker) {
        const e = this._ticker;
        this.ticker = null, e.destroy();
      }
    }
  }
  Ie.extension = _.Application;
  class Ht extends gt {
    constructor() {
      super(...arguments), this.chars = /* @__PURE__ */ Object.create(null), this.lineHeight = 0, this.fontFamily = "", this.fontMetrics = {
        fontSize: 0,
        ascent: 0,
        descent: 0
      }, this.baseLineOffset = 0, this.distanceField = {
        type: "none",
        range: 0
      }, this.pages = [], this.applyFillAsTint = true, this.baseMeasurementFontSize = 100, this.baseRenderedFontSize = 100;
    }
    get font() {
      return G(z, "BitmapFont.font is deprecated, please use BitmapFont.fontFamily instead."), this.fontFamily;
    }
    get pageTextures() {
      return G(z, "BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead."), this.pages;
    }
    get size() {
      return G(z, "BitmapFont.size is deprecated, please use BitmapFont.fontMetrics.fontSize instead."), this.fontMetrics.fontSize;
    }
    get distanceFieldRange() {
      return G(z, "BitmapFont.distanceFieldRange is deprecated, please use BitmapFont.distanceField.range instead."), this.distanceField.range;
    }
    get distanceFieldType() {
      return G(z, "BitmapFont.distanceFieldType is deprecated, please use BitmapFont.distanceField.type instead."), this.distanceField.type;
    }
    destroy(e = false) {
      var _a;
      this.emit("destroy", this), this.removeAllListeners();
      for (const t in this.chars) (_a = this.chars[t].texture) == null ? void 0 : _a.destroy();
      this.chars = null, e && (this.pages.forEach((t) => t.texture.destroy(true)), this.pages = null);
    }
  }
  const xe = 1e5;
  function N(a, e, t, r = 0) {
    if (a.texture === P.WHITE && !a.fill) return R.shared.setValue(a.color).setAlpha(a.alpha ?? 1).toHexa();
    if (a.fill) {
      if (a.fill instanceof mt) {
        const i = a.fill, s = e.createPattern(i.texture.source.resource, "repeat"), n = i.transform.copyTo(M.shared);
        return n.scale(i.texture.frame.width, i.texture.frame.height), s.setTransform(n), s;
      } else if (a.fill instanceof xt) {
        const i = a.fill, s = i.type === "linear", n = i.textureSpace === "local";
        let o = 1, d = 1;
        n && t && (o = t.width + r, d = t.height + r);
        let c, h = false;
        if (s) {
          const { start: l, end: f } = i;
          c = e.createLinearGradient(l.x * o, l.y * d, f.x * o, f.y * d), h = Math.abs(f.x - l.x) < Math.abs((f.y - l.y) * 0.1);
        } else {
          const { center: l, innerRadius: f, outerCenter: p, outerRadius: u } = i;
          c = e.createRadialGradient(l.x * o, l.y * d, f * o, p.x * o, p.y * d, u * o);
        }
        if (h && n && t) {
          const l = t.lineHeight / d;
          for (let f = 0; f < t.lines.length; f++) {
            const p = (f * t.lineHeight + r / 2) / d;
            i.colorStops.forEach((u) => {
              const g = p + u.offset * l;
              c.addColorStop(Math.floor(g * xe) / xe, R.shared.setValue(u.color).toHex());
            });
          }
        } else i.colorStops.forEach((l) => {
          c.addColorStop(l.offset, R.shared.setValue(l.color).toHex());
        });
        return c;
      }
    } else {
      const i = e.createPattern(a.texture.source.resource, "repeat"), s = a.matrix.copyTo(M.shared);
      return s.scale(a.texture.frame.width, a.texture.frame.height), i.setTransform(s), i;
    }
    return O("FillStyle not recognised", a), "red";
  }
  function Ee(a) {
    if (a === "") return [];
    typeof a == "string" && (a = [
      a
    ]);
    const e = [];
    for (let t = 0, r = a.length; t < r; t++) {
      const i = a[t];
      if (Array.isArray(i)) {
        if (i.length !== 2) throw new Error(`[BitmapFont]: Invalid character range length, expecting 2 got ${i.length}.`);
        if (i[0].length === 0 || i[1].length === 0) throw new Error("[BitmapFont]: Invalid character delimiter.");
        const s = i[0].charCodeAt(0), n = i[1].charCodeAt(0);
        if (n < s) throw new Error("[BitmapFont]: Invalid character range.");
        for (let o = s, d = n; o <= d; o++) e.push(String.fromCharCode(o));
      } else e.push(...Array.from(i));
    }
    if (e.length === 0) throw new Error("[BitmapFont]: Empty set when resolving characters.");
    return e;
  }
  const Le = class Ve extends Ht {
    constructor(e) {
      super(), this.resolution = 1, this.pages = [], this._padding = 0, this._measureCache = /* @__PURE__ */ Object.create(null), this._currentChars = [], this._currentX = 0, this._currentY = 0, this._currentPageIndex = -1, this._skipKerning = false;
      const t = {
        ...Ve.defaultOptions,
        ...e
      };
      this._textureSize = t.textureSize, this._mipmap = t.mipmap;
      const r = t.style.clone();
      t.overrideFill && (r._fill.color = 16777215, r._fill.alpha = 1, r._fill.texture = P.WHITE, r._fill.fill = null), this.applyFillAsTint = t.overrideFill;
      const i = r.fontSize;
      r.fontSize = this.baseMeasurementFontSize;
      const s = re(r);
      t.overrideSize ? r._stroke && (r._stroke.width *= this.baseRenderedFontSize / i) : r.fontSize = this.baseRenderedFontSize = i, this._style = r, this._skipKerning = t.skipKerning ?? false, this.resolution = t.resolution ?? 1, this._padding = t.padding ?? 4, this.fontMetrics = W.measureFont(s), this.lineHeight = r.lineHeight || this.fontMetrics.fontSize || r.fontSize;
    }
    ensureCharacters(e) {
      var _a, _b;
      const t = Ee(e).filter((m) => !this._currentChars.includes(m)).filter((m, x, b) => b.indexOf(m) === x);
      if (!t.length) return;
      this._currentChars = [
        ...this._currentChars,
        ...t
      ];
      let r;
      this._currentPageIndex === -1 ? r = this._nextPage() : r = this.pages[this._currentPageIndex];
      let { canvas: i, context: s } = r.canvasAndContext, n = r.texture.source;
      const o = this._style;
      let d = this._currentX, c = this._currentY;
      const h = this.baseRenderedFontSize / this.baseMeasurementFontSize, l = this._padding * h;
      let f = 0, p = false;
      const u = i.width / this.resolution, g = i.height / this.resolution;
      for (let m = 0; m < t.length; m++) {
        const x = t[m], b = W.measureText(x, o, i, false);
        b.lineHeight = b.height;
        const v = b.width * h, S = Math.ceil((o.fontStyle === "italic" ? 2 : 1) * v), C = b.height * h, F = S + l * 2, B = C + l * 2;
        if (p = false, x !== `
` && x !== "\r" && x !== "	" && x !== " " && (p = true, f = Math.ceil(Math.max(B, f))), d + F > u && (c += f, f = B, d = 0, c + f > g)) {
          n.update();
          const H = this._nextPage();
          i = H.canvasAndContext.canvas, s = H.canvasAndContext.context, n = H.texture.source, c = 0;
        }
        const y = v / h - (((_a = o.dropShadow) == null ? void 0 : _a.distance) ?? 0) - (((_b = o._stroke) == null ? void 0 : _b.width) ?? 0);
        if (this.chars[x] = {
          id: x.codePointAt(0),
          xOffset: -this._padding,
          yOffset: -this._padding,
          xAdvance: y,
          kerning: {}
        }, p) {
          this._drawGlyph(s, b, d + l, c + l, h, o);
          const H = n.width * h, V = n.height * h, Q = new ie(d / H * n.width, c / V * n.height, F / H * n.width, B / V * n.height);
          this.chars[x].texture = new P({
            source: n,
            frame: Q
          }), d += Math.ceil(F);
        }
      }
      n.update(), this._currentX = d, this._currentY = c, this._skipKerning && this._applyKerning(t, s);
    }
    get pageTextures() {
      return G(z, "BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead."), this.pages;
    }
    _applyKerning(e, t) {
      const r = this._measureCache;
      for (let i = 0; i < e.length; i++) {
        const s = e[i];
        for (let n = 0; n < this._currentChars.length; n++) {
          const o = this._currentChars[n];
          let d = r[s];
          d || (d = r[s] = t.measureText(s).width);
          let c = r[o];
          c || (c = r[o] = t.measureText(o).width);
          let h = t.measureText(s + o).width, l = h - (d + c);
          l && (this.chars[s].kerning[o] = l), h = t.measureText(s + o).width, l = h - (d + c), l && (this.chars[o].kerning[s] = l);
        }
      }
    }
    _nextPage() {
      this._currentPageIndex++;
      const e = this.resolution, t = D.getOptimalCanvasAndContext(this._textureSize, this._textureSize, e);
      this._setupContext(t.context, this._style, e);
      const r = e * (this.baseRenderedFontSize / this.baseMeasurementFontSize), i = new P({
        source: new _t({
          resource: t.canvas,
          resolution: r,
          alphaMode: "premultiply-alpha-on-upload",
          autoGenerateMipmaps: this._mipmap
        })
      }), s = {
        canvasAndContext: t,
        texture: i
      };
      return this.pages[this._currentPageIndex] = s, s;
    }
    _setupContext(e, t, r) {
      t.fontSize = this.baseRenderedFontSize, e.scale(r, r), e.font = re(t), t.fontSize = this.baseMeasurementFontSize, e.textBaseline = t.textBaseline;
      const i = t._stroke, s = (i == null ? void 0 : i.width) ?? 0;
      if (i && (e.lineWidth = s, e.lineJoin = i.join, e.miterLimit = i.miterLimit, e.strokeStyle = N(i, e)), t._fill && (e.fillStyle = N(t._fill, e)), t.dropShadow) {
        const n = t.dropShadow, o = R.shared.setValue(n.color).toArray(), d = n.blur * r, c = n.distance * r;
        e.shadowColor = `rgba(${o[0] * 255},${o[1] * 255},${o[2] * 255},${n.alpha})`, e.shadowBlur = d, e.shadowOffsetX = Math.cos(n.angle) * c, e.shadowOffsetY = Math.sin(n.angle) * c;
      } else e.shadowColor = "black", e.shadowBlur = 0, e.shadowOffsetX = 0, e.shadowOffsetY = 0;
    }
    _drawGlyph(e, t, r, i, s, n) {
      var _a;
      const o = t.text, d = t.fontProperties, h = (((_a = n._stroke) == null ? void 0 : _a.width) ?? 0) * s, l = r + h / 2, f = i - h / 2, p = d.descent * s, u = t.lineHeight * s;
      n.stroke && h && e.strokeText(o, l, f + u - p), n._fill && e.fillText(o, l, f + u - p);
    }
    destroy() {
      super.destroy();
      for (let e = 0; e < this.pages.length; e++) {
        const { canvasAndContext: t, texture: r } = this.pages[e];
        D.returnCanvasAndContext(t), r.destroy(true);
      }
      this.pages = null;
    }
  };
  Le.defaultOptions = {
    textureSize: 512,
    style: new I(),
    mipmap: true
  };
  let _e = Le;
  function $e(a, e, t, r) {
    const i = {
      width: 0,
      height: 0,
      offsetY: 0,
      scale: e.fontSize / t.baseMeasurementFontSize,
      lines: [
        {
          width: 0,
          charPositions: [],
          spaceWidth: 0,
          spacesIndex: [],
          chars: []
        }
      ]
    };
    i.offsetY = t.baseLineOffset;
    let s = i.lines[0], n = null, o = true;
    const d = {
      width: 0,
      start: 0,
      index: 0,
      positions: [],
      chars: []
    }, c = (u) => {
      const g = s.width;
      for (let m = 0; m < d.index; m++) {
        const x = u.positions[m];
        s.chars.push(u.chars[m]), s.charPositions.push(x + g);
      }
      s.width += u.width, o = false, d.width = 0, d.index = 0, d.chars.length = 0;
    }, h = () => {
      let u = s.chars.length - 1;
      if (r) {
        let g = s.chars[u];
        for (; g === " "; ) s.width -= t.chars[g].xAdvance, g = s.chars[--u];
      }
      i.width = Math.max(i.width, s.width), s = {
        width: 0,
        charPositions: [],
        chars: [],
        spaceWidth: 0,
        spacesIndex: []
      }, o = true, i.lines.push(s), i.height += t.lineHeight;
    }, l = t.baseMeasurementFontSize / e.fontSize, f = e.letterSpacing * l, p = e.wordWrapWidth * l;
    for (let u = 0; u < a.length + 1; u++) {
      let g;
      const m = u === a.length;
      m || (g = a[u]);
      const x = t.chars[g] || t.chars[" "];
      if (/(?:\s)/.test(g) || g === "\r" || g === `
` || m) {
        if (!o && e.wordWrap && s.width + d.width - f > p ? (h(), c(d), m || s.charPositions.push(0)) : (d.start = s.width, c(d), m || s.charPositions.push(0)), g === "\r" || g === `
`) s.width !== 0 && h();
        else if (!m) {
          const C = x.xAdvance + (x.kerning[n] || 0) + f;
          s.width += C, s.spaceWidth = C, s.spacesIndex.push(s.charPositions.length), s.chars.push(g);
        }
      } else {
        const S = x.kerning[n] || 0, C = x.xAdvance + S + f;
        d.positions[d.index++] = d.width + S, d.chars.push(g), d.width += C;
      }
      n = g;
    }
    return h(), e.align === "center" ? Wt(i) : e.align === "right" ? Dt(i) : e.align === "justify" && Ot(i), i;
  }
  function Wt(a) {
    for (let e = 0; e < a.lines.length; e++) {
      const t = a.lines[e], r = a.width / 2 - t.width / 2;
      for (let i = 0; i < t.charPositions.length; i++) t.charPositions[i] += r;
    }
  }
  function Dt(a) {
    for (let e = 0; e < a.lines.length; e++) {
      const t = a.lines[e], r = a.width - t.width;
      for (let i = 0; i < t.charPositions.length; i++) t.charPositions[i] += r;
    }
  }
  function Ot(a) {
    const e = a.width;
    for (let t = 0; t < a.lines.length; t++) {
      const r = a.lines[t];
      let i = 0, s = r.spacesIndex[i++], n = 0;
      const o = r.spacesIndex.length, c = (e - r.width) / o;
      for (let h = 0; h < r.charPositions.length; h++) h === s && (s = r.spacesIndex[i++], n += c), r.charPositions[h] += n;
    }
  }
  let Y = 0;
  class It {
    constructor() {
      this.ALPHA = [
        [
          "a",
          "z"
        ],
        [
          "A",
          "Z"
        ],
        " "
      ], this.NUMERIC = [
        [
          "0",
          "9"
        ]
      ], this.ALPHANUMERIC = [
        [
          "a",
          "z"
        ],
        [
          "A",
          "Z"
        ],
        [
          "0",
          "9"
        ],
        " "
      ], this.ASCII = [
        [
          " ",
          "~"
        ]
      ], this.defaultOptions = {
        chars: this.ALPHANUMERIC,
        resolution: 1,
        padding: 4,
        skipKerning: false
      };
    }
    getFont(e, t) {
      var _a;
      let r = `${t.fontFamily}-bitmap`, i = true;
      if (t._fill.fill && !t._stroke) r += t._fill.fill.styleKey, i = false;
      else if (t._stroke || t.dropShadow) {
        let n = t.styleKey;
        n = n.substring(0, n.lastIndexOf("-")), r = `${n}-bitmap`, i = false;
      }
      if (!U.has(r)) {
        const n = new _e({
          style: t,
          overrideFill: i,
          overrideSize: true,
          ...this.defaultOptions
        });
        Y++, Y > 50 && O("BitmapText", `You have dynamically created ${Y} bitmap fonts, this can be inefficient. Try pre installing your font styles using \`BitmapFont.install({name:"style1", style})\``), n.once("destroy", () => {
          Y--, U.remove(r);
        }), U.set(r, n);
      }
      const s = U.get(r);
      return (_a = s.ensureCharacters) == null ? void 0 : _a.call(s, e), s;
    }
    getLayout(e, t, r = true) {
      const i = this.getFont(e, t);
      return $e([
        ...e
      ], t, i, r);
    }
    measureText(e, t, r = true) {
      return this.getLayout(e, t, r);
    }
    install(...e) {
      var _a, _b, _c, _d;
      let t = e[0];
      typeof t == "string" && (t = {
        name: t,
        style: e[1],
        chars: (_a = e[2]) == null ? void 0 : _a.chars,
        resolution: (_b = e[2]) == null ? void 0 : _b.resolution,
        padding: (_c = e[2]) == null ? void 0 : _c.padding,
        skipKerning: (_d = e[2]) == null ? void 0 : _d.skipKerning
      }, G(z, "BitmapFontManager.install(name, style, options) is deprecated, use BitmapFontManager.install({name, style, ...options})"));
      const r = t == null ? void 0 : t.name;
      if (!r) throw new Error("[BitmapFontManager] Property `name` is required.");
      t = {
        ...this.defaultOptions,
        ...t
      };
      const i = t.style, s = i instanceof I ? i : new I(i), n = s._fill.fill !== null && s._fill.fill !== void 0, o = new _e({
        style: s,
        overrideFill: n,
        skipKerning: t.skipKerning,
        padding: t.padding,
        resolution: t.resolution,
        overrideSize: false
      }), d = Ee(t.chars);
      return o.ensureCharacters(d.join("")), U.set(`${r}-bitmap`, o), o.once("destroy", () => U.remove(`${r}-bitmap`)), o;
    }
    uninstall(e) {
      const t = `${e}-bitmap`, r = U.get(t);
      r && r.destroy();
    }
  }
  const Et = new It();
  class Ye {
    constructor(e) {
      this._renderer = e;
    }
    push(e, t, r) {
      this._renderer.renderPipes.batch.break(r), r.add({
        renderPipeId: "filter",
        canBundle: false,
        action: "pushFilter",
        container: t,
        filterEffect: e
      });
    }
    pop(e, t, r) {
      this._renderer.renderPipes.batch.break(r), r.add({
        renderPipeId: "filter",
        action: "popFilter",
        canBundle: false
      });
    }
    execute(e) {
      e.action === "pushFilter" ? this._renderer.filter.push(e) : e.action === "popFilter" && this._renderer.filter.pop();
    }
    destroy() {
      this._renderer = null;
    }
  }
  Ye.extension = {
    type: [
      _.WebGLPipes,
      _.WebGPUPipes,
      _.CanvasPipes
    ],
    name: "filter"
  };
  function Lt(a, e) {
    e.clear();
    const t = e.matrix;
    for (let r = 0; r < a.length; r++) {
      const i = a[r];
      i.globalDisplayStatus < 7 || (e.matrix = i.worldTransform, e.addBounds(i.bounds));
    }
    return e.matrix = t, e;
  }
  const Vt = new ae({
    attributes: {
      aPosition: {
        buffer: new Float32Array([
          0,
          0,
          1,
          0,
          1,
          1,
          0,
          1
        ]),
        format: "float32x2",
        stride: 2 * 4,
        offset: 0
      }
    },
    indexBuffer: new Uint32Array([
      0,
      1,
      2,
      0,
      2,
      3
    ])
  });
  class Xe {
    constructor(e) {
      this._filterStackIndex = 0, this._filterStack = [], this._filterGlobalUniforms = new E({
        uInputSize: {
          value: new Float32Array(4),
          type: "vec4<f32>"
        },
        uInputPixel: {
          value: new Float32Array(4),
          type: "vec4<f32>"
        },
        uInputClamp: {
          value: new Float32Array(4),
          type: "vec4<f32>"
        },
        uOutputFrame: {
          value: new Float32Array(4),
          type: "vec4<f32>"
        },
        uGlobalFrame: {
          value: new Float32Array(4),
          type: "vec4<f32>"
        },
        uOutputTexture: {
          value: new Float32Array(4),
          type: "vec4<f32>"
        }
      }), this._globalFilterBindGroup = new Ue({}), this.renderer = e;
    }
    get activeBackTexture() {
      var _a;
      return (_a = this._activeFilterData) == null ? void 0 : _a.backTexture;
    }
    push(e) {
      var _a;
      const t = this.renderer, r = e.filterEffect.filters;
      this._filterStack[this._filterStackIndex] || (this._filterStack[this._filterStackIndex] = this._getFilterData());
      const i = this._filterStack[this._filterStackIndex];
      if (this._filterStackIndex++, r.length === 0) {
        i.skip = true;
        return;
      }
      const s = i.bounds;
      if (e.renderables ? Lt(e.renderables, s) : e.filterEffect.filterArea ? (s.clear(), s.addRect(e.filterEffect.filterArea), s.applyMatrix(e.container.worldTransform)) : e.container.getFastGlobalBounds(true, s), e.container) {
        const u = (e.container.renderGroup || e.container.parentRenderGroup).cacheToLocalTransform;
        u && s.applyMatrix(u);
      }
      const n = t.renderTarget.renderTarget.colorTexture.source;
      let o = 1 / 0, d = 0, c = true, h = false, l = false, f = true;
      for (let p = 0; p < r.length; p++) {
        const u = r[p];
        if (o = Math.min(o, u.resolution === "inherit" ? n._resolution : u.resolution), d += u.padding, u.antialias === "off" ? c = false : u.antialias === "inherit" && c && (c = n.antialias), u.clipToViewport || (f = false), !!!(u.compatibleRenderers & t.type)) {
          l = false;
          break;
        }
        if (u.blendRequired && !(((_a = t.backBuffer) == null ? void 0 : _a.useBackBuffer) ?? true)) {
          O("Blend filter requires backBuffer on WebGL renderer to be enabled. Set `useBackBuffer: true` in the renderer options."), l = false;
          break;
        }
        l = u.enabled || l, h || (h = u.blendRequired);
      }
      if (!l) {
        i.skip = true;
        return;
      }
      if (f) {
        const p = t.renderTarget.rootViewPort, u = t.renderTarget.renderTarget.resolution;
        s.fitBounds(0, p.width / u, 0, p.height / u);
      }
      if (s.scale(o).ceil().scale(1 / o).pad(d | 0), !s.isPositive) {
        i.skip = true;
        return;
      }
      i.skip = false, i.bounds = s, i.blendRequired = h, i.container = e.container, i.filterEffect = e.filterEffect, i.previousRenderSurface = t.renderTarget.renderSurface, i.inputTexture = k.getOptimalTexture(s.width, s.height, o, c), t.renderTarget.bind(i.inputTexture, true), t.globalUniforms.push({
        offset: s
      });
    }
    pop() {
      const e = this.renderer;
      this._filterStackIndex--;
      const t = this._filterStack[this._filterStackIndex];
      if (t.skip) return;
      this._activeFilterData = t;
      const r = t.inputTexture, i = t.bounds;
      let s = P.EMPTY;
      if (e.renderTarget.finishRenderPass(), t.blendRequired) {
        const o = this._filterStackIndex > 0 ? this._filterStack[this._filterStackIndex - 1].bounds : null, d = e.renderTarget.getRenderTarget(t.previousRenderSurface);
        s = this.getBackTexture(d, i, o);
      }
      t.backTexture = s;
      const n = t.filterEffect.filters;
      if (this._globalFilterBindGroup.setResource(r.source.style, 2), this._globalFilterBindGroup.setResource(s.source, 3), e.globalUniforms.pop(), n.length === 1) n[0].apply(this, r, t.previousRenderSurface, false), k.returnTexture(r);
      else {
        let o = t.inputTexture, d = k.getOptimalTexture(i.width, i.height, o.source._resolution, false), c = 0;
        for (c = 0; c < n.length - 1; ++c) {
          n[c].apply(this, o, d, true);
          const l = o;
          o = d, d = l;
        }
        n[c].apply(this, o, t.previousRenderSurface, false), k.returnTexture(o), k.returnTexture(d);
      }
      t.blendRequired && k.returnTexture(s);
    }
    getBackTexture(e, t, r) {
      const i = e.colorTexture.source._resolution, s = k.getOptimalTexture(t.width, t.height, i, false);
      let n = t.minX, o = t.minY;
      r && (n -= r.minX, o -= r.minY), n = Math.floor(n * i), o = Math.floor(o * i);
      const d = Math.ceil(t.width * i), c = Math.ceil(t.height * i);
      return this.renderer.renderTarget.copyToTexture(e, s, {
        x: n,
        y: o
      }, {
        width: d,
        height: c
      }, {
        x: 0,
        y: 0
      }), s;
    }
    applyFilter(e, t, r, i) {
      const s = this.renderer, n = this._filterStack[this._filterStackIndex], o = n.bounds, d = bt.shared, h = n.previousRenderSurface === r;
      let l = this.renderer.renderTarget.rootRenderTarget.colorTexture.source._resolution, f = this._filterStackIndex - 1;
      for (; f > 0 && this._filterStack[f].skip; ) --f;
      f > 0 && (l = this._filterStack[f].inputTexture.source._resolution);
      const p = this._filterGlobalUniforms, u = p.uniforms, g = u.uOutputFrame, m = u.uInputSize, x = u.uInputPixel, b = u.uInputClamp, v = u.uGlobalFrame, S = u.uOutputTexture;
      if (h) {
        let B = this._filterStackIndex;
        for (; B > 0; ) {
          B--;
          const y = this._filterStack[this._filterStackIndex - 1];
          if (!y.skip) {
            d.x = y.bounds.minX, d.y = y.bounds.minY;
            break;
          }
        }
        g[0] = o.minX - d.x, g[1] = o.minY - d.y;
      } else g[0] = 0, g[1] = 0;
      g[2] = t.frame.width, g[3] = t.frame.height, m[0] = t.source.width, m[1] = t.source.height, m[2] = 1 / m[0], m[3] = 1 / m[1], x[0] = t.source.pixelWidth, x[1] = t.source.pixelHeight, x[2] = 1 / x[0], x[3] = 1 / x[1], b[0] = 0.5 * x[2], b[1] = 0.5 * x[3], b[2] = t.frame.width * m[2] - 0.5 * x[2], b[3] = t.frame.height * m[3] - 0.5 * x[3];
      const C = this.renderer.renderTarget.rootRenderTarget.colorTexture;
      v[0] = d.x * l, v[1] = d.y * l, v[2] = C.source.width * l, v[3] = C.source.height * l;
      const F = this.renderer.renderTarget.getRenderTarget(r);
      if (s.renderTarget.bind(r, !!i), r instanceof P ? (S[0] = r.frame.width, S[1] = r.frame.height) : (S[0] = F.width, S[1] = F.height), S[2] = F.isRoot ? -1 : 1, p.update(), s.renderPipes.uniformBatch) {
        const B = s.renderPipes.uniformBatch.getUboResource(p);
        this._globalFilterBindGroup.setResource(B, 0);
      } else this._globalFilterBindGroup.setResource(p, 0);
      this._globalFilterBindGroup.setResource(t.source, 1), this._globalFilterBindGroup.setResource(t.source.style, 2), e.groups[0] = this._globalFilterBindGroup, s.encoder.draw({
        geometry: Vt,
        shader: e,
        state: e._state,
        topology: "triangle-list"
      }), s.type === oe.WEBGL && s.renderTarget.finishRenderPass();
    }
    _getFilterData() {
      return {
        skip: false,
        inputTexture: null,
        bounds: new ke(),
        container: null,
        filterEffect: null,
        blendRequired: false,
        previousRenderSurface: null
      };
    }
    calculateSpriteMatrix(e, t) {
      const r = this._activeFilterData, i = e.set(r.inputTexture._source.width, 0, 0, r.inputTexture._source.height, r.bounds.minX, r.bounds.minY), s = t.worldTransform.copyTo(M.shared), n = t.renderGroup || t.parentRenderGroup;
      return n && n.cacheToLocalTransform && s.prepend(n.cacheToLocalTransform), s.invert(), i.prepend(s), i.scale(1 / t.texture.frame.width, 1 / t.texture.frame.height), i.translate(t.anchor.x, t.anchor.y), i;
    }
  }
  Xe.extension = {
    type: [
      _.WebGLSystem,
      _.WebGPUSystem
    ],
    name: "filter"
  };
  const je = class Ke extends ae {
    constructor(...e) {
      let t = e[0] ?? {};
      t instanceof Float32Array && (G(z, "use new MeshGeometry({ positions, uvs, indices }) instead"), t = {
        positions: t,
        uvs: e[1],
        indices: e[2]
      }), t = {
        ...Ke.defaultOptions,
        ...t
      };
      const r = t.positions || new Float32Array([
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        1
      ]);
      let i = t.uvs;
      i || (t.positions ? i = new Float32Array(r.length) : i = new Float32Array([
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        1
      ]));
      const s = t.indices || new Uint32Array([
        0,
        1,
        2,
        0,
        2,
        3
      ]), n = t.shrinkBuffersToFit, o = new L({
        data: r,
        label: "attribute-mesh-positions",
        shrinkToFit: n,
        usage: A.VERTEX | A.COPY_DST
      }), d = new L({
        data: i,
        label: "attribute-mesh-uvs",
        shrinkToFit: n,
        usage: A.VERTEX | A.COPY_DST
      }), c = new L({
        data: s,
        label: "index-mesh-buffer",
        shrinkToFit: n,
        usage: A.INDEX | A.COPY_DST
      });
      super({
        attributes: {
          aPosition: {
            buffer: o,
            format: "float32x2",
            stride: 2 * 4,
            offset: 0
          },
          aUV: {
            buffer: d,
            format: "float32x2",
            stride: 2 * 4,
            offset: 0
          }
        },
        indexBuffer: c,
        topology: t.topology
      }), this.batchMode = "auto";
    }
    get positions() {
      return this.attributes.aPosition.buffer.data;
    }
    set positions(e) {
      this.attributes.aPosition.buffer.data = e;
    }
    get uvs() {
      return this.attributes.aUV.buffer.data;
    }
    set uvs(e) {
      this.attributes.aUV.buffer.data = e;
    }
    get indices() {
      return this.indexBuffer.data;
    }
    set indices(e) {
      this.indexBuffer.data = e;
    }
  };
  je.defaultOptions = {
    topology: "triangle-list",
    shrinkBuffersToFit: false
  };
  let ce = je;
  function $t(a) {
    const e = a._stroke, t = a._fill, i = [
      `div { ${[
        `color: ${R.shared.setValue(t.color).toHex()}`,
        `font-size: ${a.fontSize}px`,
        `font-family: ${a.fontFamily}`,
        `font-weight: ${a.fontWeight}`,
        `font-style: ${a.fontStyle}`,
        `font-variant: ${a.fontVariant}`,
        `letter-spacing: ${a.letterSpacing}px`,
        `text-align: ${a.align}`,
        `padding: ${a.padding}px`,
        `white-space: ${a.whiteSpace === "pre" && a.wordWrap ? "pre-wrap" : a.whiteSpace}`,
        ...a.lineHeight ? [
          `line-height: ${a.lineHeight}px`
        ] : [],
        ...a.wordWrap ? [
          `word-wrap: ${a.breakWords ? "break-all" : "break-word"}`,
          `max-width: ${a.wordWrapWidth}px`
        ] : [],
        ...e ? [
          qe(e)
        ] : [],
        ...a.dropShadow ? [
          Ne(a.dropShadow)
        ] : [],
        ...a.cssOverrides
      ].join(";")} }`
    ];
    return Yt(a.tagStyles, i), i.join(" ");
  }
  function Ne(a) {
    const e = R.shared.setValue(a.color).setAlpha(a.alpha).toHexa(), t = Math.round(Math.cos(a.angle) * a.distance), r = Math.round(Math.sin(a.angle) * a.distance), i = `${t}px ${r}px`;
    return a.blur > 0 ? `text-shadow: ${i} ${a.blur}px ${e}` : `text-shadow: ${i} ${e}`;
  }
  function qe(a) {
    return [
      `-webkit-text-stroke-width: ${a.width}px`,
      `-webkit-text-stroke-color: ${R.shared.setValue(a.color).toHex()}`,
      `text-stroke-width: ${a.width}px`,
      `text-stroke-color: ${R.shared.setValue(a.color).toHex()}`,
      "paint-order: stroke"
    ].join(";");
  }
  const be = {
    fontSize: "font-size: {{VALUE}}px",
    fontFamily: "font-family: {{VALUE}}",
    fontWeight: "font-weight: {{VALUE}}",
    fontStyle: "font-style: {{VALUE}}",
    fontVariant: "font-variant: {{VALUE}}",
    letterSpacing: "letter-spacing: {{VALUE}}px",
    align: "text-align: {{VALUE}}",
    padding: "padding: {{VALUE}}px",
    whiteSpace: "white-space: {{VALUE}}",
    lineHeight: "line-height: {{VALUE}}px",
    wordWrapWidth: "max-width: {{VALUE}}px"
  }, ye = {
    fill: (a) => `color: ${R.shared.setValue(a).toHex()}`,
    breakWords: (a) => `word-wrap: ${a ? "break-all" : "break-word"}`,
    stroke: qe,
    dropShadow: Ne
  };
  function Yt(a, e) {
    for (const t in a) {
      const r = a[t], i = [];
      for (const s in r) ye[s] ? i.push(ye[s](r[s])) : be[s] && i.push(be[s].replace("{{VALUE}}", r[s]));
      e.push(`${t} { ${i.join(";")} }`);
    }
  }
  class he extends I {
    constructor(e = {}) {
      super(e), this._cssOverrides = [], this.cssOverrides ?? (this.cssOverrides = e.cssOverrides), this.tagStyles = e.tagStyles ?? {};
    }
    set cssOverrides(e) {
      this._cssOverrides = e instanceof Array ? e : [
        e
      ], this.update();
    }
    get cssOverrides() {
      return this._cssOverrides;
    }
    _generateKey() {
      return this._styleKey = yt(this) + this._cssOverrides.join("-"), this._styleKey;
    }
    update() {
      this._cssStyle = null, super.update();
    }
    clone() {
      return new he({
        align: this.align,
        breakWords: this.breakWords,
        dropShadow: this.dropShadow ? {
          ...this.dropShadow
        } : null,
        fill: this._fill,
        fontFamily: this.fontFamily,
        fontSize: this.fontSize,
        fontStyle: this.fontStyle,
        fontVariant: this.fontVariant,
        fontWeight: this.fontWeight,
        letterSpacing: this.letterSpacing,
        lineHeight: this.lineHeight,
        padding: this.padding,
        stroke: this._stroke,
        whiteSpace: this.whiteSpace,
        wordWrap: this.wordWrap,
        wordWrapWidth: this.wordWrapWidth,
        cssOverrides: this.cssOverrides
      });
    }
    get cssStyle() {
      return this._cssStyle || (this._cssStyle = $t(this)), this._cssStyle;
    }
    addOverride(...e) {
      const t = e.filter((r) => !this.cssOverrides.includes(r));
      t.length > 0 && (this.cssOverrides.push(...t), this.update());
    }
    removeOverride(...e) {
      const t = e.filter((r) => this.cssOverrides.includes(r));
      t.length > 0 && (this.cssOverrides = this.cssOverrides.filter((r) => !t.includes(r)), this.update());
    }
    set fill(e) {
      typeof e != "string" && typeof e != "number" && O("[HTMLTextStyle] only color fill is not supported by HTMLText"), super.fill = e;
    }
    set stroke(e) {
      e && typeof e != "string" && typeof e != "number" && O("[HTMLTextStyle] only color stroke is not supported by HTMLText"), super.stroke = e;
    }
  }
  const Te = "http://www.w3.org/2000/svg", ve = "http://www.w3.org/1999/xhtml";
  class Qe {
    constructor() {
      this.svgRoot = document.createElementNS(Te, "svg"), this.foreignObject = document.createElementNS(Te, "foreignObject"), this.domElement = document.createElementNS(ve, "div"), this.styleElement = document.createElementNS(ve, "style"), this.image = new Image();
      const { foreignObject: e, svgRoot: t, styleElement: r, domElement: i } = this;
      e.setAttribute("width", "10000"), e.setAttribute("height", "10000"), e.style.overflow = "hidden", t.appendChild(e), e.appendChild(r), e.appendChild(i);
    }
  }
  let we;
  function Xt(a, e, t, r) {
    r || (r = we || (we = new Qe()));
    const { domElement: i, styleElement: s, svgRoot: n } = r;
    i.innerHTML = `<style>${e.cssStyle};</style><div style='padding:0'>${a}</div>`, i.setAttribute("style", "transform-origin: top left; display: inline-block"), t && (s.textContent = t), document.body.appendChild(n);
    const o = i.getBoundingClientRect();
    n.remove();
    const d = e.padding * 2;
    return {
      width: o.width - d,
      height: o.height - d
    };
  }
  class Je {
    constructor(e, t) {
      this.state = K.for2d(), this._graphicsBatchesHash = /* @__PURE__ */ Object.create(null), this._destroyRenderableBound = this.destroyRenderable.bind(this), this.renderer = e, this._adaptor = t, this._adaptor.init(), this.renderer.renderableGC.addManagedHash(this, "_graphicsBatchesHash");
    }
    validateRenderable(e) {
      const t = e.context, r = !!this._graphicsBatchesHash[e.uid], i = this.renderer.graphicsContext.updateGpuContext(t);
      return !!(i.isBatchable || r !== i.isBatchable);
    }
    addRenderable(e, t) {
      const r = this.renderer.graphicsContext.updateGpuContext(e.context);
      e.didViewUpdate && this._rebuild(e), r.isBatchable ? this._addToBatcher(e, t) : (this.renderer.renderPipes.batch.break(t), t.add(e));
    }
    updateRenderable(e) {
      const t = this._graphicsBatchesHash[e.uid];
      if (t) for (let r = 0; r < t.length; r++) {
        const i = t[r];
        i._batcher.updateElement(i);
      }
    }
    destroyRenderable(e) {
      this._graphicsBatchesHash[e.uid] && this._removeBatchForRenderable(e.uid), e.off("destroyed", this._destroyRenderableBound);
    }
    execute(e) {
      if (!e.isRenderable) return;
      const t = this.renderer, r = e.context;
      if (!t.graphicsContext.getGpuContext(r).batches.length) return;
      const s = r.customShader || this._adaptor.shader;
      this.state.blendMode = e.groupBlendMode;
      const n = s.resources.localUniforms.uniforms;
      n.uTransformMatrix = e.groupTransform, n.uRound = t._roundPixels | e._roundPixels, q(e.groupColorAlpha, n.uColor, 0), this._adaptor.execute(this, e);
    }
    _rebuild(e) {
      const t = !!this._graphicsBatchesHash[e.uid], r = this.renderer.graphicsContext.updateGpuContext(e.context);
      t && this._removeBatchForRenderable(e.uid), r.isBatchable && this._initBatchesForRenderable(e), e.batched = r.isBatchable;
    }
    _addToBatcher(e, t) {
      const r = this.renderer.renderPipes.batch, i = this._getBatchesForRenderable(e);
      for (let s = 0; s < i.length; s++) {
        const n = i[s];
        r.addToBatch(n, t);
      }
    }
    _getBatchesForRenderable(e) {
      return this._graphicsBatchesHash[e.uid] || this._initBatchesForRenderable(e);
    }
    _initBatchesForRenderable(e) {
      const t = e.context, r = this.renderer.graphicsContext.getGpuContext(t), i = this.renderer._roundPixels | e._roundPixels, s = r.batches.map((n) => {
        const o = T.get(Tt);
        return n.copyTo(o), o.renderable = e, o.roundPixels = i, o;
      });
      return this._graphicsBatchesHash[e.uid] === void 0 && e.on("destroyed", this._destroyRenderableBound), this._graphicsBatchesHash[e.uid] = s, s;
    }
    _removeBatchForRenderable(e) {
      this._graphicsBatchesHash[e].forEach((t) => {
        T.return(t);
      }), this._graphicsBatchesHash[e] = null;
    }
    destroy() {
      this.renderer = null, this._adaptor.destroy(), this._adaptor = null, this.state = null;
      for (const e in this._graphicsBatchesHash) this._removeBatchForRenderable(e);
      this._graphicsBatchesHash = null;
    }
  }
  Je.extension = {
    type: [
      _.WebGLPipes,
      _.WebGPUPipes,
      _.CanvasPipes
    ],
    name: "graphics"
  };
  const Ze = class et extends ce {
    constructor(...e) {
      super({});
      let t = e[0] ?? {};
      typeof t == "number" && (G(z, "PlaneGeometry constructor changed please use { width, height, verticesX, verticesY } instead"), t = {
        width: t,
        height: e[1],
        verticesX: e[2],
        verticesY: e[3]
      }), this.build(t);
    }
    build(e) {
      e = {
        ...et.defaultOptions,
        ...e
      }, this.verticesX = this.verticesX ?? e.verticesX, this.verticesY = this.verticesY ?? e.verticesY, this.width = this.width ?? e.width, this.height = this.height ?? e.height;
      const t = this.verticesX * this.verticesY, r = [], i = [], s = [], n = this.verticesX - 1, o = this.verticesY - 1, d = this.width / n, c = this.height / o;
      for (let l = 0; l < t; l++) {
        const f = l % this.verticesX, p = l / this.verticesX | 0;
        r.push(f * d, p * c), i.push(f / n, p / o);
      }
      const h = n * o;
      for (let l = 0; l < h; l++) {
        const f = l % n, p = l / n | 0, u = p * this.verticesX + f, g = p * this.verticesX + f + 1, m = (p + 1) * this.verticesX + f, x = (p + 1) * this.verticesX + f + 1;
        s.push(u, g, m, g, x, m);
      }
      this.buffers[0].data = new Float32Array(r), this.buffers[1].data = new Float32Array(i), this.indexBuffer.data = new Uint32Array(s), this.buffers[0].update(), this.buffers[1].update(), this.indexBuffer.update();
    }
  };
  Ze.defaultOptions = {
    width: 100,
    height: 100,
    verticesX: 10,
    verticesY: 10
  };
  let jt = Ze;
  class ue {
    constructor() {
      this.batcherName = "default", this.packAsQuad = false, this.indexOffset = 0, this.attributeOffset = 0, this.roundPixels = 0, this._batcher = null, this._batch = null, this._textureMatrixUpdateId = -1, this._uvUpdateId = -1;
    }
    get blendMode() {
      return this.renderable.groupBlendMode;
    }
    get topology() {
      return this._topology || this.geometry.topology;
    }
    set topology(e) {
      this._topology = e;
    }
    reset() {
      this.renderable = null, this.texture = null, this._batcher = null, this._batch = null, this.geometry = null, this._uvUpdateId = -1, this._textureMatrixUpdateId = -1;
    }
    setTexture(e) {
      this.texture !== e && (this.texture = e, this._textureMatrixUpdateId = -1);
    }
    get uvs() {
      const t = this.geometry.getBuffer("aUV"), r = t.data;
      let i = r;
      const s = this.texture.textureMatrix;
      return s.isSimple || (i = this._transformedUvs, (this._textureMatrixUpdateId !== s._updateID || this._uvUpdateId !== t._updateID) && ((!i || i.length < r.length) && (i = this._transformedUvs = new Float32Array(r.length)), this._textureMatrixUpdateId = s._updateID, this._uvUpdateId = t._updateID, s.multiplyUvs(r, i))), i;
    }
    get positions() {
      return this.geometry.positions;
    }
    get indices() {
      return this.geometry.indices;
    }
    get color() {
      return this.renderable.groupColorAlpha;
    }
    get groupTransform() {
      return this.renderable.groupTransform;
    }
    get attributeSize() {
      return this.geometry.positions.length / 2;
    }
    get indexSize() {
      return this.geometry.indices.length;
    }
  }
  class tt {
    constructor(e, t) {
      this.localUniforms = new E({
        uTransformMatrix: {
          value: new M(),
          type: "mat3x3<f32>"
        },
        uColor: {
          value: new Float32Array([
            1,
            1,
            1,
            1
          ]),
          type: "vec4<f32>"
        },
        uRound: {
          value: 0,
          type: "f32"
        }
      }), this.localUniformsBindGroup = new Ue({
        0: this.localUniforms
      }), this._meshDataHash = /* @__PURE__ */ Object.create(null), this._gpuBatchableMeshHash = /* @__PURE__ */ Object.create(null), this._destroyRenderableBound = this.destroyRenderable.bind(this), this.renderer = e, this._adaptor = t, this._adaptor.init(), e.renderableGC.addManagedHash(this, "_gpuBatchableMeshHash"), e.renderableGC.addManagedHash(this, "_meshDataHash");
    }
    validateRenderable(e) {
      const t = this._getMeshData(e), r = t.batched, i = e.batched;
      if (t.batched = i, r !== i) return true;
      if (i) {
        const s = e._geometry;
        if (s.indices.length !== t.indexSize || s.positions.length !== t.vertexSize) return t.indexSize = s.indices.length, t.vertexSize = s.positions.length, true;
        const n = this._getBatchableMesh(e);
        return n.texture.uid !== e._texture.uid && (n._textureMatrixUpdateId = -1), !n._batcher.checkAndUpdateTexture(n, e._texture);
      }
      return false;
    }
    addRenderable(e, t) {
      const r = this.renderer.renderPipes.batch, { batched: i } = this._getMeshData(e);
      if (i) {
        const s = this._getBatchableMesh(e);
        s.setTexture(e._texture), s.geometry = e._geometry, r.addToBatch(s, t);
      } else r.break(t), t.add(e);
    }
    updateRenderable(e) {
      if (e.batched) {
        const t = this._gpuBatchableMeshHash[e.uid];
        t.setTexture(e._texture), t.geometry = e._geometry, t._batcher.updateElement(t);
      }
    }
    destroyRenderable(e) {
      this._meshDataHash[e.uid] = null;
      const t = this._gpuBatchableMeshHash[e.uid];
      t && (T.return(t), this._gpuBatchableMeshHash[e.uid] = null), e.off("destroyed", this._destroyRenderableBound);
    }
    execute(e) {
      if (!e.isRenderable) return;
      e.state.blendMode = de(e.groupBlendMode, e.texture._source);
      const t = this.localUniforms;
      t.uniforms.uTransformMatrix = e.groupTransform, t.uniforms.uRound = this.renderer._roundPixels | e._roundPixels, t.update(), q(e.groupColorAlpha, t.uniforms.uColor, 0), this._adaptor.execute(this, e);
    }
    _getMeshData(e) {
      return this._meshDataHash[e.uid] || this._initMeshData(e);
    }
    _initMeshData(e) {
      var _a, _b;
      return this._meshDataHash[e.uid] = {
        batched: e.batched,
        indexSize: (_a = e._geometry.indices) == null ? void 0 : _a.length,
        vertexSize: (_b = e._geometry.positions) == null ? void 0 : _b.length
      }, e.on("destroyed", this._destroyRenderableBound), this._meshDataHash[e.uid];
    }
    _getBatchableMesh(e) {
      return this._gpuBatchableMeshHash[e.uid] || this._initBatchableMesh(e);
    }
    _initBatchableMesh(e) {
      const t = T.get(ue);
      return t.renderable = e, t.setTexture(e._texture), t.transform = e.groupTransform, t.roundPixels = this.renderer._roundPixels | e._roundPixels, this._gpuBatchableMeshHash[e.uid] = t, t;
    }
    destroy() {
      for (const e in this._gpuBatchableMeshHash) this._gpuBatchableMeshHash[e] && T.return(this._gpuBatchableMeshHash[e]);
      this._gpuBatchableMeshHash = null, this._meshDataHash = null, this.localUniforms = null, this.localUniformsBindGroup = null, this._adaptor.destroy(), this._adaptor = null, this.renderer = null;
    }
  }
  tt.extension = {
    type: [
      _.WebGLPipes,
      _.WebGPUPipes,
      _.CanvasPipes
    ],
    name: "mesh"
  };
  class Kt {
    execute(e, t) {
      const r = e.state, i = e.renderer, s = t.shader || e.defaultShader;
      s.resources.uTexture = t.texture._source, s.resources.uniforms = e.localUniforms;
      const n = i.gl, o = e.getBuffers(t);
      i.shader.bind(s), i.state.set(r), i.geometry.bind(o.geometry, s.glProgram);
      const c = o.geometry.indexBuffer.data.BYTES_PER_ELEMENT === 2 ? n.UNSIGNED_SHORT : n.UNSIGNED_INT;
      n.drawElements(n.TRIANGLES, t.particleChildren.length * 6, c, 0);
    }
  }
  class Nt {
    execute(e, t) {
      const r = e.renderer, i = t.shader || e.defaultShader;
      i.groups[0] = r.renderPipes.uniformBatch.getUniformBindGroup(e.localUniforms, true), i.groups[1] = r.texture.getTextureBindGroup(t.texture);
      const s = e.state, n = e.getBuffers(t);
      r.encoder.draw({
        geometry: n.geometry,
        shader: t.shader || e.defaultShader,
        state: s,
        size: t.particleChildren.length * 6
      });
    }
  }
  function Se(a, e = null) {
    const t = a * 6;
    if (t > 65535 ? e || (e = new Uint32Array(t)) : e || (e = new Uint16Array(t)), e.length !== t) throw new Error(`Out buffer length is incorrect, got ${e.length} and expected ${t}`);
    for (let r = 0, i = 0; r < t; r += 6, i += 4) e[r + 0] = i + 0, e[r + 1] = i + 1, e[r + 2] = i + 2, e[r + 3] = i + 0, e[r + 4] = i + 2, e[r + 5] = i + 3;
    return e;
  }
  function qt(a) {
    return {
      dynamicUpdate: Ce(a, true),
      staticUpdate: Ce(a, false)
    };
  }
  function Ce(a, e) {
    const t = [];
    t.push(`
      
        var index = 0;

        for (let i = 0; i < ps.length; ++i)
        {
            const p = ps[i];

            `);
    let r = 0;
    for (const s in a) {
      const n = a[s];
      if (e !== n.dynamic) continue;
      t.push(`offset = index + ${r}`), t.push(n.code);
      const o = se(n.format);
      r += o.stride / 4;
    }
    t.push(`
            index += stride * 4;
        }
    `), t.unshift(`
        var stride = ${r};
    `);
    const i = t.join(`
`);
    return new Function("ps", "f32v", "u32v", i);
  }
  class Qt {
    constructor(e) {
      this._size = 0, this._generateParticleUpdateCache = {};
      const t = this._size = e.size ?? 1e3, r = e.properties;
      let i = 0, s = 0;
      for (const h in r) {
        const l = r[h], f = se(l.format);
        l.dynamic ? s += f.stride : i += f.stride;
      }
      this._dynamicStride = s / 4, this._staticStride = i / 4, this.staticAttributeBuffer = new $(t * 4 * i), this.dynamicAttributeBuffer = new $(t * 4 * s), this.indexBuffer = Se(t);
      const n = new ae();
      let o = 0, d = 0;
      this._staticBuffer = new L({
        data: new Float32Array(1),
        label: "static-particle-buffer",
        shrinkToFit: false,
        usage: A.VERTEX | A.COPY_DST
      }), this._dynamicBuffer = new L({
        data: new Float32Array(1),
        label: "dynamic-particle-buffer",
        shrinkToFit: false,
        usage: A.VERTEX | A.COPY_DST
      });
      for (const h in r) {
        const l = r[h], f = se(l.format);
        l.dynamic ? (n.addAttribute(l.attributeName, {
          buffer: this._dynamicBuffer,
          stride: this._dynamicStride * 4,
          offset: o * 4,
          format: l.format
        }), o += f.size) : (n.addAttribute(l.attributeName, {
          buffer: this._staticBuffer,
          stride: this._staticStride * 4,
          offset: d * 4,
          format: l.format
        }), d += f.size);
      }
      n.addIndex(this.indexBuffer);
      const c = this.getParticleUpdate(r);
      this._dynamicUpload = c.dynamicUpdate, this._staticUpload = c.staticUpdate, this.geometry = n;
    }
    getParticleUpdate(e) {
      const t = Jt(e);
      return this._generateParticleUpdateCache[t] ? this._generateParticleUpdateCache[t] : (this._generateParticleUpdateCache[t] = this.generateParticleUpdate(e), this._generateParticleUpdateCache[t]);
    }
    generateParticleUpdate(e) {
      return qt(e);
    }
    update(e, t) {
      e.length > this._size && (t = true, this._size = Math.max(e.length, this._size * 1.5 | 0), this.staticAttributeBuffer = new $(this._size * this._staticStride * 4 * 4), this.dynamicAttributeBuffer = new $(this._size * this._dynamicStride * 4 * 4), this.indexBuffer = Se(this._size), this.geometry.indexBuffer.setDataWithSize(this.indexBuffer, this.indexBuffer.byteLength, true));
      const r = this.dynamicAttributeBuffer;
      if (this._dynamicUpload(e, r.float32View, r.uint32View), this._dynamicBuffer.setDataWithSize(this.dynamicAttributeBuffer.float32View, e.length * this._dynamicStride * 4, true), t) {
        const i = this.staticAttributeBuffer;
        this._staticUpload(e, i.float32View, i.uint32View), this._staticBuffer.setDataWithSize(i.float32View, e.length * this._staticStride * 4, true);
      }
    }
    destroy() {
      this._staticBuffer.destroy(), this._dynamicBuffer.destroy(), this.geometry.destroy();
    }
  }
  function Jt(a) {
    const e = [];
    for (const t in a) {
      const r = a[t];
      e.push(t, r.code, r.dynamic ? "d" : "s");
    }
    return e.join("_");
  }
  var Zt = `varying vec2 vUV;
varying vec4 vColor;

uniform sampler2D uTexture;

void main(void){
    vec4 color = texture2D(uTexture, vUV) * vColor;
    gl_FragColor = color;
}`, er = `attribute vec2 aVertex;
attribute vec2 aUV;
attribute vec4 aColor;

attribute vec2 aPosition;
attribute float aRotation;

uniform mat3 uTranslationMatrix;
uniform float uRound;
uniform vec2 uResolution;
uniform vec4 uColor;

varying vec2 vUV;
varying vec4 vColor;

vec2 roundPixels(vec2 position, vec2 targetSize)
{       
    return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
}

void main(void){
    float cosRotation = cos(aRotation);
    float sinRotation = sin(aRotation);
    float x = aVertex.x * cosRotation - aVertex.y * sinRotation;
    float y = aVertex.x * sinRotation + aVertex.y * cosRotation;

    vec2 v = vec2(x, y);
    v = v + aPosition;

    gl_Position = vec4((uTranslationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);

    if(uRound == 1.0)
    {
        gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
    }

    vUV = aUV;
    vColor = vec4(aColor.rgb * aColor.a, aColor.a) * uColor;
}
`, Be = `
struct ParticleUniforms {
  uProjectionMatrix:mat3x3<f32>,
  uColor:vec4<f32>,
  uResolution:vec2<f32>,
  uRoundPixels:f32,
};

@group(0) @binding(0) var<uniform> uniforms: ParticleUniforms;

@group(1) @binding(0) var uTexture: texture_2d<f32>;
@group(1) @binding(1) var uSampler : sampler;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
    @location(1) color : vec4<f32>,
  };
@vertex
fn mainVertex(
  @location(0) aVertex: vec2<f32>,
  @location(1) aPosition: vec2<f32>,
  @location(2) aUV: vec2<f32>,
  @location(3) aColor: vec4<f32>,
  @location(4) aRotation: f32,
) -> VSOutput {
  
   let v = vec2(
       aVertex.x * cos(aRotation) - aVertex.y * sin(aRotation),
       aVertex.x * sin(aRotation) + aVertex.y * cos(aRotation)
   ) + aPosition;

   let position = vec4((uniforms.uProjectionMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);

    let vColor = vec4(aColor.rgb * aColor.a, aColor.a) * uniforms.uColor;

  return VSOutput(
   position,
   aUV,
   vColor,
  );
}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @location(1) color: vec4<f32>,
  @builtin(position) position: vec4<f32>,
) -> @location(0) vec4<f32> {

    var sample = textureSample(uTexture, uSampler, uv) * color;
   
    return sample;
}`;
  class tr extends le {
    constructor() {
      const e = vt.from({
        vertex: er,
        fragment: Zt
      }), t = wt.from({
        fragment: {
          source: Be,
          entryPoint: "mainFragment"
        },
        vertex: {
          source: Be,
          entryPoint: "mainVertex"
        }
      });
      super({
        glProgram: e,
        gpuProgram: t,
        resources: {
          uTexture: P.WHITE.source,
          uSampler: new St({}),
          uniforms: {
            uTranslationMatrix: {
              value: new M(),
              type: "mat3x3<f32>"
            },
            uColor: {
              value: new R(16777215),
              type: "vec4<f32>"
            },
            uRound: {
              value: 1,
              type: "f32"
            },
            uResolution: {
              value: [
                0,
                0
              ],
              type: "vec2<f32>"
            }
          }
        }
      });
    }
  }
  class rt {
    constructor(e, t) {
      this.state = K.for2d(), this._gpuBufferHash = /* @__PURE__ */ Object.create(null), this._destroyRenderableBound = this.destroyRenderable.bind(this), this.localUniforms = new E({
        uTranslationMatrix: {
          value: new M(),
          type: "mat3x3<f32>"
        },
        uColor: {
          value: new Float32Array(4),
          type: "vec4<f32>"
        },
        uRound: {
          value: 1,
          type: "f32"
        },
        uResolution: {
          value: [
            0,
            0
          ],
          type: "vec2<f32>"
        }
      }), this.renderer = e, this.adaptor = t, this.defaultShader = new tr(), this.state = K.for2d();
    }
    validateRenderable(e) {
      return false;
    }
    addRenderable(e, t) {
      this.renderer.renderPipes.batch.break(t), t.add(e);
    }
    getBuffers(e) {
      return this._gpuBufferHash[e.uid] || this._initBuffer(e);
    }
    _initBuffer(e) {
      return this._gpuBufferHash[e.uid] = new Qt({
        size: e.particleChildren.length,
        properties: e._properties
      }), e.on("destroyed", this._destroyRenderableBound), this._gpuBufferHash[e.uid];
    }
    updateRenderable(e) {
    }
    destroyRenderable(e) {
      this._gpuBufferHash[e.uid].destroy(), this._gpuBufferHash[e.uid] = null, e.off("destroyed", this._destroyRenderableBound);
    }
    execute(e) {
      const t = e.particleChildren;
      if (t.length === 0) return;
      const r = this.renderer, i = this.getBuffers(e);
      e.texture || (e.texture = t[0].texture);
      const s = this.state;
      i.update(t, e._childrenDirty), e._childrenDirty = false, s.blendMode = de(e.blendMode, e.texture._source);
      const n = this.localUniforms.uniforms, o = n.uTranslationMatrix;
      e.worldTransform.copyTo(o), o.prepend(r.globalUniforms.globalUniformData.projectionMatrix), n.uResolution = r.globalUniforms.globalUniformData.resolution, n.uRound = r._roundPixels | e._roundPixels, q(e.groupColorAlpha, n.uColor, 0), this.adaptor.execute(this, e);
    }
    destroy() {
      this.defaultShader && (this.defaultShader.destroy(), this.defaultShader = null);
    }
  }
  class it extends rt {
    constructor(e) {
      super(e, new Kt());
    }
  }
  it.extension = {
    type: [
      _.WebGLPipes
    ],
    name: "particle"
  };
  class st extends rt {
    constructor(e) {
      super(e, new Nt());
    }
  }
  st.extension = {
    type: [
      _.WebGPUPipes
    ],
    name: "particle"
  };
  const nt = class at extends jt {
    constructor(e = {}) {
      e = {
        ...at.defaultOptions,
        ...e
      }, super({
        width: e.width,
        height: e.height,
        verticesX: 4,
        verticesY: 4
      }), this.update(e);
    }
    update(e) {
      var _a, _b;
      this.width = e.width ?? this.width, this.height = e.height ?? this.height, this._originalWidth = e.originalWidth ?? this._originalWidth, this._originalHeight = e.originalHeight ?? this._originalHeight, this._leftWidth = e.leftWidth ?? this._leftWidth, this._rightWidth = e.rightWidth ?? this._rightWidth, this._topHeight = e.topHeight ?? this._topHeight, this._bottomHeight = e.bottomHeight ?? this._bottomHeight, this._anchorX = (_a = e.anchor) == null ? void 0 : _a.x, this._anchorY = (_b = e.anchor) == null ? void 0 : _b.y, this.updateUvs(), this.updatePositions();
    }
    updatePositions() {
      const e = this.positions, { width: t, height: r, _leftWidth: i, _rightWidth: s, _topHeight: n, _bottomHeight: o, _anchorX: d, _anchorY: c } = this, h = i + s, l = t > h ? 1 : t / h, f = n + o, p = r > f ? 1 : r / f, u = Math.min(l, p), g = d * t, m = c * r;
      e[0] = e[8] = e[16] = e[24] = -g, e[2] = e[10] = e[18] = e[26] = i * u - g, e[4] = e[12] = e[20] = e[28] = t - s * u - g, e[6] = e[14] = e[22] = e[30] = t - g, e[1] = e[3] = e[5] = e[7] = -m, e[9] = e[11] = e[13] = e[15] = n * u - m, e[17] = e[19] = e[21] = e[23] = r - o * u - m, e[25] = e[27] = e[29] = e[31] = r - m, this.getBuffer("aPosition").update();
    }
    updateUvs() {
      const e = this.uvs;
      e[0] = e[8] = e[16] = e[24] = 0, e[1] = e[3] = e[5] = e[7] = 0, e[6] = e[14] = e[22] = e[30] = 1, e[25] = e[27] = e[29] = e[31] = 1;
      const t = 1 / this._originalWidth, r = 1 / this._originalHeight;
      e[2] = e[10] = e[18] = e[26] = t * this._leftWidth, e[9] = e[11] = e[13] = e[15] = r * this._topHeight, e[4] = e[12] = e[20] = e[28] = 1 - t * this._rightWidth, e[17] = e[19] = e[21] = e[23] = 1 - r * this._bottomHeight, this.getBuffer("aUV").update();
    }
  };
  nt.defaultOptions = {
    width: 100,
    height: 100,
    leftWidth: 10,
    topHeight: 10,
    rightWidth: 10,
    bottomHeight: 10,
    originalWidth: 100,
    originalHeight: 100
  };
  let rr = nt;
  class ot {
    constructor(e) {
      this._gpuSpriteHash = /* @__PURE__ */ Object.create(null), this._destroyRenderableBound = this.destroyRenderable.bind(this), this._renderer = e, this._renderer.renderableGC.addManagedHash(this, "_gpuSpriteHash");
    }
    addRenderable(e, t) {
      const r = this._getGpuSprite(e);
      e.didViewUpdate && this._updateBatchableSprite(e, r), this._renderer.renderPipes.batch.addToBatch(r, t);
    }
    updateRenderable(e) {
      const t = this._gpuSpriteHash[e.uid];
      e.didViewUpdate && this._updateBatchableSprite(e, t), t._batcher.updateElement(t);
    }
    validateRenderable(e) {
      const t = this._getGpuSprite(e);
      return !t._batcher.checkAndUpdateTexture(t, e._texture);
    }
    destroyRenderable(e) {
      const t = this._gpuSpriteHash[e.uid];
      T.return(t.geometry), T.return(t), this._gpuSpriteHash[e.uid] = null, e.off("destroyed", this._destroyRenderableBound);
    }
    _updateBatchableSprite(e, t) {
      t.geometry.update(e), t.setTexture(e._texture);
    }
    _getGpuSprite(e) {
      return this._gpuSpriteHash[e.uid] || this._initGPUSprite(e);
    }
    _initGPUSprite(e) {
      const t = T.get(ue);
      return t.geometry = T.get(rr), t.renderable = e, t.transform = e.groupTransform, t.texture = e._texture, t.roundPixels = this._renderer._roundPixels | e._roundPixels, this._gpuSpriteHash[e.uid] = t, e.didViewUpdate || this._updateBatchableSprite(e, t), e.on("destroyed", this._destroyRenderableBound), t;
    }
    destroy() {
      for (const e in this._gpuSpriteHash) this._gpuSpriteHash[e].geometry.destroy();
      this._gpuSpriteHash = null, this._renderer = null;
    }
  }
  ot.extension = {
    type: [
      _.WebGLPipes,
      _.WebGPUPipes,
      _.CanvasPipes
    ],
    name: "nineSliceSprite"
  };
  const ir = {
    name: "tiling-bit",
    vertex: {
      header: `
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `,
      main: `
            uv = (tilingUniforms.uTextureTransform * vec3(uv, 1.0)).xy;

            position = (position - tilingUniforms.uSizeAnchor.zw) * tilingUniforms.uSizeAnchor.xy;
        `
    },
    fragment: {
      header: `
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `,
      main: `

            var coord = vUV + ceil(tilingUniforms.uClampOffset - vUV);
            coord = (tilingUniforms.uMapCoord * vec3(coord, 1.0)).xy;
            var unclamped = coord;
            coord = clamp(coord, tilingUniforms.uClampFrame.xy, tilingUniforms.uClampFrame.zw);

            var bias = 0.;

            if(unclamped.x == coord.x && unclamped.y == coord.y)
            {
                bias = -32.;
            } 

            outColor = textureSampleBias(uTexture, uSampler, coord, bias);
        `
    }
  }, sr = {
    name: "tiling-bit",
    vertex: {
      header: `
            uniform mat3 uTextureTransform;
            uniform vec4 uSizeAnchor;
        
        `,
      main: `
            uv = (uTextureTransform * vec3(aUV, 1.0)).xy;

            position = (position - uSizeAnchor.zw) * uSizeAnchor.xy;
        `
    },
    fragment: {
      header: `
            uniform sampler2D uTexture;
            uniform mat3 uMapCoord;
            uniform vec4 uClampFrame;
            uniform vec2 uClampOffset;
        `,
      main: `

        vec2 coord = vUV + ceil(uClampOffset - vUV);
        coord = (uMapCoord * vec3(coord, 1.0)).xy;
        vec2 unclamped = coord;
        coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);
        
        outColor = texture(uTexture, coord, unclamped == coord ? 0.0 : -32.0);// lod-bias very negative to force lod 0
    
        `
    }
  };
  let J, Z;
  class nr extends le {
    constructor() {
      J ?? (J = Ae({
        name: "tiling-sprite-shader",
        bits: [
          Gt,
          ir,
          Ge
        ]
      })), Z ?? (Z = ze({
        name: "tiling-sprite-shader",
        bits: [
          zt,
          sr,
          He
        ]
      }));
      const e = new E({
        uMapCoord: {
          value: new M(),
          type: "mat3x3<f32>"
        },
        uClampFrame: {
          value: new Float32Array([
            0,
            0,
            1,
            1
          ]),
          type: "vec4<f32>"
        },
        uClampOffset: {
          value: new Float32Array([
            0,
            0
          ]),
          type: "vec2<f32>"
        },
        uTextureTransform: {
          value: new M(),
          type: "mat3x3<f32>"
        },
        uSizeAnchor: {
          value: new Float32Array([
            100,
            100,
            0.5,
            0.5
          ]),
          type: "vec4<f32>"
        }
      });
      super({
        glProgram: Z,
        gpuProgram: J,
        resources: {
          localUniforms: new E({
            uTransformMatrix: {
              value: new M(),
              type: "mat3x3<f32>"
            },
            uColor: {
              value: new Float32Array([
                1,
                1,
                1,
                1
              ]),
              type: "vec4<f32>"
            },
            uRound: {
              value: 0,
              type: "f32"
            }
          }),
          tilingUniforms: e,
          uTexture: P.EMPTY.source,
          uSampler: P.EMPTY.source.style
        }
      });
    }
    updateUniforms(e, t, r, i, s, n) {
      const o = this.resources.tilingUniforms, d = n.width, c = n.height, h = n.textureMatrix, l = o.uniforms.uTextureTransform;
      l.set(r.a * d / e, r.b * d / t, r.c * c / e, r.d * c / t, r.tx / e, r.ty / t), l.invert(), o.uniforms.uMapCoord = h.mapCoord, o.uniforms.uClampFrame = h.uClampFrame, o.uniforms.uClampOffset = h.uClampOffset, o.uniforms.uTextureTransform = l, o.uniforms.uSizeAnchor[0] = e, o.uniforms.uSizeAnchor[1] = t, o.uniforms.uSizeAnchor[2] = i, o.uniforms.uSizeAnchor[3] = s, n && (this.resources.uTexture = n.source, this.resources.uSampler = n.source.style);
    }
  }
  class ar extends ce {
    constructor() {
      super({
        positions: new Float32Array([
          0,
          0,
          1,
          0,
          1,
          1,
          0,
          1
        ]),
        uvs: new Float32Array([
          0,
          0,
          1,
          0,
          1,
          1,
          0,
          1
        ]),
        indices: new Uint32Array([
          0,
          1,
          2,
          0,
          2,
          3
        ])
      });
    }
  }
  function or(a, e) {
    const t = a.anchor.x, r = a.anchor.y;
    e[0] = -t * a.width, e[1] = -r * a.height, e[2] = (1 - t) * a.width, e[3] = -r * a.height, e[4] = (1 - t) * a.width, e[5] = (1 - r) * a.height, e[6] = -t * a.width, e[7] = (1 - r) * a.height;
  }
  function dr(a, e, t, r) {
    let i = 0;
    const s = a.length / e, n = r.a, o = r.b, d = r.c, c = r.d, h = r.tx, l = r.ty;
    for (t *= e; i < s; ) {
      const f = a[t], p = a[t + 1];
      a[t] = n * f + d * p + h, a[t + 1] = o * f + c * p + l, t += e, i++;
    }
  }
  function lr(a, e) {
    const t = a.texture, r = t.frame.width, i = t.frame.height;
    let s = 0, n = 0;
    a.applyAnchorToTexture && (s = a.anchor.x, n = a.anchor.y), e[0] = e[6] = -s, e[2] = e[4] = 1 - s, e[1] = e[3] = -n, e[5] = e[7] = 1 - n;
    const o = M.shared;
    o.copyFrom(a._tileTransform.matrix), o.tx /= a.width, o.ty /= a.height, o.invert(), o.scale(a.width / r, a.height / i), dr(e, 2, 0, o);
  }
  const X = new ar();
  class dt {
    constructor(e) {
      this._state = K.default2d, this._tilingSpriteDataHash = /* @__PURE__ */ Object.create(null), this._destroyRenderableBound = this.destroyRenderable.bind(this), this._renderer = e, this._renderer.renderableGC.addManagedHash(this, "_tilingSpriteDataHash");
    }
    validateRenderable(e) {
      const t = this._getTilingSpriteData(e), r = t.canBatch;
      this._updateCanBatch(e);
      const i = t.canBatch;
      if (i && i === r) {
        const { batchableMesh: s } = t;
        return !s._batcher.checkAndUpdateTexture(s, e.texture);
      }
      return r !== i;
    }
    addRenderable(e, t) {
      const r = this._renderer.renderPipes.batch;
      this._updateCanBatch(e);
      const i = this._getTilingSpriteData(e), { geometry: s, canBatch: n } = i;
      if (n) {
        i.batchableMesh || (i.batchableMesh = new ue());
        const o = i.batchableMesh;
        e.didViewUpdate && (this._updateBatchableMesh(e), o.geometry = s, o.renderable = e, o.transform = e.groupTransform, o.setTexture(e._texture)), o.roundPixels = this._renderer._roundPixels | e._roundPixels, r.addToBatch(o, t);
      } else r.break(t), i.shader || (i.shader = new nr()), this.updateRenderable(e), t.add(e);
    }
    execute(e) {
      const { shader: t } = this._tilingSpriteDataHash[e.uid];
      t.groups[0] = this._renderer.globalUniforms.bindGroup;
      const r = t.resources.localUniforms.uniforms;
      r.uTransformMatrix = e.groupTransform, r.uRound = this._renderer._roundPixels | e._roundPixels, q(e.groupColorAlpha, r.uColor, 0), this._state.blendMode = de(e.groupBlendMode, e.texture._source), this._renderer.encoder.draw({
        geometry: X,
        shader: t,
        state: this._state
      });
    }
    updateRenderable(e) {
      const t = this._getTilingSpriteData(e), { canBatch: r } = t;
      if (r) {
        const { batchableMesh: i } = t;
        e.didViewUpdate && this._updateBatchableMesh(e), i._batcher.updateElement(i);
      } else if (e.didViewUpdate) {
        const { shader: i } = t;
        i.updateUniforms(e.width, e.height, e._tileTransform.matrix, e.anchor.x, e.anchor.y, e.texture);
      }
    }
    destroyRenderable(e) {
      var _a;
      const t = this._getTilingSpriteData(e);
      t.batchableMesh = null, (_a = t.shader) == null ? void 0 : _a.destroy(), this._tilingSpriteDataHash[e.uid] = null, e.off("destroyed", this._destroyRenderableBound);
    }
    _getTilingSpriteData(e) {
      return this._tilingSpriteDataHash[e.uid] || this._initTilingSpriteData(e);
    }
    _initTilingSpriteData(e) {
      const t = new ce({
        indices: X.indices,
        positions: X.positions.slice(),
        uvs: X.uvs.slice()
      });
      return this._tilingSpriteDataHash[e.uid] = {
        canBatch: true,
        renderable: e,
        geometry: t
      }, e.on("destroyed", this._destroyRenderableBound), this._tilingSpriteDataHash[e.uid];
    }
    _updateBatchableMesh(e) {
      const t = this._getTilingSpriteData(e), { geometry: r } = t, i = e.texture.source.style;
      i.addressMode !== "repeat" && (i.addressMode = "repeat", i.update()), lr(e, r.uvs), or(e, r.positions);
    }
    destroy() {
      for (const e in this._tilingSpriteDataHash) this.destroyRenderable(this._tilingSpriteDataHash[e].renderable);
      this._tilingSpriteDataHash = null, this._renderer = null;
    }
    _updateCanBatch(e) {
      const t = this._getTilingSpriteData(e), r = e.texture;
      let i = true;
      return this._renderer.type === oe.WEBGL && (i = this._renderer.context.supports.nonPowOf2wrapping), t.canBatch = r.textureMatrix.isSimple && (i || r.source.isPowerOfTwo), t.canBatch;
    }
  }
  dt.extension = {
    type: [
      _.WebGLPipes,
      _.WebGPUPipes,
      _.CanvasPipes
    ],
    name: "tilingSprite"
  };
  const cr = {
    name: "local-uniform-msdf-bit",
    vertex: {
      header: `
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32,
                uRound:f32,
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `,
      main: `
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `,
      end: `
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `
    },
    fragment: {
      header: `
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
         `,
      main: ` 
            outColor = vec4<f32>(calculateMSDFAlpha(outColor, localUniforms.uColor, localUniforms.uDistance));
        `
    }
  }, hr = {
    name: "local-uniform-msdf-bit",
    vertex: {
      header: `
            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `,
      main: `
            vColor *= uColor;
            modelMatrix *= uTransformMatrix;
        `,
      end: `
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `
    },
    fragment: {
      header: `
            uniform float uDistance;
         `,
      main: ` 
            outColor = vec4(calculateMSDFAlpha(outColor, vColor, uDistance));
        `
    }
  }, ur = {
    name: "msdf-bit",
    fragment: {
      header: `
            fn calculateMSDFAlpha(msdfColor:vec4<f32>, shapeColor:vec4<f32>, distance:f32) -> f32 {
                
                // MSDF
                var median = msdfColor.r + msdfColor.g + msdfColor.b -
                    min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                    max(msdfColor.r, max(msdfColor.g, msdfColor.b));
            
                // SDF
                median = min(median, msdfColor.a);

                var screenPxDistance = distance * (median - 0.5);
                var alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                // Gamma correction for coverage-like alpha
                var luma: f32 = dot(shapeColor.rgb, vec3<f32>(0.299, 0.587, 0.114));
                var gamma: f32 = mix(1.0, 1.0 / 2.2, luma);
                var coverage: f32 = pow(shapeColor.a * alpha, gamma);

                return coverage;
             
            }
        `
    }
  }, fr = {
    name: "msdf-bit",
    fragment: {
      header: `
            float calculateMSDFAlpha(vec4 msdfColor, vec4 shapeColor, float distance) {
                
                // MSDF
                float median = msdfColor.r + msdfColor.g + msdfColor.b -
                                min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                                max(msdfColor.r, max(msdfColor.g, msdfColor.b));
               
                // SDF
                median = min(median, msdfColor.a);
            
                float screenPxDistance = distance * (median - 0.5);
                float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
           
                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                // Gamma correction for coverage-like alpha
                float luma = dot(shapeColor.rgb, vec3(0.299, 0.587, 0.114));
                float gamma = mix(1.0, 1.0 / 2.2, luma);
                float coverage = pow(shapeColor.a * alpha, gamma);  
              
                return coverage;
            }
        `
    }
  };
  let ee, te;
  class pr extends le {
    constructor() {
      const e = new E({
        uColor: {
          value: new Float32Array([
            1,
            1,
            1,
            1
          ]),
          type: "vec4<f32>"
        },
        uTransformMatrix: {
          value: new M(),
          type: "mat3x3<f32>"
        },
        uDistance: {
          value: 4,
          type: "f32"
        },
        uRound: {
          value: 0,
          type: "f32"
        }
      }), t = Ct();
      ee ?? (ee = Ae({
        name: "sdf-shader",
        bits: [
          Bt,
          Pt(t),
          cr,
          ur,
          Ge
        ]
      })), te ?? (te = ze({
        name: "sdf-shader",
        bits: [
          Rt,
          Mt(t),
          hr,
          fr,
          He
        ]
      })), super({
        glProgram: te,
        gpuProgram: ee,
        resources: {
          localUniforms: e,
          batchSamplers: Ft(t)
        }
      });
    }
  }
  class lt {
    constructor(e) {
      this._gpuBitmapText = {}, this._destroyRenderableBound = this.destroyRenderable.bind(this), this._renderer = e, this._renderer.renderableGC.addManagedHash(this, "_gpuBitmapText");
    }
    validateRenderable(e) {
      const t = this._getGpuBitmapText(e);
      return e._didTextUpdate && (e._didTextUpdate = false, this._updateContext(e, t)), this._renderer.renderPipes.graphics.validateRenderable(t);
    }
    addRenderable(e, t) {
      const r = this._getGpuBitmapText(e);
      Pe(e, r), e._didTextUpdate && (e._didTextUpdate = false, this._updateContext(e, r)), this._renderer.renderPipes.graphics.addRenderable(r, t), r.context.customShader && this._updateDistanceField(e);
    }
    destroyRenderable(e) {
      e.off("destroyed", this._destroyRenderableBound), this._destroyRenderableByUid(e.uid);
    }
    _destroyRenderableByUid(e) {
      const t = this._gpuBitmapText[e].context;
      t.customShader && (T.return(t.customShader), t.customShader = null), T.return(this._gpuBitmapText[e]), this._gpuBitmapText[e] = null;
    }
    updateRenderable(e) {
      const t = this._getGpuBitmapText(e);
      Pe(e, t), this._renderer.renderPipes.graphics.updateRenderable(t), t.context.customShader && this._updateDistanceField(e);
    }
    _updateContext(e, t) {
      const { context: r } = t, i = Et.getFont(e.text, e._style);
      r.clear(), i.distanceField.type !== "none" && (r.customShader || (r.customShader = T.get(pr)));
      const s = Array.from(e.text), n = e._style;
      let o = i.baseLineOffset;
      const d = $e(s, n, i, true);
      let c = 0;
      const h = n.padding, l = d.scale;
      let f = d.width, p = d.height + d.offsetY;
      n._stroke && (f += n._stroke.width / l, p += n._stroke.width / l), r.translate(-e._anchor._x * f - h, -e._anchor._y * p - h).scale(l, l);
      const u = i.applyFillAsTint ? n._fill.color : 16777215;
      for (let g = 0; g < d.lines.length; g++) {
        const m = d.lines[g];
        for (let x = 0; x < m.charPositions.length; x++) {
          const b = s[c++], v = i.chars[b];
          (v == null ? void 0 : v.texture) && r.texture(v.texture, u || "black", Math.round(m.charPositions[x] + v.xOffset), Math.round(o + v.yOffset));
        }
        o += i.lineHeight;
      }
    }
    _getGpuBitmapText(e) {
      return this._gpuBitmapText[e.uid] || this.initGpuText(e);
    }
    initGpuText(e) {
      const t = T.get(Ut);
      return this._gpuBitmapText[e.uid] = t, this._updateContext(e, t), e.on("destroyed", this._destroyRenderableBound), this._gpuBitmapText[e.uid];
    }
    _updateDistanceField(e) {
      const t = this._getGpuBitmapText(e).context, r = e._style.fontFamily, i = U.get(`${r}-bitmap`), { a: s, b: n, c: o, d } = e.groupTransform, c = Math.sqrt(s * s + n * n), h = Math.sqrt(o * o + d * d), l = (Math.abs(c) + Math.abs(h)) / 2, f = i.baseRenderedFontSize / e._style.fontSize, p = l * i.distanceField.range * (1 / f);
      t.customShader.resources.localUniforms.uniforms.uDistance = p;
    }
    destroy() {
      for (const e in this._gpuBitmapText) this._destroyRenderableByUid(e);
      this._gpuBitmapText = null, this._renderer = null;
    }
  }
  lt.extension = {
    type: [
      _.WebGLPipes,
      _.WebGPUPipes,
      _.CanvasPipes
    ],
    name: "bitmapText"
  };
  function Pe(a, e) {
    e.groupTransform = a.groupTransform, e.groupColorAlpha = a.groupColorAlpha, e.groupColor = a.groupColor, e.groupBlendMode = a.groupBlendMode, e.globalDisplayStatus = a.globalDisplayStatus, e.groupTransform = a.groupTransform, e.localDisplayStatus = a.localDisplayStatus, e.groupAlpha = a.groupAlpha, e._roundPixels = a._roundPixels;
  }
  function ne(a, e) {
    const { texture: t, bounds: r } = a;
    kt(r, e._anchor, t);
    const i = e._style.padding;
    r.minX -= i, r.minY -= i, r.maxX -= i, r.maxY -= i;
  }
  class ct {
    constructor(e) {
      this._gpuText = /* @__PURE__ */ Object.create(null), this._destroyRenderableBound = this.destroyRenderable.bind(this), this._renderer = e, this._renderer.runners.resolutionChange.add(this), this._renderer.renderableGC.addManagedHash(this, "_gpuText");
    }
    resolutionChange() {
      for (const e in this._gpuText) {
        const t = this._gpuText[e];
        if (!t) continue;
        const r = t.batchableSprite.renderable;
        r._autoResolution && (r._resolution = this._renderer.resolution, r.onViewUpdate());
      }
    }
    validateRenderable(e) {
      const t = this._getGpuText(e), r = e._getKey();
      return t.textureNeedsUploading ? (t.textureNeedsUploading = false, true) : t.currentKey !== r;
    }
    addRenderable(e, t) {
      const i = this._getGpuText(e).batchableSprite;
      e._didTextUpdate && this._updateText(e), this._renderer.renderPipes.batch.addToBatch(i, t);
    }
    updateRenderable(e) {
      const r = this._getGpuText(e).batchableSprite;
      e._didTextUpdate && this._updateText(e), r._batcher.updateElement(r);
    }
    destroyRenderable(e) {
      e.off("destroyed", this._destroyRenderableBound), this._destroyRenderableById(e.uid);
    }
    _destroyRenderableById(e) {
      const t = this._gpuText[e];
      this._renderer.htmlText.decreaseReferenceCount(t.currentKey), T.return(t.batchableSprite), this._gpuText[e] = null;
    }
    _updateText(e) {
      const t = e._getKey(), r = this._getGpuText(e), i = r.batchableSprite;
      r.currentKey !== t && this._updateGpuText(e).catch((s) => {
        console.error(s);
      }), e._didTextUpdate = false, ne(i, e);
    }
    async _updateGpuText(e) {
      e._didTextUpdate = false;
      const t = this._getGpuText(e);
      if (t.generatingTexture) return;
      const r = e._getKey();
      this._renderer.htmlText.decreaseReferenceCount(t.currentKey), t.generatingTexture = true, t.currentKey = r;
      const i = e.resolution ?? this._renderer.resolution, s = await this._renderer.htmlText.getManagedTexture(e.text, i, e._style, e._getKey()), n = t.batchableSprite;
      n.texture = t.texture = s, t.generatingTexture = false, t.textureNeedsUploading = true, e.onViewUpdate(), ne(n, e);
    }
    _getGpuText(e) {
      return this._gpuText[e.uid] || this.initGpuText(e);
    }
    initGpuText(e) {
      const t = {
        texture: P.EMPTY,
        currentKey: "--",
        batchableSprite: T.get(De),
        textureNeedsUploading: false,
        generatingTexture: false
      }, r = t.batchableSprite;
      return r.renderable = e, r.transform = e.groupTransform, r.texture = P.EMPTY, r.bounds = {
        minX: 0,
        maxX: 1,
        minY: 0,
        maxY: 0
      }, r.roundPixels = this._renderer._roundPixels | e._roundPixels, e._resolution = e._autoResolution ? this._renderer.resolution : e.resolution, this._gpuText[e.uid] = t, e.on("destroyed", this._destroyRenderableBound), t;
    }
    destroy() {
      for (const e in this._gpuText) this._destroyRenderableById(e);
      this._gpuText = null, this._renderer = null;
    }
  }
  ct.extension = {
    type: [
      _.WebGLPipes,
      _.WebGPUPipes,
      _.CanvasPipes
    ],
    name: "htmlText"
  };
  function gr() {
    const { userAgent: a } = We.get().getNavigator();
    return /^((?!chrome|android).)*safari/i.test(a);
  }
  const mr = new ke();
  function ht(a, e, t, r) {
    const i = mr;
    i.minX = 0, i.minY = 0, i.maxX = a.width / r | 0, i.maxY = a.height / r | 0;
    const s = k.getOptimalTexture(i.width, i.height, r, false);
    return s.source.uploadMethodId = "image", s.source.resource = a, s.source.alphaMode = "premultiply-alpha-on-upload", s.frame.width = e / r, s.frame.height = t / r, s.source.emit("update", s.source), s.updateUvs(), s;
  }
  function xr(a, e) {
    const t = e.fontFamily, r = [], i = {}, s = /font-family:([^;"\s]+)/g, n = a.match(s);
    function o(d) {
      i[d] || (r.push(d), i[d] = true);
    }
    if (Array.isArray(t)) for (let d = 0; d < t.length; d++) o(t[d]);
    else o(t);
    n && n.forEach((d) => {
      const c = d.split(":")[1].trim();
      o(c);
    });
    for (const d in e.tagStyles) {
      const c = e.tagStyles[d].fontFamily;
      o(c);
    }
    return r;
  }
  async function _r(a) {
    const t = await (await We.get().fetch(a)).blob(), r = new FileReader();
    return await new Promise((s, n) => {
      r.onloadend = () => s(r.result), r.onerror = n, r.readAsDataURL(t);
    });
  }
  async function Re(a, e) {
    const t = await _r(e);
    return `@font-face {
        font-family: "${a.fontFamily}";
        src: url('${t}');
        font-weight: ${a.fontWeight};
        font-style: ${a.fontStyle};
    }`;
  }
  const j = /* @__PURE__ */ new Map();
  async function br(a, e, t) {
    const r = a.filter((i) => U.has(`${i}-and-url`)).map((i, s) => {
      if (!j.has(i)) {
        const { url: n } = U.get(`${i}-and-url`);
        s === 0 ? j.set(i, Re({
          fontWeight: e.fontWeight,
          fontStyle: e.fontStyle,
          fontFamily: i
        }, n)) : j.set(i, Re({
          fontWeight: t.fontWeight,
          fontStyle: t.fontStyle,
          fontFamily: i
        }, n));
      }
      return j.get(i);
    });
    return (await Promise.all(r)).join(`
`);
  }
  function yr(a, e, t, r, i) {
    const { domElement: s, styleElement: n, svgRoot: o } = i;
    s.innerHTML = `<style>${e.cssStyle}</style><div style='padding:0;'>${a}</div>`, s.setAttribute("style", `transform: scale(${t});transform-origin: top left; display: inline-block`), n.textContent = r;
    const { width: d, height: c } = i.image;
    return o.setAttribute("width", d.toString()), o.setAttribute("height", c.toString()), new XMLSerializer().serializeToString(o);
  }
  function Tr(a, e) {
    const t = D.getOptimalCanvasAndContext(a.width, a.height, e), { context: r } = t;
    return r.clearRect(0, 0, a.width, a.height), r.drawImage(a, 0, 0), t;
  }
  function vr(a, e, t) {
    return new Promise(async (r) => {
      t && await new Promise((i) => setTimeout(i, 100)), a.onload = () => {
        r();
      }, a.src = `data:image/svg+xml;charset=utf8,${encodeURIComponent(e)}`, a.crossOrigin = "anonymous";
    });
  }
  class fe {
    constructor(e) {
      this._activeTextures = {}, this._renderer = e, this._createCanvas = e.type === oe.WEBGPU;
    }
    getTexture(e) {
      return this._buildTexturePromise(e.text, e.resolution, e.style);
    }
    getManagedTexture(e, t, r, i) {
      if (this._activeTextures[i]) return this._increaseReferenceCount(i), this._activeTextures[i].promise;
      const s = this._buildTexturePromise(e, t, r).then((n) => (this._activeTextures[i].texture = n, n));
      return this._activeTextures[i] = {
        texture: null,
        promise: s,
        usageCount: 1
      }, s;
    }
    async _buildTexturePromise(e, t, r) {
      const i = T.get(Qe), s = xr(e, r), n = await br(s, r, he.defaultTextStyle), o = Xt(e, r, n, i), d = Math.ceil(Math.ceil(Math.max(1, o.width) + r.padding * 2) * t), c = Math.ceil(Math.ceil(Math.max(1, o.height) + r.padding * 2) * t), h = i.image, l = 2;
      h.width = (d | 0) + l, h.height = (c | 0) + l;
      const f = yr(e, r, t, n, i);
      await vr(h, f, gr() && s.length > 0);
      const p = h;
      let u;
      this._createCanvas && (u = Tr(h, t));
      const g = ht(u ? u.canvas : p, h.width - l, h.height - l, t);
      return this._createCanvas && (this._renderer.texture.initSource(g.source), D.returnCanvasAndContext(u)), T.return(i), g;
    }
    _increaseReferenceCount(e) {
      this._activeTextures[e].usageCount++;
    }
    decreaseReferenceCount(e) {
      const t = this._activeTextures[e];
      t && (t.usageCount--, t.usageCount === 0 && (t.texture ? this._cleanUp(t) : t.promise.then((r) => {
        t.texture = r, this._cleanUp(t);
      }).catch(() => {
        O("HTMLTextSystem: Failed to clean texture");
      }), this._activeTextures[e] = null));
    }
    _cleanUp(e) {
      k.returnTexture(e.texture), e.texture.source.resource = null, e.texture.source.uploadMethodId = "unknown";
    }
    getReferenceCount(e) {
      return this._activeTextures[e].usageCount;
    }
    destroy() {
      this._activeTextures = null;
    }
  }
  fe.extension = {
    type: [
      _.WebGLSystem,
      _.WebGPUSystem,
      _.CanvasSystem
    ],
    name: "htmlText"
  };
  fe.defaultFontOptions = {
    fontFamily: "Arial",
    fontStyle: "normal",
    fontWeight: "normal"
  };
  class ut {
    constructor(e) {
      this._gpuText = /* @__PURE__ */ Object.create(null), this._destroyRenderableBound = this.destroyRenderable.bind(this), this._renderer = e, this._renderer.runners.resolutionChange.add(this), this._renderer.renderableGC.addManagedHash(this, "_gpuText");
    }
    resolutionChange() {
      for (const e in this._gpuText) {
        const t = this._gpuText[e];
        if (!t) continue;
        const r = t.batchableSprite.renderable;
        r._autoResolution && (r._resolution = this._renderer.resolution, r.onViewUpdate());
      }
    }
    validateRenderable(e) {
      const t = this._getGpuText(e), r = e._getKey();
      return t.currentKey !== r;
    }
    addRenderable(e, t) {
      const i = this._getGpuText(e).batchableSprite;
      e._didTextUpdate && this._updateText(e), this._renderer.renderPipes.batch.addToBatch(i, t);
    }
    updateRenderable(e) {
      const r = this._getGpuText(e).batchableSprite;
      e._didTextUpdate && this._updateText(e), r._batcher.updateElement(r);
    }
    destroyRenderable(e) {
      e.off("destroyed", this._destroyRenderableBound), this._destroyRenderableById(e.uid);
    }
    _destroyRenderableById(e) {
      const t = this._gpuText[e];
      this._renderer.canvasText.decreaseReferenceCount(t.currentKey), T.return(t.batchableSprite), this._gpuText[e] = null;
    }
    _updateText(e) {
      const t = e._getKey(), r = this._getGpuText(e), i = r.batchableSprite;
      r.currentKey !== t && this._updateGpuText(e), e._didTextUpdate = false, ne(i, e);
    }
    _updateGpuText(e) {
      const t = this._getGpuText(e), r = t.batchableSprite;
      t.texture && this._renderer.canvasText.decreaseReferenceCount(t.currentKey), t.texture = r.texture = this._renderer.canvasText.getManagedTexture(e), t.currentKey = e._getKey(), r.texture = t.texture;
    }
    _getGpuText(e) {
      return this._gpuText[e.uid] || this.initGpuText(e);
    }
    initGpuText(e) {
      const t = {
        texture: null,
        currentKey: "--",
        batchableSprite: T.get(De)
      };
      return t.batchableSprite.renderable = e, t.batchableSprite.transform = e.groupTransform, t.batchableSprite.bounds = {
        minX: 0,
        maxX: 1,
        minY: 0,
        maxY: 0
      }, t.batchableSprite.roundPixels = this._renderer._roundPixels | e._roundPixels, this._gpuText[e.uid] = t, e._resolution = e._autoResolution ? this._renderer.resolution : e.resolution, this._updateText(e), e.on("destroyed", this._destroyRenderableBound), t;
    }
    destroy() {
      for (const e in this._gpuText) this._destroyRenderableById(e);
      this._gpuText = null, this._renderer = null;
    }
  }
  ut.extension = {
    type: [
      _.WebGLPipes,
      _.WebGPUPipes,
      _.CanvasPipes
    ],
    name: "text"
  };
  function Me(a, e, t) {
    for (let r = 0, i = 4 * t * e; r < e; ++r, i += 4) if (a[i + 3] !== 0) return false;
    return true;
  }
  function Fe(a, e, t, r, i) {
    const s = 4 * e;
    for (let n = r, o = r * s + 4 * t; n <= i; ++n, o += s) if (a[o + 3] !== 0) return false;
    return true;
  }
  function wr(a, e = 1) {
    const { width: t, height: r } = a, i = a.getContext("2d", {
      willReadFrequently: true
    });
    if (i === null) throw new TypeError("Failed to get canvas 2D context");
    const n = i.getImageData(0, 0, t, r).data;
    let o = 0, d = 0, c = t - 1, h = r - 1;
    for (; d < r && Me(n, t, d); ) ++d;
    if (d === r) return ie.EMPTY;
    for (; Me(n, t, h); ) --h;
    for (; Fe(n, t, o, d, h); ) ++o;
    for (; Fe(n, t, c, d, h); ) --c;
    return ++c, ++h, new ie(o / e, d / e, (c - o) / e, (h - d) / e);
  }
  class ft {
    constructor(e) {
      this._activeTextures = {}, this._renderer = e;
    }
    getTextureSize(e, t, r) {
      const i = W.measureText(e || " ", r);
      let s = Math.ceil(Math.ceil(Math.max(1, i.width) + r.padding * 2) * t), n = Math.ceil(Math.ceil(Math.max(1, i.height) + r.padding * 2) * t);
      return s = Math.ceil(s - 1e-6), n = Math.ceil(n - 1e-6), s = me(s), n = me(n), {
        width: s,
        height: n
      };
    }
    getTexture(e, t, r, i) {
      typeof e == "string" && (G("8.0.0", "CanvasTextSystem.getTexture: Use object TextOptions instead of separate arguments"), e = {
        text: e,
        style: r,
        resolution: t
      }), e.style instanceof I || (e.style = new I(e.style));
      const { texture: s, canvasAndContext: n } = this.createTextureAndCanvas(e);
      return this._renderer.texture.initSource(s._source), D.returnCanvasAndContext(n), s;
    }
    createTextureAndCanvas(e) {
      const { text: t, style: r } = e, i = e.resolution ?? this._renderer.resolution, s = W.measureText(t || " ", r), n = Math.ceil(Math.ceil(Math.max(1, s.width) + r.padding * 2) * i), o = Math.ceil(Math.ceil(Math.max(1, s.height) + r.padding * 2) * i), d = D.getOptimalCanvasAndContext(n, o), { canvas: c } = d;
      this.renderTextToCanvas(t, r, i, d);
      const h = ht(c, n, o, i);
      if (r.trim) {
        const l = wr(c, i);
        h.frame.copyFrom(l), h.updateUvs();
      }
      return {
        texture: h,
        canvasAndContext: d
      };
    }
    getManagedTexture(e) {
      e._resolution = e._autoResolution ? this._renderer.resolution : e.resolution;
      const t = e._getKey();
      if (this._activeTextures[t]) return this._increaseReferenceCount(t), this._activeTextures[t].texture;
      const { texture: r, canvasAndContext: i } = this.createTextureAndCanvas(e);
      return this._activeTextures[t] = {
        canvasAndContext: i,
        texture: r,
        usageCount: 1
      }, r;
    }
    _increaseReferenceCount(e) {
      this._activeTextures[e].usageCount++;
    }
    returnTexture(e) {
      const t = e.source;
      t.resource = null, t.uploadMethodId = "unknown", t.alphaMode = "no-premultiply-alpha", k.returnTexture(e);
    }
    decreaseReferenceCount(e) {
      const t = this._activeTextures[e];
      t.usageCount--, t.usageCount === 0 && (D.returnCanvasAndContext(t.canvasAndContext), this.returnTexture(t.texture), this._activeTextures[e] = null);
    }
    getReferenceCount(e) {
      return this._activeTextures[e].usageCount;
    }
    renderTextToCanvas(e, t, r, i) {
      var _a, _b, _c, _d;
      const { canvas: s, context: n } = i, o = re(t), d = W.measureText(e || " ", t), c = d.lines, h = d.lineHeight, l = d.lineWidths, f = d.maxLineWidth, p = d.fontProperties, u = s.height;
      if (n.resetTransform(), n.scale(r, r), n.textBaseline = t.textBaseline, (_a = t._stroke) == null ? void 0 : _a.width) {
        const b = t._stroke;
        n.lineWidth = b.width, n.miterLimit = b.miterLimit, n.lineJoin = b.join, n.lineCap = b.cap;
      }
      n.font = o;
      let g, m;
      const x = t.dropShadow ? 2 : 1;
      for (let b = 0; b < x; ++b) {
        const v = t.dropShadow && b === 0, S = v ? Math.ceil(Math.max(1, u) + t.padding * 2) : 0, C = S * r;
        if (v) {
          n.fillStyle = "black", n.strokeStyle = "black";
          const y = t.dropShadow, H = y.color, V = y.alpha;
          n.shadowColor = R.shared.setValue(H).setAlpha(V).toRgbaString();
          const Q = y.blur * r, pe = y.distance * r;
          n.shadowBlur = Q, n.shadowOffsetX = Math.cos(y.angle) * pe, n.shadowOffsetY = Math.sin(y.angle) * pe + C;
        } else {
          if (n.fillStyle = t._fill ? N(t._fill, n, d) : null, (_b = t._stroke) == null ? void 0 : _b.width) {
            const y = t._stroke.width * t._stroke.alignment;
            n.strokeStyle = N(t._stroke, n, d, y);
          }
          n.shadowColor = "black";
        }
        let F = (h - p.fontSize) / 2;
        h - p.fontSize < 0 && (F = 0);
        const B = ((_c = t._stroke) == null ? void 0 : _c.width) ?? 0;
        for (let y = 0; y < c.length; y++) g = B / 2, m = B / 2 + y * h + p.ascent + F, t.align === "right" ? g += f - l[y] : t.align === "center" && (g += (f - l[y]) / 2), ((_d = t._stroke) == null ? void 0 : _d.width) && this._drawLetterSpacing(c[y], t, i, g + t.padding, m + t.padding - S, true), t._fill !== void 0 && this._drawLetterSpacing(c[y], t, i, g + t.padding, m + t.padding - S);
      }
    }
    _drawLetterSpacing(e, t, r, i, s, n = false) {
      const { context: o } = r, d = t.letterSpacing;
      let c = false;
      if (W.experimentalLetterSpacingSupported && (W.experimentalLetterSpacing ? (o.letterSpacing = `${d}px`, o.textLetterSpacing = `${d}px`, c = true) : (o.letterSpacing = "0px", o.textLetterSpacing = "0px")), d === 0 || c) {
        n ? o.strokeText(e, i, s) : o.fillText(e, i, s);
        return;
      }
      let h = i;
      const l = W.graphemeSegmenter(e);
      let f = o.measureText(e).width, p = 0;
      for (let u = 0; u < l.length; ++u) {
        const g = l[u];
        n ? o.strokeText(g, h, s) : o.fillText(g, h, s);
        let m = "";
        for (let x = u + 1; x < l.length; ++x) m += l[x];
        p = o.measureText(m).width, h += f - p + d, f = p;
      }
    }
    destroy() {
      this._activeTextures = null;
    }
  }
  ft.extension = {
    type: [
      _.WebGLSystem,
      _.WebGPUSystem,
      _.CanvasSystem
    ],
    name: "canvasText"
  };
  w.add(Oe);
  w.add(Ie);
  w.add(Je);
  w.add(At);
  w.add(tt);
  w.add(it);
  w.add(st);
  w.add(ft);
  w.add(ut);
  w.add(lt);
  w.add(fe);
  w.add(ct);
  w.add(dt);
  w.add(ot);
  w.add(Xe);
  w.add(Ye);
});
export {
  __tla
};
