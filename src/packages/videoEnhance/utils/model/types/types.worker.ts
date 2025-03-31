import {DetectOptions} from '../../types';

export enum WorkerEventDataCmd {
  detect = 'detect',
  stop = 'stop',
  loadModel = 'loadModel',
  disposeModel = 'disposeModel',
  testRun = 'testRun',
}

export interface WorkerEventDataBase {
  cmd: WorkerEventDataCmd;
}

export interface WorkerEventDataDetect extends WorkerEventDataBase {
  cmd: WorkerEventDataCmd.detect;
  data: {
    source: ImageBitmap;
    options: DetectOptions;
  };
}

export interface WorkerEventDataStop extends WorkerEventDataBase {
  cmd: WorkerEventDataCmd.stop;
}

export interface WorkerEventDataLoadModel extends WorkerEventDataBase {
  cmd: WorkerEventDataCmd.loadModel;
  data: {
    model: string;
    labels: string[];
  };
}

export interface WorkerEventDataDisposeModel extends WorkerEventDataBase {
  cmd: WorkerEventDataCmd.disposeModel;
}

export interface WorkerEventDataTestRun extends WorkerEventDataBase {
  cmd: WorkerEventDataCmd.testRun;
}

export type WorkerEventData =
  | WorkerEventDataDetect
  | WorkerEventDataStop
  | WorkerEventDataLoadModel
  | WorkerEventDataDisposeModel
  | WorkerEventDataTestRun;
