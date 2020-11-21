const creepLogic = require('./creeps')
const roomLogic = require('./room')
// @ts-ignore
// eslint-disable-next-line no-unused-vars
const prototypes = require('./prototypes')

module.exports.loop = function () {
  // make a list of all of our rooms
  Game.myRooms = _.filter(Game.rooms, r => r.controller && r.controller.level > 0 && r.controller.my)

  // run spwan logic for each room in our empire
  _.forEach(Game.myRooms, r => roomLogic.spawning(r))

  // run each creep role see /creeps/index.js
  for (const name in Game.creeps) {
    const creep = Game.creeps[name]

    const role = creep.memory.role
    if (creepLogic[role]) {
      creepLogic[role].run(creep)
    }
  }

  // free up memory if creep no longer exists
  for (const name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name]
      console.log('Clearing non-existing creep memory:', name)
    }
  }
}
