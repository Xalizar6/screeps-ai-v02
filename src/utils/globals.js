// Adds a custom global object under which I publish constants, utilities, etc that I want available at a global scope.
global.Xal = {}

/**
 * Converts a numerical return value from an in-game method to the text value from the global object
 * Reference: https://stackoverflow.com/questions/9907419/how-to-get-a-key-in-a-javascript-object-by-its-value
 * @param {number|string} value - Return value
 * @param {object} object - The GLOBAL object which we pass in by default so we can search it
 */
global.Xal.getGlobalKeyByValue = function (value, object = global) {
  return Object.keys(object).find(key => object[key] === value)
}
