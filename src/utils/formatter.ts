interface INumFormatterOptions {
  unit?: string;
  digit?: number;
  defaultValue?: number;
  multiply?: number;
}
export const numFormat = (val: number | undefined, options?: INumFormatterOptions): string => {
  const {unit, digit, defaultValue, multiply} = {
    unit: '',
    digit: 0,
    defaultValue: 0,
    multiply: 1,
    ...options,
  };
  const newVal = isScientificNotation((val ?? defaultValue) * multiply);
  return newVal.toFixed(digit) + unit;
};
/**
 * 判断是否是科学记数法，临时使用，存在e-16的值，选择默认给0
 * @param val 数值
 * @returns
 */
const isScientificNotation = (val: number) => {
  const amount = String(val);
  let newVal = val;
  if (amount.indexOf('e') !== -1 && amount.split('e')[1].indexOf('-') !== 1) {
    newVal = 0;
  }
  return newVal;
};

export const getDisplayHeight = (height: number) => Math.ceil(height);
