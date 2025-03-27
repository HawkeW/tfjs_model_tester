import { _ as Rn, a as Ct, s as F, A as Qs, b as Ys, c as Zs, d as eu, e as En, I as tu, t as nu, T as Pn, p as rt, g as tn, f as je, h as Wn, i as Se, j as Be, k as Oe, l as Tn, m as au, n as ru, o as su, q as uu, r as ou, u as iu, v as du, w as Bn, x as st, y as cu, z as Ft, B as pu, C as lu, R as mu, D as fu, E as ge, F as On, S as hu, G as gu, H as bu, J as fe, K as _u, L as kn, M as yu, N as Hn, O as Ln, P as Vn, Q as Iu, U as wu, V as $n, W as ku, X as Su, Y as Mu, Z as vu, $ as zn, a0 as Au, a1 as xu, a2 as Ut, a3 as Du, a4 as Nu, a5 as Gn, a6 as Un, a7 as ut, a8 as jn, a9 as qn, aa as nn, ab as Xn, ac as Kn, ad as Cu, ae as Fu, af as Jn, ag as Qn, ah as Yn, ai as Zn, aj as Ru, ak as ea, al as ta, am as Eu, an as na, ao as an, ap as aa, aq as ra, ar as Pu, as as sa, at as Wu, au as Tu, av as Bu, aw as Ou, ax as Hu, ay as Lu, az as Vu, aA as ua, aB as $u, aC as zu, aD as oa, aE as ia, aF as da, aG as ca, aH as Gu, aI as Uu, aJ as ju, aK as qu, aL as Xu, aM as Ku, aN as Ju, aO as Qu, aP as pa, aQ as Yu, aR as Zu, aS as la, aT as eo, aU as to, aV as no, aW as ao, aX as ro, aY as so, aZ as ma, a_ as fa, a$ as ha, b0 as uo, b1 as ga, b2 as oo, b3 as io, b4 as co, b5 as po, b6 as lo, b7 as ba, b8 as _a, b9 as mo, ba as ya, bb as Ia, bc as wa, bd as fo, be as ho, bf as go, bg as ka, bh as Sa, bi as Ma, bj as bo, bk as va, bl as _o, bm as yo, bn as Io, bo as Aa, bp as wo, bq as xa, br as Da, bs as ko, bt as So, bu as Mo, bv as vo, bw as Ao, bx as xo, by as Na, bz as Ca, bA as Fa, bB as Ra, bC as Ea, bD as Pa, bE as Do, bF as No, bG as Co, bH as Wa, bI as rn, bJ as Ta, bK as Fo, bL as Ro, bM as Eo, bN as Po, bO as Wo, bP as To, bQ as Bo, bR as Oo, bS as Ho, bT as Lo, bU as Vo, bV as $o, bW as Ba, bX as zo, bY as Go, bZ as Uo, b_ as jo, b$ as qo, c0 as Sn, c1 as Xo, c2 as Ko, c3 as Jo, c4 as Qo, c5 as Yo, c6 as Oa, c7 as Zo, c8 as ei, c9 as ti, ca as ni, cb as ai, cc as Ha, cd as La, ce as ri, cf as si, cg as ui, ch as oi, ci as ii, cj as di, ck as ci, cl as pi, cm as li, cn as Va, co as mi, cp as fi, cq as $a, cr as za, cs as Ga, ct as Ua, cu as hi, cv as gi, cw as bi, cx as _i, cy as yi, cz as Kt, cA as We, cB as Mn, cC as ja, cD as Ii, cE as wi, cF as ki, cG as vn, cH as An, cI as Si, cJ as Mi, cK as vi, __tla as __tla_0 } from "./index-C_KNhBjg.js";
let jf, Zf, eh, nh, th;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  function qa(r, n) {
    for (var s = 0; s < n.length; s++) {
      const o = n[s];
      if (typeof o != "string" && !Array.isArray(o)) {
        for (const a in o) if (a !== "default" && !(a in r)) {
          const t = Object.getOwnPropertyDescriptor(o, a);
          t && Object.defineProperty(r, a, t.get ? t : {
            enumerable: true,
            get: () => o[a]
          });
        }
      }
    }
    return Object.freeze(Object.defineProperty(r, Symbol.toStringTag, {
      value: "Module"
    }));
  }
  var $;
  (function(r) {
    r[r.float32 = 0] = "float32", r[r.int32 = 1] = "int32", r[r.bool = 2] = "bool", r[r.string = 3] = "string", r[r.complex64 = 4] = "complex64";
  })($ || ($ = {}));
  var at;
  (function(r) {
    r[r.linear = 0] = "linear", r[r.relu = 1] = "relu", r[r.relu6 = 2] = "relu6", r[r.prelu = 3] = "prelu", r[r.leakyrelu = 4] = "leakyrelu", r[r.sigmoid = 5] = "sigmoid", r[r.elu = 6] = "elu";
  })(at || (at = {}));
  let Xa;
  function Ai(r) {
    Xa = r.wasm.cwrap(Rn, null, [
      "number",
      "array",
      "number",
      "number",
      "array",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function xi(r) {
    const { inputs: n, backend: s, attrs: o } = r, { a, b: t, bias: i, preluActivationWeights: d } = n;
    if (a.dtype !== "float32" || t.dtype !== "float32") throw new Error("_FusedMatMul for non non-float32 tensors not yet supported.");
    const { transposeA: c, transposeB: u, activation: e, leakyreluAlpha: m } = o, b = s.dataIdMap.get(a.dataId).id, l = s.dataIdMap.get(t.dataId).id;
    let f = 0;
    if (i != null) {
      const V = s.dataIdMap.get(i.dataId);
      if (V.shape.length !== 1) throw new Error(`_FusedMatMul only supports rank-1 bias but got rank ${V.shape.length}.`);
      f = V.id;
    }
    const g = d == null ? 0 : s.dataIdMap.get(d.dataId).id, w = at[e];
    if (w == null) throw new Error(`${e} activation not yet supported for FusedConv2D in the wasm backend.`);
    const k = c ? a.shape[2] : a.shape[1], y = u ? t.shape[1] : t.shape[2], _ = Ct(a.shape.slice(0, -2), t.shape.slice(0, -2)), v = s.makeOutput([
      ..._,
      k,
      y
    ], a.dtype), E = s.dataIdMap.get(v.dataId).id, R = new Uint8Array(new Int32Array(a.shape).buffer), B = new Uint8Array(new Int32Array(t.shape).buffer);
    return Xa(b, R, a.shape.length, l, B, t.shape.length, c, u, w, f, g, m || 0, E), v;
  }
  const Di = {
    kernelName: Rn,
    backendName: "wasm",
    setupFunc: Ai,
    kernelFunc: xi
  };
  function L(r, n) {
    let s;
    function o(t) {
      s = t.wasm.cwrap(r, null, [
        "number",
        "number",
        "number"
      ]);
    }
    function a(t) {
      const { backend: i, inputs: { x: d } } = t, c = i.dataIdMap.get(d.dataId).id, u = i.makeOutput(d.shape, n || d.dtype), e = i.dataIdMap.get(u.dataId).id;
      return F(u.shape) === 0 || s(c, $[d.dtype], e), u;
    }
    return {
      kernelName: r,
      backendName: "wasm",
      setupFunc: o,
      kernelFunc: a
    };
  }
  const Ni = L(Qs);
  const Ci = L(Ys);
  const Fi = L(Zs);
  function ee(r, n, s) {
    let o;
    function a(i) {
      o = i.wasm.cwrap(r, null, [
        "number",
        "array",
        "number",
        "number",
        "array",
        "number",
        "number",
        "number"
      ]);
    }
    function t(i) {
      const { backend: d, inputs: c } = i, { a: u, b: e } = c, m = d.dataIdMap.get(u.dataId).id, b = d.dataIdMap.get(e.dataId).id, l = s ?? u.dtype, f = Ct(u.shape, e.shape), g = d.makeOutput(f, l);
      if (F(f) === 0) return g;
      const w = new Uint8Array(new Int32Array(u.shape).buffer), k = new Uint8Array(new Int32Array(e.shape).buffer), y = d.dataIdMap.get(g.dataId).id;
      return o(m, w, u.shape.length, b, k, e.shape.length, $[u.dtype], y), g;
    }
    return {
      kernelName: r,
      backendName: "wasm",
      setupFunc: a,
      kernelFunc: t
    };
  }
  const Ri = ee(eu);
  let Ka;
  function Ei(r) {
    Ka = r.wasm.cwrap(En, null, [
      "array",
      "number",
      "number",
      "number"
    ]);
  }
  function Pi(r) {
    const { inputs: n, backend: s } = r, o = s.makeOutput(n[0].shape, n[0].dtype);
    if (F(o.shape) === 0) return o;
    const a = n.map((d) => s.dataIdMap.get(d.dataId).id), t = new Uint8Array(new Int32Array(a).buffer), i = s.dataIdMap.get(o.dataId).id;
    return Ka(t, a.length, $[o.dtype], i), o;
  }
  const Wi = {
    kernelName: En,
    backendName: "wasm",
    setupFunc: Ei,
    kernelFunc: Pi
  };
  function Rt(r) {
    const { inputs: { x: n }, backend: s } = r;
    if (n.dtype === "string") return nu(s.readSync(n.dataId), n.shape, n.dtype);
    const o = s.makeOutput(n.shape, n.dtype), a = s.typedArrayFromHeap(n);
    return s.typedArrayFromHeap(o).set(a), o;
  }
  const Ti = {
    kernelName: tu,
    backendName: "wasm",
    kernelFunc: Rt
  };
  let Ja;
  function Bi(r) {
    Ja = r.wasm.cwrap(Pn, null, [
      "number",
      "array",
      "number",
      "number",
      "number",
      "array",
      "number"
    ]);
  }
  function Ae(r) {
    const { inputs: n, backend: s, attrs: o } = r, [a, t] = Hi(n.x.shape, o.perm);
    let i = true;
    for (let f = 0; f < t.length; f++) t[f] !== f && (i = false);
    const d = Oi(n.x.shape, o.perm), c = {
      dataId: n.x.dataId,
      shape: a,
      dtype: n.x.dtype
    };
    if (i) {
      const f = Rt({
        inputs: n,
        backend: s
      });
      return f.shape = d, f;
    }
    const u = s.makeOutput(d, c.dtype), e = s.dataIdMap.get(c.dataId).id, m = s.dataIdMap.get(u.dataId).id, b = new Uint8Array(new Int32Array(t).buffer), l = new Uint8Array(new Int32Array(c.shape).buffer);
    return Ja(e, l, c.shape.length, $[c.dtype], m, b, t.length), u;
  }
  function Oi(r, n) {
    const s = new Array(r.length);
    for (let o = 0; o < s.length; o++) s[o] = r[n[o]];
    return s;
  }
  function Hi(r, n) {
    const s = [], o = [];
    for (let a = 0; a < r.length; ++a) r[a] !== 1 && s.push(r[a]), r[n[a]] !== 1 && o.push(n[a]);
    for (let a = 0; a < o.length; ++a) {
      let t = -1;
      for (let i = 0; i < o.length; ++i) o[i] >= a && (t === -1 || o[t] > o[i]) && (t = i);
      o[t] = a;
    }
    return [
      s,
      o
    ];
  }
  const Li = {
    kernelName: Pn,
    backendName: "wasm",
    kernelFunc: Ae,
    setupFunc: Bi
  };
  function xe(r, n, s) {
    const o = r.shape, a = r.shape.length, t = rt(n, o);
    let i = t;
    const d = tn(i, a);
    let c = null, u = false;
    if (d != null) {
      const e = new Array(a);
      for (let l = 0; l < e.length; l++) e[l] = o[d[l]];
      i = je(i.length, a), c = Ae({
        inputs: {
          x: r
        },
        attrs: {
          perm: d
        },
        backend: s
      });
      const m = s.dataIdMap.get(r.dataId).id;
      s.dataIdMap.get(c.dataId).id !== m && (u = true);
    }
    return {
      transposed: c,
      originalAxes: t,
      axes: i,
      inputWasTransposed: u
    };
  }
  let Qa;
  function Vi(r) {
    Qa = r.wasm.cwrap(Wn, null, [
      "number, number, number"
    ]);
  }
  function $i(r) {
    const { backend: n, inputs: s, attrs: o } = r, { axis: a, keepDims: t } = o, { x: i } = s;
    let c = n.dataIdMap.get(i.dataId).id, u = i;
    const { transposed: e, axes: m, originalAxes: b, inputWasTransposed: l } = xe(i, a, n);
    if (l) {
      const _ = n.dataIdMap.get(e.dataId).id;
      u = e, c = _;
    }
    const f = u.shape.length;
    Se("all", m, f);
    const [g, w] = Be(u.shape, m), k = F(w), y = n.makeOutput(g, i.dtype);
    if (F(u.shape) !== 0) {
      const _ = n.dataIdMap.get(y.dataId).id;
      Qa(c, k, _);
    }
    if (l && n.disposeData(e.dataId), t) {
      const _ = Oe(y.shape, b);
      y.shape = _;
    }
    return y;
  }
  const zi = {
    kernelName: Wn,
    backendName: "wasm",
    setupFunc: Vi,
    kernelFunc: $i
  };
  let Ya;
  function Gi(r) {
    Ya = r.wasm.cwrap(Tn, null, [
      "number, number, number"
    ]);
  }
  function Ui(r) {
    const { backend: n, inputs: s, attrs: o } = r, { axis: a, keepDims: t } = o, { x: i } = s;
    let c = n.dataIdMap.get(i.dataId).id, u = i;
    const { transposed: e, axes: m, originalAxes: b, inputWasTransposed: l } = xe(i, a, n);
    if (l) {
      const _ = n.dataIdMap.get(e.dataId).id;
      u = e, c = _;
    }
    const f = u.shape.length;
    Se("any", m, f);
    const [g, w] = Be(u.shape, m), k = F(w), y = n.makeOutput(g, i.dtype);
    if (F(u.shape) !== 0) {
      const _ = n.dataIdMap.get(y.dataId).id;
      Ya(c, k, _);
    }
    if (l && n.disposeData(e.dataId), t) {
      const _ = Oe(y.shape, b);
      y.shape = _;
    }
    return y;
  }
  const ji = {
    kernelName: Tn,
    backendName: "wasm",
    setupFunc: Gi,
    kernelFunc: Ui
  };
  function Za(r) {
    let n;
    function s(a) {
      n = a.wasm.cwrap(r, null, [
        "number",
        "number",
        "number",
        "number",
        "number"
      ]);
    }
    function o(a) {
      const { backend: t, inputs: i, attrs: d } = a, { axis: c } = d, { x: u } = i, e = t.dataIdMap.get(u.dataId).id;
      let m = e, b = u;
      const { transposed: l, axes: f, inputWasTransposed: g } = xe(u, c, t);
      if (g) {
        const E = t.dataIdMap.get(l.dataId).id;
        E !== e && (b = l, m = E);
      }
      const w = b.shape.slice(0, -1), k = t.makeOutput(w, "int32"), y = t.dataIdMap.get(k.dataId).id, _ = F(k.shape), v = b.shape[f[0]];
      return n(m, $[b.dtype], _, v, y), g && t.disposeData(l.dataId), k;
    }
    return {
      kernelName: r,
      backendName: "wasm",
      setupFunc: s,
      kernelFunc: o
    };
  }
  const qi = Za(au);
  const Xi = Za(ru);
  const Ki = L(su);
  const Ji = L(uu);
  const Qi = L(ou);
  const Yi = ee(iu);
  const Zi = L(du);
  let er;
  function ed(r) {
    er = r.wasm.cwrap(Bn, null, [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function td(r) {
    const { inputs: n, attrs: s, backend: o } = r, a = n.x, t = o.dataIdMap.get(a.dataId).id, { filterSize: i, strides: d, pad: c, dimRoundingMode: u } = s, e = st(a.shape, i, d, 1, c, u), m = e.filterHeight, b = e.filterWidth, l = e.padInfo.top, f = e.padInfo.right, g = e.padInfo.bottom, w = e.padInfo.left, k = e.strideHeight, y = e.strideWidth, _ = e.inChannels;
    if (e.dataFormat !== "channelsLast") throw new Error(`wasm backend does not support dataFormat:'${e.dataFormat}'. Please use 'channelsLast'.`);
    if (e.dilationWidth !== 1 || e.dilationHeight !== 1) throw new Error(`was backend only supports average pooling with dilation = [1, 1], got [${e.dilationHeight}, ${e.dilationWidth}].`);
    const v = o.makeOutput(e.outShape, "float32"), E = o.dataIdMap.get(v.dataId).id;
    return er(t, a.shape[0], a.shape[1], a.shape[2], m, b, l, f, g, w, k, y, _, E), v;
  }
  const nd = {
    kernelName: Bn,
    backendName: "wasm",
    setupFunc: ed,
    kernelFunc: td
  };
  let tr;
  function ad(r) {
    tr = r.wasm.cwrap("AvgPool3D", null, [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function rd(r) {
    const { inputs: n, backend: s, attrs: o } = r, { x: a } = n, { filterSize: t, strides: i, pad: d, dimRoundingMode: c, dataFormat: u } = o, e = Ft(a.shape, t, i, 1, d, c, u), m = s.makeOutput(e.outShape, a.dtype);
    return tr(s.dataIdMap.get(a.dataId).id, s.dataIdMap.get(m.dataId).id, e.batchSize, e.inChannels, e.inDepth, e.inHeight, e.inWidth, e.outDepth, e.outHeight, e.outWidth, e.strideDepth, e.strideHeight, e.strideWidth, e.dilationDepth, e.dilationHeight, e.dilationWidth, e.effectiveFilterDepth, e.effectiveFilterHeight, e.effectiveFilterWidth, e.padInfo.front, e.padInfo.top, e.padInfo.left), m;
  }
  const sd = {
    kernelName: cu,
    backendName: "wasm",
    setupFunc: ad,
    kernelFunc: rd
  };
  let nr;
  function ud(r) {
    nr = r.wasm.cwrap("AvgPool3DGrad", null, [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function od(r) {
    const { inputs: n, backend: s, attrs: o } = r, { dy: a, input: t } = n, { filterSize: i, strides: d, pad: c, dimRoundingMode: u } = o, e = Ft(t.shape, i, d, 1, c, u), m = s.makeOutput(t.shape, t.dtype);
    return nr(s.dataIdMap.get(a.dataId).id, s.dataIdMap.get(m.dataId).id, e.batchSize, e.inChannels, e.inDepth, e.inHeight, e.inWidth, e.outDepth, e.outHeight, e.outWidth, e.strideDepth, e.strideHeight, e.strideWidth, e.dilationDepth, e.dilationHeight, e.dilationWidth, e.effectiveFilterDepth, e.effectiveFilterHeight, e.effectiveFilterWidth, e.padInfo.front, e.padInfo.top, e.padInfo.left, e.filterDepth, e.filterHeight, e.filterWidth), m;
  }
  const id = {
    kernelName: pu,
    backendName: "wasm",
    setupFunc: ud,
    kernelFunc: od
  };
  let ar;
  function dd(r) {
    ar = r.wasm.cwrap("AvgPoolGrad", null, [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function cd(r) {
    const { inputs: n, backend: s, attrs: o } = r, { dy: a, input: t } = n, { filterSize: i, strides: d, pad: c } = o, u = st(t.shape, i, d, 1, c), e = s.makeOutput(t.shape, t.dtype);
    return ar(s.dataIdMap.get(a.dataId).id, s.dataIdMap.get(e.dataId).id, u.batchSize, u.inChannels, u.inHeight, u.inWidth, u.outHeight, u.outWidth, u.strideHeight, u.strideWidth, u.dilationHeight, u.dilationWidth, u.effectiveFilterHeight, u.effectiveFilterWidth, u.padInfo.top, u.padInfo.left, u.filterHeight, u.filterWidth), e;
  }
  const pd = {
    kernelName: lu,
    backendName: "wasm",
    setupFunc: dd,
    kernelFunc: cd
  };
  function oe(r) {
    const { inputs: n, attrs: s } = r, { x: o } = n, { shape: a } = s, t = F(o.shape), i = fu(a, t);
    return ge(t === F(i), () => `new shape: ${i}, old shape: ${o.shape}. New shape and old shape must have the same number of elements.`), r.backend.incRef(o.dataId), {
      dataId: o.dataId,
      shape: i,
      dtype: o.dtype
    };
  }
  const ld = {
    kernelName: mu,
    backendName: "wasm",
    kernelFunc: oe
  };
  let rr;
  function md(r) {
    rr = r.wasm.cwrap(On, null, [
      "number",
      "array",
      "number",
      "number",
      "array",
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function fd(r) {
    const { inputs: n, backend: s, attrs: o } = r, { a, b: t } = n, { transposeA: i, transposeB: d } = o;
    if (a.dtype !== "float32" || t.dtype !== "float32") throw new Error("BatchMatMul for non non-float32 tensors not yet supported.");
    const c = a.shape.length, u = t.shape.length, e = i ? a.shape[c - 2] : a.shape[c - 1], m = d ? t.shape[u - 1] : t.shape[u - 2], b = i ? a.shape[c - 1] : a.shape[c - 2], l = d ? t.shape[u - 2] : t.shape[u - 1], f = a.shape.slice(0, -2), g = t.shape.slice(0, -2), w = F(f), k = F(g), _ = Ct(a.shape.slice(0, -2), t.shape.slice(0, -2)).concat([
      b,
      l
    ]);
    ge(e === m, () => `Error in matMul: inner shapes (${e}) and (${m}) of Tensors with shapes ${a.shape} and ${t.shape} and transposeA=${i} and transposeB=${d} must match.`);
    const v = i ? [
      w,
      e,
      b
    ] : [
      w,
      b,
      e
    ], E = d ? [
      k,
      l,
      m
    ] : [
      k,
      m,
      l
    ], R = oe({
      inputs: {
        x: a
      },
      backend: s,
      attrs: {
        shape: v
      }
    }), B = oe({
      inputs: {
        x: t
      },
      backend: s,
      attrs: {
        shape: E
      }
    }), V = s.dataIdMap.get(R.dataId).id, z = s.dataIdMap.get(B.dataId).id, H = i ? R.shape[2] : R.shape[1], U = d ? B.shape[1] : B.shape[2], q = Math.max(w, k), Q = s.makeOutput([
      q,
      H,
      U
    ], R.dtype), ue = s.dataIdMap.get(Q.dataId).id, X = new Uint8Array(new Int32Array(R.shape).buffer), te = new Uint8Array(new Int32Array(B.shape).buffer);
    return rr(V, X, R.shape.length, z, te, B.shape.length, i, d, ue), s.disposeData(R.dataId), s.disposeData(B.dataId), Q.shape = _, Q;
  }
  const hd = {
    kernelName: On,
    backendName: "wasm",
    setupFunc: md,
    kernelFunc: fd
  };
  function Te(r) {
    const { inputs: { x: n }, attrs: { begin: s, size: o }, backend: a } = r, [t, i] = gu(n, s, o), d = bu(n.shape, t, i), c = a.readSync(n.dataId), u = a.makeOutput(i, n.dtype), e = fe(n.shape), m = a.dataIdMap.get(u.dataId);
    if (d) {
      const f = _u(t, e);
      return n.dtype === "string" ? m.stringBytes = c.slice(f, f + F(i)) : a.typedArrayFromHeap(u).set(c.subarray(f, f + F(i))), u;
    }
    if (n.dtype === "string") {
      const f = kn(c, t, i, n.shape, n.dtype);
      return m.stringBytes = f, u;
    }
    const b = a.typedArrayFromHeap(u), l = n.shape.length;
    if (l === 2) gd(c, e[0], b, t, i);
    else if (l === 3) bd(c, e[0], e[1], b, t, i);
    else if (l === 4) _d(c, e[0], e[1], e[2], b, t, i);
    else {
      const f = kn(c, t, i, n.shape, n.dtype);
      b.set(f);
    }
    return u;
  }
  function gd(r, n, s, o, a) {
    let t = 0;
    const i = o[0], d = o[1], c = i + a[0];
    for (let u = i; u < c; u++) {
      const e = u * n + d;
      s.set(r.subarray(e, e + a[1]), t), t += a[1];
    }
  }
  function bd(r, n, s, o, a, t) {
    let i = 0;
    const d = a[0], c = a[1], u = a[2], e = d + t[0], m = c + t[1];
    for (let b = d; b < e; b++) for (let l = c; l < m; l++) {
      const f = b * n + l * s + u;
      o.set(r.subarray(f, f + t[2]), i), i += t[2];
    }
  }
  function _d(r, n, s, o, a, t, i) {
    let d = 0;
    const c = t[0], u = t[1], e = t[2], m = c + i[0], b = u + i[1], l = e + i[2], f = t[3];
    for (let g = c; g < m; g++) for (let w = u; w < b; w++) for (let k = e; k < l; k++) {
      const y = g * n + w * s + k * o + f;
      a.set(r.subarray(y, y + i[3]), d), d += i[3];
    }
  }
  const yd = {
    kernelName: hu,
    backendName: "wasm",
    kernelFunc: Te
  };
  function Id(r) {
    const { inputs: n, backend: s, attrs: o } = r, { x: a } = n, { blockShape: t, crops: i } = o, d = t.reduce((k, y) => k * y), c = Hn(a.shape, t, d), u = Ln(c.length, t.length), e = Vn(a.shape, t, d), m = Iu(i, t.length), b = wu(e, i, t.length), l = oe({
      inputs: {
        x: a
      },
      backend: s,
      attrs: {
        shape: c
      }
    }), f = Ae({
      inputs: {
        x: l
      },
      backend: s,
      attrs: {
        perm: u
      }
    }), g = oe({
      inputs: {
        x: f
      },
      backend: s,
      attrs: {
        shape: e
      }
    }), w = Te({
      inputs: {
        x: g
      },
      backend: s,
      attrs: {
        begin: m,
        size: b
      }
    });
    return s.disposeData(l.dataId), s.disposeData(f.dataId), s.disposeData(g.dataId), w;
  }
  const wd = {
    kernelName: yu,
    backendName: "wasm",
    kernelFunc: Id
  };
  let sr;
  function kd(r) {
    sr = r.wasm.cwrap($n, null, [
      "number",
      "number",
      "boolean",
      "number",
      "number",
      "number"
    ]);
  }
  function Sd(r) {
    const { backend: n, inputs: s, attrs: o } = r, { x: a, weights: t } = s, { size: i } = o, d = t.shape.reduce((m, b) => m * b, 1) !== 0, c = a.shape.length === 1 ? [
      i
    ] : [
      a.shape[0],
      i
    ], u = n.makeOutput(c, t.dtype);
    function e(m) {
      return n.dataIdMap.get(m.dataId).id;
    }
    return sr(e(a), i, d, e(t), $[t.dtype], e(u)), u;
  }
  const Md = {
    kernelName: $n,
    backendName: "wasm",
    setupFunc: kd,
    kernelFunc: Sd
  };
  const vd = ee(ku);
  function Ad(r) {
    const { inputs: n, backend: s } = r, { s0: o, s1: a } = n, t = s.typedArrayFromHeap(o), i = s.typedArrayFromHeap(a), d = Ct(Array.from(t), Array.from(i));
    return s.makeOutput([
      d.length
    ], "int32", void 0, new Int32Array(d));
  }
  const xd = {
    kernelName: Su,
    backendName: "wasm",
    kernelFunc: Ad
  };
  function De(r) {
    const { inputs: { x: n }, attrs: { dtype: s }, backend: o } = r, a = o.makeOutput(n.shape, s), t = o.typedArrayFromHeap(n);
    return o.typedArrayFromHeap(a).set(t), a;
  }
  const Dd = {
    kernelName: Mu,
    backendName: "wasm",
    kernelFunc: De
  };
  const Nd = L(vu);
  let ur;
  function Cd(r) {
    ur = r.wasm.cwrap(zn, null, [
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function Fd(r) {
    const { inputs: n, backend: s, attrs: o } = r, { x: a } = n, { clipValueMin: t, clipValueMax: i } = o, d = s.dataIdMap.get(a.dataId).id, c = s.makeOutput(a.shape, a.dtype), u = s.dataIdMap.get(c.dataId).id;
    return ur(d, t, i, u), c;
  }
  const Rd = {
    kernelName: zn,
    backendName: "wasm",
    setupFunc: Cd,
    kernelFunc: Fd
  };
  function or(r) {
    const { inputs: n, backend: s } = r, o = rt(r.attrs.axis, n[0].shape)[0], a = n.map((l) => l.shape);
    xu(a, o);
    let t = Ut(n.map((l) => l.shape), o);
    const i = n.filter((l) => F(l.shape) > 0);
    if (i.length === 1) return Rt({
      inputs: {
        x: i[0]
      },
      backend: s
    });
    const d = s.makeOutput(t, n[0].dtype);
    if (F(t) === 0) return d;
    if (i[0].dtype === "string") {
      const l = i.map((_) => {
        const E = [
          -1,
          F(_.shape.slice(o))
        ];
        return oe({
          inputs: {
            x: _
          },
          backend: s,
          attrs: {
            shape: E
          }
        });
      }), f = l.map((_) => ({
        vals: s.readSync(_.dataId),
        shape: _.shape
      }));
      t = Ut(l.map((_) => _.shape), 1);
      const g = l[0].shape[0] === 1, w = Du(f, t, n[0].dtype, g), k = Ut(i.map((_) => _.shape), o);
      d.shape = k;
      const y = s.dataIdMap.get(d.dataId);
      return y.stringBytes = Nu(w), l.forEach((_) => s.disposeData(_.dataId)), d;
    }
    const c = F(i[0].shape.slice(0, o));
    let u = 0;
    const e = i.map((l) => {
      const f = F(l.shape.slice(o));
      return u += f, f;
    }), m = i.map((l) => s.typedArrayFromHeap(l)), b = s.typedArrayFromHeap(d);
    for (let l = 0; l < c; l++) {
      let f = l * u;
      for (let g = 0; g < m.length; g++) {
        const w = e[g], k = l * w, y = m[g].subarray(k, k + w);
        b.set(y, f), f += w;
      }
    }
    return d;
  }
  const Ed = {
    kernelName: Au,
    backendName: "wasm",
    kernelFunc: or
  };
  let ir;
  function Pd(r) {
    ir = r.wasm.cwrap(Gn, null, [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function Wd(r) {
    const { inputs: n, attrs: s, backend: o } = r, { x: a, filter: t } = n, i = o.dataIdMap.get(a.dataId).id, d = o.dataIdMap.get(t.dataId).id, { strides: c, dilations: u, pad: e, dimRoundingMode: m, dataFormat: b } = s, l = Un(b), f = ut(a.shape, t.shape, c, u, e, m, false, l), g = f.filterHeight, w = f.filterWidth, k = f.padInfo.top, y = f.padInfo.right, _ = f.padInfo.bottom, v = f.padInfo.left, E = f.dilationHeight, R = f.dilationWidth, B = f.strideHeight, V = f.strideWidth, z = f.inChannels, H = f.outChannels, U = f.padInfo.type === "SAME" ? 1 : 0;
    if (f.dataFormat !== "channelsLast") throw new Error(`wasm backend Conv2D does not support dataFormat:'${f.dataFormat}'. Please use 'channelsLast'.`);
    const q = o.makeOutput(f.outShape, "float32"), Q = o.dataIdMap.get(q.dataId).id;
    return ir(i, a.shape[0], a.shape[1], a.shape[2], d, g, w, k, y, _, v, U, E, R, B, V, z, H, Q), q;
  }
  const Td = {
    kernelName: Gn,
    backendName: "wasm",
    setupFunc: Pd,
    kernelFunc: Wd
  };
  let dr;
  function Bd(r) {
    dr = r.wasm.cwrap(jn, null, [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function Od(r) {
    const { backend: n, inputs: s, attrs: o } = r, { dy: a, filter: t } = s, { strides: i, pad: d, dataFormat: c, dimRoundingMode: u, inputShape: e } = o, m = 1, b = Un(c), l = ut(e, t.shape, i, m, d, u, false, b), { batchSize: f, filterHeight: g, filterWidth: w, inChannels: k, inHeight: y, inWidth: _, outChannels: v, outHeight: E, outWidth: R, strideHeight: B, strideWidth: V } = l, z = g - 1 - l.padInfo.top, H = w - 1 - l.padInfo.left, U = l.dataFormat === "channelsLast", q = fe(l.inShape), Q = fe(a.shape), [ue, X, te] = fe(t.shape), pe = q[0], G = U ? q[1] : q[2], he = U ? q[2] : 1, ie = U ? 1 : q[1], de = Q[0], _e = U ? Q[1] : Q[2], ne = U ? Q[2] : 1, He = U ? 1 : Q[1], Le = n.makeOutput(l.inShape, "float32"), qe = n.dataIdMap.get(Le.dataId).id, Xe = n.dataIdMap.get(a.dataId).id, Y = n.dataIdMap.get(t.dataId).id;
    return dr(Xe, Y, f, g, w, y, _, k, E, R, v, B, V, z, H, ue, X, te, pe, G, he, ie, de, _e, ne, He, qe), Le;
  }
  const Hd = {
    kernelName: jn,
    backendName: "wasm",
    setupFunc: Bd,
    kernelFunc: Od
  };
  let cr;
  function Ld(r) {
    cr = r.wasm.cwrap(qn, null, [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function Vd(r) {
    const { inputs: n, backend: s, attrs: o } = r, { x: a, filter: t } = n, { strides: i, pad: d, dilations: c } = o;
    if (a.dtype !== "float32") throw new Error(`Tensor x must have dtype float32, got ${a.dtype}`);
    if (t.dtype !== "float32") throw new Error(`Tensor filter must have dtype float32, got ${t.dtype}`);
    const u = nn(a.shape, t.shape, i, c, d), e = s.makeOutput(u.outShape, a.dtype);
    return cr(s.dataIdMap.get(a.dataId).id, s.dataIdMap.get(t.dataId).id, s.dataIdMap.get(e.dataId).id, u.batchSize, u.inDepth, u.inHeight, u.inWidth, u.inChannels, u.outDepth, u.outHeight, u.outWidth, u.outChannels, u.strideDepth, u.strideHeight, u.strideWidth, u.dilationDepth, u.dilationHeight, u.dilationWidth, u.filterDepth, u.filterHeight, u.filterWidth, u.padInfo.front, u.padInfo.top, u.padInfo.left), e;
  }
  const $d = {
    kernelName: qn,
    backendName: "wasm",
    setupFunc: Ld,
    kernelFunc: Vd
  };
  let pr;
  function zd(r) {
    pr = r.wasm.cwrap(Xn, null, [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function Gd(r) {
    const { inputs: n, backend: s, attrs: o } = r, { x: a, dy: t } = n, { strides: i, pad: d, filterShape: c } = o;
    if (a.dtype !== "float32") throw new Error(`Tensor dy must have dtype float32, got ${a.dtype}`);
    if (t.dtype !== "float32") throw new Error(`Tensor filter must have dtype float32, got ${t.dtype}`);
    const u = nn(a.shape, c, i, 1, d), e = s.makeOutput(u.filterShape, t.dtype);
    return pr(s.dataIdMap.get(a.dataId).id, s.dataIdMap.get(t.dataId).id, s.dataIdMap.get(e.dataId).id, u.batchSize, u.inDepth, u.inHeight, u.inWidth, u.inChannels, u.outDepth, u.outHeight, u.outWidth, u.outChannels, u.strideDepth, u.strideHeight, u.strideWidth, u.dilationDepth, u.dilationHeight, u.dilationWidth, u.filterDepth, u.filterHeight, u.filterWidth, u.padInfo.front, u.padInfo.top, u.padInfo.left), e;
  }
  const Ud = {
    kernelName: Xn,
    backendName: "wasm",
    setupFunc: zd,
    kernelFunc: Gd
  };
  let lr;
  function jd(r) {
    lr = r.wasm.cwrap(Kn, null, [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function qd(r) {
    const { inputs: n, backend: s, attrs: o } = r, { dy: a, filter: t } = n, { pad: i, strides: d, inputShape: c } = o;
    if (a.dtype !== "float32") throw new Error(`Tensor dy must have dtype float32, got ${a.dtype}`);
    if (t.dtype !== "float32") throw new Error(`Tensor filter must have dtype float32, got ${t.dtype}`);
    const u = nn(c, t.shape, d, 1, i), e = s.makeOutput(u.inShape, a.dtype);
    return lr(s.dataIdMap.get(t.dataId).id, s.dataIdMap.get(a.dataId).id, s.dataIdMap.get(e.dataId).id, u.batchSize, u.inDepth, u.inHeight, u.inWidth, u.inChannels, u.outDepth, u.outHeight, u.outWidth, u.outChannels, u.strideDepth, u.strideHeight, u.strideWidth, u.dilationDepth, u.dilationHeight, u.dilationWidth, u.filterDepth, u.filterHeight, u.filterWidth, u.padInfo.front, u.padInfo.top, u.padInfo.left), e;
  }
  const Xd = {
    kernelName: Kn,
    backendName: "wasm",
    setupFunc: jd,
    kernelFunc: qd
  };
  const Kd = L(Cu);
  const Jd = L(Fu);
  var Jt;
  (function(r) {
    r[r.bilinear = 0] = "bilinear", r[r.nearest = 1] = "nearest";
  })(Jt || (Jt = {}));
  let mr;
  function Qd(r) {
    mr = r.wasm.cwrap(Jn, null, [
      "number",
      "number",
      "number",
      "number",
      "array",
      "number",
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function Yd(r) {
    const { backend: n, inputs: s, attrs: o } = r, { method: a, extrapolationValue: t, cropSize: i } = o, { image: d, boxes: c, boxInd: u } = s, e = c.shape[0], [m, b] = i, l = [
      e,
      m,
      b,
      d.shape[3]
    ];
    let f = n.dataIdMap.get(d.dataId), g;
    d.dtype !== "float32" && (g = De({
      backend: n,
      inputs: {
        x: d
      },
      attrs: {
        dtype: "float32"
      }
    }), f = n.dataIdMap.get(g.dataId));
    const w = f.id, k = n.dataIdMap.get(c.dataId).id, y = n.dataIdMap.get(u.dataId).id, _ = n.makeOutput(l, "float32"), v = n.dataIdMap.get(_.dataId).id, E = new Uint8Array(new Int32Array(d.shape).buffer);
    return mr(w, k, y, e, E, m, b, Jt[a], t, v), g != null && n.disposeData(g.dataId), _;
  }
  const Zd = {
    kernelName: Jn,
    backendName: "wasm",
    setupFunc: Qd,
    kernelFunc: Yd
  };
  let fr;
  function ec(r) {
    fr = r.wasm.cwrap(Qn, null, [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function tc(r) {
    const { inputs: n, backend: s, attrs: o } = r, { x: a } = n, { axis: t, exclusive: i, reverse: d } = o, c = a.shape.length;
    ge(a.dtype === "float32" || a.dtype === "int32", () => `cumprod does not support ${a.dtype} tensors in the WASM backend`);
    const u = tn([
      t
    ], c);
    let e = a;
    u !== null && (e = Ae({
      inputs: {
        x: a
      },
      attrs: {
        perm: u
      },
      backend: s
    }));
    const m = je(1, c)[0];
    Se("cumprod", [
      m
    ], c);
    const b = s.makeOutput(e.shape, e.dtype), l = e.shape[m], f = s.dataIdMap.get(e.dataId).id, g = s.dataIdMap.get(b.dataId).id;
    fr(f, i ? 1 : 0, d ? 1 : 0, l, g, $[a.dtype]);
    let w = b;
    if (u !== null) {
      const k = Yn(u);
      w = Ae({
        inputs: {
          x: b
        },
        attrs: {
          perm: k
        },
        backend: s
      }), s.disposeData(e.dataId), s.disposeData(b.dataId);
    }
    return w;
  }
  const nc = {
    kernelName: Qn,
    backendName: "wasm",
    setupFunc: ec,
    kernelFunc: tc
  };
  let hr;
  function ac(r) {
    hr = r.wasm.cwrap(Zn, null, [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function rc(r) {
    const { inputs: n, backend: s, attrs: o } = r, { x: a } = n, { axis: t, exclusive: i, reverse: d } = o, c = a.shape.length;
    ge(a.dtype === "float32" || a.dtype === "int32", () => `cumsum does not support ${a.dtype} tensors in the WASM backend`);
    const u = tn([
      t
    ], c);
    let e = a;
    u !== null && (e = Ae({
      inputs: {
        x: a
      },
      attrs: {
        perm: u
      },
      backend: s
    }));
    const m = je(1, c)[0];
    Se("cumsum", [
      m
    ], c);
    const b = s.makeOutput(e.shape, e.dtype), l = e.shape[m], f = s.dataIdMap.get(e.dataId).id, g = s.dataIdMap.get(b.dataId).id;
    hr(f, i ? 1 : 0, d ? 1 : 0, l, g, $[a.dtype]);
    let w = b;
    if (u !== null) {
      const k = Yn(u);
      w = Ae({
        inputs: {
          x: b
        },
        attrs: {
          perm: k
        },
        backend: s
      }), s.disposeData(e.dataId), s.disposeData(b.dataId);
    }
    return w;
  }
  const sc = {
    kernelName: Zn,
    backendName: "wasm",
    setupFunc: ac,
    kernelFunc: rc
  };
  let gr;
  function uc(r) {
    gr = r.wasm.cwrap("DenseBincount", null, [
      "number",
      "array",
      "number",
      "number",
      "boolean",
      "number",
      "number",
      "boolean",
      "number"
    ]);
  }
  function oc(r) {
    const { backend: n, inputs: s, attrs: o } = r, { x: a, weights: t } = s, { size: i, binaryOutput: d } = o, c = t.shape.reduce((b, l) => b * l, 1) !== 0, u = a.shape.length === 1 ? [
      i
    ] : [
      a.shape[0],
      i
    ], e = n.makeOutput(u, t.dtype);
    function m(b) {
      return n.dataIdMap.get(b.dataId).id;
    }
    return gr(m(a), new Uint8Array(new Int32Array(a.shape).buffer), a.shape.length, i, c, m(t), $[t.dtype], d, m(e)), e;
  }
  const ic = {
    kernelName: Ru,
    backendName: "wasm",
    setupFunc: uc,
    kernelFunc: oc
  };
  let br;
  function dc(r) {
    br = r.wasm.cwrap(ea, null, [
      "number",
      "number",
      "number",
      "array",
      "number",
      "array",
      "array",
      "number",
      "number"
    ]);
  }
  function cc(r) {
    const { backend: n, inputs: s, attrs: o } = r, { x: a } = s, { blockSize: t, dataFormat: i } = o, d = a.shape[0], c = i === "NHWC" ? a.shape[1] : a.shape[2], u = i === "NHWC" ? a.shape[2] : a.shape[3], e = i === "NHWC" ? a.shape[3] : a.shape[1], m = c * t, b = u * t, l = e / (t * t), f = i === "NHWC" ? [
      d,
      m,
      b,
      l
    ] : [
      d,
      l,
      m,
      b
    ], g = n.makeOutput(f, "float32"), k = n.dataIdMap.get(a.dataId).id, y = new Uint8Array(new Int32Array(fe(a.shape)).buffer), _ = new Uint8Array(new Int32Array(f).buffer), v = new Uint8Array(new Int32Array(fe(f)).buffer), E = n.dataIdMap.get(g.dataId).id;
    return br(k, t, i === "NHWC" ? 1 : 0, y, a.shape.length - 1, _, v, f.length, E), g;
  }
  const pc = {
    kernelName: ea,
    backendName: "wasm",
    setupFunc: dc,
    kernelFunc: cc
  };
  let _r;
  function lc(r) {
    _r = r.wasm.cwrap(ta, null, [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function mc(r) {
    const { inputs: n, attrs: s, backend: o } = r, { x: a, filter: t } = n, i = o.dataIdMap.get(a.dataId).id, d = o.dataIdMap.get(t.dataId).id, { strides: c, dilations: u, pad: e, dimRoundingMode: m } = s, b = u ?? [
      1,
      1
    ], l = ut(a.shape, t.shape, c, b, e, m, true), f = l.filterHeight, g = l.filterWidth, w = l.padInfo.top, k = l.padInfo.right, y = l.padInfo.bottom, _ = l.padInfo.left, v = l.dilationHeight, E = l.dilationWidth, R = l.strideHeight, B = l.strideWidth, V = l.inChannels, z = l.outChannels, H = l.padInfo.type === "SAME" ? 1 : 0;
    if (l.dataFormat !== "channelsLast") throw new Error(`wasm backend DepthwiseConv2dNative does not support dataFormat:'${l.dataFormat}'. Please use 'channelsLast'.`);
    const U = o.makeOutput(l.outShape, "float32"), q = o.dataIdMap.get(U.dataId).id;
    return _r(i, a.shape[0], a.shape[1], a.shape[2], d, f, g, w, k, y, _, H, v, E, R, B, V, z, q), U;
  }
  const fc = {
    kernelName: ta,
    backendName: "wasm",
    setupFunc: lc,
    kernelFunc: mc
  };
  let yr;
  function hc(r) {
    yr = r.wasm.cwrap("Diag", null, [
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function gc(r) {
    const { inputs: n, backend: s } = r, { x: o } = n, a = F(o.shape), t = s.makeOutput([
      ...o.shape,
      ...o.shape
    ], o.dtype);
    return yr(s.dataIdMap.get(o.dataId).id, $[o.dtype], a, s.dataIdMap.get(t.dataId).id), t;
  }
  const bc = {
    kernelName: Eu,
    backendName: "wasm",
    setupFunc: hc,
    kernelFunc: gc
  };
  let Ir;
  function _c(r) {
    Ir = r.wasm.cwrap(na, null, [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function yc(r) {
    const { inputs: n, backend: s, attrs: o } = r, { x: a, filter: t } = n, { strides: i, pad: d, dilations: c } = o;
    if (a.dtype !== t.dtype) throw new Error(`Dilation2D error: x must have the same dtype as filter. Got ${a.dtype} and ${t.dtype}`);
    const u = an(a.shape, t.shape, i, d, "NHWC", c), e = s.makeOutput(u.outShape, a.dtype);
    return Ir(s.dataIdMap.get(a.dataId).id, s.dataIdMap.get(t.dataId).id, s.dataIdMap.get(e.dataId).id, $[a.dtype], u.batchSize, u.inChannels, u.inHeight, u.inWidth, u.outHeight, u.outWidth, u.strideHeight, u.strideWidth, u.dilationHeight, u.dilationWidth, u.filterHeight, u.filterWidth, u.padInfo.top, u.padInfo.left), e;
  }
  const Ic = {
    kernelName: na,
    backendName: "wasm",
    setupFunc: _c,
    kernelFunc: yc
  };
  let wr;
  function wc(r) {
    wr = r.wasm.cwrap(aa, null, [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function kc(r) {
    const { inputs: n, backend: s, attrs: o } = r, { x: a, filter: t, dy: i } = n, { strides: d, pad: c, dilations: u } = o;
    if (a.dtype !== t.dtype || a.dtype !== i.dtype) throw new Error(`Dilation2DBackpropFilter error: x must have the same dtype as filter and dy. Got ${a.dtype}, ${t.dtype}, and ${i.dtype}`);
    const e = an(a.shape, t.shape, d, c, "NHWC", u), m = s.makeOutput(t.shape, t.dtype);
    return wr(s.dataIdMap.get(a.dataId).id, s.dataIdMap.get(t.dataId).id, s.dataIdMap.get(i.dataId).id, s.dataIdMap.get(m.dataId).id, $[a.dtype], e.batchSize, e.inChannels, e.inHeight, e.inWidth, e.outHeight, e.outWidth, e.strideHeight, e.strideWidth, e.dilationHeight, e.dilationWidth, e.filterHeight, e.filterWidth, e.padInfo.top, e.padInfo.left), m;
  }
  const Sc = {
    kernelName: aa,
    backendName: "wasm",
    setupFunc: wc,
    kernelFunc: kc
  };
  let kr;
  function Mc(r) {
    kr = r.wasm.cwrap(ra, null, [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function vc(r) {
    const { inputs: n, backend: s, attrs: o } = r, { x: a, filter: t, dy: i } = n, { strides: d, pad: c, dilations: u } = o;
    if (a.dtype !== t.dtype || a.dtype !== i.dtype) throw new Error(`Dilation2DBackpropInput error: x must have the same dtype as filter and dy. Got ${a.dtype}, ${t.dtype}, and ${i.dtype}`);
    const e = an(a.shape, t.shape, d, c, "NHWC", u), m = s.makeOutput(a.shape, a.dtype);
    return kr(s.dataIdMap.get(a.dataId).id, s.dataIdMap.get(t.dataId).id, s.dataIdMap.get(i.dataId).id, s.dataIdMap.get(m.dataId).id, $[a.dtype], e.batchSize, e.inChannels, e.inHeight, e.inWidth, e.outHeight, e.outWidth, e.strideHeight, e.strideWidth, e.dilationHeight, e.dilationWidth, e.filterHeight, e.filterWidth, e.padInfo.top, e.padInfo.left), m;
  }
  const Ac = {
    kernelName: ra,
    backendName: "wasm",
    setupFunc: Mc,
    kernelFunc: vc
  };
  const xc = L(Pu);
  let Sr;
  function Dc(r) {
    Sr = r.wasm.cwrap(sa, null, [
      "number",
      "number",
      "number"
    ]);
  }
  function Nc(r) {
    const { inputs: n, backend: s } = r, { dy: o, y: a } = n, t = s.makeOutput(a.shape, "float32"), i = (d) => s.dataIdMap.get(d.dataId).id;
    return Sr(i(a), i(o), i(t)), t;
  }
  const Cc = {
    kernelName: sa,
    backendName: "wasm",
    setupFunc: Dc,
    kernelFunc: Nc
  };
  const Fc = false, Rc = ee(Wu, Fc, "bool");
  const Ec = L(Tu);
  const Pc = L(Bu, "float32");
  function Qt(r) {
    const { inputs: n, attrs: s, backend: o } = r, { input: a } = n, { dim: t } = s, i = a.shape.length, d = a.shape.slice();
    let c = t;
    return t < 0 && (ge(-(i + 1) <= t, () => `Axis must be in the interval [${-(i + 1)}, ${i}]`), c = i + t + 1), d.splice(c, 0, 1), oe({
      inputs: {
        x: a
      },
      backend: o,
      attrs: {
        shape: d
      }
    });
  }
  const Wc = {
    kernelName: Ou,
    backendName: "wasm",
    kernelFunc: Qt
  };
  const Tc = L(Hu, "float32");
  function Mr(r) {
    const { attrs: { shape: n, value: s }, backend: o } = r;
    let { attrs: { dtype: a } } = r;
    a = a || Vu(s);
    const t = o.makeOutput(n, a);
    return o.typedArrayFromHeap(t).fill(s), t;
  }
  const Bc = {
    kernelName: Lu,
    backendName: "wasm",
    kernelFunc: Mr
  };
  let vr;
  function Oc(r) {
    vr = r.wasm.cwrap(ua, null, [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function Hc(r) {
    const { inputs: n, backend: s } = r, { image: o } = n, a = s.makeOutput(o.shape, o.dtype), t = s.dataIdMap.get(o.dataId).id, i = s.dataIdMap.get(a.dataId).id, [d, c, u, e] = o.shape;
    return vr(t, d, c, u, e, i), a;
  }
  const Lc = {
    kernelName: ua,
    backendName: "wasm",
    kernelFunc: Hc,
    setupFunc: Oc
  };
  const Vc = L($u);
  const $c = ee(zu);
  let Ar;
  function zc(r) {
    Ar = r.wasm.cwrap(oa, null, [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function Gc(r) {
    const { backend: n, inputs: s, attrs: o } = r, { varianceEpsilon: a } = o, { x: t, mean: i, variance: d, offset: c, scale: u } = s, e = n.dataIdMap.get(t.dataId).id, m = n.dataIdMap.get(i.dataId).id, b = n.dataIdMap.get(d.dataId).id, l = c != null ? n.dataIdMap.get(c.dataId).id : 0, f = u != null ? n.dataIdMap.get(u.dataId).id : 0, g = n.makeOutput(t.shape, t.dtype);
    if (F(t.shape) === 0) return g;
    const w = n.dataIdMap.get(g.dataId).id;
    return Ar(e, m, b, l, f, a, w), g;
  }
  const Uc = {
    kernelName: oa,
    backendName: "wasm",
    setupFunc: zc,
    kernelFunc: Gc
  };
  let xr;
  function jc(r) {
    xr = r.wasm.cwrap(ia, null, [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function qc(r) {
    const { inputs: n, attrs: s, backend: o } = r, { x: a, filter: t, bias: i, preluActivationWeights: d } = n, { strides: c, pad: u, dilations: e, dataFormat: m, dimRoundingMode: b, activation: l, leakyreluAlpha: f } = s, g = ut(a.shape, t.shape, c, e, u, b), w = at[l];
    if (w == null) throw new Error(`${l} activation not yet supported for FusedConv2D in the wasm backend.`);
    const k = o.dataIdMap.get(a.dataId).id, y = o.dataIdMap.get(t.dataId).id, _ = g.outChannels;
    let v = 0;
    if (i != null) {
      const ne = o.dataIdMap.get(i.dataId);
      if (ne.shape.length !== 1) throw new Error(`FusedConv2D only supports rank-1 bias but got rank ${ne.shape.length}.`);
      if (ne.shape[0] !== _) throw new Error(`FusedConv2D bias shape (${ne.shape}) does not match the number of output channels (${_})`);
      v = ne.id;
    }
    const E = g.filterHeight, R = g.filterWidth, B = g.padInfo.top, V = g.padInfo.right, z = g.padInfo.bottom, H = g.padInfo.left, U = g.dilationHeight, q = g.dilationWidth, Q = g.strideHeight, ue = g.strideWidth, X = g.inChannels, te = g.padInfo.type === "SAME" ? 1 : 0, pe = g.batchSize, G = g.inHeight, he = g.inWidth;
    if (m !== "NHWC") throw new Error(`wasm backend FusedConv2D does not support dataFormat:'${m}'. Please use 'NHWC'.`);
    const ie = o.makeOutput(g.outShape, "float32"), de = o.dataIdMap.get(ie.dataId).id, _e = d == null ? 0 : o.dataIdMap.get(d.dataId).id;
    return xr(k, pe, G, he, y, E, R, v, B, V, z, H, te, U, q, Q, ue, X, _, w, _e, f || 0, de), ie;
  }
  const Xc = {
    kernelName: ia,
    backendName: "wasm",
    setupFunc: jc,
    kernelFunc: qc
  };
  let Dr;
  function Kc(r) {
    Dr = r.wasm.cwrap(da, null, [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function Jc(r) {
    const { inputs: n, attrs: s, backend: o } = r, { x: a, filter: t, bias: i, preluActivationWeights: d } = n, { strides: c, pad: u, dilations: e, dataFormat: m, dimRoundingMode: b, activation: l, leakyreluAlpha: f } = s, g = ut(a.shape, t.shape, c, e, u, b, true), w = at[l];
    if (w == null) throw new Error(`${l} activation not yet supported for FusedDepthwiseConv2D in the wasm backend.`);
    const k = o.dataIdMap.get(a.dataId).id, y = o.dataIdMap.get(t.dataId).id, _ = g.outChannels;
    let v = 0;
    if (i != null) {
      const ne = o.dataIdMap.get(i.dataId);
      if (ne.shape.length !== 1) throw new Error(`FusedDepthwiseConv2D only supports rank-1 bias but got rank ${ne.shape.length}.`);
      if (ne.shape[0] !== _) throw new Error(`FusedDepthwiseConv2D bias shape (${ne.shape}) does not match the number of output channels (${_})`);
      v = ne.id;
    }
    const E = g.filterHeight, R = g.filterWidth, B = g.padInfo.top, V = g.padInfo.right, z = g.padInfo.bottom, H = g.padInfo.left, U = g.dilationHeight, q = g.dilationWidth, Q = g.strideHeight, ue = g.strideWidth, X = g.inChannels, te = g.padInfo.type === "SAME" ? 1 : 0, pe = g.batchSize, G = g.inHeight, he = g.inWidth;
    if (m !== "NHWC") throw new Error(`wasm backend FusedDepthwiseConv2D does not support dataFormat:'${m}'. Please use 'NHWC'.`);
    const ie = o.makeOutput(g.outShape, "float32"), de = o.dataIdMap.get(ie.dataId).id, _e = d == null ? 0 : o.dataIdMap.get(d.dataId).id;
    return Dr(k, pe, G, he, y, E, R, v, B, V, z, H, te, U, q, Q, ue, X, _, w, _e, f || 0, de), ie;
  }
  const Qc = {
    kernelName: da,
    backendName: "wasm",
    setupFunc: Kc,
    kernelFunc: Jc
  };
  let Nr;
  function Yc(r) {
    Nr = r.wasm.cwrap(ca, null, [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "array",
      "number"
    ]);
  }
  function Zc(r) {
    const { backend: n, inputs: s } = r, { params: o, indices: a } = s, [t, i, d, c] = Gu(o, a), u = n.makeOutput(t, o.dtype);
    if (i === 0) return u;
    const e = a.shape, m = e[e.length - 1], l = n.dataIdMap.get(o.dataId).id, g = n.dataIdMap.get(a.dataId).id, w = new Uint8Array(new Int32Array(c).buffer), k = n.dataIdMap.get(u.dataId).id;
    return Nr(l, $[o.dtype], g, i, m, d, w, k), u;
  }
  const ep = {
    kernelName: ca,
    backendName: "wasm",
    setupFunc: Yc,
    kernelFunc: Zc
  };
  let Cr;
  function tp(r) {
    Cr = r.wasm.cwrap("Gather", null, [
      "number",
      "number",
      "array",
      "number",
      "number",
      "number",
      "array",
      "number"
    ]);
  }
  function np(r) {
    const { backend: n, inputs: s, attrs: o } = r, { x: a, indices: t } = s, { axis: i, batchDims: d } = o, c = rt(i, a.shape)[0], u = n.readSync(t.dataId), e = a.shape[c];
    for (let z = 0; z < u.length; ++z) {
      const H = u[z];
      ge(H <= e - 1 && H >= 0, () => `GatherV2: the index value ${H} is not in [0, ${e - 1}]`);
    }
    const m = ju(a, t, c, d), b = oe({
      inputs: {
        x: a
      },
      attrs: {
        shape: [
          m.batchSize,
          m.outerSize,
          m.dimSize,
          m.sliceSize
        ]
      },
      backend: n
    }), l = F(t.shape), f = oe({
      inputs: {
        x: t
      },
      attrs: {
        shape: [
          m.batchSize,
          l / m.batchSize
        ]
      },
      backend: n
    }), g = [
      m.batchSize,
      m.outerSize,
      l / m.batchSize,
      m.sliceSize
    ], w = n.makeOutput(g, a.dtype);
    if (F(a.shape) === 0) return w;
    const k = b.shape.length - 1, _ = n.dataIdMap.get(b.dataId).id, E = n.dataIdMap.get(f.dataId).id, R = n.dataIdMap.get(w.dataId).id, B = new Uint8Array(new Int32Array(fe(b.shape)).buffer), V = new Uint8Array(new Int32Array(fe(g)).buffer);
    return Cr(_, $[a.dtype], B, k, E, m.batchSize, V, R), n.disposeData(b.dataId), n.disposeData(f.dataId), w.shape = m.outputShape, w;
  }
  const ap = {
    kernelName: Uu,
    backendName: "wasm",
    setupFunc: tp,
    kernelFunc: np
  };
  const rp = false, sp = ee(qu, rp, "bool");
  const up = false, op = ee(Xu, up, "bool");
  const ip = L(Ku, "bool");
  const dp = L(Ju, "bool");
  const cp = L(Qu, "bool");
  let Fr;
  function pp(r) {
    Fr = r.wasm.cwrap(pa, null, [
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function lp(r) {
    const { inputs: { x: n }, attrs: { alpha: s }, backend: o } = r, a = o.dataIdMap.get(n.dataId).id, t = o.makeOutput(n.shape, "float32");
    if (F(n.shape) !== 0) {
      const i = o.dataIdMap.get(t.dataId).id;
      Fr(a, $[n.dtype], s, i);
    }
    return t;
  }
  const mp = {
    kernelName: pa,
    backendName: "wasm",
    setupFunc: pp,
    kernelFunc: lp
  };
  const fp = false, hp = ee(Yu, fp, "bool");
  const gp = false, bp = ee(Zu, gp, "bool");
  let Rr;
  function _p(r) {
    Rr = r.wasm.cwrap(la, null, [
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function yp(r) {
    const { attrs: n, backend: s } = r, { start: o, stop: a, num: t } = n, i = Math.floor(t), d = s.makeOutput([
      i
    ], "float32");
    return Rr(s.dataIdMap.get(d.dataId).id, o, a, i), d;
  }
  const Ip = {
    kernelName: la,
    backendName: "wasm",
    setupFunc: _p,
    kernelFunc: yp
  };
  const wp = L(eo);
  const kp = L(to);
  const Sp = false, Mp = ee(no, Sp, "bool");
  const vp = L(ao);
  const Ap = false, xp = ee(ro, Ap, "bool");
  const Dp = false, Np = ee(so, Dp, "bool");
  let Er;
  function Cp(r) {
    Er = r.wasm.cwrap(ma, null, [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function Fp(r) {
    const { inputs: n, backend: s, attrs: o } = r, { x: a } = n, { depthRadius: t, bias: i, alpha: d, beta: c } = o;
    if (a.dtype !== "float32") throw new Error("LRN error: x must have dtype float32");
    const u = s.makeOutput(a.shape, a.dtype);
    return Er(s.dataIdMap.get(a.dataId).id, s.dataIdMap.get(u.dataId).id, a.shape[3], t, i, d, c), u;
  }
  const Rp = {
    kernelName: ma,
    backendName: "wasm",
    setupFunc: Cp,
    kernelFunc: Fp
  };
  let Pr;
  function Ep(r) {
    Pr = r.wasm.cwrap(fa, null, [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function Pp(r) {
    const { inputs: n, backend: s, attrs: o } = r, { x: a, y: t, dy: i } = n, { depthRadius: d, bias: c, alpha: u, beta: e } = o;
    if (a.dtype !== "float32" || t.dtype !== "float32" || i.dtype !== "float32") throw new Error("LRNGrad error: x, y, and dy must have dtype float32");
    const m = s.makeOutput(a.shape, a.dtype);
    return Pr(s.dataIdMap.get(a.dataId).id, s.dataIdMap.get(t.dataId).id, s.dataIdMap.get(i.dataId).id, s.dataIdMap.get(m.dataId).id, i.shape[3], d, c, u, e), m;
  }
  const Wp = {
    kernelName: fa,
    backendName: "wasm",
    setupFunc: Ep,
    kernelFunc: Pp
  };
  let Wr;
  function Tp(r) {
    Wr = r.wasm.cwrap(ha, null, [
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function Bp(r) {
    const { backend: n, inputs: s, attrs: o } = r, { reductionIndices: a, keepDims: t } = o, { x: i } = s;
    let c = n.dataIdMap.get(i.dataId).id, u = i;
    const { transposed: e, axes: m, originalAxes: b, inputWasTransposed: l } = xe(i, a, n);
    if (l) {
      const _ = n.dataIdMap.get(e.dataId).id;
      u = e, c = _;
    }
    const f = u.shape.length;
    Se("max", m, f);
    const [g, w] = Be(u.shape, m), k = F(w), y = n.makeOutput(g, i.dtype);
    if (F(u.shape) !== 0) {
      const _ = n.dataIdMap.get(y.dataId).id;
      Wr(c, $[i.dtype], k, _);
    }
    if (l && n.disposeData(e.dataId), t) {
      const _ = Oe(y.shape, b);
      y.shape = _;
    }
    return y;
  }
  const Op = {
    kernelName: ha,
    backendName: "wasm",
    setupFunc: Tp,
    kernelFunc: Bp
  };
  const Hp = ee(uo);
  let Tr;
  function Lp(r) {
    Tr = r.wasm.cwrap(ga, null, [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function Vp(r) {
    const { inputs: n, attrs: s, backend: o } = r, a = n.x, t = o.dataIdMap.get(a.dataId).id;
    ge(a.dtype === "float32", () => `Error in MaxPool: only float32 input is supported. Got ${a.dtype}.`);
    const { filterSize: i, strides: d, pad: c, dimRoundingMode: u } = s, e = st(a.shape, i, d, 1, c, u), m = e.filterHeight, b = e.filterWidth, l = e.padInfo.top, f = e.padInfo.right, g = e.padInfo.bottom, w = e.padInfo.left, k = e.dilationHeight, y = e.dilationWidth, _ = e.strideHeight, v = e.strideWidth, E = e.inChannels, R = e.outChannels;
    if (e.dataFormat !== "channelsLast") throw new Error(`wasm backend does not support dataFormat:'${e.dataFormat}'. Please use 'channelsLast'.`);
    const B = o.makeOutput(e.outShape, "float32"), V = o.dataIdMap.get(B.dataId).id;
    return Tr(t, a.shape[0], a.shape[1], a.shape[2], m, b, l, f, g, w, k, y, _, v, E, R, V), B;
  }
  const $p = {
    kernelName: ga,
    backendName: "wasm",
    setupFunc: Lp,
    kernelFunc: Vp
  };
  let Br;
  function zp(r) {
    Br = r.wasm.cwrap("MaxPool3D", null, [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function Gp(r) {
    const { inputs: n, backend: s, attrs: o } = r, { x: a } = n, { filterSize: t, strides: i, pad: d, dimRoundingMode: c, dataFormat: u } = o, e = Ft(a.shape, t, i, 1, d, c, u), m = s.makeOutput(e.outShape, a.dtype);
    return Br(s.dataIdMap.get(a.dataId).id, s.dataIdMap.get(m.dataId).id, e.batchSize, e.inChannels, e.inDepth, e.inHeight, e.inWidth, e.outDepth, e.outHeight, e.outWidth, e.strideDepth, e.strideHeight, e.strideWidth, e.dilationDepth, e.dilationHeight, e.dilationWidth, e.effectiveFilterDepth, e.effectiveFilterHeight, e.effectiveFilterWidth, e.padInfo.front, e.padInfo.top, e.padInfo.left), m;
  }
  const Up = {
    kernelName: oo,
    backendName: "wasm",
    setupFunc: zp,
    kernelFunc: Gp
  };
  let Or;
  function jp(r) {
    Or = r.wasm.cwrap("MaxPool3DGrad", null, [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function qp(r) {
    const { inputs: n, backend: s, attrs: o } = r, { dy: a, input: t } = n, { filterSize: i, strides: d, pad: c, dimRoundingMode: u } = o, e = Ft(t.shape, i, d, 1, c, u), m = s.makeOutput(t.shape, t.dtype);
    return Or(s.dataIdMap.get(t.dataId).id, s.dataIdMap.get(a.dataId).id, s.dataIdMap.get(m.dataId).id, e.batchSize, e.inChannels, e.inDepth, e.inHeight, e.inWidth, e.outDepth, e.outHeight, e.outWidth, e.strideDepth, e.strideHeight, e.strideWidth, e.dilationDepth, e.dilationHeight, e.dilationWidth, e.effectiveFilterDepth, e.effectiveFilterHeight, e.effectiveFilterWidth, e.padInfo.front, e.padInfo.top, e.padInfo.left), m;
  }
  const Xp = {
    kernelName: io,
    backendName: "wasm",
    setupFunc: jp,
    kernelFunc: qp
  };
  let Hr;
  function Kp(r) {
    Hr = r.wasm.cwrap("MaxPoolGrad", null, [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function Jp(r) {
    const { inputs: n, backend: s, attrs: o } = r, { dy: a, input: t } = n, { filterSize: i, strides: d, pad: c, dimRoundingMode: u } = o, e = st(t.shape, i, d, 1, c, u), m = s.makeOutput(t.shape, t.dtype);
    return Hr(s.dataIdMap.get(t.dataId).id, s.dataIdMap.get(a.dataId).id, s.dataIdMap.get(m.dataId).id, e.batchSize, e.inChannels, e.inHeight, e.inWidth, e.outHeight, e.outWidth, e.strideHeight, e.strideWidth, e.dilationHeight, e.dilationWidth, e.effectiveFilterHeight, e.effectiveFilterWidth, e.padInfo.top, e.padInfo.left), m;
  }
  const Qp = {
    kernelName: co,
    backendName: "wasm",
    setupFunc: Kp,
    kernelFunc: Jp
  };
  let Lr;
  function Yp(r) {
    Lr = r.wasm.cwrap("MaxPoolWithArgmax", null, [
      "number",
      "number",
      "number",
      "number",
      "boolean",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function Zp(r) {
    const { inputs: n, backend: s, attrs: o } = r, { x: a } = n, { filterSize: t, strides: i, pad: d, includeBatchInIndex: c } = o;
    ge(a.shape.length === 4, () => `Error in maxPool: input must be rank 4 but got rank ${a.shape.length}.`);
    const u = [
      1,
      1
    ];
    ge(lo(i, u), () => `Error in maxPool: Either strides or dilations must be 1. Got strides ${i} and dilations '${u}'`);
    const e = st(a.shape, t, i, [
      1,
      1
    ], d), m = s.makeOutput(e.outShape, a.dtype), b = s.makeOutput(e.outShape, "int32");
    return Lr(s.dataIdMap.get(a.dataId).id, s.dataIdMap.get(m.dataId).id, s.dataIdMap.get(b.dataId).id, $[a.dtype], c, e.batchSize, e.inChannels, e.inHeight, e.inWidth, e.outHeight, e.outWidth, e.strideHeight, e.strideWidth, e.dilationHeight, e.dilationWidth, e.effectiveFilterHeight, e.effectiveFilterWidth, e.padInfo.top, e.padInfo.left), [
      m,
      b
    ];
  }
  const el = {
    kernelName: po,
    backendName: "wasm",
    setupFunc: Yp,
    kernelFunc: Zp
  };
  let Vr;
  function tl(r) {
    Vr = r.wasm.cwrap(ba, null, [
      "number, number, number"
    ]);
  }
  function nl(r) {
    const { backend: n, inputs: s, attrs: o } = r, { axis: a, keepDims: t } = o, { x: i } = s, d = n.dataIdMap.get(i.dataId).id;
    let c = d, u = i;
    const { transposed: e, axes: m, originalAxes: b, inputWasTransposed: l } = xe(i, a, n);
    let f = m;
    if (l) {
      const v = n.dataIdMap.get(e.dataId).id;
      v !== d && (u = e, c = v, f = je(f.length, u.shape.length));
    }
    Se("mean", f, u.shape.length);
    const [g, w] = Be(u.shape, f), k = F(w);
    let y = u;
    u.dtype !== "float32" && (y = De({
      backend: n,
      inputs: {
        x: u
      },
      attrs: {
        dtype: "float32"
      }
    }), c = n.dataIdMap.get(y.dataId).id);
    const _ = n.makeOutput(g, "float32");
    if (F(u.shape) !== 0) {
      const v = n.dataIdMap.get(_.dataId).id;
      Vr(c, k, v);
    }
    if (l && n.disposeData(e.dataId), t) {
      const v = Oe(_.shape, b);
      _.shape = v;
    }
    return u.dtype !== "float32" && n.disposeData(y.dataId), _;
  }
  const al = {
    kernelName: ba,
    backendName: "wasm",
    setupFunc: tl,
    kernelFunc: nl
  };
  let $r;
  function rl(r) {
    $r = r.wasm.cwrap(_a, null, [
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function sl(r) {
    const { backend: n, inputs: s, attrs: o } = r, { axis: a, keepDims: t } = o, { x: i } = s, d = n.dataIdMap.get(i.dataId).id;
    let c = d, u = i;
    const { transposed: e, axes: m, originalAxes: b, inputWasTransposed: l } = xe(i, a, n);
    if (l) {
      const _ = n.dataIdMap.get(e.dataId).id;
      _ !== d && (u = e, c = _);
    }
    const f = u.shape.length;
    Se("min", m, f);
    const [g, w] = Be(u.shape, m), k = F(w), y = n.makeOutput(g, u.dtype);
    if (F(u.shape) !== 0) {
      const _ = n.dataIdMap.get(y.dataId).id;
      $r(c, $[i.dtype], k, _);
    }
    if (l && n.disposeData(e.dataId), t) {
      const _ = Oe(y.shape, b);
      y.shape = _;
    }
    return y;
  }
  const ul = {
    kernelName: _a,
    backendName: "wasm",
    setupFunc: rl,
    kernelFunc: sl
  };
  const ol = ee(mo);
  var Yt;
  (function(r) {
    r[r.reflect = 0] = "reflect", r[r.symmetric = 1] = "symmetric";
  })(Yt || (Yt = {}));
  let zr;
  function il(r) {
    zr = r.wasm.cwrap(ya, null, [
      "number",
      "array",
      "number",
      "number",
      "array",
      "array",
      "number",
      "number"
    ]);
  }
  function dl(r) {
    const { inputs: { x: n }, backend: s, attrs: { paddings: o, mode: a } } = r, t = o.map((f, g) => f[0] + n.shape[g] + f[1]), i = s.dataIdMap.get(n.dataId).id, d = s.makeOutput(t, n.dtype), c = s.dataIdMap.get(d.dataId).id, u = new Uint8Array(new Int32Array(n.shape).buffer), e = o.map((f) => f[0]), m = o.map((f) => f[1]), b = new Uint8Array(new Int32Array(e).buffer), l = new Uint8Array(new Int32Array(m).buffer);
    return zr(i, u, n.shape.length, $[n.dtype], b, l, Yt[a], c), d;
  }
  const cl = {
    kernelName: ya,
    backendName: "wasm",
    kernelFunc: dl,
    setupFunc: il
  };
  let Gr;
  function pl(r) {
    Gr = r.wasm.cwrap(Ia, null, [
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function Ur(r) {
    const { backend: n, inputs: { logits: s }, attrs: { dim: o } } = r, a = n.dataIdMap.get(s.dataId).id, t = n.makeOutput(s.shape, s.dtype), i = n.dataIdMap.get(t.dataId).id, d = s.shape[o], c = F(s.shape) / d;
    return F(t.shape) === 0 || Gr(a, i, d, c), t;
  }
  const ll = {
    kernelName: Ia,
    backendName: "wasm",
    setupFunc: pl,
    kernelFunc: Ur
  };
  let jr;
  function ml(r) {
    jr = r.wasm.cwrap(wa, null, [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function fl(r) {
    const { inputs: n, backend: s, attrs: o } = r, { logits: a } = n, { numSamples: t, seed: i, normalized: d } = o;
    if (a.dtype !== "float32") throw new Error(`Tensor logits must have dtype float32, got ${a.dtype}`);
    const c = d ? a : Ur({
      inputs: {
        logits: a
      },
      backend: s,
      attrs: {
        dim: a.shape.length - 1
      }
    }), [u, e] = c.shape, m = s.makeOutput([
      u,
      t
    ], "int32");
    return jr(s.dataIdMap.get(c.dataId).id, u, e, t, i, s.dataIdMap.get(m.dataId).id), d || s.disposeData(c.dataId), m;
  }
  const hl = {
    kernelName: wa,
    backendName: "wasm",
    setupFunc: ml,
    kernelFunc: fl
  };
  const gl = ee(fo);
  const bl = ee(ho);
  const _l = L(go);
  function sn(r, n) {
    const s = new Int32Array(r.wasm.HEAPU8.buffer, n, 4), o = s[0], a = s[1], t = s[2], i = s[3];
    return r.wasm._free(n), {
      pSelectedIndices: o,
      selectedSize: a,
      pSelectedScores: t,
      pValidOutputs: i
    };
  }
  let qr;
  function yl(r) {
    qr = r.wasm.cwrap(ka, "number", [
      "number",
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function Il(r) {
    const { backend: n, inputs: s, attrs: o } = r, { iouThreshold: a, maxOutputSize: t, scoreThreshold: i } = o, { boxes: d, scores: c } = s, u = n.dataIdMap.get(d.dataId).id, e = n.dataIdMap.get(c.dataId).id, m = qr(u, e, t, a, i), { pSelectedIndices: b, selectedSize: l, pSelectedScores: f, pValidOutputs: g } = sn(n, m);
    return n.wasm._free(f), n.wasm._free(g), n.makeOutput([
      l
    ], "int32", b);
  }
  const wl = {
    kernelName: ka,
    backendName: "wasm",
    setupFunc: yl,
    kernelFunc: Il
  };
  let Xr;
  function kl(r) {
    Xr = r.wasm.cwrap(Sa, "number", [
      "number",
      "number",
      "number",
      "number",
      "number",
      "bool"
    ]);
  }
  function Sl(r) {
    const { backend: n, inputs: s, attrs: o } = r, { iouThreshold: a, maxOutputSize: t, scoreThreshold: i, padToMaxOutputSize: d } = o, { boxes: c, scores: u } = s, e = n.dataIdMap.get(c.dataId).id, m = n.dataIdMap.get(u.dataId).id, b = Xr(e, m, t, a, i, d), { pSelectedIndices: l, selectedSize: f, pSelectedScores: g, pValidOutputs: w } = sn(n, b);
    n.wasm._free(g);
    const k = n.makeOutput([
      f
    ], "int32", l), y = n.makeOutput([], "int32", w);
    return [
      k,
      y
    ];
  }
  const Ml = {
    kernelName: Sa,
    backendName: "wasm",
    setupFunc: kl,
    kernelFunc: Sl
  };
  let Kr;
  function vl(r) {
    Kr = r.wasm.cwrap(Ma, "number", [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function Al(r) {
    const { backend: n, inputs: s, attrs: o } = r, { iouThreshold: a, maxOutputSize: t, scoreThreshold: i, softNmsSigma: d } = o, { boxes: c, scores: u } = s, e = n.dataIdMap.get(c.dataId).id, m = n.dataIdMap.get(u.dataId).id, b = Kr(e, m, t, a, i, d), { pSelectedIndices: l, selectedSize: f, pSelectedScores: g, pValidOutputs: w } = sn(n, b);
    n.wasm._free(w);
    const k = n.makeOutput([
      f
    ], "int32", l), y = n.makeOutput([
      f
    ], "float32", g);
    return [
      k,
      y
    ];
  }
  const xl = {
    kernelName: Ma,
    backendName: "wasm",
    setupFunc: vl,
    kernelFunc: Al
  };
  const Dl = false, Nl = ee(bo, Dl, "bool");
  let Jr;
  function Cl(r) {
    Jr = r.wasm.cwrap(va, null, [
      "number",
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function Fl(r) {
    const { inputs: n, backend: s, attrs: o } = r, { indices: a } = n, { dtype: t, depth: i, onValue: d, offValue: c } = o, u = s.makeOutput([
      ...a.shape,
      i
    ], t), e = s.dataIdMap.get(u.dataId).id, b = s.dataIdMap.get(a.dataId).id;
    return Jr(b, i, d, c, e), u;
  }
  const Rl = {
    kernelName: va,
    backendName: "wasm",
    setupFunc: Cl,
    kernelFunc: Fl
  };
  function El(r) {
    const { inputs: { x: n }, backend: s } = r, o = s.makeOutput(n.shape, n.dtype);
    return s.typedArrayFromHeap(o).fill(1), o;
  }
  const Pl = {
    kernelName: _o,
    backendName: "wasm",
    kernelFunc: El
  };
  function Wl(r) {
    const { inputs: n, backend: s, attrs: o } = r, { axis: a } = o;
    if (n.length === 1) return Qt({
      inputs: {
        input: n[0]
      },
      backend: s,
      attrs: {
        dim: a
      }
    });
    const t = n[0].shape, i = n[0].dtype;
    n.forEach((e) => {
      Io(t, e.shape, "All tensors passed to stack must have matching shapes"), ge(i === e.dtype, () => "All tensors passed to stack must have matching dtypes");
    });
    const d = [], c = n.map((e) => {
      const m = Qt({
        inputs: {
          input: e
        },
        backend: s,
        attrs: {
          dim: a
        }
      });
      return d.push(m), m;
    }), u = or({
      inputs: c,
      backend: s,
      attrs: {
        axis: a
      }
    });
    return d.forEach((e) => s.disposeData(e.dataId)), u;
  }
  const Tl = {
    kernelName: yo,
    backendName: "wasm",
    kernelFunc: Wl
  };
  let Qr;
  function Bl(r) {
    Qr = r.wasm.cwrap(Aa, null, [
      "number",
      "array",
      "number",
      "number",
      "array",
      "array",
      "number",
      "number"
    ]);
  }
  function Ol(r) {
    const { inputs: { x: n }, backend: s, attrs: { paddings: o, constantValue: a } } = r, t = o.map((g, w) => g[0] + n.shape[w] + g[1]);
    if (F(n.shape) === 0) return Mr({
      backend: s,
      attrs: {
        shape: t,
        value: a,
        dtype: n.dtype
      }
    });
    const i = s.dataIdMap.get(n.dataId).id, d = s.makeOutput(t, n.dtype), u = s.dataIdMap.get(d.dataId).id, e = new Uint8Array(new Int32Array(n.shape).buffer), m = o.map((g) => g[0]), b = o.map((g) => g[1]), l = new Uint8Array(new Int32Array(m).buffer), f = new Uint8Array(new Int32Array(b).buffer);
    return Qr(i, e, n.shape.length, $[n.dtype], l, f, a, u), d;
  }
  const Yr = {
    kernelName: Aa,
    backendName: "wasm",
    kernelFunc: Ol,
    setupFunc: Bl
  };
  const Hl = ee(wo);
  let Zr;
  function Ll(r) {
    Zr = r.wasm.cwrap(xa, null, [
      "number",
      "number",
      "number"
    ]);
  }
  function Vl(r) {
    const { inputs: n, backend: s } = r, { x: o, alpha: a } = n, t = s.dataIdMap.get(o.dataId).id, i = s.dataIdMap.get(a.dataId).id;
    let d = t;
    const c = o;
    let u = c;
    c.dtype !== "float32" && (u = De({
      backend: s,
      inputs: {
        x: o
      },
      attrs: {
        dtype: "float32"
      }
    }), d = s.dataIdMap.get(u.dataId).id);
    const e = s.makeOutput(o.shape, "float32"), m = s.dataIdMap.get(e.dataId).id;
    return Zr(d, i, m), c.dtype !== "float32" && s.disposeData(u.dataId), e;
  }
  const $l = {
    kernelName: xa,
    backendName: "wasm",
    setupFunc: Ll,
    kernelFunc: Vl
  };
  let es;
  function zl(r) {
    es = r.wasm.cwrap(Da, null, [
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function Gl(r) {
    const { backend: n, inputs: s, attrs: o } = r, { axis: a, keepDims: t } = o, { x: i } = s, d = n.dataIdMap.get(i.dataId).id;
    let c = d, u = i;
    const { transposed: e, axes: m, originalAxes: b, inputWasTransposed: l } = xe(i, a, n);
    let f = m;
    if (l) {
      const _ = n.dataIdMap.get(e.dataId).id;
      _ !== d && (u = e, c = _, f = je(f.length, u.shape.length));
    }
    Se("prod", f, u.shape.length);
    const [g, w] = Be(u.shape, f), k = F(w), y = n.makeOutput(g, u.dtype);
    if (F(u.shape) !== 0) {
      const _ = n.dataIdMap.get(y.dataId).id;
      es(c, k, $[y.dtype], _);
    }
    if (l && n.disposeData(e.dataId), t) {
      const _ = Oe(y.shape, b);
      y.shape = _;
    }
    return y;
  }
  const Ul = {
    kernelName: Da,
    backendName: "wasm",
    setupFunc: zl,
    kernelFunc: Gl
  };
  const jl = (r) => {
    const { backend: n, attrs: s } = r, { start: o, stop: a, step: t, dtype: i } = s, d = So(o, a, t, i), c = n.makeOutput([
      d.length
    ], i);
    return n.typedArrayFromHeap(c).set(d), c;
  }, ql = {
    kernelName: ko,
    backendName: "wasm",
    kernelFunc: jl
  };
  const Xl = ee(Mo);
  const Kl = L(vo);
  const Jl = L(Ao);
  const Ql = L(xo);
  let ts;
  function Yl(r) {
    ts = r.wasm.cwrap(Na, null, [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function Zl(r) {
    const { backend: n, inputs: s, attrs: o } = r, { images: a } = s, { alignCorners: t, halfPixelCenters: i, size: d } = o, [c, u] = d, [e, m, b, l] = a.shape, f = [
      e,
      c,
      u,
      l
    ];
    let g = n.dataIdMap.get(a.dataId), w;
    g.dtype !== "float32" && (w = De({
      backend: n,
      inputs: {
        x: a
      },
      attrs: {
        dtype: "float32"
      }
    }), g = n.dataIdMap.get(w.dataId));
    const k = g.id, y = n.makeOutput(f, "float32");
    if (F(a.shape) === 0) return y;
    const _ = n.dataIdMap.get(y.dataId).id;
    return ts(k, e, m, b, l, c, u, t ? 1 : 0, i ? 1 : 0, _), w != null && n.disposeData(w.dataId), y;
  }
  const em = {
    kernelName: Na,
    backendName: "wasm",
    setupFunc: Yl,
    kernelFunc: Zl
  };
  let ns;
  function tm(r) {
    ns = r.wasm.cwrap(Ca, null, [
      "number",
      "number",
      "number",
      "array",
      "array",
      "boolean"
    ]);
  }
  function nm(r) {
    const { inputs: n, backend: s, attrs: o } = r, { images: a, dy: t } = n, { alignCorners: i } = o, d = s.makeOutput(a.shape, "float32");
    let c = s.dataIdMap.get(a.dataId), u;
    return c.dtype !== "float32" && (u = De({
      backend: s,
      inputs: {
        x: a
      },
      attrs: {
        dtype: "float32"
      }
    }), c = s.dataIdMap.get(u.dataId)), ns(s.dataIdMap.get(a.dataId).id, s.dataIdMap.get(t.dataId).id, s.dataIdMap.get(d.dataId).id, new Uint8Array(new Int32Array(a.shape).buffer), new Uint8Array(new Int32Array(t.shape).buffer), i), u != null && s.disposeData(u.dataId), d;
  }
  const am = {
    kernelName: Ca,
    backendName: "wasm",
    setupFunc: tm,
    kernelFunc: nm
  };
  let as;
  function rm(r) {
    as = r.wasm.cwrap(Fa, null, [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function sm(r) {
    const { backend: n, inputs: s, attrs: o } = r, { images: a } = s, { alignCorners: t, halfPixelCenters: i, size: d } = o, [c, u] = d, [e, m, b, l] = a.shape, f = [
      e,
      c,
      u,
      l
    ], g = n.makeOutput(f, "float32");
    if (F(a.shape) === 0) return g;
    let w = n.dataIdMap.get(a.dataId), k;
    w.dtype !== "float32" && (k = De({
      backend: n,
      inputs: {
        x: a
      },
      attrs: {
        dtype: "float32"
      }
    }), w = n.dataIdMap.get(k.dataId));
    const y = w.id, _ = n.dataIdMap.get(g.dataId).id;
    return as(y, e, m, b, l, c, u, t ? 1 : 0, i ? 1 : 0, _), k != null && n.disposeData(k.dataId), g;
  }
  const um = {
    kernelName: Fa,
    backendName: "wasm",
    setupFunc: rm,
    kernelFunc: sm
  };
  let rs;
  function om(r) {
    rs = r.wasm.cwrap(Ra, null, [
      "number",
      "number",
      "number",
      "array",
      "array",
      "boolean"
    ]);
  }
  function im(r) {
    const { inputs: n, backend: s, attrs: o } = r, { images: a, dy: t } = n, { alignCorners: i } = o, d = s.makeOutput(a.shape, "float32");
    let c = s.dataIdMap.get(a.dataId), u;
    return c.dtype !== "float32" && (u = De({
      backend: s,
      inputs: {
        x: a
      },
      attrs: {
        dtype: "float32"
      }
    }), c = s.dataIdMap.get(u.dataId)), rs(s.dataIdMap.get(a.dataId).id, s.dataIdMap.get(t.dataId).id, s.dataIdMap.get(d.dataId).id, new Uint8Array(new Int32Array(a.shape).buffer), new Uint8Array(new Int32Array(t.shape).buffer), i), u != null && s.disposeData(u.dataId), d;
  }
  const dm = {
    kernelName: Ra,
    backendName: "wasm",
    setupFunc: om,
    kernelFunc: im
  };
  let ss;
  function cm(r) {
    ss = r.wasm.cwrap(Ea, null, [
      "number",
      "array",
      "number",
      "array",
      "number",
      "number"
    ]);
  }
  function pm(r) {
    const { inputs: n, backend: s, attrs: o } = r, { x: a } = n, { dims: t } = o, i = rt(t, a.shape);
    if (a.shape.length === 0) return Rt({
      inputs: {
        x: a
      },
      backend: s
    });
    const d = s.makeOutput(a.shape, a.dtype), c = s.dataIdMap.get(a.dataId).id, u = s.dataIdMap.get(d.dataId).id, e = new Uint8Array(new Int32Array(i).buffer), m = new Uint8Array(new Int32Array(a.shape).buffer);
    ss(c, e, i.length, m, a.shape.length, u);
    const b = oe({
      inputs: {
        x: d
      },
      attrs: {
        shape: a.shape
      },
      backend: s
    });
    return s.disposeData(d.dataId), b;
  }
  const lm = {
    kernelName: Ea,
    backendName: "wasm",
    kernelFunc: pm,
    setupFunc: cm
  };
  let us;
  function mm(r) {
    us = r.wasm.cwrap(Pa, null, [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "array",
      "number",
      "number"
    ]);
  }
  function fm(r) {
    const { inputs: n, backend: s, attrs: o } = r, { image: a } = n, { radians: t, fillValue: i, center: d } = o, c = s.makeOutput(a.shape, a.dtype), u = s.dataIdMap.get(a.dataId).id, e = s.dataIdMap.get(c.dataId).id, [m, b, l, f] = a.shape, [g, w] = Do(d, b, l), k = i === 0, y = 255, _ = typeof i == "number" ? [
      i,
      i,
      i,
      k ? 0 : y
    ] : [
      ...i,
      y
    ], v = new Uint8Array(new Int32Array(_).buffer);
    return us(u, m, b, l, f, t, g, w, v, _.length, e), c;
  }
  const hm = {
    kernelName: Pa,
    backendName: "wasm",
    kernelFunc: fm,
    setupFunc: mm
  };
  const gm = L(No);
  const bm = L(Co);
  let os;
  function _m(r) {
    os = r.wasm.cwrap(Wa, null, [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "array",
      "number",
      "number"
    ]);
  }
  function ym(r) {
    const { backend: n, inputs: s, attrs: o } = r, { indices: a, updates: t } = s, { shape: i } = o, d = n.makeOutput(i, t.dtype);
    if (F(i) === 0) return d;
    const { sliceRank: c, numUpdates: u, sliceSize: e, strides: m, outputSize: b } = rn(t, a, i), f = n.dataIdMap.get(a.dataId).id, w = n.dataIdMap.get(t.dataId).id, k = new Uint8Array(new Int32Array(m).buffer), y = n.dataIdMap.get(d.dataId).id;
    return os(f, w, $[t.dtype], c, u, e, k, b, y), d;
  }
  const Im = {
    kernelName: Wa,
    backendName: "wasm",
    setupFunc: _m,
    kernelFunc: ym
  };
  let is;
  function wm(r) {
    is = r.wasm.cwrap(Ta, null, [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "bool",
      "number"
    ]);
  }
  function km(r) {
    const { inputs: n, backend: s, attrs: o } = r, { sortedSequence: a, values: t } = n, { side: i } = o;
    if (a.dtype !== t.dtype) throw new Error(`SearchSorted error: sorted_sequence must have the same dtype as values. Got ${a.dtype} and ${t.dtype}`);
    const d = s.makeOutput(t.shape, "int32");
    function c(u) {
      return s.dataIdMap.get(u.dataId).id;
    }
    return is(c(a), c(t), a.shape[0], a.shape[1], t.shape[1], $[a.dtype], i === "left", c(d)), d;
  }
  const Sm = {
    kernelName: Ta,
    backendName: "wasm",
    setupFunc: wm,
    kernelFunc: km
  };
  let ds;
  function Mm(r) {
    ds = r.wasm.cwrap("SelectV2", null, [
      "number",
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function vm(r) {
    const { inputs: n, backend: s } = r, { condition: o, t: a, e: t } = n, i = s.dataIdMap.get(o.dataId).id, d = s.dataIdMap.get(a.dataId).id, c = s.dataIdMap.get(t.dataId).id, u = s.makeOutput(a.shape, a.dtype), e = s.dataIdMap.get(u.dataId).id, m = o.shape.length, b = a.shape.length, l = m === 0 || m > 1 || b === 1 ? 1 : F(a.shape.slice(1));
    return ds(i, d, c, l, e), u;
  }
  const Am = {
    kernelName: Fo,
    backendName: "wasm",
    kernelFunc: vm,
    setupFunc: Mm
  };
  const xm = L(Ro);
  let cs;
  function Dm(r) {
    cs = r.wasm.cwrap(Eo, null, [
      "number",
      "number"
    ]);
  }
  function Nm(r) {
    const { backend: n, inputs: { x: s } } = r, o = n.dataIdMap.get(s.dataId).id, a = n.makeOutput(s.shape, s.dtype), t = n.dataIdMap.get(a.dataId).id;
    return F(a.shape) === 0 || cs(o, t), a;
  }
  const Cm = {
    kernelName: "Sigmoid",
    backendName: "wasm",
    setupFunc: Dm,
    kernelFunc: Nm
  };
  const Fm = L(Po);
  const Rm = L(Wo);
  const Em = L(To);
  const Pm = L(Bo);
  function Wm(r) {
    const { inputs: n, backend: s, attrs: o } = r, { x: a } = n, { blockShape: t, paddings: i } = o, d = F(t), c = [
      [
        0,
        0
      ]
    ];
    c.push(...i);
    for (let R = 1 + t.length; R < a.shape.length; ++R) c.push([
      0,
      0
    ]);
    const u = Yr.kernelFunc({
      inputs: {
        x: a
      },
      backend: s,
      attrs: {
        paddings: c,
        constantValue: 0
      }
    }), e = Hn(u.shape, t, d, false), m = Ln(e.length, t.length, false), b = Vn(u.shape, t, d, false), g = oe({
      inputs: {
        x: u
      },
      backend: s,
      attrs: {
        shape: e
      }
    }), y = Ae({
      inputs: {
        x: g
      },
      backend: s,
      attrs: {
        perm: m
      }
    }), E = oe({
      inputs: {
        x: y
      },
      backend: s,
      attrs: {
        shape: b
      }
    });
    return s.disposeData(u.dataId), s.disposeData(g.dataId), s.disposeData(y.dataId), E;
  }
  const Tm = {
    kernelName: Oo,
    backendName: "wasm",
    kernelFunc: Wm
  };
  let ps;
  function Bm(r) {
    ps = r.wasm.cwrap("SparseFillEmptyRows", "number", [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function Om(r) {
    const { backend: n, inputs: s } = r, { indices: o, values: a, denseShape: t, defaultValue: i } = s, d = o.shape[0], c = o.shape[1], u = n.readSync(t.dataId)[0], e = [
      d + u,
      c
    ], m = n.dataIdMap.get(o.dataId).id, b = n.dataIdMap.get(a.dataId).id, l = n.dataIdMap.get(i.dataId).id, f = n.makeOutput(e, o.dtype), g = n.dataIdMap.get(f.dataId).id, w = n.makeOutput(e.slice(0, 1), a.dtype), k = n.dataIdMap.get(w.dataId).id, y = n.makeOutput([
      u
    ], "bool"), _ = n.dataIdMap.get(y.dataId).id, v = n.makeOutput([
      d
    ], o.dtype), E = n.dataIdMap.get(v.dataId).id, R = n.makeOutput([
      4
    ], "int32"), B = n.dataIdMap.get(R.dataId).id, V = ps(m, b, $[a.dtype], d, u, c, l, g, k, _, E, B), z = n.readSync(R.dataId);
    let H;
    switch (z[0]) {
      case 1: {
        H = $o(z[1]);
        break;
      }
      case 2: {
        H = Vo(z[1], z[2]);
        break;
      }
      case 3:
        H = Lo(z[1], z[2], z[3]);
        break;
      default:
        H = "";
    }
    if (n.disposeData(R.dataId), H) throw n.disposeData(f.dataId), n.disposeData(w.dataId), n.disposeData(y.dataId), n.disposeData(v.dataId), new Error(H);
    let U = f, q = w;
    return V !== e[0] && (U = Te({
      inputs: {
        x: f
      },
      attrs: {
        begin: 0,
        size: [
          V,
          c
        ]
      },
      backend: n
    }), q = Te({
      inputs: {
        x: w
      },
      attrs: {
        begin: 0,
        size: V
      },
      backend: n
    }), n.disposeData(f.dataId), n.disposeData(w.dataId)), [
      U,
      q,
      y,
      v
    ];
  }
  const Hm = {
    kernelName: Ho,
    backendName: "wasm",
    setupFunc: Bm,
    kernelFunc: Om
  };
  let ls;
  function Lm(r) {
    ls = r.wasm.cwrap(Ba, null, [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function Vm(r) {
    const { backend: n, inputs: s } = r, { inputIndices: o, inputShape: a, newShape: t } = s;
    if (o.shape.length !== 2) throw new Error(`Input indices should be a matrix but received shape
        ${o.shape}`);
    if (a.shape.length !== 1) throw new Error(`Input shape should be a vector but received shape
        ${a.shape}`);
    if (t.shape.length !== 1) throw new Error(`Target shape should be a vector but received shape ${t.shape}`);
    const i = n.dataIdMap.get(o.dataId).id, d = n.dataIdMap.get(a.dataId).id, c = n.dataIdMap.get(t.dataId).id, u = o.shape[0], e = F(t.shape), m = n.makeOutput([
      u,
      e
    ], o.dtype), b = n.dataIdMap.get(m.dataId).id, l = n.makeOutput([
      e
    ], t.dtype), f = n.dataIdMap.get(l.dataId).id, g = n.makeOutput([
      3
    ], "int32"), w = n.dataIdMap.get(g.dataId).id;
    ls(i, d, c, u, b, f, w);
    const k = n.readSync(g.dataId);
    let y;
    switch (k[0]) {
      case 0: {
        y = jo(k[1], k[2]);
        break;
      }
      case 1: {
        y = Uo(k[1], k[2]);
        break;
      }
      case 2:
        y = qo();
        break;
      case 3: {
        const _ = Array.from(n.readSync(a.dataId)), v = Array.from(n.readSync(l.dataId));
        y = Go(_, v);
        break;
      }
      case 4: {
        const _ = Array.from(n.readSync(a.dataId)), v = Array.from(n.readSync(l.dataId));
        y = zo(_, v);
        break;
      }
      default:
        y = "";
    }
    if (n.disposeData(g.dataId), y) throw n.disposeData(m.dataId), n.disposeData(l.dataId), new Error(y);
    return [
      m,
      l
    ];
  }
  const $m = {
    kernelName: Ba,
    backendName: "wasm",
    setupFunc: Lm,
    kernelFunc: Vm
  };
  let ms;
  function fs(r) {
    ms = r.wasm.cwrap("SparseSegmentReduction", null, [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function hs(r, n) {
    const { backend: s, inputs: o } = r, { data: a, indices: t, segmentIds: i } = o, d = t.shape[0], c = s.readSync(i.dataId, d - 1, d)[0], e = d > 0 ? c + 1 : 0;
    if (e < 0) throw new Error(Sn());
    const m = a.shape.slice();
    m[0] = e;
    const b = s.dataIdMap.get(a.dataId).id, l = s.dataIdMap.get(t.dataId).id, f = s.dataIdMap.get(i.dataId).id, g = s.makeOutput(m, a.dtype), w = s.dataIdMap.get(g.dataId).id, k = s.makeOutput([
      4
    ], "int32"), y = s.dataIdMap.get(k.dataId).id;
    ms(b, $[a.dtype], a.shape[0], l, f, w, y, n, 0);
    const _ = s.readSync(k.dataId);
    let v;
    switch (_[0]) {
      case 0: {
        v = Sn();
        break;
      }
      case 1: {
        v = Jo();
        break;
      }
      case 2:
        v = Ko(_[1], _[2]);
        break;
      case 3:
        v = Xo(_[1], _[2], _[3]);
        break;
      default:
        v = "";
    }
    if (s.disposeData(k.dataId), v) throw s.disposeData(g.dataId), new Error(v);
    return g;
  }
  function zm(r) {
    return hs(r, true);
  }
  const Gm = {
    kernelName: Qo,
    backendName: "wasm",
    setupFunc: fs,
    kernelFunc: zm
  };
  function Um(r) {
    return hs(r, false);
  }
  const jm = {
    kernelName: Yo,
    backendName: "wasm",
    setupFunc: fs,
    kernelFunc: Um
  };
  let gs;
  function qm(r) {
    gs = r.wasm.cwrap(Oa, null, [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "array",
      "number",
      "number"
    ]);
  }
  function Xm(r) {
    const { backend: n, inputs: s, attrs: o } = r, { sparseIndices: a, sparseValues: t, defaultValue: i } = s, { outputShape: d } = o, c = n.makeOutput(d, i.dtype);
    if (F(d) === 0) return c;
    const { sliceRank: u, numUpdates: e, sliceSize: m, strides: b, outputSize: l } = rn(t, a, d), f = n.dataIdMap.get(a.dataId).id, g = n.dataIdMap.get(t.dataId).id, w = n.dataIdMap.get(i.dataId).id, k = new Uint8Array(new Int32Array(b).buffer), y = n.dataIdMap.get(c.dataId).id;
    return gs(f, g, t.shape.length, w, $[i.dtype], u, e, m, k, l, y), c;
  }
  const Km = {
    kernelName: Oa,
    backendName: "wasm",
    setupFunc: qm,
    kernelFunc: Xm
  };
  function Jm(r) {
    const { inputs: n, attrs: s, backend: o } = r, { x: a } = n, { numOrSizeSplits: t, axis: i } = s, d = rt(i, a.shape)[0], c = ei(a, t, d), u = new Array(a.shape.length).fill(0), e = a.shape.slice();
    return c.map((m) => {
      const b = [
        ...e
      ];
      b[d] = m;
      const l = Te({
        inputs: {
          x: a
        },
        attrs: {
          begin: u,
          size: b
        },
        backend: o
      });
      return u[d] += m, l;
    });
  }
  const Qm = {
    kernelName: Zo,
    backendName: "wasm",
    kernelFunc: Jm
  };
  const Ym = L(ti);
  const Zm = L(ni);
  const ef = ee(ai);
  let bs;
  function tf(r) {
    bs = r.wasm.cwrap(Ha, null, [
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function nf(r) {
    const { backend: n, inputs: s, attrs: o } = r, { alpha: a } = o, { x: t } = s, i = n.dataIdMap.get(t.dataId).id, d = n.makeOutput(t.shape, t.dtype), c = n.dataIdMap.get(d.dataId).id;
    return bs(i, a, $[t.dtype], c), d;
  }
  const af = {
    kernelName: Ha,
    backendName: "wasm",
    setupFunc: tf,
    kernelFunc: nf
  };
  let _s;
  function rf(r) {
    _s = r.wasm.cwrap(La, null, [
      "number",
      "array",
      "number",
      "array",
      "array",
      "array",
      "array",
      "array",
      "number",
      "number"
    ]);
  }
  function sf(r) {
    const { backend: n, inputs: s, attrs: o } = r, { x: a } = s, { begin: t, end: i, strides: d, beginMask: c, endMask: u, ellipsisMask: e, newAxisMask: m, shrinkAxisMask: b } = o, { finalShapeSparse: l, finalShape: f, isIdentity: g, sliceDim0: w, isSimpleSlice: k, begin: y, end: _, strides: v } = ri(a.shape, t, i, d, c, u, e, m, b);
    let E;
    if (g) E = oe({
      inputs: {
        x: a
      },
      backend: n,
      attrs: {
        shape: f
      }
    });
    else if (w || k) {
      ge(a.shape.length >= 1, () => `Input must have rank at least 1, got: ${a.shape.length}`);
      const R = si(y, _, v), B = Te({
        inputs: {
          x: a
        },
        backend: n,
        attrs: {
          begin: y,
          size: R
        }
      });
      E = oe({
        inputs: {
          x: B
        },
        backend: n,
        attrs: {
          shape: f
        }
      }), n.disposeData(B.dataId);
    } else {
      const R = n.makeOutput(l, "float32"), B = n.dataIdMap.get(a.dataId).id, V = new Uint8Array(new Int32Array(fe(a.shape)).buffer), z = new Uint8Array(new Int32Array(y).buffer), H = new Uint8Array(new Int32Array(_).buffer), U = new Uint8Array(new Int32Array(v).buffer), q = new Uint8Array(new Int32Array(l).buffer), Q = new Uint8Array(new Int32Array(fe(l)).buffer), ue = n.dataIdMap.get(R.dataId).id;
      _s(B, V, a.shape.length, z, H, U, q, Q, l.length, ue), E = oe({
        inputs: {
          x: R
        },
        backend: n,
        attrs: {
          shape: f
        }
      }), n.disposeData(R.dataId);
    }
    return E;
  }
  const uf = {
    kernelName: La,
    backendName: "wasm",
    setupFunc: rf,
    kernelFunc: sf
  };
  function of(r) {
    const { backend: n, inputs: s, attrs: o } = r, { data: a, dataSplits: t } = s, { separator: i, nGramWidths: d, leftPad: c, rightPad: u, padWidth: e, preserveShortSequences: m } = o, b = n.readSync(a.dataId), l = n.readSync(t.dataId), [f, g] = oi(b, l, i, d, c, u, e, m), w = n.makeOutput([
      f.length
    ], "string"), k = n.dataIdMap.get(w.dataId);
    k.stringBytes = f;
    const y = n.makeOutput(t.shape, "int32");
    return n.typedArrayFromHeap(y).set(g), [
      w,
      y
    ];
  }
  const df = {
    kernelName: ui,
    backendName: "wasm",
    kernelFunc: of
  };
  function cf(r) {
    const { backend: n, inputs: s, attrs: o } = r, { input: a, delimiter: t } = s, { skipEmpty: i } = o, d = n.readSync(a.dataId), c = n.readSync(t.dataId), [u, e, m] = di(d, c[0], i), b = e.length, l = n.makeOutput([
      b,
      2
    ], "int32");
    n.typedArrayFromHeap(l).set(u);
    const g = n.makeOutput([
      b
    ], "string"), w = n.dataIdMap.get(g.dataId);
    w.stringBytes = e;
    const k = n.makeOutput([
      2
    ], "int32");
    return n.typedArrayFromHeap(k).set(m), [
      l,
      g,
      k
    ];
  }
  const pf = {
    kernelName: ii,
    backendName: "wasm",
    kernelFunc: cf
  };
  function lf(r) {
    const { backend: n, inputs: s, attrs: o } = r, { input: a } = s, { numBuckets: t } = o, i = n.readSync(a.dataId), d = pi(i, t), c = n.makeOutput(a.shape, "int32");
    return n.typedArrayFromHeap(c).set(d), c;
  }
  const mf = {
    kernelName: ci,
    backendName: "wasm",
    kernelFunc: lf
  };
  const ff = ee(li);
  let ys;
  function hf(r) {
    ys = r.wasm.cwrap(Va, null, [
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function gf(r) {
    const { backend: n, inputs: s, attrs: o } = r, { axis: a, keepDims: t } = o, { x: i } = s, d = n.dataIdMap.get(i.dataId).id;
    let c = d, u = i;
    const { transposed: e, axes: m, originalAxes: b, inputWasTransposed: l } = xe(i, a, n);
    let f = m;
    if (l) {
      const _ = n.dataIdMap.get(e.dataId).id;
      _ !== d && (u = e, c = _, f = je(f.length, u.shape.length));
    }
    Se("sum", f, u.shape.length);
    const [g, w] = Be(u.shape, f), k = F(w), y = n.makeOutput(g, u.dtype);
    if (F(u.shape) !== 0) {
      const _ = n.dataIdMap.get(y.dataId).id;
      ys(c, k, $[y.dtype], _);
    }
    if (l && n.disposeData(e.dataId), t) {
      const _ = Oe(y.shape, b);
      y.shape = _;
    }
    return y;
  }
  const bf = {
    kernelName: Va,
    backendName: "wasm",
    setupFunc: hf,
    kernelFunc: gf
  };
  const _f = L(mi);
  const yf = L(fi);
  let Is;
  function If(r) {
    Is = r.wasm.cwrap($a, null, [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "array",
      "number",
      "number",
      "number"
    ]);
  }
  function wf(r) {
    const { backend: n, inputs: s, attrs: o } = r, { tensor: a, indices: t, updates: i } = s, d = n.makeOutput(a.shape, a.dtype);
    if (F(a.shape) === 0) return d;
    const { sliceRank: c, numUpdates: u, sliceSize: e, strides: m, outputSize: b } = rn(i, t, a.shape), f = n.dataIdMap.get(t.dataId).id, w = n.dataIdMap.get(i.dataId).id, y = n.dataIdMap.get(a.dataId).id, _ = new Uint8Array(new Int32Array(m).buffer), v = n.dataIdMap.get(d.dataId).id;
    return Is(f, w, $[i.dtype], c, u, e, _, b, v, y), d;
  }
  const kf = {
    kernelName: $a,
    backendName: "wasm",
    setupFunc: If,
    kernelFunc: wf
  };
  let ws;
  function Sf(r) {
    ws = r.wasm.cwrap(za, null, [
      "number",
      "array",
      "number",
      "array",
      "number",
      "number"
    ]);
  }
  function Mf(r) {
    const { inputs: n, backend: s, attrs: o } = r, { x: a } = n, t = s.dataIdMap.get(a.dataId).id, { reps: i } = o, d = new Array(a.shape.length);
    for (let b = 0; b < d.length; b++) d[b] = a.shape[b] * i[b];
    const c = new Uint8Array(new Int32Array(a.shape).buffer), u = new Uint8Array(new Int32Array(d).buffer), e = s.makeOutput(d, a.dtype), m = s.dataIdMap.get(e.dataId).id;
    return ws(t, c, a.shape.length, u, d.length, $[e.dtype], m), e;
  }
  const vf = {
    kernelName: za,
    backendName: "wasm",
    setupFunc: Sf,
    kernelFunc: Mf
  };
  let ks;
  function Af(r) {
    ks = r.wasm.cwrap(Ga, null, [
      "number",
      "array",
      "number",
      "number",
      "number",
      "bool",
      "number",
      "number"
    ]);
  }
  const xf = ({ inputs: r, backend: n, attrs: s }) => {
    const { x: o } = r, { k: a, sorted: t } = s, i = n.dataIdMap.get(o.dataId).id, d = new Uint8Array(new Int32Array(o.shape).buffer), c = o.shape.slice();
    c[c.length - 1] = a;
    const u = n.makeOutput(c, o.dtype), e = n.dataIdMap.get(u.dataId).id, m = n.makeOutput(c, "int32"), b = n.dataIdMap.get(m.dataId).id;
    return ks(i, d, o.shape.length, $[o.dtype], a, t, e, b), [
      u,
      m
    ];
  }, Df = {
    kernelName: Ga,
    backendName: "wasm",
    setupFunc: Af,
    kernelFunc: xf
  };
  let Ss;
  function Nf(r) {
    Ss = r.wasm.cwrap(Ua, null, [
      "number",
      "number",
      "bool",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "array",
      "number",
      "array",
      "number",
      "number",
      "number",
      "number",
      "number"
    ]);
  }
  function Cf(r) {
    const { backend: n, inputs: s, attrs: o } = r, { image: a, transforms: t } = s, { interpolation: i, fillMode: d, fillValue: c, outputShape: u } = o, [e, m, b, l] = a.shape, [f, g] = u ?? [
      m,
      b
    ], w = [
      e,
      f,
      g,
      l
    ], k = new Uint8Array(new Int32Array(fe(a.shape)).buffer), y = new Uint8Array(new Int32Array(fe(w)).buffer), _ = n.makeOutput(w, a.dtype), v = n.dataIdMap.get(_.dataId).id, R = n.dataIdMap.get(a.dataId).id, V = n.dataIdMap.get(t.dataId).id, z = i === "nearest" ? 1 : 2;
    let H;
    switch (d) {
      case "constant":
        H = 1;
        break;
      case "reflect":
        H = 2;
        break;
      case "wrap":
        H = 3;
        break;
      case "nearest":
        H = 4;
        break;
      default:
        H = 1;
        break;
    }
    return Ss(R, V, t.shape[0] > 1, e, f, g, l, b, m, k, a.shape.length - 1, y, w.length - 1, z, H, c, v), _;
  }
  const Ff = {
    kernelName: Ua,
    backendName: "wasm",
    setupFunc: Nf,
    kernelFunc: Cf
  };
  function Rf(r) {
    const { inputs: n, attrs: s, backend: o } = r, { axis: a } = s, { x: t } = n, { outputValues: i, outputShape: d, indices: c } = gi(o.readSync(t.dataId), a, t.shape, t.dtype);
    return [
      o.makeOutput(d, t.dtype, void 0, i),
      o.makeOutput([
        c.length
      ], "int32", void 0, c)
    ];
  }
  const Ef = {
    kernelName: hi,
    backendName: "wasm",
    kernelFunc: Rf
  };
  function Pf(r) {
    const { inputs: n, backend: s, attrs: o } = r, { value: a } = n;
    let { axis: t } = o;
    t < 0 && (t += a.shape.length);
    const i = a.shape[t], d = a.shape.length, c = new Array(d - 1);
    let u = 0;
    for (let l = 0; l < d; l++) l !== t && (c[u++] = a.shape[l]);
    const e = new Array(i), m = new Array(d).fill(0), b = a.shape.slice();
    b[t] = 1;
    for (let l = 0; l < e.length; l++) m[t] = l, e[l] = Te({
      inputs: {
        x: a
      },
      attrs: {
        begin: m,
        size: b
      },
      backend: s
    });
    return e.map(({ dataId: l, dtype: f }) => ({
      dataId: l,
      dtype: f,
      shape: c
    }));
  }
  const Wf = {
    kernelName: bi,
    backendName: "wasm",
    kernelFunc: Pf
  };
  function Tf(r) {
    const { inputs: { x: n }, backend: s } = r, o = s.makeOutput(n.shape, n.dtype);
    return s.typedArrayFromHeap(o).fill(0), o;
  }
  const Bf = {
    kernelName: _i,
    backendName: "wasm",
    kernelFunc: Tf
  };
  const Of = [
    Di,
    Ni,
    Ci,
    Fi,
    Ri,
    Wi,
    zi,
    ji,
    qi,
    Xi,
    Ki,
    Ji,
    Qi,
    Yi,
    Zi,
    nd,
    pd,
    sd,
    id,
    hd,
    wd,
    Md,
    vd,
    xd,
    Dd,
    Nd,
    Rd,
    Ed,
    Td,
    Hd,
    $d,
    Ud,
    Xd,
    Kd,
    Jd,
    Zd,
    nc,
    sc,
    ic,
    pc,
    fc,
    bc,
    Ic,
    Sc,
    Ac,
    xc,
    Cc,
    Rc,
    Ec,
    Pc,
    Wc,
    Tc,
    Bc,
    Lc,
    Vc,
    $c,
    Uc,
    Xc,
    Qc,
    ep,
    ap,
    sp,
    op,
    Ti,
    ip,
    dp,
    cp,
    mp,
    hp,
    bp,
    Ip,
    kp,
    wp,
    Mp,
    vp,
    xp,
    Np,
    Rp,
    Wp,
    Op,
    Hp,
    $p,
    Up,
    Xp,
    Qp,
    el,
    al,
    ul,
    ol,
    cl,
    hl,
    gl,
    bl,
    _l,
    wl,
    Ml,
    xl,
    Nl,
    Rl,
    Pl,
    Tl,
    Yr,
    Hl,
    $l,
    Ul,
    ql,
    Xl,
    Kl,
    Jl,
    Ql,
    ld,
    em,
    am,
    um,
    dm,
    lm,
    hm,
    gm,
    bm,
    Im,
    Sm,
    Am,
    xm,
    Cm,
    Fm,
    Rm,
    Em,
    yd,
    ll,
    Pm,
    Tm,
    Hm,
    $m,
    Gm,
    jm,
    Km,
    Qm,
    Ym,
    Zm,
    ef,
    af,
    uf,
    df,
    pf,
    mf,
    ff,
    bf,
    _f,
    yf,
    kf,
    vf,
    Df,
    Ff,
    Li,
    Ef,
    Wf,
    Bf
  ];
  for (const r of Of) yi(r);
  const Zt = Kt();
  Zt.registerFlag("WASM_HAS_SIMD_SUPPORT", async () => {
    try {
      return WebAssembly.validate(new Uint8Array([
        0,
        97,
        115,
        109,
        1,
        0,
        0,
        0,
        1,
        4,
        1,
        96,
        0,
        0,
        3,
        2,
        1,
        0,
        10,
        9,
        1,
        7,
        0,
        65,
        0,
        253,
        15,
        26,
        11
      ]));
    } catch {
      return false;
    }
  });
  Zt.registerFlag("WASM_HAS_MULTITHREAD_SUPPORT", async () => {
    if (Zt.get("IS_NODE")) return false;
    try {
      return new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)), WebAssembly.validate(new Uint8Array([
        0,
        97,
        115,
        109,
        1,
        0,
        0,
        0,
        1,
        4,
        1,
        96,
        0,
        0,
        3,
        2,
        1,
        0,
        5,
        4,
        1,
        3,
        1,
        1,
        10,
        11,
        1,
        9,
        0,
        65,
        0,
        254,
        16,
        2,
        0,
        26,
        11
      ]));
    } catch {
      return false;
    }
  });
  var jt = {
    exports: {}
  }, xn;
  function Hf() {
    return xn || (xn = 1, function(r, n) {
      var s = (() => {
        var o = typeof document < "u" && document.currentScript ? document.currentScript.src : void 0;
        return typeof __filename < "u" && (o = o || __filename), function(a) {
          a = a || {};
          function t() {
            return G.buffer != Y && be(G.buffer), Me;
          }
          function i() {
            return G.buffer != Y && be(G.buffer), ot;
          }
          function d() {
            return G.buffer != Y && be(G.buffer), it;
          }
          function c() {
            return G.buffer != Y && be(G.buffer), Ne;
          }
          function u() {
            return G.buffer != Y && be(G.buffer), dt;
          }
          var e = typeof a < "u" ? a : {}, m, b;
          e.ready = new Promise(function(p, h) {
            m = p, b = h;
          });
          var l;
          typeof process < "u" && process.listeners && (l = {
            uncaughtException: process.listeners("uncaughtException"),
            unhandledRejection: process.listeners("unhandledRejection")
          });
          var f = Object.assign({}, e), g = (p, h) => {
            throw h;
          }, w = typeof window == "object", k = typeof importScripts == "function", y = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string", _ = e.ENVIRONMENT_IS_PTHREAD || false, v = "";
          function E(p) {
            return e.locateFile ? e.locateFile(p, v) : v + p;
          }
          var R, B, V;
          function z(p) {
            if (p instanceof Ie) return;
            X("exiting due to exception: " + p);
          }
          if (y) {
            var H = We, U = We;
            k ? v = U.dirname(v) + "/" : v = __dirname + "/", R = (h, M) => (h = $e(h) ? new URL(h) : U.normalize(h), H.readFileSync(h, M ? void 0 : "utf8")), V = (h) => {
              var M = R(h, true);
              return M.buffer || (M = new Uint8Array(M)), M;
            }, B = (h, M, C) => {
              h = $e(h) ? new URL(h) : U.normalize(h), H.readFile(h, function(P, T) {
                P ? C(P) : M(T.buffer);
              });
            }, process.argv.length > 1 && process.argv[1].replace(/\\/g, "/"), process.argv.slice(2), process.on("uncaughtException", function(h) {
              if (!(h instanceof Ie)) throw h;
            }), process.on("unhandledRejection", function(h) {
              throw h;
            }), g = (h, M) => {
              if (Ve()) throw process.exitCode = h, M;
              z(M), process.exit(h);
            }, e.inspect = function() {
              return "[Emscripten Module object]";
            };
            let p;
            try {
              p = We;
            } catch (h) {
              throw console.error('The "worker_threads" module is not supported in this node.js build - perhaps a newer version is needed?'), h;
            }
            Mn.Worker = p.Worker;
          } else (w || k) && (k ? v = self.location.href : typeof document < "u" && document.currentScript && (v = document.currentScript.src), typeof o < "u" && o && (v = o), v.indexOf("blob:") !== 0 ? v = v.substr(0, v.replace(/[?#].*/, "").lastIndexOf("/") + 1) : v = "", y || (R = (p) => {
            var h = new XMLHttpRequest();
            return h.open("GET", p, false), h.send(null), h.responseText;
          }, k && (V = (p) => {
            var h = new XMLHttpRequest();
            return h.open("GET", p, false), h.responseType = "arraybuffer", h.send(null), new Uint8Array(h.response);
          }), B = (p, h, M) => {
            var C = new XMLHttpRequest();
            C.open("GET", p, true), C.responseType = "arraybuffer", C.onload = () => {
              if (C.status == 200 || C.status == 0 && C.response) {
                h(C.response);
                return;
              }
              M();
            }, C.onerror = M, C.send(null);
          }));
          y && typeof performance > "u" && (Mn.performance = We.performance);
          var q = console.log.bind(console), Q = console.warn.bind(console);
          y && (q = (p) => H.writeSync(1, p + `
`), Q = (p) => H.writeSync(2, p + `
`));
          var ue = e.print || q, X = e.printErr || Q;
          Object.assign(e, f), f = null, e.arguments && e.arguments, e.thisProgram && e.thisProgram, e.quit && (g = e.quit);
          var te;
          e.wasmBinary && (te = e.wasmBinary);
          var pe = e.noExitRuntime || true;
          typeof WebAssembly != "object" && Re("no native wasm support detected");
          var G, he, ie = false, de;
          function _e(p, h) {
            p || Re(h);
          }
          var ne = typeof TextDecoder < "u" ? new TextDecoder("utf8") : void 0;
          function He(p, h, M) {
            h >>>= 0;
            for (var C = h + M, P = h; p[P] && !(P >= C); ) ++P;
            if (P - h > 16 && p.buffer && ne) return ne.decode(p.buffer instanceof SharedArrayBuffer ? p.slice(h, P) : p.subarray(h, P));
            for (var T = ""; h < P; ) {
              var x = p[h++];
              if (!(x & 128)) {
                T += String.fromCharCode(x);
                continue;
              }
              var D = p[h++] & 63;
              if ((x & 224) == 192) {
                T += String.fromCharCode((x & 31) << 6 | D);
                continue;
              }
              var J = p[h++] & 63;
              if ((x & 240) == 224 ? x = (x & 15) << 12 | D << 6 | J : x = (x & 7) << 18 | D << 12 | J << 6 | p[h++] & 63, x < 65536) T += String.fromCharCode(x);
              else {
                var me = x - 65536;
                T += String.fromCharCode(55296 | me >> 10, 56320 | me & 1023);
              }
            }
            return T;
          }
          function Le(p, h) {
            return p >>>= 0, p ? He(i(), p, h) : "";
          }
          function qe(p, h, M, C) {
            if (M >>>= 0, !(C > 0)) return 0;
            for (var P = M, T = M + C - 1, x = 0; x < p.length; ++x) {
              var D = p.charCodeAt(x);
              if (D >= 55296 && D <= 57343) {
                var J = p.charCodeAt(++x);
                D = 65536 + ((D & 1023) << 10) | J & 1023;
              }
              if (D <= 127) {
                if (M >= T) break;
                h[M++ >>> 0] = D;
              } else if (D <= 2047) {
                if (M + 1 >= T) break;
                h[M++ >>> 0] = 192 | D >> 6, h[M++ >>> 0] = 128 | D & 63;
              } else if (D <= 65535) {
                if (M + 2 >= T) break;
                h[M++ >>> 0] = 224 | D >> 12, h[M++ >>> 0] = 128 | D >> 6 & 63, h[M++ >>> 0] = 128 | D & 63;
              } else {
                if (M + 3 >= T) break;
                h[M++ >>> 0] = 240 | D >> 18, h[M++ >>> 0] = 128 | D >> 12 & 63, h[M++ >>> 0] = 128 | D >> 6 & 63, h[M++ >>> 0] = 128 | D & 63;
              }
            }
            return h[M >>> 0] = 0, M - P;
          }
          function Xe(p, h, M) {
            return qe(p, i(), h, M);
          }
          var Y, Me, ot, it, Ne, dt;
          _ && (Y = e.buffer);
          function be(p) {
            Y = p, e.HEAP8 = Me = new Int8Array(p), e.HEAP16 = new Int16Array(p), e.HEAP32 = it = new Int32Array(p), e.HEAPU8 = ot = new Uint8Array(p), e.HEAPU16 = new Uint16Array(p), e.HEAPU32 = Ne = new Uint32Array(p), e.HEAPF32 = new Float32Array(p), e.HEAPF64 = dt = new Float64Array(p);
          }
          var Ce = e.INITIAL_MEMORY || 16777216;
          if (_) G = e.wasmMemory, Y = e.buffer;
          else if (e.wasmMemory) G = e.wasmMemory;
          else if (G = new WebAssembly.Memory({
            initial: Ce / 65536,
            maximum: 65536,
            shared: true
          }), !(G.buffer instanceof SharedArrayBuffer)) throw X("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"), y && X("(on node you may need: --experimental-wasm-threads --experimental-wasm-bulk-memory and/or recent version)"), Error("bad memory");
          G && (Y = G.buffer), Ce = Y.byteLength, be(Y);
          var ae, Ke = [], ct = [], pt = [];
          function Ve() {
            return pe;
          }
          function Je() {
            if (e.preRun) for (typeof e.preRun == "function" && (e.preRun = [
              e.preRun
            ]); e.preRun.length; ) Et(e.preRun.shift());
            j(Ke);
          }
          function lt() {
            _ || j(ct);
          }
          function mt() {
            if (!_) {
              if (e.postRun) for (typeof e.postRun == "function" && (e.postRun = [
                e.postRun
              ]); e.postRun.length; ) Wt(e.postRun.shift());
              j(pt);
            }
          }
          function Et(p) {
            Ke.unshift(p);
          }
          function Pt(p) {
            ct.unshift(p);
          }
          function Wt(p) {
            pt.unshift(p);
          }
          var ye = 0, Fe = null;
          function Tt(p) {
            ye++, e.monitorRunDependencies && e.monitorRunDependencies(ye);
          }
          function Bt(p) {
            if (ye--, e.monitorRunDependencies && e.monitorRunDependencies(ye), ye == 0 && Fe) {
              var h = Fe;
              Fe = null, h();
            }
          }
          function Re(p) {
            e.onAbort && e.onAbort(p), p = "Aborted(" + p + ")", X(p), ie = true, de = 1, p += ". Build with -sASSERTIONS for more info.";
            var h = new WebAssembly.RuntimeError(p);
            throw b(h), h;
          }
          var Ot = "data:application/octet-stream;base64,";
          function Qe(p) {
            return p.startsWith(Ot);
          }
          function $e(p) {
            return p.startsWith("file://");
          }
          var se;
          se = "tfjs-backend-wasm-threaded-simd.wasm", Qe(se) || (se = E(se));
          function ft(p) {
            try {
              if (p == se && te) return new Uint8Array(te);
              if (V) return V(p);
              throw "both async and sync fetching of the wasm failed";
            } catch (h) {
              Re(h);
            }
          }
          function ht() {
            if (!te && (w || k)) {
              if (typeof fetch == "function" && !$e(se)) return fetch(se, {
                credentials: "same-origin"
              }).then(function(p) {
                if (!p.ok) throw "failed to load wasm binary file at '" + se + "'";
                return p.arrayBuffer();
              }).catch(function() {
                return ft(se);
              });
              if (B) return new Promise(function(p, h) {
                B(se, function(M) {
                  p(new Uint8Array(M));
                }, h);
              });
            }
            return Promise.resolve().then(function() {
              return ft(se);
            });
          }
          function gt() {
            var p = {
              env: mn,
              wasi_snapshot_preview1: mn
            };
            function h(x, D) {
              var J = x.exports;
              if (e.asm = J, we(e.asm._emscripten_tls_init), ae = e.asm.__indirect_function_table, Pt(e.asm.__wasm_call_ctors), he = D, !_) {
                var me = A.unusedWorkers.length;
                A.unusedWorkers.forEach(function(ke) {
                  A.loadWasmModuleToWorker(ke, function() {
                    --me || Bt();
                  });
                });
              }
            }
            _ || Tt();
            function M(x) {
              h(x.instance, x.module);
            }
            function C(x) {
              return ht().then(function(D) {
                return WebAssembly.instantiate(D, p);
              }).then(function(D) {
                return D;
              }).then(x, function(D) {
                X("failed to asynchronously prepare wasm: " + D), Re(D);
              });
            }
            function P() {
              return !te && typeof WebAssembly.instantiateStreaming == "function" && !Qe(se) && !$e(se) && !y && typeof fetch == "function" ? fetch(se, {
                credentials: "same-origin"
              }).then(function(x) {
                var D = WebAssembly.instantiateStreaming(x, p);
                return D.then(M, function(J) {
                  return X("wasm streaming compile failed: " + J), X("falling back to ArrayBuffer instantiation"), C(M);
                });
              }) : C(M);
            }
            if (e.instantiateWasm) try {
              var T = e.instantiateWasm(p, h);
              return T;
            } catch (x) {
              X("Module.instantiateWasm callback failed with error: " + x), b(x);
            }
            return P().catch(b), {};
          }
          var bt = {};
          function Ie(p) {
            this.name = "ExitStatus", this.message = "Program terminated with exit(" + p + ")", this.status = p;
          }
          function ze(p) {
            var h = A.pthreads[p];
            delete A.pthreads[p], h.terminate(), $t(p), A.runningWorkers.splice(A.runningWorkers.indexOf(h), 1), h.pthread_ptr = 0;
          }
          function _t(p) {
            var h = A.pthreads[p];
            h.postMessage({
              cmd: "cancel"
            });
          }
          function Ee(p) {
            var h = A.pthreads[p];
            _e(h), A.returnWorkerToPool(h);
          }
          function Pe(p) {
            var h = A.getNewWorker();
            if (!h) return 6;
            A.runningWorkers.push(h), A.pthreads[p.pthread_ptr] = h, h.pthread_ptr = p.pthread_ptr;
            var M = {
              cmd: "run",
              start_routine: p.startRoutine,
              arg: p.arg,
              pthread_ptr: p.pthread_ptr
            };
            return h.runPthread = () => {
              y && h.ref(), h.postMessage(M, p.transferList), delete h.runPthread;
            }, h.loaded && h.runPthread(), 0;
          }
          function yt(p) {
            if (_) return Ge(1, 1, p);
            de = p, Ve() || (A.terminateAllThreads(), e.onExit && e.onExit(p), ie = true), g(p, new Ie(p));
          }
          function I(p, h) {
            if (de = p, !h && _) throw O(p), "unwind";
            yt(p);
          }
          var S = I;
          function N(p) {
            if (p instanceof Ie || p == "unwind") return de;
            g(1, p);
          }
          var A = {
            unusedWorkers: [],
            runningWorkers: [],
            tlsInitFunctions: [],
            pthreads: {},
            init: function() {
              _ ? A.initWorker() : A.initMainThread();
            },
            initMainThread: function() {
              for (var p = 8; p--; ) A.allocateUnusedWorker();
            },
            initWorker: function() {
              pe = false;
            },
            setExitStatus: function(p) {
              de = p;
            },
            terminateAllThreads: function() {
              for (var p of Object.values(A.pthreads)) A.returnWorkerToPool(p);
              for (var p of A.unusedWorkers) p.terminate();
              A.unusedWorkers = [];
            },
            returnWorkerToPool: function(p) {
              var h = p.pthread_ptr;
              delete A.pthreads[h], A.unusedWorkers.push(p), A.runningWorkers.splice(A.runningWorkers.indexOf(p), 1), p.pthread_ptr = 0, y && p.unref(), $t(h);
            },
            receiveObjectTransfer: function(p) {
            },
            threadInitTLS: function() {
              A.tlsInitFunctions.forEach((p) => p());
            },
            loadWasmModuleToWorker: function(p, h) {
              p.onmessage = (T) => {
                var x = T.data, D = x.cmd;
                if (p.pthread_ptr && (A.currentProxiedOperationCallerThread = p.pthread_ptr), x.targetThread && x.targetThread != St()) {
                  var J = A.pthreads[x.targetThread];
                  J ? J.postMessage(x, x.transferList) : X('Internal error! Worker sent a message "' + D + '" to target pthread ' + x.targetThread + ", but that thread no longer exists!"), A.currentProxiedOperationCallerThread = void 0;
                  return;
                }
                D === "processProxyingQueue" ? Ht(x.queue) : D === "spawnThread" ? Pe(x) : D === "cleanupThread" ? Ee(x.thread) : D === "killThread" ? ze(x.thread) : D === "cancelThread" ? _t(x.thread) : D === "loaded" ? (p.loaded = true, y && p.unref(), h && h(p), p.runPthread && p.runPthread()) : D === "print" ? ue("Thread " + x.threadId + ": " + x.text) : D === "printErr" ? X("Thread " + x.threadId + ": " + x.text) : D === "alert" ? alert("Thread " + x.threadId + ": " + x.text) : x.target === "setimmediate" ? p.postMessage(x) : D === "callHandler" ? e[x.handler](...x.args) : D && X("worker sent an unknown command " + D), A.currentProxiedOperationCallerThread = void 0;
              }, p.onerror = (T) => {
                var x = "worker sent an error!";
                throw X(x + " " + T.filename + ":" + T.lineno + ": " + T.message), T;
              }, y && (p.on("message", function(T) {
                p.onmessage({
                  data: T
                });
              }), p.on("error", function(T) {
                p.onerror(T);
              }), p.on("detachedExit", function() {
              }));
              var M = [], C = [
                "onExit",
                "onAbort",
                "print",
                "printErr"
              ];
              for (var P of C) e.hasOwnProperty(P) && M.push(P);
              p.postMessage({
                cmd: "load",
                handlers: M,
                urlOrBlob: e.mainScriptUrlOrBlob || o,
                wasmMemory: G,
                wasmModule: he
              });
            },
            allocateUnusedWorker: function() {
              var p, h = E("tfjs-backend-wasm-threaded-simd.worker.js");
              p = new Worker(h), A.unusedWorkers.push(p);
            },
            getNewWorker: function() {
              return A.unusedWorkers.length == 0 && (A.allocateUnusedWorker(), A.loadWasmModuleToWorker(A.unusedWorkers[0])), A.unusedWorkers.pop();
            }
          };
          e.PThread = A;
          function j(p) {
            for (; p.length > 0; ) p.shift()(e);
          }
          function K() {
            var p = St(), h = d()[p + 52 >>> 2], M = d()[p + 56 >>> 2], C = h - M;
            _n(h, C), Mt(h);
          }
          e.establishStackSpace = K;
          function O(p) {
            if (_) return Ge(2, 0, p);
            try {
              S(p);
            } catch (h) {
              N(h);
            }
          }
          var W = [];
          function Z(p) {
            var h = W[p];
            return h || (p >= W.length && (W.length = p + 1), W[p] = h = ae.get(p)), h;
          }
          function le(p, h) {
            var M = Z(p)(h);
            Ve() ? A.setExitStatus(M) : bn(M);
          }
          e.invokeEntryPoint = le;
          function we(p) {
            A.tlsInitFunctions.push(p);
          }
          function It(p) {
            fn(p, !k, 1, !w), A.threadInitTLS();
          }
          function Ye(p) {
            _ ? postMessage({
              cmd: "cleanupThread",
              thread: p
            }) : Ee(p);
          }
          function wt(p, h, M, C) {
            return _ ? Ge(3, 1, p, h, M, C) : re(p, h, M, C);
          }
          function re(p, h, M, C) {
            if (typeof SharedArrayBuffer > "u") return X("Current environment does not support SharedArrayBuffer, pthreads are not available!"), 6;
            var P = [], T = 0;
            if (_ && (P.length === 0 || T)) return wt(p, h, M, C);
            var x = {
              startRoutine: M,
              pthread_ptr: p,
              arg: C,
              transferList: P
            };
            return _ ? (x.cmd = "spawnThread", postMessage(x, P), 0) : Pe(x);
          }
          function ve() {
            return 65536;
          }
          var kt = true;
          function Ns() {
            return kt;
          }
          function Ht(p) {
            Atomics.store(d(), p >> 2, 1), St() && gn(p), Atomics.compareExchange(d(), p >> 2, 1, 0);
          }
          e.executeNotifiedProxyingQueue = Ht;
          function Cs(p, h, M, C) {
            if (p == h) setTimeout(() => Ht(C));
            else if (_) postMessage({
              targetThread: p,
              cmd: "processProxyingQueue",
              queue: C
            });
            else {
              var P = A.pthreads[p];
              if (!P) return;
              P.postMessage({
                cmd: "processProxyingQueue",
                queue: C
              });
            }
            return 1;
          }
          function Fs(p, h, M) {
            return -1;
          }
          function Rs() {
            Re("");
          }
          function Ze(p) {
            Ze.shown || (Ze.shown = {}), Ze.shown[p] || (Ze.shown[p] = 1, y && (p = "warning: " + p), X(p));
          }
          function Es() {
            y || k || Ze("Blocking on the main thread is very dangerous, see https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread");
          }
          function Ps() {
            return Date.now();
          }
          function on() {
            return 4294901760;
          }
          function Ws() {
            return on();
          }
          var Lt;
          y ? Lt = () => {
            var p = process.hrtime();
            return p[0] * 1e3 + p[1] / 1e6;
          } : Lt = () => performance.timeOrigin + performance.now();
          function Ts(p, h, M) {
            i().copyWithin(p >>> 0, h >>> 0, h + M >>> 0);
          }
          function Bs() {
            return y ? We.cpus().length : navigator.hardwareConcurrency;
          }
          function Os(p) {
            var h = zt(), M = p();
            return Mt(h), M;
          }
          function Ge(p, h) {
            var M = arguments.length - 2, C = arguments;
            return Os(() => {
              for (var P = M, T = vt(P * 8), x = T >> 3, D = 0; D < M; D++) {
                var J = C[2 + D];
                u()[x + D >>> 0] = J;
              }
              return hn(p, P, T, h);
            });
          }
          var Vt = [];
          function Hs(p, h, M) {
            Vt.length = h;
            for (var C = M >> 3, P = 0; P < h; P++) Vt[P] = u()[C + P >>> 0];
            var T = p < 0, x = T ? bt[-p - 1] : Xs[p];
            return x.apply(null, Vt);
          }
          function Ls(p) {
            try {
              return G.grow(p - Y.byteLength + 65535 >>> 16), be(G.buffer), 1;
            } catch {
            }
          }
          function Vs(p) {
            var h = i().length;
            if (p = p >>> 0, p <= h) return false;
            var M = on();
            if (p > M) return false;
            let C = (J, me) => J + (me - J % me) % me;
            for (var P = 1; P <= 4; P *= 2) {
              var T = h * (1 + 0.2 / P);
              T = Math.min(T, p + 100663296);
              var x = Math.min(M, C(Math.max(p, T), 65536)), D = Ls(x);
              if (D) return true;
            }
            return false;
          }
          function $s() {
            throw "unwind";
          }
          function dn(p) {
            return _ ? Ge(4, 1, p) : 52;
          }
          function cn(p, h, M, C, P) {
            return _ ? Ge(5, 1, p, h, M, C, P) : 70;
          }
          var zs = [
            null,
            [],
            []
          ];
          function Gs(p, h) {
            var M = zs[p];
            h === 0 || h === 10 ? ((p === 1 ? ue : X)(He(M, 0)), M.length = 0) : M.push(h);
          }
          function pn(p, h, M, C) {
            if (_) return Ge(6, 1, p, h, M, C);
            for (var P = 0, T = 0; T < M; T++) {
              var x = c()[h >>> 2], D = c()[h + 4 >>> 2];
              h += 8;
              for (var J = 0; J < D; J++) Gs(p, i()[x + J >>> 0]);
              P += D;
            }
            return c()[C >>> 2] = P, 0;
          }
          function ln(p) {
            var h = e["_" + p];
            return h;
          }
          function Us(p, h) {
            t().set(p, h >>> 0);
          }
          function js(p, h, M, C, P) {
            var T = {
              string: (ce) => {
                var Ue = 0;
                if (ce != null && ce !== 0) {
                  var wn = (ce.length << 2) + 1;
                  Ue = vt(wn), Xe(ce, Ue, wn);
                }
                return Ue;
              },
              array: (ce) => {
                var Ue = vt(ce.length);
                return Us(ce, Ue), Ue;
              }
            };
            function x(ce) {
              return h === "string" ? Le(ce) : h === "boolean" ? !!ce : ce;
            }
            var D = ln(p), J = [], me = 0;
            if (C) for (var ke = 0; ke < C.length; ke++) {
              var In = T[M[ke]];
              In ? (me === 0 && (me = zt()), J[ke] = In(C[ke])) : J[ke] = C[ke];
            }
            var Gt = D.apply(null, J);
            function Js(ce) {
              return me !== 0 && Mt(me), x(ce);
            }
            return Gt = Js(Gt), Gt;
          }
          function qs(p, h, M, C) {
            M = M || [];
            var P = M.every((x) => x === "number" || x === "boolean"), T = h !== "string";
            return T && P && !C ? ln(p) : function() {
              return js(p, h, M, arguments);
            };
          }
          A.init();
          var Xs = [
            null,
            yt,
            O,
            wt,
            dn,
            cn,
            pn
          ], mn = {
            __emscripten_init_main_thread_js: It,
            __emscripten_thread_cleanup: Ye,
            __pthread_create_js: re,
            _emscripten_default_pthread_stack_size: ve,
            _emscripten_get_now_is_monotonic: Ns,
            _emscripten_notify_task_queue: Cs,
            _emscripten_set_offscreencanvas_size: Fs,
            abort: Rs,
            emscripten_check_blocking_allowed: Es,
            emscripten_date_now: Ps,
            emscripten_get_heap_max: Ws,
            emscripten_get_now: Lt,
            emscripten_memcpy_big: Ts,
            emscripten_num_logical_cores: Bs,
            emscripten_receive_on_main_thread_js: Hs,
            emscripten_resize_heap: Vs,
            emscripten_unwind_to_js_event_loop: $s,
            exit: S,
            fd_close: dn,
            fd_seek: cn,
            fd_write: pn,
            memory: G || e.wasmMemory
          };
          gt(), e.___wasm_call_ctors = function() {
            return (e.___wasm_call_ctors = e.asm.__wasm_call_ctors).apply(null, arguments);
          }, e._init = function() {
            return (e._init = e.asm.init).apply(null, arguments);
          }, e._init_with_threads_count = function() {
            return (e._init_with_threads_count = e.asm.init_with_threads_count).apply(null, arguments);
          }, e._get_threads_count = function() {
            return (e._get_threads_count = e.asm.get_threads_count).apply(null, arguments);
          }, e._register_tensor = function() {
            return (e._register_tensor = e.asm.register_tensor).apply(null, arguments);
          }, e._dispose_data = function() {
            return (e._dispose_data = e.asm.dispose_data).apply(null, arguments);
          }, e._dispose = function() {
            return (e._dispose = e.asm.dispose).apply(null, arguments);
          }, e._Abs = function() {
            return (e._Abs = e.asm.Abs).apply(null, arguments);
          }, e._Acos = function() {
            return (e._Acos = e.asm.Acos).apply(null, arguments);
          }, e._Acosh = function() {
            return (e._Acosh = e.asm.Acosh).apply(null, arguments);
          }, e._Add = function() {
            return (e._Add = e.asm.Add).apply(null, arguments);
          }, e._AddN = function() {
            return (e._AddN = e.asm.AddN).apply(null, arguments);
          }, e._All = function() {
            return (e._All = e.asm.All).apply(null, arguments);
          }, e._Any = function() {
            return (e._Any = e.asm.Any).apply(null, arguments);
          }, e._ArgMax = function() {
            return (e._ArgMax = e.asm.ArgMax).apply(null, arguments);
          }, e._ArgMin = function() {
            return (e._ArgMin = e.asm.ArgMin).apply(null, arguments);
          }, e._Asin = function() {
            return (e._Asin = e.asm.Asin).apply(null, arguments);
          }, e._Asinh = function() {
            return (e._Asinh = e.asm.Asinh).apply(null, arguments);
          }, e._Atan = function() {
            return (e._Atan = e.asm.Atan).apply(null, arguments);
          }, e._Atan2 = function() {
            return (e._Atan2 = e.asm.Atan2).apply(null, arguments);
          }, e._Atanh = function() {
            return (e._Atanh = e.asm.Atanh).apply(null, arguments);
          }, e._AvgPool = function() {
            return (e._AvgPool = e.asm.AvgPool).apply(null, arguments);
          }, e._AvgPool3D = function() {
            return (e._AvgPool3D = e.asm.AvgPool3D).apply(null, arguments);
          }, e._AvgPool3DGrad = function() {
            return (e._AvgPool3DGrad = e.asm.AvgPool3DGrad).apply(null, arguments);
          }, e._AvgPoolGrad = function() {
            return (e._AvgPoolGrad = e.asm.AvgPoolGrad).apply(null, arguments);
          }, e._BatchMatMul = function() {
            return (e._BatchMatMul = e.asm.BatchMatMul).apply(null, arguments);
          }, e._Bincount = function() {
            return (e._Bincount = e.asm.Bincount).apply(null, arguments);
          }, e._BitwiseAnd = function() {
            return (e._BitwiseAnd = e.asm.BitwiseAnd).apply(null, arguments);
          }, e._Ceil = function() {
            return (e._Ceil = e.asm.Ceil).apply(null, arguments);
          }, e._ClipByValue = function() {
            return (e._ClipByValue = e.asm.ClipByValue).apply(null, arguments);
          }, e._Conv2D = function() {
            return (e._Conv2D = e.asm.Conv2D).apply(null, arguments);
          }, e._Conv2DBackpropInput = function() {
            return (e._Conv2DBackpropInput = e.asm.Conv2DBackpropInput).apply(null, arguments);
          }, e._Conv3D = function() {
            return (e._Conv3D = e.asm.Conv3D).apply(null, arguments);
          }, e._Conv3DBackpropFilterV2 = function() {
            return (e._Conv3DBackpropFilterV2 = e.asm.Conv3DBackpropFilterV2).apply(null, arguments);
          }, e._Conv3DBackpropInputV2 = function() {
            return (e._Conv3DBackpropInputV2 = e.asm.Conv3DBackpropInputV2).apply(null, arguments);
          }, e._Cos = function() {
            return (e._Cos = e.asm.Cos).apply(null, arguments);
          }, e._Cosh = function() {
            return (e._Cosh = e.asm.Cosh).apply(null, arguments);
          }, e._CropAndResize = function() {
            return (e._CropAndResize = e.asm.CropAndResize).apply(null, arguments);
          }, e._Cumprod = function() {
            return (e._Cumprod = e.asm.Cumprod).apply(null, arguments);
          }, e._Cumsum = function() {
            return (e._Cumsum = e.asm.Cumsum).apply(null, arguments);
          }, e._DenseBincount = function() {
            return (e._DenseBincount = e.asm.DenseBincount).apply(null, arguments);
          }, e._DepthToSpace = function() {
            return (e._DepthToSpace = e.asm.DepthToSpace).apply(null, arguments);
          }, e._DepthwiseConv2dNative = function() {
            return (e._DepthwiseConv2dNative = e.asm.DepthwiseConv2dNative).apply(null, arguments);
          }, e._Diag = function() {
            return (e._Diag = e.asm.Diag).apply(null, arguments);
          }, e._Dilation2D = function() {
            return (e._Dilation2D = e.asm.Dilation2D).apply(null, arguments);
          }, e._Dilation2DBackpropFilter = function() {
            return (e._Dilation2DBackpropFilter = e.asm.Dilation2DBackpropFilter).apply(null, arguments);
          }, e._Dilation2DBackpropInput = function() {
            return (e._Dilation2DBackpropInput = e.asm.Dilation2DBackpropInput).apply(null, arguments);
          }, e._Elu = function() {
            return (e._Elu = e.asm.Elu).apply(null, arguments);
          }, e._EluGrad = function() {
            return (e._EluGrad = e.asm.EluGrad).apply(null, arguments);
          }, e._Equal = function() {
            return (e._Equal = e.asm.Equal).apply(null, arguments);
          }, e._Erf = function() {
            return (e._Erf = e.asm.Erf).apply(null, arguments);
          }, e._Exp = function() {
            return (e._Exp = e.asm.Exp).apply(null, arguments);
          }, e._Expm1 = function() {
            return (e._Expm1 = e.asm.Expm1).apply(null, arguments);
          }, e._FlipLeftRight = function() {
            return (e._FlipLeftRight = e.asm.FlipLeftRight).apply(null, arguments);
          }, e._Floor = function() {
            return (e._Floor = e.asm.Floor).apply(null, arguments);
          }, e._FloorDiv = function() {
            return (e._FloorDiv = e.asm.FloorDiv).apply(null, arguments);
          }, e._FusedBatchNorm = function() {
            return (e._FusedBatchNorm = e.asm.FusedBatchNorm).apply(null, arguments);
          }, e._FusedConv2D = function() {
            return (e._FusedConv2D = e.asm.FusedConv2D).apply(null, arguments);
          }, e._FusedDepthwiseConv2D = function() {
            return (e._FusedDepthwiseConv2D = e.asm.FusedDepthwiseConv2D).apply(null, arguments);
          }, e._Gather = function() {
            return (e._Gather = e.asm.Gather).apply(null, arguments);
          }, e._GatherNd = function() {
            return (e._GatherNd = e.asm.GatherNd).apply(null, arguments);
          }, e._Greater = function() {
            return (e._Greater = e.asm.Greater).apply(null, arguments);
          }, e._GreaterEqual = function() {
            return (e._GreaterEqual = e.asm.GreaterEqual).apply(null, arguments);
          }, e._IsFinite = function() {
            return (e._IsFinite = e.asm.IsFinite).apply(null, arguments);
          }, e._IsInf = function() {
            return (e._IsInf = e.asm.IsInf).apply(null, arguments);
          }, e._IsNan = function() {
            return (e._IsNan = e.asm.IsNan).apply(null, arguments);
          }, e._LRN = function() {
            return (e._LRN = e.asm.LRN).apply(null, arguments);
          }, e._LRNGrad = function() {
            return (e._LRNGrad = e.asm.LRNGrad).apply(null, arguments);
          }, e._LeakyRelu = function() {
            return (e._LeakyRelu = e.asm.LeakyRelu).apply(null, arguments);
          }, e._Less = function() {
            return (e._Less = e.asm.Less).apply(null, arguments);
          }, e._LessEqual = function() {
            return (e._LessEqual = e.asm.LessEqual).apply(null, arguments);
          }, e._LinSpace = function() {
            return (e._LinSpace = e.asm.LinSpace).apply(null, arguments);
          }, e._Log = function() {
            return (e._Log = e.asm.Log).apply(null, arguments);
          }, e._Log1p = function() {
            return (e._Log1p = e.asm.Log1p).apply(null, arguments);
          }, e._LogicalAnd = function() {
            return (e._LogicalAnd = e.asm.LogicalAnd).apply(null, arguments);
          }, e._LogicalNot = function() {
            return (e._LogicalNot = e.asm.LogicalNot).apply(null, arguments);
          }, e._LogicalOr = function() {
            return (e._LogicalOr = e.asm.LogicalOr).apply(null, arguments);
          }, e._LogicalXor = function() {
            return (e._LogicalXor = e.asm.LogicalXor).apply(null, arguments);
          }, e._Max = function() {
            return (e._Max = e.asm.Max).apply(null, arguments);
          }, e._MaxPool = function() {
            return (e._MaxPool = e.asm.MaxPool).apply(null, arguments);
          }, e._MaxPool3D = function() {
            return (e._MaxPool3D = e.asm.MaxPool3D).apply(null, arguments);
          }, e._MaxPool3DGrad = function() {
            return (e._MaxPool3DGrad = e.asm.MaxPool3DGrad).apply(null, arguments);
          }, e._MaxPoolGrad = function() {
            return (e._MaxPoolGrad = e.asm.MaxPoolGrad).apply(null, arguments);
          }, e._MaxPoolWithArgmax = function() {
            return (e._MaxPoolWithArgmax = e.asm.MaxPoolWithArgmax).apply(null, arguments);
          }, e._Maximum = function() {
            return (e._Maximum = e.asm.Maximum).apply(null, arguments);
          }, e._Mean = function() {
            return (e._Mean = e.asm.Mean).apply(null, arguments);
          }, e._Min = function() {
            return (e._Min = e.asm.Min).apply(null, arguments);
          }, e._Minimum = function() {
            return (e._Minimum = e.asm.Minimum).apply(null, arguments);
          }, e._MirrorPad = function() {
            return (e._MirrorPad = e.asm.MirrorPad).apply(null, arguments);
          }, e._Mod = function() {
            return (e._Mod = e.asm.Mod).apply(null, arguments);
          }, e._Multinomial = function() {
            return (e._Multinomial = e.asm.Multinomial).apply(null, arguments);
          }, e._Multiply = function() {
            return (e._Multiply = e.asm.Multiply).apply(null, arguments);
          }, e._Neg = function() {
            return (e._Neg = e.asm.Neg).apply(null, arguments);
          }, e._NonMaxSuppressionV3 = function() {
            return (e._NonMaxSuppressionV3 = e.asm.NonMaxSuppressionV3).apply(null, arguments);
          }, e._NonMaxSuppressionV4 = function() {
            return (e._NonMaxSuppressionV4 = e.asm.NonMaxSuppressionV4).apply(null, arguments);
          }, e._NonMaxSuppressionV5 = function() {
            return (e._NonMaxSuppressionV5 = e.asm.NonMaxSuppressionV5).apply(null, arguments);
          }, e._NotEqual = function() {
            return (e._NotEqual = e.asm.NotEqual).apply(null, arguments);
          }, e._OneHot = function() {
            return (e._OneHot = e.asm.OneHot).apply(null, arguments);
          }, e._PadV2 = function() {
            return (e._PadV2 = e.asm.PadV2).apply(null, arguments);
          }, e._Pow = function() {
            return (e._Pow = e.asm.Pow).apply(null, arguments);
          }, e._Prelu = function() {
            return (e._Prelu = e.asm.Prelu).apply(null, arguments);
          }, e._Prod = function() {
            return (e._Prod = e.asm.Prod).apply(null, arguments);
          }, e._RealDiv = function() {
            return (e._RealDiv = e.asm.RealDiv).apply(null, arguments);
          }, e._Reciprocal = function() {
            return (e._Reciprocal = e.asm.Reciprocal).apply(null, arguments);
          }, e._Relu = function() {
            return (e._Relu = e.asm.Relu).apply(null, arguments);
          }, e._Relu6 = function() {
            return (e._Relu6 = e.asm.Relu6).apply(null, arguments);
          }, e._ResizeBilinear = function() {
            return (e._ResizeBilinear = e.asm.ResizeBilinear).apply(null, arguments);
          }, e._ResizeBilinearGrad = function() {
            return (e._ResizeBilinearGrad = e.asm.ResizeBilinearGrad).apply(null, arguments);
          }, e._ResizeNearestNeighbor = function() {
            return (e._ResizeNearestNeighbor = e.asm.ResizeNearestNeighbor).apply(null, arguments);
          }, e._ResizeNearestNeighborGrad = function() {
            return (e._ResizeNearestNeighborGrad = e.asm.ResizeNearestNeighborGrad).apply(null, arguments);
          }, e._Reverse = function() {
            return (e._Reverse = e.asm.Reverse).apply(null, arguments);
          }, e._RotateWithOffset = function() {
            return (e._RotateWithOffset = e.asm.RotateWithOffset).apply(null, arguments);
          }, e._Round = function() {
            return (e._Round = e.asm.Round).apply(null, arguments);
          }, e._Rsqrt = function() {
            return (e._Rsqrt = e.asm.Rsqrt).apply(null, arguments);
          }, e._ScatterNd = function() {
            return (e._ScatterNd = e.asm.ScatterNd).apply(null, arguments);
          }, e._SearchSorted = function() {
            return (e._SearchSorted = e.asm.SearchSorted).apply(null, arguments);
          }, e._SelectV2 = function() {
            return (e._SelectV2 = e.asm.SelectV2).apply(null, arguments);
          }, e._Selu = function() {
            return (e._Selu = e.asm.Selu).apply(null, arguments);
          }, e._Sigmoid = function() {
            return (e._Sigmoid = e.asm.Sigmoid).apply(null, arguments);
          }, e._Sign = function() {
            return (e._Sign = e.asm.Sign).apply(null, arguments);
          }, e._Sin = function() {
            return (e._Sin = e.asm.Sin).apply(null, arguments);
          }, e._Sinh = function() {
            return (e._Sinh = e.asm.Sinh).apply(null, arguments);
          }, e._Softmax = function() {
            return (e._Softmax = e.asm.Softmax).apply(null, arguments);
          }, e._Softplus = function() {
            return (e._Softplus = e.asm.Softplus).apply(null, arguments);
          }, e._SparseFillEmptyRows = function() {
            return (e._SparseFillEmptyRows = e.asm.SparseFillEmptyRows).apply(null, arguments);
          }, e._SparseReshape = function() {
            return (e._SparseReshape = e.asm.SparseReshape).apply(null, arguments);
          }, e._SparseSegmentReduction = function() {
            return (e._SparseSegmentReduction = e.asm.SparseSegmentReduction).apply(null, arguments);
          }, e._SparseToDense = function() {
            return (e._SparseToDense = e.asm.SparseToDense).apply(null, arguments);
          }, e._Sqrt = function() {
            return (e._Sqrt = e.asm.Sqrt).apply(null, arguments);
          }, e._Square = function() {
            return (e._Square = e.asm.Square).apply(null, arguments);
          }, e._SquaredDifference = function() {
            return (e._SquaredDifference = e.asm.SquaredDifference).apply(null, arguments);
          }, e._Step = function() {
            return (e._Step = e.asm.Step).apply(null, arguments);
          }, e._StridedSlice = function() {
            return (e._StridedSlice = e.asm.StridedSlice).apply(null, arguments);
          }, e._Sub = function() {
            return (e._Sub = e.asm.Sub).apply(null, arguments);
          }, e._Sum = function() {
            return (e._Sum = e.asm.Sum).apply(null, arguments);
          }, e._Tan = function() {
            return (e._Tan = e.asm.Tan).apply(null, arguments);
          }, e._Tanh = function() {
            return (e._Tanh = e.asm.Tanh).apply(null, arguments);
          }, e._TensorScatterUpdate = function() {
            return (e._TensorScatterUpdate = e.asm.TensorScatterUpdate).apply(null, arguments);
          }, e._Tile = function() {
            return (e._Tile = e.asm.Tile).apply(null, arguments);
          }, e._TopK = function() {
            return (e._TopK = e.asm.TopK).apply(null, arguments);
          }, e._Transform = function() {
            return (e._Transform = e.asm.Transform).apply(null, arguments);
          }, e._Transpose = function() {
            return (e._Transpose = e.asm.Transpose).apply(null, arguments);
          }, e.__FusedMatMul = function() {
            return (e.__FusedMatMul = e.asm._FusedMatMul).apply(null, arguments);
          }, e._malloc = function() {
            return (e._malloc = e.asm.malloc).apply(null, arguments);
          }, e._free = function() {
            return (e._free = e.asm.free).apply(null, arguments);
          }, e.__emscripten_tls_init = function() {
            return (e.__emscripten_tls_init = e.asm._emscripten_tls_init).apply(null, arguments);
          };
          var St = e._pthread_self = function() {
            return (St = e._pthread_self = e.asm.pthread_self).apply(null, arguments);
          };
          e.___errno_location = function() {
            return (e.___errno_location = e.asm.__errno_location).apply(null, arguments);
          };
          var fn = e.__emscripten_thread_init = function() {
            return (fn = e.__emscripten_thread_init = e.asm._emscripten_thread_init).apply(null, arguments);
          };
          e.__emscripten_thread_crashed = function() {
            return (e.__emscripten_thread_crashed = e.asm._emscripten_thread_crashed).apply(null, arguments);
          }, e._emscripten_main_thread_process_queued_calls = function() {
            return (e._emscripten_main_thread_process_queued_calls = e.asm.emscripten_main_thread_process_queued_calls).apply(null, arguments);
          }, e._emscripten_main_browser_thread_id = function() {
            return (e._emscripten_main_browser_thread_id = e.asm.emscripten_main_browser_thread_id).apply(null, arguments);
          };
          var hn = e._emscripten_run_in_main_runtime_thread_js = function() {
            return (hn = e._emscripten_run_in_main_runtime_thread_js = e.asm.emscripten_run_in_main_runtime_thread_js).apply(null, arguments);
          };
          e._emscripten_dispatch_to_thread_ = function() {
            return (e._emscripten_dispatch_to_thread_ = e.asm.emscripten_dispatch_to_thread_).apply(null, arguments);
          };
          var gn = e.__emscripten_proxy_execute_task_queue = function() {
            return (gn = e.__emscripten_proxy_execute_task_queue = e.asm._emscripten_proxy_execute_task_queue).apply(null, arguments);
          }, $t = e.__emscripten_thread_free_data = function() {
            return ($t = e.__emscripten_thread_free_data = e.asm._emscripten_thread_free_data).apply(null, arguments);
          }, bn = e.__emscripten_thread_exit = function() {
            return (bn = e.__emscripten_thread_exit = e.asm._emscripten_thread_exit).apply(null, arguments);
          }, _n = e._emscripten_stack_set_limits = function() {
            return (_n = e._emscripten_stack_set_limits = e.asm.emscripten_stack_set_limits).apply(null, arguments);
          }, zt = e.stackSave = function() {
            return (zt = e.stackSave = e.asm.stackSave).apply(null, arguments);
          }, Mt = e.stackRestore = function() {
            return (Mt = e.stackRestore = e.asm.stackRestore).apply(null, arguments);
          }, vt = e.stackAlloc = function() {
            return (vt = e.stackAlloc = e.asm.stackAlloc).apply(null, arguments);
          };
          e.dynCall_iijjiiii = function() {
            return (e.dynCall_iijjiiii = e.asm.dynCall_iijjiiii).apply(null, arguments);
          }, e.dynCall_jiji = function() {
            return (e.dynCall_jiji = e.asm.dynCall_jiji).apply(null, arguments);
          }, e.keepRuntimeAlive = Ve, e.wasmMemory = G, e.cwrap = qs, e.ExitStatus = Ie, e.PThread = A;
          var At;
          Fe = function p() {
            At || yn(), At || (Fe = p);
          };
          function yn(p) {
            if (ye > 0) return;
            if (_) {
              m(e), lt(), startWorker(e);
              return;
            }
            if (Je(), ye > 0) return;
            function h() {
              At || (At = true, e.calledRun = true, !ie && (lt(), m(e), e.onRuntimeInitialized && e.onRuntimeInitialized(), mt()));
            }
            e.setStatus ? (e.setStatus("Running..."), setTimeout(function() {
              setTimeout(function() {
                e.setStatus("");
              }, 1), h();
            }, 1)) : h();
          }
          if (e.preInit) for (typeof e.preInit == "function" && (e.preInit = [
            e.preInit
          ]); e.preInit.length > 0; ) e.preInit.pop()();
          yn();
          var xt;
          l && (xt = {
            uncaughtException: process.listeners("uncaughtException").filter(function(p) {
              return !l.uncaughtException.indexOf(p) > -1;
            }),
            unhandledRejection: process.listeners("unhandledRejection").filter(function(p) {
              return !l.unhandledRejection.indexOf(p) > -1;
            })
          });
          var Dt;
          if (typeof WasmBackendModule < "u") Dt = WasmBackendModule;
          else if (typeof a < "u") Dt = a;
          else throw new Error("Could not find wasm module in post.js");
          if (xt) {
            var Ks = Dt._dispose;
            Dt._dispose = function() {
              Ks(), xt.uncaughtException.forEach(function(p) {
                process.removeListener("uncaughtException", p);
              }), xt.unhandledRejection.forEach(function(p) {
                process.removeListener("unhandledRejection", p);
              });
            };
          }
          return a.ready;
        };
      })();
      r.exports = s;
    }(jt)), jt.exports;
  }
  var Ms = Hf();
  const vs = ja(Ms), Lf = qa({
    __proto__: null,
    default: vs
  }, [
    Ms
  ]);
  var qt = {}, Dn;
  function Vf() {
    return Dn || (Dn = 1, qt.wasmWorkerContents = `"use strict";var Module={};var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";if(ENVIRONMENT_IS_NODE){var nodeWorkerThreads=require("worker_threads");var parentPort=nodeWorkerThreads.parentPort;parentPort.on("message",data=>onmessage({data:data}));var fs=require("fs");Object.assign(global,{self:global,require:require,Module:Module,location:{href:__filename},Worker:nodeWorkerThreads.Worker,importScripts:function(f){(0,eval)(fs.readFileSync(f,"utf8")+"//# sourceURL="+f)},postMessage:function(msg){parentPort.postMessage(msg)},performance:global.performance||{now:function(){return Date.now()}}})}var initializedJS=false;var pendingNotifiedProxyingQueues=[];function threadPrintErr(){var text=Array.prototype.slice.call(arguments).join(" ");if(ENVIRONMENT_IS_NODE){fs.writeSync(2,text+"
");return}console.error(text)}function threadAlert(){var text=Array.prototype.slice.call(arguments).join(" ");postMessage({cmd:"alert",text:text,threadId:Module["_pthread_self"]()})}var err=threadPrintErr;self.alert=threadAlert;Module["instantiateWasm"]=(info,receiveInstance)=>{var instance=new WebAssembly.Instance(Module["wasmModule"],info);receiveInstance(instance);Module["wasmModule"]=null;return instance.exports};self.onunhandledrejection=e=>{throw e.reason??e};self.startWorker=instance=>{Module=instance;postMessage({"cmd":"loaded"})};self.onmessage=e=>{try{if(e.data.cmd==="load"){Module["wasmModule"]=e.data.wasmModule;for(const handler of e.data.handlers){Module[handler]=function(){postMessage({cmd:"callHandler",handler:handler,args:[...arguments]})}}Module["wasmMemory"]=e.data.wasmMemory;Module["buffer"]=Module["wasmMemory"].buffer;Module["ENVIRONMENT_IS_PTHREAD"]=true;if(typeof e.data.urlOrBlob=="string"){importScripts(e.data.urlOrBlob)}else{var objectUrl=URL.createObjectURL(e.data.urlOrBlob);importScripts(objectUrl);URL.revokeObjectURL(objectUrl)}WasmBackendModuleThreadedSimd(Module)}else if(e.data.cmd==="run"){Module["__emscripten_thread_init"](e.data.pthread_ptr,0,0,1);Module["establishStackSpace"]();Module["PThread"].receiveObjectTransfer(e.data);Module["PThread"].threadInitTLS();if(!initializedJS){pendingNotifiedProxyingQueues.forEach(queue=>{Module["executeNotifiedProxyingQueue"](queue)});pendingNotifiedProxyingQueues=[];initializedJS=true}try{Module["invokeEntryPoint"](e.data.start_routine,e.data.arg)}catch(ex){if(ex!="unwind"){if(ex instanceof Module["ExitStatus"]){if(Module["keepRuntimeAlive"]()){}else{Module["__emscripten_thread_exit"](ex.status)}}else{throw ex}}}}else if(e.data.cmd==="cancel"){if(Module["_pthread_self"]()){Module["__emscripten_thread_exit"](-1)}}else if(e.data.target==="setimmediate"){}else if(e.data.cmd==="processProxyingQueue"){if(initializedJS){Module["executeNotifiedProxyingQueue"](e.data.queue)}else{pendingNotifiedProxyingQueues.push(e.data.queue)}}else if(e.data.cmd){err("worker.js received unknown command "+e.data.cmd);err(e.data)}}catch(ex){if(Module["__emscripten_thread_crashed"]){Module["__emscripten_thread_crashed"]()}throw ex}};`), qt;
  }
  var $f = Vf(), Xt = {
    exports: {}
  }, Nn;
  function zf() {
    return Nn || (Nn = 1, function(r, n) {
      var s = (() => {
        var o = typeof document < "u" && document.currentScript ? document.currentScript.src : void 0;
        return typeof __filename < "u" && (o = o || __filename), function(a) {
          a = a || {};
          var t = typeof a < "u" ? a : {}, i, d;
          t.ready = new Promise(function(I, S) {
            i = I, d = S;
          });
          var c;
          typeof process < "u" && process.listeners && (c = {
            uncaughtException: process.listeners("uncaughtException"),
            unhandledRejection: process.listeners("unhandledRejection")
          });
          var u = Object.assign({}, t), e = typeof window == "object", m = typeof importScripts == "function", b = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string", l = "";
          function f(I) {
            return t.locateFile ? t.locateFile(I, l) : l + I;
          }
          var g, w, k;
          if (b) {
            var y = We, _ = We;
            m ? l = _.dirname(l) + "/" : l = __dirname + "/", g = (I, S) => (I = Ce(I) ? new URL(I) : _.normalize(I), y.readFileSync(I, S ? void 0 : "utf8")), k = (I) => {
              var S = g(I, true);
              return S.buffer || (S = new Uint8Array(S)), S;
            }, w = (I, S, N) => {
              I = Ce(I) ? new URL(I) : _.normalize(I), y.readFile(I, function(A, j) {
                A ? N(A) : S(j.buffer);
              });
            }, process.argv.length > 1 && process.argv[1].replace(/\\/g, "/"), process.argv.slice(2), process.on("uncaughtException", function(I) {
              if (!(I instanceof Ve)) throw I;
            }), process.on("unhandledRejection", function(I) {
              throw I;
            }), t.inspect = function() {
              return "[Emscripten Module object]";
            };
          } else (e || m) && (m ? l = self.location.href : typeof document < "u" && document.currentScript && (l = document.currentScript.src), o && (l = o), l.indexOf("blob:") !== 0 ? l = l.substr(0, l.replace(/[?#].*/, "").lastIndexOf("/") + 1) : l = "", g = (I) => {
            var S = new XMLHttpRequest();
            return S.open("GET", I, false), S.send(null), S.responseText;
          }, m && (k = (I) => {
            var S = new XMLHttpRequest();
            return S.open("GET", I, false), S.responseType = "arraybuffer", S.send(null), new Uint8Array(S.response);
          }), w = (I, S, N) => {
            var A = new XMLHttpRequest();
            A.open("GET", I, true), A.responseType = "arraybuffer", A.onload = () => {
              if (A.status == 200 || A.status == 0 && A.response) {
                S(A.response);
                return;
              }
              N();
            }, A.onerror = N, A.send(null);
          });
          var v = t.print || console.log.bind(console), E = t.printErr || console.warn.bind(console);
          Object.assign(t, u), u = null, t.arguments && t.arguments, t.thisProgram && t.thisProgram, t.quit && t.quit;
          var R;
          t.wasmBinary && (R = t.wasmBinary), t.noExitRuntime, typeof WebAssembly != "object" && Ne("no native wasm support detected");
          var B, V = false, z = typeof TextDecoder < "u" ? new TextDecoder("utf8") : void 0;
          function H(I, S, N) {
            S >>>= 0;
            for (var A = S + N, j = S; I[j] && !(j >= A); ) ++j;
            if (j - S > 16 && I.buffer && z) return z.decode(I.subarray(S, j));
            for (var K = ""; S < j; ) {
              var O = I[S++];
              if (!(O & 128)) {
                K += String.fromCharCode(O);
                continue;
              }
              var W = I[S++] & 63;
              if ((O & 224) == 192) {
                K += String.fromCharCode((O & 31) << 6 | W);
                continue;
              }
              var Z = I[S++] & 63;
              if ((O & 240) == 224 ? O = (O & 15) << 12 | W << 6 | Z : O = (O & 7) << 18 | W << 12 | Z << 6 | I[S++] & 63, O < 65536) K += String.fromCharCode(O);
              else {
                var le = O - 65536;
                K += String.fromCharCode(55296 | le >> 10, 56320 | le & 1023);
              }
            }
            return K;
          }
          function U(I, S) {
            return I >>>= 0, I ? H(te, I, S) : "";
          }
          function q(I, S, N, A) {
            if (N >>>= 0, !(A > 0)) return 0;
            for (var j = N, K = N + A - 1, O = 0; O < I.length; ++O) {
              var W = I.charCodeAt(O);
              if (W >= 55296 && W <= 57343) {
                var Z = I.charCodeAt(++O);
                W = 65536 + ((W & 1023) << 10) | Z & 1023;
              }
              if (W <= 127) {
                if (N >= K) break;
                S[N++ >>> 0] = W;
              } else if (W <= 2047) {
                if (N + 1 >= K) break;
                S[N++ >>> 0] = 192 | W >> 6, S[N++ >>> 0] = 128 | W & 63;
              } else if (W <= 65535) {
                if (N + 2 >= K) break;
                S[N++ >>> 0] = 224 | W >> 12, S[N++ >>> 0] = 128 | W >> 6 & 63, S[N++ >>> 0] = 128 | W & 63;
              } else {
                if (N + 3 >= K) break;
                S[N++ >>> 0] = 240 | W >> 18, S[N++ >>> 0] = 128 | W >> 12 & 63, S[N++ >>> 0] = 128 | W >> 6 & 63, S[N++ >>> 0] = 128 | W & 63;
              }
            }
            return S[N >>> 0] = 0, N - j;
          }
          function Q(I, S, N) {
            return q(I, te, S, N);
          }
          var ue, X, te, pe;
          function G(I) {
            ue = I, t.HEAP8 = X = new Int8Array(I), t.HEAP16 = new Int16Array(I), t.HEAP32 = new Int32Array(I), t.HEAPU8 = te = new Uint8Array(I), t.HEAPU16 = new Uint16Array(I), t.HEAPU32 = pe = new Uint32Array(I), t.HEAPF32 = new Float32Array(I), t.HEAPF64 = new Float64Array(I);
          }
          t.INITIAL_MEMORY;
          var he = [], ie = [], de = [];
          function _e() {
            if (t.preRun) for (typeof t.preRun == "function" && (t.preRun = [
              t.preRun
            ]); t.preRun.length; ) Le(t.preRun.shift());
            Je(he);
          }
          function ne() {
            Je(ie);
          }
          function He() {
            if (t.postRun) for (typeof t.postRun == "function" && (t.postRun = [
              t.postRun
            ]); t.postRun.length; ) Xe(t.postRun.shift());
            Je(de);
          }
          function Le(I) {
            he.unshift(I);
          }
          function qe(I) {
            ie.unshift(I);
          }
          function Xe(I) {
            de.unshift(I);
          }
          var Y = 0, Me = null;
          function ot(I) {
            Y++, t.monitorRunDependencies && t.monitorRunDependencies(Y);
          }
          function it(I) {
            if (Y--, t.monitorRunDependencies && t.monitorRunDependencies(Y), Y == 0 && Me) {
              var S = Me;
              Me = null, S();
            }
          }
          function Ne(I) {
            t.onAbort && t.onAbort(I), I = "Aborted(" + I + ")", E(I), V = true, I += ". Build with -sASSERTIONS for more info.";
            var S = new WebAssembly.RuntimeError(I);
            throw d(S), S;
          }
          var dt = "data:application/octet-stream;base64,";
          function be(I) {
            return I.startsWith(dt);
          }
          function Ce(I) {
            return I.startsWith("file://");
          }
          var ae;
          ae = "tfjs-backend-wasm.wasm", be(ae) || (ae = f(ae));
          function Ke(I) {
            try {
              if (I == ae && R) return new Uint8Array(R);
              if (k) return k(I);
              throw "both async and sync fetching of the wasm failed";
            } catch (S) {
              Ne(S);
            }
          }
          function ct() {
            if (!R && (e || m)) {
              if (typeof fetch == "function" && !Ce(ae)) return fetch(ae, {
                credentials: "same-origin"
              }).then(function(I) {
                if (!I.ok) throw "failed to load wasm binary file at '" + ae + "'";
                return I.arrayBuffer();
              }).catch(function() {
                return Ke(ae);
              });
              if (w) return new Promise(function(I, S) {
                w(ae, function(N) {
                  I(new Uint8Array(N));
                }, S);
              });
            }
            return Promise.resolve().then(function() {
              return Ke(ae);
            });
          }
          function pt() {
            var I = {
              env: ht,
              wasi_snapshot_preview1: ht
            };
            function S(O, W) {
              var Z = O.exports;
              t.asm = Z, B = t.asm.memory, G(B.buffer), t.asm.__indirect_function_table, qe(t.asm.__wasm_call_ctors), it();
            }
            ot();
            function N(O) {
              S(O.instance);
            }
            function A(O) {
              return ct().then(function(W) {
                return WebAssembly.instantiate(W, I);
              }).then(function(W) {
                return W;
              }).then(O, function(W) {
                E("failed to asynchronously prepare wasm: " + W), Ne(W);
              });
            }
            function j() {
              return !R && typeof WebAssembly.instantiateStreaming == "function" && !be(ae) && !Ce(ae) && !b && typeof fetch == "function" ? fetch(ae, {
                credentials: "same-origin"
              }).then(function(O) {
                var W = WebAssembly.instantiateStreaming(O, I);
                return W.then(N, function(Z) {
                  return E("wasm streaming compile failed: " + Z), E("falling back to ArrayBuffer instantiation"), A(N);
                });
              }) : A(N);
            }
            if (t.instantiateWasm) try {
              var K = t.instantiateWasm(I, S);
              return K;
            } catch (O) {
              E("Module.instantiateWasm callback failed with error: " + O), d(O);
            }
            return j().catch(d), {};
          }
          function Ve(I) {
            this.name = "ExitStatus", this.message = "Program terminated with exit(" + I + ")", this.status = I;
          }
          function Je(I) {
            for (; I.length > 0; ) I.shift()(t);
          }
          function lt() {
            Ne("");
          }
          function mt() {
            return 4294901760;
          }
          function Et() {
            return mt();
          }
          function Pt(I, S, N) {
            te.copyWithin(I >>> 0, S >>> 0, S + N >>> 0);
          }
          function Wt(I) {
            try {
              return B.grow(I - ue.byteLength + 65535 >>> 16), G(B.buffer), 1;
            } catch {
            }
          }
          function ye(I) {
            var S = te.length;
            I = I >>> 0;
            var N = mt();
            if (I > N) return false;
            let A = (Z, le) => Z + (le - Z % le) % le;
            for (var j = 1; j <= 4; j *= 2) {
              var K = S * (1 + 0.2 / j);
              K = Math.min(K, I + 100663296);
              var O = Math.min(N, A(Math.max(I, K), 65536)), W = Wt(O);
              if (W) return true;
            }
            return false;
          }
          function Fe(I) {
            return 52;
          }
          function Tt(I, S, N, A, j) {
            return 70;
          }
          var Bt = [
            null,
            [],
            []
          ];
          function Re(I, S) {
            var N = Bt[I];
            S === 0 || S === 10 ? ((I === 1 ? v : E)(H(N, 0)), N.length = 0) : N.push(S);
          }
          function Ot(I, S, N, A) {
            for (var j = 0, K = 0; K < N; K++) {
              var O = pe[S >>> 2], W = pe[S + 4 >>> 2];
              S += 8;
              for (var Z = 0; Z < W; Z++) Re(I, te[O + Z >>> 0]);
              j += W;
            }
            return pe[A >>> 2] = j, 0;
          }
          function Qe(I) {
            var S = t["_" + I];
            return S;
          }
          function $e(I, S) {
            X.set(I, S >>> 0);
          }
          function se(I, S, N, A, j) {
            var K = {
              string: (re) => {
                var ve = 0;
                if (re != null && re !== 0) {
                  var kt = (re.length << 2) + 1;
                  ve = Ie(kt), Q(re, ve, kt);
                }
                return ve;
              },
              array: (re) => {
                var ve = Ie(re.length);
                return $e(re, ve), ve;
              }
            };
            function O(re) {
              return S === "string" ? U(re) : S === "boolean" ? !!re : re;
            }
            var W = Qe(I), Z = [], le = 0;
            if (A) for (var we = 0; we < A.length; we++) {
              var It = K[N[we]];
              It ? (le === 0 && (le = gt()), Z[we] = It(A[we])) : Z[we] = A[we];
            }
            var Ye = W.apply(null, Z);
            function wt(re) {
              return le !== 0 && bt(le), O(re);
            }
            return Ye = wt(Ye), Ye;
          }
          function ft(I, S, N, A) {
            N = N || [];
            var j = N.every((O) => O === "number" || O === "boolean"), K = S !== "string";
            return K && j && !A ? Qe(I) : function() {
              return se(I, S, N, arguments);
            };
          }
          var ht = {
            abort: lt,
            emscripten_get_heap_max: Et,
            emscripten_memcpy_big: Pt,
            emscripten_resize_heap: ye,
            fd_close: Fe,
            fd_seek: Tt,
            fd_write: Ot
          };
          pt(), t.___wasm_call_ctors = function() {
            return (t.___wasm_call_ctors = t.asm.__wasm_call_ctors).apply(null, arguments);
          }, t._init = function() {
            return (t._init = t.asm.init).apply(null, arguments);
          }, t._init_with_threads_count = function() {
            return (t._init_with_threads_count = t.asm.init_with_threads_count).apply(null, arguments);
          }, t._get_threads_count = function() {
            return (t._get_threads_count = t.asm.get_threads_count).apply(null, arguments);
          }, t._register_tensor = function() {
            return (t._register_tensor = t.asm.register_tensor).apply(null, arguments);
          }, t._dispose_data = function() {
            return (t._dispose_data = t.asm.dispose_data).apply(null, arguments);
          }, t._dispose = function() {
            return (t._dispose = t.asm.dispose).apply(null, arguments);
          }, t._Abs = function() {
            return (t._Abs = t.asm.Abs).apply(null, arguments);
          }, t._Acos = function() {
            return (t._Acos = t.asm.Acos).apply(null, arguments);
          }, t._Acosh = function() {
            return (t._Acosh = t.asm.Acosh).apply(null, arguments);
          }, t._Add = function() {
            return (t._Add = t.asm.Add).apply(null, arguments);
          }, t._AddN = function() {
            return (t._AddN = t.asm.AddN).apply(null, arguments);
          }, t._All = function() {
            return (t._All = t.asm.All).apply(null, arguments);
          }, t._Any = function() {
            return (t._Any = t.asm.Any).apply(null, arguments);
          }, t._ArgMax = function() {
            return (t._ArgMax = t.asm.ArgMax).apply(null, arguments);
          }, t._ArgMin = function() {
            return (t._ArgMin = t.asm.ArgMin).apply(null, arguments);
          }, t._Asin = function() {
            return (t._Asin = t.asm.Asin).apply(null, arguments);
          }, t._Asinh = function() {
            return (t._Asinh = t.asm.Asinh).apply(null, arguments);
          }, t._Atan = function() {
            return (t._Atan = t.asm.Atan).apply(null, arguments);
          }, t._Atan2 = function() {
            return (t._Atan2 = t.asm.Atan2).apply(null, arguments);
          }, t._Atanh = function() {
            return (t._Atanh = t.asm.Atanh).apply(null, arguments);
          }, t._AvgPool = function() {
            return (t._AvgPool = t.asm.AvgPool).apply(null, arguments);
          }, t._AvgPool3D = function() {
            return (t._AvgPool3D = t.asm.AvgPool3D).apply(null, arguments);
          }, t._AvgPool3DGrad = function() {
            return (t._AvgPool3DGrad = t.asm.AvgPool3DGrad).apply(null, arguments);
          }, t._AvgPoolGrad = function() {
            return (t._AvgPoolGrad = t.asm.AvgPoolGrad).apply(null, arguments);
          }, t._BatchMatMul = function() {
            return (t._BatchMatMul = t.asm.BatchMatMul).apply(null, arguments);
          }, t._Bincount = function() {
            return (t._Bincount = t.asm.Bincount).apply(null, arguments);
          }, t._BitwiseAnd = function() {
            return (t._BitwiseAnd = t.asm.BitwiseAnd).apply(null, arguments);
          }, t._Ceil = function() {
            return (t._Ceil = t.asm.Ceil).apply(null, arguments);
          }, t._ClipByValue = function() {
            return (t._ClipByValue = t.asm.ClipByValue).apply(null, arguments);
          }, t._Conv2D = function() {
            return (t._Conv2D = t.asm.Conv2D).apply(null, arguments);
          }, t._Conv2DBackpropInput = function() {
            return (t._Conv2DBackpropInput = t.asm.Conv2DBackpropInput).apply(null, arguments);
          }, t._Conv3D = function() {
            return (t._Conv3D = t.asm.Conv3D).apply(null, arguments);
          }, t._Conv3DBackpropFilterV2 = function() {
            return (t._Conv3DBackpropFilterV2 = t.asm.Conv3DBackpropFilterV2).apply(null, arguments);
          }, t._Conv3DBackpropInputV2 = function() {
            return (t._Conv3DBackpropInputV2 = t.asm.Conv3DBackpropInputV2).apply(null, arguments);
          }, t._Cos = function() {
            return (t._Cos = t.asm.Cos).apply(null, arguments);
          }, t._Cosh = function() {
            return (t._Cosh = t.asm.Cosh).apply(null, arguments);
          }, t._CropAndResize = function() {
            return (t._CropAndResize = t.asm.CropAndResize).apply(null, arguments);
          }, t._Cumprod = function() {
            return (t._Cumprod = t.asm.Cumprod).apply(null, arguments);
          }, t._Cumsum = function() {
            return (t._Cumsum = t.asm.Cumsum).apply(null, arguments);
          }, t._DenseBincount = function() {
            return (t._DenseBincount = t.asm.DenseBincount).apply(null, arguments);
          }, t._DepthToSpace = function() {
            return (t._DepthToSpace = t.asm.DepthToSpace).apply(null, arguments);
          }, t._DepthwiseConv2dNative = function() {
            return (t._DepthwiseConv2dNative = t.asm.DepthwiseConv2dNative).apply(null, arguments);
          }, t._Diag = function() {
            return (t._Diag = t.asm.Diag).apply(null, arguments);
          }, t._Dilation2D = function() {
            return (t._Dilation2D = t.asm.Dilation2D).apply(null, arguments);
          }, t._Dilation2DBackpropFilter = function() {
            return (t._Dilation2DBackpropFilter = t.asm.Dilation2DBackpropFilter).apply(null, arguments);
          }, t._Dilation2DBackpropInput = function() {
            return (t._Dilation2DBackpropInput = t.asm.Dilation2DBackpropInput).apply(null, arguments);
          }, t._Elu = function() {
            return (t._Elu = t.asm.Elu).apply(null, arguments);
          }, t._EluGrad = function() {
            return (t._EluGrad = t.asm.EluGrad).apply(null, arguments);
          }, t._Equal = function() {
            return (t._Equal = t.asm.Equal).apply(null, arguments);
          }, t._Erf = function() {
            return (t._Erf = t.asm.Erf).apply(null, arguments);
          }, t._Exp = function() {
            return (t._Exp = t.asm.Exp).apply(null, arguments);
          }, t._Expm1 = function() {
            return (t._Expm1 = t.asm.Expm1).apply(null, arguments);
          }, t._FlipLeftRight = function() {
            return (t._FlipLeftRight = t.asm.FlipLeftRight).apply(null, arguments);
          }, t._Floor = function() {
            return (t._Floor = t.asm.Floor).apply(null, arguments);
          }, t._FloorDiv = function() {
            return (t._FloorDiv = t.asm.FloorDiv).apply(null, arguments);
          }, t._FusedBatchNorm = function() {
            return (t._FusedBatchNorm = t.asm.FusedBatchNorm).apply(null, arguments);
          }, t._FusedConv2D = function() {
            return (t._FusedConv2D = t.asm.FusedConv2D).apply(null, arguments);
          }, t._FusedDepthwiseConv2D = function() {
            return (t._FusedDepthwiseConv2D = t.asm.FusedDepthwiseConv2D).apply(null, arguments);
          }, t._Gather = function() {
            return (t._Gather = t.asm.Gather).apply(null, arguments);
          }, t._GatherNd = function() {
            return (t._GatherNd = t.asm.GatherNd).apply(null, arguments);
          }, t._Greater = function() {
            return (t._Greater = t.asm.Greater).apply(null, arguments);
          }, t._GreaterEqual = function() {
            return (t._GreaterEqual = t.asm.GreaterEqual).apply(null, arguments);
          }, t._IsFinite = function() {
            return (t._IsFinite = t.asm.IsFinite).apply(null, arguments);
          }, t._IsInf = function() {
            return (t._IsInf = t.asm.IsInf).apply(null, arguments);
          }, t._IsNan = function() {
            return (t._IsNan = t.asm.IsNan).apply(null, arguments);
          }, t._LRN = function() {
            return (t._LRN = t.asm.LRN).apply(null, arguments);
          }, t._LRNGrad = function() {
            return (t._LRNGrad = t.asm.LRNGrad).apply(null, arguments);
          }, t._LeakyRelu = function() {
            return (t._LeakyRelu = t.asm.LeakyRelu).apply(null, arguments);
          }, t._Less = function() {
            return (t._Less = t.asm.Less).apply(null, arguments);
          }, t._LessEqual = function() {
            return (t._LessEqual = t.asm.LessEqual).apply(null, arguments);
          }, t._LinSpace = function() {
            return (t._LinSpace = t.asm.LinSpace).apply(null, arguments);
          }, t._Log = function() {
            return (t._Log = t.asm.Log).apply(null, arguments);
          }, t._Log1p = function() {
            return (t._Log1p = t.asm.Log1p).apply(null, arguments);
          }, t._LogicalAnd = function() {
            return (t._LogicalAnd = t.asm.LogicalAnd).apply(null, arguments);
          }, t._LogicalNot = function() {
            return (t._LogicalNot = t.asm.LogicalNot).apply(null, arguments);
          }, t._LogicalOr = function() {
            return (t._LogicalOr = t.asm.LogicalOr).apply(null, arguments);
          }, t._LogicalXor = function() {
            return (t._LogicalXor = t.asm.LogicalXor).apply(null, arguments);
          }, t._Max = function() {
            return (t._Max = t.asm.Max).apply(null, arguments);
          }, t._MaxPool = function() {
            return (t._MaxPool = t.asm.MaxPool).apply(null, arguments);
          }, t._MaxPool3D = function() {
            return (t._MaxPool3D = t.asm.MaxPool3D).apply(null, arguments);
          }, t._MaxPool3DGrad = function() {
            return (t._MaxPool3DGrad = t.asm.MaxPool3DGrad).apply(null, arguments);
          }, t._MaxPoolGrad = function() {
            return (t._MaxPoolGrad = t.asm.MaxPoolGrad).apply(null, arguments);
          }, t._MaxPoolWithArgmax = function() {
            return (t._MaxPoolWithArgmax = t.asm.MaxPoolWithArgmax).apply(null, arguments);
          }, t._Maximum = function() {
            return (t._Maximum = t.asm.Maximum).apply(null, arguments);
          }, t._Mean = function() {
            return (t._Mean = t.asm.Mean).apply(null, arguments);
          }, t._Min = function() {
            return (t._Min = t.asm.Min).apply(null, arguments);
          }, t._Minimum = function() {
            return (t._Minimum = t.asm.Minimum).apply(null, arguments);
          }, t._MirrorPad = function() {
            return (t._MirrorPad = t.asm.MirrorPad).apply(null, arguments);
          }, t._Mod = function() {
            return (t._Mod = t.asm.Mod).apply(null, arguments);
          }, t._Multinomial = function() {
            return (t._Multinomial = t.asm.Multinomial).apply(null, arguments);
          }, t._Multiply = function() {
            return (t._Multiply = t.asm.Multiply).apply(null, arguments);
          }, t._Neg = function() {
            return (t._Neg = t.asm.Neg).apply(null, arguments);
          }, t._NonMaxSuppressionV3 = function() {
            return (t._NonMaxSuppressionV3 = t.asm.NonMaxSuppressionV3).apply(null, arguments);
          }, t._NonMaxSuppressionV4 = function() {
            return (t._NonMaxSuppressionV4 = t.asm.NonMaxSuppressionV4).apply(null, arguments);
          }, t._NonMaxSuppressionV5 = function() {
            return (t._NonMaxSuppressionV5 = t.asm.NonMaxSuppressionV5).apply(null, arguments);
          }, t._NotEqual = function() {
            return (t._NotEqual = t.asm.NotEqual).apply(null, arguments);
          }, t._OneHot = function() {
            return (t._OneHot = t.asm.OneHot).apply(null, arguments);
          }, t._PadV2 = function() {
            return (t._PadV2 = t.asm.PadV2).apply(null, arguments);
          }, t._Pow = function() {
            return (t._Pow = t.asm.Pow).apply(null, arguments);
          }, t._Prelu = function() {
            return (t._Prelu = t.asm.Prelu).apply(null, arguments);
          }, t._Prod = function() {
            return (t._Prod = t.asm.Prod).apply(null, arguments);
          }, t._RealDiv = function() {
            return (t._RealDiv = t.asm.RealDiv).apply(null, arguments);
          }, t._Reciprocal = function() {
            return (t._Reciprocal = t.asm.Reciprocal).apply(null, arguments);
          }, t._Relu = function() {
            return (t._Relu = t.asm.Relu).apply(null, arguments);
          }, t._Relu6 = function() {
            return (t._Relu6 = t.asm.Relu6).apply(null, arguments);
          }, t._ResizeBilinear = function() {
            return (t._ResizeBilinear = t.asm.ResizeBilinear).apply(null, arguments);
          }, t._ResizeBilinearGrad = function() {
            return (t._ResizeBilinearGrad = t.asm.ResizeBilinearGrad).apply(null, arguments);
          }, t._ResizeNearestNeighbor = function() {
            return (t._ResizeNearestNeighbor = t.asm.ResizeNearestNeighbor).apply(null, arguments);
          }, t._ResizeNearestNeighborGrad = function() {
            return (t._ResizeNearestNeighborGrad = t.asm.ResizeNearestNeighborGrad).apply(null, arguments);
          }, t._Reverse = function() {
            return (t._Reverse = t.asm.Reverse).apply(null, arguments);
          }, t._RotateWithOffset = function() {
            return (t._RotateWithOffset = t.asm.RotateWithOffset).apply(null, arguments);
          }, t._Round = function() {
            return (t._Round = t.asm.Round).apply(null, arguments);
          }, t._Rsqrt = function() {
            return (t._Rsqrt = t.asm.Rsqrt).apply(null, arguments);
          }, t._ScatterNd = function() {
            return (t._ScatterNd = t.asm.ScatterNd).apply(null, arguments);
          }, t._SearchSorted = function() {
            return (t._SearchSorted = t.asm.SearchSorted).apply(null, arguments);
          }, t._SelectV2 = function() {
            return (t._SelectV2 = t.asm.SelectV2).apply(null, arguments);
          }, t._Selu = function() {
            return (t._Selu = t.asm.Selu).apply(null, arguments);
          }, t._Sigmoid = function() {
            return (t._Sigmoid = t.asm.Sigmoid).apply(null, arguments);
          }, t._Sign = function() {
            return (t._Sign = t.asm.Sign).apply(null, arguments);
          }, t._Sin = function() {
            return (t._Sin = t.asm.Sin).apply(null, arguments);
          }, t._Sinh = function() {
            return (t._Sinh = t.asm.Sinh).apply(null, arguments);
          }, t._Softmax = function() {
            return (t._Softmax = t.asm.Softmax).apply(null, arguments);
          }, t._Softplus = function() {
            return (t._Softplus = t.asm.Softplus).apply(null, arguments);
          }, t._SparseFillEmptyRows = function() {
            return (t._SparseFillEmptyRows = t.asm.SparseFillEmptyRows).apply(null, arguments);
          }, t._SparseReshape = function() {
            return (t._SparseReshape = t.asm.SparseReshape).apply(null, arguments);
          }, t._SparseSegmentReduction = function() {
            return (t._SparseSegmentReduction = t.asm.SparseSegmentReduction).apply(null, arguments);
          }, t._SparseToDense = function() {
            return (t._SparseToDense = t.asm.SparseToDense).apply(null, arguments);
          }, t._Sqrt = function() {
            return (t._Sqrt = t.asm.Sqrt).apply(null, arguments);
          }, t._Square = function() {
            return (t._Square = t.asm.Square).apply(null, arguments);
          }, t._SquaredDifference = function() {
            return (t._SquaredDifference = t.asm.SquaredDifference).apply(null, arguments);
          }, t._Step = function() {
            return (t._Step = t.asm.Step).apply(null, arguments);
          }, t._StridedSlice = function() {
            return (t._StridedSlice = t.asm.StridedSlice).apply(null, arguments);
          }, t._Sub = function() {
            return (t._Sub = t.asm.Sub).apply(null, arguments);
          }, t._Sum = function() {
            return (t._Sum = t.asm.Sum).apply(null, arguments);
          }, t._Tan = function() {
            return (t._Tan = t.asm.Tan).apply(null, arguments);
          }, t._Tanh = function() {
            return (t._Tanh = t.asm.Tanh).apply(null, arguments);
          }, t._TensorScatterUpdate = function() {
            return (t._TensorScatterUpdate = t.asm.TensorScatterUpdate).apply(null, arguments);
          }, t._Tile = function() {
            return (t._Tile = t.asm.Tile).apply(null, arguments);
          }, t._TopK = function() {
            return (t._TopK = t.asm.TopK).apply(null, arguments);
          }, t._Transform = function() {
            return (t._Transform = t.asm.Transform).apply(null, arguments);
          }, t._Transpose = function() {
            return (t._Transpose = t.asm.Transpose).apply(null, arguments);
          }, t.__FusedMatMul = function() {
            return (t.__FusedMatMul = t.asm._FusedMatMul).apply(null, arguments);
          }, t._malloc = function() {
            return (t._malloc = t.asm.malloc).apply(null, arguments);
          }, t._free = function() {
            return (t._free = t.asm.free).apply(null, arguments);
          }, t.___errno_location = function() {
            return (t.___errno_location = t.asm.__errno_location).apply(null, arguments);
          };
          var gt = t.stackSave = function() {
            return (gt = t.stackSave = t.asm.stackSave).apply(null, arguments);
          }, bt = t.stackRestore = function() {
            return (bt = t.stackRestore = t.asm.stackRestore).apply(null, arguments);
          }, Ie = t.stackAlloc = function() {
            return (Ie = t.stackAlloc = t.asm.stackAlloc).apply(null, arguments);
          };
          t.dynCall_iijjiiii = function() {
            return (t.dynCall_iijjiiii = t.asm.dynCall_iijjiiii).apply(null, arguments);
          }, t.dynCall_jiji = function() {
            return (t.dynCall_jiji = t.asm.dynCall_jiji).apply(null, arguments);
          }, t.cwrap = ft;
          var ze;
          Me = function I() {
            ze || _t(), ze || (Me = I);
          };
          function _t(I) {
            if (Y > 0 || (_e(), Y > 0)) return;
            function S() {
              ze || (ze = true, t.calledRun = true, !V && (ne(), i(t), t.onRuntimeInitialized && t.onRuntimeInitialized(), He()));
            }
            t.setStatus ? (t.setStatus("Running..."), setTimeout(function() {
              setTimeout(function() {
                t.setStatus("");
              }, 1), S();
            }, 1)) : S();
          }
          if (t.preInit) for (typeof t.preInit == "function" && (t.preInit = [
            t.preInit
          ]); t.preInit.length > 0; ) t.preInit.pop()();
          _t();
          var Ee;
          c && (Ee = {
            uncaughtException: process.listeners("uncaughtException").filter(function(I) {
              return !c.uncaughtException.indexOf(I) > -1;
            }),
            unhandledRejection: process.listeners("unhandledRejection").filter(function(I) {
              return !c.unhandledRejection.indexOf(I) > -1;
            })
          });
          var Pe;
          if (typeof a < "u") Pe = a;
          else if (typeof WasmBackendModuleThreadedSimd < "u") Pe = WasmBackendModuleThreadedSimd;
          else throw new Error("Could not find wasm module in post.js");
          if (Ee) {
            var yt = Pe._dispose;
            Pe._dispose = function() {
              yt(), Ee.uncaughtException.forEach(function(I) {
                process.removeListener("uncaughtException", I);
              }), Ee.unhandledRejection.forEach(function(I) {
                process.removeListener("unhandledRejection", I);
              });
            };
          }
          return a.ready;
        };
      })();
      r.exports = s;
    }(Xt)), Xt.exports;
  }
  var As = zf();
  const xs = ja(As), Gf = qa({
    __proto__: null,
    default: xs
  }, [
    As
  ]);
  const Cn = vs || Lf, Uf = xs || Gf;
  jf = class extends Ii {
    constructor(n) {
      super(), this.wasm = n, this.dataIdNextNumber = 1, this.wasm.tfjs.initWithThreadsCount(Ds), en = this.wasm.tfjs.getThreadsCount(), this.dataIdMap = new wi(this, ki());
    }
    write(n, s, o) {
      const a = {
        id: this.dataIdNextNumber++
      };
      return this.move(a, n, s, o, 1), a;
    }
    numDataIds() {
      return this.dataIdMap.numDataIds();
    }
    async time(n) {
      const s = vn();
      return n(), {
        kernelMs: vn() - s
      };
    }
    move(n, s, o, a, t) {
      const i = this.dataIdNextNumber++;
      if (a === "string") {
        const e = s;
        this.dataIdMap.set(n, {
          id: i,
          stringBytes: e,
          shape: o,
          dtype: a,
          memoryOffset: null,
          refCount: t
        });
        return;
      }
      const d = F(o), c = d * An(a), u = this.wasm._malloc(c) >>> 0;
      this.dataIdMap.set(n, {
        id: i,
        memoryOffset: u,
        shape: o,
        dtype: a,
        refCount: t
      }), this.wasm.tfjs.registerTensor(i, d, u), s != null && this.wasm.HEAPU8.set(new Uint8Array(s.buffer, s.byteOffset, c), u);
    }
    async read(n) {
      return this.readSync(n);
    }
    readSync(n, s, o) {
      const { memoryOffset: a, dtype: t, shape: i, stringBytes: d } = this.dataIdMap.get(n);
      if (t === "string") return (s == null || s === 0) && (o == null || o >= d.length) ? d : d.slice(s, o);
      s = s || 0, o = o || F(i);
      const c = An(t), u = this.wasm.HEAPU8.slice(a + s * c, a + o * c);
      return Kf(u.buffer, t);
    }
    disposeData(n, s = false) {
      if (this.dataIdMap.has(n)) {
        const o = this.dataIdMap.get(n);
        if (o.refCount--, !s && o.refCount > 0) return false;
        this.wasm._free(o.memoryOffset), this.wasm.tfjs.disposeData(o.id), this.dataIdMap.delete(n);
      }
      return true;
    }
    refCount(n) {
      return this.dataIdMap.has(n) ? this.dataIdMap.get(n).refCount : 0;
    }
    incRef(n) {
      const s = this.dataIdMap.get(n);
      s != null && s.refCount++;
    }
    floatPrecision() {
      return 32;
    }
    getMemoryOffset(n) {
      return this.dataIdMap.get(n).memoryOffset;
    }
    dispose() {
      this.wasm.tfjs.dispose(), "PThread" in this.wasm && this.wasm.PThread.terminateAllThreads(), this.wasm = null;
    }
    memory() {
      return {
        unreliable: false
      };
    }
    makeOutput(n, s, o, a) {
      let t;
      if (o == null) t = this.write(a ?? null, n, s);
      else {
        const i = this.dataIdNextNumber++;
        t = {
          id: i
        }, this.dataIdMap.set(t, {
          id: i,
          memoryOffset: o,
          shape: n,
          dtype: s,
          refCount: 1
        });
        const d = F(n);
        this.wasm.tfjs.registerTensor(i, d, o);
      }
      return {
        dataId: t,
        shape: n,
        dtype: s
      };
    }
    typedArrayFromHeap({ shape: n, dtype: s, dataId: o }) {
      const a = this.wasm.HEAPU8.buffer, { memoryOffset: t } = this.dataIdMap.get(o), i = F(n);
      switch (s) {
        case "float32":
          return new Float32Array(a, t, i);
        case "int32":
          return new Int32Array(a, t, i);
        case "bool":
          return new Uint8Array(a, t, i);
        default:
          throw new Error(`Unknown dtype ${s}`);
      }
    }
  };
  function qf(r) {
    return (n, s) => (Mi(r, {
      credentials: "same-origin"
    }).then((o) => {
      o.ok || n.env.a(`failed to load wasm binary file at '${r}'`), o.arrayBuffer().then((a) => {
        WebAssembly.instantiate(a, n).then((t) => {
          s(t.instance, t.module);
        });
      });
    }), {});
  }
  function Fn(r, n, s) {
    if (Nt != null) return Nt;
    let o = "tfjs-backend-wasm.wasm";
    return r && n ? o = "tfjs-backend-wasm-threaded-simd.wasm" : r && (o = "tfjs-backend-wasm-simd.wasm"), tt != null && tt[o] != null ? tt[o] : s + o;
  }
  async function Xf() {
    const [r, n] = await Promise.all([
      Kt().getAsync("WASM_HAS_SIMD_SUPPORT"),
      Kt().getAsync("WASM_HAS_MULTITHREAD_SUPPORT")
    ]);
    return new Promise((s, o) => {
      const a = {};
      a.locateFile = (d, c) => {
        if (d.endsWith(".worker.js")) {
          const u = $f.wasmWorkerContents.replace(/\n/g, "\\n"), e = new Blob([
            u
          ], {
            type: "application/javascript"
          });
          return URL.createObjectURL(e);
        }
        return d.endsWith(".wasm") ? Fn(r, n, et ?? c) : c + d;
      }, un && (a.instantiateWasm = qf(Fn(r, n, et ?? "")));
      let t = false;
      a.onAbort = () => {
        if (t || nt) return;
        nt = true, o({
          message: "Make sure the server can serve the `.wasm` file relative to the bundled js file. For more details see https://github.com/tensorflow/tfjs/blob/master/tfjs-backend-wasm/README.md#using-bundlers"
        });
      };
      let i;
      n && r && Nt == null ? (a.mainScriptUrlOrBlob = new Blob([
        "var WasmBackendModuleThreadedSimd = " + Cn.toString()
      ], {
        type: "text/javascript"
      }), i = Cn(a)) : i = Uf(a), i.then((d) => {
        t = true, nt = false;
        const c = null;
        d.tfjs = {
          init: d.cwrap("init", null, []),
          initWithThreadsCount: d.cwrap("init_with_threads_count", null, [
            "number"
          ]),
          getThreadsCount: d.cwrap("get_threads_count", "number", []),
          registerTensor: d.cwrap("register_tensor", null, [
            "number",
            "number",
            "number"
          ]),
          disposeData: d.cwrap("dispose_data", c, [
            "number"
          ]),
          dispose: d.cwrap("dispose", c, [])
        }, s({
          wasm: d
        });
      }).catch(o);
    });
  }
  function Kf(r, n) {
    switch (n) {
      case "float32":
        return new Float32Array(r);
      case "int32":
        return new Int32Array(r);
      case "bool":
        return new Uint8Array(r);
      default:
        throw new Error(`Unknown dtype ${n}`);
    }
  }
  const Jf = [
    "tfjs-backend-wasm.wasm",
    "tfjs-backend-wasm-simd.wasm",
    "tfjs-backend-wasm-threaded-simd.wasm"
  ];
  let Nt = null, et = null, tt = {}, nt = false, un = false;
  Zf = function(r, n = false) {
    if (Si("setWasmPath has been deprecated in favor of setWasmPaths and will be removed in a future release."), nt) throw new Error("The WASM backend was already initialized. Make sure you call `setWasmPath()` before you call `tf.setBackend()` or `tf.ready()`");
    Nt = r, un = n;
  };
  eh = function(r, n = false) {
    if (nt) throw new Error("The WASM backend was already initialized. Make sure you call `setWasmPaths()` before you call `tf.setBackend()` or `tf.ready()`");
    if (typeof r == "string") et = r;
    else {
      tt = r;
      const s = Jf.filter((o) => tt[o] == null);
      if (s.length > 0) throw new Error(`There were no entries found for the following binaries: ${s.join(",")}. Please either call setWasmPaths with a map providing a path for each binary, or with a string indicating the directory where all the binaries can be found.`);
    }
    un = n;
  };
  let Ds = -1, en = -1;
  th = function(r) {
    Ds = r;
  };
  nh = function() {
    if (en === -1) throw new Error("WASM backend not initialized.");
    return en;
  };
  const Qf = 2;
  vi("wasm", async () => {
    const { wasm: r } = await Xf();
    return new jf(r);
  }, Qf);
});
export {
  jf as B,
  __tla,
  Zf as a,
  eh as b,
  nh as g,
  th as s
};
