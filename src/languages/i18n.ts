import {I18n, createI18n} from 'vue-i18n';
import {nextTick} from 'vue';
import {MessageSchema} from './locales/base';
import {useAppStore} from '@/stores/modules/app';

// 当前支持的语言枚举
export const enum VGCLocale {
  en = 'en',
  zhCN = 'zh-CN',
}

/**
 * 国际化配置
 */
export const i18n = await setupI18n({locale: getCurrentLocale()});

/**
 * 支持的所有语言
 */
export const SupportedLocales = [
  VGCLocale.en,
  VGCLocale.zhCN,
];

function getCurrentLocale() {
  const url = window.location.href;
  const defaultLanguage = navigator.language;
  const langParam = parseUrlParams(url).lang ?? defaultLanguage;
  const appStore = useAppStore();
  appStore.setNowLang(langParam);
  return langParam as VGCLocale;
}

export function isZhLocale(locale: string) {
  return locale.includes('zh');
}

/**
 * 初始化国际化插件
 * @param options
 * @returns
 */
export async function setupI18n(options: {locale: VGCLocale} = {locale: VGCLocale.zhCN}): Promise<I18n> {
  const i18n = createI18n<[MessageSchema]>({
    legacy: false,
    globalInjection: true, // 全局生效$t
    fallbackLocale: 'zh-CN',
    ...options,
  }) as I18n;
  setI18nLanguage(i18n, options.locale);
  await loadLocaleMessages(i18n, VGCLocale.zhCN);
  if (!isZhLocale(options.locale)) {
    await loadLocaleMessages(i18n, options.locale);
  }

  return i18n;
}

/**
 * 设置国际化语言
 * @param i18n
 * @param locale
 */
export function setI18nLanguage(i18n: I18n, locale = VGCLocale.zhCN) {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale;
  } else if (typeof i18n.global.locale !== 'string') {
    i18n.global.locale.value = locale;
  }
  document.querySelector('html')?.setAttribute('lang', locale);
}

export async function loadLocaleMessages(i18n: I18n, locale: VGCLocale) {
  const messages = await import(/* webpackChunkName: "locale-[request]" */ `./locales/${locale}.json`);

  i18n.global.setLocaleMessage(locale, messages.default);

  return nextTick();
}

interface UrlType {
  token?: string | null;
  time?: string | null;
  os?: string | null;
  lang?: string | null;
}

/**
 * 解析 URL 中的参数
 * @param url
 * @returns {UrlType}
 */
export function parseUrlParams(url: string): UrlType {
  const params: {[key: string]: string | boolean | null} = {};
  if (!url || url === '' || typeof url !== 'string') {
    return params;
  }
  const paramsStr = url.split('?')[1];
  if (!paramsStr) {
    return params;
  }
  // 使用正则直接分割参数对
  const paramsArr = paramsStr.split('&');
  paramsArr.forEach((param) => {
    const [key, value] = param.split('=');
    if (value === undefined) {
      // 没有值的情况,使用 null 标识没有值
      params[key] = null;
    } else if (value === 'true') {
      params[key] = true;
    } else if (value === 'false') {
      params[key] = false;
    } else {
      params[key] = decodeURIComponent(value);
    }
  });
  return params;
}
