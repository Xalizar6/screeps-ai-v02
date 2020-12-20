/* global Creep FIND_MY_SPAWNS */

// ****************************************************************************************************************************************
// Returns true if this is the final tick before this Creep spawns.
// Used for transitioning to the Dispatch State immediately rather than 1 tick after spawn
Creep.prototype.finalSpawnTick = function finalSpawnTick () {
  let bReturnValue = false
  this.room.find(FIND_MY_SPAWNS).forEach((spawn) => {
    if (spawn.spawning) {
      if (spawn.spawning.name === this.name && spawn.spawning.remainingTime === 1) {
        bReturnValue = true
      }
    }
  })
  return bReturnValue
}
// ****************************************************************************************************************************************
