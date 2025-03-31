import {defineStore} from 'pinia';
import {store} from '../../setup';
import {VideoEnhancer} from '@/packages/videoEnhance/videoEnhancer';
import {VideoDetectState} from './helper';
import { ModelType } from '@/packages/videoEnhance/utils/model/factory';
import { on } from 'events';
import { backend } from '@tensorflow/tfjs';

const videoEnhancer = VideoEnhancer.getInstance();


export const useVideoDetectStore = defineStore('video-detect', {
  state: (): VideoDetectState => ({
    backend: 'webgl',
    loadedModel: '',
    loadState: {
      loading: false,
      progress: 0,
    },
  }),
  actions: {
    async setBackend(backend: string = 'webgl') {
      this.backend = backend;
    },
    async loadModel(modelType: ModelType, modelUrl: string) {
      this.loadState.loading = true;
      this.loadedModel = '';
      try {
        await videoEnhancer.loadModel({
          type: modelType,
          url: modelUrl, 
          backend: this.backend,
          onProgress: (progress) => {
            if (progress === 100) {
              this.loadState.progress = progress;
            } else {
              this.loadState.loading = true;
              this.loadState.progress = progress;
            }
          },
        })
        await videoEnhancer.testRun();
        this.loadedModel = modelUrl;
      } finally {
        this.loadState.loading = false;
      }
    },
  },
});

export const useVideoDetectStoreWithout = () => useVideoDetectStore(store);
