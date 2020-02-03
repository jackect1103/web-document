import getTag from './.internal/getTag.js' // 判断参数是哪种类型 

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 * 检查“值”是否归类为“符号”原语或对象。
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * isSymbol(Symbol.iterator)
 * // => true
 *
 * isSymbol('abc')
 * // => false
 */
function isSymbol(value) {
  const type = typeof value
  //typeof Symbol() == > 'symbol'
  //Object.prototype.toString.call(Symbol()) ==> "[object Symbol]"
  return type == 'symbol' || (type === 'object' && value != null && getTag(value) == '[object Symbol]')
}

export default isSymbol
