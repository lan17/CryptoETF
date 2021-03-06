export default class Utils {
  static pad(width, string, padding) {
    return (width <= string.length) ? string : this.pad(width, padding + string, padding)
  }

  static getSortedKeys(object, keyName) {
    let keys = []
    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        keys.push(key)
      }
    }
    return keys.sort(function(a, b) {
      let ax = object[a][keyName]
      let bx = object[b][keyName]
      return ax - bx
    })
  }

  /**
   * Round a float to given number of decimal places.
   * @param num The number to round.
   * @param places The number of decimal places.
   */
  static round(num, places) {
    places = (places ? places : 0)
    let normalizer = Math.pow(10, places)
    return Math.round(num * normalizer) / normalizer
  }
}
