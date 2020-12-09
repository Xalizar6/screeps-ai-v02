/* global FIND_SOURCES, ERR_NOT_IN_RANGE, RESOURCE_ENERGY, WORK, CARRY, MOVE */

const harvester = {
  /** @param {Creep} creep **/
  run: function (creep) {
    Log.Output({ t: 'info', mN: 'harvester', i: true }, 'Begin - run routine')
    const timer = Game.cpu.getUsed()
    if (creep.store.getFreeCapacity() > 0) {
      const sources = creep.room.find(FIND_SOURCES)
      if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0])
      }
    } else {
      // here is the sayHello() prototype
      creep.sayHello()

      if (creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(Game.spawns.Spawn1)
      }
    }
    Log.Output({ t: 'Info', mN: 'harvester', i: true }, `End - run routine. CPU used: ${Game.cpu.getUsed() - timer}`)
  },
  // checks if the room needs to spawn a creep
  spawn: function (room) {
    const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester' && creep.room.name === room.name)
    // console.log('Harvesters: ' + harvesters.length, room.name)

    if (harvesters.length < 2) {
      return true
    }
  },
  // returns an object with the data to spawn a new creep
  spawnData: function (room) {
    const name = 'Harvester' + Game.time
    const body = [WORK, CARRY, MOVE]
    const memory = {
      role: 'harvester'
    }

    return {
      name,
      body,
      memory
    }
  }
}

module.exports = harvester
