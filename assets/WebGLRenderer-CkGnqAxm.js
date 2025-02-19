import { E as d, B as T, w as m, D as S, K as j, u as Te, s as G, t as b, a4 as Be, j as K, S as p, O as L, i as B, h as A, k as U, q as $, M as z, a5 as Y, a6 as Ae, a7 as Ne, a8 as q, a9 as ye, A as Ie, R as De, e as x, __tla as __tla_0 } from "./ModelPerformanceTest-DjV__RXZ.js";
import { S as O, b as Z } from "./colorToUniform-C2GHuDhf.js";
import { e as Ce, G as Ge, c as Ue, b as Oe, U as Pe, R as Fe, B as Q, d as N, f as Me, S as Le, a as He, __tla as __tla_1 } from "./SharedSystems-C7PuDHqX.js";
import { __tla as __tla_2 } from "./index-N0A0NpVe.js";
let Pt;
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
  class J {
    constructor() {
      this._tempState = O.for2d(), this._didUploadHash = {};
    }
    init(e) {
      e.renderer.runners.contextChange.add(this);
    }
    contextChange() {
      this._didUploadHash = {};
    }
    start(e, r, s) {
      const n = e.renderer, i = this._didUploadHash[s.uid];
      n.shader.bind(s, i), i || (this._didUploadHash[s.uid] = true), n.shader.updateUniformGroup(n.globalUniforms.uniformGroup), n.geometry.bind(r, s.glProgram);
    }
    execute(e, r) {
      const s = e.renderer;
      this._tempState.blendMode = r.blendMode, s.state.set(this._tempState);
      const n = r.textures.textures;
      for (let i = 0; i < r.textures.count; i++) s.texture.bind(n[i], i);
      s.geometry.draw(r.topology, r.size, r.start);
    }
  }
  J.extension = {
    type: [
      d.WebGLPipesAdaptor
    ],
    name: "batch"
  };
  var v = ((t) => (t[t.ELEMENT_ARRAY_BUFFER = 34963] = "ELEMENT_ARRAY_BUFFER", t[t.ARRAY_BUFFER = 34962] = "ARRAY_BUFFER", t[t.UNIFORM_BUFFER = 35345] = "UNIFORM_BUFFER", t))(v || {});
  class we {
    constructor(e, r) {
      this._lastBindBaseLocation = -1, this._lastBindCallId = -1, this.buffer = e || null, this.updateID = -1, this.byteLength = -1, this.type = r;
    }
  }
  class ee {
    constructor(e) {
      this._gpuBuffers = /* @__PURE__ */ Object.create(null), this._boundBufferBases = /* @__PURE__ */ Object.create(null), this._minBaseLocation = 0, this._nextBindBaseIndex = this._minBaseLocation, this._bindCallId = 0, this._renderer = e, this._renderer.renderableGC.addManagedHash(this, "_gpuBuffers");
    }
    destroy() {
      this._renderer = null, this._gl = null, this._gpuBuffers = null, this._boundBufferBases = null;
    }
    contextChange() {
      const e = this._gl = this._renderer.gl;
      this._gpuBuffers = /* @__PURE__ */ Object.create(null), this._maxBindings = e.MAX_UNIFORM_BUFFER_BINDINGS ? e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS) : 0;
    }
    getGlBuffer(e) {
      return this._gpuBuffers[e.uid] || this.createGLBuffer(e);
    }
    bind(e) {
      const { _gl: r } = this, s = this.getGlBuffer(e);
      r.bindBuffer(s.type, s.buffer);
    }
    bindBufferBase(e, r) {
      const { _gl: s } = this;
      this._boundBufferBases[r] !== e && (this._boundBufferBases[r] = e, e._lastBindBaseLocation = r, s.bindBufferBase(s.UNIFORM_BUFFER, r, e.buffer));
    }
    nextBindBase(e) {
      this._bindCallId++, this._minBaseLocation = 0, e && (this._boundBufferBases[0] = null, this._minBaseLocation = 1, this._nextBindBaseIndex < 1 && (this._nextBindBaseIndex = 1));
    }
    freeLocationForBufferBase(e) {
      let r = this.getLastBindBaseLocation(e);
      if (r >= this._minBaseLocation) return e._lastBindCallId = this._bindCallId, r;
      let s = 0, n = this._nextBindBaseIndex;
      for (; s < 2; ) {
        n >= this._maxBindings && (n = this._minBaseLocation, s++);
        const i = this._boundBufferBases[n];
        if (i && i._lastBindCallId === this._bindCallId) {
          n++;
          continue;
        }
        break;
      }
      return r = n, this._nextBindBaseIndex = n + 1, s >= 2 ? -1 : (e._lastBindCallId = this._bindCallId, this._boundBufferBases[r] = null, r);
    }
    getLastBindBaseLocation(e) {
      const r = e._lastBindBaseLocation;
      return this._boundBufferBases[r] === e ? r : -1;
    }
    bindBufferRange(e, r, s, n) {
      const { _gl: i } = this;
      s || (s = 0), r || (r = 0), this._boundBufferBases[r] = null, i.bindBufferRange(i.UNIFORM_BUFFER, r || 0, e.buffer, s * 256, n || 256);
    }
    updateBuffer(e) {
      const { _gl: r } = this, s = this.getGlBuffer(e);
      if (e._updateID === s.updateID) return s;
      s.updateID = e._updateID, r.bindBuffer(s.type, s.buffer);
      const n = e.data, i = e.descriptor.usage & T.STATIC ? r.STATIC_DRAW : r.DYNAMIC_DRAW;
      return n ? s.byteLength >= n.byteLength ? r.bufferSubData(s.type, 0, n, 0, e._updateSize / n.BYTES_PER_ELEMENT) : (s.byteLength = n.byteLength, r.bufferData(s.type, n, i)) : (s.byteLength = e.descriptor.size, r.bufferData(s.type, s.byteLength, i)), s;
    }
    destroyAll() {
      const e = this._gl;
      for (const r in this._gpuBuffers) e.deleteBuffer(this._gpuBuffers[r].buffer);
      this._gpuBuffers = /* @__PURE__ */ Object.create(null);
    }
    onBufferDestroy(e, r) {
      const s = this._gpuBuffers[e.uid], n = this._gl;
      r || n.deleteBuffer(s.buffer), this._gpuBuffers[e.uid] = null;
    }
    createGLBuffer(e) {
      const { _gl: r } = this;
      let s = v.ARRAY_BUFFER;
      e.descriptor.usage & T.INDEX ? s = v.ELEMENT_ARRAY_BUFFER : e.descriptor.usage & T.UNIFORM && (s = v.UNIFORM_BUFFER);
      const n = new we(r.createBuffer(), s);
      return this._gpuBuffers[e.uid] = n, e.on("destroy", this.onBufferDestroy, this), n;
    }
    resetState() {
      this._boundBufferBases = /* @__PURE__ */ Object.create(null);
    }
  }
  ee.extension = {
    type: [
      d.WebGLSystem
    ],
    name: "buffer"
  };
  const P = class te {
    constructor(e) {
      this.supports = {
        uint32Indices: true,
        uniformBufferObject: true,
        vertexArrayObject: true,
        srgbTextures: true,
        nonPowOf2wrapping: true,
        msaa: true,
        nonPowOf2mipmaps: true
      }, this._renderer = e, this.extensions = /* @__PURE__ */ Object.create(null), this.handleContextLost = this.handleContextLost.bind(this), this.handleContextRestored = this.handleContextRestored.bind(this);
    }
    get isLost() {
      return !this.gl || this.gl.isContextLost();
    }
    contextChange(e) {
      this.gl = e, this._renderer.gl = e;
    }
    init(e) {
      e = {
        ...te.defaultOptions,
        ...e
      };
      let r = this.multiView = e.multiView;
      if (e.context && r && (m("Renderer created with both a context and multiview enabled. Disabling multiView as both cannot work together."), r = false), r ? this.canvas = S.get().createCanvas(this._renderer.canvas.width, this._renderer.canvas.height) : this.canvas = this._renderer.view.canvas, e.context) this.initFromContext(e.context);
      else {
        const s = this._renderer.background.alpha < 1, n = e.premultipliedAlpha ?? true, i = e.antialias && !this._renderer.backBuffer.useBackBuffer;
        this.createContext(e.preferWebGLVersion, {
          alpha: s,
          premultipliedAlpha: n,
          antialias: i,
          stencil: true,
          preserveDrawingBuffer: e.preserveDrawingBuffer,
          powerPreference: e.powerPreference ?? "default"
        });
      }
    }
    ensureCanvasSize(e) {
      if (!this.multiView) {
        e !== this.canvas && m("multiView is disabled, but targetCanvas is not the main canvas");
        return;
      }
      const { canvas: r } = this;
      (r.width < e.width || r.height < e.height) && (r.width = Math.max(e.width, e.width), r.height = Math.max(e.height, e.height));
    }
    initFromContext(e) {
      this.gl = e, this.webGLVersion = e instanceof S.get().getWebGLRenderingContext() ? 1 : 2, this.getExtensions(), this.validateContext(e), this._renderer.runners.contextChange.emit(e);
      const r = this._renderer.view.canvas;
      r.addEventListener("webglcontextlost", this.handleContextLost, false), r.addEventListener("webglcontextrestored", this.handleContextRestored, false);
    }
    createContext(e, r) {
      let s;
      const n = this.canvas;
      if (e === 2 && (s = n.getContext("webgl2", r)), !s && (s = n.getContext("webgl", r), !s)) throw new Error("This browser does not support WebGL. Try using the canvas renderer");
      this.gl = s, this.initFromContext(this.gl);
    }
    getExtensions() {
      const { gl: e } = this, r = {
        anisotropicFiltering: e.getExtension("EXT_texture_filter_anisotropic"),
        floatTextureLinear: e.getExtension("OES_texture_float_linear"),
        s3tc: e.getExtension("WEBGL_compressed_texture_s3tc"),
        s3tc_sRGB: e.getExtension("WEBGL_compressed_texture_s3tc_srgb"),
        etc: e.getExtension("WEBGL_compressed_texture_etc"),
        etc1: e.getExtension("WEBGL_compressed_texture_etc1"),
        pvrtc: e.getExtension("WEBGL_compressed_texture_pvrtc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),
        atc: e.getExtension("WEBGL_compressed_texture_atc"),
        astc: e.getExtension("WEBGL_compressed_texture_astc"),
        bptc: e.getExtension("EXT_texture_compression_bptc"),
        rgtc: e.getExtension("EXT_texture_compression_rgtc"),
        loseContext: e.getExtension("WEBGL_lose_context")
      };
      if (this.webGLVersion === 1) this.extensions = {
        ...r,
        drawBuffers: e.getExtension("WEBGL_draw_buffers"),
        depthTexture: e.getExtension("WEBGL_depth_texture"),
        vertexArrayObject: e.getExtension("OES_vertex_array_object") || e.getExtension("MOZ_OES_vertex_array_object") || e.getExtension("WEBKIT_OES_vertex_array_object"),
        uint32ElementIndex: e.getExtension("OES_element_index_uint"),
        floatTexture: e.getExtension("OES_texture_float"),
        floatTextureLinear: e.getExtension("OES_texture_float_linear"),
        textureHalfFloat: e.getExtension("OES_texture_half_float"),
        textureHalfFloatLinear: e.getExtension("OES_texture_half_float_linear"),
        vertexAttribDivisorANGLE: e.getExtension("ANGLE_instanced_arrays"),
        srgb: e.getExtension("EXT_sRGB")
      };
      else {
        this.extensions = {
          ...r,
          colorBufferFloat: e.getExtension("EXT_color_buffer_float")
        };
        const s = e.getExtension("WEBGL_provoking_vertex");
        s && s.provokingVertexWEBGL(s.FIRST_VERTEX_CONVENTION_WEBGL);
      }
    }
    handleContextLost(e) {
      e.preventDefault(), this._contextLossForced && (this._contextLossForced = false, setTimeout(() => {
        var _a;
        this.gl.isContextLost() && ((_a = this.extensions.loseContext) == null ? void 0 : _a.restoreContext());
      }, 0));
    }
    handleContextRestored() {
      this._renderer.runners.contextChange.emit(this.gl);
    }
    destroy() {
      var _a;
      const e = this._renderer.view.canvas;
      this._renderer = null, e.removeEventListener("webglcontextlost", this.handleContextLost), e.removeEventListener("webglcontextrestored", this.handleContextRestored), this.gl.useProgram(null), (_a = this.extensions.loseContext) == null ? void 0 : _a.loseContext();
    }
    forceContextLoss() {
      var _a;
      (_a = this.extensions.loseContext) == null ? void 0 : _a.loseContext(), this._contextLossForced = true;
    }
    validateContext(e) {
      const r = e.getContextAttributes();
      r && !r.stencil && m("Provided WebGL context does not have a stencil buffer, masks may not render correctly");
      const s = this.supports, n = this.webGLVersion === 2, i = this.extensions;
      s.uint32Indices = n || !!i.uint32ElementIndex, s.uniformBufferObject = n, s.vertexArrayObject = n || !!i.vertexArrayObject, s.srgbTextures = n || !!i.srgb, s.nonPowOf2wrapping = n, s.nonPowOf2mipmaps = n, s.msaa = n, s.uint32Indices || m("Provided WebGL context does not support 32 index buffer, large scenes may not render correctly");
    }
  };
  P.extension = {
    type: [
      d.WebGLSystem
    ],
    name: "context"
  };
  P.defaultOptions = {
    context: null,
    premultipliedAlpha: true,
    preserveDrawingBuffer: false,
    powerPreference: void 0,
    preferWebGLVersion: 2,
    multiView: false
  };
  let Ve = P;
  var D = ((t) => (t[t.RGBA = 6408] = "RGBA", t[t.RGB = 6407] = "RGB", t[t.RG = 33319] = "RG", t[t.RED = 6403] = "RED", t[t.RGBA_INTEGER = 36249] = "RGBA_INTEGER", t[t.RGB_INTEGER = 36248] = "RGB_INTEGER", t[t.RG_INTEGER = 33320] = "RG_INTEGER", t[t.RED_INTEGER = 36244] = "RED_INTEGER", t[t.ALPHA = 6406] = "ALPHA", t[t.LUMINANCE = 6409] = "LUMINANCE", t[t.LUMINANCE_ALPHA = 6410] = "LUMINANCE_ALPHA", t[t.DEPTH_COMPONENT = 6402] = "DEPTH_COMPONENT", t[t.DEPTH_STENCIL = 34041] = "DEPTH_STENCIL", t))(D || {}), re = ((t) => (t[t.TEXTURE_2D = 3553] = "TEXTURE_2D", t[t.TEXTURE_CUBE_MAP = 34067] = "TEXTURE_CUBE_MAP", t[t.TEXTURE_2D_ARRAY = 35866] = "TEXTURE_2D_ARRAY", t[t.TEXTURE_CUBE_MAP_POSITIVE_X = 34069] = "TEXTURE_CUBE_MAP_POSITIVE_X", t[t.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070] = "TEXTURE_CUBE_MAP_NEGATIVE_X", t[t.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071] = "TEXTURE_CUBE_MAP_POSITIVE_Y", t[t.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072] = "TEXTURE_CUBE_MAP_NEGATIVE_Y", t[t.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073] = "TEXTURE_CUBE_MAP_POSITIVE_Z", t[t.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074] = "TEXTURE_CUBE_MAP_NEGATIVE_Z", t))(re || {}), f = ((t) => (t[t.UNSIGNED_BYTE = 5121] = "UNSIGNED_BYTE", t[t.UNSIGNED_SHORT = 5123] = "UNSIGNED_SHORT", t[t.UNSIGNED_SHORT_5_6_5 = 33635] = "UNSIGNED_SHORT_5_6_5", t[t.UNSIGNED_SHORT_4_4_4_4 = 32819] = "UNSIGNED_SHORT_4_4_4_4", t[t.UNSIGNED_SHORT_5_5_5_1 = 32820] = "UNSIGNED_SHORT_5_5_5_1", t[t.UNSIGNED_INT = 5125] = "UNSIGNED_INT", t[t.UNSIGNED_INT_10F_11F_11F_REV = 35899] = "UNSIGNED_INT_10F_11F_11F_REV", t[t.UNSIGNED_INT_2_10_10_10_REV = 33640] = "UNSIGNED_INT_2_10_10_10_REV", t[t.UNSIGNED_INT_24_8 = 34042] = "UNSIGNED_INT_24_8", t[t.UNSIGNED_INT_5_9_9_9_REV = 35902] = "UNSIGNED_INT_5_9_9_9_REV", t[t.BYTE = 5120] = "BYTE", t[t.SHORT = 5122] = "SHORT", t[t.INT = 5124] = "INT", t[t.FLOAT = 5126] = "FLOAT", t[t.FLOAT_32_UNSIGNED_INT_24_8_REV = 36269] = "FLOAT_32_UNSIGNED_INT_24_8_REV", t[t.HALF_FLOAT = 36193] = "HALF_FLOAT", t))(f || {});
  const H = {
    uint8x2: f.UNSIGNED_BYTE,
    uint8x4: f.UNSIGNED_BYTE,
    sint8x2: f.BYTE,
    sint8x4: f.BYTE,
    unorm8x2: f.UNSIGNED_BYTE,
    unorm8x4: f.UNSIGNED_BYTE,
    snorm8x2: f.BYTE,
    snorm8x4: f.BYTE,
    uint16x2: f.UNSIGNED_SHORT,
    uint16x4: f.UNSIGNED_SHORT,
    sint16x2: f.SHORT,
    sint16x4: f.SHORT,
    unorm16x2: f.UNSIGNED_SHORT,
    unorm16x4: f.UNSIGNED_SHORT,
    snorm16x2: f.SHORT,
    snorm16x4: f.SHORT,
    float16x2: f.HALF_FLOAT,
    float16x4: f.HALF_FLOAT,
    float32: f.FLOAT,
    float32x2: f.FLOAT,
    float32x3: f.FLOAT,
    float32x4: f.FLOAT,
    uint32: f.UNSIGNED_INT,
    uint32x2: f.UNSIGNED_INT,
    uint32x3: f.UNSIGNED_INT,
    uint32x4: f.UNSIGNED_INT,
    sint32: f.INT,
    sint32x2: f.INT,
    sint32x3: f.INT,
    sint32x4: f.INT
  };
  function ke(t) {
    return H[t] ?? H.float32;
  }
  const Xe = {
    "point-list": 0,
    "line-list": 1,
    "line-strip": 3,
    "triangle-list": 4,
    "triangle-strip": 5
  };
  class se {
    constructor(e) {
      this._geometryVaoHash = /* @__PURE__ */ Object.create(null), this._renderer = e, this._activeGeometry = null, this._activeVao = null, this.hasVao = true, this.hasInstance = true, this._renderer.renderableGC.addManagedHash(this, "_geometryVaoHash");
    }
    contextChange() {
      const e = this.gl = this._renderer.gl;
      if (!this._renderer.context.supports.vertexArrayObject) throw new Error("[PixiJS] Vertex Array Objects are not supported on this device");
      const r = this._renderer.context.extensions.vertexArrayObject;
      r && (e.createVertexArray = () => r.createVertexArrayOES(), e.bindVertexArray = (n) => r.bindVertexArrayOES(n), e.deleteVertexArray = (n) => r.deleteVertexArrayOES(n));
      const s = this._renderer.context.extensions.vertexAttribDivisorANGLE;
      s && (e.drawArraysInstanced = (n, i, a, o) => {
        s.drawArraysInstancedANGLE(n, i, a, o);
      }, e.drawElementsInstanced = (n, i, a, o, c) => {
        s.drawElementsInstancedANGLE(n, i, a, o, c);
      }, e.vertexAttribDivisor = (n, i) => s.vertexAttribDivisorANGLE(n, i)), this._activeGeometry = null, this._activeVao = null, this._geometryVaoHash = /* @__PURE__ */ Object.create(null);
    }
    bind(e, r) {
      const s = this.gl;
      this._activeGeometry = e;
      const n = this.getVao(e, r);
      this._activeVao !== n && (this._activeVao = n, s.bindVertexArray(n)), this.updateBuffers();
    }
    resetState() {
      this.unbind();
    }
    updateBuffers() {
      const e = this._activeGeometry, r = this._renderer.buffer;
      for (let s = 0; s < e.buffers.length; s++) {
        const n = e.buffers[s];
        r.updateBuffer(n);
      }
    }
    checkCompatibility(e, r) {
      const s = e.attributes, n = r._attributeData;
      for (const i in n) if (!s[i]) throw new Error(`shader and geometry incompatible, geometry missing the "${i}" attribute`);
    }
    getSignature(e, r) {
      const s = e.attributes, n = r._attributeData, i = [
        "g",
        e.uid
      ];
      for (const a in s) n[a] && i.push(a, n[a].location);
      return i.join("-");
    }
    getVao(e, r) {
      var _a;
      return ((_a = this._geometryVaoHash[e.uid]) == null ? void 0 : _a[r._key]) || this.initGeometryVao(e, r);
    }
    initGeometryVao(e, r, s = true) {
      const n = this._renderer.gl, i = this._renderer.buffer;
      this._renderer.shader._getProgramData(r), this.checkCompatibility(e, r);
      const a = this.getSignature(e, r);
      this._geometryVaoHash[e.uid] || (this._geometryVaoHash[e.uid] = /* @__PURE__ */ Object.create(null), e.on("destroy", this.onGeometryDestroy, this));
      const o = this._geometryVaoHash[e.uid];
      let c = o[a];
      if (c) return o[r._key] = c, c;
      Ce(e, r._attributeData);
      const u = e.buffers;
      c = n.createVertexArray(), n.bindVertexArray(c);
      for (let _ = 0; _ < u.length; _++) {
        const h = u[_];
        i.bind(h);
      }
      return this.activateVao(e, r), o[r._key] = c, o[a] = c, n.bindVertexArray(null), c;
    }
    onGeometryDestroy(e, r) {
      const s = this._geometryVaoHash[e.uid], n = this.gl;
      if (s) {
        if (r) for (const i in s) this._activeVao !== s[i] && this.unbind(), n.deleteVertexArray(s[i]);
        this._geometryVaoHash[e.uid] = null;
      }
    }
    destroyAll(e = false) {
      const r = this.gl;
      for (const s in this._geometryVaoHash) {
        if (e) for (const n in this._geometryVaoHash[s]) {
          const i = this._geometryVaoHash[s];
          this._activeVao !== i && this.unbind(), r.deleteVertexArray(i[n]);
        }
        this._geometryVaoHash[s] = null;
      }
    }
    activateVao(e, r) {
      var _a;
      const s = this._renderer.gl, n = this._renderer.buffer, i = e.attributes;
      e.indexBuffer && n.bind(e.indexBuffer);
      let a = null;
      for (const o in i) {
        const c = i[o], u = c.buffer, _ = n.getGlBuffer(u), h = r._attributeData[o];
        if (h) {
          a !== _ && (n.bind(u), a = _);
          const l = h.location;
          s.enableVertexAttribArray(l);
          const E = j(c.format), M = ke(c.format);
          if (((_a = h.format) == null ? void 0 : _a.substring(1, 4)) === "int" ? s.vertexAttribIPointer(l, E.size, M, c.stride, c.offset) : s.vertexAttribPointer(l, E.size, M, E.normalised, c.stride, c.offset), c.instance) if (this.hasInstance) {
            const xe = c.divisor ?? 1;
            s.vertexAttribDivisor(l, xe);
          } else throw new Error("geometry error, GPU Instancing is not supported on this device");
        }
      }
    }
    draw(e, r, s, n) {
      const { gl: i } = this._renderer, a = this._activeGeometry, o = Xe[e || a.topology];
      if (n ?? (n = a.instanceCount), a.indexBuffer) {
        const c = a.indexBuffer.data.BYTES_PER_ELEMENT, u = c === 2 ? i.UNSIGNED_SHORT : i.UNSIGNED_INT;
        n > 1 ? i.drawElementsInstanced(o, r || a.indexBuffer.data.length, u, (s || 0) * c, n) : i.drawElements(o, r || a.indexBuffer.data.length, u, (s || 0) * c);
      } else n > 1 ? i.drawArraysInstanced(o, s || 0, r || a.getSize(), n) : i.drawArrays(o, s || 0, r || a.getSize());
      return this;
    }
    unbind() {
      this.gl.bindVertexArray(null), this._activeVao = null, this._activeGeometry = null;
    }
    destroy() {
      this._renderer = null, this.gl = null, this._activeVao = null, this._activeGeometry = null;
    }
  }
  se.extension = {
    type: [
      d.WebGLSystem
    ],
    name: "geometry"
  };
  const We = new Be({
    attributes: {
      aPosition: [
        -1,
        -1,
        3,
        -1,
        -1,
        3
      ]
    }
  }), F = class ne {
    constructor(e) {
      this.useBackBuffer = false, this._useBackBufferThisRender = false, this._renderer = e;
    }
    init(e = {}) {
      const { useBackBuffer: r, antialias: s } = {
        ...ne.defaultOptions,
        ...e
      };
      this.useBackBuffer = r, this._antialias = s, this._renderer.context.supports.msaa || (m("antialiasing, is not supported on when using the back buffer"), this._antialias = false), this._state = O.for2d();
      const n = new Te({
        vertex: `
                attribute vec2 aPosition;
                out vec2 vUv;

                void main() {
                    gl_Position = vec4(aPosition, 0.0, 1.0);

                    vUv = (aPosition + 1.0) / 2.0;

                    // flip dem UVs
                    vUv.y = 1.0 - vUv.y;
                }`,
        fragment: `
                in vec2 vUv;
                out vec4 finalColor;

                uniform sampler2D uTexture;

                void main() {
                    finalColor = texture(uTexture, vUv);
                }`,
        name: "big-triangle"
      });
      this._bigTriangleShader = new G({
        glProgram: n,
        resources: {
          uTexture: b.WHITE.source
        }
      });
    }
    renderStart(e) {
      const r = this._renderer.renderTarget.getRenderTarget(e.target);
      if (this._useBackBufferThisRender = this.useBackBuffer && !!r.isRoot, this._useBackBufferThisRender) {
        const s = this._renderer.renderTarget.getRenderTarget(e.target);
        this._targetTexture = s.colorTexture, e.target = this._getBackBufferTexture(s.colorTexture);
      }
    }
    renderEnd() {
      this._presentBackBuffer();
    }
    _presentBackBuffer() {
      const e = this._renderer;
      e.renderTarget.finishRenderPass(), this._useBackBufferThisRender && (e.renderTarget.bind(this._targetTexture, false), this._bigTriangleShader.resources.uTexture = this._backBufferTexture.source, e.encoder.draw({
        geometry: We,
        shader: this._bigTriangleShader,
        state: this._state
      }));
    }
    _getBackBufferTexture(e) {
      return this._backBufferTexture = this._backBufferTexture || new b({
        source: new K({
          width: e.width,
          height: e.height,
          resolution: e._resolution,
          antialias: this._antialias
        })
      }), this._backBufferTexture.source.resize(e.width, e.height, e._resolution), this._backBufferTexture;
    }
    destroy() {
      this._backBufferTexture && (this._backBufferTexture.destroy(), this._backBufferTexture = null);
    }
  };
  F.extension = {
    type: [
      d.WebGLSystem
    ],
    name: "backBuffer",
    priority: 1
  };
  F.defaultOptions = {
    useBackBuffer: false
  };
  let je = F;
  class ie {
    constructor(e) {
      this._colorMaskCache = 15, this._renderer = e;
    }
    setMask(e) {
      this._colorMaskCache !== e && (this._colorMaskCache = e, this._renderer.gl.colorMask(!!(e & 8), !!(e & 4), !!(e & 2), !!(e & 1)));
    }
  }
  ie.extension = {
    type: [
      d.WebGLSystem
    ],
    name: "colorMask"
  };
  class ae {
    constructor(e) {
      this.commandFinished = Promise.resolve(), this._renderer = e;
    }
    setGeometry(e, r) {
      this._renderer.geometry.bind(e, r.glProgram);
    }
    finishRenderPass() {
    }
    draw(e) {
      const r = this._renderer, { geometry: s, shader: n, state: i, skipSync: a, topology: o, size: c, start: u, instanceCount: _ } = e;
      r.shader.bind(n, a), r.geometry.bind(s, r.shader._activeProgram), i && r.state.set(i), r.geometry.draw(o, c, u, _ ?? s.instanceCount);
    }
    destroy() {
      this._renderer = null;
    }
  }
  ae.extension = {
    type: [
      d.WebGLSystem
    ],
    name: "encoder"
  };
  class Ke {
    constructor() {
      this.width = -1, this.height = -1, this.msaa = false, this.msaaRenderBuffer = [];
    }
  }
  class oe {
    constructor(e) {
      this._stencilCache = {
        enabled: false,
        stencilReference: 0,
        stencilMode: p.NONE
      }, this._renderTargetStencilState = /* @__PURE__ */ Object.create(null), e.renderTarget.onRenderTargetChange.add(this);
    }
    contextChange(e) {
      this._gl = e, this._comparisonFuncMapping = {
        always: e.ALWAYS,
        never: e.NEVER,
        equal: e.EQUAL,
        "not-equal": e.NOTEQUAL,
        less: e.LESS,
        "less-equal": e.LEQUAL,
        greater: e.GREATER,
        "greater-equal": e.GEQUAL
      }, this._stencilOpsMapping = {
        keep: e.KEEP,
        zero: e.ZERO,
        replace: e.REPLACE,
        invert: e.INVERT,
        "increment-clamp": e.INCR,
        "decrement-clamp": e.DECR,
        "increment-wrap": e.INCR_WRAP,
        "decrement-wrap": e.DECR_WRAP
      }, this.resetState();
    }
    onRenderTargetChange(e) {
      if (this._activeRenderTarget === e) return;
      this._activeRenderTarget = e;
      let r = this._renderTargetStencilState[e.uid];
      r || (r = this._renderTargetStencilState[e.uid] = {
        stencilMode: p.DISABLED,
        stencilReference: 0
      }), this.setStencilMode(r.stencilMode, r.stencilReference);
    }
    resetState() {
      this._stencilCache.enabled = false, this._stencilCache.stencilMode = p.NONE, this._stencilCache.stencilReference = 0;
    }
    setStencilMode(e, r) {
      const s = this._renderTargetStencilState[this._activeRenderTarget.uid], n = this._gl, i = Ge[e], a = this._stencilCache;
      if (s.stencilMode = e, s.stencilReference = r, e === p.DISABLED) {
        this._stencilCache.enabled && (this._stencilCache.enabled = false, n.disable(n.STENCIL_TEST));
        return;
      }
      this._stencilCache.enabled || (this._stencilCache.enabled = true, n.enable(n.STENCIL_TEST)), (e !== a.stencilMode || a.stencilReference !== r) && (a.stencilMode = e, a.stencilReference = r, n.stencilFunc(this._comparisonFuncMapping[i.stencilBack.compare], r, 255), n.stencilOp(n.KEEP, n.KEEP, this._stencilOpsMapping[i.stencilBack.passOp]));
    }
  }
  oe.extension = {
    type: [
      d.WebGLSystem
    ],
    name: "stencil"
  };
  const ce = {
    f32: 4,
    i32: 4,
    "vec2<f32>": 8,
    "vec3<f32>": 12,
    "vec4<f32>": 16,
    "vec2<i32>": 8,
    "vec3<i32>": 12,
    "vec4<i32>": 16,
    "mat2x2<f32>": 16 * 2,
    "mat3x3<f32>": 16 * 3,
    "mat4x4<f32>": 16 * 4
  };
  function $e(t) {
    const e = t.map((i) => ({
      data: i,
      offset: 0,
      size: 0
    })), r = 16;
    let s = 0, n = 0;
    for (let i = 0; i < e.length; i++) {
      const a = e[i];
      if (s = ce[a.data.type], !s) throw new Error(`Unknown type ${a.data.type}`);
      a.data.size > 1 && (s = Math.max(s, r) * a.data.size);
      const o = s === 12 ? 16 : s;
      a.size = s;
      const c = n % r;
      c > 0 && r - c < o ? n += (r - c) % 16 : n += (s - c % s) % s, a.offset = n, n += s;
    }
    return n = Math.ceil(n / 16) * 16, {
      uboElements: e,
      size: n
    };
  }
  function ze(t, e) {
    const r = Math.max(ce[t.data.type] / 16, 1), s = t.data.value.length / t.data.size, n = (4 - s % 4) % 4, i = t.data.type.indexOf("i32") >= 0 ? "dataInt32" : "data";
    return `
        v = uv.${t.data.name};
        offset += ${e};

        arrayOffset = offset;

        t = 0;

        for(var i=0; i < ${t.data.size * r}; i++)
        {
            for(var j = 0; j < ${s}; j++)
            {
                ${i}[arrayOffset++] = v[t++];
            }
            ${n !== 0 ? `arrayOffset += ${n};` : ""}
        }
    `;
  }
  function Ye(t) {
    return Ue(t, "uboStd40", ze, Oe);
  }
  class ue extends Pe {
    constructor() {
      super({
        createUboElements: $e,
        generateUboSync: Ye
      });
    }
  }
  ue.extension = {
    type: [
      d.WebGLSystem
    ],
    name: "ubo"
  };
  class qe {
    constructor() {
      this._clearColorCache = [
        0,
        0,
        0,
        0
      ], this._viewPortCache = new L();
    }
    init(e, r) {
      this._renderer = e, this._renderTargetSystem = r, e.runners.contextChange.add(this);
    }
    contextChange() {
      this._clearColorCache = [
        0,
        0,
        0,
        0
      ], this._viewPortCache = new L();
    }
    copyToTexture(e, r, s, n, i) {
      const a = this._renderTargetSystem, o = this._renderer, c = a.getGpuRenderTarget(e), u = o.gl;
      return this.finishRenderPass(e), u.bindFramebuffer(u.FRAMEBUFFER, c.resolveTargetFramebuffer), o.texture.bind(r, 0), u.copyTexSubImage2D(u.TEXTURE_2D, 0, i.x, i.y, s.x, s.y, n.width, n.height), r;
    }
    startRenderPass(e, r = true, s, n) {
      const i = this._renderTargetSystem, a = e.colorTexture, o = i.getGpuRenderTarget(e);
      let c = n.y;
      e.isRoot && (c = a.pixelHeight - n.height), e.colorTextures.forEach((h) => {
        this._renderer.texture.unbind(h);
      });
      const u = this._renderer.gl;
      u.bindFramebuffer(u.FRAMEBUFFER, o.framebuffer);
      const _ = this._viewPortCache;
      (_.x !== n.x || _.y !== c || _.width !== n.width || _.height !== n.height) && (_.x = n.x, _.y = c, _.width = n.width, _.height = n.height, u.viewport(n.x, c, n.width, n.height)), !o.depthStencilRenderBuffer && (e.stencil || e.depth) && this._initStencil(o), this.clear(e, r, s);
    }
    finishRenderPass(e) {
      const s = this._renderTargetSystem.getGpuRenderTarget(e);
      if (!s.msaa) return;
      const n = this._renderer.gl;
      n.bindFramebuffer(n.FRAMEBUFFER, s.resolveTargetFramebuffer), n.bindFramebuffer(n.READ_FRAMEBUFFER, s.framebuffer), n.blitFramebuffer(0, 0, s.width, s.height, 0, 0, s.width, s.height, n.COLOR_BUFFER_BIT, n.NEAREST), n.bindFramebuffer(n.FRAMEBUFFER, s.framebuffer);
    }
    initGpuRenderTarget(e) {
      const s = this._renderer.gl, n = new Ke(), i = e.colorTexture;
      return B.test(i.resource) ? (this._renderer.context.ensureCanvasSize(e.colorTexture.resource), n.framebuffer = null, n) : (this._initColor(e, n), s.bindFramebuffer(s.FRAMEBUFFER, null), n);
    }
    destroyGpuRenderTarget(e) {
      const r = this._renderer.gl;
      e.framebuffer && (r.deleteFramebuffer(e.framebuffer), e.framebuffer = null), e.resolveTargetFramebuffer && (r.deleteFramebuffer(e.resolveTargetFramebuffer), e.resolveTargetFramebuffer = null), e.depthStencilRenderBuffer && (r.deleteRenderbuffer(e.depthStencilRenderBuffer), e.depthStencilRenderBuffer = null), e.msaaRenderBuffer.forEach((s) => {
        r.deleteRenderbuffer(s);
      }), e.msaaRenderBuffer = null;
    }
    clear(e, r, s) {
      if (!r) return;
      const n = this._renderTargetSystem;
      typeof r == "boolean" && (r = r ? A.ALL : A.NONE);
      const i = this._renderer.gl;
      if (r & A.COLOR) {
        s ?? (s = n.defaultClearColor);
        const a = this._clearColorCache, o = s;
        (a[0] !== o[0] || a[1] !== o[1] || a[2] !== o[2] || a[3] !== o[3]) && (a[0] = o[0], a[1] = o[1], a[2] = o[2], a[3] = o[3], i.clearColor(o[0], o[1], o[2], o[3]));
      }
      i.clear(r);
    }
    resizeGpuRenderTarget(e) {
      if (e.isRoot) return;
      const s = this._renderTargetSystem.getGpuRenderTarget(e);
      this._resizeColor(e, s), (e.stencil || e.depth) && this._resizeStencil(s);
    }
    _initColor(e, r) {
      const s = this._renderer, n = s.gl, i = n.createFramebuffer();
      if (r.resolveTargetFramebuffer = i, n.bindFramebuffer(n.FRAMEBUFFER, i), r.width = e.colorTexture.source.pixelWidth, r.height = e.colorTexture.source.pixelHeight, e.colorTextures.forEach((a, o) => {
        const c = a.source;
        c.antialias && (s.context.supports.msaa ? r.msaa = true : m("[RenderTexture] Antialiasing on textures is not supported in WebGL1")), s.texture.bindSource(c, 0);
        const _ = s.texture.getGlSource(c).texture;
        n.framebufferTexture2D(n.FRAMEBUFFER, n.COLOR_ATTACHMENT0 + o, 3553, _, 0);
      }), r.msaa) {
        const a = n.createFramebuffer();
        r.framebuffer = a, n.bindFramebuffer(n.FRAMEBUFFER, a), e.colorTextures.forEach((o, c) => {
          const u = n.createRenderbuffer();
          r.msaaRenderBuffer[c] = u;
        });
      } else r.framebuffer = i;
      this._resizeColor(e, r);
    }
    _resizeColor(e, r) {
      const s = e.colorTexture.source;
      if (r.width = s.pixelWidth, r.height = s.pixelHeight, e.colorTextures.forEach((n, i) => {
        i !== 0 && n.source.resize(s.width, s.height, s._resolution);
      }), r.msaa) {
        const n = this._renderer, i = n.gl, a = r.framebuffer;
        i.bindFramebuffer(i.FRAMEBUFFER, a), e.colorTextures.forEach((o, c) => {
          const u = o.source;
          n.texture.bindSource(u, 0);
          const h = n.texture.getGlSource(u).internalFormat, l = r.msaaRenderBuffer[c];
          i.bindRenderbuffer(i.RENDERBUFFER, l), i.renderbufferStorageMultisample(i.RENDERBUFFER, 4, h, u.pixelWidth, u.pixelHeight), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + c, i.RENDERBUFFER, l);
        });
      }
    }
    _initStencil(e) {
      if (e.framebuffer === null) return;
      const r = this._renderer.gl, s = r.createRenderbuffer();
      e.depthStencilRenderBuffer = s, r.bindRenderbuffer(r.RENDERBUFFER, s), r.framebufferRenderbuffer(r.FRAMEBUFFER, r.DEPTH_STENCIL_ATTACHMENT, r.RENDERBUFFER, s), this._resizeStencil(e);
    }
    _resizeStencil(e) {
      const r = this._renderer.gl;
      r.bindRenderbuffer(r.RENDERBUFFER, e.depthStencilRenderBuffer), e.msaa ? r.renderbufferStorageMultisample(r.RENDERBUFFER, 4, r.DEPTH24_STENCIL8, e.width, e.height) : r.renderbufferStorage(r.RENDERBUFFER, this._renderer.context.webGLVersion === 2 ? r.DEPTH24_STENCIL8 : r.DEPTH_STENCIL, e.width, e.height);
    }
    prerender(e) {
      const r = e.colorTexture.resource;
      this._renderer.context.multiView && B.test(r) && this._renderer.context.ensureCanvasSize(r);
    }
    postrender(e) {
      if (this._renderer.context.multiView && B.test(e.colorTexture.resource)) {
        const r = this._renderer.context.canvas, s = e.colorTexture;
        s.context2D.drawImage(r, 0, s.pixelHeight - r.height);
      }
    }
  }
  class _e extends Fe {
    constructor(e) {
      super(e), this.adaptor = new qe(), this.adaptor.init(e, this);
    }
  }
  _e.extension = {
    type: [
      d.WebGLSystem
    ],
    name: "renderTarget"
  };
  function Ze(t, e) {
    const r = [], s = [
      `
        var g = s.groups;
        var sS = r.shader;
        var p = s.glProgram;
        var ugS = r.uniformGroup;
        var resources;
    `
    ];
    let n = false, i = 0;
    const a = e._getProgramData(t.glProgram);
    for (const c in t.groups) {
      const u = t.groups[c];
      r.push(`
            resources = g[${c}].resources;
        `);
      for (const _ in u.resources) {
        const h = u.resources[_];
        if (h instanceof U) if (h.ubo) {
          const l = t._uniformBindMap[c][Number(_)];
          r.push(`
                        sS.bindUniformBlock(
                            resources[${_}],
                            '${l}',
                            ${t.glProgram._uniformBlockData[l].index}
                        );
                    `);
        } else r.push(`
                        ugS.updateUniformGroup(resources[${_}], p, sD);
                    `);
        else if (h instanceof Q) {
          const l = t._uniformBindMap[c][Number(_)];
          r.push(`
                    sS.bindUniformBlock(
                        resources[${_}],
                        '${l}',
                        ${t.glProgram._uniformBlockData[l].index}
                    );
                `);
        } else if (h instanceof K) {
          const l = t._uniformBindMap[c][_], E = a.uniformData[l];
          E && (n || (n = true, s.push(`
                        var tS = r.texture;
                        `)), e._gl.uniform1i(E.location, i), r.push(`
                        tS.bind(resources[${_}], ${i});
                    `), i++);
        }
      }
    }
    const o = [
      ...s,
      ...r
    ].join(`
`);
    return new Function("r", "s", "sD", o);
  }
  class Qe {
    constructor(e, r) {
      this.program = e, this.uniformData = r, this.uniformGroups = {}, this.uniformDirtyGroups = {}, this.uniformBlockBindings = {};
    }
    destroy() {
      this.uniformData = null, this.uniformGroups = null, this.uniformDirtyGroups = null, this.uniformBlockBindings = null, this.program = null;
    }
  }
  function w(t, e, r) {
    const s = t.createShader(e);
    return t.shaderSource(s, r), t.compileShader(s), s;
  }
  function y(t) {
    const e = new Array(t);
    for (let r = 0; r < e.length; r++) e[r] = false;
    return e;
  }
  function fe(t, e) {
    switch (t) {
      case "float":
        return 0;
      case "vec2":
        return new Float32Array(2 * e);
      case "vec3":
        return new Float32Array(3 * e);
      case "vec4":
        return new Float32Array(4 * e);
      case "int":
      case "uint":
      case "sampler2D":
      case "sampler2DArray":
        return 0;
      case "ivec2":
        return new Int32Array(2 * e);
      case "ivec3":
        return new Int32Array(3 * e);
      case "ivec4":
        return new Int32Array(4 * e);
      case "uvec2":
        return new Uint32Array(2 * e);
      case "uvec3":
        return new Uint32Array(3 * e);
      case "uvec4":
        return new Uint32Array(4 * e);
      case "bool":
        return false;
      case "bvec2":
        return y(2 * e);
      case "bvec3":
        return y(3 * e);
      case "bvec4":
        return y(4 * e);
      case "mat2":
        return new Float32Array([
          1,
          0,
          0,
          1
        ]);
      case "mat3":
        return new Float32Array([
          1,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          1
        ]);
      case "mat4":
        return new Float32Array([
          1,
          0,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          0,
          1
        ]);
    }
    return null;
  }
  let g = null;
  const V = {
    FLOAT: "float",
    FLOAT_VEC2: "vec2",
    FLOAT_VEC3: "vec3",
    FLOAT_VEC4: "vec4",
    INT: "int",
    INT_VEC2: "ivec2",
    INT_VEC3: "ivec3",
    INT_VEC4: "ivec4",
    UNSIGNED_INT: "uint",
    UNSIGNED_INT_VEC2: "uvec2",
    UNSIGNED_INT_VEC3: "uvec3",
    UNSIGNED_INT_VEC4: "uvec4",
    BOOL: "bool",
    BOOL_VEC2: "bvec2",
    BOOL_VEC3: "bvec3",
    BOOL_VEC4: "bvec4",
    FLOAT_MAT2: "mat2",
    FLOAT_MAT3: "mat3",
    FLOAT_MAT4: "mat4",
    SAMPLER_2D: "sampler2D",
    INT_SAMPLER_2D: "sampler2D",
    UNSIGNED_INT_SAMPLER_2D: "sampler2D",
    SAMPLER_CUBE: "samplerCube",
    INT_SAMPLER_CUBE: "samplerCube",
    UNSIGNED_INT_SAMPLER_CUBE: "samplerCube",
    SAMPLER_2D_ARRAY: "sampler2DArray",
    INT_SAMPLER_2D_ARRAY: "sampler2DArray",
    UNSIGNED_INT_SAMPLER_2D_ARRAY: "sampler2DArray"
  }, Je = {
    float: "float32",
    vec2: "float32x2",
    vec3: "float32x3",
    vec4: "float32x4",
    int: "sint32",
    ivec2: "sint32x2",
    ivec3: "sint32x3",
    ivec4: "sint32x4",
    uint: "uint32",
    uvec2: "uint32x2",
    uvec3: "uint32x3",
    uvec4: "uint32x4",
    bool: "uint32",
    bvec2: "uint32x2",
    bvec3: "uint32x3",
    bvec4: "uint32x4"
  };
  function he(t, e) {
    if (!g) {
      const r = Object.keys(V);
      g = {};
      for (let s = 0; s < r.length; ++s) {
        const n = r[s];
        g[t[n]] = V[n];
      }
    }
    return g[e];
  }
  function et(t, e) {
    const r = he(t, e);
    return Je[r] || "float32";
  }
  function tt(t, e, r = false) {
    const s = {}, n = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES);
    for (let a = 0; a < n; a++) {
      const o = e.getActiveAttrib(t, a);
      if (o.name.startsWith("gl_")) continue;
      const c = et(e, o.type);
      s[o.name] = {
        location: 0,
        format: c,
        stride: j(c).stride,
        offset: 0,
        instance: false,
        start: 0
      };
    }
    const i = Object.keys(s);
    if (r) {
      i.sort((a, o) => a > o ? 1 : -1);
      for (let a = 0; a < i.length; a++) s[i[a]].location = a, e.bindAttribLocation(t, a, i[a]);
      e.linkProgram(t);
    } else for (let a = 0; a < i.length; a++) s[i[a]].location = e.getAttribLocation(t, i[a]);
    return s;
  }
  function rt(t, e) {
    if (!e.ACTIVE_UNIFORM_BLOCKS) return {};
    const r = {}, s = e.getProgramParameter(t, e.ACTIVE_UNIFORM_BLOCKS);
    for (let n = 0; n < s; n++) {
      const i = e.getActiveUniformBlockName(t, n), a = e.getUniformBlockIndex(t, i), o = e.getActiveUniformBlockParameter(t, n, e.UNIFORM_BLOCK_DATA_SIZE);
      r[i] = {
        name: i,
        index: a,
        size: o
      };
    }
    return r;
  }
  function st(t, e) {
    const r = {}, s = e.getProgramParameter(t, e.ACTIVE_UNIFORMS);
    for (let n = 0; n < s; n++) {
      const i = e.getActiveUniform(t, n), a = i.name.replace(/\[.*?\]$/, ""), o = !!i.name.match(/\[.*?\]$/), c = he(e, i.type);
      r[a] = {
        name: a,
        index: n,
        type: c,
        size: i.size,
        isArray: o,
        value: fe(c, i.size)
      };
    }
    return r;
  }
  function k(t, e) {
    const r = t.getShaderSource(e).split(`
`).map((u, _) => `${_}: ${u}`), s = t.getShaderInfoLog(e), n = s.split(`
`), i = {}, a = n.map((u) => parseFloat(u.replace(/^ERROR\: 0\:([\d]+)\:.*$/, "$1"))).filter((u) => u && !i[u] ? (i[u] = true, true) : false), o = [
      ""
    ];
    a.forEach((u) => {
      r[u - 1] = `%c${r[u - 1]}%c`, o.push("background: #FF0000; color:#FFFFFF; font-size: 10px", "font-size: 10px");
    });
    const c = r.join(`
`);
    o[0] = c, console.error(s), console.groupCollapsed("click to view full shader code"), console.warn(...o), console.groupEnd();
  }
  function nt(t, e, r, s) {
    t.getProgramParameter(e, t.LINK_STATUS) || (t.getShaderParameter(r, t.COMPILE_STATUS) || k(t, r), t.getShaderParameter(s, t.COMPILE_STATUS) || k(t, s), console.error("PixiJS Error: Could not initialize shader."), t.getProgramInfoLog(e) !== "" && console.warn("PixiJS Warning: gl.getProgramInfoLog()", t.getProgramInfoLog(e)));
  }
  function it(t, e) {
    const r = w(t, t.VERTEX_SHADER, e.vertex), s = w(t, t.FRAGMENT_SHADER, e.fragment), n = t.createProgram();
    t.attachShader(n, r), t.attachShader(n, s);
    const i = e.transformFeedbackVaryings;
    i && (typeof t.transformFeedbackVaryings != "function" ? m("TransformFeedback is not supported but TransformFeedbackVaryings are given.") : t.transformFeedbackVaryings(n, i.names, i.bufferMode === "separate" ? t.SEPARATE_ATTRIBS : t.INTERLEAVED_ATTRIBS)), t.linkProgram(n), t.getProgramParameter(n, t.LINK_STATUS) || nt(t, n, r, s), e._attributeData = tt(n, t, !/^[ \t]*#[ \t]*version[ \t]+300[ \t]+es[ \t]*$/m.test(e.vertex)), e._uniformData = st(n, t), e._uniformBlockData = rt(n, t), t.deleteShader(r), t.deleteShader(s);
    const a = {};
    for (const c in e._uniformData) {
      const u = e._uniformData[c];
      a[c] = {
        location: t.getUniformLocation(n, c),
        value: fe(u.type, u.size)
      };
    }
    return new Qe(n, a);
  }
  const R = {
    textureCount: 0,
    blockIndex: 0
  };
  class le {
    constructor(e) {
      this._activeProgram = null, this._programDataHash = /* @__PURE__ */ Object.create(null), this._shaderSyncFunctions = /* @__PURE__ */ Object.create(null), this._renderer = e, this._renderer.renderableGC.addManagedHash(this, "_programDataHash");
    }
    contextChange(e) {
      this._gl = e, this._programDataHash = /* @__PURE__ */ Object.create(null), this._shaderSyncFunctions = /* @__PURE__ */ Object.create(null), this._activeProgram = null, this.maxTextures = $();
    }
    bind(e, r) {
      if (this._setProgram(e.glProgram), r) return;
      R.textureCount = 0, R.blockIndex = 0;
      let s = this._shaderSyncFunctions[e.glProgram._key];
      s || (s = this._shaderSyncFunctions[e.glProgram._key] = this._generateShaderSync(e, this)), this._renderer.buffer.nextBindBase(!!e.glProgram.transformFeedbackVaryings), s(this._renderer, e, R);
    }
    updateUniformGroup(e) {
      this._renderer.uniformGroup.updateUniformGroup(e, this._activeProgram, R);
    }
    bindUniformBlock(e, r, s = 0) {
      const n = this._renderer.buffer, i = this._getProgramData(this._activeProgram), a = e._bufferResource;
      a || this._renderer.ubo.updateUniformGroup(e);
      const o = e.buffer, c = n.updateBuffer(o), u = n.freeLocationForBufferBase(c);
      if (a) {
        const { offset: h, size: l } = e;
        h === 0 && l === o.data.byteLength ? n.bindBufferBase(c, u) : n.bindBufferRange(c, u, h);
      } else n.getLastBindBaseLocation(c) !== u && n.bindBufferBase(c, u);
      const _ = this._activeProgram._uniformBlockData[r].index;
      i.uniformBlockBindings[s] !== u && (i.uniformBlockBindings[s] = u, this._renderer.gl.uniformBlockBinding(i.program, _, u));
    }
    _setProgram(e) {
      if (this._activeProgram === e) return;
      this._activeProgram = e;
      const r = this._getProgramData(e);
      this._gl.useProgram(r.program);
    }
    _getProgramData(e) {
      return this._programDataHash[e._key] || this._createProgramData(e);
    }
    _createProgramData(e) {
      const r = e._key;
      return this._programDataHash[r] = it(this._gl, e), this._programDataHash[r];
    }
    destroy() {
      for (const e of Object.keys(this._programDataHash)) this._programDataHash[e].destroy(), this._programDataHash[e] = null;
      this._programDataHash = null;
    }
    _generateShaderSync(e, r) {
      return Ze(e, r);
    }
    resetState() {
      this._activeProgram = null;
    }
  }
  le.extension = {
    type: [
      d.WebGLSystem
    ],
    name: "shader"
  };
  const at = {
    f32: `if (cv !== v) {
            cu.value = v;
            gl.uniform1f(location, v);
        }`,
    "vec2<f32>": `if (cv[0] !== v[0] || cv[1] !== v[1]) {
            cv[0] = v[0];
            cv[1] = v[1];
            gl.uniform2f(location, v[0], v[1]);
        }`,
    "vec3<f32>": `if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2]) {
            cv[0] = v[0];
            cv[1] = v[1];
            cv[2] = v[2];
            gl.uniform3f(location, v[0], v[1], v[2]);
        }`,
    "vec4<f32>": `if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3]) {
            cv[0] = v[0];
            cv[1] = v[1];
            cv[2] = v[2];
            cv[3] = v[3];
            gl.uniform4f(location, v[0], v[1], v[2], v[3]);
        }`,
    i32: `if (cv !== v) {
            cu.value = v;
            gl.uniform1i(location, v);
        }`,
    "vec2<i32>": `if (cv[0] !== v[0] || cv[1] !== v[1]) {
            cv[0] = v[0];
            cv[1] = v[1];
            gl.uniform2i(location, v[0], v[1]);
        }`,
    "vec3<i32>": `if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2]) {
            cv[0] = v[0];
            cv[1] = v[1];
            cv[2] = v[2];
            gl.uniform3i(location, v[0], v[1], v[2]);
        }`,
    "vec4<i32>": `if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3]) {
            cv[0] = v[0];
            cv[1] = v[1];
            cv[2] = v[2];
            cv[3] = v[3];
            gl.uniform4i(location, v[0], v[1], v[2], v[3]);
        }`,
    u32: `if (cv !== v) {
            cu.value = v;
            gl.uniform1ui(location, v);
        }`,
    "vec2<u32>": `if (cv[0] !== v[0] || cv[1] !== v[1]) {
            cv[0] = v[0];
            cv[1] = v[1];
            gl.uniform2ui(location, v[0], v[1]);
        }`,
    "vec3<u32>": `if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2]) {
            cv[0] = v[0];
            cv[1] = v[1];
            cv[2] = v[2];
            gl.uniform3ui(location, v[0], v[1], v[2]);
        }`,
    "vec4<u32>": `if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3]) {
            cv[0] = v[0];
            cv[1] = v[1];
            cv[2] = v[2];
            cv[3] = v[3];
            gl.uniform4ui(location, v[0], v[1], v[2], v[3]);
        }`,
    bool: `if (cv !== v) {
            cu.value = v;
            gl.uniform1i(location, v);
        }`,
    "vec2<bool>": `if (cv[0] !== v[0] || cv[1] !== v[1]) {
            cv[0] = v[0];
            cv[1] = v[1];
            gl.uniform2i(location, v[0], v[1]);
        }`,
    "vec3<bool>": `if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2]) {
            cv[0] = v[0];
            cv[1] = v[1];
            cv[2] = v[2];
            gl.uniform3i(location, v[0], v[1], v[2]);
        }`,
    "vec4<bool>": `if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3]) {
            cv[0] = v[0];
            cv[1] = v[1];
            cv[2] = v[2];
            cv[3] = v[3];
            gl.uniform4i(location, v[0], v[1], v[2], v[3]);
        }`,
    "mat2x2<f32>": "gl.uniformMatrix2fv(location, false, v);",
    "mat3x3<f32>": "gl.uniformMatrix3fv(location, false, v);",
    "mat4x4<f32>": "gl.uniformMatrix4fv(location, false, v);"
  }, ot = {
    f32: "gl.uniform1fv(location, v);",
    "vec2<f32>": "gl.uniform2fv(location, v);",
    "vec3<f32>": "gl.uniform3fv(location, v);",
    "vec4<f32>": "gl.uniform4fv(location, v);",
    "mat2x2<f32>": "gl.uniformMatrix2fv(location, false, v);",
    "mat3x3<f32>": "gl.uniformMatrix3fv(location, false, v);",
    "mat4x4<f32>": "gl.uniformMatrix4fv(location, false, v);",
    i32: "gl.uniform1iv(location, v);",
    "vec2<i32>": "gl.uniform2iv(location, v);",
    "vec3<i32>": "gl.uniform3iv(location, v);",
    "vec4<i32>": "gl.uniform4iv(location, v);",
    u32: "gl.uniform1iv(location, v);",
    "vec2<u32>": "gl.uniform2iv(location, v);",
    "vec3<u32>": "gl.uniform3iv(location, v);",
    "vec4<u32>": "gl.uniform4iv(location, v);",
    bool: "gl.uniform1iv(location, v);",
    "vec2<bool>": "gl.uniform2iv(location, v);",
    "vec3<bool>": "gl.uniform3iv(location, v);",
    "vec4<bool>": "gl.uniform4iv(location, v);"
  };
  function ct(t, e) {
    const r = [
      `
        var v = null;
        var cv = null;
        var cu = null;
        var t = 0;
        var gl = renderer.gl;
        var name = null;
    `
    ];
    for (const s in t.uniforms) {
      if (!e[s]) {
        t.uniforms[s] instanceof U ? t.uniforms[s].ubo ? r.push(`
                        renderer.shader.bindUniformBlock(uv.${s}, "${s}");
                    `) : r.push(`
                        renderer.shader.updateUniformGroup(uv.${s});
                    `) : t.uniforms[s] instanceof Q && r.push(`
                        renderer.shader.bindBufferResource(uv.${s}, "${s}");
                    `);
        continue;
      }
      const n = t.uniformStructures[s];
      let i = false;
      for (let a = 0; a < N.length; a++) {
        const o = N[a];
        if (n.type === o.type && o.test(n)) {
          r.push(`name = "${s}";`, N[a].uniform), i = true;
          break;
        }
      }
      if (!i) {
        const o = (n.size === 1 ? at : ot)[n.type].replace("location", `ud["${s}"].location`);
        r.push(`
            cu = ud["${s}"];
            cv = cu.value;
            v = uv["${s}"];
            ${o};`);
      }
    }
    return new Function("ud", "uv", "renderer", "syncData", r.join(`
`));
  }
  class de {
    constructor(e) {
      this._cache = {}, this._uniformGroupSyncHash = {}, this._renderer = e, this.gl = null, this._cache = {};
    }
    contextChange(e) {
      this.gl = e;
    }
    updateUniformGroup(e, r, s) {
      const n = this._renderer.shader._getProgramData(r);
      (!e.isStatic || e._dirtyId !== n.uniformDirtyGroups[e.uid]) && (n.uniformDirtyGroups[e.uid] = e._dirtyId, this._getUniformSyncFunction(e, r)(n.uniformData, e.uniforms, this._renderer, s));
    }
    _getUniformSyncFunction(e, r) {
      var _a;
      return ((_a = this._uniformGroupSyncHash[e._signature]) == null ? void 0 : _a[r._key]) || this._createUniformSyncFunction(e, r);
    }
    _createUniformSyncFunction(e, r) {
      const s = this._uniformGroupSyncHash[e._signature] || (this._uniformGroupSyncHash[e._signature] = {}), n = this._getSignature(e, r._uniformData, "u");
      return this._cache[n] || (this._cache[n] = this._generateUniformsSync(e, r._uniformData)), s[r._key] = this._cache[n], s[r._key];
    }
    _generateUniformsSync(e, r) {
      return ct(e, r);
    }
    _getSignature(e, r, s) {
      const n = e.uniforms, i = [
        `${s}-`
      ];
      for (const a in n) i.push(a), r[a] && i.push(r[a].type);
      return i.join("-");
    }
    destroy() {
      this._renderer = null, this._cache = null;
    }
  }
  de.extension = {
    type: [
      d.WebGLSystem
    ],
    name: "uniformGroup"
  };
  function ut(t) {
    const e = {};
    if (e.normal = [
      t.ONE,
      t.ONE_MINUS_SRC_ALPHA
    ], e.add = [
      t.ONE,
      t.ONE
    ], e.multiply = [
      t.DST_COLOR,
      t.ONE_MINUS_SRC_ALPHA,
      t.ONE,
      t.ONE_MINUS_SRC_ALPHA
    ], e.screen = [
      t.ONE,
      t.ONE_MINUS_SRC_COLOR,
      t.ONE,
      t.ONE_MINUS_SRC_ALPHA
    ], e.none = [
      0,
      0
    ], e["normal-npm"] = [
      t.SRC_ALPHA,
      t.ONE_MINUS_SRC_ALPHA,
      t.ONE,
      t.ONE_MINUS_SRC_ALPHA
    ], e["add-npm"] = [
      t.SRC_ALPHA,
      t.ONE,
      t.ONE,
      t.ONE
    ], e["screen-npm"] = [
      t.SRC_ALPHA,
      t.ONE_MINUS_SRC_COLOR,
      t.ONE,
      t.ONE_MINUS_SRC_ALPHA
    ], e.erase = [
      t.ZERO,
      t.ONE_MINUS_SRC_ALPHA
    ], !(t instanceof S.get().getWebGLRenderingContext())) e.min = [
      t.ONE,
      t.ONE,
      t.ONE,
      t.ONE,
      t.MIN,
      t.MIN
    ], e.max = [
      t.ONE,
      t.ONE,
      t.ONE,
      t.ONE,
      t.MAX,
      t.MAX
    ];
    else {
      const s = t.getExtension("EXT_blend_minmax");
      s && (e.min = [
        t.ONE,
        t.ONE,
        t.ONE,
        t.ONE,
        s.MIN_EXT,
        s.MIN_EXT
      ], e.max = [
        t.ONE,
        t.ONE,
        t.ONE,
        t.ONE,
        s.MAX_EXT,
        s.MAX_EXT
      ]);
    }
    return e;
  }
  const _t = 0, ft = 1, ht = 2, lt = 3, dt = 4, mt = 5, me = class C {
    constructor() {
      this.gl = null, this.stateId = 0, this.polygonOffset = 0, this.blendMode = "none", this._blendEq = false, this.map = [], this.map[_t] = this.setBlend, this.map[ft] = this.setOffset, this.map[ht] = this.setCullFace, this.map[lt] = this.setDepthTest, this.map[dt] = this.setFrontFace, this.map[mt] = this.setDepthMask, this.checks = [], this.defaultState = O.for2d();
    }
    contextChange(e) {
      this.gl = e, this.blendModesMap = ut(e), this.resetState();
    }
    set(e) {
      if (e || (e = this.defaultState), this.stateId !== e.data) {
        let r = this.stateId ^ e.data, s = 0;
        for (; r; ) r & 1 && this.map[s].call(this, !!(e.data & 1 << s)), r >>= 1, s++;
        this.stateId = e.data;
      }
      for (let r = 0; r < this.checks.length; r++) this.checks[r](this, e);
    }
    forceState(e) {
      e || (e = this.defaultState);
      for (let r = 0; r < this.map.length; r++) this.map[r].call(this, !!(e.data & 1 << r));
      for (let r = 0; r < this.checks.length; r++) this.checks[r](this, e);
      this.stateId = e.data;
    }
    setBlend(e) {
      this._updateCheck(C._checkBlendMode, e), this.gl[e ? "enable" : "disable"](this.gl.BLEND);
    }
    setOffset(e) {
      this._updateCheck(C._checkPolygonOffset, e), this.gl[e ? "enable" : "disable"](this.gl.POLYGON_OFFSET_FILL);
    }
    setDepthTest(e) {
      this.gl[e ? "enable" : "disable"](this.gl.DEPTH_TEST);
    }
    setDepthMask(e) {
      this.gl.depthMask(e);
    }
    setCullFace(e) {
      this.gl[e ? "enable" : "disable"](this.gl.CULL_FACE);
    }
    setFrontFace(e) {
      this.gl.frontFace(this.gl[e ? "CW" : "CCW"]);
    }
    setBlendMode(e) {
      if (this.blendModesMap[e] || (e = "normal"), e === this.blendMode) return;
      this.blendMode = e;
      const r = this.blendModesMap[e], s = this.gl;
      r.length === 2 ? s.blendFunc(r[0], r[1]) : s.blendFuncSeparate(r[0], r[1], r[2], r[3]), r.length === 6 ? (this._blendEq = true, s.blendEquationSeparate(r[4], r[5])) : this._blendEq && (this._blendEq = false, s.blendEquationSeparate(s.FUNC_ADD, s.FUNC_ADD));
    }
    setPolygonOffset(e, r) {
      this.gl.polygonOffset(e, r);
    }
    resetState() {
      this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, false), this.forceState(this.defaultState), this._blendEq = true, this.blendMode = "", this.setBlendMode("normal");
    }
    _updateCheck(e, r) {
      const s = this.checks.indexOf(e);
      r && s === -1 ? this.checks.push(e) : !r && s !== -1 && this.checks.splice(s, 1);
    }
    static _checkBlendMode(e, r) {
      e.setBlendMode(r.blendMode);
    }
    static _checkPolygonOffset(e, r) {
      e.setPolygonOffset(1, r.polygonOffset);
    }
    destroy() {
      this.gl = null, this.checks.length = 0;
    }
  };
  me.extension = {
    type: [
      d.WebGLSystem
    ],
    name: "state"
  };
  let Et = me;
  class bt {
    constructor(e) {
      this.target = re.TEXTURE_2D, this.texture = e, this.width = -1, this.height = -1, this.type = f.UNSIGNED_BYTE, this.internalFormat = D.RGBA, this.format = D.RGBA, this.samplerType = 0;
    }
  }
  const St = {
    id: "buffer",
    upload(t, e, r) {
      e.width === t.width || e.height === t.height ? r.texSubImage2D(r.TEXTURE_2D, 0, 0, 0, t.width, t.height, e.format, e.type, t.resource) : r.texImage2D(e.target, 0, e.internalFormat, t.width, t.height, 0, e.format, e.type, t.resource), e.width = t.width, e.height = t.height;
    }
  }, pt = {
    "bc1-rgba-unorm": true,
    "bc1-rgba-unorm-srgb": true,
    "bc2-rgba-unorm": true,
    "bc2-rgba-unorm-srgb": true,
    "bc3-rgba-unorm": true,
    "bc3-rgba-unorm-srgb": true,
    "bc4-r-unorm": true,
    "bc4-r-snorm": true,
    "bc5-rg-unorm": true,
    "bc5-rg-snorm": true,
    "bc6h-rgb-ufloat": true,
    "bc6h-rgb-float": true,
    "bc7-rgba-unorm": true,
    "bc7-rgba-unorm-srgb": true,
    "etc2-rgb8unorm": true,
    "etc2-rgb8unorm-srgb": true,
    "etc2-rgb8a1unorm": true,
    "etc2-rgb8a1unorm-srgb": true,
    "etc2-rgba8unorm": true,
    "etc2-rgba8unorm-srgb": true,
    "eac-r11unorm": true,
    "eac-r11snorm": true,
    "eac-rg11unorm": true,
    "eac-rg11snorm": true,
    "astc-4x4-unorm": true,
    "astc-4x4-unorm-srgb": true,
    "astc-5x4-unorm": true,
    "astc-5x4-unorm-srgb": true,
    "astc-5x5-unorm": true,
    "astc-5x5-unorm-srgb": true,
    "astc-6x5-unorm": true,
    "astc-6x5-unorm-srgb": true,
    "astc-6x6-unorm": true,
    "astc-6x6-unorm-srgb": true,
    "astc-8x5-unorm": true,
    "astc-8x5-unorm-srgb": true,
    "astc-8x6-unorm": true,
    "astc-8x6-unorm-srgb": true,
    "astc-8x8-unorm": true,
    "astc-8x8-unorm-srgb": true,
    "astc-10x5-unorm": true,
    "astc-10x5-unorm-srgb": true,
    "astc-10x6-unorm": true,
    "astc-10x6-unorm-srgb": true,
    "astc-10x8-unorm": true,
    "astc-10x8-unorm-srgb": true,
    "astc-10x10-unorm": true,
    "astc-10x10-unorm-srgb": true,
    "astc-12x10-unorm": true,
    "astc-12x10-unorm-srgb": true,
    "astc-12x12-unorm": true,
    "astc-12x12-unorm-srgb": true
  }, gt = {
    id: "compressed",
    upload(t, e, r) {
      r.pixelStorei(r.UNPACK_ALIGNMENT, 4);
      let s = t.pixelWidth, n = t.pixelHeight;
      const i = !!pt[t.format];
      for (let a = 0; a < t.resource.length; a++) {
        const o = t.resource[a];
        i ? r.compressedTexImage2D(r.TEXTURE_2D, a, e.internalFormat, s, n, 0, o) : r.texImage2D(r.TEXTURE_2D, a, e.internalFormat, s, n, 0, e.format, e.type, o), s = Math.max(s >> 1, 1), n = Math.max(n >> 1, 1);
      }
    }
  }, Ee = {
    id: "image",
    upload(t, e, r, s) {
      const n = e.width, i = e.height, a = t.pixelWidth, o = t.pixelHeight, c = t.resourceWidth, u = t.resourceHeight;
      c < a || u < o ? ((n !== a || i !== o) && r.texImage2D(e.target, 0, e.internalFormat, a, o, 0, e.format, e.type, null), s === 2 ? r.texSubImage2D(r.TEXTURE_2D, 0, 0, 0, c, u, e.format, e.type, t.resource) : r.texSubImage2D(r.TEXTURE_2D, 0, 0, 0, e.format, e.type, t.resource)) : n === a && i === o ? r.texSubImage2D(r.TEXTURE_2D, 0, 0, 0, e.format, e.type, t.resource) : s === 2 ? r.texImage2D(e.target, 0, e.internalFormat, a, o, 0, e.format, e.type, t.resource) : r.texImage2D(e.target, 0, e.internalFormat, e.format, e.type, t.resource), e.width = a, e.height = o;
    }
  }, Rt = {
    id: "video",
    upload(t, e, r, s) {
      if (!t.isValid) {
        r.texImage2D(e.target, 0, e.internalFormat, 1, 1, 0, e.format, e.type, null);
        return;
      }
      Ee.upload(t, e, r, s);
    }
  }, X = {
    linear: 9729,
    nearest: 9728
  }, vt = {
    linear: {
      linear: 9987,
      nearest: 9985
    },
    nearest: {
      linear: 9986,
      nearest: 9984
    }
  }, I = {
    "clamp-to-edge": 33071,
    repeat: 10497,
    "mirror-repeat": 33648
  }, xt = {
    never: 512,
    less: 513,
    equal: 514,
    "less-equal": 515,
    greater: 516,
    "not-equal": 517,
    "greater-equal": 518,
    always: 519
  };
  function W(t, e, r, s, n, i, a, o) {
    const c = i;
    if (!o || t.addressModeU !== "repeat" || t.addressModeV !== "repeat" || t.addressModeW !== "repeat") {
      const u = I[a ? "clamp-to-edge" : t.addressModeU], _ = I[a ? "clamp-to-edge" : t.addressModeV], h = I[a ? "clamp-to-edge" : t.addressModeW];
      e[n](c, e.TEXTURE_WRAP_S, u), e[n](c, e.TEXTURE_WRAP_T, _), e.TEXTURE_WRAP_R && e[n](c, e.TEXTURE_WRAP_R, h);
    }
    if ((!o || t.magFilter !== "linear") && e[n](c, e.TEXTURE_MAG_FILTER, X[t.magFilter]), r) {
      if (!o || t.mipmapFilter !== "linear") {
        const u = vt[t.minFilter][t.mipmapFilter];
        e[n](c, e.TEXTURE_MIN_FILTER, u);
      }
    } else e[n](c, e.TEXTURE_MIN_FILTER, X[t.minFilter]);
    if (s && t.maxAnisotropy > 1) {
      const u = Math.min(t.maxAnisotropy, e.getParameter(s.MAX_TEXTURE_MAX_ANISOTROPY_EXT));
      e[n](c, s.TEXTURE_MAX_ANISOTROPY_EXT, u);
    }
    t.compare && e[n](c, e.TEXTURE_COMPARE_FUNC, xt[t.compare]);
  }
  function Tt(t) {
    return {
      r8unorm: t.RED,
      r8snorm: t.RED,
      r8uint: t.RED,
      r8sint: t.RED,
      r16uint: t.RED,
      r16sint: t.RED,
      r16float: t.RED,
      rg8unorm: t.RG,
      rg8snorm: t.RG,
      rg8uint: t.RG,
      rg8sint: t.RG,
      r32uint: t.RED,
      r32sint: t.RED,
      r32float: t.RED,
      rg16uint: t.RG,
      rg16sint: t.RG,
      rg16float: t.RG,
      rgba8unorm: t.RGBA,
      "rgba8unorm-srgb": t.RGBA,
      rgba8snorm: t.RGBA,
      rgba8uint: t.RGBA,
      rgba8sint: t.RGBA,
      bgra8unorm: t.RGBA,
      "bgra8unorm-srgb": t.RGBA,
      rgb9e5ufloat: t.RGB,
      rgb10a2unorm: t.RGBA,
      rg11b10ufloat: t.RGB,
      rg32uint: t.RG,
      rg32sint: t.RG,
      rg32float: t.RG,
      rgba16uint: t.RGBA,
      rgba16sint: t.RGBA,
      rgba16float: t.RGBA,
      rgba32uint: t.RGBA,
      rgba32sint: t.RGBA,
      rgba32float: t.RGBA,
      stencil8: t.STENCIL_INDEX8,
      depth16unorm: t.DEPTH_COMPONENT,
      depth24plus: t.DEPTH_COMPONENT,
      "depth24plus-stencil8": t.DEPTH_STENCIL,
      depth32float: t.DEPTH_COMPONENT,
      "depth32float-stencil8": t.DEPTH_STENCIL
    };
  }
  function Bt(t, e) {
    let r = {}, s = t.RGBA;
    return t instanceof S.get().getWebGLRenderingContext() ? e.srgb && (r = {
      "rgba8unorm-srgb": e.srgb.SRGB8_ALPHA8_EXT,
      "bgra8unorm-srgb": e.srgb.SRGB8_ALPHA8_EXT
    }) : (r = {
      "rgba8unorm-srgb": t.SRGB8_ALPHA8,
      "bgra8unorm-srgb": t.SRGB8_ALPHA8
    }, s = t.RGBA8), {
      r8unorm: t.R8,
      r8snorm: t.R8_SNORM,
      r8uint: t.R8UI,
      r8sint: t.R8I,
      r16uint: t.R16UI,
      r16sint: t.R16I,
      r16float: t.R16F,
      rg8unorm: t.RG8,
      rg8snorm: t.RG8_SNORM,
      rg8uint: t.RG8UI,
      rg8sint: t.RG8I,
      r32uint: t.R32UI,
      r32sint: t.R32I,
      r32float: t.R32F,
      rg16uint: t.RG16UI,
      rg16sint: t.RG16I,
      rg16float: t.RG16F,
      rgba8unorm: t.RGBA,
      ...r,
      rgba8snorm: t.RGBA8_SNORM,
      rgba8uint: t.RGBA8UI,
      rgba8sint: t.RGBA8I,
      bgra8unorm: s,
      rgb9e5ufloat: t.RGB9_E5,
      rgb10a2unorm: t.RGB10_A2,
      rg11b10ufloat: t.R11F_G11F_B10F,
      rg32uint: t.RG32UI,
      rg32sint: t.RG32I,
      rg32float: t.RG32F,
      rgba16uint: t.RGBA16UI,
      rgba16sint: t.RGBA16I,
      rgba16float: t.RGBA16F,
      rgba32uint: t.RGBA32UI,
      rgba32sint: t.RGBA32I,
      rgba32float: t.RGBA32F,
      stencil8: t.STENCIL_INDEX8,
      depth16unorm: t.DEPTH_COMPONENT16,
      depth24plus: t.DEPTH_COMPONENT24,
      "depth24plus-stencil8": t.DEPTH24_STENCIL8,
      depth32float: t.DEPTH_COMPONENT32F,
      "depth32float-stencil8": t.DEPTH32F_STENCIL8,
      ...e.s3tc ? {
        "bc1-rgba-unorm": e.s3tc.COMPRESSED_RGBA_S3TC_DXT1_EXT,
        "bc2-rgba-unorm": e.s3tc.COMPRESSED_RGBA_S3TC_DXT3_EXT,
        "bc3-rgba-unorm": e.s3tc.COMPRESSED_RGBA_S3TC_DXT5_EXT
      } : {},
      ...e.s3tc_sRGB ? {
        "bc1-rgba-unorm-srgb": e.s3tc_sRGB.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT,
        "bc2-rgba-unorm-srgb": e.s3tc_sRGB.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT,
        "bc3-rgba-unorm-srgb": e.s3tc_sRGB.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT
      } : {},
      ...e.rgtc ? {
        "bc4-r-unorm": e.rgtc.COMPRESSED_RED_RGTC1_EXT,
        "bc4-r-snorm": e.rgtc.COMPRESSED_SIGNED_RED_RGTC1_EXT,
        "bc5-rg-unorm": e.rgtc.COMPRESSED_RED_GREEN_RGTC2_EXT,
        "bc5-rg-snorm": e.rgtc.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT
      } : {},
      ...e.bptc ? {
        "bc6h-rgb-float": e.bptc.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT,
        "bc6h-rgb-ufloat": e.bptc.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT,
        "bc7-rgba-unorm": e.bptc.COMPRESSED_RGBA_BPTC_UNORM_EXT,
        "bc7-rgba-unorm-srgb": e.bptc.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT
      } : {},
      ...e.etc ? {
        "etc2-rgb8unorm": e.etc.COMPRESSED_RGB8_ETC2,
        "etc2-rgb8unorm-srgb": e.etc.COMPRESSED_SRGB8_ETC2,
        "etc2-rgb8a1unorm": e.etc.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2,
        "etc2-rgb8a1unorm-srgb": e.etc.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2,
        "etc2-rgba8unorm": e.etc.COMPRESSED_RGBA8_ETC2_EAC,
        "etc2-rgba8unorm-srgb": e.etc.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC,
        "eac-r11unorm": e.etc.COMPRESSED_R11_EAC,
        "eac-rg11unorm": e.etc.COMPRESSED_SIGNED_RG11_EAC
      } : {},
      ...e.astc ? {
        "astc-4x4-unorm": e.astc.COMPRESSED_RGBA_ASTC_4x4_KHR,
        "astc-4x4-unorm-srgb": e.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR,
        "astc-5x4-unorm": e.astc.COMPRESSED_RGBA_ASTC_5x4_KHR,
        "astc-5x4-unorm-srgb": e.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR,
        "astc-5x5-unorm": e.astc.COMPRESSED_RGBA_ASTC_5x5_KHR,
        "astc-5x5-unorm-srgb": e.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR,
        "astc-6x5-unorm": e.astc.COMPRESSED_RGBA_ASTC_6x5_KHR,
        "astc-6x5-unorm-srgb": e.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR,
        "astc-6x6-unorm": e.astc.COMPRESSED_RGBA_ASTC_6x6_KHR,
        "astc-6x6-unorm-srgb": e.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR,
        "astc-8x5-unorm": e.astc.COMPRESSED_RGBA_ASTC_8x5_KHR,
        "astc-8x5-unorm-srgb": e.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR,
        "astc-8x6-unorm": e.astc.COMPRESSED_RGBA_ASTC_8x6_KHR,
        "astc-8x6-unorm-srgb": e.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR,
        "astc-8x8-unorm": e.astc.COMPRESSED_RGBA_ASTC_8x8_KHR,
        "astc-8x8-unorm-srgb": e.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR,
        "astc-10x5-unorm": e.astc.COMPRESSED_RGBA_ASTC_10x5_KHR,
        "astc-10x5-unorm-srgb": e.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR,
        "astc-10x6-unorm": e.astc.COMPRESSED_RGBA_ASTC_10x6_KHR,
        "astc-10x6-unorm-srgb": e.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR,
        "astc-10x8-unorm": e.astc.COMPRESSED_RGBA_ASTC_10x8_KHR,
        "astc-10x8-unorm-srgb": e.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR,
        "astc-10x10-unorm": e.astc.COMPRESSED_RGBA_ASTC_10x10_KHR,
        "astc-10x10-unorm-srgb": e.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR,
        "astc-12x10-unorm": e.astc.COMPRESSED_RGBA_ASTC_12x10_KHR,
        "astc-12x10-unorm-srgb": e.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR,
        "astc-12x12-unorm": e.astc.COMPRESSED_RGBA_ASTC_12x12_KHR,
        "astc-12x12-unorm-srgb": e.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR
      } : {}
    };
  }
  function At(t) {
    return {
      r8unorm: t.UNSIGNED_BYTE,
      r8snorm: t.BYTE,
      r8uint: t.UNSIGNED_BYTE,
      r8sint: t.BYTE,
      r16uint: t.UNSIGNED_SHORT,
      r16sint: t.SHORT,
      r16float: t.HALF_FLOAT,
      rg8unorm: t.UNSIGNED_BYTE,
      rg8snorm: t.BYTE,
      rg8uint: t.UNSIGNED_BYTE,
      rg8sint: t.BYTE,
      r32uint: t.UNSIGNED_INT,
      r32sint: t.INT,
      r32float: t.FLOAT,
      rg16uint: t.UNSIGNED_SHORT,
      rg16sint: t.SHORT,
      rg16float: t.HALF_FLOAT,
      rgba8unorm: t.UNSIGNED_BYTE,
      "rgba8unorm-srgb": t.UNSIGNED_BYTE,
      rgba8snorm: t.BYTE,
      rgba8uint: t.UNSIGNED_BYTE,
      rgba8sint: t.BYTE,
      bgra8unorm: t.UNSIGNED_BYTE,
      "bgra8unorm-srgb": t.UNSIGNED_BYTE,
      rgb9e5ufloat: t.UNSIGNED_INT_5_9_9_9_REV,
      rgb10a2unorm: t.UNSIGNED_INT_2_10_10_10_REV,
      rg11b10ufloat: t.UNSIGNED_INT_10F_11F_11F_REV,
      rg32uint: t.UNSIGNED_INT,
      rg32sint: t.INT,
      rg32float: t.FLOAT,
      rgba16uint: t.UNSIGNED_SHORT,
      rgba16sint: t.SHORT,
      rgba16float: t.HALF_FLOAT,
      rgba32uint: t.UNSIGNED_INT,
      rgba32sint: t.INT,
      rgba32float: t.FLOAT,
      stencil8: t.UNSIGNED_BYTE,
      depth16unorm: t.UNSIGNED_SHORT,
      depth24plus: t.UNSIGNED_INT,
      "depth24plus-stencil8": t.UNSIGNED_INT_24_8,
      depth32float: t.FLOAT,
      "depth32float-stencil8": t.FLOAT_32_UNSIGNED_INT_24_8_REV
    };
  }
  const Nt = 4;
  class be {
    constructor(e) {
      this.managedTextures = [], this._glTextures = /* @__PURE__ */ Object.create(null), this._glSamplers = /* @__PURE__ */ Object.create(null), this._boundTextures = [], this._activeTextureLocation = -1, this._boundSamplers = /* @__PURE__ */ Object.create(null), this._uploads = {
        image: Ee,
        buffer: St,
        video: Rt,
        compressed: gt
      }, this._premultiplyAlpha = false, this._useSeparateSamplers = false, this._renderer = e, this._renderer.renderableGC.addManagedHash(this, "_glTextures"), this._renderer.renderableGC.addManagedHash(this, "_glSamplers");
    }
    contextChange(e) {
      this._gl = e, this._mapFormatToInternalFormat || (this._mapFormatToInternalFormat = Bt(e, this._renderer.context.extensions), this._mapFormatToType = At(e), this._mapFormatToFormat = Tt(e)), this._glTextures = /* @__PURE__ */ Object.create(null), this._glSamplers = /* @__PURE__ */ Object.create(null), this._boundSamplers = /* @__PURE__ */ Object.create(null), this._premultiplyAlpha = false;
      for (let r = 0; r < 16; r++) this.bind(b.EMPTY, r);
    }
    initSource(e) {
      this.bind(e);
    }
    bind(e, r = 0) {
      const s = e.source;
      e ? (this.bindSource(s, r), this._useSeparateSamplers && this._bindSampler(s.style, r)) : (this.bindSource(null, r), this._useSeparateSamplers && this._bindSampler(null, r));
    }
    bindSource(e, r = 0) {
      const s = this._gl;
      if (e._touched = this._renderer.textureGC.count, this._boundTextures[r] !== e) {
        this._boundTextures[r] = e, this._activateLocation(r), e || (e = b.EMPTY.source);
        const n = this.getGlSource(e);
        s.bindTexture(n.target, n.texture);
      }
    }
    _bindSampler(e, r = 0) {
      const s = this._gl;
      if (!e) {
        this._boundSamplers[r] = null, s.bindSampler(r, null);
        return;
      }
      const n = this._getGlSampler(e);
      this._boundSamplers[r] !== n && (this._boundSamplers[r] = n, s.bindSampler(r, n));
    }
    unbind(e) {
      const r = e.source, s = this._boundTextures, n = this._gl;
      for (let i = 0; i < s.length; i++) if (s[i] === r) {
        this._activateLocation(i);
        const a = this.getGlSource(r);
        n.bindTexture(a.target, null), s[i] = null;
      }
    }
    _activateLocation(e) {
      this._activeTextureLocation !== e && (this._activeTextureLocation = e, this._gl.activeTexture(this._gl.TEXTURE0 + e));
    }
    _initSource(e) {
      const r = this._gl, s = new bt(r.createTexture());
      if (s.type = this._mapFormatToType[e.format], s.internalFormat = this._mapFormatToInternalFormat[e.format], s.format = this._mapFormatToFormat[e.format], e.autoGenerateMipmaps && (this._renderer.context.supports.nonPowOf2mipmaps || e.isPowerOfTwo)) {
        const n = Math.max(e.width, e.height);
        e.mipLevelCount = Math.floor(Math.log2(n)) + 1;
      }
      return this._glTextures[e.uid] = s, this.managedTextures.includes(e) || (e.on("update", this.onSourceUpdate, this), e.on("resize", this.onSourceUpdate, this), e.on("styleChange", this.onStyleChange, this), e.on("destroy", this.onSourceDestroy, this), e.on("unload", this.onSourceUnload, this), e.on("updateMipmaps", this.onUpdateMipmaps, this), this.managedTextures.push(e)), this.onSourceUpdate(e), this.updateStyle(e, false), s;
    }
    onStyleChange(e) {
      this.updateStyle(e, false);
    }
    updateStyle(e, r) {
      const s = this._gl, n = this.getGlSource(e);
      s.bindTexture(s.TEXTURE_2D, n.texture), this._boundTextures[this._activeTextureLocation] = e, W(e.style, s, e.mipLevelCount > 1, this._renderer.context.extensions.anisotropicFiltering, "texParameteri", s.TEXTURE_2D, !this._renderer.context.supports.nonPowOf2wrapping && !e.isPowerOfTwo, r);
    }
    onSourceUnload(e) {
      const r = this._glTextures[e.uid];
      r && (this.unbind(e), this._glTextures[e.uid] = null, this._gl.deleteTexture(r.texture));
    }
    onSourceUpdate(e) {
      const r = this._gl, s = this.getGlSource(e);
      r.bindTexture(r.TEXTURE_2D, s.texture), this._boundTextures[this._activeTextureLocation] = e;
      const n = e.alphaMode === "premultiply-alpha-on-upload";
      this._premultiplyAlpha !== n && (this._premultiplyAlpha = n, r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL, n)), this._uploads[e.uploadMethodId] ? this._uploads[e.uploadMethodId].upload(e, s, r, this._renderer.context.webGLVersion) : r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, e.pixelWidth, e.pixelHeight, 0, r.RGBA, r.UNSIGNED_BYTE, null), e.autoGenerateMipmaps && e.mipLevelCount > 1 && this.onUpdateMipmaps(e, false);
    }
    onUpdateMipmaps(e, r = true) {
      r && this.bindSource(e, 0);
      const s = this.getGlSource(e);
      this._gl.generateMipmap(s.target);
    }
    onSourceDestroy(e) {
      e.off("destroy", this.onSourceDestroy, this), e.off("update", this.onSourceUpdate, this), e.off("resize", this.onSourceUpdate, this), e.off("unload", this.onSourceUnload, this), e.off("styleChange", this.onStyleChange, this), e.off("updateMipmaps", this.onUpdateMipmaps, this), this.managedTextures.splice(this.managedTextures.indexOf(e), 1), this.onSourceUnload(e);
    }
    _initSampler(e) {
      const r = this._gl, s = this._gl.createSampler();
      return this._glSamplers[e._resourceId] = s, W(e, r, this._boundTextures[this._activeTextureLocation].mipLevelCount > 1, this._renderer.context.extensions.anisotropicFiltering, "samplerParameteri", s, false, true), this._glSamplers[e._resourceId];
    }
    _getGlSampler(e) {
      return this._glSamplers[e._resourceId] || this._initSampler(e);
    }
    getGlSource(e) {
      return this._glTextures[e.uid] || this._initSource(e);
    }
    generateCanvas(e) {
      const { pixels: r, width: s, height: n } = this.getPixels(e), i = S.get().createCanvas();
      i.width = s, i.height = n;
      const a = i.getContext("2d");
      if (a) {
        const o = a.createImageData(s, n);
        o.data.set(r), a.putImageData(o, 0, 0);
      }
      return i;
    }
    getPixels(e) {
      const r = e.source.resolution, s = e.frame, n = Math.max(Math.round(s.width * r), 1), i = Math.max(Math.round(s.height * r), 1), a = new Uint8Array(Nt * n * i), o = this._renderer, c = o.renderTarget.getRenderTarget(e), u = o.renderTarget.getGpuRenderTarget(c), _ = o.gl;
      return _.bindFramebuffer(_.FRAMEBUFFER, u.resolveTargetFramebuffer), _.readPixels(Math.round(s.x * r), Math.round(s.y * r), n, i, _.RGBA, _.UNSIGNED_BYTE, a), {
        pixels: new Uint8ClampedArray(a.buffer),
        width: n,
        height: i
      };
    }
    destroy() {
      this.managedTextures.slice().forEach((e) => this.onSourceDestroy(e)), this.managedTextures = null, this._renderer = null;
    }
    resetState() {
      this._activeTextureLocation = -1, this._boundTextures.fill(b.EMPTY.source), this._boundSamplers = /* @__PURE__ */ Object.create(null);
    }
  }
  be.extension = {
    type: [
      d.WebGLSystem
    ],
    name: "texture"
  };
  class Se {
    init() {
      const e = new U({
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
          value: new z(),
          type: "mat3x3<f32>"
        },
        uRound: {
          value: 0,
          type: "f32"
        }
      }), r = $(), s = Y({
        name: "graphics",
        bits: [
          Ae,
          Ne(r),
          Z,
          q
        ]
      });
      this.shader = new G({
        glProgram: s,
        resources: {
          localUniforms: e,
          batchSamplers: ye(r)
        }
      });
    }
    execute(e, r) {
      const s = r.context, n = s.customShader || this.shader, i = e.renderer, a = i.graphicsContext, { batcher: o, instructions: c } = a.getContextRenderData(s);
      n.groups[0] = i.globalUniforms.bindGroup, i.state.set(e.state), i.shader.bind(n), i.geometry.bind(o.geometry, n.glProgram);
      const u = c.instructions;
      for (let _ = 0; _ < c.instructionSize; _++) {
        const h = u[_];
        if (h.size) {
          for (let l = 0; l < h.textures.count; l++) i.texture.bind(h.textures.textures[l], l);
          i.geometry.draw(h.topology, h.size, h.start);
        }
      }
    }
    destroy() {
      this.shader.destroy(true), this.shader = null;
    }
  }
  Se.extension = {
    type: [
      d.WebGLPipesAdaptor
    ],
    name: "graphics"
  };
  class pe {
    init() {
      const e = Y({
        name: "mesh",
        bits: [
          Z,
          Me,
          q
        ]
      });
      this._shader = new G({
        glProgram: e,
        resources: {
          uTexture: b.EMPTY.source,
          textureUniforms: {
            uTextureMatrix: {
              type: "mat3x3<f32>",
              value: new z()
            }
          }
        }
      });
    }
    execute(e, r) {
      const s = e.renderer;
      let n = r._shader;
      if (n) {
        if (!n.glProgram) {
          m("Mesh shader has no glProgram", r.shader);
          return;
        }
      } else {
        n = this._shader;
        const i = r.texture, a = i.source;
        n.resources.uTexture = a, n.resources.uSampler = a.style, n.resources.textureUniforms.uniforms.uTextureMatrix = i.textureMatrix.mapCoord;
      }
      n.groups[100] = s.globalUniforms.bindGroup, n.groups[101] = e.localUniformsBindGroup, s.encoder.draw({
        geometry: r._geometry,
        shader: n,
        state: r.state
      });
    }
    destroy() {
      this._shader.destroy(true), this._shader = null;
    }
  }
  pe.extension = {
    type: [
      d.WebGLPipesAdaptor
    ],
    name: "mesh"
  };
  const yt = [
    ...Le,
    ue,
    je,
    Ve,
    ee,
    be,
    _e,
    se,
    de,
    le,
    ae,
    Et,
    oe,
    ie
  ], It = [
    ...He
  ], Dt = [
    J,
    pe,
    Se
  ], ge = [], Re = [], ve = [];
  x.handleByNamedList(d.WebGLSystem, ge);
  x.handleByNamedList(d.WebGLPipes, Re);
  x.handleByNamedList(d.WebGLPipesAdaptor, ve);
  x.add(...yt, ...It, ...Dt);
  Pt = class extends Ie {
    constructor() {
      const e = {
        name: "webgl",
        type: De.WEBGL,
        systems: ge,
        renderPipes: Re,
        renderPipeAdaptors: ve
      };
      super(e);
    }
  };
});
export {
  Pt as WebGLRenderer,
  __tla
};
