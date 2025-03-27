import {defineStore} from 'pinia';
import {store} from '../../setup';
import {VideoEnhancer} from '@/packages/videoEnhance/videoEnhancer';
import {VideoDetectState} from './helper';

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
    async loadModel(modelUrl: string) {
      await videoEnhancer.loadGraphModel(modelUrl, (progress) => {
        if (progress === 100) {
          this.loadState.progress = progress;
        } else {
          this.loadState.loading = true;
          this.loadState.progress = progress;
        }
      }, this.backend);
      await videoEnhancer.testRun();
      this.loadState.loading = false;
      this.loadedModel = modelUrl;
    },
  },
});

export const useVideoDetectStoreWithout = () => useVideoDetectStore(store);
