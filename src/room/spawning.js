/* global FIND_MY_SPAWNS RESOURCE_ENERGY */

const creepLogic = require('../creeps/index')
const creepTypes = _.keys(creepLogic)
const moduleName = 'spawning'

function spawnCreeps (room) {
  Log.Output({ t: 'Info', mN: moduleName, i: true }, 'Begin - spawnCreeps routine')
  const timer = Game.cpu.getUsed()

  // find a creep type that returns true for the .spawn() function
  const creepTypeNeeded = _.find(creepTypes, function (type) {
    return creepLogic[type].spawn(room)
  })

  Log.Output({ t: 'debug', mN: moduleName, i: true }, 'creepTypeNeeded: ' + creepTypeNeeded)
  // get the data for spawning a new creep of creepTypeNeeded
  // If first is not falsy then second, else first.
  const creepSpawnData = creepLogic[creepTypeNeeded] && creepLogic[creepTypeNeeded].spawnData(room)

  if (creepSpawnData) {
    const availableSpawns = room.find(FIND_MY_SPAWNS, { filter: function (spawn) { return !spawn.spawning } })
    availableSpawns.sort((a, b) => (a.store.getUsedCapacity([RESOURCE_ENERGY]) < b.store.getUsedCapacity([RESOURCE_ENERGY]))
      ? 1
      : (a.store.getUsedCapacity([RESOURCE_ENERGY]) === b.store.getUsedCapacity([RESOURCE_ENERGY])) ? ((a.name > b.name) ? 1 : -1) : -1)

    availableSpawns.forEach(spawn => {
      Log.Output({ t: 'debug', mN: moduleName, i: true }, 'Spawn name [' + spawn.name + '] Energy [' +
       spawn.store.getUsedCapacity([RESOURCE_ENERGY]) + ']')
    })

    if (availableSpawns.length > 0) {
      const result = availableSpawns[0].spawnCreep(creepSpawnData.body, creepSpawnData.name, {
        memory: creepSpawnData.memory
      })
      Log.Output({ t: 'event', mN: moduleName, i: true }, `Spawning a [${creepTypeNeeded}] with result [${Xal.getGlobalKeyByValue(result)}]`)
    } else {
      Log.Output({ t: 'event', mN: moduleName, i: true }, `Tried to Spawn a [${creepTypeNeeded}] but no spawns are available right now.}]`)
    }
  }

  Log.Output({ t: 'Info', mN: 'spawning', i: true }, `End - spawnCreeps routine. CPU used: ${Game.cpu.getUsed() - timer}`)
}

module.exports = spawnCreeps
