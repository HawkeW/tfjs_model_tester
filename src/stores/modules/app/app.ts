import {defineStore} from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    lang: '',
  }),
  actions: {
    setNowLang(lang: string) {
      this.lang = lang;
    },
  },
});