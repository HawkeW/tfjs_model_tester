import { D as n, n as c, __tla as __tla_0 } from "./ModelPerformanceTest-DjV__RXZ.js";
let C;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  class l {
    constructor(a) {
      this._canvasPool = /* @__PURE__ */ Object.create(null), this.canvasOptions = a || {}, this.enableFullScreen = false;
    }
    _createCanvasAndContext(a, t) {
      const s = n.get().createCanvas();
      s.width = a, s.height = t;
      const e = s.getContext("2d");
      return {
        canvas: s,
        context: e
      };
    }
    getOptimalCanvasAndContext(a, t, s = 1) {
      a = Math.ceil(a * s - 1e-6), t = Math.ceil(t * s - 1e-6), a = c(a), t = c(t);
      const e = (a << 17) + (t << 1);
      this._canvasPool[e] || (this._canvasPool[e] = []);
      let o = this._canvasPool[e].pop();
      return o || (o = this._createCanvasAndContext(a, t)), o;
    }
    returnCanvasAndContext(a) {
      const t = a.canvas, { width: s, height: e } = t, o = (s << 17) + (e << 1);
      a.context.clearRect(0, 0, s, e), this._canvasPool[o].push(a);
    }
    clear() {
      this._canvasPool = {};
    }
  }
  C = new l();
});
export {
  C,
  __tla
};
