export interface VideoDetectState {
  backend: string;
  loadedModel: string;
  loadState: {
    loading: boolean;
    progress: number;
  };
}

