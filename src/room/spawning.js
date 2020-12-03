const creepLogic = require('../creeps/index')
const creepTypes = _.keys(creepLogic)

/* global FIND_MY_SPAWNS */

function spawnCreeps (room) {
  Log.Output({ t: 'info', mN: 'spawning', i: true }, 'Begin - spawnCreeps routine')
  const timer = Game.cpu.getUsed()
  // lists all the creep types to console
  //   _.forEach(creepTypes, type => console.log(type))

  // find a creep type that returns true for the .spawn() function
  const creepTypeNeeded = _.find(creepTypes, function (type) {
    return creepLogic[type].spawn(room)
  })

  // get the data for spawning a new creep of creepTypeNeeded
  const creepSpawnData = creepLogic[creepTypeNeeded] && creepLogic[creepTypeNeeded].spawnData(room)
  //   console.log(room, JSON.stringify(creepSpawnData))

  if (creepSpawnData) {
    // find the first or 0th spawn in the room
    const spawn = room.find(FIND_MY_SPAWNS)[0]
    const result = spawn.spawnCreep(creepSpawnData.body, creepSpawnData.name, {
      memory: creepSpawnData.memory
    })

    Log.Output({ t: 'event', mN: 'spawning', i: true }, `Tried to Spawn a [${creepTypeNeeded}] with result [${Xal.getGlobalKeyByValue(result)}]`)
  }

  Log.Output({ t: 'Info', mN: 'spawning', i: true }, `End - spawnCreeps routine. CPU used: ${Game.cpu.getUsed() - timer}`)
}

module.exports = spawnCreeps
