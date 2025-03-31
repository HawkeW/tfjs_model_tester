/* eslint-disable no-restricted-globals */
/// <reference lib="webworker" />

import {WorkerEventData, WorkerEventDataCmd} from '../../types';


self.onmessage = async (event: MessageEvent<WorkerEventData>) => {
  const {data} = event;
  switch (data.cmd) {
    case WorkerEventDataCmd.loadModel: {
      
      break;
    }
    case WorkerEventDataCmd.disposeModel: {
      
      break;
    }
    case WorkerEventDataCmd.detect: {
      
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
