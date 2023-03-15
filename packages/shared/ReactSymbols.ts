// 判断当前宿主环境支不支持symbol
const supportSymbol = typeof Symbol === 'function' && Symbol.for;

// 如果支持返回Symbol,如果不支持则返回数字
export const REACT_ELEMENT_TYPE = supportSymbol
    ? Symbol.for('react.element')
    : 0xeac7;
