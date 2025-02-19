import zh from './zh-CN.json';

/**
 * 全局Locale配置
 * zhCn为默认语种。
 *
 * 其它语种未实现的内容，将默认回退到zhCn。
 * 理论上来说，其他语种应该是默认语种的子集。
 */

export type MessageSchema = typeof zh;
