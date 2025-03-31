import * as tf from '@tensorflow/tfjs';

export async function initWasmBackend() {
  const wasm = await import('@tensorflow/tfjs-backend-wasm');
  wasm.setWasmPaths('/');
  // 配置WASM后端
  tf.env().set('WEBGL_CPU_FORWARD', false);
  tf.env().set('WEBGL_DELETE_TEXTURE_THRESHOLD', -1);
  tf.env().set('WASM_HAS_SIMD_SUPPORT', true);
  tf.env().set('WASM_HAS_MULTITHREAD_SUPPORT', true);

  // 启用WASM后端
  await tf.setBackend('wasm');
  await tf.ready();

  return tf;
}