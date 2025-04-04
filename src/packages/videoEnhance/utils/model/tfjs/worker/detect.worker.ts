/* eslint-disable no-restricted-globals */
/// <reference lib="webworker" />
import * as tf from '@tensorflow/tfjs';
import {detect, testRun} from '../detect';
import {WorkerEventData, WorkerEventDataCmd} from '../../types';

let model: tf.GraphModel<string | tf.io.IOHandler> | null = null;
let modelLabels: string[] = [];
self.onmessage = async (event: MessageEvent<WorkerEventData>) => {
  const {data} = event;
  switch (data.cmd) {
    case WorkerEventDataCmd.loadModel: {
      const {model: modelDataJson, labels} = data.data;
      modelLabels = labels;
      model = await tf.loadGraphModel(modelDataJson, {
        onProgress: (percent) => {
          self.postMessage({
            msg: 'MODEL Loading',
            cmd: 'loadModel',
            percent: percent * 100,
          });
        },
      });
      self.postMessage({
        msg: 'MODEL Loading',
        cmd: 'loadModel',
        percent: 100,
        inputShape: model.inputs[0].shape,
      });
      break;
    }
    case WorkerEventDataCmd.disposeModel: {
      model?.dispose();
      model = null;
      break;
    }
    case WorkerEventDataCmd.detect: {
      if (!model) return;
      const {source, options} = data.data;
      const result = await detect(
        source,
        {
          labels: modelLabels,
          inputShape: model!.inputs[0].shape as number[],
          net: model!,
        },
        options,
      );
      self.postMessage(result);
      break;
    }
    case WorkerEventDataCmd.testRun: {
      const result = await testRun({
        labels: modelLabels,
        inputShape: model!.inputs[0].shape as number[],
        net: model!,
      });
      self.postMessage(result);
      break;
    }
    case WorkerEventDataCmd.stop: {
      self.postMessage('WORKER STOPPED');
      self.close(); // Terminates the worker.
      break;
    }
    default:
      self.postMessage(`Unknown command: ${JSON.stringify(data)}`);
  }
};
