// Adds a custom global object under which I publish constants, utilities, etc that I want available at a global scope.
global.Xal = {}

/** Global Functions I want available throughout the code */

/**
 * Converts a numerical return value from an in-game method to the text value from the global object
 * Reference: https://stackoverflow.com/questions/9907419/how-to-get-a-key-in-a-javascript-object-by-its-value
 * @param {number|string} value - Return value
 * @param {object} object - The GLOBAL object which we pass in by default so we can search it
 */
global.Xal.getGlobalKeyByValue = function (value, object = global) {
  return Object.keys(object).find(key => object[key] === value)
}

/** Global Constants I want available throughout the code */
global.Xal.STATE_SPAWNING = 0
global.Xal.STATE_MOVING = 1
global.Xal.STATE_HARVESTING = 2
global.Xal.STATE_DEPOSIT_RESOURCE = 3
global.Xal.STATE_GRAB_RESOURCE = 4
global.Xal.STATE_IDLE = 5
global.Xal.STATE_DISPATCH = 6

global.Xal.TERMINAL_ENERGY_STORAGE_TARGET = 10000
global.Xal.TERMINAL_OXYGEN_STORAGE_TARGET = 10000
global.Xal.TERMINAL_UTRIUM_STORAGE_TARGET = 10000

global.Xal.STORAGE_ENERGY_STORAGE_TARGET = 100000
global.Xal.STORAGE_UTRIUM_STORAGE_TARGET = 100000
