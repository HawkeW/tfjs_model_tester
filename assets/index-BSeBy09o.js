import { B as o, g as r, s as m, a as n, b as h, __tla as __tla_0 } from "./base-D4gcL655.js";
import { __tla as __tla_1 } from "./index-C_KNhBjg.js";
let a;
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
  })()
]).then(async () => {
  a = "4.19.0";
});
export {
  o as BackendWasm,
  __tla,
  r as getThreadsCount,
  m as setThreadsCount,
  n as setWasmPath,
  h as setWasmPaths,
  a as version_wasm
};
