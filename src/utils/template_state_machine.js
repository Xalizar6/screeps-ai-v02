/* global */

const moduleName = ''

module.exports = {

  run: function (creep) {
    Log.Output({ t: 'info', mN: moduleName, i: true }, 'Begin -  routine')
    const timer = Game.cpu.getUsed()

    if (!creep.memory.state) {
      creep.memory.state = STATE_SPAWNING
    };

    switch (creep.memory.state) {
      case myConstants.STATE_SPAWNING:
        runSpawning(creep)
        break
      case myConstants.STATE_DISPATCH:
        runDispatch(creep)
        break
      case myConstants.STATE_MOVING:
        runMoving(creep)
        break
      case myConstants.STATE_GRAB_RESOURCE:
        runGrabResource(creep)
        break
      case myConstants.STATE_DEPOSIT_RESOURCE:
        runDepositResource(creep)
        break
      case myConstants.STATE_IDLE:
        runIdle(creep)
    };

    Log.Output({ t: 'Info', mN: moduleName, i: true }, `End -  routine. CPU used: ${Game.cpu.getUsed() - timer}`)
  }
}
