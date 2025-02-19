import {computed, unref} from 'vue';
import {ComposerTranslation, DefineLocaleMessage} from 'vue-i18n';
import {i18n, VGCLocale} from '@/languages/i18n';
import {MessageSchema} from '@/languages/locales/base';

type RemoveIndexSignature<T> = {[K in keyof T as string extends K ? never : number extends K ? never : K]: T[K]};

type Message = ComposerTranslation<
  {message: MessageSchema},
  VGCLocale,
  RemoveIndexSignature<{
    [K in keyof DefineLocaleMessage]: DefineLocaleMessage[K];
  }>
>;
export const useLanguage = () => {
  const locale = computed(() => unref(i18n.global.locale));
  const isZh = computed(() => locale.value.includes('zh'));
  return {
    t: i18n.global.t as Message,
    locale,
    isZh,
  };
};
