/* eslint-disable no-restricted-globals */
/// <reference lib="webworker" />
import * as ort from 'onnxruntime-web';
import type { InferenceSession } from 'onnxruntime-common';
import {WorkerEventData, WorkerEventDataCmd} from '../../types';
import { detect } from '../detect';

let session: InferenceSession | null = null;
self.onmessage = async (event: MessageEvent<WorkerEventData>) => {
  const {data} = event;
  switch (data.cmd) {
    case WorkerEventDataCmd.loadModel: {
      session = await ort.InferenceSession
        .create('./model/model.onnx',
        { executionProviders: ['webgl'], graphOptimizationLevel: 'all' });
      console.log('Inference session created');
      break;
    }
    case WorkerEventDataCmd.disposeModel: {
      
      break;
    }
    case WorkerEventDataCmd.detect: {
      if (!session) return;
      const {source, options} = data.data;
      const result = await detect(
        source,
        {
          net: session!,
        },
        options,
      );
      self.postMessage(result);
      break;
    }
    case WorkerEventDataCmd.testRun: {
      
      break;
    }
    case WorkerEventDataCmd.stop: {
      break;
    }
    default:
      self.postMessage(`Unknown command: ${JSON.stringify(data)}`);
  }
};
