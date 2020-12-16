/* global */

const moduleName = 'harvester_02'

const harvester = {

  run: function (creep) {
    Log.Output({ t: 'info', mN: moduleName, i: true }, 'Begin -  routine')
    const timer = Game.cpu.getUsed()

    if (!creep.memory.state) {
      creep.memory.state = Xal.STATE_SPAWNING
    };

    switch (creep.memory.state) {
      case Xal.STATE_SPAWNING:
        runSpawning(creep)
        break
      case Xal.STATE_DISPATCH:
        runDispatch(creep)
        break
      case Xal.STATE_MOVING:
        runMoving(creep)
        break
      case Xal.STATE_GRAB_RESOURCE:
        runGrabResource(creep)
        break
      case Xal.STATE_DEPOSIT_RESOURCE:
        runDepositResource(creep)
        break
      case Xal.STATE_IDLE:
        runIdle(creep)
    };

    Log.Output({ t: 'Info', mN: moduleName, i: true }, `End -  routine. CPU used: ${Game.cpu.getUsed() - timer}`)
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
